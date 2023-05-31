import { Group } from "@mantine/core"
import ToggleThemeBtn from "./ToggleThemeBtn"
import { IconBrandGithubFilled, IconBrandNpm } from '@tabler/icons-react';
import GoUrlBtn from "./GoUrlBtn";


function Layout({ children }: any) {

    return (
        <>
            <Group position="right" mt={16} mr={16}>
                <GoUrlBtn title="Github" url={"https://github.com/r48n34/chimpers-web"} icon={<IconBrandGithubFilled size={16}/>}/>
                <GoUrlBtn title="npm" url={"https://www.npmjs.com/package/chimpers-web"} icon={<IconBrandNpm size={16}/>}/>
                <ToggleThemeBtn/>
            </Group>

            <div>
                {children}
            </div>
        </>
    )
}

export default Layout