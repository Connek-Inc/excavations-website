import { error, fail } from '@sveltejs/kit';
import { eq, desc, asc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { soumissions, soumissionVersions } from '$lib/server/db/schema';
import { rowToSoumission, rowToVersion, toCents } from '$lib/server/soumissions/mapper';
import { calcTotals, articlesSubtotal } from '$lib/soumissions/utils';
import type { Article, Modalite } from '$lib/soumissions/types';
import type { Actions, PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async ({ params, locals }) => {
	const row = await db.query.soumissions.findFirst({
		where: eq(soumissions.clientToken, params.token)
	});
	if (!row) throw error(404, 'Soumission introuvable');

	const versionRows = await db
		.select()
		.from(soumissionVersions)
		.where(eq(soumissionVersions.soumissionId, row.id))
		.orderBy(asc(soumissionVersions.versionNum));

	return {
		client: locals.client,
		soumission: rowToSoumission(row),
		versions: versionRows.map(rowToVersion)
	};
};

export const actions: Actions = {
	counterOffer: async ({ request, params }) => {
		const data = await request.formData();
		const articlesJson = String(data.get('articles') ?? '[]');
		const modalitesJson = String(data.get('modalites') ?? '[]');
		const message = String(data.get('message') ?? '').trim();

		let articles: Article[];
		let modalites: Modalite[];
		try {
			articles = JSON.parse(articlesJson);
			modalites = JSON.parse(modalitesJson);
		} catch {
			return fail(400, { error: 'Données invalides' });
		}

		const row = await db.query.soumissions.findFirst({
			where: eq(soumissions.clientToken, params.token)
		});
		if (!row) return fail(404, { error: 'Soumission introuvable' });

		const subtotal = articlesSubtotal(articles);
		const t = calcTotals(subtotal);

		const last = await db
			.select({ versionNum: soumissionVersions.versionNum })
			.from(soumissionVersions)
			.where(eq(soumissionVersions.soumissionId, row.id))
			.orderBy(desc(soumissionVersions.versionNum))
			.limit(1);
		const nextNum = (last[0]?.versionNum ?? 0) + 1;

		await db.insert(soumissionVersions).values({
			soumissionId: row.id,
			versionNum: nextNum,
			type: 'contre_offre_client',
			auteur: 'client',
			message: message || null,
			sousTotal: toCents(t.sousTotal),
			total: toCents(t.total),
			articles,
			modalites,
			sections: row.sections || {}
		});

		await db
			.update(soumissions)
			.set({
				statut: 'contre_offre',
				articles,
				modalites,
				sousTotal: toCents(t.sousTotal),
				tps: toCents(t.tps),
				tvq: toCents(t.tvq),
				total: toCents(t.total),
				notesClient: message || row.notesClient
			})
			.where(eq(soumissions.id, row.id));

		return { success: true };
	},

	sign: async ({ request, params }) => {
		const data = await request.formData();
		const signature = String(data.get('signature') ?? '');
		const nom = String(data.get('nom') ?? '').trim();
		if (!signature || !nom) return fail(400, { error: 'Signature et nom requis' });

		const row = await db.query.soumissions.findFirst({
			where: eq(soumissions.clientToken, params.token)
		});
		if (!row) return fail(404, { error: 'Soumission introuvable' });

		const newStatut: any =
			row.signatureAdmin && row.signatureAdmin.length > 0 ? 'signee_par_les_deux' : 'acceptee';

		await db
			.update(soumissions)
			.set({
				signatureClient: signature,
				signatureClientAt: new Date(),
				signatureClientNom: nom,
				statut: newStatut
			})
			.where(eq(soumissions.id, row.id));

		return { success: true };
	}
};
