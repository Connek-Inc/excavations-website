<script lang="ts">
	import '../app.postcss';
	import TopBar from '$lib/TopBar.svelte';
	import Topbar2 from '$lib/Topbar2.svelte';
	import logo from "$lib/logo.png";
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

<div class="floating-button">
	{#if $language == 'fr'}
	<a href="tel:15148309973" title="Appelle Maintenant +1(514) 830-9973">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
		</svg>
	</a>
	{:else}
	<a href="tel:15148309973" title="Call Now +1(514) 830-9973">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
		</svg>
	</a>
	{/if}
</div>

{#if $language == 'fr'}
<Topbar2 menuOptions={menuOptions = [{
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
<Topbar2 menuOptions={menuOptions = [{
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

<style>
	.floating-button {
	  position: fixed;
	  width: 60px;
	  height: 60px;
	  border-radius: 50%;
	  background-color: #25D366;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  cursor: pointer;
	  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	  transition: transform 0.3s ease;
	  animation: pulse 2s infinite;
	  bottom: 20px;
	  right: 20px;
	  z-index: 9999;
	}
  
	.floating-button:hover {
	  transform: scale(1.1);
	}
  
	.floating-button a {
	  color: white;
	  text-decoration: none;
	}
  
	@keyframes pulse {
	  0% {
		transform: scale(1);
		box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
	  }
	  70% {
		transform: scale(1.1);
		box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
	  }
	  100% {
		transform: scale(1);
		box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
	  }
	}
  </style>

<slot />




