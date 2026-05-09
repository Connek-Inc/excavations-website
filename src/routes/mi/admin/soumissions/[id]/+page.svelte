<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import SoumissionForm from '$lib/soumission/components/SoumissionForm.svelte';
	import SoumissionPreview from '$lib/soumission/components/SoumissionPreview.svelte';
	import type { SoumissionFormState } from '$lib/soumission/types';
	import Button from '$lib/components/ui/button/button.svelte';
	import {
		ArrowLeft,
		Save,
		Eye,
		Pencil,
		Send,
		Download,
		ExternalLink,
		Trash2,
		RotateCcw,
		Link as LinkIcon,
		Check
	} from 'lucide-svelte';
	import { STATUT_COLORS } from '$lib/soumission/statut';
	import { downloadPdf } from '$lib/soumission/pdf';
	import type { Modalite, Article, SectionsMap } from '$lib/soumission/types';

	export let data;
	export let form;

	let mode: 'edit' | 'preview' = 'edit';
	let saving = false;
	let savedRecently = false;
	let copied = false;

	$: s = data.soumission;
	$: state = {
		numero: s.numero ?? '',
		clientNom: s.clientNom ?? '',
		clientAdresse: s.clientAdresse ?? '',
		projetAdresse: s.projetAdresse ?? '',
		clientEmail: s.clientEmail ?? '',
		clientPhone: s.clientPhone ?? '',
		dateSoumission: s.dateSoumission ?? '',
		notes: s.notes ?? '',
		sousTotal: Number(s.sousTotal),
		modalites: (s.modalites ?? []) as Modalite[],
		articles: (s.articles ?? []) as Article[],
		sections: (s.sections ?? {}) as SectionsMap
	} satisfies SoumissionFormState;

	let formEl: HTMLFormElement;
	let payloadJson = '';

	function submitSave() {
		payloadJson = JSON.stringify(state);
		saving = true;
		formEl.requestSubmit();
	}

	$: publicUrl = typeof window !== 'undefined' ? `${window.location.origin}/soumission/${s.token}` : `/soumission/${s.token}`;

	async function copyLink() {
		try {
			await navigator.clipboard.writeText(publicUrl);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch {
			/* ignore */
		}
	}

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

<svelte:head><title>{s.numero || `Soumission #${s.id}`} — Admin</title></svelte:head>

<div class="space-y-6">
	<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
		<div class="flex items-center gap-3">
			<a
				href="/mi/admin/soumissions"
				class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
				title="Retour"
			>
				<ArrowLeft class="w-5 h-5" />
			</a>
			<div>
				<h1 class="text-2xl md:text-3xl font-black flex items-center gap-3">
					{s.numero || `Soumission #${s.id}`}
					<span class="text-xs px-2 py-0.5 rounded-full font-bold {STATUT_COLORS[s.statut]}">
						{s.statut}
					</span>
				</h1>
				<p class="text-sm text-gray-500 dark:text-zinc-400">{s.clientNom || 'Client à définir'}</p>
			</div>
		</div>
		<div class="flex flex-wrap gap-2">
			<button
				type="button"
				on:click={copyLink}
				class="px-3 py-2 rounded-lg text-sm font-medium border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 inline-flex items-center gap-2"
				title="Copier le lien client"
			>
				{#if copied}
					<Check class="w-4 h-4 text-green-500" /> Copié
				{:else}
					<LinkIcon class="w-4 h-4" /> Lien client
				{/if}
			</button>
			<a
				href={`/soumission/${s.token}`}
				target="_blank"
				rel="noopener"
				class="px-3 py-2 rounded-lg text-sm font-medium border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 inline-flex items-center gap-2"
			>
				<ExternalLink class="w-4 h-4" /> Aperçu public
			</a>
			<button
				type="button"
				on:click={handleDownload}
				class="px-3 py-2 rounded-lg text-sm font-medium border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 inline-flex items-center gap-2"
			>
				<Download class="w-4 h-4" /> PDF
			</button>
		</div>
	</div>

	<div class="flex items-center justify-between">
		<div class="inline-flex rounded-lg border border-gray-200 dark:border-zinc-700 overflow-hidden">
			<button
				type="button"
				on:click={() => (mode = 'edit')}
				class="px-3 py-1.5 text-sm font-medium {mode === 'edit'
					? 'bg-[#febd17] text-black'
					: 'bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800'}"
			>
				<Pencil class="w-4 h-4 inline mr-1" /> Édition
			</button>
			<button
				type="button"
				on:click={() => (mode = 'preview')}
				class="px-3 py-1.5 text-sm font-medium {mode === 'preview'
					? 'bg-[#febd17] text-black'
					: 'bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800'}"
			>
				<Eye class="w-4 h-4 inline mr-1" /> Aperçu
			</button>
		</div>
		<div class="flex items-center gap-2">
			{#if savedRecently}
				<span class="text-xs text-green-600 dark:text-green-400 inline-flex items-center gap-1">
					<Check class="w-3.5 h-3.5" /> Enregistré
				</span>
			{/if}
			{#if mode === 'edit'}
				<Button on:click={submitSave} disabled={saving}>
					<Save class="mr-2 h-4 w-4" />
					{saving ? 'Enregistrement…' : 'Enregistrer'}
				</Button>
			{/if}
		</div>
	</div>

	<form
		bind:this={formEl}
		method="POST"
		action="?/save"
		use:enhance={() => {
			return async ({ update, result }) => {
				saving = false;
				if (result.type === 'success') {
					savedRecently = true;
					setTimeout(() => (savedRecently = false), 2500);
					await invalidateAll();
				}
				await update({ reset: false });
			};
		}}
	>
		<input type="hidden" name="payload" value={payloadJson} />
	</form>

	{#if form?.error}
		<div class="rounded-lg border border-red-200 bg-red-50 dark:bg-red-500/10 dark:border-red-500/30 p-3 text-sm text-red-700 dark:text-red-400">
			{form.error}
		</div>
	{/if}

	{#if mode === 'edit'}
		<SoumissionForm bind:state />

		<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 space-y-4">
			<h2 class="font-bold text-lg">Workflow & actions</h2>

			<div class="grid gap-3 sm:grid-cols-2">
				<form
					method="POST"
					action="?/markSent"
					use:enhance={() => async ({ update }) => await update()}
				>
					<button
						type="submit"
						disabled={s.statut !== 'Brouillon'}
						class="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
					>
						<Send class="w-4 h-4" /> Marquer comme envoyée
					</button>
				</form>

				<form
					method="POST"
					action="?/resetStatut"
					use:enhance={() => async ({ update }) => await update()}
					on:submit={(e) => {
						if (!confirm('Réinitialiser la soumission (efface signatures et statut) ?')) e.preventDefault();
					}}
				>
					<button
						type="submit"
						class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 inline-flex items-center justify-center gap-2"
					>
						<RotateCcw class="w-4 h-4" /> Réinitialiser à Brouillon
					</button>
				</form>
			</div>

			<div class="rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 p-3 text-xs">
				<div class="font-bold mb-1">Lien client</div>
				<code class="block break-all text-[11px] text-gray-600 dark:text-zinc-400">{publicUrl}</code>
			</div>

			{#if data.signatures.length > 0}
				<div>
					<h3 class="font-bold mb-2 text-sm">Historique des signatures</h3>
					<ul class="space-y-1 text-xs">
						{#each data.signatures as sig}
							<li class="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 pb-1">
								<span>
									<strong class="capitalize">{sig.role}</strong> — {sig.nomSignataire}
								</span>
								<span class="text-gray-500 dark:text-zinc-500">
									{new Date(sig.createdAt).toLocaleString('fr-CA')}
								</span>
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			<form
				method="POST"
				action="?/delete"
				use:enhance
				on:submit={(e) => {
					if (!confirm('Supprimer définitivement cette soumission ?')) e.preventDefault();
				}}
				class="pt-2 border-t border-gray-200 dark:border-zinc-800"
			>
				<button
					type="submit"
					class="px-4 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 inline-flex items-center gap-2"
				>
					<Trash2 class="w-4 h-4" /> Supprimer la soumission
				</button>
			</form>
		</div>
	{:else}
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
			signableRoles={['entrepreneur']}
			signEndpoint={`/mi/admin/soumissions/${s.id}/sign`}
			on:signed={() => invalidateAll()}
		/>
	{/if}
</div>
