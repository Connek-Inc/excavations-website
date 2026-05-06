<script lang="ts">
	import { language } from '$lib/store/store';
	import SEO from '$lib/seo/SEO.svelte';
	import {
		localBusinessJsonLd,
		websiteJsonLd,
		serviceJsonLd,
		breadcrumbJsonLd,
		faqJsonLd,
		SITE
	} from '$lib/seo/seo-config';
	import Footer from '$lib/Footer.svelte';
	import ContactUs from '$lib/ContactUs.svelte';
	import InlineCTA from '$lib/components/InlineCTA.svelte';
	import { cities as allCities } from '$lib/seo/cities-data';
	import {
		ArrowRight,
		Phone,
		Calendar,
		CheckCircle2,
		Star,
		Shield,
		MapPin,
		Clock,
		Award
	} from 'lucide-svelte';

	export let data: { city: import('$lib/seo/cities-data').CityData };

	const city = data.city;
	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';
	const pagePath = `/mini-excavation/${city.slug}`;
	const pageUrl = `${SITE.url}${pagePath}`;

	$: t = {
		fr: {
			title: `Mini Excavation ${city.name} | #1 au Québec | Mini Excavations Érable`,
			description: `⭐ Mini Excavation ${city.name} ✓ Drain français, fondation, fissure, démolition. Mini-pelle pour terrains restreints. Certifié RBQ. Garantie 15 ans. Soumission gratuite 24h ☎ 514-830-9973`,
			keywords: `mini excavation ${city.name}, mini excavations ${city.name}, mini-excavation ${city.name}, mini-pelle ${city.name}, drain français ${city.name}, excavation ${city.name}, fissure fondation ${city.name}, RBQ ${city.name}, mini excavation Québec, mini excavation Montréal`,
			heroTag: `📍 Mini Excavation ${city.name}, ${city.region}`,
			h1: `Mini Excavation à ${city.name}`,
			h1sub: `Spécialiste mini-pelle et drain français à ${city.name} et ${city.region}`,
			intro: `Mini Excavations Érable est l'entreprise #1 de mini excavation à ${city.name}. Notre équipe certifiée RBQ intervient avec mini-pelles et mini-excavateurs adaptés aux terrains résidentiels de ${city.name}. Drain français, réparation de fissures, fondation, démolition et inspection caméra. Soumission gratuite en 24h.`,
			ctaQuote: 'Soumission gratuite',
			ctaCall: '(514) 830-9973',
			servicesTitle: `Nos services de mini excavation à ${city.name}`,
			services: [
				{ icon: '💧', title: 'Drain Français', desc: `Installation, réparation et remplacement de drain français à ${city.name}. Garantie 15 ans transférable.`, link: '/services/drain-francais' },
				{ icon: '🏠', title: 'Réparation Fissures', desc: `Injection époxy et polyuréthane pour fissures de fondation à ${city.name}. Étanche à vie.`, link: '/services/reparation-fissures' },
				{ icon: '🚜', title: 'Excavation Mini-Pelle', desc: `Mini-pelle pour terrains restreints, cours arrière et accès difficiles à ${city.name}.`, link: '/services/excavation' },
				{ icon: '🔨', title: 'Démolition', desc: `Démolition de garage, cabanon, perron et piscine à ${city.name}. Tri et recyclage écoresponsable.`, link: '/services/demolition' },
				{ icon: '📹', title: 'Inspection Caméra', desc: `Diagnostic HD de drain et égout sans excavation à ${city.name}. Rapport vidéo complet.`, link: '/services/inspection-camera' },
				{ icon: '🚨', title: 'Urgence 24/7', desc: `Refoulement, infiltration, fissure majeure à ${city.name}. Intervention en moins de 2h.`, link: '/urgences' }
			],
			whyTitle: `Pourquoi choisir Mini Excavations Érable à ${city.name} ?`,
			why: [
				{ icon: MapPin, title: `Service local ${city.name}`, desc: `Équipe basée près de ${city.name}, intervention rapide. Connaissance du sol et règlements municipaux.` },
				{ icon: Shield, title: 'Certifié RBQ APCHQ CMTQ', desc: 'Toutes les licences requises au Québec. Couverture assurance complète.' },
				{ icon: Award, title: 'Garantie 15 ans', desc: 'Garantie écrite transférable au prochain propriétaire. Unique au Québec.' },
				{ icon: Clock, title: 'Réponse 24h', desc: 'Soumission gratuite, détaillée, sans engagement. Service urgence 24/7.' },
				{ icon: Star, title: '4.9/5 (127 avis)', desc: 'Plus de 500 projets réalisés au Québec. Notre réputation parle pour nous.' },
				{ icon: CheckCircle2, title: '15+ ans d\'expérience', desc: 'Spécialisés en mini excavation depuis 2010. Expertise approfondie.' }
			],
			pricesTitle: `Prix mini excavation à ${city.name} en 2026`,
			prices: [
				{ service: 'Mini-pelle 1.7T (heure)', price: 'Dès 95$/h' },
				{ service: 'Mini-pelle 3T (heure)', price: 'Dès 125$/h' },
				{ service: 'Drain français complet', price: 'Dès 4 000$' },
				{ service: 'Réparation fissure (injection)', price: 'Dès 450$' },
				{ service: 'Démolition garage', price: 'Dès 12 000$' },
				{ service: 'Inspection caméra drain', price: 'Dès 250$' }
			],
			faqTitle: `FAQ — Mini excavation à ${city.name}`,
			faqs: [
				{
					q: `Combien coûte une mini excavation à ${city.name} ?`,
					a: `Les tarifs varient de 95$ à 195$/h selon la machinerie. Pour un drain français complet à ${city.name}, comptez entre 4 000$ et 12 000$. Soumission détaillée gratuite en 24h.`
				},
				{
					q: `Faut-il un permis pour la mini excavation à ${city.name} ?`,
					a: `Selon le type de travaux et la municipalité de ${city.name}, certains projets requièrent un permis (drain français côté rue, raccordement égout). Nous nous occupons des démarches incluses dans nos services.`
				},
				{
					q: `Combien de temps prend l'installation d'un drain français à ${city.name} ?`,
					a: `Pour une maison standard à ${city.name}, l'installation complète d'un drain français prend 2 à 4 jours. Notre soumission inclut un échéancier précis.`
				},
				{
					q: `Êtes-vous assurés à ${city.name} ?`,
					a: `Oui, couverture complète : responsabilité civile 5 millions, CNESST pour travailleurs, assurance dommages biens. Tous nos opérateurs ont leur carte CCQ.`
				}
			]
		},
		en: {
			title: `Mini Excavation ${city.name} | #1 in Quebec | Mini Excavations Érable`,
			description: `⭐ Mini Excavation ${city.name} ✓ French drain, foundation, crack, demolition. Mini-excavator for tight spaces. RBQ certified. 15-year warranty. Free quote 24h ☎ 514-830-9973`,
			keywords: `mini excavation ${city.name}, mini excavator ${city.name}, french drain ${city.name}, excavation ${city.name}, foundation crack ${city.name}, RBQ ${city.name}`,
			heroTag: `📍 Mini Excavation ${city.name}, ${city.region}`,
			h1: `Mini Excavation in ${city.name}`,
			h1sub: `Mini-excavator and French drain specialist in ${city.name} and ${city.region}`,
			intro: `Mini Excavations Érable is the #1 mini excavation company in ${city.name}. Our RBQ-certified team works with mini-excavators adapted to residential terrains in ${city.name}. French drain, crack repair, foundation, demolition and camera inspection. Free 24h quote.`,
			ctaQuote: 'Free quote',
			ctaCall: '(514) 830-9973',
			servicesTitle: `Our mini excavation services in ${city.name}`,
			services: [
				{ icon: '💧', title: 'French Drain', desc: `French drain installation, repair and replacement in ${city.name}. 15-year transferable warranty.`, link: '/services/drain-francais' },
				{ icon: '🏠', title: 'Crack Repair', desc: `Epoxy and polyurethane injection for foundation cracks in ${city.name}. Watertight for life.`, link: '/services/reparation-fissures' },
				{ icon: '🚜', title: 'Mini-Excavator Excavation', desc: `Mini-excavator for tight terrains, backyards and difficult access in ${city.name}.`, link: '/services/excavation' },
				{ icon: '🔨', title: 'Demolition', desc: `Garage, shed, porch and pool demolition in ${city.name}. Eco-friendly sorting and recycling.`, link: '/services/demolition' },
				{ icon: '📹', title: 'Camera Inspection', desc: `HD drain and sewer diagnosis without excavation in ${city.name}. Complete video report.`, link: '/services/inspection-camera' },
				{ icon: '🚨', title: '24/7 Emergency', desc: `Backup, infiltration, major crack in ${city.name}. Intervention in less than 2h.`, link: '/urgences' }
			],
			whyTitle: `Why choose Mini Excavations Érable in ${city.name}?`,
			why: [
				{ icon: MapPin, title: `Local service in ${city.name}`, desc: `Team based near ${city.name}, fast response. Knowledge of soil and municipal regulations.` },
				{ icon: Shield, title: 'RBQ APCHQ CMTQ certified', desc: 'All licenses required in Quebec. Full insurance coverage.' },
				{ icon: Award, title: '15-year warranty', desc: 'Written warranty transferable to next owner. Unique in Quebec.' },
				{ icon: Clock, title: '24h response', desc: 'Free detailed quote, no obligation. 24/7 emergency service.' },
				{ icon: Star, title: '4.9/5 (127 reviews)', desc: 'Over 500 projects completed in Quebec. Our reputation speaks for itself.' },
				{ icon: CheckCircle2, title: '15+ years experience', desc: 'Specialized in mini excavation since 2010. Deep expertise.' }
			],
			pricesTitle: `Mini excavation prices in ${city.name} 2026`,
			prices: [
				{ service: '1.7T mini-excavator (hour)', price: 'From $95/h' },
				{ service: '3T mini-excavator (hour)', price: 'From $125/h' },
				{ service: 'Complete French drain', price: 'From $4,000' },
				{ service: 'Crack repair (injection)', price: 'From $450' },
				{ service: 'Garage demolition', price: 'From $12,000' },
				{ service: 'Drain camera inspection', price: 'From $250' }
			],
			faqTitle: `FAQ — Mini excavation in ${city.name}`,
			faqs: [
				{
					q: `How much does mini excavation cost in ${city.name}?`,
					a: `Rates vary from $95 to $195/h depending on machinery. For a complete French drain in ${city.name}, count $4,000 to $12,000. Free detailed quote in 24h.`
				},
				{
					q: `Do I need a permit for mini excavation in ${city.name}?`,
					a: `Depending on the type of work and ${city.name} municipality, some projects require a permit. We handle the paperwork included in our services.`
				},
				{
					q: `How long does French drain installation take in ${city.name}?`,
					a: `For a standard home in ${city.name}, complete French drain installation takes 2 to 4 days. Our quote includes a precise schedule.`
				},
				{
					q: `Are you insured in ${city.name}?`,
					a: `Yes, full coverage: $5 million civil liability, CNESST for workers, property damage insurance.`
				}
			]
		},
		es: {
			title: `Mini Excavación ${city.name} | #1 Quebec | Mini Excavations Érable`,
			description: `⭐ Mini Excavación ${city.name} ✓ Drenaje francés, cimientos, grieta, demolición. Mini-excavadora para espacios restringidos. Certificado RBQ. Garantía 15 años. Cotización gratuita 24h.`,
			keywords: `mini excavación ${city.name}, mini-excavadora ${city.name}, drenaje francés ${city.name}, excavación ${city.name}, RBQ ${city.name}`,
			heroTag: `📍 Mini Excavación ${city.name}, ${city.region}`,
			h1: `Mini Excavación en ${city.name}`,
			h1sub: `Especialista en mini-excavadora y drenaje francés en ${city.name}`,
			intro: `Mini Excavations Érable es la empresa #1 de mini excavación en ${city.name}. Nuestro equipo certificado RBQ trabaja con mini-excavadoras adaptadas a terrenos residenciales en ${city.name}. Drenaje francés, reparación de grietas, cimientos, demolición e inspección con cámara.`,
			ctaQuote: 'Cotización gratuita',
			ctaCall: '(514) 830-9973',
			servicesTitle: `Nuestros servicios en ${city.name}`,
			services: [
				{ icon: '💧', title: 'Drenaje Francés', desc: `Instalación, reparación y reemplazo de drenaje francés en ${city.name}.`, link: '/services/drain-francais' },
				{ icon: '🏠', title: 'Reparación Grietas', desc: `Inyección epoxi y poliuretano para grietas de cimientos en ${city.name}.`, link: '/services/reparation-fissures' },
				{ icon: '🚜', title: 'Excavación Mini-Excavadora', desc: `Mini-excavadora para terrenos restringidos en ${city.name}.`, link: '/services/excavation' },
				{ icon: '🔨', title: 'Demolición', desc: `Demolición de garaje, cobertizo, piscina en ${city.name}.`, link: '/services/demolition' },
				{ icon: '📹', title: 'Inspección Cámara', desc: `Diagnóstico HD de drenaje sin excavación en ${city.name}.`, link: '/services/inspection-camera' },
				{ icon: '🚨', title: 'Urgencia 24/7', desc: `Reflujo, infiltración, grieta mayor en ${city.name}. Intervención en menos de 2h.`, link: '/urgences' }
			],
			whyTitle: `¿Por qué elegirnos en ${city.name}?`,
			why: [
				{ icon: MapPin, title: `Servicio local ${city.name}`, desc: `Equipo basado cerca de ${city.name}.` },
				{ icon: Shield, title: 'Certificado RBQ', desc: 'Todas las licencias en Quebec.' },
				{ icon: Award, title: 'Garantía 15 años', desc: 'Transferible al próximo propietario.' },
				{ icon: Clock, title: 'Respuesta 24h', desc: 'Cotización gratuita sin compromiso.' },
				{ icon: Star, title: '4.9/5 (127 reseñas)', desc: '+500 proyectos en Quebec.' },
				{ icon: CheckCircle2, title: '15+ años', desc: 'Especialistas desde 2010.' }
			],
			pricesTitle: `Precios mini excavación ${city.name} 2026`,
			prices: [
				{ service: 'Mini-excavadora 1.7T (hora)', price: 'Desde $95/h' },
				{ service: 'Mini-excavadora 3T (hora)', price: 'Desde $125/h' },
				{ service: 'Drenaje francés completo', price: 'Desde $4,000' },
				{ service: 'Reparación grieta (inyección)', price: 'Desde $450' },
				{ service: 'Demolición garaje', price: 'Desde $12,000' },
				{ service: 'Inspección cámara', price: 'Desde $250' }
			],
			faqTitle: `FAQ — Mini excavación en ${city.name}`,
			faqs: [
				{
					q: `¿Cuánto cuesta una mini excavación en ${city.name}?`,
					a: `Las tarifas varían de $95 a $195/h según la maquinaria. Cotización detallada gratuita en 24h.`
				},
				{
					q: `¿Necesito permiso para mini excavación en ${city.name}?`,
					a: `Depende del tipo de trabajo y municipalidad. Nos encargamos de los trámites.`
				},
				{
					q: `¿Cuánto tiempo toma una instalación de drenaje francés en ${city.name}?`,
					a: `Para una casa estándar en ${city.name}, 2 a 4 días.`
				},
				{
					q: `¿Están asegurados en ${city.name}?`,
					a: `Sí, cobertura completa: $5 millones responsabilidad civil, CNESST.`
				}
			]
		}
	};

	$: c = t[lang];

	$: faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: c.faqs.map((f) => ({
			'@type': 'Question',
			name: f.q,
			acceptedAnswer: { '@type': 'Answer', text: f.a }
		}))
	};

	$: localGeoJsonLd = {
		'@context': 'https://schema.org',
		'@type': ['LocalBusiness', 'GeneralContractor'],
		'@id': `${pageUrl}#local`,
		name: `${SITE.name} — Mini Excavation ${city.name}`,
		image: SITE.logo,
		url: pageUrl,
		telephone: SITE.phone,
		email: SITE.email,
		priceRange: '$$',
		description: c.description,
		address: {
			'@type': 'PostalAddress',
			addressLocality: city.name,
			addressRegion: 'QC',
			addressCountry: 'CA',
			postalCode: city.postalArea
		},
		geo: { '@type': 'GeoCoordinates', latitude: city.lat, longitude: city.lng },
		areaServed: { '@type': 'City', name: city.name },
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.9',
			reviewCount: '127',
			bestRating: '5'
		}
	};

	$: jsonLd = [
		localBusinessJsonLd(lang),
		localGeoJsonLd,
		serviceJsonLd({
			name: `Mini Excavation ${city.name}`,
			description: c.intro,
			url: pageUrl,
			lang,
			priceFrom: 95,
			priceTo: 195
		}),
		faqSchema,
		breadcrumbJsonLd([
			{ name: lang === 'fr' ? 'Accueil' : lang === 'es' ? 'Inicio' : 'Home', url: SITE.url },
			{ name: 'Mini Excavation', url: `${SITE.url}/mini-excavation` },
			{ name: city.name, url: pageUrl }
		])
	];
</script>

<SEO
	{lang}
	title={c.title}
	description={c.description}
	keywords={c.keywords}
	path={pagePath}
	{jsonLd}
/>

<main class="bg-white dark:bg-black text-black dark:text-white">
	<!-- Hero -->
	<section class="relative pt-32 pb-16 md:pb-20 px-4 bg-gradient-to-br from-yellow-50 via-white to-yellow-50 dark:from-zinc-950 dark:via-black dark:to-zinc-950 overflow-hidden">
		<div class="absolute top-0 right-0 w-96 h-96 bg-[#febd17] rounded-full blur-[150px] opacity-15 -z-0 hidden md:block"></div>

		<div class="container max-w-5xl relative z-10">
			<nav aria-label="Breadcrumb" class="mb-6 text-sm">
				<ol class="flex flex-wrap gap-2 text-gray-500 dark:text-gray-400">
					<li><a href="/" class="hover:text-[#febd17]">{lang === 'fr' ? 'Accueil' : lang === 'es' ? 'Inicio' : 'Home'}</a></li>
					<li>/</li>
					<li><a href="/mini-excavation" class="hover:text-[#febd17]">Mini Excavation</a></li>
					<li>/</li>
					<li class="text-[#febd17] font-bold" aria-current="page">{city.name}</li>
				</ol>
			</nav>

			<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#febd17]/10 border border-[#febd17]/30 mb-5">
				<span class="text-[#febd17] font-black tracking-wider uppercase text-xs">{c.heroTag}</span>
			</div>

			<h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-3 leading-[1.05]">
				<span class="bg-gradient-to-r from-[#febd17] to-orange-500 bg-clip-text text-transparent">{c.h1}</span>
			</h1>
			<p class="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-300 mb-5">{c.h1sub}</p>

			<p class="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed mb-8">
				{c.intro}
			</p>

			<div class="flex flex-wrap gap-2 mb-4">
				<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/30 text-yellow-700 dark:text-yellow-400 text-xs font-bold">
					<Star class="w-3.5 h-3.5 fill-current" /> 4.9/5 (127 avis)
				</span>
				<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-400 text-xs font-bold">
					<CheckCircle2 class="w-3.5 h-3.5" /> RBQ • APCHQ • CMTQ
				</span>
				<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-400 text-xs font-bold">
					⚡ 24h
				</span>
			</div>

			<!-- RBQ License Badge — verifiable -->
			<a href="https://www.rbq.gouv.qc.ca/recherche-licence-titulaire?numLicence=5823-7736-01" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#febd17]/10 dark:bg-[#febd17]/15 border border-[#febd17]/40 hover:border-[#febd17] hover:bg-[#febd17]/20 transition-colors mb-8 w-fit shadow-sm">
				<CheckCircle2 class="w-4 h-4 text-green-600 dark:text-green-400" />
				<span class="text-sm font-bold text-gray-700 dark:text-gray-200">
					{lang === 'fr' ? 'Licence R.B.Q.' : lang === 'es' ? 'Licencia R.B.Q.' : 'R.B.Q. License'}
				</span>
				<span class="text-sm font-black font-mono text-[#febd17] tracking-wider">5823-7736-01</span>
			</a>

			<div class="flex flex-col sm:flex-row gap-3">
				<a href="#contact" class="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#febd17] to-yellow-500 text-black font-black text-base shadow-2xl shadow-yellow-500/40 hover:scale-105 transition-all">
					<Calendar class="w-5 h-5" />
					{c.ctaQuote}
					<ArrowRight class="w-4 h-4" />
				</a>
				<a href="tel:+15148309973" class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-bold text-base transition-all hover:scale-105">
					<Phone class="w-5 h-5" />
					{c.ctaCall}
				</a>
			</div>
		</div>
	</section>

	<!-- Services -->
	<section class="py-16 md:py-20 px-4 bg-white dark:bg-black">
		<div class="container max-w-6xl">
			<h2 class="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-10 text-center">{c.servicesTitle}</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
				{#each c.services as svc}
					<a href={svc.link} class="bg-gray-50 dark:bg-zinc-900 rounded-2xl p-6 border border-gray-200 dark:border-zinc-800 hover:border-[#febd17] hover:-translate-y-1 transition-all group">
						<div class="text-4xl mb-3">{svc.icon}</div>
						<h3 class="text-lg font-black mb-2 group-hover:text-[#febd17] transition-colors">{svc.title}</h3>
						<p class="text-sm text-gray-600 dark:text-gray-400">{svc.desc}</p>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- Why us -->
	<section class="py-16 md:py-20 px-4 bg-gray-50 dark:bg-zinc-950">
		<div class="container max-w-6xl">
			<h2 class="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-10 text-center">{c.whyTitle}</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
				{#each c.why as w}
					<div class="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-200 dark:border-zinc-800">
						<div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#febd17] to-orange-500 flex items-center justify-center text-black mb-4">
							<svelte:component this={w.icon} class="w-6 h-6" />
						</div>
						<h3 class="font-black text-lg mb-2">{w.title}</h3>
						<p class="text-sm text-gray-600 dark:text-gray-400">{w.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Prices -->
	<section class="py-16 md:py-20 px-4 bg-white dark:bg-black">
		<div class="container max-w-4xl">
			<h2 class="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-10 text-center">{c.pricesTitle}</h2>
			<div class="bg-gray-50 dark:bg-zinc-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800">
				<table class="w-full">
					<thead class="bg-black text-white">
						<tr>
							<th class="text-left p-4 font-black">Service</th>
							<th class="text-right p-4 font-black">Prix</th>
						</tr>
					</thead>
					<tbody>
						{#each c.prices as p, i}
							<tr class="border-t border-gray-200 dark:border-zinc-800 {i % 2 === 1 ? 'bg-white dark:bg-zinc-950' : ''}">
								<td class="p-4 font-bold text-sm md:text-base">{p.service}</td>
								<td class="p-4 text-right text-[#febd17] font-black text-sm md:text-base">{p.price}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</section>

	<InlineCTA variant="banner" />

	<!-- FAQ -->
	<section class="py-16 md:py-20 px-4 bg-white dark:bg-black">
		<div class="container max-w-4xl">
			<h2 class="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-10 text-center">{c.faqTitle}</h2>
			<div class="space-y-3">
				{#each c.faqs as faq}
					<details class="group bg-gray-50 dark:bg-zinc-900 rounded-2xl p-6 border border-gray-200 dark:border-zinc-800">
						<summary class="font-bold text-base md:text-lg cursor-pointer flex justify-between items-center">
							{faq.q}
							<span class="text-[#febd17] text-2xl group-open:rotate-45 transition-transform">+</span>
						</summary>
						<p class="mt-3 text-gray-600 dark:text-gray-400 text-sm md:text-base">{faq.a}</p>
					</details>
				{/each}
			</div>
		</div>
	</section>

	<!-- Other cities -->
	<section class="py-12 md:py-16 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-zinc-950">
		<div class="container max-w-6xl">
			<h2 class="text-2xl md:text-3xl font-black mb-6 text-center">
				{lang === 'fr' ? 'Mini excavation dans d\'autres villes' : lang === 'es' ? 'Mini excavación en otras ciudades' : 'Mini excavation in other cities'}
			</h2>
			<div class="flex flex-wrap gap-2 justify-center">
				{#each allCities.filter(c2 => c2.slug !== city.slug).slice(0, 30) as other}
					<a href={`/mini-excavation/${other.slug}`} class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:bg-[#febd17] hover:text-black hover:border-[#febd17] text-xs font-semibold transition-all">
						<MapPin class="w-3 h-3" />
						{other.name}
					</a>
				{/each}
			</div>
		</div>
	</section>

	<section id="contact" class="py-16 px-4 bg-gray-50 dark:bg-zinc-950">
		<div class="container max-w-5xl">
			<ContactUs nDays={9} />
		</div>
	</section>

	<Footer />
</main>
