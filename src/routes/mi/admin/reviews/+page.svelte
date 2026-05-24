<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { language } from '$lib/store/store';
	import { Star, Plus, Edit, Trash2, X, BadgeCheck } from 'lucide-svelte';
	import { listReviews, createReview, updateReview, deleteReview, type Review } from '$lib/admin/reviews';
	import { getCurrent } from '$lib/admin/clients';

	let items: Review[] = [];
	let loading = true;
	let editing: Partial<Review> | null = null;
	let showForm = false;
	let saving = false;

	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';
	$: t = T[lang] || T.fr;

	const T = {
		fr: { title: 'Avis Clients', count: 'avis', newCta: 'Nouveau', edit: 'Modifier', del: 'Supprimer', confirmDel: 'Supprimer cet avis ?', empty: 'Aucun avis.', save: 'Enregistrer', saving: 'Enregistrement…', cancel: 'Annuler', fName: 'Auteur *', fCity: 'Ville', fRating: 'Note (1–5)', fService: 'Service', fTextFr: 'Témoignage FR *', fTextEn: 'Témoignage EN', fTextEs: 'Témoignage ES', fVerified: 'Vérifié', fFeatured: 'Mis en avant' },
		en: { title: 'Client reviews', count: 'reviews', newCta: 'New', edit: 'Edit', del: 'Delete', confirmDel: 'Delete this review?', empty: 'No reviews.', save: 'Save', saving: 'Saving…', cancel: 'Cancel', fName: 'Author *', fCity: 'City', fRating: 'Rating (1–5)', fService: 'Service', fTextFr: 'Testimonial FR *', fTextEn: 'Testimonial EN', fTextEs: 'Testimonial ES', fVerified: 'Verified', fFeatured: 'Featured' },
		es: { title: 'Reseñas de clientes', count: 'reseñas', newCta: 'Nuevo', edit: 'Editar', del: 'Eliminar', confirmDel: '¿Eliminar esta reseña?', empty: 'Sin reseñas.', save: 'Guardar', saving: 'Guardando…', cancel: 'Cancelar', fName: 'Autor *', fCity: 'Ciudad', fRating: 'Nota (1–5)', fService: 'Servicio', fTextFr: 'Testimonio FR *', fTextEn: 'Testimonio EN', fTextEs: 'Testimonio ES', fVerified: 'Verificado', fFeatured: 'Destacado' }
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
		items = await listReviews();
		loading = false;
	}

	function newOne() {
		editing = { author_name: '', author_city: '', rating: 5, text_fr: '', text_en: '', text_es: '', service_type: '', verified: 1, featured: 0 };
		showForm = true;
	}

	function edit(r: Review) {
		editing = { ...r };
		showForm = true;
	}

	async function save() {
		if (!editing || !editing.author_name || !editing.text_fr) return;
		saving = true;
		const payload = {
			...editing,
			verified: editing.verified ? 1 : 0,
			featured: editing.featured ? 1 : 0,
			rating: Number(editing.rating) || 5
		} as Partial<Review>;
		const result = editing.id ? await updateReview(editing.id, payload) : await createReview(payload);
		saving = false;
		if (result) {
			showForm = false;
			editing = null;
			await refresh();
		}
	}

	async function handleDelete(r: Review) {
		if (!confirm(t.confirmDel)) return;
		await deleteReview(r.id);
		await refresh();
	}

	function textFor(r: Review): string {
		return (lang === 'en' ? r.text_en : lang === 'es' ? r.text_es : null) || r.text_fr;
	}
</script>

<svelte:head><title>{t.title} — Admin</title><meta name="robots" content="noindex, nofollow" /></svelte:head>

<div class="space-y-6">
	<div class="flex items-center justify-between flex-wrap gap-4">
		<div>
			<h1 class="text-3xl font-black flex items-center gap-3"><Star class="w-7 h-7 text-[#febd17]" /> {t.title}</h1>
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
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			{#each items as r (r.id)}
				<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5">
					<div class="flex items-start justify-between mb-3">
						<div class="flex items-center gap-3">
							<div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#febd17] to-yellow-600 flex items-center justify-center text-black font-black text-sm">
								{r.author_name[0]?.toUpperCase()}
							</div>
							<div>
								<p class="font-bold text-sm flex items-center gap-1">{r.author_name} {#if r.verified}<BadgeCheck class="w-3.5 h-3.5 text-emerald-500" />{/if}</p>
								<p class="text-xs text-gray-400 dark:text-zinc-600">{r.author_city ?? ''}{r.service_type ? ` · ${r.service_type}` : ''}</p>
							</div>
						</div>
						<div class="flex items-center gap-0.5 text-[#febd17]">
							{#each Array.from({ length: r.rating }) as _, i (i)}<Star class="w-3.5 h-3.5 fill-current" />{/each}
						</div>
					</div>
					<p class="text-sm text-gray-700 dark:text-zinc-300 line-clamp-4">{textFor(r)}</p>
					<div class="flex items-center justify-end gap-1 mt-3">
						{#if r.featured}<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-500/15 text-yellow-700 dark:text-yellow-300 mr-auto">★</span>{/if}
						<button type="button" on:click={() => edit(r)} title={t.edit} class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:text-[#febd17]"><Edit class="w-4 h-4" /></button>
						<button type="button" on:click={() => handleDelete(r)} title={t.del} class="p-2 rounded-lg hover:bg-red-500/10 text-gray-700 dark:text-zinc-300 hover:text-red-500"><Trash2 class="w-4 h-4" /></button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

{#if showForm && editing}
	<div class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60" on:click|self={() => (showForm = false)}>
		<div class="w-full max-w-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-t-2xl sm:rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
			<div class="flex items-center justify-between mb-4">
				<h2 class="text-xl font-bold">{editing.id ? t.edit : t.newCta}</h2>
				<button type="button" on:click={() => (showForm = false)} class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"><X class="w-4 h-4" /></button>
			</div>
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
				<label class="block sm:col-span-2"><span class="text-xs font-semibold text-gray-600 dark:text-zinc-400 mb-1 block">{t.fName}</span>
					<input type="text" bind:value={editing.author_name} class="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm" />
				</label>
				<label class="block"><span class="text-xs font-semibold text-gray-600 dark:text-zinc-400 mb-1 block">{t.fCity}</span>
					<input type="text" bind:value={editing.author_city} class="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm" />
				</label>
				<label class="block"><span class="text-xs font-semibold text-gray-600 dark:text-zinc-400 mb-1 block">{t.fRating}</span>
					<input type="number" min="1" max="5" bind:value={editing.rating} class="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm" />
				</label>
				<label class="block sm:col-span-2"><span class="text-xs font-semibold text-gray-600 dark:text-zinc-400 mb-1 block">{t.fService}</span>
					<input type="text" bind:value={editing.service_type} class="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm" />
				</label>
				<label class="block sm:col-span-2"><span class="text-xs font-semibold text-gray-600 dark:text-zinc-400 mb-1 block">{t.fTextFr}</span>
					<textarea bind:value={editing.text_fr} rows="3" class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm"></textarea>
				</label>
				<label class="block sm:col-span-2"><span class="text-xs font-semibold text-gray-600 dark:text-zinc-400 mb-1 block">{t.fTextEn}</span>
					<textarea bind:value={editing.text_en} rows="3" class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm"></textarea>
				</label>
				<label class="block sm:col-span-2"><span class="text-xs font-semibold text-gray-600 dark:text-zinc-400 mb-1 block">{t.fTextEs}</span>
					<textarea bind:value={editing.text_es} rows="3" class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm"></textarea>
				</label>
				<label class="flex items-center gap-2"><input type="checkbox" bind:checked={editing.verified} class="rounded" /> <span class="text-sm">{t.fVerified}</span></label>
				<label class="flex items-center gap-2"><input type="checkbox" bind:checked={editing.featured} class="rounded" /> <span class="text-sm">{t.fFeatured}</span></label>
			</div>
			<div class="flex items-center justify-end gap-2 mt-5">
				<button type="button" on:click={() => (showForm = false)} class="px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 text-sm">{t.cancel}</button>
				<button type="button" on:click={save} disabled={saving} class="px-4 py-2 rounded-lg bg-[#febd17] hover:bg-yellow-400 text-black font-bold text-sm disabled:opacity-60">{saving ? t.saving : t.save}</button>
			</div>
		</div>
	</div>
{/if}
