"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeFileInText = decodeFileInText;
const dataChar_1 = require("../data/dataChar");
const stringDataDecode_1 = require("../data/stringDataDecode");
function decodeFileInText(encodedText) {
    let finalArray = (0, stringDataDecode_1.stringDataDecode)(encodedText, false);
    if (finalArray.length % 4 !== 0) {
        throw new Error("Invalid input encodedText.");
    }
    let bufferArr = [];
    // Decode
    for (let i = 0; i < finalArray.length; i += 4) {
        const codeBin = dataChar_1.hiddenCharTobin[finalArray[i].charCodeAt(0).toString()]
            + dataChar_1.hiddenCharTobin[finalArray[i + 1].charCodeAt(0).toString()]
            + dataChar_1.hiddenCharTobin[finalArray[i + 2].charCodeAt(0).toString()]
            + dataChar_1.hiddenCharTobin[finalArray[i + 3].charCodeAt(0).toString()];
        bufferArr.push(parseInt(codeBin, 2));
    }
    return new Uint8Array(bufferArr);
}
//# sourceMappingURL=decodeFileInText.js.map