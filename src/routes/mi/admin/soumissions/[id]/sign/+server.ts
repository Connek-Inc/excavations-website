import { db } from '$lib/server/db';
import { soumissions, soumissionSignatures } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { computeStatut } from '$lib/soumission/statut';

export const POST: RequestHandler = async ({ params, request, locals }) => {
	if (!locals.admin) throw error(401, 'Non autorisé');
	const id = Number(params.id);
	if (!id) throw error(400, 'ID invalide');

	const fd = await request.formData();
	const role = String(fd.get('role') ?? '');
	const nom = String(fd.get('nom') ?? '').trim();
	const signature = String(fd.get('signature') ?? '');

	if (role !== 'entrepreneur' && role !== 'client') {
		throw error(400, 'Rôle invalide');
	}
	if (!nom || !signature) throw error(400, 'Nom et signature requis');
	if (!signature.startsWith('data:image/')) throw error(400, 'Signature invalide');

	const rows = await db.select().from(soumissions).where(eq(soumissions.id, id)).limit(1);
	const row = rows[0];
	if (!row) throw error(404, 'Soumission introuvable');

	const now = new Date();
	const patch =
		role === 'entrepreneur'
			? {
					entrepreneurNom: nom,
					entrepreneurSignature: signature,
					entrepreneurSignedAt: now
				}
			: {
					clientSignataireNom: nom,
					clientSignature: signature,
					clientSignedAt: now
				};

	const nextStatut = computeStatut({
		entrepreneurSignature: role === 'entrepreneur' ? signature : row.entrepreneurSignature,
		clientSignature: role === 'client' ? signature : row.clientSignature,
		sentAt: row.sentAt,
		statut: row.statut
	});

	await db
		.update(soumissions)
		.set({ ...patch, statut: nextStatut })
		.where(eq(soumissions.id, id));

	await db.insert(soumissionSignatures).values({
		soumissionId: id,
		role,
		nomSignataire: nom,
		signatureData: signature,
		userAgent: request.headers.get('user-agent') ?? null,
		ipAddress: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null
	});

	return json({ ok: true, statut: nextStatut });
};
