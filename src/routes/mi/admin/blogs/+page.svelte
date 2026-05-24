<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { language } from '$lib/store/store';
	import { FileText, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-svelte';
	import { listBlogs, deleteBlog, togglePublish, type Blog } from '$lib/admin/blogs';
	import { getCurrent } from '$lib/admin/clients';

	let items: Blog[] = [];
	let loading = true;

	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';
	$: t = T[lang] || T.fr;

	const T = {
		fr: { title: 'Articles Blog', count: 'articles', newCta: 'Nouvel article', empty: 'Aucun article', createFirst: 'Créer le premier', cols: { title: 'Titre', status: 'Statut', updated: 'Modifié', actions: 'Actions' }, publish: 'Publier', unpublish: 'Dépublier', edit: 'Modifier', del: 'Supprimer', confirmDel: 'Supprimer cet article ?', published: 'Publié', draft: 'Brouillon' },
		en: { title: 'Blog articles', count: 'articles', newCta: 'New article', empty: 'No articles', createFirst: 'Create the first one', cols: { title: 'Title', status: 'Status', updated: 'Updated', actions: 'Actions' }, publish: 'Publish', unpublish: 'Unpublish', edit: 'Edit', del: 'Delete', confirmDel: 'Delete this article?', published: 'Published', draft: 'Draft' },
		es: { title: 'Artículos Blog', count: 'artículos', newCta: 'Nuevo artículo', empty: 'Sin artículos', createFirst: 'Crear el primero', cols: { title: 'Título', status: 'Estado', updated: 'Modificado', actions: 'Acciones' }, publish: 'Publicar', unpublish: 'Despublicar', edit: 'Editar', del: 'Eliminar', confirmDel: '¿Eliminar este artículo?', published: 'Publicado', draft: 'Borrador' }
	};

	onMount(async () => {
		const admin = await getCurrent();
		if (!admin) {
			goto('/mi/admin/login', { replaceState: true });
			return;
		}
		await refresh();
	});

	async function refresh() {
		loading = true;
		items = await listBlogs();
		loading = false;
	}

	function titleFor(b: Blog): string {
		return (lang === 'en' ? b.title_en : lang === 'es' ? b.title_es : null) || b.title_fr;
	}

	function formatDate(d: string | Date | null) {
		if (!d) return '—';
		try {
			return new Date(d).toLocaleDateString(lang === 'en' ? 'en-CA' : lang === 'es' ? 'es-ES' : 'fr-CA', { day: '2-digit', month: 'short', year: 'numeric' });
		} catch {
			return String(d);
		}
	}

	async function handleToggle(b: Blog) {
		const r = await togglePublish(b.id);
		if (r !== null) await refresh();
	}

	async function handleDelete(b: Blog) {
		if (!confirm(t.confirmDel)) return;
		await deleteBlog(b.id);
		await refresh();
	}
</script>

<svelte:head><title>{t.title} — Admin</title><meta name="robots" content="noindex, nofollow" /></svelte:head>

<div class="space-y-6">
	<div class="flex items-center justify-between flex-wrap gap-4">
		<div>
			<h1 class="text-3xl font-black flex items-center gap-3"><FileText class="w-7 h-7 text-[#febd17]" /> {t.title}</h1>
			<p class="text-gray-500 dark:text-zinc-400 mt-1">{items.length} {t.count}</p>
		</div>
		<a href="/mi/admin/blogs/new" class="px-5 py-2.5 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400 flex items-center gap-2">
			<Plus class="w-4 h-4" /> {t.newCta}
		</a>
	</div>

	<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
		{#if loading}
			<div class="py-16 text-center text-gray-400 dark:text-zinc-600 text-sm">…</div>
		{:else if items.length === 0}
			<div class="py-16 text-center">
				<FileText class="w-12 h-12 text-gray-300 dark:text-zinc-700 mx-auto mb-3" />
				<p class="text-gray-500 dark:text-zinc-500 mb-4">{t.empty}</p>
				<a href="/mi/admin/blogs/new" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#febd17] text-black font-bold text-sm">
					<Plus class="w-4 h-4" /> {t.createFirst}
				</a>
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead class="bg-gray-50 dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800">
						<tr>
							<th class="text-left p-4 font-semibold text-gray-600 dark:text-zinc-400">{t.cols.title}</th>
							<th class="text-left p-4 font-semibold text-gray-600 dark:text-zinc-400 hidden md:table-cell">{t.cols.status}</th>
							<th class="text-left p-4 font-semibold text-gray-600 dark:text-zinc-400 hidden lg:table-cell">{t.cols.updated}</th>
							<th class="text-right p-4 font-semibold text-gray-600 dark:text-zinc-400">{t.cols.actions}</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200 dark:divide-zinc-800">
						{#each items as b (b.id)}
							<tr class="hover:bg-gray-50 dark:hover:bg-zinc-800/40">
								<td class="p-4">
									<div class="font-semibold text-gray-900 dark:text-white">{titleFor(b)}</div>
									<div class="text-xs text-gray-400 dark:text-zinc-600 font-mono">/{b.slug}</div>
								</td>
								<td class="p-4 hidden md:table-cell">
									{#if b.published}
										<span class="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
											<Eye class="w-3 h-3" /> {t.published}
										</span>
									{:else}
										<span class="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-zinc-500/15 text-zinc-600 dark:text-zinc-400">
											<EyeOff class="w-3 h-3" /> {t.draft}
										</span>
									{/if}
								</td>
								<td class="p-4 hidden lg:table-cell text-gray-500 dark:text-zinc-500">{formatDate(b.updated_at)}</td>
								<td class="p-4">
									<div class="flex items-center justify-end gap-1">
										<button type="button" on:click={() => handleToggle(b)} title={b.published ? t.unpublish : t.publish} class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-300 hover:text-[#febd17]">
											{#if b.published}<EyeOff class="w-4 h-4" />{:else}<Eye class="w-4 h-4" />{/if}
										</button>
										<a href={`/mi/admin/blogs/${b.id}`} title={t.edit} class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-300 hover:text-[#febd17]">
											<Edit class="w-4 h-4" />
										</a>
										<button type="button" on:click={() => handleDelete(b)} title={t.del} class="p-2 rounded-lg hover:bg-red-500/10 text-gray-700 dark:text-zinc-300 hover:text-red-500">
											<Trash2 class="w-4 h-4" />
										</button>
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
