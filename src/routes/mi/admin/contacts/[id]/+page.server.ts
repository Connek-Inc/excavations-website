import { db } from '$lib/server/db';
import { contacts } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const id = Number(params.id);
	if (!id) throw error(404, 'Not found');

	const contact = await db.query.contacts.findFirst({
		where: eq(contacts.id, id)
	});

	if (!contact) throw error(404, 'Contact not found');

	return { contact };
};

export const actions: Actions = {
	update: async ({ request, params }) => {
		const id = Number(params.id);
		const data = await request.formData();
		const status = String(data.get('status') ?? 'new') as any;
		const notes = String(data.get('notes') ?? '');

		await db
			.update(contacts)
			.set({ status, notes })
			.where(eq(contacts.id, id));

		return { success: true };
	},
	delete: async ({ params }) => {
		const id = Number(params.id);
		await db.delete(contacts).where(eq(contacts.id, id));
		throw redirect(303, '/mi/admin/contacts');
	}
};
