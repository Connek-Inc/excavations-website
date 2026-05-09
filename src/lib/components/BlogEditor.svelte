<script lang="ts">
	import { enhance } from '$app/forms';
	import { Save, ArrowLeft } from 'lucide-svelte';

	export let blog: {
		id?: number;
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
		category?: string | null;
		published?: boolean | null;
	} = {};

	export let form: any = null;

	type Lang = 'fr' | 'en' | 'es';
	let activeLang: Lang = 'fr';
	let saving = false;

	const langs: { key: Lang; label: string }[] = [
		{ key: 'fr', label: '🇨🇦 Français' },
		{ key: 'en', label: '🇬🇧 English' },
		{ key: 'es', label: '🇪🇸 Español' }
	];

	function autoSlug(s: string) {
		return s
			.toLowerCase()
			.normalize('NFD')
			.replace(/[̀-ͯ]/g, '')
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');
	}

	let slug = blog.slug || '';
	let titleFr = blog.titleFr || '';

	$: if (titleFr && !blog.id && !slug) slug = autoSlug(titleFr);
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
	class="space-y-6 max-w-4xl"
>
	<input type="hidden" name="id" value={blog.id ?? 0} />

	<div class="flex items-center justify-between flex-wrap gap-4">
		<a href="/mi/admin/blogs" class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#febd17]">
			<ArrowLeft class="w-4 h-4" /> Retour
		</a>
		<button type="submit" disabled={saving} class="px-6 py-2.5 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400 flex items-center gap-2 disabled:opacity-60 shadow-lg shadow-yellow-500/20">
			<Save class="w-4 h-4" /> {saving ? 'Enregistrement...' : 'Enregistrer'}
		</button>
	</div>

	{#if form?.success}
		<div class="p-3 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-400 text-sm">
			✓ Article enregistré
		</div>
	{/if}
	{#if form?.error}
		<div class="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400 text-sm">
			{form.error}
		</div>
	{/if}

	<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
		<div>
			<label class="block text-sm font-medium mb-1" for="slug">Slug URL *</label>
			<input id="slug" name="slug" bind:value={slug} required placeholder="mon-article" class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm font-mono focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
			<p class="text-xs text-gray-500 mt-1">URL: /blog/{slug}</p>
		</div>

		<div>
			<label class="block text-sm font-medium mb-1" for="category">Catégorie</label>
			<input id="category" name="category" value={blog.category || ''} placeholder="Drain Français" class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
		</div>

		<div>
			<label class="block text-sm font-medium mb-1" for="coverImage">Image de couverture (URL)</label>
			<input id="coverImage" name="coverImage" value={blog.coverImage || ''} placeholder="https://..." class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
		</div>
	</div>

	<!-- Lang switcher -->
	<div class="flex gap-2 p-1 bg-gray-100 dark:bg-zinc-900 rounded-xl w-fit">
		{#each langs as l}
			<button type="button" on:click={() => (activeLang = l.key)} class="px-4 py-2 rounded-lg text-sm font-medium {activeLang === l.key ? 'bg-white dark:bg-zinc-800 shadow-sm' : 'text-gray-500'}">
				{l.label}
			</button>
		{/each}
	</div>

	<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
		{#if activeLang === 'fr'}
			<div>
				<label class="block text-sm font-medium mb-1" for="titleFr">Titre FR *</label>
				<input id="titleFr" name="titleFr" bind:value={titleFr} required class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
			</div>
			<div>
				<label class="block text-sm font-medium mb-1" for="excerptFr">Extrait FR</label>
				<textarea id="excerptFr" name="excerptFr" rows="2" value={blog.excerptFr || ''} class="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none"></textarea>
			</div>
			<div>
				<label class="block text-sm font-medium mb-1" for="contentFr">Contenu FR (HTML supporté) *</label>
				<textarea id="contentFr" name="contentFr" required rows="20" value={blog.contentFr || ''} class="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm font-mono focus:ring-2 focus:ring-[#febd17] focus:outline-none"></textarea>
			</div>
		{:else if activeLang === 'en'}
			<div>
				<label class="block text-sm font-medium mb-1" for="titleEn">Title EN</label>
				<input id="titleEn" name="titleEn" value={blog.titleEn || ''} class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
			</div>
			<div>
				<label class="block text-sm font-medium mb-1" for="excerptEn">Excerpt EN</label>
				<textarea id="excerptEn" name="excerptEn" rows="2" value={blog.excerptEn || ''} class="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none"></textarea>
			</div>
			<div>
				<label class="block text-sm font-medium mb-1" for="contentEn">Content EN</label>
				<textarea id="contentEn" name="contentEn" rows="20" value={blog.contentEn || ''} class="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm font-mono focus:ring-2 focus:ring-[#febd17] focus:outline-none"></textarea>
			</div>
		{:else}
			<div>
				<label class="block text-sm font-medium mb-1" for="titleEs">Título ES</label>
				<input id="titleEs" name="titleEs" value={blog.titleEs || ''} class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
			</div>
			<div>
				<label class="block text-sm font-medium mb-1" for="excerptEs">Extracto ES</label>
				<textarea id="excerptEs" name="excerptEs" rows="2" value={blog.excerptEs || ''} class="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none"></textarea>
			</div>
			<div>
				<label class="block text-sm font-medium mb-1" for="contentEs">Contenido ES</label>
				<textarea id="contentEs" name="contentEs" rows="20" value={blog.contentEs || ''} class="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm font-mono focus:ring-2 focus:ring-[#febd17] focus:outline-none"></textarea>
			</div>
		{/if}
	</div>

	<!-- SEO -->
	<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
		<h3 class="font-bold">SEO</h3>
		<div>
			<label class="block text-sm font-medium mb-1" for="metaTitle">Meta Title</label>
			<input id="metaTitle" name="metaTitle" value={blog.metaTitle || ''} maxlength="200" class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
		</div>
		<div>
			<label class="block text-sm font-medium mb-1" for="metaDescription">Meta Description (160 car. max)</label>
			<textarea id="metaDescription" name="metaDescription" rows="2" maxlength="500" value={blog.metaDescription || ''} class="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none"></textarea>
		</div>
	</div>

	<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6">
		<label class="flex items-center gap-3 cursor-pointer">
			<input type="checkbox" name="published" checked={blog.published ?? false} class="w-5 h-5 accent-[#febd17]" />
			<div>
				<p class="font-bold">Publier l'article</p>
				<p class="text-xs text-gray-500">Visible sur le site</p>
			</div>
		</label>
	</div>
</form>
