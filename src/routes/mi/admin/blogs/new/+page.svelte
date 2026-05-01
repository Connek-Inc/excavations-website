<script lang="ts">
	import BlogEditor from '$lib/components/BlogEditor.svelte';

	export let form;
</script>

<BlogEditor isNew={true} {form} />
