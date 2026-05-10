import { db } from '$lib/server/db';
import { blogs } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const id = Number(params.id);
	if (!id) throw error(404, 'Not found');
	const blog = await db.query.blogs.findFirst({ where: eq(blogs.id, id) });
	if (!blog) throw error(404, 'Article not found');
	return { blog };
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const id = Number(params.id);
		const fd = await request.formData();
		const slug = String(fd.get('slug') ?? '').trim().toLowerCase();
		const titleFr = String(fd.get('titleFr') ?? '');
		const contentFr = String(fd.get('contentFr') ?? '');

		if (!slug || !titleFr || !contentFr) {
			return fail(400, { error: 'Slug, titre FR et contenu FR requis' });
		}

		const published = fd.get('published') === 'on';

		await db
			.update(blogs)
			.set({
				slug,
				titleFr,
				titleEn: String(fd.get('titleEn') ?? '') || null,
				titleEs: String(fd.get('titleEs') ?? '') || null,
				excerptFr: String(fd.get('excerptFr') ?? '') || null,
				excerptEn: String(fd.get('excerptEn') ?? '') || null,
				excerptEs: String(fd.get('excerptEs') ?? '') || null,
				contentFr,
				contentEn: String(fd.get('contentEn') ?? '') || null,
				contentEs: String(fd.get('contentEs') ?? '') || null,
				coverImage: String(fd.get('coverImage') ?? '') || null,
				metaTitle: String(fd.get('metaTitle') ?? '') || null,
				metaDescription: String(fd.get('metaDescription') ?? '') || null,
				category: String(fd.get('category') ?? '') || null,
				published,
				publishedAt: published ? new Date() : null
			})
			.where(eq(blogs.id, id));

		return { success: true };
	}
};
