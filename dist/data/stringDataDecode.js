"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringDataDecode = stringDataDecode;
const dataChar_1 = require("./dataChar");
function stringDataDecode(encodedText, integrityMode = false) {
    let finalArray = encodedText;
    return finalArray
        .split("")
        .filter(v => dataChar_1.hiddenCharTobinNum.indexOf(v.charCodeAt(0)) >= 0);
}
//# sourceMappingURL=stringDataDecode.js.map