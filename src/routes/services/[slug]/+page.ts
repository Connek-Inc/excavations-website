import { error } from '@sveltejs/kit';
import { services } from '$lib/seo/services-content';

export const prerender = true;

export function entries() {
	return services.map((s) => ({ slug: s.slug }));
}

export function load({ params }: { params: { slug: string } }) {
	const service = services.find((s) => s.slug === params.slug);
	if (!service) throw error(404, 'Service not found');
	return { service };
}
