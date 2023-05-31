import { useState } from "react";
import { Button, Group, Text, Textarea } from "@mantine/core";
import { decodeFileInText } from "chimpers-web"
import toast from "react-hot-toast";
import { filetypeinfo } from "magic-bytes.js"
import { uuidSmall } from "../utils/uuid";

function DecodeStrComp(){

    const [ outputString, setOutputString ] = useState<string>("");

    function decodeString(){
        if(!outputString || !outputString.includes(" ")){
            return
        }

        const fileArray: Uint8Array = decodeFileInText(outputString);
        downloadURL(fileArray)
    }

    // data: Uint8Array
    const downloadURL = (data: Uint8Array) => {
        const link = document.createElement('a');
        link.style.display = 'none';
        document.body.appendChild( link );

        const blob = new Blob( [data], { type: '' } );	
        const objectURL = URL.createObjectURL( blob );
        
        const fileTypeList = filetypeinfo(data)
        const fileType = fileTypeList.length >= 1 ? fileTypeList[0].extension : "txt";

        link.href = objectURL;
        link.href = URL.createObjectURL( blob );
        link.download = `${uuidSmall()}.${fileType}`;
        link.click();

        toast.success('Success to download hidden File!', {
            position: "top-right"
        })

    }
    
    return (
        <>
        <Text ta="center" fz={24} fw={300} mb={16}>
            Decode file from string
        </Text>

        <Textarea
            placeholder="outputString"
            minRows={3}
            label="outputString"
            withAsterisk
            value={outputString}
            onChange={(event) => setOutputString(event.currentTarget.value)}
        />

        <Group position="right" mt="md">
            <Button variant="light" onClick={ () => decodeString() } disabled={!outputString}>Decode</Button>
        </Group>
        </>
    )
}
    
export default DecodeStrComp
