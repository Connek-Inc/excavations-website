<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { language } from '$lib/store/store';
	import {
		readSoumissions,
		deleteSoumission as removeSoumission,
		statusLabel,
		statusColor,
		checkAdminSession,
		type Soumission,
		type SoumissionStatus
	} from '$lib/admin/storage';
	import {
		Search,
		Filter,
		Inbox,
		ChevronRight,
		Mail,
		Phone,
		ArrowLeft,
		Trash2,
		Eye,
		Plus
	} from 'lucide-svelte';

	let all: Soumission[] = [];
	let q = '';
	let statusFilter: SoumissionStatus | '' = '';
	let checked = false;

	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';
	$: t = T[lang] || T.fr;

	const T = {
		fr: {
			back: 'Retour au tableau de bord',
			title: 'Soumissions',
			subtitle: 'Demandes reçues via les formulaires du site.',
			search: 'Rechercher par nom, courriel ou ville…',
			allStatus: 'Tous les statuts',
			empty: 'Aucune soumission enregistrée localement pour le moment.',
			emptyHint:
				"Les soumissions envoyées via le formulaire public arrivent ici dès leur soumission, ainsi qu'à votre courriel.",
			open: 'Ouvrir',
			delete: 'Supprimer',
			confirmDelete: 'Supprimer cette soumission?',
			count: 'résultat',
			countPlural: 'résultats',
			of: 'sur',
			localBadge: 'Données locales',
			localHint: 'Visibles uniquement dans ce navigateur jusqu’à l’activation du backend.',
			date: 'Date',
			client: 'Client',
			project: 'Projet',
			status: 'Statut'
		},
		en: {
			back: 'Back to dashboard',
			title: 'Quote requests',
			subtitle: 'Requests received via the site forms.',
			search: 'Search by name, email or city…',
			allStatus: 'All statuses',
			empty: 'No quote requests stored locally yet.',
			emptyHint:
				'Submissions sent through the public form land here as soon as they’re submitted, plus a copy reaches your inbox.',
			open: 'Open',
			delete: 'Delete',
			confirmDelete: 'Delete this submission?',
			count: 'result',
			countPlural: 'results',
			of: 'of',
			localBadge: 'Local data',
			localHint: 'Visible only in this browser until the backend is enabled.',
			date: 'Date',
			client: 'Client',
			project: 'Project',
			status: 'Status'
		},
		es: {
			back: 'Volver al panel',
			title: 'Cotizaciones',
			subtitle: 'Solicitudes recibidas vía los formularios del sitio.',
			search: 'Buscar por nombre, correo o ciudad…',
			allStatus: 'Todos los estados',
			empty: 'No hay cotizaciones almacenadas localmente todavía.',
			emptyHint:
				'Las solicitudes enviadas desde el formulario público aparecen aquí al enviarse, y una copia llega a su correo.',
			open: 'Abrir',
			delete: 'Eliminar',
			confirmDelete: '¿Eliminar esta solicitud?',
			count: 'resultado',
			countPlural: 'resultados',
			of: 'de',
			localBadge: 'Datos locales',
			localHint: 'Visibles solo en este navegador hasta activar el backend.',
			date: 'Fecha',
			client: 'Cliente',
			project: 'Proyecto',
			status: 'Estado'
		}
	};

	const statusOptions: SoumissionStatus[] = [
		'nouvelle',
		'en_revision',
		'offerte',
		'acceptee',
		'rejetee',
		'archivee'
	];

	onMount(() => {
		if (!checkAdminSession()) {
			goto('/mi/admin/login', { replaceState: true });
			return;
		}
		all = readSoumissions();
		checked = true;
	});

	$: filtered = all.filter((s) => {
		if (statusFilter && s.status !== statusFilter) return false;
		if (q.trim()) {
			const needle = q.trim().toLowerCase();
			const hay = `${s.client_nom} ${s.client_email} ${s.projet_adresse}`.toLowerCase();
			if (!hay.includes(needle)) return false;
		}
		return true;
	});

	function fmtDate(s: string): string {
		try {
			return new Date(s).toLocaleDateString(
				lang === 'en' ? 'en-CA' : lang === 'es' ? 'es-ES' : 'fr-CA',
				{ day: '2-digit', month: 'short', year: 'numeric' }
			);
		} catch {
			return s;
		}
	}

	function handleDelete(id: string) {
		if (!confirm(t.confirmDelete)) return;
		removeSoumission(id);
		all = readSoumissions();
	}
</script>

<svelte:head>
	<title>{t.title} — Admin</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

{#if checked}
	<div class="min-h-screen bg-zinc-950 text-white">
		<main class="max-w-6xl w-full mx-auto px-4 sm:px-6 py-10">
			<a
				href="/mi/admin"
				class="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-[#febd17] transition-colors mb-6"
			>
				<ArrowLeft class="w-4 h-4" /> {t.back}
			</a>

			<div class="flex items-start justify-between gap-4 flex-wrap mb-2">
				<div>
					<h1 class="text-3xl sm:text-4xl font-black tracking-tight">{t.title}</h1>
					<p class="text-zinc-400 text-sm mt-1.5">{t.subtitle}</p>
				</div>
				<div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
					<Inbox class="w-3 h-3" />
					{t.localBadge}
				</div>
			</div>
			<p class="text-xs text-zinc-500 mb-6">{t.localHint}</p>

			<div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 grid sm:grid-cols-3 gap-3 mb-6">
				<div class="sm:col-span-2 relative">
					<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
					<input
						type="text"
						bind:value={q}
						placeholder={t.search}
						class="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 focus:border-[#febd17] rounded-lg text-sm text-white placeholder-zinc-600 outline-none"
					/>
				</div>
				<div class="relative">
					<Filter class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
					<select
						bind:value={statusFilter}
						class="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 focus:border-[#febd17] rounded-lg text-sm text-white outline-none appearance-none"
					>
						<option value="">{t.allStatus}</option>
						{#each statusOptions as opt}
							<option value={opt}>{statusLabel(opt, lang)}</option>
						{/each}
					</select>
				</div>
			</div>

			<div class="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
				{#if filtered.length === 0}
					<div class="p-10 text-center">
						<Inbox class="w-12 h-12 mx-auto mb-3 text-zinc-600" />
						<p class="text-sm text-zinc-400 mb-1">{t.empty}</p>
						<p class="text-xs text-zinc-600 max-w-md mx-auto">{t.emptyHint}</p>
					</div>
				{:else}
					<ul class="divide-y divide-zinc-800">
						{#each filtered as s}
							<li class="p-4 sm:p-5 hover:bg-zinc-800/40 transition-colors">
								<div class="flex items-start justify-between gap-3">
									<div class="flex-1 min-w-0">
										<div class="flex items-center gap-2 mb-1 flex-wrap">
											<span class="font-bold text-white truncate">{s.client_nom}</span>
											<span
												class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border {statusColor(s.status)}"
											>
												{statusLabel(s.status, lang)}
											</span>
										</div>
										<div class="flex items-center gap-3 text-xs text-zinc-500 mb-1 flex-wrap">
											<span class="inline-flex items-center gap-1"><Mail class="w-3 h-3" /> {s.client_email}</span>
											{#if s.client_telephone}
												<span class="inline-flex items-center gap-1"><Phone class="w-3 h-3" /> {s.client_telephone}</span>
											{/if}
											<span>·</span>
											<span>{fmtDate(s.createdAt)}</span>
										</div>
										<div class="text-sm text-zinc-300 truncate">
											<span class="font-semibold">{s.projet_type}</span>
											<span class="text-zinc-500"> · {s.projet_adresse}</span>
										</div>
									</div>
									<div class="flex items-center gap-1 flex-shrink-0">
										<a
											href={`/mi/admin/soumissions/${s.id}`}
											class="p-2 rounded-lg hover:bg-zinc-700 text-zinc-300 hover:text-[#febd17] transition-colors"
											title={t.open}
										>
											<Eye class="w-4 h-4" />
										</a>
										<button
											type="button"
											on:click={() => handleDelete(s.id)}
											class="p-2 rounded-lg hover:bg-red-500/10 text-zinc-300 hover:text-red-400 transition-colors"
											title={t.delete}
										>
											<Trash2 class="w-4 h-4" />
										</button>
									</div>
								</div>
							</li>
						{/each}
					</ul>
				{/if}
			</div>

			<div class="text-xs text-zinc-500 text-center mt-4">
				{filtered.length} {filtered.length === 1 ? t.count : t.countPlural} {t.of} {all.length}
			</div>
		</main>
	</div>
{:else}
	<div class="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
		<p class="text-zinc-500 text-sm">…</p>
	</div>
{/if}
