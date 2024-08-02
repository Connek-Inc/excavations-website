<script lang="ts">
    import { language } from '$lib/store/store.js'; 
	import waterproofing from "$lib/images/basement-sump-pumps-installation-1.png";


    let title;
	let subtitle;
	let subtitle2;  
    let p1;
    let pagetitle;
	let author_desc;

    if ($language=='en') {
        title = 'Waterproofing Solutions for a Dry Basement'
		subtitle = '14 JULY 2024'
		subtitle2 = 'WATERPROOFING SOLUTIONS'
        p1 = "Introduction<h2 class='font-semibold'>The Risks of a Damp Basement</h2>A damp basement can lead to structural damage, mold growth, and health issues. Proper waterproofing is essential to protect your home and maintain a healthy living environment.<h2 class='font-semibold'>Importance of Waterproofing</h2>Waterproofing your basement prevents moisture from seeping in, protecting your foundation and ensuring a dry, usable space.<h2 class='font-semibold'>Waterproofing Techniques</h2><h3>Interior Waterproofing Methods</h3>Interior waterproofing involves sealing walls and floors to prevent water from entering. Common methods include applying sealants and installing drainage systems.<h3>Exterior Waterproofing Methods</h3>Exterior waterproofing is more comprehensive, involving excavation around the foundation to apply waterproof coatings and install drainage systems.<h3>Comparative Benefits</h3>- **Interior:** Easier and less expensive, ideal for minor issues.<br>- **Exterior:** More effective for severe water problems, providing long-term protection.<h2>Installing a Sump Pump</h2><h3>How Sump Pumps Work</h3>Sump pumps remove accumulated water from a sump basin, directing it away from your home. They are crucial for preventing basement flooding.<h3>Installation Process</h3>- **Locate the Low Point:** Identify where water collects.<br>- **Dig the Sump Pit:** Excavate a hole for the sump basin.<br>- **Install the Pump:** Place the pump in the basin and connect the discharge pipe.<br>- **Test the System:** Ensure the pump activates and directs water away from the house.<br><h3>Benefits of Waterproofing</h3><h3>Health Benefits</h3>Waterproofing prevents mold and mildew, improving indoor air quality and reducing health risks.<h3>Increased Property Value</h3>A dry basement enhances your home's value by creating additional usable space and protecting the foundation.<h3>Long-term Cost Savings</h3>Preventing water damage reduces repair costs and extends the life of your home.<br>Why Trust Mini Excavation Érable?<h3>Proven Solutions and Expert Advice</h3>Mini Excavation Érable provides effective waterproofing solutions backed by expertise and a commitment to quality. Our team ensures your basement stays dry and protected.<h3>Affordability</h3>Owning our excavation machines allows us to offer competitive pricing on all our services, including waterproofing.<br><h3>Additional Services</h3>- **French Drain Installation:** Effective water drainage solutions.<br>- **Foundation Crack Repairs:** Ensuring foundation integrity.<br>- **Camera Inspections:** Accurate pipeline diagnostics.<br>"
        pagetitle = 'Waterproofing Solutions for a Dry Basement'
		author_desc = "The excavation specialists"
    } else if ($language=='fr') {
        title = "Solutions d'Imperméabilisation pour un Sous-Sol Sec"
		subtitle = '14 JUILLET 2024'
		subtitle2 = "SOLUTIONS D'IMPERMEABILISATION"
        p1 = "Introduction<h2 class='font-semibold'>Les Risques d'un Sous-Sol Humide</h2> Un sous-sol humide peut causer des dommages structurels, la croissance de moisissures et des problèmes de santé. Une imperméabilisation adéquate est essentielle pour protéger votre maison et maintenir un environnement de vie sain. <h2  class='font-semibold'>Importance de l'Imperméabilisation</h2> L'imperméabilisation de votre sous-sol empêche l'humidité de s'infiltrer, protégeant ainsi votre fondation et garantissant un espace sec et utilisable.<h2  class='font-semibold'>Techniques d'Imperméabilisation</h2><h3>Méthodes d'Imperméabilisation Intérieure</h3> L'imperméabilisation intérieure consiste à sceller les murs et les sols pour empêcher l'eau d'entrer. Les méthodes courantes incluent l'application de scellants et l'installation de systèmes de drainage. <h3>Méthodes d'Imperméabilisation Extérieure</h3> L'imperméabilisation extérieure est plus complète, impliquant l'excavation autour de la fondation pour appliquer des revêtements imperméables et installer des systèmes de drainage. <h3>Avantages Comparatifs</h3> - **Intérieure:** Plus facile et moins coûteuse, idéale pour les problèmes mineurs. <br>- **Extérieure:** Plus efficace pour les problèmes d'eau graves, offrant une protection à long terme.<br>Installation d'une Pompe de Puisard<h3>Fonctionnement des Pompes de Puisard</h3> Les pompes de puisard éliminent l'eau accumulée dans un puisard, la dirigeant loin de votre maison. Elles sont cruciales pour prévenir les inondations de sous-sol. <h3>Processus d'Installation</h3> - **Localiser le Point Bas:** Identifier où l'eau s'accumule. <br>- **Creuser le Puisard:** Creuser un trou pour le puisard. <br>- **Installer la Pompe:** Placer la pompe dans le puisard et connecter le tuyau de décharge.<br>- **Tester le Système:** S'assurer que la pompe s'active et dirige l'eau loin de la maison. <h3>Conseils de Maintenance</h3> Vérifiez régulièrement la pompe pour les débris, testez son fonctionnement et remplacez la batterie de secours si nécessaire.<br>Avantages de l'Imperméabilisation<h3>Avantages pour la Santé</h3> L'imperméabilisation empêche la moisissure et le mildiou, améliorant la qualité de l'air intérieur et réduisant les risques pour la santé. <h3>Augmentation de la Valeur de la Propriété</h3> Un sous-sol sec augmente la valeur de votre maison en créant un espace utilisable supplémentaire et en protégeant la fondation. <h3>Économies à Long Terme</h3> Prévenir les dommages causés par l'eau réduit les coûts de réparation et prolonge la durée de vie de votre maison.<br>Pourquoi Faire Confiance à Mini Excavation Érable?<h3>Solutions Éprouvées et Conseils d'Experts</h3> Mini Excavation Érable fournit des solutions d'imperméabilisation efficaces soutenues par une expertise et un engagement envers la qualité. Notre équipe s'assure que votre sous-sol reste sec et protégé. <h3>Abordabilité</h3> Possédant nos machines d'excavation, nous offrons des tarifs compétitifs sur tous nos services, y compris l'imperméabilisation. <h3>Services Additionnels</h3> - **Installation de Drains Français:** Solutions efficaces de drainage d'eau. <br>- **Réparation de Fissures de Fondation:** Assurer l'intégrité des fondations.<br>- **Inspections par Caméra:** Diagnostics précis des canalisations.<br>"
        pagetitle = "Solutions d'imperméabilisation pour un sous-sol sec"
		author_desc = "Les spécialistes de l'excavation"
    }

</script>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{pagetitle}</title>
	<meta name="author" content="Excavations Erable">
    <meta name="description" content="Discover effective waterproofing solutions for keeping your basement dry. Learn about sump pump installation and other techniques to protect your home.">
	<meta name="keywords" content="Basement waterproofing, waterproofing solutions, sump pump installation, basement moisture control, home waterproofing">
		    
	<style>
	.smooth {transition: box-shadow 0.3s ease-in-out;}
	::selection{background-color: aliceblue}
	:root{::-webkit-scrollbar{height:10px;width:10px;}::-webkit-scrollbar-track{background:#efefef;border-radius:6px}
	::-webkit-scrollbar-thumb{background:#d5d5d5;border-radius:6px} ::-webkit-scrollbar-thumb:hover{background:#c4c4c4}}
	/*scroll to top*/
	 .scroll-top {position: fixed;z-index: 50;padding: 0;right: 30px;bottom: 100px;opacity: 0;visibility: hidden;transform: translateY(15px);height: 46px;width: 46px;cursor: pointer;display: flex;align-items: center;justify-content: center;border-radius: 50%;transition: all .4s ease;border: none;box-shadow: inset 0 0 0 2px #ccc;color: #ccc;background-color: #fff;}.scroll-top.is-active {opacity: 1;visibility: visible;transform: translateY(0);}.scroll-top .icon-tabler-arrow-up {position: absolute;stroke-width: 2px;stroke: #333;}.scroll-top svg path {fill: none;}.scroll-top svg.progress-circle path {stroke: #333;stroke-width: 4;transition: all .4s ease;}.scroll-top:hover {color: var(--ghost-accent-color);}.scroll-top:hover .progress-circle path, .scroll-top:hover .icon-tabler-arrow-up {stroke: var(--ghost-accent-color);}
	</style>
</head>
<body class="bg-white font-sans leading-normal tracking-normal">

	<!--slide in nav-->
	<div class="bg-white fixed w-full z-10 top-0 hidden animated" style="opacity: .95;">

		<!--Progress bar-->
		<div id="progress" class="h-1 bg-white shadow" style="background:linear-gradient(to right, #4dc0b5 var(--scroll), transparent 0);"></div>
    </div>
	
	<!--Title-->
	<div id="blogs" class="text-center pt-16 md:pt-32">
		<p class="text-sm md:text-base text-green-500 font-bold">{subtitle} <span class="text-gray-900">/</span> {subtitle2}</p>
		<h1 class="font-bold break-normal text-3xl md:text-5xl">{title}</h1>
	</div>

	<!--image-->
	<div class="container w-full max-w-6xl mx-auto bg-white bg-cover mt-8 rounded" style="background-image:url({waterproofing}); height: 75vh;"></div>
	
	<!--Container-->
	<div class="container max-w-5xl mx-auto -mt-32">
		
		<div class="mx-0 sm:mx-6">
			
			<div class="bg-white bg-opacity-50 w-full p-8 md:p-24 text-xl md:text-2xl text-gray-800 leading-normal" style="font-family:Georgia,serif;">
				
				<!--Post Content-->

				<!--Lead Para-->
				<p class="text-2xl md:text-3xl mb-5">

					<p>{@html p1}</p>

				<!--/ Post Content-->
						
			</div>

				<!--Author-->
				<div class="flex w-full items-center font-sans p-8 md:p-24">
					<img class="w-10 h-10 rounded-full mr-4" src="..\src\lib\logo.png" alt="Avatar of Author">
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
