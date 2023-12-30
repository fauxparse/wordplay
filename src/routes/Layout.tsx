import React, { Suspense } from 'react';
import { Outlet } from '@tanstack/react-router';
import Header from './Header';
import ConfirmationProvider from '../ConfirmationProvider';

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

const Layout: React.FC = () => (
  <Suspense fallback={null}>
    <ConfirmationProvider>
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
    </ConfirmationProvider>
  </Suspense>
);

export default Layout;
