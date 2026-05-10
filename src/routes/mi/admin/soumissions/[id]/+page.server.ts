import { error, fail } from '@sveltejs/kit';
import { eq, desc, asc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { soumissions, soumissionVersions } from '$lib/server/db/schema';
import { rowToSoumission, rowToVersion, toCents } from '$lib/server/soumissions/mapper';
import { calcTotals, articlesSubtotal } from '$lib/soumissions/utils';
import { sendOfferReadyEmail } from '$lib/server/email/resend';
import type { Article, Modalite } from '$lib/soumissions/types';
import type { Actions, PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async ({ params }) => {
	const row = await db.query.soumissions.findFirst({ where: eq(soumissions.id, params.id) });
	if (!row) throw error(404, 'Soumission introuvable');

	const versionRows = await db
		.select()
		.from(soumissionVersions)
		.where(eq(soumissionVersions.soumissionId, row.id))
		.orderBy(asc(soumissionVersions.versionNum));

	return {
		soumission: rowToSoumission(row),
		versions: versionRows.map(rowToVersion)
	};
};

function parsePayload(data: FormData) {
	const numero = String(data.get('numero') ?? '').trim();
	const date_soumission = String(data.get('date_soumission') ?? '').trim();
	const notes_admin = String(data.get('notes_admin') ?? '').trim();
	let articles: Article[] = [];
	let modalites: Modalite[] = [];
	let sections: Record<string, string> = {};
	try {
		articles = JSON.parse(String(data.get('articles') ?? '[]'));
		modalites = JSON.parse(String(data.get('modalites') ?? '[]'));
		sections = JSON.parse(String(data.get('sections') ?? '{}'));
	} catch {
		throw fail(400, { error: 'Données invalides' });
	}
	const subtotal = articlesSubtotal(articles);
	const t = calcTotals(subtotal);
	return {
		numero: numero || null,
		dateSoumission: date_soumission || null,
		notesAdmin: notes_admin || null,
		articles,
		modalites,
		sections,
		sousTotal: toCents(t.sousTotal),
		tps: toCents(t.tps),
		tvq: toCents(t.tvq),
		total: toCents(t.total),
		_raw: t
	};
}

export const actions: Actions = {
	save: async ({ request, params }) => {
		const data = await request.formData();
		const p = parsePayload(data);
		await db
			.update(soumissions)
			.set({
				numero: p.numero,
				dateSoumission: p.dateSoumission,
				articles: p.articles,
				modalites: p.modalites,
				sections: p.sections,
				notesAdmin: p.notesAdmin,
				sousTotal: p.sousTotal,
				tps: p.tps,
				tvq: p.tvq,
				total: p.total
			})
			.where(eq(soumissions.id, params.id));
		return { success: true, action: 'save' };
	},

	sendOffer: async ({ request, params }) => {
		const data = await request.formData();
		const p = parsePayload(data);
		const row = await db.query.soumissions.findFirst({ where: eq(soumissions.id, params.id) });
		if (!row) return fail(404, { error: 'Soumission introuvable' });

		await db
			.update(soumissions)
			.set({
				numero: p.numero,
				dateSoumission: p.dateSoumission,
				articles: p.articles,
				modalites: p.modalites,
				sections: p.sections,
				notesAdmin: p.notesAdmin,
				sousTotal: p.sousTotal,
				tps: p.tps,
				tvq: p.tvq,
				total: p.total,
				statut: 'offerte'
			})
			.where(eq(soumissions.id, params.id));

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
			type: 'offre_admin',
			auteur: 'admin',
			message: p.notesAdmin,
			sousTotal: p.sousTotal,
			total: p.total,
			articles: p.articles,
			modalites: p.modalites,
			sections: p.sections
		});

		sendOfferReadyEmail(row.clientEmail, row.clientNom, row.clientToken, p._raw.total).catch(
			() => {}
		);

		return { success: true, action: 'sendOffer' };
	},

	sign: async ({ request, params }) => {
		const data = await request.formData();
		const signature = String(data.get('signature') ?? '');
		const nom = String(data.get('nom') ?? '').trim();
		if (!signature || !nom) return fail(400, { error: 'Signature et nom requis' });

		const row = await db.query.soumissions.findFirst({ where: eq(soumissions.id, params.id) });
		if (!row) return fail(404, { error: 'Soumission introuvable' });

		const newStatut: any =
			row.signatureClient && row.signatureClient.length > 0 ? 'signee_par_les_deux' : row.statut;

		await db
			.update(soumissions)
			.set({
				signatureAdmin: signature,
				signatureAdminAt: new Date(),
				signatureAdminNom: nom,
				statut: newStatut
			})
			.where(eq(soumissions.id, params.id));

		return { success: true, action: 'sign' };
	},

	reject: async ({ params }) => {
		await db
			.update(soumissions)
			.set({ statut: 'rejetee' })
			.where(eq(soumissions.id, params.id));
		return { success: true, action: 'reject' };
	}
};
