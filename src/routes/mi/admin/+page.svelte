<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import {
		ShieldCheck,
		LogOut,
		FileSignature,
		Users,
		FileText,
		Wrench,
		Star,
		Settings,
		Mail
	} from 'lucide-svelte';

	let adminEmail = '';
	let checked = false;

	onMount(() => {
		try {
			const raw = localStorage.getItem('mi_admin_session');
			if (!raw) {
				goto('/mi/admin/login', { replaceState: true });
				return;
			}
			const sess = JSON.parse(raw);
			adminEmail = sess?.email ?? '';
			checked = true;
		} catch {
			goto('/mi/admin/login', { replaceState: true });
		}
	});

	function logout() {
		try {
			localStorage.removeItem('mi_admin_session');
		} catch {}
		goto('/mi/admin/login', { replaceState: true });
	}

	const sections = [
		{
			icon: FileSignature,
			title: 'Soumissions',
			desc: 'Voir et gérer les demandes de soumission.',
			disabled: true
		},
		{
			icon: Users,
			title: 'Leads / Contacts',
			desc: 'Tous les contacts reçus via les formulaires.',
			disabled: true
		},
		{
			icon: FileText,
			title: 'Articles Blog',
			desc: 'Créer et éditer les articles du blog.',
			disabled: true
		},
		{
			icon: Wrench,
			title: 'Services',
			desc: 'Configurer les services affichés sur le site.',
			disabled: true
		},
		{
			icon: Star,
			title: 'Avis Clients',
			desc: 'Modérer les avis clients.',
			disabled: true
		},
		{
			icon: Settings,
			title: 'Réglages',
			desc: 'Paramètres généraux de l\'application.',
			disabled: true
		}
	];
</script>

<svelte:head>
	<title>Tableau de bord — Administration</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

{#if checked}
	<div class="min-h-screen bg-zinc-950 text-white flex flex-col">
		<!-- Top bar -->
		<header class="border-b border-zinc-900 bg-zinc-950/95 backdrop-blur">
			<div class="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
				<div class="flex items-center gap-2">
					<div class="w-8 h-8 rounded-lg bg-[#febd17] flex items-center justify-center">
						<ShieldCheck class="w-4 h-4 text-black" />
					</div>
					<span class="font-bold text-sm">Mini Excavations Érable — Admin</span>
				</div>
				<div class="flex items-center gap-3 text-xs">
					{#if adminEmail}
						<span class="hidden sm:inline text-zinc-400">{adminEmail}</span>
					{/if}
					<button
						on:click={logout}
						class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-600 text-zinc-300 font-semibold transition-colors"
					>
						<LogOut class="w-3.5 h-3.5" />
						<span>Déconnexion</span>
					</button>
				</div>
			</div>
		</header>

		<main class="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-10">
			<div class="mb-8">
				<h1 class="text-3xl font-black tracking-tight">Tableau de bord</h1>
				<p class="text-zinc-400 text-sm mt-1">
					Bienvenue. La base de données n'est pas encore connectée à ce déploiement —
					les modules ci-dessous seront activés une fois le backend en ligne.
				</p>
			</div>

			<!-- Status banner -->
			<div class="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm flex items-start gap-3">
				<svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<div>
					<p class="font-semibold mb-1">Backend en attente</p>
					<p class="text-amber-200/80">
						Les soumissions reçues par courriel arrivent à
						<a href="mailto:miniexcavationerable@gmail.com" class="underline">miniexcavationerable@gmail.com</a>.
						Le module de stockage en base sera activé une fois MySQL configuré sur Hostinger.
					</p>
				</div>
			</div>

			<!-- Sections grid -->
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each sections as section}
					<div
						class="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-5 {section.disabled ? 'opacity-60' : 'hover:border-[#febd17] transition-colors cursor-pointer'}"
					>
						<div class="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-[#febd17] mb-3">
							<svelte:component this={section.icon} class="w-5 h-5" />
						</div>
						<h3 class="font-bold text-white mb-1">{section.title}</h3>
						<p class="text-xs text-zinc-400 leading-relaxed">{section.desc}</p>
						{#if section.disabled}
							<span class="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 bg-zinc-800/60 border border-zinc-800 px-2 py-0.5 rounded">
								Bientôt
							</span>
						{/if}
					</div>
				{/each}
			</div>

			<!-- Quick actions -->
			<div class="mt-8 p-5 bg-zinc-900 border border-zinc-800 rounded-2xl">
				<h2 class="font-bold mb-3 flex items-center gap-2">
					<Mail class="w-4 h-4 text-[#febd17]" />
					Actions rapides
				</h2>
				<div class="flex flex-wrap gap-2">
					<a
						href="mailto:miniexcavationerable@gmail.com"
						class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm transition-colors"
					>
						Ouvrir la boîte courriel
					</a>
					<a
						href="/"
						class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-800 hover:border-zinc-600 text-zinc-300 font-semibold text-sm transition-colors"
					>
						Voir le site public
					</a>
				</div>
			</div>
		</main>
	</div>
{:else}
	<div class="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
		<p class="text-zinc-500 text-sm">Vérification de la session…</p>
	</div>
{/if}
