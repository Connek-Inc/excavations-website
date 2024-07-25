<script lang="ts">
	import '../app.postcss';
	import TopBar from '$lib/TopBar.svelte';
	import logo from "$lib/logo.png"
    import { setContext } from 'svelte';
	import { getContext } from 'svelte';
	import { language } from '../lib/store/store';

	/*const language = 'en' /* Global Variable SEO Optimization */
	// Set default language
	//let language = 'en'
	//setContext('language', language)
	//let language = getContext('language')

	let lang
    language.subscribe(value => {
        lang = value
    })
	//console.log('test layout :', lang) Debug purpose

	let menuOptions, title, description, keywords: string;

	if (lang=='en') {
		menuOptions = [{
			text: 'Services',
			link: '#services' 
		}, {
			text: 'About Us',
			link: '#about-us' 
		}, {
			text: 'Contact',
			link: '#contact' 
		}],
		title = 'Trusted Excavation Services',
		description = 'Mini Excavations Érable offers premium quality excavation services. Contact us for quotes and partnership opportunities. Certified and reliable.',
		keywords = 'excavations, erable, services, certified, French drain installation, Waterproofing solutions, Foundation repair services, Residential excavation, Basement waterproofing, Sewer line repair, Camera inspection services, Drainage solutions, Foundation crack repair, Sump pump installation'
	} else if (lang=='fr') {
		menuOptions = [{
			text: 'Services',
			link: '#services' 
		}, {
			text: 'À propos',
			link: '#about-us' 
		}, {
			text: 'Contact',
			link: '#contact' 
		}],
		title = "Service d'excavation de confiance"
		description = "Mini Excavations Érable offre des services d'excavation de première qualité. Contactez-nous pour des devis et opportunités de partenariat. Certifié et fiable.",
		keywords = "excavations, érable, services, certifie, Installation de drain français, Solutions d'imperméabilisation, Réparation de fondations, Excavation résidentielleImperméabilisation de sous-sol, Réparation de ligne d'égout, Services d'inspection par caméra, Solutions de drainage, Réparation de fissures de fondationInstallation de pompe de puisard"
	}

	




	// Font Afacad sans-serif
</script>

<html lang="{$language}"> <!--SEO Optimization-->
</html>
<svelte:head>
	{#if $language == 'fr'}
	<title>Mini Excavations Érable - Service d'excavation de confiance</title>
	<meta name="description" content="Mini Excavations Érable offre des services d'excavation de première qualité. Contactez-nous pour des devis et opportunités de partenariat. Certifié et fiable." />
	<meta name="keywords" content="excavations, érable, services, certifie, Installation de drain français, Solutions d'imperméabilisation, Réparation de fondations, Excavation résidentielleImperméabilisation de sous-sol, Réparation de ligne d'égout, Services d'inspection par caméra, Solutions de drainage, Réparation de fissures de fondationInstallation de pompe de puisard" /><!--SEO Optimization-->
	{:else}
	<title>Mini Excavations Érable - Trusted Excavation Services</title>
	<meta name="description" content= 'Mini Excavations Érable offers premium quality excavation services. Contact us for quotes and partnership opportunities. Certified and reliable.' />
	<meta name="keywords" content="excavations, erable, services, certified, French drain installation, Waterproofing solutions, Foundation repair services, Residential excavation, Basement waterproofing, Sewer line repair, Camera inspection services, Drainage solutions, Foundation crack repair, Sump pump installation" /><!--SEO Optimization-->
	{/if}
	
</svelte:head>
{#if $language == 'fr'}
<TopBar menuOptions={menuOptions = [{
	text: 'Services',
	link: '#services' 
}, {
	text: 'Blogs',
	link: '#blogs' 
}, {
	text: 'À propos',
	link: '#about-us' 
}, {
	text: 'Contact',
	link: '#contact' 
}]} logo={logo}/>
{:else}
<TopBar menuOptions={menuOptions = [{
	text: 'Services',
	link: '#services' 
}, {
	text: 'Blogs',
	link: '#blogs' 
}, {
	text: 'About Us',
	link: '#about-us' 
}, {
	text: 'Contact',
	link: '#contact' 
}]} logo={logo}/>
{/if}

<slot />




