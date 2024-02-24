<script>

	import banner from '$lib/images/banner.jpg'

	import HomeBanner from "$lib/HomeBanner.svelte";
	import AboutUs from "$lib/AboutUs.svelte";
	import Services from '$lib/Services.svelte';
	import ImageSlideshow from '$lib/ImageSlideshow.svelte';
	import ContactUs from '$lib/ContactUs.svelte';
	import Footer from '$lib/Footer.svelte';
	import Partners from '$lib/Partners.svelte';

	import realmadrid from "$lib/images/real madrid.png"
	import partner1 from "$lib/images/partner1.jpg"
	import demolition from "$lib/images/demolition.jpg"
	import drainfrancais from "$lib/images/drainfrancais.jpg"
	import fissure from "$lib/images/fissure.jpg"
	import fissure2 from "$lib/images/fissure2.jpg"
	import frenchdrain2 from "$lib/images/frenchdrain2.jpg"
	import excavation2 from "$lib/images/excavation2.jpg"
	import inspection2 from "$lib/images/inspection2.jpg"
	import demolition2 from "$lib/images/demolition2.jpg"


	const bannerTitle = 'Mini Excavations Erable'
	const bannerSubtitle = 'Avec 15+ annees d’experience.'
	const bannerImages = [banner, fissure]

	// About Us
	const aboutUsMidText = "Fort de plus de 15 ans d’expérience, Mini Excavation Érables est reconnu comme un leader au Québec dans les domaines de la construction et de la restauration de drains français, de la démolition, de la réparation de fissures et des inspections par caméra. Notre longue histoire et notre expertise approfondie témoignent de notre engagement envers l’excellence et la qualité de service, soutenus par l’ensemble des certifications et qualifications nécessaires. Notre équipe d’experts est dédiée à offrir des solutions sur mesure et efficaces, répondant précisément aux besoins spécifiques de chaque projet. En choisissant Mini Excavation Érables, vous optez pour une entreprise dont la fiabilité et l’excellence sont éprouvées par des décennies d’expérience."

	// Services
	const services = [
		{
			name: 'Excavations',
			description: "Services d’excavation complets avec un engagement envers la sécurité et l’environnement pour chaque projet.",
			image: excavation2,
		},
		{
			name: 'DRAINS FRANÇAIS',
			description: "Solutions expertes en drains français pour une protection durable contre l’humidité.",
			image: frenchdrain2
		},
		{
			name: 'RÉPARATION DE FISSURES',
			description: "Réparations de fissures efficaces, garantissant la sécurité et l’intégrité des fondations.",
			image: fissure2
		},
		{
			name: 'Demolition',
			description: "Démolition sécurisée et respectueuse de l’environnement, adaptée à tous types de projets.",
			image: demolition2
		},
		{
			name: 'Inspection par camera',
			description: "Diagnostic précis de canalisations avec technologie de pointe pour inspections non invasives.",
			image: inspection2
		}
	]

	// Gallery
	const galleryImages = [demolition, drainfrancais, fissure, banner]

	// Partners
	const partners = [
		{
			logo: partner1,
			name: 'APCHQ'
		}
	]


	// #febd17

</script>

<div class="page-content flex flex-col">

	<HomeBanner mainTitle={bannerTitle} 
		subtitle={bannerSubtitle}
		bannerImage={banner}
		bannerImages={bannerImages}/>

	<div class='h-44 bg-black flex justify-center items-center text-white font-bold'> 
		<h1 class="h1 text-center text-[#febd17] px-16 md:p-0">
			MEILLEUR SERVICE GARANTI 
		</h1>
	</div>
	
	<Services services={services}/>
	
	<AboutUs midText={aboutUsMidText} leftText={''} rightText={''} galleryImages={galleryImages}/>

	
	
	<!-- <ImageSlideshow slideShowImages={slideShowImages}/> -->


	
	<ContactUs nDays={9}/>

	<Partners partners={partners}/>

	<Footer />

</div>


