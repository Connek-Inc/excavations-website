<script lang="ts">
	import BlogEditor from '$lib/components/BlogEditor.svelte';

	export let data;
	export let form;
</script>

<BlogEditor blog={data.blog} {form} />
