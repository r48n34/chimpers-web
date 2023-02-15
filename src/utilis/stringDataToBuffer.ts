import { hiddenCharTobin } from "../data/dataChar";
import { stringDataDecode } from "../data/stringDataDecode";

interface stringDataToBufferOptions {
    integrityMode?: boolean
}

export function stringDataToBuffer(encodedText: string, option?: stringDataToBufferOptions ){
    const finalOption = {
        integrityMode: false,
        ...option
    }

    let finalArray = stringDataDecode(encodedText, finalOption.integrityMode)

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