<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Plus, Trash2 } from 'lucide-svelte';
	import {
		calcTotals,
		fmtMoney,
		articleTotal,
		articlesSubtotal
	} from '$lib/soumission/company';
	import { SECTION_ORDER, DEFAULT_SECTIONS } from '$lib/soumission/default-sections';
	import type {
		Modalite,
		Article,
		SectionKey,
		SoumissionFormState
	} from '$lib/soumission/types';

	export let state: SoumissionFormState;

	$: hasArticles = (state.articles?.length ?? 0) > 0;
	$: computedSousTotal = articlesSubtotal(state.articles);
	$: sousTotal = hasArticles ? computedSousTotal : Number(state.sousTotal) || 0;
	$: totals = calcTotals(sousTotal);
	$: totalPct = state.modalites.reduce((a, m) => a + (Number(m.pourcentage) || 0), 0);

	function setModalite(i: number, patch: Partial<Modalite>) {
		state.modalites = state.modalites.map((m, j) => (j === i ? { ...m, ...patch } : m));
	}
	function addModalite() {
		state.modalites = [...state.modalites, { label: '', pourcentage: 0 }];
	}
	function removeModalite(i: number) {
		state.modalites = state.modalites.filter((_, j) => j !== i);
	}
	function setModaliteLabel(i: number, e: Event) {
		setModalite(i, { label: (e.target as HTMLInputElement).value });
	}
	function setModalitePct(i: number, e: Event) {
		setModalite(i, { pourcentage: Number((e.target as HTMLInputElement).value) || 0 });
	}

	function setArticle(i: number, patch: Partial<Article>) {
		state.articles = state.articles.map((a, j) => (j === i ? { ...a, ...patch } : a));
		if (state.articles.length > 0) state.sousTotal = articlesSubtotal(state.articles);
	}
	function addArticle() {
		state.articles = [...state.articles, { description: '', quantite: 1, prix_unitaire: 0 }];
	}
	function removeArticle(i: number) {
		state.articles = state.articles.filter((_, j) => j !== i);
		if (state.articles.length > 0) state.sousTotal = articlesSubtotal(state.articles);
	}
	function setArticleDescription(i: number, e: Event) {
		setArticle(i, { description: (e.target as HTMLTextAreaElement).value });
	}
	function setArticleQuantite(i: number, e: Event) {
		setArticle(i, { quantite: Number((e.target as HTMLInputElement).value) || 0 });
	}
	function setArticlePrix(i: number, e: Event) {
		setArticle(i, { prix_unitaire: Number((e.target as HTMLInputElement).value) || 0 });
	}

	function setSousTotal(e: Event) {
		state.sousTotal = Number((e.target as HTMLInputElement).value) || 0;
	}

	function setSection(k: SectionKey, e: Event) {
		const v = (e.target as HTMLTextAreaElement).value;
		state.sections = { ...state.sections, [k]: v };
	}
	function resetSection(k: SectionKey) {
		const next = { ...state.sections };
		delete next[k];
		state.sections = next;
	}

	function sectionValue(k: SectionKey) {
		const v = state.sections?.[k];
		return v && v.length > 0 ? v : DEFAULT_SECTIONS[k];
	}
	function isCustom(k: SectionKey) {
		const v = state.sections?.[k];
		return typeof v === 'string' && v.length > 0;
	}
</script>

<div class="space-y-6">
	<Card>
		<CardHeader><CardTitle>1. Client & projet</CardTitle></CardHeader>
		<CardContent>
			<div class="grid gap-4 md:grid-cols-2">
				<div class="space-y-2 md:col-span-2">
					<Label>Nom du client / compagnie *</Label>
					<Input bind:value={state.clientNom} />
				</div>
				<div class="space-y-2">
					<Label>Adresse du client *</Label>
					<Textarea rows={2} bind:value={state.clientAdresse} />
				</div>
				<div class="space-y-2">
					<Label>Adresse du projet *</Label>
					<Textarea rows={2} bind:value={state.projetAdresse} />
				</div>
				<div class="space-y-2">
					<Label>Courriel client</Label>
					<Input type="email" bind:value={state.clientEmail} placeholder="client@exemple.ca" />
				</div>
				<div class="space-y-2">
					<Label>Téléphone client</Label>
					<Input type="tel" bind:value={state.clientPhone} placeholder="514-555-1234" />
				</div>
				<div class="space-y-2">
					<Label>Date de la soumission *</Label>
					<Input type="date" bind:value={state.dateSoumission} />
				</div>
				<div class="space-y-2">
					<Label>Numéro (optionnel)</Label>
					<Input bind:value={state.numero} placeholder="ex: 2026-001" />
				</div>
			</div>
		</CardContent>
	</Card>

	<Card>
		<CardHeader><CardTitle>2. Notes internes (optionnel)</CardTitle></CardHeader>
		<CardContent>
			<Textarea
				rows={3}
				bind:value={state.notes}
				placeholder="Notes affichées en bas du PDF si remplies."
			/>
		</CardContent>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>
				<div class="flex items-center justify-between">
					<span>3. Articles / Propriétés</span>
					<span class="text-sm font-normal text-gray-500 dark:text-zinc-400">
						{hasArticles ? `${state.articles.length} article(s)` : 'Optionnel — multi-propriétés'}
					</span>
				</div>
			</CardTitle>
		</CardHeader>
		<CardContent>
			<div class="space-y-3">
				<p class="text-xs text-gray-500 dark:text-zinc-400">
					Ajoutez un ou plusieurs articles (ex. drains français pour plusieurs propriétés). Si
					vide, le sous-total se saisit manuellement plus bas.
				</p>
				{#each state.articles as a, i (i)}
					<div class="grid grid-cols-12 items-start gap-2 rounded-md border border-gray-200 dark:border-zinc-800 p-2">
						<div class="col-span-12 space-y-1 md:col-span-6">
							<Label class="text-xs">Description / Adresse</Label>
							<Textarea
								rows={2}
								value={a.description}
								on:input={(e) => setArticleDescription(i, e)}
								placeholder="ex: Drain français — 123 rue Principale"
							/>
						</div>
						<div class="col-span-4 space-y-1 md:col-span-2">
							<Label class="text-xs">Quantité</Label>
							<Input
								type="number"
								value={a.quantite || ''}
								on:input={(e) => setArticleQuantite(i, e)}
							/>
						</div>
						<div class="col-span-6 space-y-1 md:col-span-3">
							<Label class="text-xs">Prix unitaire (CAD)</Label>
							<Input
								type="number"
								value={a.prix_unitaire || ''}
								on:input={(e) => setArticlePrix(i, e)}
							/>
						</div>
						<div class="col-span-2 flex flex-col items-end justify-end md:col-span-1">
							<Button
								variant="ghost"
								size="icon"
								on:click={() => removeArticle(i)}
								aria-label="Supprimer"
							>
								<Trash2 class="h-4 w-4 text-red-500" />
							</Button>
						</div>
						<div class="col-span-12 text-right text-xs text-gray-500 dark:text-zinc-400">
							Sous-total ligne : <strong>{fmtMoney(articleTotal(a))}</strong>
						</div>
					</div>
				{/each}
				<Button variant="outline" size="sm" on:click={addArticle}>
					<Plus class="mr-2 h-4 w-4" />Ajouter un article
				</Button>
			</div>
		</CardContent>
	</Card>

	<Card>
		<CardHeader><CardTitle>4. Prix</CardTitle></CardHeader>
		<CardContent>
			<div class="grid gap-4 md:grid-cols-2">
				<div class="space-y-2">
					<Label>Sous-total avant taxes (CAD) *</Label>
					<Input
						type="number"
						disabled={hasArticles}
						value={hasArticles ? computedSousTotal : state.sousTotal || ''}
						on:input={setSousTotal}
					/>
					{#if hasArticles}
						<p class="text-xs text-gray-500 dark:text-zinc-400">
							Calculé automatiquement à partir des articles.
						</p>
					{/if}
				</div>
				<div class="rounded-md border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/40 p-4 text-sm">
					<div class="flex justify-between"><span>Sous-total</span><span>{fmtMoney(totals.sousTotal)}</span></div>
					<div class="flex justify-between text-gray-500 dark:text-zinc-400"><span>TPS 5 %</span><span>{fmtMoney(totals.tps)}</span></div>
					<div class="flex justify-between text-gray-500 dark:text-zinc-400"><span>TVQ 9,975 %</span><span>{fmtMoney(totals.tvq)}</span></div>
					<div class="mt-2 flex justify-between border-t border-gray-200 dark:border-zinc-800 pt-2 font-bold"><span>Total</span><span>{fmtMoney(totals.total)}</span></div>
				</div>
			</div>
		</CardContent>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>
				<div class="flex items-center justify-between">
					<span>5. Modalités de paiement</span>
					<span
						class="text-sm font-normal {totalPct === 100
							? 'text-gray-500 dark:text-zinc-400'
							: 'text-red-600 dark:text-red-400'}"
					>
						Total : {totalPct} %
					</span>
				</div>
			</CardTitle>
		</CardHeader>
		<CardContent>
			<div class="space-y-3">
				{#each state.modalites as m, i (i)}
					<div class="grid grid-cols-12 items-center gap-2">
						<div class="col-span-8">
							<Input
								placeholder="Description"
								value={m.label}
								on:input={(e) => setModaliteLabel(i, e)}
							/>
						</div>
						<div class="col-span-3 flex items-center gap-1">
							<Input
								type="number"
								value={m.pourcentage}
								on:input={(e) => setModalitePct(i, e)}
							/>
							<span class="text-sm text-gray-500 dark:text-zinc-400">%</span>
						</div>
						<div class="col-span-1">
							<Button variant="ghost" size="icon" on:click={() => removeModalite(i)}>
								<Trash2 class="h-4 w-4 text-red-500" />
							</Button>
						</div>
					</div>
				{/each}
				<Button variant="outline" size="sm" on:click={addModalite}>
					<Plus class="mr-2 h-4 w-4" />Ajouter une modalité
				</Button>
			</div>
		</CardContent>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>
				<div class="flex items-center justify-between gap-2">
					<span>6. Contenu du contrat — sections éditables</span>
					<span class="text-sm font-normal text-gray-500 dark:text-zinc-400">
						Toutes pré-remplies
					</span>
				</div>
			</CardTitle>
		</CardHeader>
		<CardContent>
			<p class="mb-3 text-xs text-gray-500 dark:text-zinc-400">
				Chaque section est pré-remplie avec un texte standard. Modifiez ce que vous voulez : votre
				version remplacera le texte par défaut dans le PDF. Cliquez « Réinitialiser » pour revenir
				au texte standard.
			</p>
			<div class="space-y-2">
				{#each SECTION_ORDER as s (s.key)}
					{@const isPrimary = s.key === 'travaux' || s.key === 'prix'}
					{@const value = sectionValue(s.key)}
					{@const custom = isCustom(s.key)}
					{@const rows = isPrimary ? Math.min(20, Math.max(10, value.split('\n').length + 2)) : Math.min(8, Math.max(3, value.split('\n').length))}
					<details class="rounded-md border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 group">
						<summary class="cursor-pointer list-none px-3 py-2 flex items-center justify-between gap-2 hover:bg-gray-50 dark:hover:bg-zinc-900">
							<span class="flex items-center gap-2 flex-wrap">
								<span class="font-mono text-xs text-gray-500 dark:text-zinc-400">{s.num}</span>
								<span class={isPrimary ? 'font-bold text-[#febd17]' : 'font-semibold'}>
									{s.title}
								</span>
								{#if isPrimary}
									<span class="rounded bg-[#febd17] px-1.5 py-0.5 text-[10px] font-bold uppercase text-black">
										Principal
									</span>
								{/if}
								{#if custom}
									<span class="rounded bg-yellow-100 dark:bg-yellow-500/15 px-1.5 py-0.5 text-[10px] font-medium uppercase text-yellow-700 dark:text-yellow-400">
										Modifié
									</span>
								{/if}
							</span>
							<span class="text-xs text-gray-400 group-open:rotate-90 transition-transform">▶</span>
						</summary>
						<div class="px-3 pb-3 pt-1">
							<Textarea
								{rows}
								{value}
								on:input={(e) => setSection(s.key, e)}
								class={isPrimary ? 'text-sm' : 'font-mono text-xs'}
							/>
							<div class="mt-2 flex justify-end">
								<Button
									type="button"
									variant="ghost"
									size="sm"
									disabled={!custom}
									on:click={() => resetSection(s.key)}
								>
									Réinitialiser
								</Button>
							</div>
						</div>
					</details>
				{/each}
			</div>
		</CardContent>
	</Card>
</div>
