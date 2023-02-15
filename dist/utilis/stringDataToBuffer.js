"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringDataToBuffer = void 0;
const dataChar_1 = require("../data/dataChar");
const stringDataDecode_1 = require("../data/stringDataDecode");
function stringDataToBuffer(encodedText, option) {
    const finalOption = Object.assign({ integrityMode: false }, option);
    let finalArray = (0, stringDataDecode_1.stringDataDecode)(encodedText, finalOption.integrityMode);
    if (finalArray.length % 4 !== 0) {
        throw new Error("Invalid input encodedText.");
    }
    let bufferArr = [];
    // Decode
    for (let i = 0; i < finalArray.length; i += 4) {
        const codeBin = dataChar_1.hiddenCharTobin[finalArray[i].charCodeAt(0)]
            + dataChar_1.hiddenCharTobin[finalArray[i + 1].charCodeAt(0)]
            + dataChar_1.hiddenCharTobin[finalArray[i + 2].charCodeAt(0)]
            + dataChar_1.hiddenCharTobin[finalArray[i + 3].charCodeAt(0)];
        bufferArr.push(parseInt(codeBin, 2));
    }
    return new Uint8Array(bufferArr);
}
exports.stringDataToBuffer = stringDataToBuffer;
//# sourceMappingURL=stringDataToBuffer.js.map