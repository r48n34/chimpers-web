import { encodeFile } from "./encodeFile";

async function readFileToArrayBuffer(file: File | Blob | ArrayBuffer | Uint8Array): Promise<ArrayBuffer> {
    if(file instanceof ArrayBuffer){
        return file;
    }

    if(ArrayBuffer.isView(file)){
        return file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength) as ArrayBuffer;
    }

    if(typeof Blob !== "undefined" && file instanceof Blob){
        return file.arrayBuffer();
    }

    throw new Error("Unsupported file type.");
}

export async function addFileInText(
    encodingString: string, // Text to add files
    file: File | Blob | ArrayBuffer | Uint8Array, // Your txt / zip / file 
): Promise<string> {

    const fileBuffer = await readFileToArrayBuffer(file);
    const hiddenDataArr = encodeFile(new Uint8Array(fileBuffer));

    let textArr = encodingString.split(" ");
    const wordIndexes = textArr
        .map((word, index) => ({ word, index }))
        .filter(({ word }) => word.length > 0)
        .map(({ index }) => index);

    if(wordIndexes.length === 0){
        return hiddenDataArr.join("");
    }

    const baseChunkSize = Math.floor(hiddenDataArr.length / wordIndexes.length);
    const remainder = hiddenDataArr.length % wordIndexes.length;
    let hiddenDataOffset = 0;

    for(let i = 0; i < wordIndexes.length; i++){
        const extra = i < remainder ? 1 : 0;
        const chunkSize = baseChunkSize + extra;

        if(chunkSize <= 0){
            continue;
        }

        const chunk = hiddenDataArr.slice(hiddenDataOffset, hiddenDataOffset + chunkSize).join("");
        textArr[wordIndexes[i]] += chunk;
        hiddenDataOffset += chunkSize;
    }

    return textArr.join(" ");
}