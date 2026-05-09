<script lang="ts">
	import { enhance } from '$app/forms';
	import { Settings, Save } from 'lucide-svelte';

	export let data;
	export let form;

	const s = data.settings;
	let saving = false;

	const fields = [
		{ key: 'site_name', label: "Nom de l'entreprise", type: 'text' },
		{ key: 'phone', label: 'Téléphone', type: 'tel' },
		{ key: 'email', label: 'Courriel', type: 'email' },
		{ key: 'rbq_license', label: 'Licence R.B.Q.', type: 'text' },
		{ key: 'address', label: 'Adresse', type: 'text' },
		{ key: 'instagram', label: 'Instagram URL', type: 'url' },
		{ key: 'facebook', label: 'Facebook URL', type: 'url' }
	];
</script>

<svelte:head><title>Paramètres — Admin</title></svelte:head>

<form method="POST" use:enhance={() => { saving = true; return async ({ update }) => { await update(); saving = false; }; }} class="space-y-6 max-w-3xl">
	<div class="flex items-center justify-between flex-wrap gap-4">
		<div>
			<h1 class="text-3xl font-black flex items-center gap-3">
				<Settings class="w-7 h-7 text-[#febd17]" />
				Paramètres
			</h1>
			<p class="text-gray-500 dark:text-zinc-400 mt-1">Configuration globale du site</p>
		</div>
		<button type="submit" disabled={saving} class="px-6 py-2.5 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400 flex items-center gap-2 disabled:opacity-60">
			<Save class="w-4 h-4" /> {saving ? 'Enregistrement...' : 'Enregistrer'}
		</button>
	</div>

	{#if form?.success}
		<div class="p-3 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-400 text-sm">
			✓ Paramètres mis à jour
		</div>
	{/if}

	<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
		{#each fields as f}
			<div>
				<label for={f.key} class="block text-sm font-medium mb-1">{f.label}</label>
				{#if f.type === 'email'}
					<input id={f.key} name={f.key} type="email" value={s[f.key] ?? ''} class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
				{:else if f.type === 'tel'}
					<input id={f.key} name={f.key} type="tel" value={s[f.key] ?? ''} class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
				{:else if f.type === 'url'}
					<input id={f.key} name={f.key} type="url" value={s[f.key] ?? ''} class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
				{:else}
					<input id={f.key} name={f.key} type="text" value={s[f.key] ?? ''} class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
				{/if}
			</div>
		{/each}
	</div>
</form>
