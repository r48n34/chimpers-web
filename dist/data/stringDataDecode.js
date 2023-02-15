"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringDataDecode = void 0;
const dataChar_1 = require("./dataChar");
function stringDataDecode(encodedText, integrityMode = false) {
    let finalArray = integrityMode ? encodedText : encodedText.split(" ")[0];
    return finalArray
        .split("")
        .filter(v => dataChar_1.hiddenCharTobinNum.indexOf(v.charCodeAt(0)) >= 0);
}
exports.stringDataDecode = stringDataDecode;
//# sourceMappingURL=stringDataDecode.js.map