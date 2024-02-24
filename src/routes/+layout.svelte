<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import TopBar from '$lib/TopBar.svelte';


	const menuOptions = [{
		text: 'Services',
		link: '#services' 
	}, {
		text: 'About Us',
		link: '#about-us' 
	}, {
		text: 'Contact',
		link: '#contact' 
	}]

	// Font Afacad sans-serif
</script>


<TopBar menuOptions={menuOptions} />

<slot />



