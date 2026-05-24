<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { language } from '$lib/store/store';
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
		Inbox,
		TrendingUp,
		Eye
	} from 'lucide-svelte';
	import { getCurrent, logout as apiLogout } from '$lib/admin/clients';
	import { getSummary, getTopPages, getTopReferrers, type SummaryStats, type TopPage, type TopReferrer } from '$lib/api/analytics';

	let adminEmail = '';
	let checked = false;
	let stats: SummaryStats | null = null;
	let topPages: TopPage[] = [];
	let topReferrers: TopReferrer[] = [];
	let statsLoading = true;

	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';
	$: t = T[lang] || T.fr;

	const T = {
		fr: {
			title: 'Tableau de bord',
			subtitle: "Vue d'ensemble de votre activité Mini Excavations Érable.",
			adminSpace: 'Espace admin',
			logout: 'Déconnexion',
			statSoumissions: 'Soumissions',
			statSoumissionsValue: 'Courriel',
			statSoumissionsHint: 'Livrées par FormSubmit',
			statUrgence: 'Urgences 24/7',
			statUrgenceValue: 'Actif',
			statSite: 'Site',
			statSiteValue: 'En ligne',
			statRBQ: 'RBQ',
			statRBQHint: 'Licence active',
			statVisitorsToday: 'Visiteurs aujourd’hui',
			statVisitors30: 'Visiteurs 30 jours',
			statPageviews: 'pages vues',
			statSoumissionsToday: 'Soumissions du jour',
			last30: 'sur 30 jours',
			topPages: 'Pages les plus consultées',
			topReferrers: 'Sources de trafic',
			noData: 'Aucune donnée encore — revenez après quelques visites.',
			sections: [
				{ title: 'Soumissions', desc: 'Voir et gérer toutes les demandes reçues.' },
				{ title: 'Leads / Contacts', desc: 'Clients ayant accepté une soumission.' },
				{ title: 'Articles Blog', desc: 'Voir les articles publiés sur le site.' },
				{ title: 'Services', desc: 'Liste des services affichés au public.' },
				{ title: 'Avis Clients', desc: 'Lire les témoignages clients publiés.' },
				{ title: 'Réglages', desc: 'Paramètres globaux (RBQ, contact, etc.).' }
			],
			quickActions: 'Actions rapides',
			openInbox: 'Ouvrir la boîte courriel',
			viewSite: 'Voir le site public',
			configuration: 'Configuration',
			configLabels: ['Téléphone', 'Courriel', 'Licence R.B.Q.', 'Région principale', 'Site public'],
			regionValue: 'Saint-Hubert-de-Rivière-du-Loup, Bas-Saint-Laurent',
			checkingSession: 'Vérification de la session…'
		},
		en: {
			title: 'Dashboard',
			subtitle: 'Overview of your Mini Excavations Érable activity.',
			adminSpace: 'Admin space',
			logout: 'Sign out',
			statSoumissions: 'Quotes',
			statSoumissionsValue: 'Email',
			statSoumissionsHint: 'Delivered via FormSubmit',
			statUrgence: '24/7 Emergency',
			statUrgenceValue: 'Active',
			statSite: 'Site',
			statSiteValue: 'Online',
			statRBQ: 'RBQ',
			statRBQHint: 'Active license',
			statVisitorsToday: 'Visitors today',
			statVisitors30: 'Visitors (30 days)',
			statPageviews: 'pageviews',
			statSoumissionsToday: 'Quotes today',
			last30: 'in last 30 days',
			topPages: 'Top pages',
			topReferrers: 'Traffic sources',
			noData: 'No data yet — check back after a few visits.',
			sections: [
				{ title: 'Quotes', desc: 'View and manage all submitted quotes.' },
				{ title: 'Leads / Contacts', desc: 'Clients who accepted a quote.' },
				{ title: 'Blog Articles', desc: 'View posts published on the site.' },
				{ title: 'Services', desc: 'Services displayed publicly.' },
				{ title: 'Client Reviews', desc: 'Read published testimonials.' },
				{ title: 'Settings', desc: 'Global settings (RBQ, contact, etc.).' }
			],
			quickActions: 'Quick actions',
			openInbox: 'Open the inbox',
			viewSite: 'View public site',
			configuration: 'Configuration',
			configLabels: ['Phone', 'Email', 'R.B.Q. License', 'Main region', 'Public site'],
			regionValue: 'Saint-Hubert-de-Rivière-du-Loup, Bas-Saint-Laurent',
			checkingSession: 'Verifying session…'
		},
		es: {
			title: 'Panel de control',
			subtitle: 'Visión general de su actividad en Mini Excavations Érable.',
			adminSpace: 'Espacio admin',
			logout: 'Cerrar sesión',
			statSoumissions: 'Cotizaciones',
			statSoumissionsValue: 'Correo',
			statSoumissionsHint: 'Entregadas vía FormSubmit',
			statUrgence: 'Urgencias 24/7',
			statUrgenceValue: 'Activo',
			statSite: 'Sitio',
			statSiteValue: 'En línea',
			statRBQ: 'RBQ',
			statRBQHint: 'Licencia activa',
			statVisitorsToday: 'Visitantes hoy',
			statVisitors30: 'Visitantes (30 días)',
			statPageviews: 'vistas',
			statSoumissionsToday: 'Cotizaciones hoy',
			last30: 'en 30 días',
			topPages: 'Páginas más vistas',
			topReferrers: 'Fuentes de tráfico',
			noData: 'Aún sin datos — vuelva tras algunas visitas.',
			sections: [
				{ title: 'Cotizaciones', desc: 'Ver y gestionar todas las solicitudes recibidas.' },
				{ title: 'Leads / Contactos', desc: 'Clientes que aceptaron una cotización.' },
				{ title: 'Artículos Blog', desc: 'Ver los artículos publicados en el sitio.' },
				{ title: 'Servicios', desc: 'Lista de servicios mostrados al público.' },
				{ title: 'Reseñas de clientes', desc: 'Leer los testimonios publicados.' },
				{ title: 'Ajustes', desc: 'Parámetros globales (RBQ, contacto, etc.).' }
			],
			quickActions: 'Acciones rápidas',
			openInbox: 'Abrir la bandeja de correo',
			viewSite: 'Ver el sitio público',
			configuration: 'Configuración',
			configLabels: ['Teléfono', 'Correo', 'Licencia R.B.Q.', 'Región principal', 'Sitio público'],
			regionValue: 'Saint-Hubert-de-Rivière-du-Loup, Bas-Saint-Laurent',
			checkingSession: 'Verificando la sesión…'
		}
	};

	onMount(async () => {
		const admin = await getCurrent();
		if (!admin) {
			goto('/mi/admin/login', { replaceState: true });
			return;
		}
		adminEmail = admin.email;
		checked = true;
		// load analytics in parallel; don't block page paint
		Promise.all([getSummary(), getTopPages(), getTopReferrers()]).then(([s, p, r]) => {
			stats = s;
			topPages = p;
			topReferrers = r;
			statsLoading = false;
		});
	});

	async function logout() {
		await apiLogout();
		goto('/mi/admin/login', { replaceState: true });
	}

	const sectionMeta = [
		{ icon: FileSignature, href: '/mi/admin/soumissions', external: false, accent: 'amber' },
		{ icon: Users, href: '/mi/admin/contacts', external: false, accent: 'blue' },
		{ icon: FileText, href: '/#blogs', external: false, accent: 'emerald' },
		{ icon: Wrench, href: '/#services', external: false, accent: 'orange' },
		{ icon: Star, href: '/urgences#avis', external: false, accent: 'purple' },
		{ icon: Settings, href: '#config', external: false, accent: 'zinc' }
	];

	$: configValues = [
		'+1 (514) 830-9973',
		'miniexcavationerable@gmail.com',
		'5823-7736-01',
		t.regionValue,
		'excavationserable.com'
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
				return { icon: 'bg-zinc-800 text-gray-700 dark:text-zinc-300' };
		}
	}
</script>

<svelte:head>
	<title>{t.title} — Mini Excavations Érable</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

{#if checked}
	<div class="min-h-screen bg-gray-50 dark:bg-white dark:bg-zinc-950 text-gray-900 dark:text-white">
		<main class="max-w-6xl w-full mx-auto px-4 sm:px-6 py-10 lg:py-14">
			<!-- Identity strip -->
			<div class="mb-8 flex items-center justify-between gap-4 flex-wrap">
				<div class="flex items-center gap-3">
					<div class="w-10 h-10 rounded-xl bg-[#febd17] flex items-center justify-center">
						<ShieldCheck class="w-5 h-5 text-black" />
					</div>
					<div>
						<p class="font-bold text-sm sm:text-base">{t.adminSpace}</p>
						{#if adminEmail}
							<p class="text-xs text-gray-500 dark:text-zinc-500">{adminEmail}</p>
						{/if}
					</div>
				</div>
				<button
					on:click={logout}
					class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 hover:border-gray-400 dark:hover:border-zinc-600 text-gray-700 dark:text-zinc-300 hover:text-gray-900 dark:text-white text-xs font-semibold transition-colors"
				>
					<LogOut class="w-3.5 h-3.5" />
					<span>{t.logout}</span>
				</button>
			</div>

			<!-- Heading -->
			<div class="mb-8">
				<h1 class="text-3xl sm:text-4xl font-black tracking-tight">{t.title}</h1>
				<p class="text-gray-600 dark:text-zinc-400 text-sm mt-1.5">{t.subtitle}</p>
			</div>

			<!-- Live stats strip (from /api/analytics/summary) -->
			<div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
				<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-4">
					<div class="flex items-center gap-2 text-gray-500 dark:text-zinc-500 text-xs mb-1">
						<Eye class="w-3.5 h-3.5" />
						{t.statVisitorsToday}
					</div>
					<div class="text-2xl font-black text-gray-900 dark:text-white">
						{statsLoading ? '…' : (stats?.today.visitors ?? 0)}
					</div>
					<div class="text-[10px] text-gray-400 dark:text-zinc-600 mt-0.5">
						{stats?.today.pageviews ?? 0} {t.statPageviews}
					</div>
				</div>
				<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-4">
					<div class="flex items-center gap-2 text-gray-500 dark:text-zinc-500 text-xs mb-1">
						<Inbox class="w-3.5 h-3.5" />
						{t.statSoumissionsToday}
					</div>
					<div class="text-2xl font-black text-[#febd17]">{statsLoading ? '…' : (stats?.today.soumissions ?? 0)}</div>
					<div class="text-[10px] text-gray-400 dark:text-zinc-600 mt-0.5">
						{stats?.last30.soumissions ?? 0} {t.last30}
					</div>
				</div>
				<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-4">
					<div class="flex items-center gap-2 text-gray-500 dark:text-zinc-500 text-xs mb-1">
						<TrendingUp class="w-3.5 h-3.5" />
						{t.statVisitors30}
					</div>
					<div class="text-2xl font-black text-emerald-500">{statsLoading ? '…' : (stats?.last30.visitors ?? 0)}</div>
					<div class="text-[10px] text-gray-400 dark:text-zinc-600 mt-0.5">
						{stats?.last30.pageviews ?? 0} {t.statPageviews}
					</div>
				</div>
				<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-4">
					<div class="flex items-center gap-2 text-gray-500 dark:text-zinc-500 text-xs mb-1">
						<Phone class="w-3.5 h-3.5" />
						{t.statUrgence}
					</div>
					<div class="text-xl font-black text-emerald-400">{t.statUrgenceValue}</div>
					<div class="text-[10px] text-gray-400 dark:text-zinc-600 mt-0.5">(514) 830-9973</div>
				</div>
			</div>

			<!-- Top pages + referrers (last 30d) -->
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-8">
				<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-4">
					<h3 class="text-sm font-bold mb-3 flex items-center gap-2"><BarChart3 class="w-4 h-4 text-[#febd17]" /> {t.topPages}</h3>
					{#if statsLoading}
						<p class="text-xs text-gray-400 dark:text-zinc-600">…</p>
					{:else if topPages.length === 0}
						<p class="text-xs text-gray-400 dark:text-zinc-600">{t.noData}</p>
					{:else}
						<ul class="space-y-1.5">
							{#each topPages.slice(0, 8) as p}
								<li class="flex items-center justify-between gap-3 text-xs">
									<span class="truncate text-gray-700 dark:text-zinc-300 font-mono">{p.path}</span>
									<span class="text-gray-500 dark:text-zinc-500 font-bold flex-shrink-0">{p.hits}</span>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
				<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-4">
					<h3 class="text-sm font-bold mb-3 flex items-center gap-2"><Globe class="w-4 h-4 text-[#febd17]" /> {t.topReferrers}</h3>
					{#if statsLoading}
						<p class="text-xs text-gray-400 dark:text-zinc-600">…</p>
					{:else if topReferrers.length === 0}
						<p class="text-xs text-gray-400 dark:text-zinc-600">{t.noData}</p>
					{:else}
						<ul class="space-y-1.5">
							{#each topReferrers.slice(0, 8) as r}
								<li class="flex items-center justify-between gap-3 text-xs">
									<span class="truncate text-gray-700 dark:text-zinc-300">{r.referrer}</span>
									<span class="text-gray-500 dark:text-zinc-500 font-bold flex-shrink-0">{r.hits}</span>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			</div>

			<!-- Sections grid -->
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
				{#each sectionMeta as section, i}
					{@const accent = accentClass(section.accent)}
					<a
						href={section.href}
						target={section.external ? '_blank' : undefined}
						rel={section.external ? 'noopener' : undefined}
						class="group relative bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 hover:border-[#febd17]/50 hover:bg-gray-50 dark:hover:bg-zinc-900/80 transition-all hover:-translate-y-0.5"
					>
						<div class="w-11 h-11 rounded-xl flex items-center justify-center mb-3 {accent.icon}">
							<svelte:component this={section.icon} class="w-5 h-5" />
						</div>
						<h3 class="font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-1.5">
							{t.sections[i].title}
							{#if section.external}
								<ExternalLink class="w-3.5 h-3.5 text-gray-500 dark:text-zinc-500 group-hover:text-gray-700 dark:text-zinc-300 transition-colors" />
							{/if}
						</h3>
						<p class="text-xs text-gray-600 dark:text-zinc-400 leading-relaxed">{t.sections[i].desc}</p>
					</a>
				{/each}
			</div>

			<!-- Quick actions -->
			<div class="mb-8 p-5 bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl">
				<h2 class="font-bold mb-3 flex items-center gap-2">
					<Mail class="w-4 h-4 text-[#febd17]" />
					{t.quickActions}
				</h2>
				<div class="flex flex-wrap gap-2">
					<a
						href="mailto:miniexcavationerable@gmail.com"
						class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#febd17] hover:bg-[#e5aa10] text-black font-semibold text-sm transition-colors"
					>
						<Mail class="w-4 h-4" />
						{t.openInbox}
					</a>
					<a
						href="/"
						class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 hover:border-gray-400 dark:hover:border-zinc-600 text-gray-700 dark:text-zinc-300 font-semibold text-sm transition-colors"
					>
						<Globe class="w-4 h-4" />
						{t.viewSite}
					</a>
					<a
						href="tel:+15148309973"
						class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 hover:border-gray-400 dark:hover:border-zinc-600 text-gray-700 dark:text-zinc-300 font-semibold text-sm transition-colors"
					>
						<Phone class="w-4 h-4" />
						(514) 830-9973
					</a>
				</div>
			</div>

			<!-- Configuration snapshot -->
			<section id="config" class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6">
				<div class="flex items-center gap-2 mb-4">
					<Settings class="w-4 h-4 text-[#febd17]" />
					<h2 class="font-bold">{t.configuration}</h2>
				</div>
				<dl class="divide-y divide-gray-200 dark:divide-zinc-800">
					{#each t.configLabels as label, i}
						<div class="flex items-center justify-between py-2.5 gap-4">
							<dt class="text-xs text-gray-500 dark:text-zinc-500 uppercase tracking-wider">{label}</dt>
							<dd class="text-sm text-gray-900 dark:text-white font-mono text-right break-all">{configValues[i]}</dd>
						</div>
					{/each}
				</dl>
			</section>
		</main>
	</div>
{:else}
	<div class="min-h-screen bg-gray-50 dark:bg-white dark:bg-zinc-950 text-gray-900 dark:text-white flex items-center justify-center">
		<p class="text-gray-500 dark:text-zinc-500 text-sm">{t.checkingSession}</p>
	</div>
{/if}
