<script lang="ts">
	import { fmtMoney, statutLabel, statutColor } from '$lib/soumissions/utils';
	import type { SoumissionStatut } from '$lib/soumissions/types';
	import { Search, Filter, FileText, ChevronRight, Eye } from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let q = '';
	let statut: SoumissionStatut | '' = '';

	const statutOptions: { value: SoumissionStatut; label: string }[] = [
		{ value: 'nouvelle', label: 'Nouvelle' },
		{ value: 'en_revision', label: 'En révision' },
		{ value: 'offerte', label: 'Offre envoyée' },
		{ value: 'contre_offre', label: 'Contre-offre' },
		{ value: 'acceptee', label: 'Acceptée' },
		{ value: 'signee_par_les_deux', label: 'Signée' },
		{ value: 'rejetee', label: 'Rejetée' },
		{ value: 'expiree', label: 'Expirée' }
	];

	$: filtered = data.soumissions.filter((s) => {
		if (statut && s.statut !== statut) return false;
		if (q.trim()) {
			const needle = q.trim().toLowerCase();
			const hay = `${s.client_nom || ''} ${s.client_email || ''} ${s.numero || ''}`.toLowerCase();
			if (!hay.includes(needle)) return false;
		}
		return true;
	});

	function fmtDate(s: string) {
		try {
			return new Date(s).toLocaleDateString('fr-CA', {
				day: '2-digit',
				month: 'short',
				year: 'numeric'
			});
		} catch {
			return s;
		}
	}
</script>

<svelte:head><title>Soumissions — Admin</title></svelte:head>

<div class="space-y-6">
	<div>
		<h1 class="text-2xl sm:text-3xl font-black">Soumissions</h1>
		<p class="text-sm text-zinc-500 mt-1">Toutes les demandes et contrats.</p>
	</div>

	<div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 grid sm:grid-cols-3 gap-3">
		<div class="sm:col-span-2 relative">
			<Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
			<input
				type="text"
				bind:value={q}
				placeholder="Rechercher par nom, courriel ou numéro…"
				class="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-lg text-sm text-white placeholder-zinc-600 outline-none transition"
			/>
		</div>
		<div class="relative">
			<Filter class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
			<select
				bind:value={statut}
				class="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-lg text-sm text-white outline-none transition appearance-none"
			>
				<option value="">Tous les statuts</option>
				{#each statutOptions as o}
					<option value={o.value}>{o.label}</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
		{#if filtered.length === 0}
			<div class="p-12 text-center text-zinc-500">
				<FileText class="h-12 w-12 mx-auto mb-3 opacity-40" />
				<p class="text-sm">Aucune soumission ne correspond.</p>
			</div>
		{:else}
			<div class="hidden md:block overflow-x-auto">
				<table class="w-full text-sm">
					<thead class="bg-zinc-950 border-b border-zinc-800 text-zinc-500 text-xs uppercase tracking-wider">
						<tr>
							<th class="text-left px-5 py-3 font-semibold">N°</th>
							<th class="text-left px-5 py-3 font-semibold">Client</th>
							<th class="text-left px-5 py-3 font-semibold">Type</th>
							<th class="text-right px-5 py-3 font-semibold">Total</th>
							<th class="text-left px-5 py-3 font-semibold">Statut</th>
							<th class="text-left px-5 py-3 font-semibold">Date</th>
							<th class="px-5 py-3"></th>
						</tr>
					</thead>
					<tbody class="divide-y divide-zinc-800">
						{#each filtered as s}
							<tr class="hover:bg-zinc-800/40 transition">
								<td class="px-5 py-3 text-zinc-400 font-mono text-xs">
									<a href={`/mi/admin/soumissions/${s.id}`} class="block">
										{s.numero || s.id.slice(0, 8)}
									</a>
								</td>
								<td class="px-5 py-3">
									<a href={`/mi/admin/soumissions/${s.id}`} class="block">
										<div class="text-white font-medium">{s.client_nom}</div>
										<div class="text-xs text-zinc-500">{s.client_email}</div>
									</a>
								</td>
								<td class="px-5 py-3 text-zinc-300">
									<a href={`/mi/admin/soumissions/${s.id}`} class="block">{s.projet_type || '—'}</a>
								</td>
								<td class="px-5 py-3 text-right text-white font-semibold">
									<a href={`/mi/admin/soumissions/${s.id}`} class="block"
										>{fmtMoney(s.total || 0)}</a
									>
								</td>
								<td class="px-5 py-3">
									<a href={`/mi/admin/soumissions/${s.id}`} class="block">
										<span
											class="inline-flex items-center px-2 py-1 rounded text-[10px] font-semibold border {statutColor(
												s.statut
											)}"
										>
											{statutLabel(s.statut)}
										</span>
									</a>
								</td>
								<td class="px-5 py-3 text-zinc-500 text-xs">
									<a href={`/mi/admin/soumissions/${s.id}`} class="block">{fmtDate(s.created_at)}</a
									>
								</td>
								<td class="px-5 py-3">
									<a
										href={`/mi/admin/soumissions/${s.id}`}
										class="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 text-xs font-semibold"
									>
										<Eye class="h-3.5 w-3.5" /> Voir
									</a>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<ul class="md:hidden divide-y divide-zinc-800">
				{#each filtered as s}
					<li>
						<a
							href={`/mi/admin/soumissions/${s.id}`}
							class="flex items-start gap-3 p-4 hover:bg-zinc-800/40 transition"
						>
							<div class="flex-1 min-w-0">
								<div class="flex items-center gap-2 mb-1">
									<span class="font-semibold text-white truncate">{s.client_nom}</span>
									{#if s.numero}
										<span class="text-xs text-zinc-500">· {s.numero}</span>
									{/if}
								</div>
								<div class="text-xs text-zinc-500 truncate mb-2">
									{s.projet_type || '—'} · {fmtDate(s.created_at)}
								</div>
								<div class="flex items-center gap-2">
									<span
										class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border {statutColor(
											s.statut
										)}"
									>
										{statutLabel(s.statut)}
									</span>
									<span class="text-xs font-semibold text-white">{fmtMoney(s.total || 0)}</span>
								</div>
							</div>
							<ChevronRight class="h-4 w-4 text-zinc-600 mt-1 flex-shrink-0" />
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<div class="text-xs text-zinc-500 text-center">
		{filtered.length} résultat{filtered.length !== 1 ? 's' : ''} sur {data.soumissions.length}
	</div>
</div>
