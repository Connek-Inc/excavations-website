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

	const aboutUsText = "Niché sur la rue St-Denis, notre charmant bar à cocktails est un refuge chaleureux où des cocktails exquis rencontrent de délicieux fruits de mer. Dans une ambiance intime, nos mixologues qualifiés élaborent de délicieux cocktails. Offrez-vous des huîtres fraîches, de succulents cocktails de crevettes et bien plus encore. Rejoignez-nous pour une expérience délicieuse où convergent charme, chaleur et excellence culinaire, créant une soirée inoubliable pour vous et vos compagnons."

	const services = [
		{
			name: 'Excavations',
			description: "Our comprehensive residential excavation services include site preparation, land clearing, soil removal, grading, and trenching for utility installations. We prioritize environmental sustainability and work meticulously to minimize disruption to your property and surrounding areas. With a focus on safety, quality, and customer satisfaction, we're dedicated to transforming your vision into reality, ensuring your project is on a solid foundation from the ground up."
		},
		{
			name: 'French drain',
			description: "Our French drain service includes a comprehensive assessment of your property to identify optimal drainage solutions, followed by the careful excavation and installation of a custom-designed system. We use durable, high-performing materials to ensure longevity and efficiency, effectively redirecting water away from your home and preventing moisture-related issues."
		},
		{
			name: 'Wall fissure repairs',
			description: "Our comprehensive fissure repair service begins with a detailed assessment of your home to identify the root causes of wall cracks, whether due to foundation settling, moisture, or other factors. We employ state-of-the-art techniques and materials to effectively seal and reinforce affected areas, preventing further damage and restoring your walls to their original condition.",
		},
		{
			name: 'Demolition',
			description: "Our residential demolition service encompasses a thorough assessment of your property to plan the safest and most effective demolition strategy. We manage all aspects of the process, from obtaining necessary permits to the final cleanup, ensuring a hassle-free experience for our clients. Our state-of-the-art equipment and techniques allow us to demolish structures safely, minimizing disruption to surrounding properties and the environment."
		}
	]

	const slideShowImages = [demolition, drainfrancais, fissure, banner]

</script>

<div class="page-content flex flex-col">

	<HomeBanner mainTitle={'Mini Excavations Erable'} 
		subtitle={'The finest with our state-of-the-art projects.'}
		bannerImage={banner}/>
	
	<Services services={services}/>
	
	<AboutUs aboutUsText={aboutUsText}/>

	<ImageSlideshow slideShowImages={slideShowImages}/>
	
	<ContactUs />

	<Footer />

</div>


