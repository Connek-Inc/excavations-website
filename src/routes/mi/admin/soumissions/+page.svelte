<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { Search, Filter, Plus, Trash2, Eye, FileSignature, ExternalLink } from 'lucide-svelte';
	import { STATUT_COLORS } from '$lib/soumission/statut';
	import { fmtMoney } from '$lib/soumission/company';

	export let data;

	let searchValue = data.filters.search;
	let statutValue = data.filters.statut;

	function applyFilters() {
		const params = new URLSearchParams();
		if (searchValue) params.set('q', searchValue);
		if (statutValue) params.set('statut', statutValue);
		goto(`/mi/admin/soumissions?${params.toString()}`);
	}

	function formatDate(d: Date | string | null) {
		if (!d) return '—';
		return new Date(d).toLocaleString('fr-CA', {
			day: '2-digit',
			month: 'short',
			year: 'numeric'
		});
	}

	$: totalPages = Math.max(1, Math.ceil(data.total / data.pageSize));

	function gotoPage(p: number) {
		const params = new URLSearchParams($page.url.searchParams);
		params.set('page', String(p));
		goto(`/mi/admin/soumissions?${params.toString()}`);
	}
</script>

<svelte:head><title>Soumissions — Admin</title></svelte:head>

<div class="space-y-6">
	<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
		<div>
			<h1 class="text-3xl font-black flex items-center gap-3">
				<FileSignature class="w-7 h-7 text-[#febd17]" />
				Soumissions / Contrats
			</h1>
			<p class="text-gray-500 dark:text-zinc-400 mt-1">
				{data.total} soumission{data.total !== 1 ? 's' : ''}
			</p>
		</div>
		<a
			href="/mi/admin/soumissions/new"
			class="px-4 py-2.5 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400 inline-flex items-center gap-2 self-start"
		>
			<Plus class="w-4 h-4" /> Nouvelle soumission
		</a>
	</div>

	<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 flex flex-col md:flex-row gap-3">
		<div class="relative flex-1">
			<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
			<input
				type="text"
				placeholder="Client, numéro, adresse..."
				bind:value={searchValue}
				on:keydown={(e) => e.key === 'Enter' && applyFilters()}
				class="w-full pl-10 h-11 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#febd17]"
			/>
		</div>
		<select
			bind:value={statutValue}
			on:change={applyFilters}
			class="h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:outline-none focus:ring-2 focus:ring-[#febd17]"
		>
			<option value="">Tous les statuts</option>
			<option value="Brouillon">Brouillon</option>
			<option value="Envoyée">Envoyée</option>
			<option value="Acceptée">Acceptée</option>
			<option value="Signée">Signée</option>
		</select>
		<button
			on:click={applyFilters}
			class="px-6 py-2 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400 flex items-center justify-center gap-2"
		>
			<Filter class="w-4 h-4" /> Filtrer
		</button>
	</div>

	<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
		{#if data.items.length === 0}
			<div class="p-12 text-center text-gray-400 dark:text-zinc-600">
				<FileSignature class="w-12 h-12 mx-auto mb-3 opacity-50" />
				<p>Aucune soumission</p>
				<a href="/mi/admin/soumissions/new" class="mt-3 inline-block text-[#febd17] hover:underline font-medium">
					Créer la première
				</a>
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead class="bg-gray-50 dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800">
						<tr class="text-left text-xs uppercase font-bold text-gray-500 dark:text-zinc-400">
							<th class="px-4 py-3">N°</th>
							<th class="px-4 py-3">Client</th>
							<th class="px-4 py-3">Adresse projet</th>
							<th class="px-4 py-3">Statut</th>
							<th class="px-4 py-3 text-right">Sous-total</th>
							<th class="px-4 py-3">Date</th>
							<th class="px-4 py-3 text-right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each data.items as item}
							<tr class="border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900/50">
								<td class="px-4 py-3 font-mono text-xs">{item.numero || `#${item.id}`}</td>
								<td class="px-4 py-3 font-medium">{item.clientNom || '—'}</td>
								<td class="px-4 py-3 text-gray-600 dark:text-zinc-400 truncate max-w-[200px]">
									{item.projetAdresse || '—'}
								</td>
								<td class="px-4 py-3">
									<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold {STATUT_COLORS[item.statut]}">
										{item.statut}
									</span>
								</td>
								<td class="px-4 py-3 text-right font-semibold">
									{fmtMoney(Number(item.sousTotal))}
								</td>
								<td class="px-4 py-3 text-xs text-gray-500 dark:text-zinc-400">
									{formatDate(item.dateSoumission)}
								</td>
								<td class="px-4 py-3 text-right">
									<div class="inline-flex items-center gap-1">
										<a
											href={`/soumission/${item.token}`}
											target="_blank"
											rel="noopener"
											class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-zinc-800"
											title="Voir la page client"
										>
											<ExternalLink class="w-4 h-4" />
										</a>
										<a
											href={`/mi/admin/soumissions/${item.id}`}
											class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-zinc-800"
											title="Modifier"
										>
											<Eye class="w-4 h-4" />
										</a>
										<form
											method="POST"
											action="?/delete"
											use:enhance
											on:submit={(e) => {
												if (!confirm('Supprimer cette soumission ?')) e.preventDefault();
											}}
										>
											<input type="hidden" name="id" value={item.id} />
											<button
												type="submit"
												class="p-1.5 rounded hover:bg-red-100 dark:hover:bg-red-500/20"
												title="Supprimer"
											>
												<Trash2 class="w-4 h-4 text-red-500" />
											</button>
										</form>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}

		{#if totalPages > 1}
			<div class="flex items-center justify-between border-t border-gray-200 dark:border-zinc-800 px-4 py-3">
				<span class="text-xs text-gray-500 dark:text-zinc-400">
					Page {data.page} / {totalPages}
				</span>
				<div class="flex gap-1">
					{#each Array(totalPages) as _, i}
						<button
							on:click={() => gotoPage(i + 1)}
							class="w-8 h-8 rounded text-sm {data.page === i + 1
								? 'bg-[#febd17] text-black font-bold'
								: 'hover:bg-gray-100 dark:hover:bg-zinc-800'}"
						>
							{i + 1}
						</button>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
