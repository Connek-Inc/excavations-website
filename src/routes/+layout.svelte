<script lang="ts">
	import '../app.postcss';
	import { page } from '$app/stores';
	import Topbar2 from '$lib/Topbar2.svelte';
	import logo from '$lib/logo.png';
	import { language, theme } from '../lib/store/store';
	import { onMount } from 'svelte';
	import GlobalSchemas from '$lib/seo/GlobalSchemas.svelte';
	import {
		localBusinessJsonLd,
		websiteJsonLd,
		faqJsonLd,
		breadcrumbJsonLd,
		organizationJsonLd,
		professionalServiceJsonLd,
		webPageJsonLd,
		speakableJsonLd,
		personJsonLd,
		SITE
	} from '$lib/seo/seo-config';
	import FloatingActions from '$lib/components/FloatingActions.svelte';
	import StickyCTA from '$lib/components/StickyCTA.svelte';
	import ExitIntentModal from '$lib/components/ExitIntentModal.svelte';
	import ConsentBanner from '$lib/components/ConsentBanner.svelte';

	onMount(() => {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			theme.set(savedTheme);
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			theme.set('dark');
		}

		theme.subscribe((value) => {
			if (value === 'dark') {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
			localStorage.setItem('theme', value);
		});

		language.subscribe((value) => {
			const tag = value === 'fr' ? 'fr-CA' : value === 'es' ? 'es-ES' : 'en-CA';
			document.documentElement.setAttribute('lang', tag);
		});
	});

	$: currentLang = ($language as 'fr' | 'en' | 'es') || 'fr';

	$: currentUrl = `${SITE.url}${$page.url.pathname.replace(/\/$/, '')}`;

	$: jsonLdSchemas = [
		organizationJsonLd(),
		personJsonLd(),
		localBusinessJsonLd(currentLang),
		professionalServiceJsonLd(currentLang),
		websiteJsonLd(currentLang),
		webPageJsonLd({
			url: currentUrl || SITE.url,
			name: SITE.name,
			description: 'Excavation Quebec',
			lang: currentLang
		}),
		speakableJsonLd({ url: currentUrl || SITE.url }),
		faqJsonLd(currentLang),
		breadcrumbJsonLd([{ name: 'Accueil', url: SITE.url }])
	];

	$: isUrgences = $page.url.pathname.startsWith('/urgences');

	$: menuOptions = isUrgences
		? currentLang === 'fr'
			? [
					{ text: 'Urgence', link: '#home' },
					{ text: 'Inspection', link: '#inspection' },
					{ text: 'Garantie', link: '#garantie' },
					{ text: 'Avis', link: '#avis' }
				]
			: currentLang === 'es'
				? [
						{ text: 'Urgencia', link: '#home' },
						{ text: 'Inspección', link: '#inspection' },
						{ text: 'Garantía', link: '#garantie' },
						{ text: 'Reseñas', link: '#avis' }
					]
				: [
						{ text: 'Emergency', link: '#home' },
						{ text: 'Inspection', link: '#inspection' },
						{ text: 'Warranty', link: '#garantie' },
						{ text: 'Reviews', link: '#avis' }
					]
		: currentLang === 'fr'
			? [
					{ text: 'Services', link: '/#services' },
					{ text: 'Blogs', link: '/#blogs' },
					{ text: 'À propos', link: '/#about-us' },
					{ text: 'Contact', link: '/#contact' }
				]
			: currentLang === 'es'
				? [
						{ text: 'Servicios', link: '/#services' },
						{ text: 'Blogs', link: '/#blogs' },
						{ text: 'Sobre Nosotros', link: '/#about-us' },
						{ text: 'Contacto', link: '/#contact' }
					]
				: [
						{ text: 'Services', link: '/#services' },
						{ text: 'Blogs', link: '/#blogs' },
						{ text: 'About Us', link: '/#about-us' },
						{ text: 'Contact', link: '/#contact' }
					];
</script>

<GlobalSchemas jsonLd={jsonLdSchemas} />

<Topbar2 {menuOptions} {logo} />

<slot />

<FloatingActions />
<StickyCTA />
<ExitIntentModal />
<ConsentBanner />
