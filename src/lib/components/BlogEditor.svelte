<script lang="ts">
	import { enhance } from '$app/forms';
	import { Save, ArrowLeft, Globe } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';

	export let blog: {
		slug?: string | null;
		titleFr?: string | null;
		titleEn?: string | null;
		titleEs?: string | null;
		excerptFr?: string | null;
		excerptEn?: string | null;
		excerptEs?: string | null;
		contentFr?: string | null;
		contentEn?: string | null;
		contentEs?: string | null;
		coverImage?: string | null;
		metaTitle?: string | null;
		metaDescription?: string | null;
		metaKeywords?: string | null;
		category?: string | null;
		tags?: string[] | null;
		published?: boolean | null;
	} = {};

	export let isNew = false;
	export let form: any = null;

	type Lang = 'fr' | 'en' | 'es';
	type Tab = 'content' | 'seo' | 'settings';
	let activeLang: Lang = 'fr';
	let activeTab: Tab = 'content';

	const tabs: { key: Tab; label: string }[] = [
		{ key: 'content', label: 'Contenu' },
		{ key: 'seo', label: 'SEO' },
		{ key: 'settings', label: 'Paramètres' }
	];
	const langs: { key: Lang; label: string }[] = [
		{ key: 'fr', label: '🇨🇦 Français' },
		{ key: 'en', label: '🇬🇧 English' },
		{ key: 'es', label: '🇪🇸 Español' }
	];
	let saving = false;

	let slug = blog.slug ?? '';
	let titleFr = blog.titleFr ?? '';
	let titleEn = blog.titleEn ?? '';
	let titleEs = blog.titleEs ?? '';
	let excerptFr = blog.excerptFr ?? '';
	let excerptEn = blog.excerptEn ?? '';
	let excerptEs = blog.excerptEs ?? '';
	let contentFr = blog.contentFr ?? '';
	let contentEn = blog.contentEn ?? '';
	let contentEs = blog.contentEs ?? '';
	let coverImage = blog.coverImage ?? '';
	let metaTitle = blog.metaTitle ?? '';
	let metaDescription = blog.metaDescription ?? '';
	let metaKeywords = blog.metaKeywords ?? '';
	let category = blog.category ?? '';
	let tagsStr = (blog.tags ?? []).join(', ');
	let published = blog.published ?? false;

	function autoSlug() {
		if (titleFr && !slug) {
			slug = titleFr
				.toLowerCase()
				.normalize('NFD')
				.replace(/[̀-ͯ]/g, '')
				.replace(/[^a-z0-9\s-]/g, '')
				.replace(/\s+/g, '-')
				.slice(0, 80);
		}
	}
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
		<a href="/mi/admin/blogs" class="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-400 hover:text-[#febd17]">
			<ArrowLeft class="w-4 h-4" /> Retour
		</a>
		<button
			type="submit"
			disabled={saving}
			class="px-6 py-2.5 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400 flex items-center gap-2 disabled:opacity-60 shadow-lg shadow-yellow-500/20"
		>
			<Save class="w-4 h-4" /> {saving ? 'Enregistrement...' : 'Enregistrer'}
		</button>
	</div>

	<h1 class="text-3xl font-black">
		{isNew ? 'Nouvel article' : 'Modifier'} {titleFr ? `— ${titleFr}` : ''}
	</h1>

	{#if form?.error}
		<div class="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400 text-sm">
			{form.error}
		</div>
	{/if}
	{#if form?.success}
		<div class="p-3 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-400 text-sm">
			✓ Article enregistré
		</div>
	{/if}

	<!-- Tabs -->
	<div class="flex gap-2 border-b border-gray-200 dark:border-zinc-800">
		{#each tabs as t}
			<button
				type="button"
				on:click={() => (activeTab = t.key)}
				class="px-4 py-3 text-sm font-medium border-b-2 transition-colors {activeTab === t.key
					? 'border-[#febd17] text-[#febd17]'
					: 'border-transparent text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-300'}"
			>
				{t.label}
			</button>
		{/each}
	</div>

	{#if activeTab === 'content'}
		<!-- Lang switcher -->
		<div class="flex gap-2 p-1 bg-gray-100 dark:bg-zinc-900 rounded-xl w-fit">
			{#each langs as l}
				<button
					type="button"
					on:click={() => (activeLang = l.key)}
					class="px-4 py-2 rounded-lg text-sm font-medium transition-all {activeLang === l.key
						? 'bg-white dark:bg-zinc-800 shadow-sm'
						: 'text-gray-500 dark:text-zinc-400'}"
				>
					{l.label}
				</button>
			{/each}
		</div>

		<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
			{#if activeLang === 'fr'}
				<div class="space-y-2">
					<Label forId="titleFr">Titre (FR) *</Label>
					<Input id="titleFr" name="titleFr" bind:value={titleFr} on:blur={autoSlug} required />
				</div>
				<div class="space-y-2">
					<Label forId="excerptFr">Résumé (FR)</Label>
					<Textarea id="excerptFr" name="excerptFr" bind:value={excerptFr} rows={3} />
				</div>
				<div class="space-y-2">
					<Label forId="contentFr">Contenu HTML (FR) *</Label>
					<Textarea id="contentFr" name="contentFr" bind:value={contentFr} rows={20} required class="font-mono text-xs" />
					<p class="text-xs text-gray-500 dark:text-zinc-500">HTML supporté : &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;strong&gt;...</p>
				</div>
			{:else if activeLang === 'en'}
				<div class="space-y-2">
					<Label forId="titleEn">Title (EN)</Label>
					<Input id="titleEn" name="titleEn" bind:value={titleEn} />
				</div>
				<div class="space-y-2">
					<Label forId="excerptEn">Excerpt (EN)</Label>
					<Textarea id="excerptEn" name="excerptEn" bind:value={excerptEn} rows={3} />
				</div>
				<div class="space-y-2">
					<Label forId="contentEn">Content HTML (EN)</Label>
					<Textarea id="contentEn" name="contentEn" bind:value={contentEn} rows={20} class="font-mono text-xs" />
				</div>
			{:else}
				<div class="space-y-2">
					<Label forId="titleEs">Título (ES)</Label>
					<Input id="titleEs" name="titleEs" bind:value={titleEs} />
				</div>
				<div class="space-y-2">
					<Label forId="excerptEs">Resumen (ES)</Label>
					<Textarea id="excerptEs" name="excerptEs" bind:value={excerptEs} rows={3} />
				</div>
				<div class="space-y-2">
					<Label forId="contentEs">Contenido HTML (ES)</Label>
					<Textarea id="contentEs" name="contentEs" bind:value={contentEs} rows={20} class="font-mono text-xs" />
				</div>
			{/if}
		</div>
	{:else if activeTab === 'seo'}
		<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
			<div class="flex items-center gap-2 mb-2">
				<Globe class="w-5 h-5 text-[#febd17]" />
				<h2 class="font-bold">Optimisation SEO</h2>
			</div>

			<div class="space-y-2">
				<Label forId="metaTitle">Meta Title (60 car. max)</Label>
				<Input id="metaTitle" name="metaTitle" bind:value={metaTitle} maxlength={70} />
				<p class="text-xs text-gray-400">{metaTitle.length}/60 caractères</p>
			</div>

			<div class="space-y-2">
				<Label forId="metaDescription">Meta Description (160 car. max)</Label>
				<Textarea id="metaDescription" name="metaDescription" bind:value={metaDescription} rows={3} maxlength={170} />
				<p class="text-xs text-gray-400">{metaDescription.length}/160 caractères</p>
			</div>

			<div class="space-y-2">
				<Label forId="metaKeywords">Mots-clés (séparés par virgule)</Label>
				<Input id="metaKeywords" name="metaKeywords" bind:value={metaKeywords} placeholder="excavation, drain français, Québec..." />
			</div>
		</div>
	{:else if activeTab === 'settings'}
		<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
			<div class="space-y-2">
				<Label forId="slug">Slug URL *</Label>
				<Input id="slug" name="slug" bind:value={slug} required pattern="[a-z0-9-]+" />
				<p class="text-xs text-gray-500 dark:text-zinc-500">URL : /blog/{slug || '...'}</p>
			</div>

			<div class="space-y-2">
				<Label forId="category">Catégorie</Label>
				<Input id="category" name="category" bind:value={category} placeholder="ex: Drain Français" />
			</div>

			<div class="space-y-2">
				<Label forId="coverImage">Image de couverture (URL)</Label>
				<Input id="coverImage" name="coverImage" bind:value={coverImage} placeholder="https://..." />
			</div>

			<div class="space-y-2">
				<Label forId="tags">Tags (séparés par virgule)</Label>
				<Input id="tags" name="tags" bind:value={tagsStr} placeholder="drainage, fondation, hiver" />
			</div>

			<label class="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-zinc-950 cursor-pointer">
				<input type="checkbox" name="published" bind:checked={published} value="true" class="w-5 h-5 accent-[#febd17]" />
				<div>
					<p class="font-medium text-sm">Publier l'article</p>
					<p class="text-xs text-gray-500 dark:text-zinc-500">Visible sur le site public</p>
				</div>
			</label>
		</div>
	{/if}
</form>
