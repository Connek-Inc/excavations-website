<script lang="ts">
	import { goto } from '$app/navigation';
	import { Save, ArrowLeft, Trash2, Eye, EyeOff } from 'lucide-svelte';
	import { createBlog, updateBlog, deleteBlog, togglePublish, type Blog } from '$lib/admin/blogs';

	export let blog: Partial<Blog> = {};

	type Lang = 'fr' | 'en' | 'es';
	let activeLang: Lang = 'fr';
	let saving = false;
	let deleting = false;
	let savedAt = '';
	let errorMsg = '';

	const langs: { key: Lang; label: string }[] = [
		{ key: 'fr', label: '🇨🇦 Français' },
		{ key: 'en', label: '🇬🇧 English' },
		{ key: 'es', label: '🇪🇸 Español' }
	];

	let f = {
		id: blog.id,
		slug: blog.slug || '',
		title_fr: blog.title_fr || '',
		title_en: blog.title_en || '',
		title_es: blog.title_es || '',
		excerpt_fr: blog.excerpt_fr || '',
		excerpt_en: blog.excerpt_en || '',
		excerpt_es: blog.excerpt_es || '',
		content_fr: blog.content_fr || '',
		content_en: blog.content_en || '',
		content_es: blog.content_es || '',
		cover_image: blog.cover_image || '',
		meta_title: blog.meta_title || '',
		meta_description: blog.meta_description || '',
		category: blog.category || '',
		published: !!blog.published
	};

	function autoSlug(s: string) {
		return s
			.toLowerCase()
			.normalize('NFD')
			.replace(/[̀-ͯ]/g, '')
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');
	}

	$: if (f.title_fr && !f.id && !f.slug) f.slug = autoSlug(f.title_fr);

	async function save() {
		if (!f.slug || !f.title_fr || !f.content_fr) {
			errorMsg = 'Slug, titre FR et contenu FR sont requis.';
			return;
		}
		saving = true;
		errorMsg = '';
		const payload: Partial<Blog> = {
			slug: f.slug,
			title_fr: f.title_fr,
			title_en: f.title_en || null,
			title_es: f.title_es || null,
			excerpt_fr: f.excerpt_fr || null,
			excerpt_en: f.excerpt_en || null,
			excerpt_es: f.excerpt_es || null,
			content_fr: f.content_fr,
			content_en: f.content_en || null,
			content_es: f.content_es || null,
			cover_image: f.cover_image || null,
			meta_title: f.meta_title || null,
			meta_description: f.meta_description || null,
			category: f.category || null,
			published: f.published ? 1 : 0
		};
		const result = f.id ? await updateBlog(f.id, payload) : await createBlog(payload);
		saving = false;
		if (result) {
			savedAt = new Date().toLocaleTimeString();
			if (!f.id) {
				goto(`/mi/admin/blogs/${result.id}`);
			} else {
				f = { ...f, id: result.id };
			}
		} else {
			errorMsg = "Échec de l'enregistrement.";
		}
	}

	async function remove() {
		if (!f.id) return;
		if (!confirm('Supprimer cet article ?')) return;
		deleting = true;
		const ok = await deleteBlog(f.id);
		deleting = false;
		if (ok) goto('/mi/admin/blogs');
	}

	async function toggle() {
		if (!f.id) return;
		const r = await togglePublish(f.id);
		if (r !== null) f.published = r;
	}
</script>

<div class="space-y-6 max-w-4xl">
	<div class="flex items-center justify-between flex-wrap gap-4">
		<a href="/mi/admin/blogs" class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#febd17]">
			<ArrowLeft class="w-4 h-4" /> Retour
		</a>
		<div class="flex items-center gap-2">
			{#if f.id}
				<button type="button" on:click={toggle} class="px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 text-xs font-semibold inline-flex items-center gap-1.5 text-gray-700 dark:text-zinc-300 hover:text-[#febd17]">
					{#if f.published}<EyeOff class="w-3.5 h-3.5" /> Dépublier{:else}<Eye class="w-3.5 h-3.5" /> Publier{/if}
				</button>
				<button type="button" on:click={remove} disabled={deleting} class="px-3 py-2 rounded-lg border border-red-200 dark:border-red-500/30 text-xs font-semibold inline-flex items-center gap-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 disabled:opacity-60">
					<Trash2 class="w-3.5 h-3.5" /> Supprimer
				</button>
			{/if}
			<button type="button" on:click={save} disabled={saving} class="px-6 py-2.5 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400 flex items-center gap-2 disabled:opacity-60 shadow-lg shadow-yellow-500/20">
				<Save class="w-4 h-4" /> {saving ? 'Enregistrement…' : 'Enregistrer'}
			</button>
		</div>
	</div>

	{#if savedAt}
		<div class="p-3 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-400 text-sm">
			✓ Article enregistré à {savedAt}
		</div>
	{/if}
	{#if errorMsg}
		<div class="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400 text-sm">
			{errorMsg}
		</div>
	{/if}

	<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
		<div>
			<label class="block text-sm font-medium mb-1" for="slug">Slug URL *</label>
			<input id="slug" bind:value={f.slug} required placeholder="mon-article" class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm font-mono focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
			<p class="text-xs text-gray-500 mt-1">URL: /blog/{f.slug}</p>
		</div>

		<div>
			<label class="block text-sm font-medium mb-1" for="category">Catégorie</label>
			<input id="category" bind:value={f.category} placeholder="Drain Français" class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
		</div>

		<div>
			<label class="block text-sm font-medium mb-1" for="coverImage">Image de couverture (URL)</label>
			<input id="coverImage" bind:value={f.cover_image} placeholder="https://..." class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
		</div>
	</div>

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
				<input id="titleFr" bind:value={f.title_fr} required class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
			</div>
			<div>
				<label class="block text-sm font-medium mb-1" for="excerptFr">Extrait FR</label>
				<textarea id="excerptFr" bind:value={f.excerpt_fr} rows="2" class="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none"></textarea>
			</div>
			<div>
				<label class="block text-sm font-medium mb-1" for="contentFr">Contenu FR (HTML supporté) *</label>
				<textarea id="contentFr" bind:value={f.content_fr} required rows="20" class="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm font-mono focus:ring-2 focus:ring-[#febd17] focus:outline-none"></textarea>
			</div>
		{:else if activeLang === 'en'}
			<div>
				<label class="block text-sm font-medium mb-1" for="titleEn">Title EN</label>
				<input id="titleEn" bind:value={f.title_en} class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
			</div>
			<div>
				<label class="block text-sm font-medium mb-1" for="excerptEn">Excerpt EN</label>
				<textarea id="excerptEn" bind:value={f.excerpt_en} rows="2" class="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none"></textarea>
			</div>
			<div>
				<label class="block text-sm font-medium mb-1" for="contentEn">Content EN</label>
				<textarea id="contentEn" bind:value={f.content_en} rows="20" class="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm font-mono focus:ring-2 focus:ring-[#febd17] focus:outline-none"></textarea>
			</div>
		{:else}
			<div>
				<label class="block text-sm font-medium mb-1" for="titleEs">Título ES</label>
				<input id="titleEs" bind:value={f.title_es} class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
			</div>
			<div>
				<label class="block text-sm font-medium mb-1" for="excerptEs">Extracto ES</label>
				<textarea id="excerptEs" bind:value={f.excerpt_es} rows="2" class="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none"></textarea>
			</div>
			<div>
				<label class="block text-sm font-medium mb-1" for="contentEs">Contenido ES</label>
				<textarea id="contentEs" bind:value={f.content_es} rows="20" class="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm font-mono focus:ring-2 focus:ring-[#febd17] focus:outline-none"></textarea>
			</div>
		{/if}
	</div>

	<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
		<h3 class="font-bold">SEO</h3>
		<div>
			<label class="block text-sm font-medium mb-1" for="metaTitle">Meta Title</label>
			<input id="metaTitle" bind:value={f.meta_title} maxlength="200" class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
		</div>
		<div>
			<label class="block text-sm font-medium mb-1" for="metaDescription">Meta Description (160 car. max)</label>
			<textarea id="metaDescription" bind:value={f.meta_description} rows="2" maxlength="500" class="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none"></textarea>
		</div>
	</div>

	<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6">
		<label class="flex items-center gap-3 cursor-pointer">
			<input type="checkbox" bind:checked={f.published} class="w-5 h-5 accent-[#febd17]" />
			<div>
				<p class="font-bold">Publier l'article</p>
				<p class="text-xs text-gray-500">Visible sur le site</p>
			</div>
		</label>
	</div>
</div>
