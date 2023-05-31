<style global>
    @import 'filepond/dist/filepond.css';
    @import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
</style>

<script>
// @ts-nocheck

    import toast from 'svelte-french-toast';
    import { addFileInText } from "chimpers-web"
    import { Textarea, Label, Button } from 'flowbite-svelte'     
    import { FileEarmarkLock } from 'svelte-bootstrap-svg-icons'; 

    import FilePond, { registerPlugin } from 'svelte-filepond';

    import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
    import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

    registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

    let pond;

    let files; // Files
    let encodingString = '' // string
    let outputString = '' // string

    async function clickSee(){
        if(!encodingString){
            toast.error('Missing encoding string.', {
                position: "top-right"
            })
            return 
        }

        if(!files || files.length <= 0){
            toast.error('Missing file input in encoding function.', {
                position: "top-right"
            })
            return 
        }

        let file = files[0];

        const data = await addFileInText(encodingString, file)
        outputString = data

        toast.success('Success to create encoded text and copy!', {
            position: "top-right"
        })
            
        copyText();

        // let reader = new FileReader();
        // reader.readAsArrayBuffer(file);

        // reader.onload = function() {
            
        //     let hiddenDataArr = encodeFile( new Uint8Array(reader.result) );
            
        //     let textArr = encodingString.split(" ");
        //     textArr[0] += hiddenDataArr.join("")

        //     const finalText = textArr.join(" ")
        //     outputString = finalText
            
        //     toast.success('Success to create encoded text and copy!', {
        //         position: "top-right"
        //     })
            
        //     copyText();
        // };

    }

    async function copyText(){

        try {
            await navigator.clipboard.writeText(outputString)
                
            toast.success('Success to copy encoded text!', {
                position: "top-right"
            })
        } 
        catch (error) {
            console.log(error);

            toast.error('Failed to copy encoded text!', {
                position: "top-right"
            })
        }
    
    }

    function handleRemove() {
	    files = null;
    }

    function handleAddFile(err, fileItem) {
        files = [fileItem.file]
    }
    
</script>

<div>

    <p class="text-2xl dark:text-white text-center">
        <FileEarmarkLock size="20" class="inline dark:text-white mb-1"/> Encode message 
    </p>

    <Label for="textarea-id" class="mb-2 mt-6">Encode message</Label>
    <Textarea 
        id="input-textarea-id" 
        placeholder="Your encode message" 
        rows="4" 
        name="input-message"
        on:change={ (e) => encodingString = e.target.value }
        bind:encodingString
        class="mb-4"
    />

    <FilePond 
        bind:this={pond} 
		allowMultiple={false}
		onaddfile={handleAddFile}
        onremovefile={handleRemove}
    />
    
    <div class="flex justify-end">
        <Button 
            class="mt-1" 
            gradient 
            color="cyanToBlue" 
            pill={true} 
            on:click={ () => clickSee() }
            disabled={!encodingString || !files}
        >
            Encode
        </Button>
    </div>

    {#if outputString}
        <Label for="textarea-id" class="mb-2 mt-6">Output message</Label>
        <Textarea 
            id="op-textarea-id" 
            placeholder="Your message" 
            rows="4" 
            name="op-message"
            value={outputString}
        />
        <div class="flex justify-end">
            <Button 
                class="mt-2" 
                gradient 
                color="cyanToBlue" 
                pill={true} 
                on:click={ () => copyText() }
            >
                Copy
            </Button>
        </div>
    {/if}

</div>