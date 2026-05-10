import type { Soumission, SoumissionVersion } from '$lib/soumissions/types';
import type { soumissions, soumissionVersions } from '$lib/server/db/schema';

type DbSoumission = typeof soumissions.$inferSelect;
type DbVersion = typeof soumissionVersions.$inferSelect;

const c = (cents: number) => +(cents / 100).toFixed(2);
const toCents = (dollars: number) => Math.round(dollars * 100);

export function rowToSoumission(r: DbSoumission): Soumission {
	return {
		id: r.id,
		created_at: r.createdAt instanceof Date ? r.createdAt.toISOString() : String(r.createdAt),
		updated_at: r.updatedAt instanceof Date ? r.updatedAt.toISOString() : String(r.updatedAt),
		client_token: r.clientToken,
		client_id: r.clientId ?? null,
		client_nom: r.clientNom,
		client_email: r.clientEmail,
		client_telephone: r.clientTelephone,
		client_adresse: r.clientAdresse,
		projet_adresse: r.projetAdresse,
		projet_description: r.projetDescription,
		projet_type: r.projetType,
		statut: r.statut,
		numero: r.numero,
		date_soumission: r.dateSoumission,
		sous_total: c(r.sousTotal),
		tps: c(r.tps),
		tvq: c(r.tvq),
		total: c(r.total),
		articles: (r.articles as any) || [],
		modalites: (r.modalites as any) || [],
		sections: (r.sections as any) || {},
		notes_admin: r.notesAdmin,
		notes_client: r.notesClient,
		signature_client: r.signatureClient,
		signature_client_at:
			r.signatureClientAt instanceof Date ? r.signatureClientAt.toISOString() : r.signatureClientAt,
		signature_client_nom: r.signatureClientNom,
		signature_admin: r.signatureAdmin,
		signature_admin_at:
			r.signatureAdminAt instanceof Date ? r.signatureAdminAt.toISOString() : r.signatureAdminAt,
		signature_admin_nom: r.signatureAdminNom,
		expire_le: r.expireLe
	};
}

export function rowToVersion(r: DbVersion): SoumissionVersion {
	return {
		id: r.id,
		soumission_id: r.soumissionId,
		created_at: r.createdAt instanceof Date ? r.createdAt.toISOString() : String(r.createdAt),
		version_num: r.versionNum,
		type: r.type,
		auteur: r.auteur,
		message: r.message,
		sous_total: r.sousTotal != null ? c(r.sousTotal) : null,
		total: r.total != null ? c(r.total) : null,
		articles: (r.articles as any) || [],
		modalites: (r.modalites as any) || [],
		sections: (r.sections as any) || {}
	};
}

export { toCents };
