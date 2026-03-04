import { Container, Text, Tabs, rem } from "@mantine/core";
import { IconLock, IconLockOpen } from "@tabler/icons-react";
import EncodeStrComp from "../components/EncodeStrComp";
import DecodeStrComp from "../components/DecodeStrComp";

function HomePage(){
    return (
        <Container size="md" py="xl">
            <Text ta="center" fz={48} fw={900} variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>
                Chimpers Web
            </Text>
            <Text ta="center" c="dimmed" fz={18} fw={400} mt="md" mb="xl">
                Seamlessly hide and extract files, zips, or images within plain text using hidden formatting.
            </Text>

            <Tabs defaultValue="encode" variant="outline" radius="md">
                <Tabs.List grow>
                    <Tabs.Tab value="encode" leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}>
                        Encode File
                    </Tabs.Tab>
                    <Tabs.Tab value="decode" leftSection={<IconLockOpen style={{ width: rem(16), height: rem(16) }} />}>
                        Decode File
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="encode" pt="xl">
                    <EncodeStrComp/>
                </Tabs.Panel>

                <Tabs.Panel value="decode" pt="xl">
                    <DecodeStrComp/>
                </Tabs.Panel>
            </Tabs>
        </Container>
    )
}
    
export default HomePage
