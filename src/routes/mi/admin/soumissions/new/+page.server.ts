import { db } from '$lib/server/db';
import { soumissions } from '$lib/server/db/schema';
import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { DEFAULT_MODALITES } from '$lib/soumission/company';
import { generateToken } from '$lib/soumission/server-utils';
import type { Modalite, Article, SectionsMap } from '$lib/soumission/types';

export const load: PageServerLoad = async () => {
	return {
		defaults: {
			numero: '',
			clientNom: '',
			clientAdresse: '',
			projetAdresse: '',
			clientEmail: '',
			clientPhone: '',
			dateSoumission: new Date().toISOString().slice(0, 10),
			notes: '',
			sousTotal: 0,
			modalites: DEFAULT_MODALITES,
			articles: [] as Article[],
			sections: {} as SectionsMap
		}
	};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const fd = await request.formData();
		const payloadRaw = fd.get('payload');
		if (typeof payloadRaw !== 'string') return fail(400, { error: 'Payload manquant' });
		let payload: Record<string, unknown>;
		try {
			payload = JSON.parse(payloadRaw);
		} catch {
			return fail(400, { error: 'JSON invalide' });
		}

		const token = generateToken();
		const dateStr = (payload.dateSoumission as string) || new Date().toISOString().slice(0, 10);
		const sousTotal = Number(payload.sousTotal) || 0;

		const result = await db.insert(soumissions).values({
			token,
			numero: ((payload.numero as string) || '').trim() || null,
			statut: 'Brouillon',
			clientNom: ((payload.clientNom as string) || '').trim() || null,
			clientAdresse: ((payload.clientAdresse as string) || '').trim() || null,
			projetAdresse: ((payload.projetAdresse as string) || '').trim() || null,
			clientEmail: ((payload.clientEmail as string) || '').trim() || null,
			clientPhone: ((payload.clientPhone as string) || '').trim() || null,
			dateSoumission: dateStr,
			notes: ((payload.notes as string) || '').trim() || null,
			sousTotal: sousTotal.toFixed(2),
			modalites: (payload.modalites ?? []) as Modalite[],
			articles: (payload.articles ?? []) as Article[],
			sections: (payload.sections ?? {}) as SectionsMap,
			createdBy: locals.admin?.id ?? null
		});

		const insertedId = (result as any)[0]?.insertId;
		throw redirect(
			303,
			insertedId ? `/mi/admin/soumissions/${insertedId}` : '/mi/admin/soumissions'
		);
	}
};
