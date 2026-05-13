<script lang="ts">
	import { enhance } from '$app/forms';
	import { Star, Plus, Edit, Trash2, X, BadgeCheck } from 'lucide-svelte';

	export let data: any = {};
	let editing: any = null;
	let showForm = false;

	function newReview() {
		editing = {
			id: 0, authorName: '', authorCity: '', rating: 5,
			textFr: '', textEn: '', textEs: '', serviceType: '',
			verified: true, featured: false
		};
		showForm = true;
	}

	function edit(r: any) {
		editing = { ...r };
		showForm = true;
	}
</script>

<svelte:head><title>Avis Clients — Admin</title></svelte:head>

<div class="space-y-6">
	<div class="flex items-center justify-between flex-wrap gap-4">
		<div>
			<h1 class="text-3xl font-black flex items-center gap-3">
				<Star class="w-7 h-7 text-[#febd17]" />
				Avis Clients
			</h1>
			<p class="text-gray-500 dark:text-zinc-400 mt-1">{data.items.length} avis</p>
		</div>
		<button on:click={newReview} class="px-5 py-2.5 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400 flex items-center gap-2">
			<Plus class="w-4 h-4" /> Nouveau
		</button>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		{#each data.items as r (r.id)}
			<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5">
				<div class="flex items-start justify-between mb-3">
					<div class="flex items-center gap-3">
						<div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#febd17] to-yellow-600 flex items-center justify-center text-black font-black text-sm">
							{r.authorName[0]?.toUpperCase()}
						</div>
						<div>
							<p class="font-bold text-sm flex items-center gap-1">
								{r.authorName}
								{#if r.verified}<BadgeCheck class="w-4 h-4 text-blue-500" />{/if}
							</p>
							{#if r.authorCity}<p class="text-xs text-gray-500">{r.authorCity}</p>{/if}
						</div>
					</div>
					<div class="flex">
						{#each Array(r.rating) as _}<Star class="w-4 h-4 fill-[#febd17] text-[#febd17]" />{/each}
					</div>
				</div>
				<p class="text-sm text-gray-700 dark:text-zinc-300 italic mb-3 line-clamp-3">"{r.textFr}"</p>
				{#if r.featured}<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-yellow-100 text-yellow-700 mb-3">⭐ Mis en avant</span>{/if}
				<div class="flex gap-2">
					<button on:click={() => edit(r)} class="flex-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-sm font-medium hover:bg-[#febd17] hover:text-black flex items-center justify-center gap-1.5">
						<Edit class="w-3.5 h-3.5" /> Éditer
					</button>
					<form method="POST" action="?/delete" use:enhance>
						<input type="hidden" name="id" value={r.id} />
						<button type="submit" on:click={(e) => !confirm('Supprimer ?') && e.preventDefault()} class="px-3 py-2 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20">
							<Trash2 class="w-3.5 h-3.5" />
						</button>
					</form>
				</div>
			</div>
		{/each}
		{#if data.items.length === 0}
			<div class="md:col-span-2 py-16 text-center bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl">
				<Star class="w-12 h-12 text-gray-300 dark:text-zinc-700 mx-auto mb-3" />
				<p class="text-gray-500 dark:text-zinc-500">Aucun avis. Cliquez sur "Nouveau" pour ajouter.</p>
			</div>
		{/if}
	</div>
</div>

{#if showForm && editing}
	<div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto p-4">
		<div class="max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl my-8 shadow-2xl">
			<div class="flex items-center justify-between p-5 border-b border-gray-200 dark:border-zinc-800">
				<h2 class="font-black text-xl">{editing.id ? 'Modifier' : 'Nouvel'} avis</h2>
				<button on:click={() => (showForm = false)} class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800">
					<X class="w-5 h-5" />
				</button>
			</div>
			<form method="POST" action="?/save" use:enhance={() => async ({ update }) => { await update(); showForm = false; }} class="p-5 space-y-4">
				<input type="hidden" name="id" value={editing.id} />

				<div class="grid grid-cols-2 gap-3">
					<div>
						<label class="block text-sm font-medium mb-1" for="authorName">Nom du client *</label>
						<input id="authorName" name="authorName" bind:value={editing.authorName} required class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
					</div>
					<div>
						<label class="block text-sm font-medium mb-1" for="authorCity">Ville</label>
						<input id="authorCity" name="authorCity" bind:value={editing.authorCity} placeholder="Montréal" class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
					</div>
				</div>

				<div class="grid grid-cols-2 gap-3">
					<div>
						<label class="block text-sm font-medium mb-1" for="rating">Note (1-5)</label>
						<input id="rating" type="number" name="rating" bind:value={editing.rating} min="1" max="5" class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
					</div>
					<div>
						<label class="block text-sm font-medium mb-1" for="serviceType">Service concerné</label>
						<input id="serviceType" name="serviceType" bind:value={editing.serviceType} placeholder="Drain français" class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
					</div>
				</div>

				<div>
					<label class="block text-sm font-medium mb-1" for="textFr">Avis FR *</label>
					<textarea id="textFr" name="textFr" bind:value={editing.textFr} required rows="3" class="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none"></textarea>
				</div>
				<div>
					<label class="block text-sm font-medium mb-1" for="textEn">Avis EN</label>
					<textarea id="textEn" name="textEn" bind:value={editing.textEn} rows="2" class="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none"></textarea>
				</div>
				<div>
					<label class="block text-sm font-medium mb-1" for="textEs">Avis ES</label>
					<textarea id="textEs" name="textEs" bind:value={editing.textEs} rows="2" class="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none"></textarea>
				</div>

				<div class="flex gap-4">
					<label class="flex items-center gap-2 cursor-pointer">
						<input type="checkbox" name="verified" checked={editing.verified} class="w-4 h-4 accent-[#febd17]" />
						<span class="text-sm font-medium">✓ Vérifié</span>
					</label>
					<label class="flex items-center gap-2 cursor-pointer">
						<input type="checkbox" name="featured" checked={editing.featured} class="w-4 h-4 accent-[#febd17]" />
						<span class="text-sm font-medium">⭐ Mis en avant</span>
					</label>
				</div>

				<div class="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-zinc-800">
					<button type="button" on:click={() => (showForm = false)} class="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 font-medium text-sm hover:bg-gray-50 dark:hover:bg-zinc-800">
						Annuler
					</button>
					<button type="submit" class="px-5 py-2.5 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400">
						Enregistrer
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
