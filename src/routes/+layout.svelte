<script lang="ts">
	import '../app.postcss';
	import TopBar from '$lib/TopBar.svelte';
	import logo from "$lib/logo.png"
    import { setContext } from 'svelte';
	import { Modal, initializeStores } from "@skeletonlabs/skeleton"

	initializeStores()

	const language = 'fr'
	setContext('language', language)
	setContext('theme', {
		primary: '#febd17',
		secondary: 'black',
		tertiary: 'white'
	})

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

<Modal/>

<TopBar menuOptions={menuOptions} logo={logo}/>

<slot />



