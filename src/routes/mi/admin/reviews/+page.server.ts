import { db } from '$lib/server/db';
import { reviews } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const items = await db.select().from(reviews).orderBy(desc(reviews.publishedAt));
	return { items };
};

export const actions: Actions = {
	save: async ({ request }) => {
		const fd = await request.formData();
		const id = Number(fd.get('id') || 0);
		const payload = {
			authorName: String(fd.get('authorName') ?? ''),
			authorCity: String(fd.get('authorCity') ?? '') || null,
			rating: Math.max(1, Math.min(5, Number(fd.get('rating') || 5))),
			textFr: String(fd.get('textFr') ?? ''),
			textEn: String(fd.get('textEn') ?? '') || null,
			textEs: String(fd.get('textEs') ?? '') || null,
			serviceType: String(fd.get('serviceType') ?? '') || null,
			verified: fd.get('verified') === 'on',
			featured: fd.get('featured') === 'on'
		};
		if (!payload.authorName || !payload.textFr) {
			return fail(400, { error: 'Nom et avis FR requis' });
		}
		if (id) {
			await db.update(reviews).set(payload).where(eq(reviews.id, id));
		} else {
			await db.insert(reviews).values(payload);
		}
		return { success: true };
	},
	delete: async ({ request }) => {
		const fd = await request.formData();
		const id = Number(fd.get('id'));
		if (id) await db.delete(reviews).where(eq(reviews.id, id));
		return { success: true };
	}
};
