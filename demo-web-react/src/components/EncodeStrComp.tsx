import { FileInput, Grid, Group, Button, Textarea, Text } from "@mantine/core";
import { useForm } from '@mantine/form';
import { addFileInText } from "chimpers-web"
import { useState } from "react";
import { toast } from "react-hot-toast";
import { copyText } from "../utils/copyStr";

interface FormObject {
    inputString: string,
    fileInput: File | null,
}

function EncodeStrComp(){

    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ outputString, setOutputString ] = useState<string>("");

    const form = useForm<FormObject>({
        initialValues: {
            inputString: 'hello mate',
            fileInput: null,
        },
        validate: {
            inputString: (value) => (
                !value 
                ? 'Missing string'
                : !value.includes(" ")
                ? "Text should contain at least one spacing"
                : null
            ),
            fileInput: (value) => (
                !value 
                ? 'Missing file'
                : value.size / 1024 / 1024 >= 1.4 // in MiB 
                ? 'file too big'
                : null
            ),
        }
    });

    async function toEncodedString(values: FormObject){
        setIsLoading(true)

        const encodedString: string = await addFileInText(
            values.inputString,
            values.fileInput as File
        );

        copyText(encodedString);
        setOutputString(encodedString);

        toast.success("Enjoy your string.", {
            position: "top-right"
        });

        setIsLoading(false)
    }

    return (
        <>
        <Text ta="center" fz={24} fw={300} mb={16}>
            Hide file in string
        </Text>

        <Grid>
        <Grid.Col md={6}>
            <form onSubmit={form.onSubmit((values) => toEncodedString(values))}>
            <Textarea
                placeholder="inputString"
                minRows={3}
                label="inputString"
                withAsterisk
                {...form.getInputProps('inputString')}
            />

            <FileInput
                placeholder="Pick file"
                label="Your resume"
                withAsterisk
                {...form.getInputProps('fileInput')}
            />

            <Group position="right" mt="md">
                <Button type="submit" variant="light" loading={isLoading}>Submit</Button>
            </Group>

            </form>
        </Grid.Col>

        <Grid.Col md={6}>

            <Textarea
                placeholder="outputString"
                label="outputString"
                withAsterisk
                value={outputString}
            />

            <Group position="right" mt="md">
                <Button
                    variant="light"
                    disabled={!outputString}
                    onClick={ () => copyText(outputString) }
                >
                    Copy
                </Button>
            </Group>

        </Grid.Col>
        </Grid>
        </>
    )
}
    
export default EncodeStrComp
