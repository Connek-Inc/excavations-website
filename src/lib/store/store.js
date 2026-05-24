// store.js
import { writable } from 'svelte/store';

const isBrowser = typeof window !== 'undefined';

function persistent(key, fallback) {
	let initial = fallback;
	if (isBrowser) {
		try {
			const saved = localStorage.getItem(key);
			if (saved) initial = saved;
		} catch {}
	}
	const store = writable(initial);
	if (isBrowser) {
		store.subscribe((value) => {
			try {
				localStorage.setItem(key, value);
				if (key === 'language') {
					const tag = value === 'fr' ? 'fr-CA' : value === 'es' ? 'es-ES' : 'en-CA';
					document.documentElement.setAttribute('lang', tag);
				}
			} catch {}
		});
	}
	return store;
}

export const language = persistent('language', 'fr');
export const theme = persistent('theme', 'light');
