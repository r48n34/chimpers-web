import { FileInput, Grid, Group, Button, Textarea, Text, Card, Stack, rem } from "@mantine/core";
import { useForm } from '@mantine/form';
import { addFileInText } from "chimpers-web"
import { useState } from "react";
import { toast } from "react-hot-toast";
import { copyText } from "../utils/copyStr";
import { IconUpload, IconCopy, IconWand } from "@tabler/icons-react";

interface FormObject {
    inputString: string,
    fileInput: File | null,
}

function EncodeStrComp() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [outputString, setOutputString] = useState<string>("");

    const form = useForm<FormObject>({
        initialValues: {
            inputString: 'Hello mate!',
            fileInput: null,
        },
        validate: {
            inputString: (value) => (
                !value
                    ? 'Missing string'
                    // : !value.includes(" ")
                    //     ? "Text should contain at least one spacing"
                    : null
            ),
            fileInput: (value) => (
                !value
                    ? 'Missing file'
                    : value.size / 1024 / 1024 >= 1 // in MiB 
                        ? 'File must be less than 1MB'
                        : null
            ),
        }
    });

    async function toEncodedString(values: FormObject) {
        setIsLoading(true)

        try {
            const encodedString: string = await addFileInText(
                values.inputString,
                values.fileInput as File
            );

            setOutputString(encodedString);

            toast.success("Successfully hidden the file into the text!", {
                position: "top-right"
            });
        } catch (e: any) {
            toast.error(e.message || "Something went wrong", { position: "top-right" });
        }

        setIsLoading(false)
    }

    return (
        <Card shadow="sm" padding="xl" radius="md" withBorder>
            <Grid gutter="xl" align="flex-start">
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <form onSubmit={form.onSubmit((values) => toEncodedString(values))}>
                        <Stack gap="md">
                            <div>
                                <Text fw={500} size="lg" mb="sm">1. Choose text and file</Text>
                                <Text c="dimmed" size="sm" mb="md">Provide the carrier string (must contain spaces) and the file you want to hide.</Text>
                            </div>

                            <Textarea
                                placeholder="Example: Here is a lovely message with a secret..."
                                minRows={4}
                                label="Carrier String"
                                description="The visible text that will conceal the file"
                                withAsterisk
                                {...form.getInputProps('inputString')}
                            />

                            <div>
                                <FileInput
                                    placeholder="Click to browse or drop file here"
                                    label="File to Hide"
                                    description="Maximum size: 1MB"
                                    leftSection={<IconUpload style={{ width: rem(18), height: rem(18) }} />}
                                    withAsterisk
                                    {...form.getInputProps('fileInput')}
                                />
                            </div>

                            <Button
                                type="submit"
                                mt="sm"
                                size="md"
                                disabled={
                                    form.values.inputString.trim() === ""
                                    || form.values.fileInput === null
                                    || form.errors.inputString !== undefined
                                    || form.errors.fileInput !== undefined
                                }
                                loading={isLoading}
                                leftSection={<IconWand style={{ width: rem(18), height: rem(18) }} />}
                            >
                                Generate Hidden String
                            </Button>
                        </Stack>
                    </form>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Stack gap="md" h="100%">
                        <div>
                            <Text fw={500} size="lg" mb="sm">2. Result</Text>
                            <Text c="dimmed" size="sm" mb="md">Copy the encoded string and share it. It will look like normal text to others.</Text>
                        </div>

                        <Textarea
                            placeholder="Your encoded string will appear here..."
                            minRows={7}
                            label="Output Result"
                            readOnly
                            value={outputString}
                            styles={{ input: { cursor: 'text' } }}
                        />

                        <Group justify="flex-end" mt="auto">
                            <Button
                                variant="light"
                                disabled={!outputString}
                                onClick={() => {
                                    copyText(outputString);
                                    toast.success("Copied to clipboard!", { position: "top-right" });
                                }}
                                leftSection={<IconCopy style={{ width: rem(18), height: rem(18) }} />}
                            >
                                Copy to Clipboard
                            </Button>
                        </Group>
                    </Stack>
                </Grid.Col>
            </Grid>
        </Card>
    )
}

export default EncodeStrComp
