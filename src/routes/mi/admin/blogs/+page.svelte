<script lang="ts">
	import { enhance } from '$app/forms';
	import { FileText, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-svelte';
	import { Badge } from '$lib/components/ui/badge';

	export let data;

	function formatDate(d: string | Date | null) {
		if (!d) return '—';
		return new Date(d).toLocaleDateString('fr-CA', { day: '2-digit', month: 'short', year: 'numeric' });
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between flex-wrap gap-4">
		<div>
			<h1 class="text-3xl font-black flex items-center gap-3">
				<FileText class="w-7 h-7 text-[#febd17]" />
				Articles Blog
			</h1>
			<p class="text-gray-500 dark:text-zinc-400 mt-1">{data.items.length} articles</p>
		</div>
		<a
			href="/mi/admin/blogs/new"
			class="px-5 py-2.5 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400 transition-colors flex items-center gap-2 shadow-lg shadow-yellow-500/20"
		>
			<Plus class="w-4 h-4" /> Nouvel article
		</a>
	</div>

	<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
		{#if data.items.length === 0}
			<div class="py-16 text-center">
				<FileText class="w-12 h-12 text-gray-300 dark:text-zinc-700 mx-auto mb-3" />
				<p class="text-gray-500 dark:text-zinc-500 mb-4">Aucun article pour le moment</p>
				<a href="/mi/admin/blogs/new" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400">
					<Plus class="w-4 h-4" /> Créer le premier article
				</a>
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead class="bg-gray-50 dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800">
						<tr>
							<th class="text-left p-4 font-semibold text-gray-600 dark:text-zinc-400">Titre</th>
							<th class="text-left p-4 font-semibold text-gray-600 dark:text-zinc-400 hidden md:table-cell">Statut</th>
							<th class="text-left p-4 font-semibold text-gray-600 dark:text-zinc-400 hidden lg:table-cell">Vues</th>
							<th class="text-left p-4 font-semibold text-gray-600 dark:text-zinc-400 hidden lg:table-cell">Modifié</th>
							<th class="text-right p-4 font-semibold text-gray-600 dark:text-zinc-400">Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each data.items as b (b.id)}
							<tr class="border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-950">
								<td class="p-4">
									<p class="font-bold">{b.titleFr}</p>
									<p class="text-xs text-gray-500 dark:text-zinc-400 font-mono">/{b.slug}</p>
								</td>
								<td class="p-4 hidden md:table-cell">
									{#if b.published}
										<Badge variant="success">Publié</Badge>
									{:else}
										<Badge variant="default">Brouillon</Badge>
									{/if}
								</td>
								<td class="p-4 hidden lg:table-cell text-gray-500 dark:text-zinc-400">{b.views}</td>
								<td class="p-4 hidden lg:table-cell text-gray-500 dark:text-zinc-400 text-xs">{formatDate(b.updatedAt)}</td>
								<td class="p-4 text-right">
									<div class="flex justify-end gap-1">
										<form method="POST" action="?/togglePublish" use:enhance class="inline">
											<input type="hidden" name="id" value={b.id} />
											<input type="hidden" name="published" value={String(b.published)} />
											<button type="submit" class="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-500/10 text-gray-600 dark:text-zinc-400 hover:text-blue-500" aria-label="Toggle">
												{#if b.published}
													<EyeOff class="w-4 h-4" />
												{:else}
													<Eye class="w-4 h-4" />
												{/if}
											</button>
										</form>
										<a href={`/mi/admin/blogs/${b.id}`} class="p-2 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-500/10 text-gray-600 dark:text-zinc-400 hover:text-[#febd17]" aria-label="Modifier">
											<Edit class="w-4 h-4" />
										</a>
										<form method="POST" action="?/delete" use:enhance class="inline">
											<input type="hidden" name="id" value={b.id} />
											<button type="submit" on:click={(e) => !confirm('Supprimer cet article ?') && e.preventDefault()} class="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/10 text-gray-600 dark:text-zinc-400 hover:text-red-500" aria-label="Supprimer">
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
		{/if}
	</div>
</div>
