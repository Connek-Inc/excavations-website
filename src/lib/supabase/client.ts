import { createClient } from '@supabase/supabase-js';

// Supabase anon keys are public by design — they are sent to every browser
// that loads the page. Hardcoding them here means the build doesn't depend on
// build-time env vars (Hostinger Git Deployments doesn't inject them).
// Replace these with your actual project values from supabase.com → Settings → API
const SUPABASE_URL = 'https://placeholder.supabase.co';
const SUPABASE_ANON_KEY = 'placeholder-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
	auth: {
		persistSession: true,
		autoRefreshToken: true,
		detectSessionInUrl: true
	}
});

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
	client_nom: string;
	client_email: string;
	client_telephone?: string;
	client_adresse?: string;
	projet_adresse?: string;
	projet_description: string;
	projet_type?: string;
	statut: SoumissionStatut;
	numero?: string;
	date_soumission?: string;
	sous_total: number;
	tps: number;
	tvq: number;
	total: number;
	articles: Article[];
	modalites: Modalite[];
	sections: Record<string, string>;
	notes_admin?: string;
	notes_client?: string;
	signature_client?: string;
	signature_client_at?: string;
	signature_client_nom?: string;
	signature_admin?: string;
	signature_admin_at?: string;
	signature_admin_nom?: string;
	expire_le?: string;
}

export interface SoumissionVersion {
	id: string;
	soumission_id: string;
	created_at: string;
	version_num: number;
	type: 'offre_admin' | 'contre_offre_client';
	auteur: string;
	message?: string;
	sous_total?: number;
	total?: number;
	articles: Article[];
	modalites: Modalite[];
	sections: Record<string, string>;
}

// Quebec tax rates
export const TPS_RATE = 0.05;
export const TVQ_RATE = 0.09975;

export function calcTotals(sousTotal: number) {
	const tps = +(sousTotal * TPS_RATE).toFixed(2);
	const tvq = +(sousTotal * TVQ_RATE).toFixed(2);
	const total = +(sousTotal + tps + tvq).toFixed(2);
	return { sousTotal: +sousTotal.toFixed(2), tps, tvq, total };
}

export function articleTotal(a: Article) {
	return +((a.quantite || 0) * (a.prix_unitaire || 0)).toFixed(2);
}

export function articlesSubtotal(articles: Article[]) {
	return +articles.reduce((sum, a) => sum + articleTotal(a), 0).toFixed(2);
}

export function fmtMoney(n: number) {
	return new Intl.NumberFormat('fr-CA', {
		style: 'currency',
		currency: 'CAD',
		minimumFractionDigits: 2
	}).format(n);
}

export function statutLabel(s: SoumissionStatut): string {
	const map: Record<SoumissionStatut, string> = {
		nouvelle: 'Nouvelle',
		en_revision: 'En révision',
		offerte: 'Offre envoyée',
		contre_offre: 'Contre-offre',
		acceptee: 'Acceptée',
		signee_par_les_deux: 'Signée',
		rejetee: 'Rejetée',
		expiree: 'Expirée'
	};
	return map[s] || s;
}

export function statutColor(s: SoumissionStatut): string {
	const map: Record<SoumissionStatut, string> = {
		nouvelle: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
		en_revision: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
		offerte: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
		contre_offre: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
		acceptee: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
		signee_par_les_deux: 'bg-emerald-600/30 text-emerald-200 border-emerald-500/60',
		rejetee: 'bg-red-500/20 text-red-300 border-red-500/40',
		expiree: 'bg-gray-500/20 text-gray-300 border-gray-500/40'
	};
	return map[s] || '';
}
