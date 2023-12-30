import React, { Suspense } from 'react';
import { Outlet } from '@tanstack/react-router';
import Header from './Header';

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
  return (
    <Suspense fallback={null}>
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
    </Suspense>
  );
};

export default Layout;
