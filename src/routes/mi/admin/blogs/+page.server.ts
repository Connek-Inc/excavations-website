import { db } from '$lib/server/db';
import { blogs } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const items = await db.select().from(blogs).orderBy(desc(blogs.createdAt));
	return { items };
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		if (!id) return fail(400, { error: 'ID manquant' });
		await db.delete(blogs).where(eq(blogs.id, id));
		return { success: true };
	},
	togglePublish: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		const published = data.get('published') === 'true';
		await db
			.update(blogs)
			.set({
				published: !published,
				publishedAt: !published ? new Date() : null,
				updatedAt: new Date()
			})
			.where(eq(blogs.id, id));
		return { success: true };
	}
};
