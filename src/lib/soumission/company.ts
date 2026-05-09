import type { Modalite, Article } from './types';

export const COMPANY = {
	name: 'Mini Excavation Érable Inc.',
	rbq: '5823-7736-01',
	neq: '1179620118',
	phone: '514-830-9973',
	website: 'https://excavationserable.com',
	dirigeant: 'Leonardo Sánchez',
	titre: 'Dirigeant'
};

export const TPS_RATE = 0.05;
export const TVQ_RATE = 0.09975;

export function calcTotals(sousTotal: number) {
	const base = Number(sousTotal) || 0;
	const tps = +(base * TPS_RATE).toFixed(2);
	const tvq = +(base * TVQ_RATE).toFixed(2);
	const total = +(base + tps + tvq).toFixed(2);
	return { sousTotal: +base.toFixed(2), tps, tvq, total };
}

export function fmtMoney(n: number) {
	return new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD' }).format(n || 0);
}

export const DEFAULT_MODALITES: Modalite[] = [
	{ label: 'À la signature du contrat', pourcentage: 60 },
	{ label: 'En cours de travaux', pourcentage: 30 },
	{ label: 'À la fin des travaux', pourcentage: 10 }
];

export function articleTotal(a: Article) {
	return +((Number(a.quantite) || 0) * (Number(a.prix_unitaire) || 0)).toFixed(2);
}

export function articlesSubtotal(arr: Article[] | null | undefined) {
	if (!arr || arr.length === 0) return 0;
	return +arr.reduce((s, a) => s + articleTotal(a), 0).toFixed(2);
}
