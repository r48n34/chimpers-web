import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import HomePage from './pages/HomePage';
import Layout from './components/Layout';
import { Toaster } from 'react-hot-toast';

type ColorScheme = 'light' | 'dark' | 'auto';

export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <MantineProvider defaultColorScheme={colorScheme}>
      <Toaster />
      <Layout>
        <HomePage />
      </Layout>
    </MantineProvider>
  );
}