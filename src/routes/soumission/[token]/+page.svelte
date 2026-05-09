<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import SoumissionPreview from '$lib/soumission/components/SoumissionPreview.svelte';
	import { downloadPdf } from '$lib/soumission/pdf';
	import { Download, ShieldCheck } from 'lucide-svelte';
	import { COMPANY } from '$lib/soumission/company';
	import type { Modalite, Article, SectionsMap } from '$lib/soumission/types';

	export let data;

	$: s = data.soumission;
	$: clientCanSign = s.statut === 'Envoyée' && !s.clientSignature;

	async function handleDownload() {
		await downloadPdf({
			numero: s.numero,
			clientNom: s.clientNom,
			clientAdresse: s.clientAdresse,
			projetAdresse: s.projetAdresse,
			dateSoumission: s.dateSoumission,
			sousTotal: s.sousTotal,
			notes: s.notes,
			modalites: s.modalites as Modalite[],
			articles: s.articles as Article[],
			sections: s.sections as SectionsMap,
			entrepreneurNom: s.entrepreneurNom,
			entrepreneurSignature: s.entrepreneurSignature,
			entrepreneurSignedAt: s.entrepreneurSignedAt,
			clientSignataireNom: s.clientSignataireNom,
			clientSignature: s.clientSignature,
			clientSignedAt: s.clientSignedAt
		});
	}
</script>

<svelte:head>
	<title>Soumission {s.numero ?? `#${s.id}`} — {COMPANY.name}</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main class="bg-gray-50 dark:bg-zinc-950 min-h-screen py-6 sm:py-10">
	<div class="max-w-4xl mx-auto px-4 space-y-4">
		<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4">
			<div class="flex items-center gap-3 text-sm">
				<ShieldCheck class="w-5 h-5 text-[#febd17]" />
				<div>
					<p class="font-bold">{COMPANY.name}</p>
					<p class="text-xs text-gray-500 dark:text-zinc-400">RBQ {COMPANY.rbq} • {COMPANY.phone}</p>
				</div>
			</div>
			<div class="flex flex-wrap gap-2">
				<button
					type="button"
					on:click={handleDownload}
					class="px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 inline-flex items-center gap-2"
				>
					<Download class="w-4 h-4" /> Télécharger PDF
				</button>
			</div>
		</div>

		{#if clientCanSign}
			<div class="rounded-2xl border-2 border-[#febd17] bg-[#febd17]/10 p-4 text-sm">
				<p class="font-bold mb-1">Signature requise</p>
				<p class="text-gray-700 dark:text-zinc-300">
					Veuillez prendre connaissance de la soumission ci-dessous et signer dans la zone
					« Client » au bas du document pour l'accepter.
				</p>
			</div>
		{:else if s.statut === 'Signée'}
			<div class="rounded-2xl border-2 border-green-300 bg-green-50 dark:bg-green-500/10 dark:border-green-500/30 p-4 text-sm">
				<p class="font-bold text-green-700 dark:text-green-400 mb-1">Soumission signée</p>
				<p class="text-gray-700 dark:text-zinc-300">
					Le contrat est complet. Conservez ce document pour vos archives.
				</p>
			</div>
		{:else if s.statut === 'Acceptée'}
			<div class="rounded-2xl border-2 border-blue-300 bg-blue-50 dark:bg-blue-500/10 dark:border-blue-500/30 p-4 text-sm">
				<p class="font-bold text-blue-700 dark:text-blue-400 mb-1">Soumission acceptée</p>
				<p class="text-gray-700 dark:text-zinc-300">
					Merci ! La soumission est en attente de la signature de l'entrepreneur.
				</p>
			</div>
		{/if}

		<SoumissionPreview
			s={{
				id: s.id,
				token: s.token,
				numero: s.numero,
				statut: s.statut,
				clientNom: s.clientNom,
				clientAdresse: s.clientAdresse,
				projetAdresse: s.projetAdresse,
				dateSoumission: s.dateSoumission,
				notes: s.notes,
				sousTotal: s.sousTotal,
				modalites: s.modalites,
				articles: s.articles,
				sections: s.sections,
				entrepreneurNom: s.entrepreneurNom,
				entrepreneurSignature: s.entrepreneurSignature,
				entrepreneurSignedAt: s.entrepreneurSignedAt,
				clientSignataireNom: s.clientSignataireNom,
				clientSignature: s.clientSignature,
				clientSignedAt: s.clientSignedAt,
				sentAt: s.sentAt
			}}
			signableRoles={clientCanSign ? ['client'] : []}
			signEndpoint={`/soumission/${s.token}/sign`}
			on:signed={() => invalidateAll()}
		/>
	</div>
</main>
