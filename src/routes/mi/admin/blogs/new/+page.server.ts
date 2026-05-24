import { db } from '$lib/server/db';
import { blogs } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const fd = await request.formData();
		const slug = String(fd.get('slug') ?? '').trim().toLowerCase();
		const titleFr = String(fd.get('titleFr') ?? '');
		const contentFr = String(fd.get('contentFr') ?? '');

		if (!slug || !titleFr || !contentFr) {
			return fail(400, { error: 'Slug, titre FR et contenu FR requis' });
		}

		const published = fd.get('published') === 'on';

		const result = await db.insert(blogs).values({
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
			publishedAt: published ? new Date() : null,
			authorId: locals.admin?.id || null
		});

		const insertedId = (result as any)[0]?.insertId;
		throw redirect(303, insertedId ? `/mi/admin/blogs/${insertedId}` : '/mi/admin/blogs');
	}
};
