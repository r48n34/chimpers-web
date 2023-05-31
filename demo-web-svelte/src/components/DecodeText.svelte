<script>
// @ts-nocheck

    import toast from 'svelte-french-toast';
    import { stringDataToBuffer } from "chimpers-web"
    import { Textarea, Label, Button } from 'flowbite-svelte' 
    import { FileEarmarkLock2 } from 'svelte-bootstrap-svg-icons'; 

    import { filetypeinfo } from "magic-bytes.js"

    let decodeString = '' // string

    async function decodeStringToFile(){

        if(!decodeString){
            toast.error('Missing input Text decoding text.', {
                position: "top-right"
            })
            return
        }

        let bufferData = stringDataToBuffer(decodeString);

        if(bufferData.length === 0){
            toast.error('No encoded file in target text.', {
                position: "top-right"
            })
            return
        }

        downloadURL(bufferData)
    }

    // data: Uint8Array
    const downloadURL = (data) => {
        const link = document.createElement('a');
        link.style.display = 'none';
        document.body.appendChild( link );

        const blob = new Blob( [data], { type: '' } );	
        const objectURL = URL.createObjectURL( blob );
        
        const fileTypeList = filetypeinfo(data)
        const fileType = fileTypeList.length >= 1 ? fileTypeList[0].extension : "txt";

        link.href = objectURL;
        link.href = URL.createObjectURL( blob );
        link.download = `data.${fileType}`;
        link.click();

        toast.success('Success to download hidden File!', {
            position: "top-right"
        })

    }


</script>

<div>
    <p class="text-2xl dark:text-white text-center">
        <FileEarmarkLock2 size="20" class="inline dark:text-white mb-1"/> Decode message
    </p>

    <Label for="textarea-id" class="mb-2 mt-6">Decode message</Label>
    <Textarea 
        id="input-textarea-id" 
        placeholder="Your decode message" 
        rows="4" 
        name="input-message"
        on:input={ (e) => decodeString = e.target.value}
        bind:decodeString  
    />

    <div class="flex justify-end">
        <Button 
            class="mt-2" 
            gradient 
            color="cyanToBlue" 
            pill={true} 
            on:click={ () => decodeStringToFile() }
            disabled={!decodeString}
        >
            Decode
        </Button>
    </div>

</div>