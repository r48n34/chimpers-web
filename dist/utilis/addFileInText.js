"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFileInText = addFileInText;
const encodeFile_1 = require("./encodeFile");
function readFileToArrayBuffer(file) {
    return __awaiter(this, void 0, void 0, function* () {
        if (file instanceof ArrayBuffer) {
            return file;
        }
        if (ArrayBuffer.isView(file)) {
            return file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength);
        }
        if (typeof Blob !== "undefined" && file instanceof Blob) {
            return file.arrayBuffer();
        }
        throw new Error("Unsupported file type.");
    });
}
function addFileInText(encodingString, // Text to add files
file) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileBuffer = yield readFileToArrayBuffer(file);
        const hiddenDataArr = (0, encodeFile_1.encodeFile)(new Uint8Array(fileBuffer));
        let textArr = encodingString.split(" ");
        const wordIndexes = textArr
            .map((word, index) => ({ word, index }))
            .filter(({ word }) => word.length > 0)
            .map(({ index }) => index);
        if (wordIndexes.length === 0) {
            return hiddenDataArr.join("");
        }
        const baseChunkSize = Math.floor(hiddenDataArr.length / wordIndexes.length);
        const remainder = hiddenDataArr.length % wordIndexes.length;
        let hiddenDataOffset = 0;
        for (let i = 0; i < wordIndexes.length; i++) {
            const extra = i < remainder ? 1 : 0;
            const chunkSize = baseChunkSize + extra;
            if (chunkSize <= 0) {
                continue;
            }
            const chunk = hiddenDataArr.slice(hiddenDataOffset, hiddenDataOffset + chunkSize).join("");
            textArr[wordIndexes[i]] += chunk;
            hiddenDataOffset += chunkSize;
        }
        return textArr.join(" ");
    });
}
//# sourceMappingURL=addFileInText.js.map