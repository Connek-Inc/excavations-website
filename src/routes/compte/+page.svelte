<script lang="ts">
	import {
		ArrowLeft,
		FileText,
		Plus,
		LogOut,
		User as UserIcon,
		ChevronRight,
		Shield
	} from 'lucide-svelte';
	import { fmtMoney, statutLabel, statutColor } from '$lib/soumissions/utils';
	import type { PageData } from './$types';

	export let data: PageData;

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

<svelte:head>
	<title>Mon compte — Mini Excavations Érable</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="min-h-screen bg-zinc-950 text-white">
	<header class="border-b border-zinc-800 bg-zinc-950/95 backdrop-blur sticky top-0 z-30">
		<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
			<a href="/" class="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-amber-400 transition">
				<ArrowLeft class="h-4 w-4" /> Retour au site
			</a>
			<div class="flex items-center gap-3">
				<div class="text-right hidden sm:block">
					<div class="text-xs text-zinc-500">Connecté</div>
					<div class="text-sm text-white font-medium">{data.client.name}</div>
				</div>
				<form method="POST" action="/compte/logout">
					<button
						type="submit"
						class="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-700 hover:border-red-500/40 hover:text-red-400 text-zinc-400 text-xs transition"
					>
						<LogOut class="h-3.5 w-3.5" /> Déconnexion
					</button>
				</form>
			</div>
		</div>
	</header>

	<main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
		<div class="flex items-start justify-between gap-4 mb-8">
			<div>
				<div class="flex items-center gap-3 mb-2">
					<div class="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
						<UserIcon class="h-5 w-5 text-amber-500" />
					</div>
					<div>
						<h1 class="text-2xl sm:text-3xl font-black">Bonjour, {data.client.name}</h1>
						<p class="text-xs text-zinc-500">{data.client.email}</p>
					</div>
				</div>
			</div>
			<a
				href="/soumission"
				class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition shadow-lg shadow-amber-500/20"
			>
				<Plus class="h-4 w-4" /> Nouvelle demande
			</a>
		</div>

		<section class="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
			<div class="p-5 border-b border-zinc-800 flex items-center gap-2">
				<FileText class="h-4 w-4 text-amber-500" />
				<h2 class="font-bold">Mes soumissions</h2>
				<span class="text-xs text-zinc-500 ml-auto">{data.soumissions.length}</span>
			</div>

			{#if data.soumissions.length === 0}
				<div class="p-12 text-center text-zinc-500">
					<FileText class="h-12 w-12 mx-auto mb-3 opacity-40" />
					<p class="text-sm mb-4">Aucune soumission pour le moment.</p>
					<a
						href="/soumission"
						class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition"
					>
						<Plus class="h-4 w-4" /> Faire une demande
					</a>
				</div>
			{:else}
				<ul class="divide-y divide-zinc-800">
					{#each data.soumissions as s}
						<li>
							<a
								href={`/soumission/${s.client_token}`}
								class="flex items-center gap-4 p-5 hover:bg-zinc-800/40 transition"
							>
								<div class="flex-1 min-w-0">
									<div class="flex items-center gap-2 mb-1">
										<span class="font-semibold text-white truncate">
											{s.projet_type || 'Soumission'}
										</span>
										{#if s.numero}
											<span class="text-xs text-zinc-500">· N° {s.numero}</span>
										{/if}
									</div>
									<div class="text-xs text-zinc-500 truncate">{fmtDate(s.created_at)}</div>
								</div>
								<div class="text-right">
									<div class="text-sm font-semibold text-white mb-1">
										{fmtMoney(s.total || 0)}
									</div>
									<span
										class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border {statutColor(
											s.statut
										)}"
									>
										{statutLabel(s.statut)}
									</span>
								</div>
								<ChevronRight class="h-4 w-4 text-zinc-600 flex-shrink-0" />
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		</section>

		<div class="mt-6 text-center text-xs text-zinc-500 flex items-center justify-center gap-2">
			<Shield class="h-3 w-3 text-amber-500" />
			Mini Excavations Érable Inc. — RBQ 5823-7736-01
		</div>
	</main>
</div>
