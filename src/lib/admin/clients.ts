// Local-only client accounts (per-browser). Replace with real auth when
// the backend is wired up; the surface (signup/login/getCurrent) stays the same.

const ACCOUNTS_KEY = 'mi_clients';
const SESSION_KEY = 'mi_client_session';

export interface ClientAccount {
	email: string;
	name: string;
	telephone?: string;
	passwordHash: string;
	createdAt: string;
}

export interface ClientSession {
	email: string;
	name: string;
	at: number;
}

const isBrowser = typeof window !== 'undefined';

/** Very lightweight pseudo-hash. NOT secure — placeholder until the
 * real backend (bcrypt) is back. Good enough to avoid storing plain
 * text in localStorage. */
function hash(str: string): string {
	let h = 0;
	for (let i = 0; i < str.length; i++) {
		h = (h << 5) - h + str.charCodeAt(i);
		h |= 0;
	}
	return `mh_${Math.abs(h).toString(36)}_${str.length}`;
}

function readAccounts(): ClientAccount[] {
	if (!isBrowser) return [];
	try {
		const raw = localStorage.getItem(ACCOUNTS_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

function writeAccounts(list: ClientAccount[]) {
	if (!isBrowser) return;
	try {
		localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(list));
	} catch {}
}

export function findClient(email: string): ClientAccount | null {
	const e = email.trim().toLowerCase();
	return readAccounts().find((a) => a.email.toLowerCase() === e) || null;
}

export function signup(input: {
	email: string;
	name: string;
	password: string;
	telephone?: string;
}): { ok: true } | { ok: false; reason: 'exists' | 'invalid' } {
	const email = input.email.trim().toLowerCase();
	const name = input.name.trim();
	if (!email || !name || input.password.length < 6) return { ok: false, reason: 'invalid' };
	const accounts = readAccounts();
	if (accounts.some((a) => a.email.toLowerCase() === email)) return { ok: false, reason: 'exists' };
	accounts.push({
		email,
		name,
		telephone: input.telephone,
		passwordHash: hash(input.password),
		createdAt: new Date().toISOString()
	});
	writeAccounts(accounts);
	setCurrent({ email, name, at: Date.now() });
	return { ok: true };
}

export function login(email: string, password: string): { ok: true } | { ok: false; reason: 'not-found' | 'bad-password' } {
	const account = findClient(email);
	if (!account) return { ok: false, reason: 'not-found' };
	if (account.passwordHash !== hash(password)) return { ok: false, reason: 'bad-password' };
	setCurrent({ email: account.email, name: account.name, at: Date.now() });
	return { ok: true };
}

export function logout() {
	if (!isBrowser) return;
	try {
		localStorage.removeItem(SESSION_KEY);
	} catch {}
}

export function getCurrent(): ClientSession | null {
	if (!isBrowser) return null;
	try {
		const raw = localStorage.getItem(SESSION_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed?.email) return null;
		return parsed as ClientSession;
	} catch {
		return null;
	}
}

function setCurrent(s: ClientSession) {
	if (!isBrowser) return;
	try {
		localStorage.setItem(SESSION_KEY, JSON.stringify(s));
	} catch {}
}
