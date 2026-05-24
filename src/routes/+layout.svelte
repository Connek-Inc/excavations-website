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
	$: isStandalone =
		$page.url.pathname.startsWith('/mi/admin') ||
		$page.url.pathname.startsWith('/compte') ||
		$page.url.pathname.startsWith('/soumission');

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
					{ text: 'Imperméabilisation', link: '/services/waterproofing', desc: 'Membranes et drainage' },
					{ text: 'Démolition', link: '/services/demolition', desc: 'Résidentiel, garage, piscine' },
					{ text: 'Inspection caméra', link: '/services/inspection-camera', desc: 'Diagnostic HD sans excavation' },
					{ text: 'Tous les services →', link: '/#services' }
				]
			},
			{
				text: 'Régions',
				children: [
					{ text: 'Saint-Hubert-de-Rivière-du-Loup', link: '/mini-excavation/saint-hubert-de-riviere-du-loup', desc: 'Base — service prioritaire' },
					{ text: 'Rivière-du-Loup', link: '/mini-excavation/riviere-du-loup' },
					{ text: 'Québec', link: '/mini-excavation/quebec' },
					{ text: 'Montréal', link: '/mini-excavation/montreal' },
					{ text: 'Laval', link: '/mini-excavation/laval' },
					{ text: 'Longueuil', link: '/mini-excavation/longueuil' },
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
					{ text: 'Waterproofing', link: '/services/waterproofing', desc: 'Membranes and drainage' },
					{ text: 'Demolition', link: '/services/demolition', desc: 'Residential, garage, pool' },
					{ text: 'Camera Inspection', link: '/services/inspection-camera', desc: 'HD diagnosis, no digging' },
					{ text: 'All services →', link: '/#services' }
				]
			},
			{
				text: 'Regions',
				children: [
					{ text: 'Saint-Hubert-de-Rivière-du-Loup', link: '/mini-excavation/saint-hubert-de-riviere-du-loup', desc: 'Base — priority service' },
					{ text: 'Rivière-du-Loup', link: '/mini-excavation/riviere-du-loup' },
					{ text: 'Quebec City', link: '/mini-excavation/quebec' },
					{ text: 'Montreal', link: '/mini-excavation/montreal' },
					{ text: 'Laval', link: '/mini-excavation/laval' },
					{ text: 'Longueuil', link: '/mini-excavation/longueuil' },
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
					{ text: 'Impermeabilización', link: '/services/waterproofing', desc: 'Membranas y drenaje' },
					{ text: 'Demolición', link: '/services/demolition', desc: 'Residencial, garaje, piscina' },
					{ text: 'Inspección con cámara', link: '/services/inspection-camera', desc: 'Diagnóstico HD sin excavar' },
					{ text: 'Todos los servicios →', link: '/#services' }
				]
			},
			{
				text: 'Regiones',
				children: [
					{ text: 'Saint-Hubert-de-Rivière-du-Loup', link: '/mini-excavation/saint-hubert-de-riviere-du-loup', desc: 'Base — servicio prioritario' },
					{ text: 'Rivière-du-Loup', link: '/mini-excavation/riviere-du-loup' },
					{ text: 'Quebec', link: '/mini-excavation/quebec' },
					{ text: 'Montreal', link: '/mini-excavation/montreal' },
					{ text: 'Laval', link: '/mini-excavation/laval' },
					{ text: 'Longueuil', link: '/mini-excavation/longueuil' },
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

	const URGENCES_NAV: Record<'fr' | 'en' | 'es', MenuItem[]> = {
		fr: [
			{ text: 'Urgence', link: '#home' },
			{ text: 'Inspection', link: '#inspection' },
			{ text: 'Garantie', link: '#garantie' },
			{ text: 'Avis', link: '#avis' },
			{ text: 'Retour au site', link: '/' }
		],
		es: [
			{ text: 'Urgencia', link: '#home' },
			{ text: 'Inspección', link: '#inspection' },
			{ text: 'Garantía', link: '#garantie' },
			{ text: 'Reseñas', link: '#avis' },
			{ text: 'Volver al sitio', link: '/' }
		],
		en: [
			{ text: 'Emergency', link: '#home' },
			{ text: 'Inspection', link: '#inspection' },
			{ text: 'Warranty', link: '#garantie' },
			{ text: 'Reviews', link: '#avis' },
			{ text: 'Back to site', link: '/' }
		]
	};

	$: menuOptions = isUrgences ? URGENCES_NAV[currentLang] : NAV[currentLang];
</script>

<GlobalSchemas jsonLd={jsonLdSchemas} />

{#if isStandalone}
	<slot />
{:else}
	<Topbar2 {menuOptions} {logo} />
	<slot />
	<FloatingActions />
	<StickyCTA />
	<ExitIntentModal />
{/if}

<ConsentBanner />
