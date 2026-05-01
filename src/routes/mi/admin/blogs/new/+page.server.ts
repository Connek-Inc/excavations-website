import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { blogs } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const slug = String(data.get('slug') || '').trim();
		const titleFr = String(data.get('titleFr') || '').trim();
		const contentFr = String(data.get('contentFr') || '').trim();

		if (!slug || !titleFr || !contentFr) {
			return fail(400, { error: 'Slug, titre et contenu (FR) sont requis' });
		}

		const exists = await db.query.blogs.findFirst({ where: eq(blogs.slug, slug) });
		if (exists) return fail(400, { error: 'Ce slug existe déjà' });

		const tagsStr = String(data.get('tags') || '');
		const tags = tagsStr.split(',').map((t) => t.trim()).filter(Boolean);
		const published = data.get('published') === 'true';

		const [created] = await db
			.insert(blogs)
			.values({
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
				publishedAt: published ? new Date() : null
			})
			.returning();

		throw redirect(303, `/mi/admin/blogs/${created.id}`);
	}
};
