<script lang="ts">
	import { enhance } from '$app/forms';
	import { Settings, Save, Building, Globe, Share2 } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';

	export let data;
	export let form;

	const s = data.settings;
	let saving = false;
	type Tab = 'general' | 'social' | 'seo';
	let activeTab: Tab = 'general';

	const tabs: { key: Tab; label: string; icon: typeof Building }[] = [
		{ key: 'general', label: 'Général', icon: Building },
		{ key: 'social', label: 'Réseaux sociaux', icon: Share2 },
		{ key: 'seo', label: 'SEO global', icon: Globe }
	];
</script>

<form
	method="POST"
	use:enhance={() => {
		saving = true;
		return async ({ update }) => {
			await update();
			saving = false;
		};
	}}
	class="space-y-6"
>
	<div class="flex items-center justify-between flex-wrap gap-4">
		<div>
			<h1 class="text-3xl font-black flex items-center gap-3">
				<Settings class="w-7 h-7 text-[#febd17]" />
				Paramètres
			</h1>
			<p class="text-gray-500 dark:text-zinc-400 mt-1">Configuration globale du site</p>
		</div>
		<button type="submit" disabled={saving} class="px-6 py-2.5 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400 flex items-center gap-2 disabled:opacity-60 shadow-lg shadow-yellow-500/20">
			<Save class="w-4 h-4" /> {saving ? 'Enregistrement...' : 'Enregistrer'}
		</button>
	</div>

	{#if form?.success}
		<div class="p-3 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-400 text-sm">
			✓ Paramètres mis à jour
		</div>
	{/if}

	<div class="flex gap-2 border-b border-gray-200 dark:border-zinc-800">
		{#each tabs as t}
			<button
				type="button"
				on:click={() => (activeTab = t.key)}
				class="px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 {activeTab === t.key
					? 'border-[#febd17] text-[#febd17]'
					: 'border-transparent text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-300'}"
			>
				<svelte:component this={t.icon} class="w-4 h-4" /> {t.label}
			</button>
		{/each}
	</div>

	{#if activeTab === 'general'}
		<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
			<div class="space-y-2">
				<Label forId="site_name">Nom de l'entreprise</Label>
				<Input id="site_name" name="site_name" value={s.site_name?.value ?? 'Mini Excavations Érable'} />
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<Label forId="phone">Téléphone</Label>
					<Input id="phone" name="phone" type="tel" value={s.phone?.value ?? ''} />
				</div>
				<div class="space-y-2">
					<Label forId="email">Courriel</Label>
					<Input id="email" name="email" type="email" value={s.email?.value ?? ''} />
				</div>
			</div>
			<div class="space-y-2">
				<Label forId="address">Adresse</Label>
				<Textarea id="address" name="address" rows={2} value={s.address?.value ?? ''} />
			</div>
		</div>
	{:else if activeTab === 'social'}
		<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
			<div class="space-y-2">
				<Label forId="facebook">Facebook URL</Label>
				<Input id="facebook" name="facebook" type="url" value={s.social?.facebook ?? ''} placeholder="https://facebook.com/..." />
			</div>
			<div class="space-y-2">
				<Label forId="instagram">Instagram URL</Label>
				<Input id="instagram" name="instagram" type="url" value={s.social?.instagram ?? ''} placeholder="https://instagram.com/..." />
			</div>
			<div class="space-y-2">
				<Label forId="linkedin">LinkedIn URL</Label>
				<Input id="linkedin" name="linkedin" type="url" value={s.social?.linkedin ?? ''} placeholder="https://linkedin.com/..." />
			</div>
		</div>
	{:else if activeTab === 'seo'}
		<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
			<p class="text-sm text-gray-500 dark:text-zinc-400">Métadonnées par défaut pour le site (utilisées si pas de meta spécifique)</p>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-3">
				<div class="space-y-2">
					<Label forId="seo_titleFr">Titre FR</Label>
					<Input id="seo_titleFr" name="seo_titleFr" value={s.seo?.titleFr ?? ''} />
				</div>
				<div class="space-y-2">
					<Label forId="seo_titleEn">Title EN</Label>
					<Input id="seo_titleEn" name="seo_titleEn" value={s.seo?.titleEn ?? ''} />
				</div>
				<div class="space-y-2">
					<Label forId="seo_titleEs">Título ES</Label>
					<Input id="seo_titleEs" name="seo_titleEs" value={s.seo?.titleEs ?? ''} />
				</div>
			</div>

			<div class="space-y-2">
				<Label forId="seo_descriptionFr">Description FR</Label>
				<Textarea id="seo_descriptionFr" name="seo_descriptionFr" rows={2} value={s.seo?.descriptionFr ?? ''} />
			</div>
			<div class="space-y-2">
				<Label forId="seo_descriptionEn">Description EN</Label>
				<Textarea id="seo_descriptionEn" name="seo_descriptionEn" rows={2} value={s.seo?.descriptionEn ?? ''} />
			</div>
			<div class="space-y-2">
				<Label forId="seo_descriptionEs">Descripción ES</Label>
				<Textarea id="seo_descriptionEs" name="seo_descriptionEs" rows={2} value={s.seo?.descriptionEs ?? ''} />
			</div>

			<div class="space-y-2">
				<Label forId="seo_keywords">Mots-clés (séparés par virgule)</Label>
				<Textarea id="seo_keywords" name="seo_keywords" rows={2} value={s.seo?.keywords ?? ''} />
			</div>
		</div>
	{/if}
</form>
