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
exports.addFileInText = void 0;
const encodeFile_1 = require("./encodeFile");
function readFileToArrayBuffer(file) {
    return new Promise((rec, rej) => {
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = function () {
            const data = reader.result;
            rec(data);
        };
        reader.onerror = function () {
            rej();
        };
    });
}
function addFileInText(encodingString, // Text to add files
file) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileBuffer = yield readFileToArrayBuffer(file);
        const hiddenDataArr = (0, encodeFile_1.encodeFile)(new Uint8Array(fileBuffer));
        let textArr = encodingString.split(" ");
        textArr[0] += hiddenDataArr.join("");
        return textArr.join(" ");
    });
}
exports.addFileInText = addFileInText;
//# sourceMappingURL=addFileInText.js.map