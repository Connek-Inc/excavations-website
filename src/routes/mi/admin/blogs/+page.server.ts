import { db } from '$lib/server/db';
import { blogs } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const items = await db.select().from(blogs).orderBy(desc(blogs.updatedAt));
	return { items };
};

export const actions: Actions = {
	togglePublish: async ({ request }) => {
		const fd = await request.formData();
		const id = Number(fd.get('id'));
		const current = String(fd.get('published')) === 'true';
		await db
			.update(blogs)
			.set({ published: !current, publishedAt: !current ? new Date() : null })
			.where(eq(blogs.id, id));
		return { success: true };
	},
	delete: async ({ request }) => {
		const fd = await request.formData();
		const id = Number(fd.get('id'));
		await db.delete(blogs).where(eq(blogs.id, id));
		return { success: true };
	}
};
