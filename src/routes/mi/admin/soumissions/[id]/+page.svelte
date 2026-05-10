<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import {
		fmtMoney,
		articlesSubtotal,
		calcTotals,
		statutLabel,
		statutColor
	} from '$lib/soumissions/utils';
	import type { Article, Modalite, Soumission } from '$lib/soumissions/types';
	import {
		SECTION_ORDER,
		DEFAULT_SECTIONS,
		type SectionKey
	} from '$lib/soumissions/default-sections';
	import { generateSoumissionPDF } from '$lib/soumissions/pdf';
	import SignaturePad from '$lib/soumissions/SignaturePad.svelte';
	import {
		ArrowLeft,
		Save,
		Send,
		Download,
		PenLine,
		X,
		Plus,
		Trash2,
		ChevronDown,
		ChevronUp,
		RotateCcw,
		Copy,
		Check,
		Clock,
		Mail,
		Phone,
		MapPin,
		Ban
	} from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let toast: { msg: string; type: 'success' | 'error' } | null = null;

	$: soumission = data.soumission;
	$: versions = data.versions;

	let f_numero = '';
	let f_date = '';
	let f_articles: Article[] = [];
	let f_modalites: Modalite[] = [];
	let f_sections: Record<string, string> = {};
	let f_notes_admin = '';

	let openSection: string | null = null;
	let showSign = false;
	let signNom = 'Mini Excavations Érable Inc.';
	let signValue = '';
	let copied = false;

	let saving = false;
	let signSubmitting = false;

	let lastLoadedId = '';
	$: if (soumission && soumission.id !== lastLoadedId) {
		lastLoadedId = soumission.id;
		f_numero = soumission.numero || '';
		f_date = soumission.date_soumission || new Date().toISOString().slice(0, 10);
		f_articles = (soumission.articles || []).map((a) => ({ ...a }));
		f_modalites =
			soumission.modalites && soumission.modalites.length > 0
				? soumission.modalites.map((m) => ({ ...m }))
				: [
						{ label: 'À la signature', pourcentage: 30 },
						{ label: 'Au début des travaux', pourcentage: 40 },
						{ label: 'À la fin des travaux', pourcentage: 30 }
					];
		f_sections = { ...(soumission.sections || {}) };
		f_notes_admin = soumission.notes_admin || '';
	}

	$: subtotal = articlesSubtotal(f_articles || []);
	$: totals = calcTotals(subtotal);
	$: clientLink =
		typeof window !== 'undefined' && soumission
			? `${window.location.origin}/soumission/${soumission.client_token}`
			: '';

	function showToast(msg: string, type: 'success' | 'error' = 'success') {
		toast = { msg, type };
		setTimeout(() => (toast = null), 3500);
	}

	function addArticle() {
		f_articles = [...f_articles, { description: '', quantite: 1, prix_unitaire: 0 }];
	}
	function removeArticle(i: number) {
		f_articles = f_articles.filter((_, idx) => idx !== i);
	}
	function addModalite() {
		f_modalites = [...f_modalites, { label: '', pourcentage: 0 }];
	}
	function removeModalite(i: number) {
		f_modalites = f_modalites.filter((_, idx) => idx !== i);
	}
	function resetSection(key: SectionKey) {
		f_sections = { ...f_sections, [key]: DEFAULT_SECTIONS[key] };
	}
	function toggleSection(key: string) {
		openSection = openSection === key ? null : key;
	}

	function buildPreview(): Soumission {
		return {
			...soumission!,
			numero: f_numero || null,
			date_soumission: f_date || null,
			articles: f_articles,
			modalites: f_modalites,
			sections: f_sections,
			notes_admin: f_notes_admin || null,
			sous_total: totals.sousTotal,
			tps: totals.tps,
			tvq: totals.tvq,
			total: totals.total
		};
	}

	function downloadPDF() {
		if (!soumission) return;
		const doc = generateSoumissionPDF(buildPreview());
		doc.save(`soumission-${f_numero || soumission.id.slice(0, 8)}.pdf`);
	}

	function openSignModal() {
		signValue = '';
		showSign = true;
	}

	async function copyClientLink() {
		try {
			await navigator.clipboard.writeText(clientLink);
			copied = true;
			setTimeout(() => (copied = false), 2500);
		} catch {}
	}

	function fmtDateTime(s?: string | null) {
		if (!s) return '';
		try {
			return new Date(s).toLocaleString('fr-CA', { dateStyle: 'medium', timeStyle: 'short' });
		} catch {
			return s;
		}
	}

	async function rejectConfirm(e: Event) {
		if (!confirm('Marquer cette soumission comme rejetée?')) {
			e.preventDefault();
		}
	}

	function handleAdminFormSubmit() {
		saving = true;
		return async ({ result }: any) => {
			saving = false;
			if (result.type === 'success') {
				const action = result.data?.action;
				showToast(
					action === 'sendOffer'
						? 'Offre envoyée — copiez le lien client'
						: action === 'sign'
							? 'Signature enregistrée'
							: action === 'reject'
								? 'Soumission rejetée'
								: 'Modifications sauvegardées'
				);
				await invalidateAll();
			} else if (result.type === 'failure') {
				showToast(result.data?.error || 'Erreur', 'error');
			}
		};
	}

	function handleSignFormSubmit() {
		signSubmitting = true;
		return async ({ result }: any) => {
			signSubmitting = false;
			if (result.type === 'success') {
				showSign = false;
				showToast('Signature enregistrée');
				await invalidateAll();
			} else if (result.type === 'failure') {
				showToast(result.data?.error || 'Erreur', 'error');
			}
		};
	}
</script>

<svelte:head><title>Soumission — Admin</title></svelte:head>

{#if toast}
	<div
		class="fixed top-4 right-4 z-50 px-4 py-3 rounded-lg border shadow-xl text-sm font-medium {toast.type ===
		'success'
			? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
			: 'bg-red-500/10 border-red-500/40 text-red-300'}"
	>
		{toast.msg}
	</div>
{/if}

<div class="space-y-5">
	<div class="flex items-center justify-between gap-3 flex-wrap">
		<a
			href="/mi/admin/soumissions"
			class="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-amber-400 transition"
		>
			<ArrowLeft class="h-4 w-4" /> Retour à la liste
		</a>
		{#if soumission}
			<span
				class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border {statutColor(
					soumission.statut
				)}"
			>
				{statutLabel(soumission.statut)}
			</span>
		{/if}
	</div>

	{#if soumission}
		<form method="POST" use:enhance={handleAdminFormSubmit}>
			<input type="hidden" name="numero" value={f_numero} />
			<input type="hidden" name="date_soumission" value={f_date} />
			<input type="hidden" name="articles" value={JSON.stringify(f_articles)} />
			<input type="hidden" name="modalites" value={JSON.stringify(f_modalites)} />
			<input type="hidden" name="sections" value={JSON.stringify(f_sections)} />
			<input type="hidden" name="notes_admin" value={f_notes_admin} />

			<div class="grid lg:grid-cols-3 gap-5">
				<div class="lg:col-span-2 space-y-5">
					<section class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
						<h2 class="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-3">Client</h2>
						<div class="grid sm:grid-cols-2 gap-3 text-sm">
							<div>
								<div class="text-xs text-zinc-500">Nom</div>
								<div class="text-white font-medium">{soumission.client_nom}</div>
							</div>
							<div>
								<div class="text-xs text-zinc-500 flex items-center gap-1">
									<Mail class="h-3 w-3" /> Courriel
								</div>
								<div class="text-white">{soumission.client_email}</div>
							</div>
							{#if soumission.client_telephone}
								<div>
									<div class="text-xs text-zinc-500 flex items-center gap-1">
										<Phone class="h-3 w-3" /> Téléphone
									</div>
									<div class="text-white">{soumission.client_telephone}</div>
								</div>
							{/if}
							{#if soumission.projet_adresse}
								<div class="sm:col-span-2">
									<div class="text-xs text-zinc-500 flex items-center gap-1">
										<MapPin class="h-3 w-3" /> Adresse projet
									</div>
									<div class="text-white">{soumission.projet_adresse}</div>
								</div>
							{/if}
							{#if soumission.projet_description}
								<div class="sm:col-span-2">
									<div class="text-xs text-zinc-500">Description</div>
									<div class="text-zinc-300 text-sm whitespace-pre-wrap">
										{soumission.projet_description}
									</div>
								</div>
							{/if}
							{#if soumission.notes_client}
								<div class="sm:col-span-2">
									<div class="text-xs text-zinc-500">Notes du client</div>
									<div class="text-zinc-300 text-sm whitespace-pre-wrap">
										{soumission.notes_client}
									</div>
								</div>
							{/if}
						</div>
					</section>

					<section class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
						<h2 class="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-3">Identification</h2>
						<div class="grid sm:grid-cols-2 gap-3">
							<div>
								<label for="num" class="block text-xs text-zinc-500 mb-1">Numéro</label>
								<input
									id="num"
									type="text"
									bind:value={f_numero}
									placeholder="2026-001"
									class="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-lg text-sm text-white outline-none"
								/>
							</div>
							<div>
								<label for="dat" class="block text-xs text-zinc-500 mb-1">Date</label>
								<input
									id="dat"
									type="date"
									bind:value={f_date}
									class="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-lg text-sm text-white outline-none"
								/>
							</div>
						</div>
					</section>

					<section class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
						<div class="flex items-center justify-between mb-3">
							<h2 class="text-sm font-bold uppercase tracking-wider text-zinc-400">Articles</h2>
							<button
								type="button"
								on:click={addArticle}
								class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold border border-amber-500/30 transition"
							>
								<Plus class="h-3.5 w-3.5" /> Ajouter
							</button>
						</div>
						{#if f_articles.length === 0}
							<p class="text-sm text-zinc-500 text-center py-6">
								Aucun article. Cliquez sur Ajouter.
							</p>
						{:else}
							<div class="space-y-2">
								{#each f_articles as a, i}
									<div
										class="bg-zinc-950 border border-zinc-800 rounded-lg p-3 grid grid-cols-12 gap-2"
									>
										<div class="col-span-12 sm:col-span-6">
											<label for="adesc-{i}" class="block text-xs text-zinc-500 mb-1"
												>Description</label
											>
											<input
												id="adesc-{i}"
												type="text"
												bind:value={a.description}
												class="w-full px-2 py-2 text-sm bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded text-white outline-none"
											/>
										</div>
										<div class="col-span-3 sm:col-span-2">
											<label for="aqty-{i}" class="block text-xs text-zinc-500 mb-1">Qté</label>
											<input
												id="aqty-{i}"
												type="number"
												min="0"
												step="0.01"
												bind:value={a.quantite}
												class="w-full px-2 py-2 text-sm bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded text-white outline-none"
											/>
										</div>
										<div class="col-span-6 sm:col-span-3">
											<label for="apu-{i}" class="block text-xs text-zinc-500 mb-1"
												>Prix unit.</label
											>
											<input
												id="apu-{i}"
												type="number"
												min="0"
												step="0.01"
												bind:value={a.prix_unitaire}
												class="w-full px-2 py-2 text-sm bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded text-white outline-none"
											/>
										</div>
										<div class="col-span-3 sm:col-span-1 flex items-end justify-end">
											<button
												type="button"
												on:click={() => removeArticle(i)}
												class="p-2 rounded-lg hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition"
												aria-label="Supprimer"
											>
												<Trash2 class="h-4 w-4" />
											</button>
										</div>
									</div>
								{/each}
							</div>
						{/if}
					</section>

					<section class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
						<div class="flex items-center justify-between mb-3">
							<h2 class="text-sm font-bold uppercase tracking-wider text-zinc-400">
								Modalités de paiement
							</h2>
							<button
								type="button"
								on:click={addModalite}
								class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold border border-amber-500/30 transition"
							>
								<Plus class="h-3.5 w-3.5" /> Ajouter
							</button>
						</div>
						{#if f_modalites.length === 0}
							<p class="text-sm text-zinc-500 text-center py-6">Aucune modalité.</p>
						{:else}
							<div class="space-y-2">
								{#each f_modalites as m, i}
									<div
										class="bg-zinc-950 border border-zinc-800 rounded-lg p-3 grid grid-cols-12 gap-2"
									>
										<div class="col-span-3">
											<label for="mp-{i}" class="block text-xs text-zinc-500 mb-1">%</label>
											<input
												id="mp-{i}"
												type="number"
												min="0"
												max="100"
												step="0.01"
												bind:value={m.pourcentage}
												class="w-full px-2 py-2 text-sm bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded text-white outline-none"
											/>
										</div>
										<div class="col-span-8">
											<label for="ml-{i}" class="block text-xs text-zinc-500 mb-1"
												>Description</label
											>
											<input
												id="ml-{i}"
												type="text"
												bind:value={m.label}
												class="w-full px-2 py-2 text-sm bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded text-white outline-none"
											/>
										</div>
										<div class="col-span-1 flex items-end justify-end">
											<button
												type="button"
												on:click={() => removeModalite(i)}
												class="p-2 rounded-lg hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition"
												aria-label="Supprimer"
											>
												<Trash2 class="h-4 w-4" />
											</button>
										</div>
									</div>
								{/each}
							</div>
						{/if}
					</section>

					<section class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
						<h2 class="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-3">
							Sections du contrat
						</h2>
						<div class="space-y-2">
							{#each SECTION_ORDER as sec}
								{@const current = f_sections[sec.key] ?? DEFAULT_SECTIONS[sec.key]}
								<div class="border border-zinc-800 rounded-lg overflow-hidden">
									<button
										type="button"
										on:click={() => toggleSection(sec.key)}
										class="w-full flex items-center justify-between p-3 text-left hover:bg-zinc-800/50 transition"
									>
										<span class="font-semibold text-sm">
											<span class="text-amber-400 mr-2">{sec.num}.</span>{sec.title}
										</span>
										{#if openSection === sec.key}
											<ChevronUp class="h-4 w-4 text-zinc-500" />
										{:else}
											<ChevronDown class="h-4 w-4 text-zinc-500" />
										{/if}
									</button>
									{#if openSection === sec.key}
										<div class="p-3 border-t border-zinc-800 bg-zinc-950/50 space-y-2">
											<textarea
												rows="6"
												value={current}
												on:input={(e) =>
													(f_sections = { ...f_sections, [sec.key]: e.currentTarget.value })}
												class="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded text-white outline-none resize-y"
											></textarea>
											<button
												type="button"
												on:click={() => resetSection(sec.key)}
												class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs text-zinc-400 hover:text-amber-400 transition"
											>
												<RotateCcw class="h-3 w-3" /> Réinitialiser au défaut
											</button>
										</div>
									{/if}
								</div>
							{/each}
						</div>
					</section>

					<section class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
						<h2 class="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-3">
							Notes internes (non visibles par le client)
						</h2>
						<textarea
							rows="3"
							bind:value={f_notes_admin}
							placeholder="Notes pour l'équipe…"
							class="w-full px-3 py-2 text-sm bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-lg text-white outline-none resize-none"
						></textarea>
					</section>
				</div>

				<aside class="space-y-5">
					<div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 lg:sticky lg:top-20">
						<h3 class="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-3">
							Aperçu — Totaux
						</h3>
						<div class="space-y-1.5 text-sm">
							<div class="flex justify-between text-zinc-400">
								<span>Sous-total</span>
								<span class="text-zinc-200">{fmtMoney(totals.sousTotal)}</span>
							</div>
							<div class="flex justify-between text-zinc-400">
								<span>TPS 5 %</span>
								<span class="text-zinc-200">{fmtMoney(totals.tps)}</span>
							</div>
							<div class="flex justify-between text-zinc-400">
								<span>TVQ 9,975 %</span>
								<span class="text-zinc-200">{fmtMoney(totals.tvq)}</span>
							</div>
							<div
								class="flex justify-between pt-2 mt-2 border-t border-zinc-800 text-base font-bold"
							>
								<span>TOTAL</span>
								<span class="text-amber-400">{fmtMoney(totals.total)}</span>
							</div>
						</div>

						<div class="mt-5 space-y-2">
							<button
								type="submit"
								formaction="?/save"
								disabled={saving}
								class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition disabled:opacity-50"
							>
								<Save class="h-4 w-4" />
								{saving ? 'Sauvegarde…' : 'Sauvegarder'}
							</button>
							<button
								type="submit"
								formaction="?/sendOffer"
								disabled={saving}
								class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm transition disabled:opacity-50"
							>
								<Send class="h-4 w-4" /> Envoyer offre au client
							</button>
							<button
								type="button"
								on:click={downloadPDF}
								class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-700 hover:border-zinc-600 text-zinc-200 font-semibold text-sm transition"
							>
								<Download class="h-4 w-4" /> Télécharger PDF
							</button>
							<button
								type="button"
								on:click={openSignModal}
								class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-semibold text-sm transition"
							>
								<PenLine class="h-4 w-4" /> Signer comme entrepreneur
							</button>
							<button
								type="submit"
								formaction="?/reject"
								on:click={rejectConfirm}
								class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-red-500/40 bg-red-500/5 hover:bg-red-500/10 text-red-300 font-semibold text-sm transition"
							>
								<Ban class="h-4 w-4" /> Marquer comme rejetée
							</button>
						</div>

						<div class="mt-5 pt-5 border-t border-zinc-800">
							<div class="text-xs uppercase tracking-wider text-zinc-500 mb-2">Lien client</div>
							<div class="flex items-center gap-2">
								<input
									type="text"
									readonly
									value={clientLink}
									class="flex-1 bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-xs text-amber-300 font-mono truncate"
								/>
								<button
									type="button"
									on:click={copyClientLink}
									class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs transition"
									aria-label="Copier"
								>
									{#if copied}
										<Check class="h-3.5 w-3.5 text-emerald-400" />
									{:else}
										<Copy class="h-3.5 w-3.5" />
									{/if}
								</button>
							</div>
						</div>

						<div class="mt-5 pt-5 border-t border-zinc-800 space-y-2 text-xs">
							<div class="flex items-center justify-between">
								<span class="text-zinc-500">Signature entrepreneur</span>
								{#if soumission.signature_admin}
									<span class="text-emerald-400 inline-flex items-center gap-1">
										<Check class="h-3 w-3" /> Signé
									</span>
								{:else}
									<span class="text-zinc-600">—</span>
								{/if}
							</div>
							<div class="flex items-center justify-between">
								<span class="text-zinc-500">Signature client</span>
								{#if soumission.signature_client}
									<span class="text-emerald-400 inline-flex items-center gap-1">
										<Check class="h-3 w-3" /> Signé
									</span>
								{:else}
									<span class="text-zinc-600">—</span>
								{/if}
							</div>
						</div>
					</div>

					<div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
						<h3
							class="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2"
						>
							<Clock class="h-4 w-4" /> Historique
						</h3>
						{#if versions.length === 0}
							<p class="text-sm text-zinc-500">Aucune version envoyée.</p>
						{:else}
							<ol class="space-y-3">
								{#each versions as v}
									<li class="bg-zinc-950 border border-zinc-800 rounded-lg p-3">
										<div class="flex items-center justify-between mb-1">
											<span class="text-xs font-bold text-amber-400">v{v.version_num}</span>
											<span class="text-[10px] text-zinc-500">{fmtDateTime(v.created_at)}</span>
										</div>
										<div class="text-xs text-zinc-300 mb-1">
											{v.type === 'offre_admin' ? 'Offre entrepreneur' : 'Contre-offre client'}
										</div>
										{#if v.message}
											<p class="text-xs text-zinc-400 mb-1 whitespace-pre-wrap">{v.message}</p>
										{/if}
										{#if v.total != null}
											<div class="text-xs text-zinc-500">
												Total :
												<span class="text-amber-400 font-semibold">{fmtMoney(v.total)}</span>
											</div>
										{/if}
									</li>
								{/each}
							</ol>
						{/if}
					</div>
				</aside>
			</div>
		</form>
	{/if}
</div>

{#if showSign && soumission}
	<div
		class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start sm:items-center justify-center p-4 overflow-y-auto"
		on:click|self={() => (showSign = false)}
		on:keydown={(e) => e.key === 'Escape' && (showSign = false)}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<div class="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg my-8">
			<div class="border-b border-zinc-800 p-5 flex items-center justify-between">
				<h3 class="text-lg font-bold">Signature entrepreneur</h3>
				<button
					type="button"
					on:click={() => (showSign = false)}
					class="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
					aria-label="Fermer"
				>
					<X class="h-5 w-5" />
				</button>
			</div>

			<form method="POST" action="?/sign" use:enhance={handleSignFormSubmit}>
				<input type="hidden" name="signature" value={signValue} />
				<div class="p-5 space-y-4">
					<div>
						<label
							for="adminnom"
							class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2"
							>Nom du signataire</label
						>
						<input
							id="adminnom"
							name="nom"
							type="text"
							bind:value={signNom}
							required
							class="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-lg text-white text-sm outline-none"
						/>
					</div>
					<SignaturePad bind:value={signValue} label="Votre signature" />
				</div>
				<div class="border-t border-zinc-800 p-5 flex flex-col sm:flex-row gap-3">
					<button
						type="button"
						on:click={() => (showSign = false)}
						class="flex-1 px-4 py-2.5 rounded-lg border border-zinc-700 hover:border-zinc-600 text-zinc-200 font-semibold transition"
					>
						Annuler
					</button>
					<button
						type="submit"
						disabled={signSubmitting || !signValue || !signNom.trim()}
						class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold transition disabled:opacity-50"
					>
						<Check class="h-4 w-4" /> {signSubmitting ? 'Signature…' : 'Confirmer la signature'}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
