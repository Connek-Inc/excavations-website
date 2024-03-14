<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import TopBar from '$lib/TopBar.svelte';
	import logo from "$lib/logo.png"

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


<TopBar menuOptions={menuOptions} logo={logo}/>

<slot />



