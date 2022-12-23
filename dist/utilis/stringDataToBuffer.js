"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringDataToBuffer = void 0;
const dataChar_1 = require("../data/dataChar");
function stringDataToBuffer(encodedText) {
    let finalArray = encodedText.split(" ")[0].split("").filter(v => dataChar_1.hiddenCharTobinNum.indexOf(v.charCodeAt(0)) >= 0);
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