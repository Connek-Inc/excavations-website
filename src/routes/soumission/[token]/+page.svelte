<script lang="ts">
	import { ArrowLeft, Phone, Mail, CheckCircle2, Clock, FileText } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	type Quote = {
		id: number;
		status: string;
		amount_cents: number;
		currency: string | null;
		description?: string | null;
		project_type?: string | null;
		project_address?: string | null;
		client_signed_at?: string | null;
		business_signed_at?: string | null;
	};
	type Offer = {
		id: number;
		offered_by: 'business' | 'client';
		amount_cents: number;
		message: string | null;
		status: string;
		created_at: string;
	};
	type Business = { id: number; name: string | null };
	type Client = { id: number; first_name: string | null; last_name: string | null };

	type Data = {
		quote: Quote;
		offers: Offer[];
		business: Business;
		client: Client;
	};

	// CSR data flow: fetch via the Express HMAC proxy on mount. The token
	// lives in the URL param — we never send the partner secret to the
	// browser, only the magic-link token (which the backend treats as the
	// caller's credential for /quotes/access/*).
	$: token = $page.params.token;

	let loading = true;
	let loadError = '';
	let data: Data | null = null;
	let formError = '';

	async function loadQuote() {
		loading = true;
		loadError = '';
		try {
			const res = await fetch(`/api/connek/quote/${encodeURIComponent(token)}`);
			if (!res.ok) {
				const body = await res.json().catch(() => null);
				loadError =
					res.status === 404 || res.status === 401
						? 'Soumission introuvable'
						: body?.error?.message ?? body?.message ?? 'Erreur de chargement';
				return;
			}
			data = (await res.json()) as Data;
		} catch (e) {
			loadError = 'Connexion impossible. Réessayez.';
		} finally {
			loading = false;
		}
	}

	onMount(loadQuote);

	$: quote = data?.quote;
	$: offers = data?.offers ?? [];
	$: business = data?.business;
	$: client = data?.client;

	$: latestOffer = offers
		.filter((o) => o.status === 'pending')
		.sort((a, b) => (a.created_at < b.created_at ? 1 : -1))[0];

	$: clientSigned = !!quote?.client_signed_at;
	$: businessSigned = !!quote?.business_signed_at;
	$: fullySigned = clientSigned && businessSigned;
	$: hasPriced = (quote?.amount_cents ?? 0) > 0 && !!latestOffer;
	$: canCounter = hasPriced && !clientSigned && quote?.status !== 'rejetee';
	$: canSign = hasPriced && !clientSigned && quote?.status !== 'rejetee';

	function statusLabel(s: string): string {
		const map: Record<string, string> = {
			nouvelle: 'Nouvelle demande',
			en_revision: 'En révision',
			offerte: 'Offre envoyée',
			pending: 'Offre envoyée',
			contre_offre: 'Contre-offre envoyée',
			acceptee: 'Acceptée',
			accepted: 'Acceptée',
			signee_par_les_deux: 'Signée par les deux parties',
			rejetee: 'Rejetée',
			expiree: 'Expirée'
		};
		return map[s] ?? s;
	}

	function fmtMoney(cents: number) {
		return new Intl.NumberFormat('fr-CA', {
			style: 'currency',
			currency: quote?.currency ?? 'CAD',
			minimumFractionDigits: 2
		}).format((cents ?? 0) / 100);
	}

	let counterAmount = '';
	let counterMessage = '';
	let signName = '';
	let submitting = false;

	async function handleSign(e: Event) {
		e.preventDefault();
		if (signName.trim().length < 2 || submitting) return;
		submitting = true;
		formError = '';
		try {
			const res = await fetch(`/api/connek/quote/${encodeURIComponent(token)}/sign`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: signName.trim() })
			});
			if (!res.ok) {
				const body = await res.json().catch(() => null);
				formError = body?.error?.message ?? body?.message ?? 'Erreur';
				return;
			}
			await loadQuote();
		} catch {
			formError = 'Connexion impossible';
		} finally {
			submitting = false;
		}
	}

	async function handleCounter(e: Event) {
		e.preventDefault();
		const amount_cents = Math.round(Number.parseFloat(counterAmount || '0') * 100);
		if (!Number.isFinite(amount_cents) || amount_cents < 0 || submitting) return;
		submitting = true;
		formError = '';
		try {
			const res = await fetch(`/api/connek/quote/${encodeURIComponent(token)}/counter`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					amount_cents,
					message: counterMessage.trim() || undefined
				})
			});
			if (!res.ok) {
				const body = await res.json().catch(() => null);
				formError = body?.error?.message ?? body?.message ?? 'Erreur';
				return;
			}
			counterAmount = '';
			counterMessage = '';
			await loadQuote();
		} catch {
			formError = 'Connexion impossible';
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title>Soumission — {business?.name ?? 'Mini Excavations Érable'}</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="min-h-screen bg-zinc-950 text-white px-4 py-10">
	<div class="max-w-3xl mx-auto">
		<a
			href="/"
			class="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-[#febd17] mb-6"
		>
			<ArrowLeft class="h-4 w-4" /> Accueil
		</a>

		{#if loading}
			<div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center text-zinc-400">
				Chargement…
			</div>
		{:else if loadError}
			<div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center">
				<p class="text-red-400 mb-2">{loadError}</p>
				<p class="text-sm text-zinc-500">
					Si le problème persiste, contactez-nous au
					<a class="text-[#febd17]" href="tel:+15148309973">(514) 830-9973</a>.
				</p>
			</div>
		{:else if data && quote && business && client}
			<div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-10">
				<div class="flex items-center justify-between gap-4 flex-wrap mb-6">
					<h1 class="text-2xl sm:text-3xl font-bold">
						Soumission #{quote.id}
					</h1>
					<span
						class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-sm"
					>
						<Clock class="h-3.5 w-3.5" /> {statusLabel(quote.status)}
					</span>
				</div>

				<div class="mb-6 text-zinc-400 text-sm">
					<p>Pour : <span class="text-zinc-200">{client.first_name ?? ''} {client.last_name ?? ''}</span></p>
					<p>De : <span class="text-zinc-200">{business.name ?? '—'}</span></p>
				</div>

				{#if quote.project_type || quote.project_address || quote.description}
					<div class="bg-zinc-950 border border-zinc-800 rounded-lg p-4 mb-6 space-y-2">
						{#if quote.project_type}
							<p class="text-sm"><span class="text-zinc-500">Type :</span> {quote.project_type}</p>
						{/if}
						{#if quote.project_address}
							<p class="text-sm">
								<span class="text-zinc-500">Adresse du projet :</span> {quote.project_address}
							</p>
						{/if}
						{#if quote.description}
							<p class="text-sm whitespace-pre-line">
								<span class="text-zinc-500 block mb-1">Description :</span>
								{quote.description}
							</p>
						{/if}
					</div>
				{/if}

				{#if !hasPriced}
					<div class="bg-[#febd17]/10 border border-[#febd17]/30 rounded-lg p-4 mb-4">
						<p class="font-medium text-[#febd17] mb-1">Demande reçue</p>
						<p class="text-sm text-zinc-300">
							Nous avons bien reçu votre demande. Notre équipe l'analyse et vous enverra une offre
							chiffrée par courriel sous peu.
						</p>
					</div>
				{:else}
					<div class="bg-zinc-950 border border-zinc-800 rounded-lg p-5 mb-6">
						<p class="text-sm text-zinc-500 mb-1">Offre actuelle</p>
						<p class="text-3xl font-bold text-[#febd17]">{fmtMoney(quote.amount_cents)}</p>
						{#if latestOffer?.message}
							<p class="text-sm text-zinc-300 mt-3 whitespace-pre-line">{latestOffer.message}</p>
						{/if}
					</div>

					{#if offers.length > 1}
						<details class="mb-6">
							<summary class="text-sm text-zinc-400 cursor-pointer hover:text-zinc-200">
								<FileText class="h-3.5 w-3.5 inline" /> Historique ({offers.length} offres)
							</summary>
							<ul class="mt-3 space-y-2 text-sm">
								{#each offers as o}
									<li
										class="flex items-center justify-between gap-3 px-3 py-2 rounded border border-zinc-800 {o.status ===
										'pending'
											? 'bg-zinc-900'
											: 'bg-zinc-950 opacity-70'}"
									>
										<span class="text-zinc-400">
											{o.offered_by === 'business' ? 'Entrepreneur' : 'Vous'}
										</span>
										<span class="font-mono">{fmtMoney(o.amount_cents)}</span>
										<span class="text-xs text-zinc-500">{statusLabel(o.status)}</span>
									</li>
								{/each}
							</ul>
						</details>
					{/if}
				{/if}

				{#if fullySigned || quote.status === 'accepted' || quote.status === 'signee_par_les_deux'}
					<div
						class="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 flex items-start gap-3"
					>
						<CheckCircle2 class="h-5 w-5 text-emerald-400 mt-0.5" />
						<div>
							<p class="font-medium text-emerald-300">Soumission signée</p>
							<p class="text-sm text-zinc-300">L'offre a été acceptée par les deux parties.</p>
						</div>
					</div>
				{:else if canSign}
					<div class="grid sm:grid-cols-2 gap-6">
						<form on:submit={handleSign} class="bg-zinc-950 border border-zinc-800 rounded-lg p-5">
							<h3 class="font-semibold mb-3">Accepter et signer</h3>
							<label class="block text-sm text-zinc-400 mb-2">
								Votre nom complet
								<input
									type="text"
									name="name"
									bind:value={signName}
									required
									minlength="2"
									class="mt-1 w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-white"
								/>
							</label>
							<button
								type="submit"
								disabled={signName.trim().length < 2 || submitting}
								class="w-full px-4 py-2 bg-[#febd17] hover:bg-[#e5aa10] disabled:opacity-50 text-black font-semibold rounded transition-colors"
							>
								{submitting ? 'Envoi…' : 'Signer'}
							</button>
						</form>

						{#if canCounter}
							<form on:submit={handleCounter} class="bg-zinc-950 border border-zinc-800 rounded-lg p-5">
								<h3 class="font-semibold mb-3">Contre-proposer</h3>
								<label class="block text-sm text-zinc-400 mb-2">
									Votre prix (CAD)
									<input
										type="number"
										step="0.01"
										min="0"
										bind:value={counterAmount}
										required
										class="mt-1 w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-white"
									/>
								</label>
								<label class="block text-sm text-zinc-400 mb-3">
									Message (facultatif)
									<textarea
										bind:value={counterMessage}
										rows="2"
										class="mt-1 w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-white"
									></textarea>
								</label>
								<button
									type="submit"
									disabled={!counterAmount || submitting}
									class="w-full px-4 py-2 border border-zinc-700 hover:border-zinc-500 text-zinc-200 font-semibold rounded transition-colors disabled:opacity-50"
								>
									{submitting ? 'Envoi…' : 'Envoyer'}
								</button>
							</form>
						{/if}
					</div>
				{/if}

				{#if formError}
					<p class="mt-4 text-sm text-red-400">{formError}</p>
				{/if}

				<div class="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row gap-3 justify-center">
					<a
						href="tel:+15148309973"
						class="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-200 text-sm transition-colors"
					>
						<Phone class="h-4 w-4" /> (514) 830-9973
					</a>
					<a
						href="mailto:miniexcavationerable@gmail.com"
						class="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-200 text-sm transition-colors"
					>
						<Mail class="h-4 w-4" /> Nous écrire
					</a>
				</div>
			</div>
		{/if}
	</div>
</div>
