import { db } from '$lib/server/db';
import { settings } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const all = await db.select().from(settings);
	const map: Record<string, string | null> = {};
	for (const s of all) map[s.settingKey] = s.value;
	return { settings: map };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const fd = await request.formData();
		const keys = ['site_name', 'phone', 'email', 'rbq_license', 'address', 'instagram', 'facebook'];

		for (const key of keys) {
			const value = String(fd.get(key) ?? '');
			const existing = await db.query.settings.findFirst({
				where: eq(settings.settingKey, key)
			});
			if (existing) {
				await db.update(settings).set({ value }).where(eq(settings.settingKey, key));
			} else {
				await db.insert(settings).values({ settingKey: key, value });
			}
		}

		return { success: true };
	}
};
