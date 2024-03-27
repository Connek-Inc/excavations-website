<script lang="ts">

	import { getContext, setContext } from 'svelte';

	import banner from '$lib/images/banner.jpg'

	// Components
	import HomeBannerSplit2 from "$lib/HomeBannerSplit2.svelte";
	import AboutUs from "$lib/AboutUs.svelte";
	import Services from '$lib/Services.svelte';
	import ImageSlideshow from '$lib/ImageSlideshow.svelte';
	import Footer from '$lib/Footer.svelte';
	import Logos from '$lib/Logos.svelte';

	// Classes
	import {ContactFormClass} from "$lib/contact-form"

	// Assets
	import logo from "$lib/logo.png"
	import certifiedBadge from "$lib/icons/quality-badge.png"
	import realmadrid from "$lib/images/real madrid.png"
	import partner1 from "$lib/images/partner1.jpg"
	import partner2 from "$lib/images/partner2.png"
	import partner3 from "$lib/images/partner3.png"
	import partner4 from "$lib/images/partner4.png"
	import partner5 from "$lib/images/partner5.png"
	import certif1 from "$lib/images/neq.png"
	import certif2 from "$lib/images/RBQ.png"
	import certif3 from "$lib/images/certification3.png"
	import demolition from "$lib/images/demolition.jpg"
	import drainfrancais from "$lib/images/drainfrancais.jpg"
	import waterproofing1 from "$lib/images/waterproofing1.jpg"
	import fissure from "$lib/images/fissure.jpg"
	import fissure2 from "$lib/images/fissure2.jpg"
	import frenchdrain2 from "$lib/images/frenchdrain2.jpg"
	import excavation2 from "$lib/images/excavation2.jpg"
	import inspection2 from "$lib/images/inspection2.jpg"
	import demolition2 from "$lib/images/demolition2.jpg"
	import ContactForm from '$lib/ContactForm.svelte';
  	import { Calendar } from '$lib/calendar';

	const language = getContext('language')
	const theme = getContext('theme')
	const primaryColor: string = theme.primary
    const secondaryColor: string = theme.secondary
    const tertiaryColor: string = theme.tertiary


	let bannerTitle: string;
	let bannerSubtitle: string;
	let aboutUsMidText: string;
	let services;
	let partners;
	let certifications;
	let lineMessage: string;
	let bannerButtonText: string;
	let partnersTitle: string;
	let contactTitle: string;
    let calendarTitle: string;
    let calendarSubtitle: string;
	let contactButtonText: string;

	let blockedTimes: string[] = []
	let bookedTimes: string[] = []


	if (language==='en') {

		bannerTitle = 'Mini Excavations Érable'
		bannerSubtitle = 'With 15+ years of experience.'
		aboutUsMidText = `With more than 15 years of experience, Mini Excavation Maple is recognized as a leader in Quebec in the fields of construction and restoration of French drains, demolition, crack repair, and camera inspections. Our long history and deep expertise testify to our commitment to excellence and quality of service, supported by all the necessary certifications and qualifications. Our team of experts is dedicated to offering customized and effective solutions, precisely meeting the specific needs of each project. By choosing Mini Excavation Maple, you opt for a company whose reliability and excellence are proven by decades of experience.`;
		contactTitle = 'Contact for a quote.'
        calendarTitle = 'Book a call for a quote'
        calendarSubtitle = 'Below are our times available. Choose your times and we will give you a call.'
		contactButtonText = 'Send'
		services = [
			{
				name: 'Excavations',
				description: "Complete excavation services with a commitment to safety and the environment for each project.",
				image: excavation2,
			},
			{
				name: 'French Drains',
				description: "Expert French drain solutions for long-lasting protection against moisture.",
				image: frenchdrain2
			},
			{
				name: 'Crack Repairs',
				description: "Effective crack repairs, ensuring the safety and integrity of foundations.",
				image: fissure2
			},
			{
				name: 'Demolition',
				description: "Secure and environmentally respectful demolition, suitable for all types of projects.",
				image: demolition2
			},
			{
				name: 'Camera Inspection',
				description: "Precise pipeline diagnostics with cutting-edge technology for non-invasive inspections.",
				image: inspection2
			},
			{
				name: 'Waterproofing',
				description: "Top-notch waterproofing solutions for residential and commercial properties, utilizing the latest in technology and premium materials for lasting protection.",
				image: waterproofing1
			}
		];
		bannerButtonText = 'Contact Us'
		lineMessage = 'BEST SERVICE GUARANTEED'
		partnersTitle = 'Partners'

	} else if (language=='fr') {
		bannerTitle = 'Mini Excavations Érable';
		bannerSubtitle = 'Avec plus de 15 ans d’expérience.';
		aboutUsMidText = `Fort de plus de 15 ans d'expérience, Mini Excavation Érable est reconnu comme un leader au Québec dans les domaines de la construction et de la restauration de drains français, de la démolition, de la réparation de fissures et des inspections par caméra. Notre longue histoire et notre expertise approfondie témoignent de notre engagement envers l'excellence et la qualité de service, soutenus par toutes les certifications et qualifications nécessaires. Notre équipe d'experts est dédiée à offrir des solutions personnalisées et efficaces, répondant précisément aux besoins spécifiques de chaque projet. En choisissant Mini Excavation Érable, vous optez pour une entreprise dont la fiabilité et l'excellence sont prouvées par des décennies d'expérience.`;
		contactTitle = 'Contactez-nous pour une soumission.'
        calendarTitle = 'Réservez un appel pour une soumission';
        calendarSubtitle = 'Ci-dessous se trouvent nos créneaux disponibles. Choisissez votre horaire et nous vous appellerons.';
		contactButtonText = 'Envoyer'
		services = [
			{
				name: 'Excavations',
				description: "Services complets d'excavation avec un engagement envers la sécurité et l'environnement pour chaque projet.",
				image: excavation2,
			},
			{
				name: 'Drains Français',
				description: "Solutions expertes en drains français pour une protection durable contre l'humidité.",
				image: frenchdrain2
			},
			{
				name: 'Réparations de Fissures',
				description: "Réparations efficaces de fissures, garantissant la sécurité et l'intégrité des fondations.",
				image: fissure2
			},
			{
				name: 'Démolition',
				description: "Démolition sécurisée et respectueuse de l'environnement, adaptée à tous types de projets.",
				image: demolition2
			},
			{
				name: 'Inspection par Caméra',
				description: "Diagnostics précis de canalisations avec une technologie de pointe pour des inspections non invasives.",
				image: inspection2
			},
			{
				name: 'Imperméabilisation',
				description: "Imperméabilisation de pointe pour les propriétés résidentielles et commerciales, utilisant la dernière technologie et des matériaux de qualité pour une protection durable.",
				image: waterproofing1
			}
		];
		bannerButtonText = 'Contactez nous'
		lineMessage = 'MEILLEUR SERVICE GARANTI'	

		partnersTitle = 'Partenaires'
	}

	// Init classes
	let contactForm = new ContactFormClass()
	let calendar = new Calendar(bookedTimes, blockedTimes)
	
	// Gallery
	const bannerImages: string[] = [banner, fissure]
	const galleryImages: string[] = [demolition, drainfrancais, fissure, banner]

	// Partners
	partners = [
		{
			logo: partner1,
			name: ''
		},
		{
			logo: partner2,
			name: ''
		},
		{
			logo: partner3,
			name: ''
		},
		{
			logo: partner4,
			name: ''
		},
		{
			logo: partner5,
			name: ''
		}
	]

	// Certifications
	certifications = [
		{
			logo: certif1,
			name: '(NEQ): 1179620118'
		},
		{
			logo: certif2,
			name: ''
		},
		{
			logo: certif3,
			name: ''
		}
	]

</script>

<div class="page-content flex flex-col">


	<HomeBannerSplit2 
		title={bannerTitle} 
		text={bannerSubtitle}
		logo={certifiedBadge}
		bannerImages={bannerImages}
	>
		<ContactForm title={contactTitle} buttonText={contactButtonText} bind:contactForm/>
	</HomeBannerSplit2>

	
	<div class='h-36 bg-{secondaryColor} flex justify-center items-center text-white font-bold'> 
		<h1 class="h1 text-center text-[{primaryColor}] px-16 md:p-0">
			{lineMessage} 
		</h1>
	</div>
	
	<Logos logos={partners} title={partnersTitle}/>
	
	<Services services={services}/>
	
	
	
	<!-- <ImageSlideshow slideShowImages={slideShowImages}/> -->




	<Logos logos={certifications} title={'Certifications'}/>

	<Footer />

</div>


