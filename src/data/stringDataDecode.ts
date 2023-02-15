import { hiddenCharTobinNum } from "./dataChar";

export function stringDataDecode(encodedText: string, integrityMode: boolean = false){

    let finalArray = integrityMode ? encodedText : encodedText.split(" ")[0];

    return finalArray
        .split("")
        .filter( v => hiddenCharTobinNum.indexOf(v.charCodeAt(0)) >= 0 );
}