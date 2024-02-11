<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import TopBar from '$lib/TopBar.svelte';


	const menuOptions = ['Services', 'About Us', 'Contact']

	// Font Afacad sans-serif
</script>


<TopBar menuOptions={menuOptions}/>

<slot />



