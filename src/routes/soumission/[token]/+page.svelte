<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import {
		supabase,
		fmtMoney,
		articleTotal,
		articlesSubtotal,
		calcTotals,
		statutLabel,
		statutColor,
		type Soumission,
		type SoumissionVersion,
		type Article,
		type Modalite
	} from '$lib/supabase/client';
	import { SECTION_ORDER, DEFAULT_SECTIONS } from '$lib/supabase/default-sections';
	import { generateSoumissionPDF } from '$lib/supabase/pdf';
	import SignaturePad from '$lib/supabase/SignaturePad.svelte';
	import {
		Download,
		Edit,
		Check,
		X,
		Plus,
		Trash2,
		ArrowLeft,
		Shield,
		Clock,
		FileText,
		ChevronDown,
		ChevronUp,
		Send,
		Mail,
		Phone,
		MapPin,
		Calendar,
		PenLine
	} from 'lucide-svelte';

	let loading = true;
	let errorMsg = '';
	let soumission: Soumission | null = null;
	let versions: SoumissionVersion[] = [];

	// Counter-offer modal state
	let showCounterModal = false;
	let counterArticles: Article[] = [];
	let counterModalites: Modalite[] = [];
	let counterMessage = '';
	let counterSubmitting = false;

	// Sign modal state
	let showSignModal = false;
	let signNom = '';
	let signValue = '';
	let signSubmitting = false;

	// Sections expanded
	let openSections: Record<string, boolean> = {};

	$: token = $page.params.token;

	$: counterSubtotal = articlesSubtotal(counterArticles || []);
	$: counterTotals = calcTotals(counterSubtotal);

	$: showOffer =
		soumission &&
		(['offerte', 'contre_offre', 'acceptee', 'signee_par_les_deux', 'rejetee', 'expiree'].includes(
			soumission.statut
		));

	onMount(async () => {
		await load();
	});

	async function load() {
		loading = true;
		errorMsg = '';
		try {
			const { data, error } = await supabase
				.from('soumissions')
				.select('*')
				.eq('client_token', token)
				.single();
			if (error) throw error;
			if (!data) throw new Error('Soumission introuvable');
			soumission = data as Soumission;

			const { data: vs, error: ve } = await supabase
				.from('soumission_versions')
				.select('*')
				.eq('soumission_id', soumission.id)
				.order('version_num', { ascending: true });
			if (ve) throw ve;
			versions = (vs || []) as SoumissionVersion[];
		} catch (e: any) {
			console.error(e);
			errorMsg = e?.message || 'Impossible de charger la soumission.';
		} finally {
			loading = false;
		}
	}

	function downloadPDF() {
		if (!soumission) return;
		const doc = generateSoumissionPDF(soumission);
		doc.save(`soumission-${soumission.numero || soumission.id.slice(0, 8)}.pdf`);
	}

	function openCounter() {
		if (!soumission) return;
		counterArticles = (soumission.articles || []).map((a) => ({ ...a }));
		counterModalites = (soumission.modalites || []).map((m) => ({ ...m }));
		counterMessage = '';
		showCounterModal = true;
	}

	function closeCounter() {
		showCounterModal = false;
	}

	function addCounterArticle() {
		counterArticles = [...counterArticles, { description: '', quantite: 1, prix_unitaire: 0 }];
	}

	function removeCounterArticle(i: number) {
		counterArticles = counterArticles.filter((_, idx) => idx !== i);
	}

	async function submitCounter() {
		if (!soumission || counterSubmitting) return;
		counterSubmitting = true;
		try {
			const lastNum = versions.length > 0 ? Math.max(...versions.map((v) => v.version_num)) : 0;
			const subtotal = articlesSubtotal(counterArticles);
			const t = calcTotals(subtotal);

			const { error: vErr } = await supabase.from('soumission_versions').insert({
				soumission_id: soumission.id,
				version_num: lastNum + 1,
				type: 'contre_offre_client',
				auteur: 'client',
				message: counterMessage.trim() || null,
				sous_total: t.sousTotal,
				total: t.total,
				articles: counterArticles,
				modalites: counterModalites,
				sections: soumission.sections || {}
			});
			if (vErr) throw vErr;

			const { error: uErr } = await supabase
				.from('soumissions')
				.update({
					statut: 'contre_offre',
					articles: counterArticles,
					modalites: counterModalites,
					sous_total: t.sousTotal,
					tps: t.tps,
					tvq: t.tvq,
					total: t.total,
					notes_client: counterMessage.trim() || soumission.notes_client || null
				})
				.eq('id', soumission.id);
			if (uErr) throw uErr;

			showCounterModal = false;
			await load();
		} catch (e: any) {
			console.error(e);
			alert(e?.message || 'Erreur lors de l\'envoi de la contre-offre.');
		} finally {
			counterSubmitting = false;
		}
	}

	function openSign() {
		if (!soumission) return;
		signNom = soumission.client_nom || '';
		signValue = '';
		showSignModal = true;
	}

	function closeSign() {
		showSignModal = false;
	}

	async function submitSign() {
		if (!soumission || signSubmitting) return;
		if (!signValue || !signNom.trim()) {
			alert('Veuillez signer et entrer votre nom.');
			return;
		}
		signSubmitting = true;
		try {
			const newStatut =
				soumission.signature_admin && soumission.signature_admin.length > 0
					? 'signee_par_les_deux'
					: 'acceptee';
			const { error } = await supabase
				.from('soumissions')
				.update({
					signature_client: signValue,
					signature_client_at: new Date().toISOString(),
					signature_client_nom: signNom.trim(),
					statut: newStatut
				})
				.eq('id', soumission.id);
			if (error) throw error;
			showSignModal = false;
			await load();
		} catch (e: any) {
			console.error(e);
			alert(e?.message || 'Erreur lors de la signature.');
		} finally {
			signSubmitting = false;
		}
	}

	function toggleSection(key: string) {
		openSections = { ...openSections, [key]: !openSections[key] };
	}

	function fmtDate(s?: string) {
		if (!s) return '';
		try {
			return new Date(s).toLocaleString('fr-CA', {
				dateStyle: 'medium',
				timeStyle: 'short'
			});
		} catch {
			return s;
		}
	}
</script>

<svelte:head>
	<title>Ma soumission — Mini Excavations Érable</title>
</svelte:head>

<div class="min-h-screen bg-zinc-950 text-white">
	<header class="border-b border-zinc-800 bg-zinc-950/95 backdrop-blur sticky top-0 z-30">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
			<a
				href="/"
				class="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-amber-400 transition"
			>
				<ArrowLeft class="h-4 w-4" /> Retour au site
			</a>
			<div class="hidden sm:flex items-center gap-2 text-xs text-zinc-500">
				<Shield class="h-3.5 w-3.5 text-amber-500" />
				RBQ 5823-7736-01
			</div>
		</div>
	</header>

	<main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
		{#if loading}
			<div class="space-y-4">
				<div class="h-8 bg-zinc-900 rounded animate-pulse w-1/3"></div>
				<div class="h-32 bg-zinc-900 rounded animate-pulse"></div>
				<div class="h-64 bg-zinc-900 rounded animate-pulse"></div>
			</div>
		{:else if errorMsg}
			<div class="rounded-2xl border border-red-500/30 bg-red-500/5 p-8 text-center">
				<X class="h-12 w-12 text-red-400 mx-auto mb-4" />
				<h2 class="text-xl font-bold mb-2">Soumission introuvable</h2>
				<p class="text-zinc-400">{errorMsg}</p>
				<a
					href="/soumission"
					class="mt-6 inline-block px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold transition"
				>
					Faire une nouvelle demande
				</a>
			</div>
		{:else if soumission}
			<!-- Header -->
			<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
				<div>
					<div class="text-xs uppercase tracking-wider text-zinc-500 mb-1">
						{soumission.numero ? `N° ${soumission.numero}` : 'Demande de soumission'}
					</div>
					<h1 class="text-3xl sm:text-4xl font-black">
						{soumission.projet_type || 'Soumission'}
					</h1>
				</div>
				<span
					class="self-start inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border {statutColor(
						soumission.statut
					)}"
				>
					{statutLabel(soumission.statut)}
				</span>
			</div>

			<!-- Client info card -->
			<section class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">
				<h2 class="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4">
					Vos informations
				</h2>
				<div class="grid sm:grid-cols-2 gap-4 text-sm">
					<div class="flex items-start gap-3">
						<div class="text-zinc-500 mt-0.5">Nom</div>
						<div class="text-white font-medium">{soumission.client_nom}</div>
					</div>
					<div class="flex items-start gap-3">
						<Mail class="h-4 w-4 text-zinc-500 mt-0.5" />
						<div class="text-white">{soumission.client_email}</div>
					</div>
					{#if soumission.client_telephone}
						<div class="flex items-start gap-3">
							<Phone class="h-4 w-4 text-zinc-500 mt-0.5" />
							<div class="text-white">{soumission.client_telephone}</div>
						</div>
					{/if}
					{#if soumission.projet_adresse}
						<div class="flex items-start gap-3 sm:col-span-2">
							<MapPin class="h-4 w-4 text-zinc-500 mt-0.5" />
							<div class="text-white">{soumission.projet_adresse}</div>
						</div>
					{/if}
				</div>
				{#if soumission.projet_description}
					<div class="mt-4 pt-4 border-t border-zinc-800">
						<div class="text-xs uppercase tracking-wider text-zinc-500 mb-2">
							Description du projet
						</div>
						<p class="text-sm text-zinc-300 whitespace-pre-wrap">
							{soumission.projet_description}
						</p>
					</div>
				{/if}
			</section>

			{#if !showOffer}
				<!-- Pending message -->
				<section
					class="bg-amber-500/5 border border-amber-500/30 rounded-2xl p-8 text-center"
				>
					<Clock class="h-12 w-12 text-amber-400 mx-auto mb-4" />
					<h2 class="text-xl font-bold mb-2">Votre demande est en révision</h2>
					<p class="text-zinc-400 max-w-xl mx-auto">
						Notre équipe analyse votre projet. Vous serez notifié par courriel dès qu'une offre sera
						prête. Merci de votre patience.
					</p>
				</section>
			{:else}
				<!-- Articles -->
				{#if soumission.articles && soumission.articles.length > 0}
					<section class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">
						<h2 class="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4">
							Détails de l'offre
						</h2>
						<div class="overflow-x-auto">
							<table class="w-full text-sm">
								<thead>
									<tr class="border-b border-zinc-800 text-zinc-500 text-xs uppercase">
										<th class="text-left py-2 font-semibold">Description</th>
										<th class="text-right py-2 font-semibold w-20">Qté</th>
										<th class="text-right py-2 font-semibold w-32">Prix unit.</th>
										<th class="text-right py-2 font-semibold w-32">Total</th>
									</tr>
								</thead>
								<tbody>
									{#each soumission.articles as a}
										<tr class="border-b border-zinc-800/60">
											<td class="py-3 text-zinc-200">{a.description}</td>
											<td class="py-3 text-right text-zinc-300">{a.quantite}</td>
											<td class="py-3 text-right text-zinc-300">{fmtMoney(a.prix_unitaire)}</td>
											<td class="py-3 text-right font-semibold text-white">{fmtMoney(articleTotal(a))}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>

						<!-- Totals -->
						<div class="mt-4 pt-4 border-t border-zinc-800 flex justify-end">
							<div class="w-full max-w-xs space-y-1.5 text-sm">
								<div class="flex justify-between text-zinc-400">
									<span>Sous-total</span>
									<span class="text-zinc-200">{fmtMoney(soumission.sous_total || 0)}</span>
								</div>
								<div class="flex justify-between text-zinc-400">
									<span>TPS 5 %</span>
									<span class="text-zinc-200">{fmtMoney(soumission.tps || 0)}</span>
								</div>
								<div class="flex justify-between text-zinc-400">
									<span>TVQ 9,975 %</span>
									<span class="text-zinc-200">{fmtMoney(soumission.tvq || 0)}</span>
								</div>
								<div
									class="flex justify-between pt-2 mt-2 border-t border-zinc-700 text-base font-bold"
								>
									<span class="text-white">TOTAL</span>
									<span class="text-amber-400">{fmtMoney(soumission.total || 0)}</span>
								</div>
							</div>
						</div>
					</section>
				{/if}

				<!-- Modalités -->
				{#if soumission.modalites && soumission.modalites.length > 0}
					<section class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">
						<h2 class="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4">
							Modalités de paiement
						</h2>
						<ul class="space-y-2">
							{#each soumission.modalites as m}
								<li class="flex items-center gap-4 text-sm">
									<span
										class="inline-flex items-center justify-center min-w-[3rem] px-2 py-1 rounded bg-amber-500/10 text-amber-400 font-bold text-xs border border-amber-500/30"
									>
										{m.pourcentage}%
									</span>
									<span class="text-zinc-300">{m.label}</span>
								</li>
							{/each}
						</ul>
					</section>
				{/if}

				<!-- Contract sections -->
				<section class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">
					<h2 class="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4">
						Termes du contrat
					</h2>
					<div class="space-y-2">
						{#each SECTION_ORDER as sec}
							{@const text = (soumission.sections && soumission.sections[sec.key]) || DEFAULT_SECTIONS[sec.key]}
							<div class="border border-zinc-800 rounded-lg overflow-hidden">
								<button
									type="button"
									on:click={() => toggleSection(sec.key)}
									class="w-full flex items-center justify-between p-3 text-left hover:bg-zinc-800/50 transition"
								>
									<span class="font-semibold text-sm">
										<span class="text-amber-400 mr-2">{sec.num}.</span>{sec.title}
									</span>
									{#if openSections[sec.key]}
										<ChevronUp class="h-4 w-4 text-zinc-500" />
									{:else}
										<ChevronDown class="h-4 w-4 text-zinc-500" />
									{/if}
								</button>
								{#if openSections[sec.key]}
									<div class="p-4 border-t border-zinc-800 bg-zinc-950/50 text-sm text-zinc-300 whitespace-pre-wrap">
										{text}
									</div>
								{/if}
							</div>
						{/each}
					</div>
				</section>

				<!-- Action buttons -->
				<section
					class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row gap-3"
				>
					<button
						type="button"
						on:click={downloadPDF}
						class="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-zinc-700 hover:border-zinc-600 text-zinc-200 font-semibold transition"
					>
						<Download class="h-4 w-4" /> Télécharger PDF
					</button>
					{#if !['acceptee', 'signee_par_les_deux', 'rejetee', 'expiree'].includes(soumission.statut)}
						<button
							type="button"
							on:click={openCounter}
							class="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-semibold transition"
						>
							<Edit class="h-4 w-4" /> Contre-offrir
						</button>
						<button
							type="button"
							on:click={openSign}
							class="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold transition shadow-lg shadow-amber-500/20"
						>
							<PenLine class="h-4 w-4" /> Accepter et signer
						</button>
					{:else if soumission.statut === 'acceptee' || soumission.statut === 'signee_par_les_deux'}
						<div
							class="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-semibold"
						>
							<Check class="h-4 w-4" />
							{soumission.statut === 'signee_par_les_deux'
								? 'Contrat signé par les deux parties'
								: 'Vous avez signé — en attente de l\'entrepreneur'}
						</div>
					{/if}
				</section>
			{/if}

			<!-- Timeline -->
			{#if versions.length > 0}
				<section class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
					<h2 class="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
						<Clock class="h-4 w-4" /> Historique
					</h2>
					<ol class="space-y-4">
						{#each versions as v}
							<li class="flex gap-4">
								<div class="flex-shrink-0 w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-amber-400">
									v{v.version_num}
								</div>
								<div class="flex-1 min-w-0 bg-zinc-950 border border-zinc-800 rounded-lg p-3">
									<div class="flex items-center justify-between gap-2 mb-1">
										<span class="text-sm font-semibold">
											{v.type === 'offre_admin' ? 'Offre de l\'entrepreneur' : 'Contre-offre du client'}
										</span>
										<span class="text-xs text-zinc-500">{fmtDate(v.created_at)}</span>
									</div>
									{#if v.message}
										<p class="text-sm text-zinc-300 whitespace-pre-wrap mb-2">{v.message}</p>
									{/if}
									{#if v.total != null}
										<div class="text-xs text-zinc-500">
											Total : <span class="text-amber-400 font-semibold">{fmtMoney(v.total)}</span>
										</div>
									{/if}
								</div>
							</li>
						{/each}
					</ol>
				</section>
			{/if}
		{/if}
	</main>
</div>

<!-- Counter-offer Modal -->
{#if showCounterModal && soumission}
	<div
		class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start sm:items-center justify-center p-4 overflow-y-auto"
		on:click|self={closeCounter}
		on:keydown={(e) => e.key === 'Escape' && closeCounter()}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<div
			class="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-3xl my-8 max-h-[calc(100vh-4rem)] overflow-y-auto"
		>
			<div class="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-5 flex items-center justify-between">
				<h3 class="text-lg font-bold">Faire une contre-offre</h3>
				<button
					type="button"
					on:click={closeCounter}
					class="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
					aria-label="Fermer"
				>
					<X class="h-5 w-5" />
				</button>
			</div>

			<div class="p-5 space-y-5">
				<div>
					<div class="flex items-center justify-between mb-3">
						<h4 class="text-sm font-bold uppercase tracking-wider text-zinc-400">Articles</h4>
						<button
							type="button"
							on:click={addCounterArticle}
							class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold border border-amber-500/30 transition"
						>
							<Plus class="h-3.5 w-3.5" /> Ajouter
						</button>
					</div>
					<div class="space-y-2">
						{#each counterArticles as a, i}
							<div class="bg-zinc-950 border border-zinc-800 rounded-lg p-3 grid grid-cols-12 gap-2 items-start">
								<div class="col-span-12 sm:col-span-6">
									<label for="cdesc-{i}" class="block text-xs text-zinc-500 mb-1">Description</label>
									<input
										id="cdesc-{i}"
										type="text"
										bind:value={a.description}
										class="w-full px-2 py-2 text-sm bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded text-white outline-none"
									/>
								</div>
								<div class="col-span-3 sm:col-span-2">
									<label for="cqty-{i}" class="block text-xs text-zinc-500 mb-1">Qté</label>
									<input
										id="cqty-{i}"
										type="number"
										min="0"
										step="0.01"
										bind:value={a.quantite}
										class="w-full px-2 py-2 text-sm bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded text-white outline-none"
									/>
								</div>
								<div class="col-span-6 sm:col-span-3">
									<label for="cpu-{i}" class="block text-xs text-zinc-500 mb-1">Prix unit.</label>
									<input
										id="cpu-{i}"
										type="number"
										min="0"
										step="0.01"
										bind:value={a.prix_unitaire}
										class="w-full px-2 py-2 text-sm bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded text-white outline-none"
									/>
								</div>
								<div class="col-span-3 sm:col-span-1 flex items-end justify-end h-full">
									<button
										type="button"
										on:click={() => removeCounterArticle(i)}
										class="p-2 rounded-lg hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition"
										aria-label="Supprimer"
									>
										<Trash2 class="h-4 w-4" />
									</button>
								</div>
							</div>
						{/each}
					</div>

					<div class="mt-3 flex justify-end text-sm">
						<div class="space-y-1 w-full max-w-xs">
							<div class="flex justify-between text-zinc-400">
								<span>Sous-total</span><span class="text-zinc-200">{fmtMoney(counterTotals.sousTotal)}</span>
							</div>
							<div class="flex justify-between text-zinc-400">
								<span>TPS</span><span>{fmtMoney(counterTotals.tps)}</span>
							</div>
							<div class="flex justify-between text-zinc-400">
								<span>TVQ</span><span>{fmtMoney(counterTotals.tvq)}</span>
							</div>
							<div class="flex justify-between pt-2 border-t border-zinc-800 text-base font-bold">
								<span>TOTAL</span><span class="text-amber-400">{fmtMoney(counterTotals.total)}</span>
							</div>
						</div>
					</div>
				</div>

				<div>
					<label for="cmsg" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
						Message (facultatif)
					</label>
					<textarea
						id="cmsg"
						rows="3"
						bind:value={counterMessage}
						placeholder="Expliquez vos modifications ou demandes…"
						class="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-lg text-white text-sm outline-none resize-none"
					></textarea>
				</div>
			</div>

			<div class="sticky bottom-0 bg-zinc-900 border-t border-zinc-800 p-5 flex flex-col sm:flex-row gap-3">
				<button
					type="button"
					on:click={closeCounter}
					class="flex-1 px-4 py-2.5 rounded-lg border border-zinc-700 hover:border-zinc-600 text-zinc-200 font-semibold transition"
				>
					Annuler
				</button>
				<button
					type="button"
					on:click={submitCounter}
					disabled={counterSubmitting}
					class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold transition disabled:opacity-50"
				>
					<Send class="h-4 w-4" />
					{counterSubmitting ? 'Envoi…' : 'Envoyer la contre-offre'}
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- Sign Modal -->
{#if showSignModal && soumission}
	<div
		class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start sm:items-center justify-center p-4 overflow-y-auto"
		on:click|self={closeSign}
		on:keydown={(e) => e.key === 'Escape' && closeSign()}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<div class="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg my-8">
			<div class="border-b border-zinc-800 p-5 flex items-center justify-between">
				<h3 class="text-lg font-bold">Accepter et signer</h3>
				<button
					type="button"
					on:click={closeSign}
					class="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
					aria-label="Fermer"
				>
					<X class="h-5 w-5" />
				</button>
			</div>

			<div class="p-5 space-y-4">
				<p class="text-sm text-zinc-400">
					En signant, vous acceptez les termes et le prix de cette soumission. Votre signature
					électronique est légalement contraignante au Québec.
				</p>

				<div>
					<label for="signnom" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
						Votre nom complet
					</label>
					<input
						id="signnom"
						type="text"
						bind:value={signNom}
						class="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-lg text-white text-sm outline-none"
					/>
				</div>

				<SignaturePad bind:value={signValue} label="Signature" />

				<div class="text-xs text-zinc-500 bg-zinc-950 border border-zinc-800 rounded-lg p-3">
					<strong class="text-zinc-300">Total à payer :</strong>
					<span class="text-amber-400 font-bold">{fmtMoney(soumission.total || 0)}</span>
				</div>
			</div>

			<div class="border-t border-zinc-800 p-5 flex flex-col sm:flex-row gap-3">
				<button
					type="button"
					on:click={closeSign}
					class="flex-1 px-4 py-2.5 rounded-lg border border-zinc-700 hover:border-zinc-600 text-zinc-200 font-semibold transition"
				>
					Annuler
				</button>
				<button
					type="button"
					on:click={submitSign}
					disabled={signSubmitting || !signValue || !signNom.trim()}
					class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold transition disabled:opacity-50"
				>
					<Check class="h-4 w-4" />
					{signSubmitting ? 'Signature…' : 'Confirmer et signer'}
				</button>
			</div>
		</div>
	</div>
{/if}
