<script lang ="ts">
	import Footer from '$lib/Footer.svelte';
    import { language } from '$lib/store/store.js'; 
	import benefits from "$lib/images/residential-excavating-service-image-600x400-1.webp";
	import logo from "$lib/logo.png"

    //export let midText;

    //const language = getContext('language')
    let title;  
	
    let p1;
    let pagetitle;
	let author_desc;

    if ($language=='en') {
        title = 'Top 5 Benefits of Excavation Services for Your Residential Projects'
        p1 = "Introduction<h2 class='font-semibold'>Why Excavation Services Matter</h2>Excavation services are crucial for any residential construction project. Proper excavation ensures a solid foundation, proper drainage, and a well-prepared site, which are essential for the longevity and stability of any structure. <h2 class='font-semibold'>Overview of Residential Excavation</h2>Residential excavation involves various tasks, including site preparation, land clearing, and foundation digging. These services are performed by professionals using specialized equipment to ensure precision and safety.<h2 class='font-semibold'>Top 5 Benefits of Excavation Services</h2><h3>1. Ensuring a Solid Foundation</h3>A well-executed excavation ensures that your foundation is laid on stable ground. This prevents future settling issues and foundation cracks, contributing to the longevity of your home. <h3>2. Proper Drainage and Water Management</h3> Excavation helps in creating effective drainage systems, preventing water accumulation around your home. Proper water management avoids basement flooding and soil erosion, protecting your property.<h3>3. Site Preparation and Land Clearing</h3> Before construction begins, the site needs to be prepared and cleared of any debris, rocks, or vegetation. Excavation services handle this efficiently, providing a clean and ready-to-build site. <h3>4. Safe and Efficient Work</h3> Professional excavation services use advanced equipment and techniques to perform tasks safely and efficiently. This reduces the risk of accidents and ensures that the job is completed on time. <h3>5. Enhanced Property Value</h3> A well-prepared site and a solid foundation increase the value of your property. Proper excavation services contribute to the overall quality and durability of the construction, making it a valuable investment.<br>Why Choose Mini Excavation Érable?<h3>Expertise, Quality Service, and Affordability</h3> Mini Excavation Érable offers top-notch excavation services with a team of experienced professionals. Our commitment to quality and safety ensures the best results for your residential projects. Moreover, by owning our excavation machines, we can provide these services at a lower cost compared to our competitors, offering you significant savings."
        pagetitle = 'Benefits of Excavation Services'
		author_desc = "The excavation specialists"
    } else {
        title = "Les 5 Principaux Avantages des Services d'Excavation pour Vos Projets Résidentiels"
        p1 = "Introduction<h2 class='font-semibold'>Pourquoi les Services d'Excavation Sont Importants</h2> Les services d'excavation sont essentiels pour tout projet de construction résidentielle. Une excavation adéquate assure une fondation solide, un drainage approprié et un site bien préparé, essentiels pour la longévité et la stabilité de toute structure. <h2 class='font-semibold'>Aperçu de l'Excavation Résidentielle</h2> L'excavation résidentielle comprend diverses tâches, telles que la préparation du site, le défrichement et le creusement de fondations. Ces services sont réalisés par des professionnels utilisant des équipements spécialisés pour garantir précision et sécurité.<h2 class='font-semibold'>Les 5 Principaux Avantages des Services d'Excavation</h2><h3>1. Assurer une Fondation Solide</h3> Une excavation bien exécutée garantit que votre fondation est posée sur un sol stable. Cela prévient les problèmes de tassement futurs et les fissures de fondation, contribuant à la longévité de votre maison. <h3>2. Drainage Approprié et Gestion de l'Eau</h3> L'excavation aide à créer des systèmes de drainage efficaces, empêchant l'accumulation d'eau autour de votre maison. Une bonne gestion de l'eau évite les inondations de sous-sol et l'érosion du sol, protégeant votre propriété. <h3>3. Préparation du Site et Défrichement</h3> Avant de commencer la construction, le site doit être préparé et débarrassé de tout débris, roches ou végétation. Les services d'excavation s'en occupent efficacement, fournissant un site propre et prêt à construire. <h3>4. Travail Sûr et Efficace</h3> Les services d'excavation professionnels utilisent des équipements et des techniques avancés pour réaliser les tâches en toute sécurité et efficacité. Cela réduit le risque d'accidents et garantit que le travail est terminé à temps. <h3>5. Valeur Améliorée de la Propriété</h3> Un site bien préparé et une fondation solide augmentent la valeur de votre propriété. Les services d'excavation appropriés contribuent à la qualité et à la durabilité globales de la construction, en faisant un investissement précieux.<br>Pourquoi Choisir Mini Excavation Érable?<h3>Expertise, Service de Qualité, et Abordabilité</h3> Mini Excavation Érable, bien que nouvelle dans le domaine, offre des services d'excavation de premier ordre avec une équipe de professionnels expérimentés. Notre engagement envers la qualité et la sécurité garantit les meilleurs résultats pour vos projets résidentiels. De plus, en possédant nos propres machines d'excavation, nous pouvons offrir ces services à un coût inférieur à celui de nos concurrents, vous permettant ainsi de réaliser des économies importantes."
        pagetitle = "Avantages des services d'excavation"
		author_desc = "Les spécialistes de l'excavation"

    }

</script>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{pagetitle}</title>
	<meta name="author" content="Excavations Erable">
    <meta name="description" content="Discover the top 5 benefits of excavation services for your residential projects. Learn how professional excavation can ensure successful site preparation and foundation stability.">
	<meta name="keywords" content="excavation services, residential excavation, site preparation, land clearing, foundation digging">
		    
	<style>
	.smooth {transition: box-shadow 0.3s ease-in-out;}
	::selection{background-color: aliceblue}
	:root{::-webkit-scrollbar{height:10px;width:10px;}::-webkit-scrollbar-track{background:#efefef;border-radius:6px}
	::-webkit-scrollbar-thumb{background:#d5d5d5;border-radius:6px} ::-webkit-scrollbar-thumb:hover{background:#c4c4c4}}
	/*scroll to top*/
	 .scroll-top {position: fixed;z-index: 50;padding: 0;right: 30px;bottom: 100px;opacity: 0;visibility: hidden;transform: translateY(15px);height: 46px;width: 46px;cursor: pointer;display: flex;align-items: center;justify-content: center;border-radius: 50%;transition: all .4s ease;border: none;box-shadow: inset 0 0 0 2px #ccc;color: #ccc;background-color: #fff;}.scroll-top.is-active {opacity: 1;visibility: visible;transform: translateY(0);}.scroll-top .icon-tabler-arrow-up {position: absolute;stroke-width: 2px;stroke: #333;}.scroll-top svg path {fill: none;}.scroll-top svg.progress-circle path {stroke: #333;stroke-width: 4;transition: all .4s ease;}.scroll-top:hover {color: var(--ghost-accent-color);}.scroll-top:hover .progress-circle path, .scroll-top:hover .icon-tabler-arrow-up {stroke: var(--ghost-accent-color);}
	</style>
</head>
<body class="bg-white font-sans  leading-normal tracking-normal">
	<br><br><br><br>
	<!--slide in nav-->
	<div class="bg-white fixed w-full z-10 top-0 hidden animated" style="opacity: .95;">

		<!--Progress bar-->
		<div id="progress" class="h-1 bg-white shadow" style="background:linear-gradient(to right, #4dc0b5 var(--scroll), transparent 0);"></div>
    </div>
	
	
	<!--Title-->
	<div id="blogs" class="text-center pt-1 ">
		<p class="text-sm md:text-base text-green-500 font-bold">23 JUNE 2024 <span class="text-gray-900">/</span> EXCAVATIONS SERVICES</p>
		<h1 class="font-bold break-normal text-3xl md:text-5xl">{title}</h1>
	</div>

	<!--image-->
	<div class="container w-full max-w-6xl mx-auto bg-white bg-cover mt-8 rounded" style="background-image:url({benefits}); height: 75vh;"></div>
	
	<!--Container-->
	<div class="container max-w-5xl mx-auto -mt-32">
		
		<div class="mx-0 sm:mx-6">
			
			<div class="bg-white bg-opacity-50 w-full p-8 md:p-24 text-xl md:text-2xl text-gray-800 leading-normal" style="font-family:Georgia,serif;">
				
				<!--Post Content-->
				
				<!--Lead Para-->
				<p class="text-2xl md:text-3xl mb-5">
                    
                    {@html p1}

                </p>                         											
				<!--/ Post Content-->
						
			</div>		
	
				<!--Author-->
				<div class="flex w-full items-center font-sans p-8 md:p-24">
					<img class="w-10 h-10 rounded-full mr-4" src="{logo}" alt="Avatar of Author">
					<div class="flex-1">
						<p class="text-base font-bold text-base md:text-xl leading-none">Mini Excavations Érable</p>
						<p class="text-gray-600 text-xs md:text-base">{author_desc}</p>
					</div>
					<div class="justify-end">

				</div>
				<!--/Author-->
			
		</div>
	

	</div>

		</div>


<!--   Scroll Top Button  -->
    <button class="btn-toggle-round scroll-top js-scroll-top" type="button" title="Scroll to top">
      <svg class="progress-circle" width="100%" height="100%" viewBox="-1 -1 102 102">
        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-up" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="cuurentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="18" y1="11" x2="12" y2="5" />
        <line x1="6" y1="11" x2="12" y2="5" />
      </svg>
    </button>


<Footer />
<script>
	/* Progress bar */
	//Source: https://alligator.io/js/progress-bar-javascript-css-variables/
	var h = document.documentElement,
		  b = document.body,
		  st = 'scrollTop',
		  sh = 'scrollHeight',
		  progress = document.querySelector('#progress'),
		  scroll;
	var scrollpos = window.scrollY;
	var header = document.getElementById("header");

	document.addEventListener('scroll', function() {

		/*Refresh scroll % width*/
		scroll = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
		progress.style.setProperty('--scroll', scroll + '%');

		/*Apply classes for slide in bar*/
		scrollpos = window.scrollY;

    if(scrollpos > 100){
      header.classList.remove("hidden");
	  header.classList.remove("fadeOutUp");
	  header.classList.add("slideInDown");
    }
    else {
	  header.classList.remove("slideInDown");
      header.classList.add("fadeOutUp");
	  header.classList.add("hidden");
    }

	});

// scroll to top	
const t=document.querySelector(".js-scroll-top");if(t){t.onclick=()=>{window.scrollTo({top:0,behavior:"smooth"})};const e=document.querySelector(".scroll-top path"),o=e.getTotalLength();e.style.transition=e.style.WebkitTransition="none",e.style.strokeDasharray=`${o} ${o}`,e.style.strokeDashoffset=o,e.getBoundingClientRect(),e.style.transition=e.style.WebkitTransition="stroke-dashoffset 10ms linear";const n=function(){const t=window.scrollY||window.scrollTopBtn||document.documentElement.scrollTopBtn,n=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight),s=Math.max(document.documentElement.clientHeight,window.innerHeight||0);var l=o-t*o/(n-s);e.style.strokeDashoffset=l};n();const s=100;window.addEventListener("scroll",(function(e){n();(window.scrollY||window.scrollTopBtn||document.getElementsByTagName("html")[0].scrollTopBtn)>s?t.classList.add("is-active"):t.classList.remove("is-active")}),!1)}	

</script>

</body>