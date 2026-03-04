"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dec2bin = dec2bin;
exports.encodeFile = encodeFile;
const dataChar_1 = require("../data/dataChar");
function dec2bin(dec) {
    let decStr = (dec >>> 0).toString(2);
    // Expect a output should be 8 bit e.g.(00110110)
    while (decStr.length <= 7) {
        decStr = "0" + decStr;
    }
    return decStr;
}
function encodeFile(data) {
    let finalArray = [];
    // Encode
    for (let v of data) {
        const binStr = dec2bin(v);
        for (let i = 0; i < 7; i += 2) {
            const code = (binStr[i] + binStr[i + 1]);
            const strls = dataChar_1.binToHiddenChar[code];
            finalArray.push(strls);
        }
    }
    return finalArray;
}
//# sourceMappingURL=encodeFile.js.map