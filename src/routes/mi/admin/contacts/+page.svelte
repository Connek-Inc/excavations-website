<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { language } from '$lib/store/store';
	import { readSoumissions, checkAdminSession, type Soumission } from '$lib/admin/storage';
	import { Users, Mail, Phone, ArrowLeft, Search, ChevronRight, CheckCircle2 } from 'lucide-svelte';

	let all: Soumission[] = [];
	let q = '';
	let checked = false;

	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';
	$: t = T[lang] || T.fr;

	const T = {
		fr: {
			back: 'Retour au tableau de bord',
			title: 'Leads / Contacts',
			subtitle: 'Clients ayant accepté une soumission.',
			search: 'Rechercher…',
			empty: 'Aucun client converti pour le moment.',
			emptyHint:
				"Marquez une soumission comme « Acceptée » et elle apparaîtra ici comme client confirmé.",
			from: 'Soumission du'
		},
		en: {
			back: 'Back to dashboard',
			title: 'Leads / Contacts',
			subtitle: 'Clients who accepted a quote.',
			search: 'Search…',
			empty: 'No converted clients yet.',
			emptyHint: 'Mark a quote as “Accepted” and it shows up here as a confirmed client.',
			from: 'Quote from'
		},
		es: {
			back: 'Volver al panel',
			title: 'Leads / Contactos',
			subtitle: 'Clientes que aceptaron una cotización.',
			search: 'Buscar…',
			empty: 'Sin clientes convertidos todavía.',
			emptyHint:
				'Marque una cotización como «Aceptada» y aparecerá aquí como cliente confirmado.',
			from: 'Cotización del'
		}
	};

	onMount(() => {
		if (!checkAdminSession()) {
			goto('/mi/admin/login', { replaceState: true });
			return;
		}
		all = readSoumissions().filter((s) => s.status === 'acceptee');
		checked = true;
	});

	$: filtered = all.filter((s) => {
		if (!q.trim()) return true;
		const needle = q.trim().toLowerCase();
		return `${s.client_nom} ${s.client_email} ${s.client_telephone} ${s.projet_adresse}`
			.toLowerCase()
			.includes(needle);
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
</script>

<svelte:head>
	<title>{t.title} — Admin</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

{#if checked}
	<div class="min-h-screen bg-gray-50 dark:bg-white dark:bg-zinc-950 text-gray-900 dark:text-white">
		<main class="max-w-6xl w-full mx-auto px-4 sm:px-6 py-10">
			<a
				href="/mi/admin"
				class="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400 hover:text-[#febd17] transition-colors mb-6"
			>
				<ArrowLeft class="w-4 h-4" /> {t.back}
			</a>

			<div class="mb-8">
				<h1 class="text-3xl sm:text-4xl font-black tracking-tight">{t.title}</h1>
				<p class="text-gray-600 dark:text-zinc-400 text-sm mt-1.5">{t.subtitle}</p>
			</div>

			<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 mb-6">
				<div class="relative">
					<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-zinc-500" />
					<input
						type="text"
						bind:value={q}
						placeholder={t.search}
						class="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 focus:border-[#febd17] rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-600 outline-none"
					/>
				</div>
			</div>

			<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
				{#if filtered.length === 0}
					<div class="p-10 text-center">
						<Users class="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-zinc-600" />
						<p class="text-sm text-gray-600 dark:text-zinc-400 mb-1">{t.empty}</p>
						<p class="text-xs text-gray-400 dark:text-zinc-600 max-w-md mx-auto">{t.emptyHint}</p>
					</div>
				{:else}
					<ul class="divide-y divide-gray-200 dark:divide-zinc-800">
						{#each filtered as s}
							<a
								href={`/mi/admin/soumissions/${s.id}`}
								class="block p-4 sm:p-5 hover:bg-gray-50 dark:hover:bg-zinc-800/40 transition-colors"
							>
								<div class="flex items-start justify-between gap-3">
									<div class="flex-1 min-w-0">
										<div class="flex items-center gap-2 mb-1">
											<CheckCircle2 class="w-4 h-4 text-emerald-400 flex-shrink-0" />
											<span class="font-bold text-gray-900 dark:text-white truncate">{s.client_nom}</span>
										</div>
										<div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-zinc-500 mb-1">
											<span class="inline-flex items-center gap-1"
												><Mail class="w-3 h-3" /> {s.client_email}</span
											>
											{#if s.client_telephone}
												<span class="inline-flex items-center gap-1"
													><Phone class="w-3 h-3" /> {s.client_telephone}</span
												>
											{/if}
										</div>
										<div class="text-xs text-gray-500 dark:text-zinc-500">
											{t.from} {fmtDate(s.createdAt)} · {s.projet_type}
										</div>
									</div>
									<ChevronRight class="w-4 h-4 text-gray-400 dark:text-zinc-600 flex-shrink-0 mt-1" />
								</div>
							</a>
						{/each}
					</ul>
				{/if}
			</div>
		</main>
	</div>
{:else}
	<div class="min-h-screen bg-gray-50 dark:bg-white dark:bg-zinc-950 text-gray-900 dark:text-white flex items-center justify-center">
		<p class="text-gray-500 dark:text-zinc-500 text-sm">…</p>
	</div>
{/if}
