import { db } from '$lib/server/db';
import { soumissions, soumissionSignatures } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { computeStatut, validateForSignature } from '$lib/soumission/statut';

export const POST: RequestHandler = async ({ params, request }) => {
	const token = params.token;
	if (!token) throw error(404, 'Soumission introuvable');

	const fd = await request.formData();
	const role = String(fd.get('role') ?? '');
	const nom = String(fd.get('nom') ?? '').trim();
	const signature = String(fd.get('signature') ?? '');

	if (role !== 'client') {
		throw error(403, 'Seul le client peut signer via ce lien.');
	}
	if (!nom || !signature) throw error(400, 'Nom et signature requis');
	if (!signature.startsWith('data:image/')) throw error(400, 'Signature invalide');

	const rows = await db
		.select()
		.from(soumissions)
		.where(eq(soumissions.token, token))
		.limit(1);
	const row = rows[0];
	if (!row) throw error(404, 'Soumission introuvable');

	if (row.clientSignature) {
		throw error(409, 'Cette soumission a déjà été signée par le client.');
	}

	const guard = validateForSignature(
		{
			statut: row.statut,
			clientNom: row.clientNom,
			clientAdresse: row.clientAdresse,
			projetAdresse: row.projetAdresse,
			dateSoumission: row.dateSoumission,
			sousTotal: row.sousTotal,
			modalites: row.modalites,
			sentAt: row.sentAt
		},
		'client'
	);
	if (guard) throw error(400, guard);

	const now = new Date();
	const nextStatut = computeStatut({
		entrepreneurSignature: row.entrepreneurSignature,
		clientSignature: signature,
		sentAt: row.sentAt,
		statut: row.statut
	});

	await db
		.update(soumissions)
		.set({
			clientSignataireNom: nom,
			clientSignature: signature,
			clientSignedAt: now,
			statut: nextStatut
		})
		.where(eq(soumissions.id, row.id));

	await db.insert(soumissionSignatures).values({
		soumissionId: row.id,
		role: 'client',
		nomSignataire: nom,
		signatureData: signature,
		userAgent: request.headers.get('user-agent') ?? null,
		ipAddress: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null
	});

	return json({ ok: true, statut: nextStatut });
};
