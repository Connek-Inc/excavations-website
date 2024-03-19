<script lang="ts">

	import { getContext, setContext } from 'svelte';

	import banner from '$lib/images/banner.jpg'

	import HomeBanner from "$lib/HomeBanner.svelte";
	import AboutUs from "$lib/AboutUs.svelte";
	import Services from '$lib/Services.svelte';
	import ImageSlideshow from '$lib/ImageSlideshow.svelte';
	import ContactUs from '$lib/ContactUs.svelte';
	import Footer from '$lib/Footer.svelte';
	import Logos from '$lib/Logos.svelte';

	import logo from "$lib/logo.png"
	import realmadrid from "$lib/images/real madrid.png"
	import partner1 from "$lib/images/partner1.jpg"
	import partner2 from "$lib/images/partner2.jpg"
	import partner3 from "$lib/images/partner3.jpg"
	import certif1 from "$lib/images/neq.png"
	import certif2 from "$lib/images/RBQ.png"
	import demolition from "$lib/images/demolition.jpg"
	import drainfrancais from "$lib/images/drainfrancais.jpg"
	import fissure from "$lib/images/fissure.jpg"
	import fissure2 from "$lib/images/fissure2.jpg"
	import frenchdrain2 from "$lib/images/frenchdrain2.jpg"
	import excavation2 from "$lib/images/excavation2.jpg"
	import inspection2 from "$lib/images/inspection2.jpg"
	import demolition2 from "$lib/images/demolition2.jpg"

	const language = getContext('language')

	let bannerTitle: string;
	let bannerSubtitle: string;
	let bannerImages;
	let aboutUsMidText: string;
	let services;
	let galleryImages;
	let partners;
	let certifications;
	let lineMessage: string;
	let bannerButtonText: string;
	let partnersTitle: string;

	if (language==='en') {

		bannerTitle = 'Mini Excavations Érable'
		bannerSubtitle = 'With 15+ years of experience.'
		aboutUsMidText = `With more than 15 years of experience, Mini Excavation Maple is recognized as a leader in Quebec in the fields of construction and restoration of French drains, demolition, crack repair, and camera inspections. Our long history and deep expertise testify to our commitment to excellence and quality of service, supported by all the necessary certifications and qualifications. Our team of experts is dedicated to offering customized and effective solutions, precisely meeting the specific needs of each project. By choosing Mini Excavation Maple, you opt for a company whose reliability and excellence are proven by decades of experience.`;
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
			}
		];
		bannerButtonText = 'Contact Us'
		lineMessage = 'BEST SERVICE GUARANTEED'
		partnersTitle = 'Partners'

	} else if (language=='fr') {
		bannerTitle = 'Mini Excavations Érable';
		bannerSubtitle = 'Avec plus de 15 ans d’expérience.';
		aboutUsMidText = `Fort de plus de 15 ans d'expérience, Mini Excavation Érable est reconnu comme un leader au Québec dans les domaines de la construction et de la restauration de drains français, de la démolition, de la réparation de fissures et des inspections par caméra. Notre longue histoire et notre expertise approfondie témoignent de notre engagement envers l'excellence et la qualité de service, soutenus par toutes les certifications et qualifications nécessaires. Notre équipe d'experts est dédiée à offrir des solutions personnalisées et efficaces, répondant précisément aux besoins spécifiques de chaque projet. En choisissant Mini Excavation Érable, vous optez pour une entreprise dont la fiabilité et l'excellence sont prouvées par des décennies d'expérience.`;
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
			}
		];
		bannerButtonText = 'Contactez nous'
		lineMessage = 'MEILLEUR SERVICE GARANTI'	

		partnersTitle = 'Partenaires'
	}

	// Gallery
	bannerImages = [banner, fissure]
	galleryImages = [demolition, drainfrancais, fissure, banner]

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
	]

	// Certifications
	certifications = [
		{
			logo: certif1,
			name: '(NEQ): 1179620118'
		}
	]


	// #febd17

</script>

<div class="page-content flex flex-col">

	<HomeBanner mainTitle={bannerTitle} 
		subtitle={bannerSubtitle}
		bannerImage={banner}
		bannerImages={bannerImages}
		buttonText={bannerButtonText}/>

	<div class='h-44 bg-black flex justify-center items-center text-white font-bold'> 
		<h1 class="h1 text-center text-[#febd17] px-16 md:p-0">
			{lineMessage} 
		</h1>
	</div>
	
	<ContactUs nDays={9}/>

	<Services services={services}/>
	
	
	
	<!-- <ImageSlideshow slideShowImages={slideShowImages}/> -->
	
	<Logos logos={partners} title={partnersTitle}/>
	
	<AboutUs midText={aboutUsMidText} leftText={''} rightText={''} galleryImages={galleryImages}/>

	<Logos logos={certifications} title={'Certifications'}/>

	<Footer />

</div>


