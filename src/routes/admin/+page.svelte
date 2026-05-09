<script lang="ts">
	import { onMount } from 'svelte';
	import {
		supabase,
		fmtMoney,
		statutLabel,
		statutColor,
		type Soumission
	} from '$lib/supabase/client';
	import {
		FileText,
		Inbox,
		Loader2,
		CheckCircle2,
		ArrowRight,
		Plus,
		AlertCircle,
		ChevronRight
	} from 'lucide-svelte';

	let loading = true;
	let errorMsg = '';
	let total = 0;
	let counts: Record<string, number> = {
		nouvelle: 0,
		en_revision: 0,
		offerte: 0,
		contre_offre: 0,
		acceptee: 0,
		signee_par_les_deux: 0,
		rejetee: 0,
		expiree: 0
	};
	let recent: Soumission[] = [];

	onMount(async () => {
		try {
			const { count, error: cErr } = await supabase
				.from('soumissions')
				.select('*', { count: 'exact', head: true });
			if (cErr) throw cErr;
			total = count || 0;

			const { data: all, error: aErr } = await supabase
				.from('soumissions')
				.select('statut');
			if (aErr) throw aErr;
			for (const k of Object.keys(counts)) counts[k] = 0;
			(all || []).forEach((s: any) => {
				if (counts[s.statut] != null) counts[s.statut]++;
			});

			const { data: r, error: rErr } = await supabase
				.from('soumissions')
				.select('*')
				.order('created_at', { ascending: false })
				.limit(10);
			if (rErr) throw rErr;
			recent = (r || []) as Soumission[];
		} catch (e: any) {
			console.error(e);
			errorMsg = e?.message || 'Erreur lors du chargement';
		} finally {
			loading = false;
		}
	});

	$: nouvelles = counts.nouvelle + counts.en_revision;
	$: enCours = counts.offerte + counts.contre_offre;
	$: acceptees = counts.acceptee + counts.signee_par_les_deux;

	function fmtDate(s: string) {
		try {
			return new Date(s).toLocaleDateString('fr-CA', {
				day: '2-digit',
				month: 'short',
				year: 'numeric'
			});
		} catch {
			return s;
		}
	}
</script>

<svelte:head><title>Tableau de bord — Admin</title></svelte:head>

<div class="space-y-6">
	<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
		<div>
			<h1 class="text-2xl sm:text-3xl font-black">Tableau de bord</h1>
			<p class="text-sm text-zinc-500 mt-1">Aperçu des soumissions et activités récentes.</p>
		</div>
		<a
			href="/admin/soumissions"
			class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition"
		>
			<FileText class="h-4 w-4" /> Voir toutes les soumissions
		</a>
	</div>

	{#if errorMsg}
		<div class="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center gap-2">
			<AlertCircle class="h-4 w-4" />
			{errorMsg}
		</div>
	{/if}

	<!-- Stat cards -->
	<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
		<div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
			<div class="flex items-center justify-between mb-2">
				<span class="text-xs font-semibold uppercase tracking-wider text-zinc-500">Nouvelles</span>
				<Inbox class="h-4 w-4 text-blue-400" />
			</div>
			<div class="text-3xl font-black">
				{loading ? '—' : nouvelles}
			</div>
			<div class="text-xs text-zinc-500 mt-1">À traiter</div>
		</div>
		<div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
			<div class="flex items-center justify-between mb-2">
				<span class="text-xs font-semibold uppercase tracking-wider text-zinc-500">En cours</span>
				<Loader2 class="h-4 w-4 text-amber-400" />
			</div>
			<div class="text-3xl font-black">
				{loading ? '—' : enCours}
			</div>
			<div class="text-xs text-zinc-500 mt-1">Offertes / contre-offres</div>
		</div>
		<div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
			<div class="flex items-center justify-between mb-2">
				<span class="text-xs font-semibold uppercase tracking-wider text-zinc-500">Acceptées</span>
				<CheckCircle2 class="h-4 w-4 text-emerald-400" />
			</div>
			<div class="text-3xl font-black">
				{loading ? '—' : acceptees}
			</div>
			<div class="text-xs text-zinc-500 mt-1">Acceptées / signées</div>
		</div>
		<div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
			<div class="flex items-center justify-between mb-2">
				<span class="text-xs font-semibold uppercase tracking-wider text-zinc-500">Total</span>
				<FileText class="h-4 w-4 text-zinc-400" />
			</div>
			<div class="text-3xl font-black">
				{loading ? '—' : total}
			</div>
			<div class="text-xs text-zinc-500 mt-1">Toutes soumissions</div>
		</div>
	</div>

	<!-- Recent list -->
	<div class="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
		<div class="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
			<h2 class="text-sm font-bold uppercase tracking-wider text-zinc-300">
				Soumissions récentes
			</h2>
			<a
				href="/admin/soumissions"
				class="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition"
			>
				Voir tout <ArrowRight class="h-3 w-3" />
			</a>
		</div>

		{#if loading}
			<div class="p-5 space-y-3">
				{#each Array(5) as _}
					<div class="h-12 bg-zinc-800 rounded animate-pulse"></div>
				{/each}
			</div>
		{:else if recent.length === 0}
			<div class="p-10 text-center text-zinc-500">
				<FileText class="h-10 w-10 mx-auto mb-3 opacity-40" />
				<p class="text-sm">Aucune soumission pour le moment.</p>
			</div>
		{:else}
			<ul class="divide-y divide-zinc-800">
				{#each recent as s}
					<li>
						<a
							href={`/admin/soumissions/${s.id}`}
							class="flex items-center gap-4 px-5 py-4 hover:bg-zinc-800/50 transition"
						>
							<div class="flex-1 min-w-0">
								<div class="flex items-center gap-2 mb-1">
									<span class="font-semibold text-white truncate">{s.client_nom}</span>
									{#if s.numero}
										<span class="text-xs text-zinc-500">· {s.numero}</span>
									{/if}
								</div>
								<div class="text-xs text-zinc-500 truncate">
									{s.projet_type || 'Projet'} · {s.client_email} · {fmtDate(s.created_at)}
								</div>
							</div>
							<div class="hidden sm:block text-right">
								<div class="text-sm font-semibold text-white">{fmtMoney(s.total || 0)}</div>
							</div>
							<span
								class="hidden md:inline-flex items-center px-2 py-1 rounded text-[10px] font-semibold border {statutColor(
									s.statut
								)}"
							>
								{statutLabel(s.statut)}
							</span>
							<ChevronRight class="h-4 w-4 text-zinc-600 flex-shrink-0" />
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
