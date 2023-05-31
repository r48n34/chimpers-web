# chimpers-web
Web version chimpers to Hide files / zip / images in text by hidden format.
Works in React / Svelte

[Web Demo](https://chimpers-web.vercel.app/) |
[chimpers npm](https://www.npmjs.com/package/chimpers) | 
[chimpers-web npm](https://www.npmjs.com/package/chimpers-web) | 
[Github](https://github.com/r48n34/chimpers-web)

## Install 
```bash
npm i chimpers-web
yarn add chimpers-web
```

## Notices
1. Hidden file is not encrypted currently. 
2. Do not attempt to hide large file.
3. Single file that smaller than 4kb is recommended.

## Usage
```ts
import { addFileInText, decodeFileInText } from "chimpers-web"

( async () => {

    const file: File = new File() // Or File that read from <input type"file">
    const encodedString: string = await addFileInText("Hello world", file);

    const fileArray: Uint8Array = decodeFileInText(encodedString);

})()
```

## Utilis
```ts
// Hide files in text
export async function addFileInText(
    encodingString: string, // Text to add files
    file: File,             // Your txt / zip / file 
): Promise<string> 


// decode encoded string
export function decodeFileInText(
    encodedText: string, 
): Uint8Array
```

## Demo in web

### React
[Github code](https://github.com/r48n34/chimpers-web/tree/main/demo-web-react)

```tsx
import { useState } from "react";
import { addFileInText, decodeFileInText } from "chimpers-web"

export default function FileUploadSingle() {
  const [file, setFile] = useState<File>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files && setFile(e.target.files[0]);
  };

  const processString = async () => {
    if (!file) {
      return;
    }

    // Encode text
    const resultString: string = await addFileInText(
        "Hello mate",
        file
    );

    // Decode text
    const decodeFile: Uint8Array = decodeFileInText(resultString);
  };

  return (
    <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={processString}>
            Process
        </button>
    </div>
  );
}
```

### Svelte
[Github code](https://github.com/r48n34/chimpers-web/tree/main/demo-web-svelte)