import path from "path";
import fs from "fs";
import { addFileInText } from "../src/index"
import { decodeFileInText } from "../src/index"

describe("addFileInText function testing", () => {

    const filePath = path.join(__dirname, "..", "test-data" , "hello.zip")
    const fileData = fs.readFileSync(filePath)

    test('addFileInText normal text', async () => {
        const carrierText = "hello mate I am peter.";
        let text = await addFileInText(carrierText, fileData as any);
        let decodedFile = decodeFileInText(text);

        const originalWords = carrierText.split(" ").length;
        const encodedWords = text.split(" ").length;

        expect(encodedWords).toBe(originalWords);
        expect(text).toContain(" ");
        expect(Buffer.from(decodedFile)).toEqual(fileData);
    })

    // Test with empty string
    test('addFileInText with empty string', async () => {
        const carrierText = "";
        let text = await addFileInText(carrierText, fileData as any);
        let decodedFile = decodeFileInText(text);

        // Empty string should still encode the file data
        expect(Buffer.from(decodedFile)).toEqual(fileData);
    })

    // Test with single word
    test('addFileInText with single word', async () => {
        const carrierText = "hello";
        let text = await addFileInText(carrierText, fileData as any);
        let decodedFile = decodeFileInText(text);

        // Single word should still encode the file data
        expect(Buffer.from(decodedFile)).toEqual(fileData);
    })

    // Test with multiple spaces between words
    test('addFileInText with multiple spaces', async () => {
        const carrierText = "hello    mate   I    am    peter";
        let text = await addFileInText(carrierText, fileData as any);
        let decodedFile = decodeFileInText(text);

        // Extra spaces should be handled (split by single space)
        const originalWords = carrierText.split(" ").filter(w => w.length > 0).length;
        const textWords = text.split(" ").filter(w => w.length > 0).length;
        
        expect(textWords).toBe(originalWords);
        expect(Buffer.from(decodedFile)).toEqual(fileData);
    })

    // Test with newlines and multiline text
    test('addFileInText with multiline text', async () => {
        const carrierText = "hello\nmate\nI\nam\npeter";
        let text = await addFileInText(carrierText, fileData as any);
        let decodedFile = decodeFileInText(text);

        // Should handle newlines
        expect(Buffer.from(decodedFile)).toEqual(fileData);
    })

    // Test with special characters
    test('addFileInText with special characters', async () => {
        const carrierText = "Hello, World! How are you? I'm fine.";
        let text = await addFileInText(carrierText, fileData as any);
        let decodedFile = decodeFileInText(text);

        const originalWords = carrierText.split(" ").length;
        const encodedWords = text.split(" ").length;

        expect(encodedWords).toBe(originalWords);
        expect(Buffer.from(decodedFile)).toEqual(fileData);
    })

    // Test with text file instead of zip
    test('addFileInText with txt file', async () => {
        const txtFilePath = path.join(__dirname, "..", "test-data", "hello.txt")
        const txtFileData = fs.readFileSync(txtFilePath)
        
        const carrierText = "hello mate I am peter.";
        let text = await addFileInText(carrierText, txtFileData as any);
        let decodedFile = decodeFileInText(text);

        expect(Buffer.from(decodedFile)).toEqual(txtFileData);
    })

    // Test with PNG image file
    test('addFileInText with png file', async () => {
        const pngFilePath = path.join(__dirname, "..", "test-data", "460989.png")
        const pngFileData = fs.readFileSync(pngFilePath)
        
        const carrierText = "encode this image please.";
        let text = await addFileInText(carrierText, pngFileData as any);
        let decodedFile = decodeFileInText(text);

        expect(Buffer.from(decodedFile)).toEqual(pngFileData);
    })

    // Test with ArrayBuffer input
    test('addFileInText with ArrayBuffer input', async () => {
        const carrierText = "hello mate I am peter.";
        const arrayBuffer = fileData.buffer.slice(fileData.byteOffset, fileData.byteOffset + fileData.byteLength);
        
        let text = await addFileInText(carrierText, arrayBuffer);
        let decodedFile = decodeFileInText(text);

        expect(Buffer.from(decodedFile)).toEqual(fileData);
    })

    // Test with Uint8Array input
    test('addFileInText with Uint8Array input', async () => {
        const carrierText = "hello mate I am peter.";
        const uint8Array = new Uint8Array(fileData);
        
        let text = await addFileInText(carrierText, uint8Array);
        let decodedFile = decodeFileInText(text);

        expect(Buffer.from(decodedFile)).toEqual(fileData);
    })

    // Test with only whitespace text
    test('addFileInText with only spaces', async () => {
        const carrierText = "     ";
        let text = await addFileInText(carrierText, fileData as any);
        let decodedFile = decodeFileInText(text);

        // Only spaces should still encode the file data
        expect(Buffer.from(decodedFile)).toEqual(fileData);
    })

    // Test with long text (more words than encoded chunks)
    test('addFileInText with long text', async () => {
        const carrierText = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
        let text = await addFileInText(carrierText, fileData as any);
        console.log(`"text`, text)
        let decodedFile = decodeFileInText(text);

        const originalWords = carrierText.split(" ").filter(w => w.length > 0).length;
        const encodedWords = text.split(" ").filter(w => w.length > 0).length;

        expect(encodedWords).toBe(originalWords);
        expect(Buffer.from(decodedFile)).toEqual(fileData);
    })

    // Test with short text (fewer words than encoded chunks)
    test('addFileInText with short text for large file', async () => {
        const pngFilePath = path.join(__dirname, "..", "test-data", "460989.png")
        const pngFileData = fs.readFileSync(pngFilePath)
        
        // Short text with large file - should distribute across limited words
        const carrierText = "hi";
        let text = await addFileInText(carrierText, pngFileData as any);
        let decodedFile = decodeFileInText(text);

        expect(Buffer.from(decodedFile)).toEqual(pngFileData);
    })

    // Test that original text is preserved in encoded output
    test('addFileInText preserves original text content', async () => {
        const carrierText = "hello mate I am peter.";
        let text = await addFileInText(carrierText, fileData as any);
        
        // The original words should still be present
        expect(text).toContain("hello");
        expect(text).toContain("mate");
        expect(text).toContain("I");
        expect(text).toContain("am");
        expect(text).toContain("peter.");
    })

    // Test with Unicode characters in text
    test('addFileInText with Unicode text', async () => {
        const carrierText = "你好世界 hello 世界";
        let text = await addFileInText(carrierText, fileData as any);
        let decodedFile = decodeFileInText(text);

        expect(Buffer.from(decodedFile)).toEqual(fileData);
    })

    // Test with tab characters
    test('addFileInText with tabs', async () => {
        const carrierText = "hello\tmate\tI\tam\tpeter";
        let text = await addFileInText(carrierText, fileData as any);
        let decodedFile = decodeFileInText(text);

        expect(Buffer.from(decodedFile)).toEqual(fileData);
    })

})
