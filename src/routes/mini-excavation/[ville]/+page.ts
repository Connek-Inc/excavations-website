import { error } from '@sveltejs/kit';
import { cities } from '$lib/seo/cities-data';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return cities.map((c) => ({ ville: c.slug }));
}

export const load: PageLoad = ({ params }) => {
	const city = cities.find((c) => c.slug === params.ville);
	if (!city) {
		throw error(404, 'Ville non trouvée');
	}
	return { city };
};
