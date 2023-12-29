import {
  NotFoundRoute,
  RootRoute,
  Route,
  Router,
  redirect,
} from '@tanstack/react-router';
import PUZZLES from '../puzzles.yml';
import Puzzle from './Puzzle';
import Root from './Root';
import Layout from './Layout';

const rootRoute = new RootRoute({
  component: Layout,
});

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Root,
});

export const puzzleRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '$year',
  component: Puzzle,
  beforeLoad: ({ params: { year } }) => {
    if (!PUZZLES[year]) {
      throw redirect({ to: '/' });
    }
  },
  loader: ({ params: { year } }) => ({
    puzzle: PUZZLES[year],
  }),
});

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => <h1>Page not found</h1>,
});

const routeTree = rootRoute.addChildren([indexRoute, puzzleRoute]);

const router = new Router({ routeTree, notFoundRoute });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default router;
