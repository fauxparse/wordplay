import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './routes/Root';
import Puzzle, { loader as puzzleLoader } from './routes/Puzzle';
import { ROUTES } from './routes';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { theme } from './theme';

const router = createBrowserRouter([
  {
    path: ROUTES.ROOT.path,
    element: <Root />,
  },
  {
    path: ROUTES.PUZZLE.path,
    element: <Puzzle />,
    loader: puzzleLoader,
  },
]);

// biome-ignore lint/style/noNonNullAssertion:
const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.initialColorMode} />
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);
