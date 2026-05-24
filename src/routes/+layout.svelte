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
	import { track } from '$lib/analytics/beacon';
	import { PUBLIC_GA4_MEASUREMENT_ID } from '$env/static/public';

	onMount(() => {
		// Inject GA4 only if a measurement ID is configured.
		// Google Ads (AW-…) is already loaded from app.html; GA4 (G-…) is separate.
		if (PUBLIC_GA4_MEASUREMENT_ID && PUBLIC_GA4_MEASUREMENT_ID.startsWith('G-')) {
			const s = document.createElement('script');
			s.async = true;
			s.src = `https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GA4_MEASUREMENT_ID}`;
			document.head.appendChild(s);
			// @ts-ignore
			window.gtag && window.gtag('config', PUBLIC_GA4_MEASUREMENT_ID, { anonymize_ip: true });
		}

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

	// Track page views on every navigation (skip admin and soumission token pages).
	$: {
		const p = $page.url.pathname;
		if (p && !p.startsWith('/mi/') && !p.startsWith('/soumission/')) {
			track(p, { language: currentLang });
		}
	}

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


	type MenuItem = {
		text: string;
		link?: string;
		children?: { text: string; link: string; desc?: string }[];
	};

	const NAV: Record<'fr' | 'en' | 'es', MenuItem[]> = {
		fr: [
			{
				text: 'Services',
				children: [
					{ text: 'Drain français', link: '/services/drain-francais', desc: 'Installation, réparation, remplacement' },
					{ text: 'Excavation', link: '/services/excavation', desc: 'Mini-pelles pour terrains restreints' },
					{ text: 'Réparation de fissures', link: '/services/reparation-fissures', desc: 'Injection époxy & polyuréthane' },
					{ text: 'Démolition', link: '/services/demolition', desc: 'Résidentiel, garage, piscine' },
					{ text: 'Inspection caméra', link: '/services/inspection-camera', desc: 'Diagnostic HD sans excavation' },
					{ text: 'Tous les services →', link: '/#services' }
				]
			},
			{
				text: 'Régions',
				children: [
					{ text: 'Québec', link: '/mini-excavation/quebec-city', desc: 'Capitale-Nationale' },
					{ text: 'Montréal', link: '/mini-excavation/montreal' },
					{ text: 'Laval', link: '/mini-excavation/laval' },
					{ text: 'Longueuil', link: '/mini-excavation/longueuil' },
					{ text: 'Brossard', link: '/mini-excavation/brossard' },
					{ text: 'Saint-Jérôme', link: '/mini-excavation/saint-jerome' },
					{ text: 'Toutes les régions →', link: '/mini-excavation' }
				]
			},
			{ text: 'Urgences 24/7', link: '/urgences' },
			{
				text: 'Blog',
				children: [
					{ text: 'Avantages du drain français', link: '/blog/benefits' },
					{ text: "Importance de l'imperméabilisation", link: '/blog/importance' },
					{ text: 'Guide imperméabilisation', link: '/blog/waterproofing' },
					{ text: 'Tous les articles →', link: '/#blogs' }
				]
			},
			{ text: 'À propos', link: '/a-propos' },
			{ text: 'Contact', link: '/#contact' }
		],
		en: [
			{
				text: 'Services',
				children: [
					{ text: 'French Drain', link: '/services/drain-francais', desc: 'Install, repair, replace' },
					{ text: 'Excavation', link: '/services/excavation', desc: 'Mini-excavators for tight spaces' },
					{ text: 'Crack Repair', link: '/services/reparation-fissures', desc: 'Epoxy & polyurethane injection' },
					{ text: 'Demolition', link: '/services/demolition', desc: 'Residential, garage, pool' },
					{ text: 'Camera Inspection', link: '/services/inspection-camera', desc: 'HD diagnosis, no digging' },
					{ text: 'All services →', link: '/#services' }
				]
			},
			{
				text: 'Regions',
				children: [
					{ text: 'Quebec City', link: '/mini-excavation/quebec-city', desc: 'Capitale-Nationale' },
					{ text: 'Montreal', link: '/mini-excavation/montreal' },
					{ text: 'Laval', link: '/mini-excavation/laval' },
					{ text: 'Longueuil', link: '/mini-excavation/longueuil' },
					{ text: 'Brossard', link: '/mini-excavation/brossard' },
					{ text: 'Saint-Jérôme', link: '/mini-excavation/saint-jerome' },
					{ text: 'All regions →', link: '/mini-excavation' }
				]
			},
			{ text: '24/7 Emergency', link: '/urgences' },
			{
				text: 'Blog',
				children: [
					{ text: 'Benefits of a French Drain', link: '/blog/benefits' },
					{ text: 'Why Waterproofing Matters', link: '/blog/importance' },
					{ text: 'Waterproofing Guide', link: '/blog/waterproofing' },
					{ text: 'All articles →', link: '/#blogs' }
				]
			},
			{ text: 'About', link: '/a-propos' },
			{ text: 'Contact', link: '/#contact' }
		],
		es: [
			{
				text: 'Servicios',
				children: [
					{ text: 'Drenaje francés', link: '/services/drain-francais', desc: 'Instalación, reparación, reemplazo' },
					{ text: 'Excavación', link: '/services/excavation', desc: 'Mini-excavadoras para terrenos restringidos' },
					{ text: 'Reparación de grietas', link: '/services/reparation-fissures', desc: 'Inyección epoxi y poliuretano' },
					{ text: 'Demolición', link: '/services/demolition', desc: 'Residencial, garaje, piscina' },
					{ text: 'Inspección con cámara', link: '/services/inspection-camera', desc: 'Diagnóstico HD sin excavar' },
					{ text: 'Todos los servicios →', link: '/#services' }
				]
			},
			{
				text: 'Regiones',
				children: [
					{ text: 'Quebec', link: '/mini-excavation/quebec-city', desc: 'Capitale-Nationale' },
					{ text: 'Montreal', link: '/mini-excavation/montreal' },
					{ text: 'Laval', link: '/mini-excavation/laval' },
					{ text: 'Longueuil', link: '/mini-excavation/longueuil' },
					{ text: 'Brossard', link: '/mini-excavation/brossard' },
					{ text: 'Saint-Jérôme', link: '/mini-excavation/saint-jerome' },
					{ text: 'Todas las regiones →', link: '/mini-excavation' }
				]
			},
			{ text: 'Urgencias 24/7', link: '/urgences' },
			{
				text: 'Blog',
				children: [
					{ text: 'Ventajas del drenaje francés', link: '/blog/benefits' },
					{ text: 'Importancia de la impermeabilización', link: '/blog/importance' },
					{ text: 'Guía de impermeabilización', link: '/blog/waterproofing' },
					{ text: 'Todos los artículos →', link: '/#blogs' }
				]
			},
			{ text: 'Quiénes somos', link: '/a-propos' },
			{ text: 'Contacto', link: '/#contact' }
		]
	};

	$: menuOptions = NAV[currentLang];
</script>

<GlobalSchemas jsonLd={jsonLdSchemas} />

<Topbar2 {menuOptions} {logo} />
<slot />
<FloatingActions />
<StickyCTA />
<ExitIntentModal />
<ConsentBanner />
