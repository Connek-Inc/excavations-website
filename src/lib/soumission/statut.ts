import type { Modalite, Statut } from './types';

export type SoumissionLite = {
	statut: Statut;
	clientNom?: string | null;
	clientAdresse?: string | null;
	projetAdresse?: string | null;
	dateSoumission?: string | Date | null;
	sousTotal?: string | number | null;
	modalites?: Modalite[] | null;
	entrepreneurSignature?: string | null;
	clientSignature?: string | null;
	sentAt?: Date | string | null;
};

export function computeStatut(s: {
	entrepreneurSignature?: string | null;
	clientSignature?: string | null;
	sentAt?: Date | string | null;
	statut?: Statut | null;
}): Statut {
	if (s.entrepreneurSignature && s.clientSignature) return 'Signée';
	if (s.clientSignature) return 'Acceptée';
	if (s.sentAt) return 'Envoyée';
	return s.statut === 'Acceptée' || s.statut === 'Signée' ? s.statut : 'Brouillon';
}

const ALLOWED: Record<Statut, Statut[]> = {
	Brouillon: ['Brouillon', 'Envoyée'],
	Envoyée: ['Envoyée', 'Acceptée', 'Brouillon'],
	Acceptée: ['Acceptée', 'Signée'],
	Signée: ['Signée']
};

export function canTransition(from: Statut, to: Statut): boolean {
	return ALLOWED[from]?.includes(to) ?? false;
}

export function listMissingForSend(s: SoumissionLite): string[] {
	const missing: string[] = [];
	if (!s.clientNom?.trim()) missing.push('Nom du client');
	if (!s.clientAdresse?.trim()) missing.push('Adresse du client');
	if (!s.projetAdresse?.trim()) missing.push('Adresse du projet');
	if (!s.dateSoumission) missing.push('Date de la soumission');
	if (Number(s.sousTotal ?? 0) <= 0) missing.push('Sous-total supérieur à 0 $');
	const mods = s.modalites ?? [];
	if (mods.length === 0) {
		missing.push('Au moins une modalité de paiement');
	} else {
		const total = mods.reduce((a, m) => a + (Number(m.pourcentage) || 0), 0);
		if (total !== 100) missing.push(`Modalités totalisant 100 % (actuellement ${total} %)`);
		if (mods.some((m) => !m.label?.trim())) missing.push('Description pour chaque modalité');
	}
	return missing;
}

export function validateForSend(s: SoumissionLite): string | null {
	const m = listMissingForSend(s);
	return m.length > 0 ? `Champs manquants : ${m.join(', ')}.` : null;
}

export function validateForSignature(
	s: SoumissionLite,
	role: 'client' | 'entrepreneur'
): string | null {
	const err = validateForSend(s);
	if (err) return `Impossible de signer : ${err}`;
	if (!s.sentAt && s.statut === 'Brouillon')
		return "La soumission doit d'abord être marquée comme envoyée au client.";
	if (role === 'entrepreneur' && s.statut !== 'Acceptée' && s.statut !== 'Signée')
		return "L'entrepreneur signe après l'acceptation du client.";
	return null;
}

export const STATUT_COLORS: Record<Statut, string> = {
	Brouillon: 'bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-300',
	Envoyée: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400',
	Acceptée: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400',
	Signée: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400'
};
