/**
 * The site is not always served from the domain root — GitHub Pages serves
 * this repo under /<repo>/ — so in-app paths are resolved against Vite's
 * configured base rather than against the root.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** The current in-app path, with the deploy base stripped off. */
export function currentPath(): string {
  const { pathname } = window.location;
  const rel = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  return rel.startsWith('/') ? rel : `/${rel}`;
}

/** Turn an in-app path into an href that works under the deploy base. */
export function href(path: string): string {
  return `${BASE}${path}`;
}
