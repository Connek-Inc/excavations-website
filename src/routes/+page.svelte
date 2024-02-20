<script>

	import banner from '$lib/images/banner.jpg'

	import HomeBanner from "$lib/HomeBanner.svelte";
	import AboutUs from "$lib/AboutUs.svelte";
	import Services from '$lib/Services.svelte';
	import ImageSlideshow from '$lib/ImageSlideshow.svelte';
	import ContactUs from '$lib/ContactUs.svelte';
	import Footer from '$lib/Footer.svelte';

	import demolition from "$lib/images/demolition.jpg"
	import drainfrancais from "$lib/images/drainfrancais.jpg"
	import fissure from "$lib/images/fissure.jpg"

	const bannerTitle = 'Mini Excavations Erable'
	const bannerSubtitle = 'Avec 15+ annees d’experience.'
	const bannerImages = [banner, fissure]

	const aboutUsMidText = "Fort de plus de 15 ans d’expérience, Mini Excavation Érables est reconnu comme un leader au Québec dans les domaines de la construction et de la restauration de drains français, de la démolition, de la réparation de fissures et des inspections par caméra. Notre longue histoire et notre expertise approfondie témoignent de notre engagement envers l’excellence et la qualité de service, soutenus par l’ensemble des certifications et qualifications nécessaires. Notre équipe d’experts est dédiée à offrir des solutions sur mesure et efficaces, répondant précisément aux besoins spécifiques de chaque projet. En choisissant Mini Excavation Érables, vous optez pour une entreprise dont la fiabilité et l’excellence sont éprouvées par des décennies d’expérience."


	const services = [
		{
			name: 'Excavations',
			description: "Services d’excavation complets avec un engagement envers la sécurité et l’environnement pour chaque projet."
		},
		{
			name: 'DRAINS FRANÇAIS',
			description: "Solutions expertes en drains français pour une protection durable contre l’humidité."
		},
		{
			name: 'RÉPARATION DE FISSURES',
			description: "Réparations de fissures efficaces, garantissant la sécurité et l’intégrité des fondations.",
		},
		{
			name: 'Demolition',
			description: "Démolition sécurisée et respectueuse de l’environnement, adaptée à tous types de projets."
		},
		{
			name: 'Inspection par camera',
			description: "Diagnostic précis de canalisations avec technologie de pointe pour inspections non invasives."
		}
	]

	const slideShowImages = [demolition, drainfrancais, fissure, banner]

</script>

<div class="page-content flex flex-col">

	<HomeBanner mainTitle={bannerTitle} 
		subtitle={bannerSubtitle}
		bannerImage={banner}
		bannerImages={bannerImages}/>

	<div class='h-44 bg-black flex justify-center items-center text-white font-bold'> 
		<h1 class="h1 text-center">
			MEILLEUR SERVICE GARANTI. 
		</h1>
	</div>
	
	<Services services={services}/>
	
	<AboutUs midText={aboutUsMidText} leftText={''} rightText={''}/>

	<!-- <ImageSlideshow slideShowImages={slideShowImages}/> -->
	
	<ContactUs />

	<Footer />

</div>


