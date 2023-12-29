import React, { Suspense } from 'react';
import { Outlet } from '@tanstack/react-router';
import { Button, useColorMode } from '@chakra-ui/react';

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      );

const Layout: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Suspense fallback={null}>
      <Button pos="fixed" top="1rem" right="1rem" onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
      <Outlet />
      <TanStackRouterDevtools />
    </Suspense>
  );
};

export default Layout;
