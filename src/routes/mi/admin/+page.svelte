<script lang="ts">
	import {
		Users,
		Mail,
		FileText,
		Wrench,
		TrendingUp,
		Clock,
		ArrowUpRight,
		Inbox,
		Sparkles
	} from 'lucide-svelte';
	import { Badge } from '$lib/components/ui/badge';

	export let data;

	$: stats = data.stats;
	$: recentContacts = data.recentContacts;
	$: maxDaily = Math.max(1, ...data.dailyStats.map((d) => Number(d.c)));

	const cards = [
		{
			label: 'Nouveaux Leads',
			key: 'newContacts',
			icon: Inbox,
			color: 'from-yellow-400 to-orange-500',
			suffix: 'à traiter'
		},
		{
			label: 'Contacts (7 jours)',
			key: 'contacts7d',
			icon: TrendingUp,
			color: 'from-green-400 to-emerald-600',
			suffix: 'cette semaine'
		},
		{
			label: 'Contacts (30 jours)',
			key: 'contacts30d',
			icon: Clock,
			color: 'from-blue-400 to-indigo-600',
			suffix: 'ce mois'
		},
		{
			label: 'Total Contacts',
			key: 'totalContacts',
			icon: Users,
			color: 'from-purple-400 to-pink-600',
			suffix: 'historique'
		}
	] as const;

	function statusBadge(status: string) {
		const map: Record<string, { variant: any; label: string }> = {
			new: { variant: 'warning', label: 'Nouveau' },
			contacted: { variant: 'info', label: 'Contacté' },
			quoted: { variant: 'info', label: 'Devis envoyé' },
			won: { variant: 'success', label: 'Gagné' },
			lost: { variant: 'danger', label: 'Perdu' },
			archived: { variant: 'default', label: 'Archivé' }
		};
		return map[status] ?? { variant: 'default', label: status };
	}

	function formatDate(d: string | Date) {
		const date = new Date(d);
		return date.toLocaleString('fr-CA', {
			day: '2-digit',
			month: 'short',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
		<div>
			<h1 class="text-3xl md:text-4xl font-black tracking-tight flex items-center gap-3">
				<Sparkles class="w-8 h-8 text-[#febd17]" />
				Tableau de bord
			</h1>
			<p class="text-gray-500 dark:text-zinc-400 mt-1">
				Vue d'ensemble de votre activité commerciale
			</p>
		</div>
		<div class="flex gap-2">
			<a
				href="/mi/admin/contacts"
				class="px-4 py-2.5 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400 transition-colors flex items-center gap-2 shadow-lg shadow-yellow-500/20"
			>
				Voir tous les contacts <ArrowUpRight class="w-4 h-4" />
			</a>
		</div>
	</div>

	<!-- Stat cards -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
		{#each cards as card}
			<div class="relative overflow-hidden bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] transition-all">
				<div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br {card.color} opacity-10 rounded-full blur-3xl"></div>
				<div class="relative">
					<div class="flex items-center justify-between mb-4">
						<div class="w-11 h-11 rounded-xl bg-gradient-to-br {card.color} flex items-center justify-center shadow-lg">
							<svelte:component this={card.icon} class="w-5 h-5 text-white" />
						</div>
					</div>
					<p class="text-3xl font-black mb-1">{stats[card.key]}</p>
					<p class="text-sm font-medium text-gray-700 dark:text-zinc-300">{card.label}</p>
					<p class="text-xs text-gray-500 dark:text-zinc-500 mt-0.5">{card.suffix}</p>
				</div>
			</div>
		{/each}
	</div>

	<!-- Two columns -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<!-- Activity chart -->
		<div class="lg:col-span-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6">
			<div class="flex items-center justify-between mb-6">
				<div>
					<h2 class="text-lg font-bold">Activité (30 derniers jours)</h2>
					<p class="text-sm text-gray-500 dark:text-zinc-400">Contacts reçus par jour</p>
				</div>
			</div>

			{#if data.dailyStats.length === 0}
				<div class="h-48 flex items-center justify-center text-gray-400 dark:text-zinc-600 text-sm">
					Aucune donnée pour cette période
				</div>
			{:else}
				<div class="flex items-end gap-1 h-48">
					{#each data.dailyStats as d}
						{@const h = (Number(d.c) / maxDaily) * 100}
						<div class="flex-1 flex flex-col items-center gap-1 group" title={`${d.day}: ${d.c} contacts`}>
							<div class="w-full bg-gradient-to-t from-[#febd17] to-yellow-300 rounded-t-md transition-all group-hover:opacity-80" style="height: {h}%"></div>
							<span class="text-[9px] text-gray-400 dark:text-zinc-600 rotate-45 origin-left mt-2 hidden md:block">{d.day.slice(5)}</span>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Status breakdown -->
		<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6">
			<h2 class="text-lg font-bold mb-1">Répartition</h2>
			<p class="text-sm text-gray-500 dark:text-zinc-400 mb-6">Statut des contacts</p>

			{#if data.statusBreakdown.length === 0}
				<p class="text-sm text-gray-400 dark:text-zinc-600">Aucun contact</p>
			{:else}
				<div class="space-y-3">
					{#each data.statusBreakdown as s}
						{@const badge = statusBadge(s.status)}
						<div class="flex items-center justify-between">
							<Badge variant={badge.variant}>{badge.label}</Badge>
							<span class="font-bold text-lg">{s.c}</span>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<!-- Recent contacts -->
	<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6">
		<div class="flex items-center justify-between mb-6">
			<div>
				<h2 class="text-lg font-bold">Contacts récents</h2>
				<p class="text-sm text-gray-500 dark:text-zinc-400">Derniers messages reçus</p>
			</div>
			<a href="/mi/admin/contacts" class="text-sm text-[#febd17] hover:underline font-medium flex items-center gap-1">
				Tout voir <ArrowUpRight class="w-3 h-3" />
			</a>
		</div>

		{#if recentContacts.length === 0}
			<div class="py-12 text-center">
				<Mail class="w-12 h-12 text-gray-300 dark:text-zinc-700 mx-auto mb-3" />
				<p class="text-gray-500 dark:text-zinc-500">Aucun contact pour le moment</p>
			</div>
		{:else}
			<div class="space-y-2">
				{#each recentContacts as c}
					{@const badge = statusBadge(c.status)}
					<a
						href={`/mi/admin/contacts/${c.id}`}
						class="flex items-start gap-4 p-4 rounded-xl border border-gray-100 dark:border-zinc-800 hover:border-[#febd17] dark:hover:border-[#febd17] hover:bg-yellow-50 dark:hover:bg-yellow-500/5 transition-all"
					>
						<div class="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
							{c.name[0]?.toUpperCase()}
						</div>
						<div class="flex-1 min-w-0">
							<div class="flex items-center gap-2 flex-wrap">
								<p class="font-bold text-sm">{c.name}</p>
								<Badge variant={badge.variant}>{badge.label}</Badge>
								{#if c.serviceType}
									<Badge variant="outline">{c.serviceType}</Badge>
								{/if}
							</div>
							<p class="text-xs text-gray-500 dark:text-zinc-400 mt-0.5 truncate">{c.email}</p>
							<p class="text-sm text-gray-700 dark:text-zinc-300 mt-1 line-clamp-1">{c.message}</p>
						</div>
						<span class="text-xs text-gray-400 dark:text-zinc-600 flex-shrink-0 hidden sm:block">
							{formatDate(c.createdAt)}
						</span>
					</a>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Secondary stats -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
		<a href="/mi/admin/blogs" class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-[#febd17] transition-all group">
			<FileText class="w-8 h-8 text-[#febd17] mb-3" />
			<p class="text-3xl font-black">{stats.publishedBlogs}<span class="text-gray-300 dark:text-zinc-700 text-base font-normal">/{stats.totalBlogs}</span></p>
			<p class="text-sm font-medium text-gray-700 dark:text-zinc-300">Articles publiés</p>
		</a>

		<a href="/mi/admin/services" class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-[#febd17] transition-all group">
			<Wrench class="w-8 h-8 text-[#febd17] mb-3" />
			<p class="text-3xl font-black">{stats.totalServices}</p>
			<p class="text-sm font-medium text-gray-700 dark:text-zinc-300">Services actifs</p>
		</a>

		<a href="/mi/admin/settings" class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-[#febd17] transition-all group">
			<Sparkles class="w-8 h-8 text-[#febd17] mb-3" />
			<p class="text-base font-bold">Configurer</p>
			<p class="text-sm text-gray-500 dark:text-zinc-400">Personnaliser le site</p>
		</a>
	</div>
</div>
