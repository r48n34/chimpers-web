import { useState } from "react";
import { Button, Card, Group, Text, Textarea, Stack, Center, rem, Alert } from "@mantine/core";
import { decodeFileInText } from "chimpers-web"
import toast from "react-hot-toast";
import { filetypeinfo } from "magic-bytes.js"
import { uuidSmall } from "../utils/uuid";
import { IconDownload, IconInfoCircle, IconFileSearch } from "@tabler/icons-react";

function DecodeStrComp() {

    const [inputString, setInputString] = useState<string>("");

    function decodeString() {
        if (!inputString || !inputString.includes(" ")) {
            toast.error("Please enter a valid encoded string containing space", { position: "top-right" });
            return
        }

        try {
            const fileArray: Uint8Array = decodeFileInText(inputString);
            downloadURL(fileArray)
        } catch (e: any) {
             toast.error(e.message || "Failed to decode the string", { position: "top-right" });
        }
    }

    // data: Uint8Array
    const downloadURL = (data: Uint8Array) => {
        const link = document.createElement('a');
        link.style.display = 'none';
        document.body.appendChild(link);

        const blob = new Blob([data as any], { type: '' });
        const objectURL = URL.createObjectURL(blob);

        const fileTypeList = filetypeinfo(data)
        const fileType = fileTypeList.length >= 1 ? fileTypeList[0].extension : "txt";

        link.href = objectURL;
        link.href = URL.createObjectURL(blob);
        link.download = `chimpers_decoded_${uuidSmall()}.${fileType}`;
        link.click();

        toast.success(`Success! Downloaded hidden ${fileType.toUpperCase()} file.`, {
            position: "top-right",
            duration: 4000
        })

    }

    return (
        <Card shadow="sm" padding="xl" radius="md" withBorder>
            <Stack gap="lg">
                <Alert 
                    variant="light" 
                    color="blue" 
                    title="How to use Decode" 
                    icon={<IconInfoCircle style={{ width: rem(18), height: rem(18) }} />}
                >
                    Paste the text that contains hidden data into the field below. If a hidden file is detected, it will be extracted and automatically downloaded to your device.
                </Alert>

                <Textarea
                    placeholder="Paste the message containing the hidden magic..."
                    minRows={6}
                    label="Encoded Target String"
                    description="The visible string carrying the concealed file"
                    withAsterisk
                    value={inputString}
                    onChange={(event) => setInputString(event.currentTarget.value)}
                />

                <Center mt="md">
                    <Button 
                        size="md" 
                        onClick={() => decodeString()} 
                        disabled={!inputString || !inputString.trim()}
                        leftSection={<IconFileSearch style={{ width: rem(18), height: rem(18) }} />}
                    >
                        Extract & Download File
                    </Button>
                </Center>
            </Stack>
        </Card>
    )
}

export default DecodeStrComp
