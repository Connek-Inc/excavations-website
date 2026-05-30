// The token magic-link page is fully client-rendered. It fetches the
// quote via /api/connek/quote/:token on mount, so neither prerender nor
// SSR are appropriate (adapter-static would try to crawl every possible
// token, and we have no list of valid tokens at build time).
export const prerender = false;
export const ssr = false;
