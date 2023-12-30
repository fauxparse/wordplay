import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { RouterProvider } from '@tanstack/react-router';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './routes';
import { theme } from './theme';
import SettingsProvider from './SettingsProvider';
import { initializeFireworks } from './routes/Puzzle/Fireworks';

const root = document.getElementById('root');

if (root) {
  initializeFireworks().then(() => {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <ColorModeScript initialColorMode={theme.initialColorMode} />
        <ChakraProvider theme={theme}>
          <SettingsProvider>
            <RouterProvider router={router} />
          </SettingsProvider>
        </ChakraProvider>
      </React.StrictMode>,
    );
  });
}
