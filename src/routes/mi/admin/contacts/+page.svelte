<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Search, Filter, Mail, Phone, Trash2, Eye, Users } from 'lucide-svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Input } from '$lib/components/ui/input';
	import { enhance } from '$app/forms';

	export let data;

	let searchValue = data.filters.search;
	let statusValue = data.filters.status;

	function applyFilters() {
		const params = new URLSearchParams();
		if (searchValue) params.set('q', searchValue);
		if (statusValue) params.set('status', statusValue);
		goto(`/mi/admin/contacts?${params.toString()}`);
	}

	function statusBadge(status: string) {
		const map: Record<string, { variant: any; label: string }> = {
			new: { variant: 'warning', label: 'Nouveau' },
			contacted: { variant: 'info', label: 'Contacté' },
			quoted: { variant: 'info', label: 'Devis' },
			won: { variant: 'success', label: 'Gagné' },
			lost: { variant: 'danger', label: 'Perdu' },
			archived: { variant: 'default', label: 'Archivé' }
		};
		return map[status] ?? { variant: 'default', label: status };
	}

	function formatDate(d: string | Date) {
		return new Date(d).toLocaleString('fr-CA', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	$: totalPages = Math.max(1, Math.ceil(data.total / data.pageSize));

	function gotoPage(p: number) {
		const params = new URLSearchParams($page.url.searchParams);
		params.set('page', String(p));
		goto(`/mi/admin/contacts?${params.toString()}`);
	}
</script>

<div class="space-y-6">
	<!-- Header -->
	<div>
		<h1 class="text-3xl font-black flex items-center gap-3">
			<Users class="w-7 h-7 text-[#febd17]" />
			Contacts / Leads
		</h1>
		<p class="text-gray-500 dark:text-zinc-400 mt-1">
			{data.total} contact{data.total !== 1 ? 's' : ''} au total
		</p>
	</div>

	<!-- Filters -->
	<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 flex flex-col md:flex-row gap-3">
		<div class="relative flex-1">
			<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
			<Input
				placeholder="Rechercher par nom, email, téléphone..."
				bind:value={searchValue}
				on:keydown={(e) => e.key === 'Enter' && applyFilters()}
				class="pl-10"
			/>
		</div>
		<select
			bind:value={statusValue}
			on:change={applyFilters}
			class="h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:outline-none focus:ring-2 focus:ring-[#febd17]"
		>
			<option value="">Tous les statuts</option>
			<option value="new">Nouveau</option>
			<option value="contacted">Contacté</option>
			<option value="quoted">Devis envoyé</option>
			<option value="won">Gagné</option>
			<option value="lost">Perdu</option>
			<option value="archived">Archivé</option>
		</select>
		<button
			on:click={applyFilters}
			class="px-6 py-2 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
		>
			<Filter class="w-4 h-4" /> Filtrer
		</button>
	</div>

	<!-- Table -->
	<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
		{#if data.items.length === 0}
			<div class="py-16 text-center">
				<Users class="w-12 h-12 text-gray-300 dark:text-zinc-700 mx-auto mb-3" />
				<p class="text-gray-500 dark:text-zinc-500">Aucun contact trouvé</p>
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead class="bg-gray-50 dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800">
						<tr>
							<th class="text-left p-4 font-semibold text-gray-600 dark:text-zinc-400">Contact</th>
							<th class="text-left p-4 font-semibold text-gray-600 dark:text-zinc-400 hidden md:table-cell">Service</th>
							<th class="text-left p-4 font-semibold text-gray-600 dark:text-zinc-400">Statut</th>
							<th class="text-left p-4 font-semibold text-gray-600 dark:text-zinc-400 hidden lg:table-cell">Date</th>
							<th class="text-right p-4 font-semibold text-gray-600 dark:text-zinc-400">Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each data.items as c (c.id)}
							{@const badge = statusBadge(c.status)}
							<tr class="border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-950 transition-colors">
								<td class="p-4">
									<div class="flex items-center gap-3">
										<div class="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
											{c.name[0]?.toUpperCase()}
										</div>
										<div class="min-w-0">
											<p class="font-bold truncate">{c.name}</p>
											<p class="text-xs text-gray-500 dark:text-zinc-400 truncate flex items-center gap-1">
												<Mail class="w-3 h-3" /> {c.email}
											</p>
											{#if c.phone}
												<p class="text-xs text-gray-500 dark:text-zinc-400 truncate flex items-center gap-1">
													<Phone class="w-3 h-3" /> {c.phone}
												</p>
											{/if}
										</div>
									</div>
								</td>
								<td class="p-4 hidden md:table-cell">
									{#if c.serviceType}
										<Badge variant="outline">{c.serviceType}</Badge>
									{:else}
										<span class="text-gray-400 dark:text-zinc-600 text-xs">—</span>
									{/if}
								</td>
								<td class="p-4">
									<Badge variant={badge.variant}>{badge.label}</Badge>
								</td>
								<td class="p-4 hidden lg:table-cell text-gray-500 dark:text-zinc-400 text-xs">
									{formatDate(c.createdAt)}
								</td>
								<td class="p-4 text-right">
									<div class="flex justify-end gap-1">
										<a
											href={`/mi/admin/contacts/${c.id}`}
											class="p-2 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-500/10 text-gray-600 dark:text-zinc-400 hover:text-[#febd17] transition-colors"
											aria-label="Voir"
										>
											<Eye class="w-4 h-4" />
										</a>
										<form method="POST" action="?/delete" use:enhance>
											<input type="hidden" name="id" value={c.id} />
											<button
												type="submit"
												class="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/10 text-gray-600 dark:text-zinc-400 hover:text-red-500 transition-colors"
												on:click={(e) => !confirm('Supprimer ce contact ?') && e.preventDefault()}
												aria-label="Supprimer"
											>
												<Trash2 class="w-4 h-4" />
											</button>
										</form>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			{#if totalPages > 1}
				<div class="flex justify-between items-center p-4 border-t border-gray-200 dark:border-zinc-800">
					<p class="text-sm text-gray-500 dark:text-zinc-400">
						Page {data.page} sur {totalPages}
					</p>
					<div class="flex gap-2">
						<button
							on:click={() => gotoPage(data.page - 1)}
							disabled={data.page <= 1}
							class="px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 text-sm font-medium disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-zinc-800"
						>
							Précédent
						</button>
						<button
							on:click={() => gotoPage(data.page + 1)}
							disabled={data.page >= totalPages}
							class="px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 text-sm font-medium disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-zinc-800"
						>
							Suivant
						</button>
					</div>
				</div>
			{/if}
		{/if}
	</div>
</div>
