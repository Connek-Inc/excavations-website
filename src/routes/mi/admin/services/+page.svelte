<script lang="ts">
	import { enhance } from '$app/forms';
	import { Wrench, Plus, Edit, Trash2, X } from 'lucide-svelte';

	export let data;

	let editing: any = null;
	let showForm = false;

	function newService() {
		editing = {
			id: 0, slug: '', titleFr: '', titleEn: '', titleEs: '',
			descriptionFr: '', descriptionEn: '', descriptionEs: '',
			icon: '', priceFromCAD: 0, priceToCAD: 0,
			featured: false, active: true, orderIndex: data.items.length + 1
		};
		showForm = true;
	}

	function edit(s: any) {
		editing = { ...s };
		showForm = true;
	}
</script>

<svelte:head><title>Services — Admin</title></svelte:head>

<div class="space-y-6">
	<div class="flex items-center justify-between flex-wrap gap-4">
		<div>
			<h1 class="text-3xl font-black flex items-center gap-3">
				<Wrench class="w-7 h-7 text-[#febd17]" />
				Services
			</h1>
			<p class="text-gray-500 dark:text-zinc-400 mt-1">{data.items.length} services</p>
		</div>
		<button on:click={newService} class="px-5 py-2.5 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400 flex items-center gap-2">
			<Plus class="w-4 h-4" /> Nouveau
		</button>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each data.items as s (s.id)}
			<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5">
				<div class="flex items-start justify-between mb-3">
					<div class="text-3xl">{s.icon || '🔧'}</div>
					<div class="flex gap-1">
						{#if s.featured}<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">⭐</span>{/if}
						{#if !s.active}<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">Inactif</span>{/if}
					</div>
				</div>
				<h3 class="font-black text-lg mb-1">{s.titleFr}</h3>
				<p class="text-xs text-gray-500 dark:text-zinc-500 font-mono mb-2">/{s.slug}</p>
				<p class="text-sm text-gray-600 dark:text-zinc-400 line-clamp-2 mb-3">{s.descriptionFr}</p>
				{#if s.priceFromCAD}
					<p class="text-sm font-bold text-[#febd17] mb-3">Dès {s.priceFromCAD}$ CAD</p>
				{/if}
				<div class="flex gap-2">
					<button on:click={() => edit(s)} class="flex-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-sm font-medium hover:bg-[#febd17] hover:text-black flex items-center justify-center gap-1.5">
						<Edit class="w-3.5 h-3.5" /> Éditer
					</button>
					<form method="POST" action="?/delete" use:enhance>
						<input type="hidden" name="id" value={s.id} />
						<button type="submit" on:click={(e) => !confirm('Supprimer ?') && e.preventDefault()} class="px-3 py-2 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20">
							<Trash2 class="w-3.5 h-3.5" />
						</button>
					</form>
				</div>
			</div>
		{/each}
	</div>
</div>

{#if showForm && editing}
	<div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto p-4">
		<div class="max-w-3xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl my-8 shadow-2xl">
			<div class="flex items-center justify-between p-5 border-b border-gray-200 dark:border-zinc-800">
				<h2 class="font-black text-xl">{editing.id ? 'Modifier' : 'Nouveau'} service</h2>
				<button on:click={() => (showForm = false)} class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800">
					<X class="w-5 h-5" />
				</button>
			</div>
			<form method="POST" action="?/save" use:enhance={() => async ({ update }) => { await update(); showForm = false; }} class="p-5 space-y-4">
				<input type="hidden" name="id" value={editing.id} />

				<div class="grid grid-cols-2 gap-3">
					<div>
						<label class="block text-sm font-medium mb-1" for="slug">Slug</label>
						<input id="slug" name="slug" bind:value={editing.slug} required placeholder="drain-francais" class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
					</div>
					<div>
						<label class="block text-sm font-medium mb-1" for="icon">Icône (emoji)</label>
						<input id="icon" name="icon" bind:value={editing.icon} placeholder="💧" class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-3">
					<div>
						<label class="block text-sm font-medium mb-1" for="titleFr">Titre FR *</label>
						<input id="titleFr" name="titleFr" bind:value={editing.titleFr} required class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
					</div>
					<div>
						<label class="block text-sm font-medium mb-1" for="titleEn">Title EN</label>
						<input id="titleEn" name="titleEn" bind:value={editing.titleEn} class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
					</div>
					<div>
						<label class="block text-sm font-medium mb-1" for="titleEs">Título ES</label>
						<input id="titleEs" name="titleEs" bind:value={editing.titleEs} class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
					</div>
				</div>

				<div>
					<label class="block text-sm font-medium mb-1" for="descriptionFr">Description FR *</label>
					<textarea id="descriptionFr" name="descriptionFr" bind:value={editing.descriptionFr} required rows="3" class="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none"></textarea>
				</div>
				<div>
					<label class="block text-sm font-medium mb-1" for="descriptionEn">Description EN</label>
					<textarea id="descriptionEn" name="descriptionEn" bind:value={editing.descriptionEn} rows="2" class="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none"></textarea>
				</div>
				<div>
					<label class="block text-sm font-medium mb-1" for="descriptionEs">Descripción ES</label>
					<textarea id="descriptionEs" name="descriptionEs" bind:value={editing.descriptionEs} rows="2" class="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none"></textarea>
				</div>

				<div class="grid grid-cols-3 gap-3">
					<div>
						<label class="block text-sm font-medium mb-1" for="priceFromCAD">Prix dès (CAD)</label>
						<input id="priceFromCAD" type="number" name="priceFromCAD" bind:value={editing.priceFromCAD} class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
					</div>
					<div>
						<label class="block text-sm font-medium mb-1" for="priceToCAD">Prix max (CAD)</label>
						<input id="priceToCAD" type="number" name="priceToCAD" bind:value={editing.priceToCAD} class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
					</div>
					<div>
						<label class="block text-sm font-medium mb-1" for="orderIndex">Ordre</label>
						<input id="orderIndex" type="number" name="orderIndex" bind:value={editing.orderIndex} class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
					</div>
				</div>

				<div class="flex gap-4">
					<label class="flex items-center gap-2 cursor-pointer">
						<input type="checkbox" name="featured" checked={editing.featured} class="w-4 h-4 accent-[#febd17]" />
						<span class="text-sm font-medium">⭐ Featured</span>
					</label>
					<label class="flex items-center gap-2 cursor-pointer">
						<input type="checkbox" name="active" checked={editing.active} class="w-4 h-4 accent-[#febd17]" />
						<span class="text-sm font-medium">Actif (visible sur le site)</span>
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
