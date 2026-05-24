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
		Mail,
		ExternalLink,
		Phone,
		Globe,
		BarChart3,
		Inbox
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
			desc: 'Reçues par courriel — ouvrir la boîte de réception.',
			href: 'mailto:miniexcavationerable@gmail.com',
			external: true,
			accent: 'amber'
		},
		{
			icon: Users,
			title: 'Leads / Contacts',
			desc: 'Tous les leads arrivent au courriel admin.',
			href: 'mailto:miniexcavationerable@gmail.com',
			external: true,
			accent: 'blue'
		},
		{
			icon: FileText,
			title: 'Articles Blog',
			desc: 'Voir les articles publiés sur le site.',
			href: '/#blogs',
			external: false,
			accent: 'emerald'
		},
		{
			icon: Wrench,
			title: 'Services',
			desc: 'Liste des services affichés au public.',
			href: '/#services',
			external: false,
			accent: 'orange'
		},
		{
			icon: Star,
			title: 'Avis Clients',
			desc: 'Lire les témoignages clients publiés.',
			href: '/urgences#avis',
			external: false,
			accent: 'purple'
		},
		{
			icon: Settings,
			title: 'Réglages',
			desc: 'Paramètres globaux (RBQ, contact, etc.).',
			href: '#config',
			external: false,
			accent: 'zinc'
		}
	];

	const config = [
		{ label: 'Téléphone', value: '+1 (514) 830-9973' },
		{ label: 'Courriel', value: 'miniexcavationerable@gmail.com' },
		{ label: 'Licence R.B.Q.', value: '5823-7736-01' },
		{ label: 'Région principale', value: 'Saint-Hubert-de-Rivière-du-Loup, Bas-Saint-Laurent' },
		{ label: 'Site public', value: 'excavationserable.com' }
	];

	function accentClass(tone: string): { icon: string } {
		switch (tone) {
			case 'amber':
				return { icon: 'bg-amber-500/15 text-amber-400' };
			case 'blue':
				return { icon: 'bg-blue-500/15 text-blue-400' };
			case 'emerald':
				return { icon: 'bg-emerald-500/15 text-emerald-400' };
			case 'orange':
				return { icon: 'bg-orange-500/15 text-orange-400' };
			case 'purple':
				return { icon: 'bg-purple-500/15 text-purple-400' };
			default:
				return { icon: 'bg-zinc-800 text-zinc-300' };
		}
	}
</script>

<svelte:head>
	<title>Tableau de bord — Mini Excavations Érable</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

{#if checked}
	<div class="min-h-screen bg-zinc-950 text-white">
		<main class="max-w-6xl w-full mx-auto px-4 sm:px-6 py-10 lg:py-14">
			<!-- Identity strip -->
			<div class="mb-8 flex items-center justify-between gap-4 flex-wrap">
				<div class="flex items-center gap-3">
					<div class="w-10 h-10 rounded-xl bg-[#febd17] flex items-center justify-center">
						<ShieldCheck class="w-5 h-5 text-black" />
					</div>
					<div>
						<p class="font-bold text-sm sm:text-base">Espace admin</p>
						{#if adminEmail}
							<p class="text-xs text-zinc-500">{adminEmail}</p>
						{/if}
					</div>
				</div>
				<button
					on:click={logout}
					class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white text-xs font-semibold transition-colors"
				>
					<LogOut class="w-3.5 h-3.5" />
					<span>Déconnexion</span>
				</button>
			</div>

			<!-- Heading -->
			<div class="mb-8">
				<h1 class="text-3xl sm:text-4xl font-black tracking-tight">Tableau de bord</h1>
				<p class="text-zinc-400 text-sm mt-1.5">
					Vue d'ensemble de votre activité Mini Excavations Érable.
				</p>
			</div>

			<!-- Stats strip -->
			<div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
				<div class="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
					<div class="flex items-center gap-2 text-zinc-500 text-xs mb-1">
						<Inbox class="w-3.5 h-3.5" />
						Soumissions
					</div>
					<div class="text-xl font-black text-white">Courriel</div>
					<div class="text-[10px] text-zinc-600 mt-0.5">Livrées par FormSubmit</div>
				</div>
				<div class="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
					<div class="flex items-center gap-2 text-zinc-500 text-xs mb-1">
						<Phone class="w-3.5 h-3.5" />
						Urgences 24/7
					</div>
					<div class="text-xl font-black text-emerald-400">Actif</div>
					<div class="text-[10px] text-zinc-600 mt-0.5">(514) 830-9973</div>
				</div>
				<div class="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
					<div class="flex items-center gap-2 text-zinc-500 text-xs mb-1">
						<Globe class="w-3.5 h-3.5" />
						Site
					</div>
					<div class="text-xl font-black text-white">En ligne</div>
					<div class="text-[10px] text-zinc-600 mt-0.5">excavationserable.com</div>
				</div>
				<div class="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
					<div class="flex items-center gap-2 text-zinc-500 text-xs mb-1">
						<BarChart3 class="w-3.5 h-3.5" />
						RBQ
					</div>
					<div class="text-xl font-black text-white font-mono">5823-7736-01</div>
					<div class="text-[10px] text-zinc-600 mt-0.5">Licence active</div>
				</div>
			</div>

			<!-- Sections grid -->
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
				{#each sections as section}
					{@const accent = accentClass(section.accent)}
					<a
						href={section.href}
						target={section.external ? '_blank' : undefined}
						rel={section.external ? 'noopener' : undefined}
						class="group relative bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-[#febd17]/50 hover:bg-zinc-900/80 transition-all hover:-translate-y-0.5"
					>
						<div class="w-11 h-11 rounded-xl flex items-center justify-center mb-3 {accent.icon}">
							<svelte:component this={section.icon} class="w-5 h-5" />
						</div>
						<h3 class="font-bold text-white mb-1 flex items-center gap-1.5">
							{section.title}
							{#if section.external}
								<ExternalLink class="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
							{/if}
						</h3>
						<p class="text-xs text-zinc-400 leading-relaxed">{section.desc}</p>
					</a>
				{/each}
			</div>

			<!-- Quick actions -->
			<div class="mb-8 p-5 bg-zinc-900 border border-zinc-800 rounded-2xl">
				<h2 class="font-bold mb-3 flex items-center gap-2">
					<Mail class="w-4 h-4 text-[#febd17]" />
					Actions rapides
				</h2>
				<div class="flex flex-wrap gap-2">
					<a
						href="mailto:miniexcavationerable@gmail.com"
						class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#febd17] hover:bg-[#e5aa10] text-black font-semibold text-sm transition-colors"
					>
						<Mail class="w-4 h-4" />
						Ouvrir la boîte courriel
					</a>
					<a
						href="/"
						class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-800 hover:border-zinc-600 text-zinc-300 font-semibold text-sm transition-colors"
					>
						<Globe class="w-4 h-4" />
						Voir le site public
					</a>
					<a
						href="tel:+15148309973"
						class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-800 hover:border-zinc-600 text-zinc-300 font-semibold text-sm transition-colors"
					>
						<Phone class="w-4 h-4" />
						(514) 830-9973
					</a>
				</div>
			</div>

			<!-- Configuration snapshot -->
			<section id="config" class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
				<div class="flex items-center gap-2 mb-4">
					<Settings class="w-4 h-4 text-[#febd17]" />
					<h2 class="font-bold">Configuration</h2>
				</div>
				<dl class="divide-y divide-zinc-800">
					{#each config as item}
						<div class="flex items-center justify-between py-2.5 gap-4">
							<dt class="text-xs text-zinc-500 uppercase tracking-wider">{item.label}</dt>
							<dd class="text-sm text-white font-mono text-right break-all">{item.value}</dd>
						</div>
					{/each}
				</dl>
			</section>
		</main>
	</div>
{:else}
	<div class="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
		<p class="text-zinc-500 text-sm">Vérification de la session…</p>
	</div>
{/if}
