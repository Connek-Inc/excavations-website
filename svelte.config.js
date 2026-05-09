import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	preprocess: [vitePreprocess()],

	kit: {
		// adapter-node: builds a Node.js server (works on Hostinger Node.js Hosting)
		// Public pages still prerender for max speed
		adapter: adapter({
			out: 'build',
			precompress: true,
			envPrefix: ''
		}),
		prerender: {
			handleMissingId: 'warn',
			handleHttpError: 'warn'
		}
	}
};
export default config;
