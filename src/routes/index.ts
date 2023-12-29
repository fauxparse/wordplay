import { route } from 'react-router-typesafe-routes/dom';
import { zod } from 'react-router-typesafe-routes/zod';
import { z } from 'zod';

export const ROUTES = {
  ROOT: route(''),
  PUZZLE: route(':year', {
    params: { year: zod(z.string().regex(/^\d{4}$/)) },
  }),
};
