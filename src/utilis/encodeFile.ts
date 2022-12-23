import { binToHiddenChar } from "../data/dataChar";

export function dec2bin(dec:number) {
    let decStr = (dec >>> 0).toString(2);

    // Expect a output should be 8 bit e.g.(00110110)
    while(decStr.length <= 7){
        decStr = "0" + decStr
    }

    return decStr
}

export function encodeFile(data: Buffer): string[] {

    let finalArray:string[] = [] 

    // Encode
    for(let v of data){
 
        const binStr = dec2bin(v);

        for(let i = 0; i < 7; i += 2){
            const code = binStr[i] + binStr[i + 1]
            finalArray.push(binToHiddenChar[code])
        }
           
    }

    return finalArray
}