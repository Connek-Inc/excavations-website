import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	preprocess: [vitePreprocess()],

	kit: {
		adapter: adapter({
			out: 'build',
			precompress: false,
			envPrefix: ''
		}),
		prerender: {
			handleMissingId: 'warn',
			handleHttpError: 'warn'
		}
	}
};
export default config;
