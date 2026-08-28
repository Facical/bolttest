import { lazy } from 'react';

/**
 * This project has no router, so pages are resolved from the current path.
 * Each route is loaded lazily so a page only pulls in the dependencies it
 * actually uses (e.g. /hello does not load the Supabase client).
 */
const routes = {
  '/hello': () => import('@/pages/Hello'),
} as const;

const load = routes[window.location.pathname as keyof typeof routes] ?? (() => import('@/App'));

export const CurrentPage = lazy(load);
