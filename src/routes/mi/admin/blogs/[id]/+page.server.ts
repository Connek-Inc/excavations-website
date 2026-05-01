import { error, fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { blogs } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const id = Number(params.id);
	if (!id) throw error(400, 'Invalid id');

	const blog = await db.query.blogs.findFirst({ where: eq(blogs.id, id) });
	if (!blog) throw error(404, 'Article introuvable');

	return { blog };
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const id = Number(params.id);
		const data = await request.formData();

		const slug = String(data.get('slug') || '').trim();
		const titleFr = String(data.get('titleFr') || '').trim();
		const contentFr = String(data.get('contentFr') || '').trim();

		if (!slug || !titleFr || !contentFr) {
			return fail(400, { error: 'Slug, titre et contenu (FR) sont requis' });
		}

		const tagsStr = String(data.get('tags') || '');
		const tags = tagsStr.split(',').map((t) => t.trim()).filter(Boolean);
		const published = data.get('published') === 'true';

		const existing = await db.query.blogs.findFirst({ where: eq(blogs.id, id) });
		if (!existing) return fail(404, { error: 'Introuvable' });

		await db
			.update(blogs)
			.set({
				slug,
				titleFr,
				titleEn: String(data.get('titleEn') || '') || null,
				titleEs: String(data.get('titleEs') || '') || null,
				excerptFr: String(data.get('excerptFr') || '') || null,
				excerptEn: String(data.get('excerptEn') || '') || null,
				excerptEs: String(data.get('excerptEs') || '') || null,
				contentFr,
				contentEn: String(data.get('contentEn') || '') || null,
				contentEs: String(data.get('contentEs') || '') || null,
				coverImage: String(data.get('coverImage') || '') || null,
				metaTitle: String(data.get('metaTitle') || '') || null,
				metaDescription: String(data.get('metaDescription') || '') || null,
				metaKeywords: String(data.get('metaKeywords') || '') || null,
				category: String(data.get('category') || '') || null,
				tags,
				published,
				publishedAt: published && !existing.publishedAt ? new Date() : existing.publishedAt,
				updatedAt: new Date()
			})
			.where(eq(blogs.id, id));

		return { success: true };
	}
};
