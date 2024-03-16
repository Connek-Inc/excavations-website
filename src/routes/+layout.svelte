<script lang="ts">
	import '../app.postcss';
	import TopBar from '$lib/TopBar.svelte';
	import logo from "$lib/logo.png"
    import { setContext } from 'svelte';

	const language = 'fr'
	setContext('language', language)

	let menuOptions;

	if (language=='en') {
		menuOptions = [{
			text: 'Services',
			link: '#services' 
		}, {
			text: 'About Us',
			link: '#about-us' 
		}, {
			text: 'Contact',
			link: '#contact' 
		}]
	} else if (language=='fr') {
		menuOptions = [{
			text: 'Services',
			link: '#services' 
		}, {
			text: 'À propos',
			link: '#about-us' 
		}, {
			text: 'Contact',
			link: '#contact' 
		}]
	}

	




	// Font Afacad sans-serif
</script>


<TopBar menuOptions={menuOptions} logo={logo}/>

<slot />



