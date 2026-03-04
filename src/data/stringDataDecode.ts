import { hiddenCharTobinNum } from "./dataChar";

export function stringDataDecode(encodedText: string, integrityMode: boolean = false){

    let finalArray = encodedText;

    return finalArray
        .split("")
        .filter( v => hiddenCharTobinNum.indexOf(v.charCodeAt(0)) >= 0 );
}