<script lang="ts">
	// JSON-LD global schemas — used in layout (NOT meta tags)
	export let jsonLd: object[] = [];
</script>

<svelte:head>
	{#each jsonLd as schema}
		{@html `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</` + `script>`}
	{/each}
</svelte:head>
