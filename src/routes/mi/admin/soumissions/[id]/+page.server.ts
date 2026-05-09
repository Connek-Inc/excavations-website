import { db } from '$lib/server/db';
import { soumissions, soumissionSignatures } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Modalite, Article, SectionsMap } from '$lib/soumission/types';
import { listMissingForSend } from '$lib/soumission/statut';

export const load: PageServerLoad = async ({ params }) => {
	const id = Number(params.id);
	if (!id) throw error(404, 'Soumission introuvable');

	const rows = await db.select().from(soumissions).where(eq(soumissions.id, id)).limit(1);
	const row = rows[0];
	if (!row) throw error(404, 'Soumission introuvable');

	const signatures = await db
		.select()
		.from(soumissionSignatures)
		.where(eq(soumissionSignatures.soumissionId, id))
		.orderBy(desc(soumissionSignatures.createdAt));

	return {
		soumission: row,
		signatures
	};
};

export const actions: Actions = {
	save: async ({ request, params }) => {
		const id = Number(params.id);
		if (!id) return fail(400, { error: 'ID invalide' });
		const fd = await request.formData();
		const payloadRaw = fd.get('payload');
		if (typeof payloadRaw !== 'string') return fail(400, { error: 'Payload manquant' });
		let payload: Record<string, unknown>;
		try {
			payload = JSON.parse(payloadRaw);
		} catch {
			return fail(400, { error: 'JSON invalide' });
		}

		const sousTotal = Number(payload.sousTotal) || 0;
		await db
			.update(soumissions)
			.set({
				numero: ((payload.numero as string) || '').trim() || null,
				clientNom: ((payload.clientNom as string) || '').trim() || null,
				clientAdresse: ((payload.clientAdresse as string) || '').trim() || null,
				projetAdresse: ((payload.projetAdresse as string) || '').trim() || null,
				clientEmail: ((payload.clientEmail as string) || '').trim() || null,
				clientPhone: ((payload.clientPhone as string) || '').trim() || null,
				dateSoumission: (payload.dateSoumission as string) || null,
				notes: ((payload.notes as string) || '').trim() || null,
				sousTotal: sousTotal.toFixed(2),
				modalites: (payload.modalites ?? []) as Modalite[],
				articles: (payload.articles ?? []) as Article[],
				sections: (payload.sections ?? {}) as SectionsMap
			})
			.where(eq(soumissions.id, id));

		return { success: true, savedAt: new Date().toISOString() };
	},

	markSent: async ({ params }) => {
		const id = Number(params.id);
		if (!id) return fail(400, { error: 'ID invalide' });
		const rows = await db.select().from(soumissions).where(eq(soumissions.id, id)).limit(1);
		const row = rows[0];
		if (!row) return fail(404, { error: 'Soumission introuvable' });

		const missing = listMissingForSend({
			statut: row.statut,
			clientNom: row.clientNom,
			clientAdresse: row.clientAdresse,
			projetAdresse: row.projetAdresse,
			dateSoumission: row.dateSoumission,
			sousTotal: row.sousTotal,
			modalites: row.modalites
		});
		if (missing.length > 0) {
			return fail(400, { error: `Champs manquants : ${missing.join(', ')}` });
		}

		await db
			.update(soumissions)
			.set({
				sentAt: new Date(),
				statut: 'Envoyée'
			})
			.where(eq(soumissions.id, id));

		return { success: true };
	},

	resetStatut: async ({ params }) => {
		const id = Number(params.id);
		if (!id) return fail(400, { error: 'ID invalide' });
		await db
			.update(soumissions)
			.set({
				statut: 'Brouillon',
				sentAt: null,
				entrepreneurSignature: null,
				entrepreneurSignedAt: null,
				clientSignature: null,
				clientSignedAt: null,
				clientSignataireNom: null
			})
			.where(eq(soumissions.id, id));
		return { success: true };
	},

	delete: async ({ params }) => {
		const id = Number(params.id);
		if (!id) return fail(400, { error: 'ID invalide' });
		await db.delete(soumissionSignatures).where(eq(soumissionSignatures.soumissionId, id));
		await db.delete(soumissions).where(eq(soumissions.id, id));
		throw redirect(303, '/mi/admin/soumissions');
	}
};
