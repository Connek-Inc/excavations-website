// Client-side admin storage backed by localStorage.
// Once a real backend is wired up, swap these helpers for fetch() calls;
// the calling pages don't need to change.

export type SoumissionStatus =
	| 'nouvelle'
	| 'en_revision'
	| 'offerte'
	| 'acceptee'
	| 'rejetee'
	| 'archivee';

export interface Soumission {
	id: string;
	createdAt: string;
	client_nom: string;
	client_email: string;
	client_telephone: string;
	client_adresse?: string;
	projet_adresse: string;
	projet_type: string;
	projet_description: string;
	notes_client?: string;
	status: SoumissionStatus;
	admin_notes?: string;
	source: 'public-form' | 'urgences-form' | 'manual';
	lang: 'fr' | 'en' | 'es';
}

const KEY = 'mi_admin_soumissions';

const isBrowser = typeof window !== 'undefined';

export function readSoumissions(): Soumission[] {
	if (!isBrowser) return [];
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

export function writeSoumissions(list: Soumission[]): void {
	if (!isBrowser) return;
	try {
		localStorage.setItem(KEY, JSON.stringify(list));
	} catch {}
}

export function appendSoumission(s: Omit<Soumission, 'id' | 'createdAt' | 'status'> & { status?: SoumissionStatus }): Soumission {
	const entry: Soumission = {
		...s,
		id: cryptoRandomId(),
		createdAt: new Date().toISOString(),
		status: s.status || 'nouvelle'
	};
	const list = readSoumissions();
	list.unshift(entry);
	writeSoumissions(list);
	return entry;
}

export function updateSoumission(id: string, patch: Partial<Soumission>): Soumission | null {
	const list = readSoumissions();
	const idx = list.findIndex((s) => s.id === id);
	if (idx === -1) return null;
	list[idx] = { ...list[idx], ...patch };
	writeSoumissions(list);
	return list[idx];
}

export function deleteSoumission(id: string): boolean {
	const list = readSoumissions();
	const next = list.filter((s) => s.id !== id);
	if (next.length === list.length) return false;
	writeSoumissions(next);
	return true;
}

export function findSoumission(id: string): Soumission | null {
	return readSoumissions().find((s) => s.id === id) || null;
}

function cryptoRandomId(): string {
	if (isBrowser && 'crypto' in window && 'randomUUID' in window.crypto) {
		return window.crypto.randomUUID();
	}
	return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function statusLabel(s: SoumissionStatus, lang: 'fr' | 'en' | 'es'): string {
	const map: Record<'fr' | 'en' | 'es', Record<SoumissionStatus, string>> = {
		fr: {
			nouvelle: 'Nouvelle',
			en_revision: 'En révision',
			offerte: 'Offre envoyée',
			acceptee: 'Acceptée',
			rejetee: 'Rejetée',
			archivee: 'Archivée'
		},
		en: {
			nouvelle: 'New',
			en_revision: 'Under review',
			offerte: 'Quote sent',
			acceptee: 'Accepted',
			rejetee: 'Rejected',
			archivee: 'Archived'
		},
		es: {
			nouvelle: 'Nueva',
			en_revision: 'En revisión',
			offerte: 'Cotización enviada',
			acceptee: 'Aceptada',
			rejetee: 'Rechazada',
			archivee: 'Archivada'
		}
	};
	return map[lang][s];
}

export function statusColor(s: SoumissionStatus): string {
	const map: Record<SoumissionStatus, string> = {
		nouvelle: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
		en_revision: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
		offerte: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
		acceptee: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
		rejetee: 'bg-red-500/15 text-red-300 border-red-500/30',
		archivee: 'bg-zinc-500/15 text-zinc-300 border-zinc-500/30'
	};
	return map[s];
}

export function checkAdminSession(): boolean {
	if (!isBrowser) return false;
	try {
		return !!localStorage.getItem('mi_admin_session');
	} catch {
		return false;
	}
}
