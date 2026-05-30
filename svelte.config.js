import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	preprocess: [vitePreprocess()],

	kit: {
		// adapter-static produces a pure HTML/JS/CSS bundle under `build/`.
		// The Express `server.js` at the repo root serves that bundle AND
		// hosts the `/api/connek/*` HMAC proxy routes. Hostinger's LSAPI
		// (lsnode.js) picks up `server.js` automatically — no Node.js app
		// registration in hPanel is required (which is the path we tried
		// and gave up on; LSAPI bootstrapping is the resilient mode for
		// this shared host).
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '200.html',
			precompress: false,
			strict: false
		}),
		prerender: {
			handleMissingId: 'warn',
			handleHttpError: 'warn',
			entries: ['*']
		}
	}
};
export default config;
