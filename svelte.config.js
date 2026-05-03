import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	preprocess: [vitePreprocess()],

	kit: {
		// adapter-static: generates pure HTML/CSS/JS into `build/`
		// Compatible with Hostinger, Netlify, GitHub Pages, any static host.
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
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
