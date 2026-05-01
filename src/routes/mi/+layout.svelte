<script lang="ts">
	import '../../app.postcss';
	import { onMount } from 'svelte';
	import { theme } from '$lib/store/store';

	onMount(() => {
		const saved = localStorage.getItem('mi_theme') || 'dark';
		theme.set(saved);
		theme.subscribe((v) => {
			if (v === 'dark') document.documentElement.classList.add('dark');
			else document.documentElement.classList.remove('dark');
			localStorage.setItem('mi_theme', v);
		});
	});
</script>

<svelte:head>
	<title>Panel - Mini Excavations Érable</title>
	<meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
</svelte:head>

<slot />
