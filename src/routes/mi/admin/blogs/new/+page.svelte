<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import BlogEditor from '$lib/components/BlogEditor.svelte';
	import { getCurrent } from '$lib/admin/clients';

	let checked = false;

	onMount(async () => {
		const admin = await getCurrent();
		if (!admin) {
			goto('/mi/admin/login', { replaceState: true });
			return;
		}
		checked = true;
	});
</script>

<svelte:head><title>Nouvel article — Admin</title><meta name="robots" content="noindex, nofollow" /></svelte:head>

{#if checked}
	<BlogEditor />
{/if}
