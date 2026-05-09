import { db } from '$lib/server/db';
import { services } from '$lib/server/db/schema';
import { asc, eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const items = await db.select().from(services).orderBy(asc(services.orderIndex));
	return { items };
};

export const actions: Actions = {
	save: async ({ request }) => {
		const fd = await request.formData();
		const id = Number(fd.get('id') || 0);
		const payload = {
			slug: String(fd.get('slug') ?? '').trim().toLowerCase(),
			titleFr: String(fd.get('titleFr') ?? ''),
			titleEn: String(fd.get('titleEn') ?? '') || null,
			titleEs: String(fd.get('titleEs') ?? '') || null,
			descriptionFr: String(fd.get('descriptionFr') ?? ''),
			descriptionEn: String(fd.get('descriptionEn') ?? '') || null,
			descriptionEs: String(fd.get('descriptionEs') ?? '') || null,
			icon: String(fd.get('icon') ?? '') || null,
			priceFromCAD: Number(fd.get('priceFromCAD')) || null,
			priceToCAD: Number(fd.get('priceToCAD')) || null,
			featured: fd.get('featured') === 'on',
			active: fd.get('active') === 'on',
			orderIndex: Number(fd.get('orderIndex') || 0)
		};
		if (!payload.slug || !payload.titleFr || !payload.descriptionFr) {
			return fail(400, { error: 'Champs requis manquants' });
		}
		if (id) {
			await db.update(services).set(payload).where(eq(services.id, id));
		} else {
			await db.insert(services).values(payload);
		}
		return { success: true };
	},
	delete: async ({ request }) => {
		const fd = await request.formData();
		const id = Number(fd.get('id'));
		if (id) await db.delete(services).where(eq(services.id, id));
		return { success: true };
	}
};
