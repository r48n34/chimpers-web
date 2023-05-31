<script>
    import "../app.postcss";
    import { DarkMode, Button } from 'flowbite-svelte';
    import { Toaster } from 'svelte-french-toast';
    import { Github, CloudDownload } from 'svelte-bootstrap-svg-icons'; // DatabaseFillLock

    import EncodeFile from "../components/EncodeFile.svelte";
    import DecodeText from "../components/DecodeText.svelte";

    let btnClass =
        "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xl p-2";
</script>

<div class="container mx-auto px-10">
    <Toaster />

    <div class="flex justify-between mt-2">

        <div class="flex justify-center mt-2">
            <a href="https://www.npmjs.com/package/chimpers" >
                <CloudDownload size="16" class=" dark:text-white"/>
            </a>
            <a href="https://github.com/r48n34/chimpers" class="ml-3">
                <Github size="16" class=" dark:text-white"/>
            </a>
        </div>
        
        <DarkMode {btnClass} />
    </div>

    <div style="text-align: center;">
        <p class="text-5xl dark:text-white">chimpers</p>
        <p class="text-xl dark:text-white mt-2">Hide files / zip / images in text by hidden format</p>
    </div>

    <br />

    <EncodeFile />
    <DecodeText />

    <br />

</div>

<!-- <slot /> -->
