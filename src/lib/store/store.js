// store.js
import { writable } from 'svelte/store';

export const language = writable('fr'); // initial language
export const theme = writable('light'); // initial theme
