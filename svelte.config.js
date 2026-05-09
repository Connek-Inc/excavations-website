import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	preprocess: [vitePreprocess()],

	kit: {
		// adapter-static: generates pure HTML/CSS/JS that LiteSpeed serves directly from public_html
		// This is what Hostinger shared hosting expects.
		// Admin (/mi/admin/*) is excluded from prerender via the layout file.
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
