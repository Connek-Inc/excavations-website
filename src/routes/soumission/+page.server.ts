import { db } from '$lib/server/db';
import { contacts } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const prerender = false;

export const actions: Actions = {
	default: async (event) => {
		const fd = await event.request.formData();
		const name = String(fd.get('name') ?? '').trim();
		const email = String(fd.get('email') ?? '').trim();
		const phone = String(fd.get('phone') ?? '').trim();
		const adresse = String(fd.get('adresse') ?? '').trim();
		const projetType = String(fd.get('projetType') ?? '').trim();
		const description = String(fd.get('description') ?? '').trim();
		const language = String(fd.get('language') ?? 'fr').slice(0, 5);

		if (!name || !email || !description) {
			return fail(400, {
				error: 'Nom, courriel et description du projet sont requis.',
				values: { name, email, phone, adresse, projetType, description }
			});
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, {
				error: 'Courriel invalide.',
				values: { name, email, phone, adresse, projetType, description }
			});
		}

		const ipAddress = event.getClientAddress();
		const userAgent = event.request.headers.get('user-agent') ?? null;

		const subjectParts = ['Demande de soumission'];
		if (projetType) subjectParts.push(projetType);
		const subject = subjectParts.join(' — ').slice(0, 200);

		const messageParts: string[] = [];
		if (adresse) messageParts.push(`Adresse du projet : ${adresse}`);
		if (projetType) messageParts.push(`Type de projet : ${projetType}`);
		messageParts.push('', description);
		const message = messageParts.join('\n').slice(0, 5000);

		try {
			await db.insert(contacts).values({
				name: name.slice(0, 100),
				email: email.slice(0, 255),
				phone: phone ? phone.slice(0, 50) : null,
				subject,
				message,
				serviceType: 'soumission',
				language,
				source: 'soumission_form',
				ipAddress,
				userAgent: userAgent?.slice(0, 500) ?? null,
				status: 'new'
			});
		} catch (e) {
			console.error('[soumission/public] DB insert failed:', e);
			return fail(500, { error: 'Erreur du serveur. Réessayez plus tard.' });
		}

		return { success: true };
	}
};
