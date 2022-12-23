import { hiddenCharTobin, hiddenCharTobinNum } from "../data/dataChar";

export function stringDataToBuffer(encodedText: string){
    let finalArray = encodedText.split(" ")[0].split("").filter( v => hiddenCharTobinNum.indexOf(v.charCodeAt(0)) >= 0 );

    if(finalArray.length % 4 !== 0){
        throw new Error("Invalid input encodedText.")
    }
    
    let bufferArr = [];

    // Decode
    for(let i = 0; i < finalArray.length; i += 4){
        const codeBin = hiddenCharTobin[finalArray[i].charCodeAt(0)]
        + hiddenCharTobin[finalArray[i + 1].charCodeAt(0)]
        + hiddenCharTobin[finalArray[i + 2].charCodeAt(0)]
        + hiddenCharTobin[finalArray[i + 3].charCodeAt(0)]

        bufferArr.push(parseInt(codeBin, 2));
    }

    return new Uint8Array(bufferArr)
}