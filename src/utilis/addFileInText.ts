import { encodeFile } from "./encodeFile";

function readFileToArrayBuffer(file: File):Promise<ArrayBuffer>{
    return new Promise( (rec, rej) => {
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = function() { 
            const data = reader.result as ArrayBuffer;
            rec(data); 
        };

        reader.onerror = function() { 
            rej(); 
        };
    })
}

export async function addFileInText(
    encodingString: string, // Text to add files
    file: File,             // Your txt / zip / file 
): Promise<string> {

    const fileBuffer = await readFileToArrayBuffer(file);
    const hiddenDataArr = encodeFile(new Uint8Array(fileBuffer));

    let textArr = encodingString.split(" ");
    textArr[0] += hiddenDataArr.join("")

    return textArr.join(" ");
}