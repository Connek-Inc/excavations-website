import type { Article, SoumissionStatut } from './types';

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
