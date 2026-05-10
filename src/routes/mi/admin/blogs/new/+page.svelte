<script lang="ts">
	import BlogEditor from '$lib/components/BlogEditor.svelte';
	export let form;
</script>

<svelte:head><title>Nouvel article — Admin</title></svelte:head>

<BlogEditor {form} />
