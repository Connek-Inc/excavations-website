export type SoumissionStatut =
	| 'nouvelle'
	| 'en_revision'
	| 'offerte'
	| 'contre_offre'
	| 'acceptee'
	| 'signee_par_les_deux'
	| 'rejetee'
	| 'expiree';

export interface Article {
	description: string;
	quantite: number;
	prix_unitaire: number;
}

export interface Modalite {
	label: string;
	pourcentage: number;
}

export interface Soumission {
	id: string;
	created_at: string;
	updated_at: string;
	client_token: string;
	client_id?: number | null;
	client_nom: string;
	client_email: string;
	client_telephone?: string | null;
	client_adresse?: string | null;
	projet_adresse?: string | null;
	projet_description: string;
	projet_type?: string | null;
	statut: SoumissionStatut;
	numero?: string | null;
	date_soumission?: string | null;
	sous_total: number;
	tps: number;
	tvq: number;
	total: number;
	articles: Article[];
	modalites: Modalite[];
	sections: Record<string, string>;
	notes_admin?: string | null;
	notes_client?: string | null;
	signature_client?: string | null;
	signature_client_at?: string | null;
	signature_client_nom?: string | null;
	signature_admin?: string | null;
	signature_admin_at?: string | null;
	signature_admin_nom?: string | null;
	expire_le?: string | null;
}

export interface SoumissionVersion {
	id: number;
	soumission_id: string;
	created_at: string;
	version_num: number;
	type: 'offre_admin' | 'contre_offre_client';
	auteur: string;
	message?: string | null;
	sous_total?: number | null;
	total?: number | null;
	articles: Article[];
	modalites: Modalite[];
	sections: Record<string, string>;
}
