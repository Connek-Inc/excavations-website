<script lang="ts">
	import SignaturePad from './SignaturePad.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Eraser, PenLine } from 'lucide-svelte';
	import { validateForSignature } from '$lib/soumission/statut';
	import { createEventDispatcher } from 'svelte';
	import type { Modalite, Statut } from '$lib/soumission/types';

	export let role: 'entrepreneur' | 'client';
	export let label: string;
	export let defaultName: string;
	export let caption: string;
	export let imageUrl: string | null | undefined = null;
	export let signedAt: string | Date | null | undefined = null;
	export let signable = false;
	export let signEndpoint: string | null = null;
	export let parent: {
		statut: Statut;
		clientNom?: string | null;
		clientAdresse?: string | null;
		projetAdresse?: string | null;
		dateSoumission?: string | Date | null;
		sousTotal?: string | number | null;
		modalites?: Modalite[] | null;
		sentAt?: string | Date | null;
	};

	const dispatch = createEventDispatcher<{ signed: { role: 'client' | 'entrepreneur' } }>();

	let pad: SignaturePad;
	let editing = false;
	let nom = defaultName;
	let busy = false;
	let errorMsg = '';

	function shortDate(d: string | Date | null | undefined): string {
		if (!d) return '____________________';
		const dt = typeof d === 'string' ? new Date(d) : d;
		if (isNaN(dt.getTime())) return '____________________';
		return dt.toLocaleDateString('fr-CA');
	}

	async function save() {
		errorMsg = '';
		if (!nom.trim()) {
			errorMsg = 'Nom du signataire requis.';
			return;
		}
		if (pad.isEmpty()) {
			errorMsg = 'Veuillez signer dans la zone.';
			return;
		}
		const guard = validateForSignature(
			{
				statut: parent.statut,
				clientNom: parent.clientNom,
				clientAdresse: parent.clientAdresse,
				projetAdresse: parent.projetAdresse,
				dateSoumission: parent.dateSoumission,
				sousTotal: parent.sousTotal,
				modalites: parent.modalites,
				sentAt: parent.sentAt
			},
			role
		);
		if (guard) {
			errorMsg = guard;
			return;
		}
		if (!signEndpoint) {
			errorMsg = 'Endpoint de signature manquant.';
			return;
		}
		busy = true;
		const dataUrl = pad.toDataURL();
		const fd = new FormData();
		fd.append('role', role);
		fd.append('nom', nom.trim());
		fd.append('signature', dataUrl);
		try {
			const res = await fetch(signEndpoint, { method: 'POST', body: fd });
			if (!res.ok) {
				const txt = await res.text().catch(() => '');
				errorMsg = txt || `Erreur ${res.status}`;
				busy = false;
				return;
			}
			editing = false;
			dispatch('signed', { role });
		} catch (e) {
			errorMsg = (e as Error).message || 'Erreur réseau';
		} finally {
			busy = false;
		}
	}
</script>

<div>
	<div class="text-xs font-bold uppercase text-gray-500 dark:text-zinc-400">{label}</div>
	{#if imageUrl && !editing}
		<img src={imageUrl} alt={`Signature ${label}`} class="h-20 object-contain bg-white rounded" />
	{:else if signable && editing}
		<div class="space-y-2">
			<Input bind:value={nom} placeholder="Nom complet" />
			<SignaturePad bind:this={pad} />
			{#if errorMsg}
				<p class="text-xs text-red-600">{errorMsg}</p>
			{/if}
			<div class="flex gap-2">
				<Button type="button" size="sm" variant="outline" on:click={() => pad?.clear()}>
					<Eraser class="mr-2 h-4 w-4" />Effacer
				</Button>
				<Button type="button" size="sm" on:click={save} disabled={busy}>
					<PenLine class="mr-2 h-4 w-4" />
					{busy ? 'Enregistrement…' : 'Enregistrer'}
				</Button>
				<Button type="button" size="sm" variant="ghost" on:click={() => (editing = false)}>
					Annuler
				</Button>
			</div>
		</div>
	{:else}
		<div class="h-20" />
	{/if}
	<div class="border-t border-gray-200 dark:border-zinc-800 pt-2 text-sm">
		{defaultName || 'Nom'}
	</div>
	<div class="text-xs text-gray-500 dark:text-zinc-400">{caption}</div>
	<div class="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-zinc-400">
		<span>Date : {shortDate(signedAt)}</span>
		{#if signable && !editing}
			<button
				type="button"
				class="h-auto p-0 text-[#febd17] underline-offset-4 hover:underline font-medium"
				on:click={() => (editing = true)}
			>
				{imageUrl ? 'Refaire la signature' : 'Signer ici'}
			</button>
		{/if}
	</div>
</div>
