import { Container, Space, Text } from "@mantine/core";
import EncodeStrComp from "../components/EncodeStrComp";
import DecodeStrComp from "../components/DecodeStrComp";

function HomePage(){
    return (
        <>
        <Container size={"lg"}>
            <Text ta="center" fz={38} fw={300}> chimpers </Text>
            <Text ta="center" c="dimmed" fz={16} fw={300} mt={-8} mb={32}>
                Hide files / zip / images in text by hidden format
            </Text>

            <EncodeStrComp/>
            <Space h="md"/>

            <DecodeStrComp/>
        </Container>
        </>
    )
}
    
export default HomePage
