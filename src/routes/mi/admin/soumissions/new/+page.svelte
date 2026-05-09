<script lang="ts">
	import SoumissionForm from '$lib/soumission/components/SoumissionForm.svelte';
	import type { SoumissionFormState } from '$lib/soumission/types';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ArrowLeft, Save } from 'lucide-svelte';

	export let data;

	let state: SoumissionFormState = { ...data.defaults };
	let payloadJson = '';
	let formEl: HTMLFormElement;

	function submitForm() {
		payloadJson = JSON.stringify(state);
		formEl.requestSubmit();
	}
</script>

<svelte:head><title>Nouvelle soumission — Admin</title></svelte:head>

<div class="space-y-6">
	<div class="flex items-center justify-between gap-3">
		<div class="flex items-center gap-3">
			<a
				href="/mi/admin/soumissions"
				class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
				title="Retour"
			>
				<ArrowLeft class="w-5 h-5" />
			</a>
			<h1 class="text-2xl md:text-3xl font-black">Nouvelle soumission</h1>
		</div>
		<Button on:click={submitForm}>
			<Save class="mr-2 h-4 w-4" /> Créer
		</Button>
	</div>

	<form bind:this={formEl} method="POST">
		<input type="hidden" name="payload" value={payloadJson} />
	</form>

	<SoumissionForm bind:state />

	<div class="flex justify-end">
		<Button on:click={submitForm} size="lg">
			<Save class="mr-2 h-4 w-4" /> Créer la soumission
		</Button>
	</div>
</div>
