import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	preprocess: [vitePreprocess()],

	kit: {
		// adapter-node generates `build/index.js` — a Node entry point that
		// serves SSR + static assets + every `+server.ts` route (including
		// /api/connek/* with HMAC signing). Replaces the old Express
		// server.js entirely. Hostinger Node.js panel points to build/index.js.
		adapter: adapter({ out: 'build' }),
		prerender: {
			handleMissingId: 'warn',
			handleHttpError: 'warn'
		}
	}
};
export default config;
