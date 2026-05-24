<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { language } from '$lib/store/store';
	import { Wrench, Plus, Edit, Trash2, X, Star } from 'lucide-svelte';
	import {
		listServices,
		createService,
		updateService,
		deleteService,
		type Service
	} from '$lib/admin/services';
	import { getCurrent } from '$lib/admin/clients';

	let items: Service[] = [];
	let loading = true;
	let editing: Partial<Service> | null = null;
	let showForm = false;
	let saving = false;

	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';
	$: t = T[lang] || T.fr;

	const T = {
		fr: { title: 'Services', count: 'services', newCta: 'Nouveau', edit: 'Modifier', del: 'Supprimer', confirmDel: 'Supprimer ce service ?', inactive: 'Inactif', save: 'Enregistrer', saving: 'Enregistrement…', cancel: 'Annuler', empty: 'Aucun service.', fSlug: 'Slug (URL)', fIcon: 'Emoji icône', fTitleFr: 'Titre FR *', fTitleEn: 'Titre EN', fTitleEs: 'Titre ES', fDescFr: 'Description FR *', fDescEn: 'Description EN', fDescEs: 'Description ES', fPriceFrom: 'Prix de (CAD)', fPriceTo: 'Prix à (CAD)', fOrder: 'Ordre', fFeatured: 'Mis en avant', fActive: 'Actif' },
		en: { title: 'Services', count: 'services', newCta: 'New', edit: 'Edit', del: 'Delete', confirmDel: 'Delete this service?', inactive: 'Inactive', save: 'Save', saving: 'Saving…', cancel: 'Cancel', empty: 'No services.', fSlug: 'Slug (URL)', fIcon: 'Icon emoji', fTitleFr: 'Title FR *', fTitleEn: 'Title EN', fTitleEs: 'Title ES', fDescFr: 'Description FR *', fDescEn: 'Description EN', fDescEs: 'Description ES', fPriceFrom: 'Price from (CAD)', fPriceTo: 'Price to (CAD)', fOrder: 'Order', fFeatured: 'Featured', fActive: 'Active' },
		es: { title: 'Servicios', count: 'servicios', newCta: 'Nuevo', edit: 'Editar', del: 'Eliminar', confirmDel: '¿Eliminar este servicio?', inactive: 'Inactivo', save: 'Guardar', saving: 'Guardando…', cancel: 'Cancelar', empty: 'Sin servicios.', fSlug: 'Slug (URL)', fIcon: 'Emoji icono', fTitleFr: 'Título FR *', fTitleEn: 'Título EN', fTitleEs: 'Título ES', fDescFr: 'Descripción FR *', fDescEn: 'Descripción EN', fDescEs: 'Descripción ES', fPriceFrom: 'Precio desde (CAD)', fPriceTo: 'Precio hasta (CAD)', fOrder: 'Orden', fFeatured: 'Destacado', fActive: 'Activo' }
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
		items = await listServices();
		loading = false;
	}

	function newOne() {
		editing = {
			slug: '', title_fr: '', title_en: '', title_es: '',
			description_fr: '', description_en: '', description_es: '',
			icon: '', price_from_cad: null, price_to_cad: null,
			featured: 0, active: 1, order_index: items.length + 1
		};
		showForm = true;
	}

	function edit(s: Service) {
		editing = { ...s };
		showForm = true;
	}

	async function save() {
		if (!editing || !editing.slug || !editing.title_fr || !editing.description_fr) return;
		saving = true;
		const payload = {
			...editing,
			featured: editing.featured ? 1 : 0,
			active: editing.active === 0 ? 0 : 1,
			price_from_cad: editing.price_from_cad ? Number(editing.price_from_cad) : null,
			price_to_cad: editing.price_to_cad ? Number(editing.price_to_cad) : null,
			order_index: editing.order_index ? Number(editing.order_index) : 0
		} as Partial<Service>;
		const result = editing.id ? await updateService(editing.id, payload) : await createService(payload);
		saving = false;
		if (result) {
			showForm = false;
			editing = null;
			await refresh();
		}
	}

	async function handleDelete(s: Service) {
		if (!confirm(t.confirmDel)) return;
		await deleteService(s.id);
		await refresh();
	}

	function titleFor(s: Service): string {
		return (lang === 'en' ? s.title_en : lang === 'es' ? s.title_es : null) || s.title_fr;
	}

	function descFor(s: Service): string {
		return (lang === 'en' ? s.description_en : lang === 'es' ? s.description_es : null) || s.description_fr;
	}
</script>

<svelte:head><title>{t.title} — Admin</title><meta name="robots" content="noindex, nofollow" /></svelte:head>

<div class="space-y-6">
	<div class="flex items-center justify-between flex-wrap gap-4">
		<div>
			<h1 class="text-3xl font-black flex items-center gap-3"><Wrench class="w-7 h-7 text-[#febd17]" /> {t.title}</h1>
			<p class="text-gray-500 dark:text-zinc-400 mt-1">{items.length} {t.count}</p>
		</div>
		<button type="button" on:click={newOne} class="px-5 py-2.5 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400 flex items-center gap-2">
			<Plus class="w-4 h-4" /> {t.newCta}
		</button>
	</div>

	{#if loading}
		<p class="text-sm text-gray-400 dark:text-zinc-600">…</p>
	{:else if items.length === 0}
		<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-10 text-center text-gray-500 dark:text-zinc-500">{t.empty}</div>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each items as s (s.id)}
				<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5">
					<div class="flex items-start justify-between mb-3">
						<div class="text-3xl">{s.icon || '🔧'}</div>
						<div class="flex gap-1">
							{#if s.featured}<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-500/15 text-yellow-700 dark:text-yellow-300 inline-flex items-center gap-1"><Star class="w-2.5 h-2.5" /></span>{/if}
							{#if !s.active}<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500/15 text-zinc-700 dark:text-zinc-300">{t.inactive}</span>{/if}
						</div>
					</div>
					<h3 class="font-bold mb-1 text-gray-900 dark:text-white">{titleFor(s)}</h3>
					<p class="text-xs text-gray-400 dark:text-zinc-600 font-mono mb-2">/{s.slug}</p>
					<p class="text-sm text-gray-600 dark:text-zinc-400 line-clamp-3">{descFor(s)}</p>
					{#if s.price_from_cad}
						<p class="text-xs text-gray-500 dark:text-zinc-500 mt-3">{s.price_from_cad}$ {s.price_to_cad ? ` – ${s.price_to_cad}$` : '+'}</p>
					{/if}
					<div class="flex items-center justify-end gap-1 mt-3">
						<button type="button" on:click={() => edit(s)} title={t.edit} class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:text-[#febd17]"><Edit class="w-4 h-4" /></button>
						<button type="button" on:click={() => handleDelete(s)} title={t.del} class="p-2 rounded-lg hover:bg-red-500/10 text-gray-700 dark:text-zinc-300 hover:text-red-500"><Trash2 class="w-4 h-4" /></button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

{#if showForm && editing}
	<div class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60" on:click|self={() => (showForm = false)}>
		<div class="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-t-2xl sm:rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
			<div class="flex items-center justify-between mb-4">
				<h2 class="text-xl font-bold">{editing.id ? t.edit : t.newCta}</h2>
				<button type="button" on:click={() => (showForm = false)} class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"><X class="w-4 h-4" /></button>
			</div>
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
				<label class="block sm:col-span-2"><span class="text-xs font-semibold text-gray-600 dark:text-zinc-400 mb-1 block">{t.fSlug}</span>
					<input type="text" bind:value={editing.slug} class="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm" />
				</label>
				<label class="block"><span class="text-xs font-semibold text-gray-600 dark:text-zinc-400 mb-1 block">{t.fIcon}</span>
					<input type="text" bind:value={editing.icon} placeholder="🔧" class="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm" />
				</label>
				<label class="block"><span class="text-xs font-semibold text-gray-600 dark:text-zinc-400 mb-1 block">{t.fOrder}</span>
					<input type="number" bind:value={editing.order_index} class="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm" />
				</label>
				<label class="block sm:col-span-2"><span class="text-xs font-semibold text-gray-600 dark:text-zinc-400 mb-1 block">{t.fTitleFr}</span>
					<input type="text" bind:value={editing.title_fr} class="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm" />
				</label>
				<label class="block"><span class="text-xs font-semibold text-gray-600 dark:text-zinc-400 mb-1 block">{t.fTitleEn}</span>
					<input type="text" bind:value={editing.title_en} class="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm" />
				</label>
				<label class="block"><span class="text-xs font-semibold text-gray-600 dark:text-zinc-400 mb-1 block">{t.fTitleEs}</span>
					<input type="text" bind:value={editing.title_es} class="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm" />
				</label>
				<label class="block sm:col-span-2"><span class="text-xs font-semibold text-gray-600 dark:text-zinc-400 mb-1 block">{t.fDescFr}</span>
					<textarea bind:value={editing.description_fr} rows="3" class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm"></textarea>
				</label>
				<label class="block"><span class="text-xs font-semibold text-gray-600 dark:text-zinc-400 mb-1 block">{t.fDescEn}</span>
					<textarea bind:value={editing.description_en} rows="3" class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm"></textarea>
				</label>
				<label class="block"><span class="text-xs font-semibold text-gray-600 dark:text-zinc-400 mb-1 block">{t.fDescEs}</span>
					<textarea bind:value={editing.description_es} rows="3" class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm"></textarea>
				</label>
				<label class="block"><span class="text-xs font-semibold text-gray-600 dark:text-zinc-400 mb-1 block">{t.fPriceFrom}</span>
					<input type="number" bind:value={editing.price_from_cad} class="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm" />
				</label>
				<label class="block"><span class="text-xs font-semibold text-gray-600 dark:text-zinc-400 mb-1 block">{t.fPriceTo}</span>
					<input type="number" bind:value={editing.price_to_cad} class="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm" />
				</label>
				<label class="flex items-center gap-2"><input type="checkbox" bind:checked={editing.featured} class="rounded" /> <span class="text-sm">{t.fFeatured}</span></label>
				<label class="flex items-center gap-2"><input type="checkbox" bind:checked={editing.active} class="rounded" /> <span class="text-sm">{t.fActive}</span></label>
			</div>
			<div class="flex items-center justify-end gap-2 mt-5">
				<button type="button" on:click={() => (showForm = false)} class="px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 text-sm">{t.cancel}</button>
				<button type="button" on:click={save} disabled={saving} class="px-4 py-2 rounded-lg bg-[#febd17] hover:bg-yellow-400 text-black font-bold text-sm disabled:opacity-60">{saving ? t.saving : t.save}</button>
			</div>
		</div>
	</div>
{/if}
