# chimpers-web
Web version chimpers to Hide files / zip / images in text by hidden format.

[Web Demo](https://chimpers-sigma.vercel.app/) | [chimpers npm](https://www.npmjs.com/package/chimpers) | [chimpers-web npm](https://www.npmjs.com/package/chimpers-web) | [Github](https://github.com/r48n34/chimpers)

## Install 
```bash
npm i chimpers-web
yarn add chimpers-web
```

## Notices
1. Hidden file is not encrypted currently. 
2. Do not attempt to hide large size file.
3. Single file that smaller than 4kb is recommended.

## Usage
```ts
import { stringDataToBuffer, encodeFile } from "chimpers-web"


( async () => {

    // encode a file to hidden string array
    let resultString = encodeFile(bufferArray)

    // decode whole encoded string and extract the hidden file Uint8Array
    let resultUint8Array = stringDataToBuffer("Hello world mate")

})()
```

