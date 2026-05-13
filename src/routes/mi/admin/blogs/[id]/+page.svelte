<script lang="ts">
	import BlogEditor from '$lib/components/BlogEditor.svelte';
	export let data: any = {};
	export let form;
</script>

<svelte:head><title>Modifier article — Admin</title></svelte:head>

<BlogEditor blog={data.blog} {form} />
