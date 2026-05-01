<script lang="ts">
	import { enhance } from '$app/forms';
	import { Wrench, Plus, Edit, Trash2, Star, X, Save } from 'lucide-svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';

	export let data;

	let editing: any = null;
	let creating = false;

	function startCreate() {
		creating = true;
		editing = {
			slug: '',
			titleFr: '',
			titleEn: '',
			titleEs: '',
			descriptionFr: '',
			descriptionEn: '',
			descriptionEs: '',
			icon: 'Wrench',
			displayOrder: data.items.length + 1,
			featured: false,
			active: true
		};
	}

	function startEdit(svc: any) {
		creating = false;
		editing = { ...svc };
	}

	function close() {
		editing = null;
		creating = false;
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between flex-wrap gap-4">
		<div>
			<h1 class="text-3xl font-black flex items-center gap-3">
				<Wrench class="w-7 h-7 text-[#febd17]" />
				Services
			</h1>
			<p class="text-gray-500 dark:text-zinc-400 mt-1">{data.items.length} services</p>
		</div>
		<button
			on:click={startCreate}
			class="px-5 py-2.5 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400 flex items-center gap-2 shadow-lg shadow-yellow-500/20"
		>
			<Plus class="w-4 h-4" /> Nouveau service
		</button>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each data.items as s (s.id)}
			<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 space-y-3">
				<div class="flex items-start justify-between">
					<div>
						<div class="flex items-center gap-2 mb-2">
							{#if s.featured}<Star class="w-4 h-4 text-[#febd17] fill-[#febd17]" />{/if}
							{#if !s.active}<Badge variant="default">Inactif</Badge>{/if}
						</div>
						<p class="font-bold">{s.titleFr}</p>
						<p class="text-xs text-gray-500 dark:text-zinc-500 font-mono">/{s.slug}</p>
					</div>
					<div class="flex gap-1">
						<button on:click={() => startEdit(s)} class="p-2 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-500/10 text-gray-600 dark:text-zinc-400 hover:text-[#febd17]" aria-label="Edit">
							<Edit class="w-4 h-4" />
						</button>
						<form method="POST" action="?/delete" use:enhance class="inline">
							<input type="hidden" name="id" value={s.id} />
							<button type="submit" on:click={(e) => !confirm('Supprimer ?') && e.preventDefault()} class="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/10 text-gray-600 dark:text-zinc-400 hover:text-red-500" aria-label="Delete">
								<Trash2 class="w-4 h-4" />
							</button>
						</form>
					</div>
				</div>
				{#if s.descriptionFr}
					<p class="text-sm text-gray-600 dark:text-zinc-400 line-clamp-2">{s.descriptionFr}</p>
				{/if}
				<div class="flex items-center gap-2 text-xs text-gray-400 dark:text-zinc-600">
					<span>Ordre: {s.displayOrder}</span>
					{#if s.icon}<span>· {s.icon}</span>{/if}
				</div>
			</div>
		{/each}
	</div>

	{#if editing}
		<button
			type="button"
			aria-label="Close"
			on:click={close}
			class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
		></button>
		<div class="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
			<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto">
				<form
					method="POST"
					action={creating ? '?/create' : '?/update'}
					use:enhance={() => {
						return async ({ update }) => {
							await update();
							close();
						};
					}}
					class="p-6 space-y-4"
				>
					<div class="flex items-center justify-between">
						<h2 class="text-xl font-bold">{creating ? 'Nouveau service' : 'Modifier service'}</h2>
						<button type="button" on:click={close} class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800" aria-label="Close">
							<X class="w-5 h-5" />
						</button>
					</div>

					{#if !creating}
						<input type="hidden" name="id" value={editing.id} />
					{/if}

					<div class="grid grid-cols-2 gap-3">
						<div class="col-span-2 space-y-2">
							<Label forId="slug">Slug *</Label>
							<Input id="slug" name="slug" bind:value={editing.slug} required disabled={!creating} />
						</div>

						<div class="space-y-2">
							<Label forId="icon">Icône (Lucide)</Label>
							<Input id="icon" name="icon" bind:value={editing.icon} placeholder="Wrench" />
						</div>
						<div class="space-y-2">
							<Label forId="displayOrder">Ordre</Label>
							<Input id="displayOrder" name="displayOrder" type="number" bind:value={editing.displayOrder} />
						</div>
					</div>

					<div class="space-y-2">
						<Label forId="titleFr">Titre FR *</Label>
						<Input id="titleFr" name="titleFr" bind:value={editing.titleFr} required />
					</div>
					<div class="space-y-2">
						<Label forId="descriptionFr">Description FR</Label>
						<Textarea id="descriptionFr" name="descriptionFr" bind:value={editing.descriptionFr} rows={2} />
					</div>

					<div class="space-y-2">
						<Label forId="titleEn">Title EN</Label>
						<Input id="titleEn" name="titleEn" bind:value={editing.titleEn} />
					</div>
					<div class="space-y-2">
						<Label forId="descriptionEn">Description EN</Label>
						<Textarea id="descriptionEn" name="descriptionEn" bind:value={editing.descriptionEn} rows={2} />
					</div>

					<div class="space-y-2">
						<Label forId="titleEs">Título ES</Label>
						<Input id="titleEs" name="titleEs" bind:value={editing.titleEs} />
					</div>
					<div class="space-y-2">
						<Label forId="descriptionEs">Descripción ES</Label>
						<Textarea id="descriptionEs" name="descriptionEs" bind:value={editing.descriptionEs} rows={2} />
					</div>

					<div class="flex gap-4 pt-2">
						<label class="flex items-center gap-2 text-sm cursor-pointer">
							<input type="checkbox" name="featured" bind:checked={editing.featured} value="true" class="w-4 h-4 accent-[#febd17]" />
							Mis en avant
						</label>
						<label class="flex items-center gap-2 text-sm cursor-pointer">
							<input type="checkbox" name="active" bind:checked={editing.active} value="true" class="w-4 h-4 accent-[#febd17]" />
							Actif
						</label>
					</div>

					<div class="flex gap-2 pt-2">
						<button type="button" on:click={close} class="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 font-medium text-sm hover:bg-gray-50 dark:hover:bg-zinc-800">
							Annuler
						</button>
						<button type="submit" class="flex-1 px-4 py-2.5 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400 flex items-center justify-center gap-2">
							<Save class="w-4 h-4" /> Enregistrer
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}
</div>
