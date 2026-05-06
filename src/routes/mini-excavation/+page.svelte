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
	import {
		ArrowRight,
		Phone,
		Calendar,
		CheckCircle2,
		Star,
		Shield,
		Award,
		Zap,
		MapPin
	} from 'lucide-svelte';

	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';

	const t = {
		fr: {
			title: 'Mini Excavation Québec | #1 au Québec | Mini Excavations Érable',
			description:
				'⭐ Mini Excavation #1 au Québec depuis 15 ans ✓ Mini-pelle, mini-excavateur pour terrains résidentiels. Drain français, fondation, démolition. Certifié RBQ. Soumission gratuite 24h.',
			keywords:
				'mini excavation, mini excavation Québec, mini excavation Montréal, mini excavation Laval, mini excavations, mini-pelle, mini-excavateur, mini excavation prix, location mini excavation, entreprise mini excavation Québec',
			heroTag: '⭐ Mini Excavation #1 au Québec',
			h1: 'Mini Excavation au Québec',
			h1sub: "Spécialiste de la mini excavation depuis 15 ans",
			intro:
				"Mini Excavations Érable est l'entreprise #1 de mini excavation au Québec. Nos mini-pelles et mini-excavateurs accèdent aux terrains les plus difficiles : cours arrière, espaces restreints, accès étroits. Idéal pour drain français, fondation, piscine, démolition et terrassement résidentiel.",
			ctaQuote: 'Soumission gratuite',
			ctaCall: '(514) 830-9973',
			whatTitle: "Qu'est-ce que la mini excavation ?",
			whatBody:
				"La mini excavation utilise des machines compactes (mini-pelles de 1 à 8 tonnes) pour réaliser des travaux d'excavation dans des espaces où les machines traditionnelles ne peuvent pas accéder. Parfaite pour les terrains résidentiels avec accès limité, les cours arrière clôturées, ou les zones sensibles près des fondations existantes.",
			whenTitle: 'Quand utiliser la mini excavation ?',
			whenItems: [
				{ icon: '💧', title: 'Installation drain français', desc: 'Excavation périphérique sans endommager le terrain' },
				{ icon: '🏠', title: 'Réparation fondation', desc: 'Accès précis sans dommage aux structures voisines' },
				{ icon: '🏊', title: 'Excavation piscine', desc: 'Idéal pour piscines creusées en cour arrière' },
				{ icon: '🔧', title: 'Réparation conduite', desc: 'Excavation localisée pour égouts et aqueduc' },
				{ icon: '🪨', title: 'Aménagement paysager', desc: 'Murs de soutènement, terrassement, nivellement' },
				{ icon: '🏚️', title: 'Démolition partielle', desc: 'Garage, cabanon, perron, balcon béton' }
			],
			advantagesTitle: 'Avantages de la mini excavation',
			advantagesList: [
				'✅ Accès aux terrains restreints (clôtures, allées étroites)',
				'✅ Pas de dommage à la pelouse ou au paysagement',
				'✅ Précision millimétrique près des structures',
				'✅ Économie : moins de remblayage et restauration',
				'✅ Plus rapide pour petits projets (1-3 jours)',
				'✅ Écoresponsable : moins de carburant, moins de bruit'
			],
			pricesTitle: 'Prix mini excavation Québec 2026',
			pricesIntro:
				'Les tarifs de mini excavation au Québec varient selon la machinerie, la durée et la complexité du terrain.',
			prices: [
				{ service: 'Mini-pelle 1.7T (heure)', price: 'Dès 95$/h', detail: 'Espaces très restreints, allées étroites' },
				{ service: 'Mini-pelle 3T (heure)', price: 'Dès 125$/h', detail: 'Standard résidentiel, cour arrière' },
				{ service: 'Mini-pelle 5T (heure)', price: 'Dès 165$/h', detail: 'Drain français, fondation moyenne' },
				{ service: 'Mini-pelle 8T (heure)', price: 'Dès 195$/h', detail: 'Excavation profonde, gros projets' },
				{ service: 'Forfait journalier', price: 'Dès 850$/jour', detail: 'Avec opérateur certifié inclus' }
			],
			pricesNote: '* Prix incluant opérateur certifié, transport et carburant. Soumission détaillée gratuite.',
			areasTitle: 'Mini excavation dans toute la grande région du Québec',
			areasIntro: 'Nous offrons nos services de mini excavation à :',
			whyTitle: 'Pourquoi choisir Mini Excavations Érable ?',
			why: [
				{ icon: Shield, title: 'Certifié RBQ APCHQ CMTQ', desc: 'Toutes les licences requises au Québec' },
				{ icon: Award, title: 'Garantie 15 ans', desc: 'Garantie écrite transférable au prochain propriétaire' },
				{ icon: Zap, title: 'Réponse en 24h', desc: 'Soumission détaillée et gratuite, sans engagement' },
				{ icon: Star, title: '4.9/5 (127 avis)', desc: 'Reconnu pour la qualité et la propreté du travail' }
			],
			faqTitle: 'Questions fréquentes — Mini excavation',
			faqs: [
				{
					q: 'Quelle est la différence entre mini excavation et excavation traditionnelle ?',
					a: "La mini excavation utilise des machines compactes (1-8 tonnes) qui accèdent aux espaces restreints (cours arrière, allées étroites). L'excavation traditionnelle utilise des machines lourdes (15-30 tonnes) pour gros chantiers. Les deux sont précis mais la mini excavation est plus adaptée pour résidentiel."
				},
				{
					q: 'Combien coûte une mini excavation au Québec ?',
					a: "Le coût varie de 95$ à 195$/h selon la machinerie. Pour un drain français complet, comptez 4 000$ à 12 000$. Pour une excavation de piscine, 3 500$ à 8 000$. Soumission gratuite et détaillée en 24h."
				},
				{
					q: 'Combien de temps prend une mini excavation ?',
					a: "Cela dépend du projet : drain français résidentiel = 2-4 jours, excavation piscine = 1-2 jours, fondation = 3-7 jours. Notre soumission inclut un échéancier précis."
				},
				{
					q: 'Avez-vous une mini-pelle pour très petits espaces ?',
					a: "Oui, nous avons des mini-pelles dès 1.7 tonnes qui passent par des ouvertures de 90 cm. Idéal pour cours intérieures et accès très limités."
				},
				{
					q: 'Faut-il un permis pour la mini excavation ?',
					a: "Selon la municipalité et le type de travaux. À Montréal, certains projets requièrent un permis (drain français côté rue, raccordement égout). Nous nous occupons des démarches incluses dans nos services."
				},
				{
					q: 'Êtes-vous assurés ?',
					a: "Oui, couverture complète : responsabilité civile 5 millions, CNESST pour travailleurs, assurance dommages biens. Tous nos opérateurs ont leur carte CCQ."
				}
			]
		},
		en: {
			title: 'Mini Excavation Quebec | #1 in Quebec | Mini Excavations Érable',
			description:
				'⭐ Mini Excavation #1 in Quebec for 15 years ✓ Mini-excavator for residential terrain. French drain, foundation, demolition. RBQ certified. Free quote 24h.',
			keywords:
				'mini excavation, mini excavation Quebec, mini excavation Montreal, mini excavator, mini-excavator, mini excavation price, mini excavation rental, mini excavation company Quebec',
			heroTag: '⭐ Mini Excavation #1 in Quebec',
			h1: 'Mini Excavation in Quebec',
			h1sub: 'Mini excavation specialist for 15 years',
			intro:
				"Mini Excavations Érable is Quebec's #1 mini excavation company. Our mini-excavators access the most challenging terrains: backyards, tight spaces, narrow access. Perfect for French drain, foundation, pool, demolition and residential earthworks.",
			ctaQuote: 'Free quote',
			ctaCall: '(514) 830-9973',
			whatTitle: 'What is mini excavation?',
			whatBody:
				"Mini excavation uses compact machinery (1 to 8 ton mini-excavators) to perform excavation work in spaces where traditional machinery cannot access. Perfect for residential terrains with limited access, fenced backyards, or sensitive areas near existing foundations.",
			whenTitle: 'When to use mini excavation?',
			whenItems: [
				{ icon: '💧', title: 'French drain installation', desc: 'Perimeter excavation without damaging the terrain' },
				{ icon: '🏠', title: 'Foundation repair', desc: 'Precise access without damaging neighboring structures' },
				{ icon: '🏊', title: 'Pool excavation', desc: 'Ideal for in-ground pools in backyards' },
				{ icon: '🔧', title: 'Pipe repair', desc: 'Localized excavation for sewers and water mains' },
				{ icon: '🪨', title: 'Landscaping', desc: 'Retaining walls, earthworks, leveling' },
				{ icon: '🏚️', title: 'Partial demolition', desc: 'Garage, shed, porch, concrete balcony' }
			],
			advantagesTitle: 'Mini excavation advantages',
			advantagesList: [
				'✅ Access to restricted terrains (fences, narrow paths)',
				'✅ No damage to lawn or landscaping',
				'✅ Millimeter precision near structures',
				'✅ Saves money: less backfilling and restoration',
				'✅ Faster for small projects (1-3 days)',
				'✅ Eco-friendly: less fuel, less noise'
			],
			pricesTitle: 'Mini excavation prices Quebec 2026',
			pricesIntro:
				'Mini excavation rates in Quebec vary based on machinery, duration and terrain complexity.',
			prices: [
				{ service: '1.7T mini-excavator (hour)', price: 'From $95/h', detail: 'Very restricted spaces, narrow paths' },
				{ service: '3T mini-excavator (hour)', price: 'From $125/h', detail: 'Residential standard, backyard' },
				{ service: '5T mini-excavator (hour)', price: 'From $165/h', detail: 'French drain, medium foundation' },
				{ service: '8T mini-excavator (hour)', price: 'From $195/h', detail: 'Deep excavation, large projects' },
				{ service: 'Daily flat rate', price: 'From $850/day', detail: 'Certified operator included' }
			],
			pricesNote: '* Prices include certified operator, transport and fuel. Free detailed quote.',
			areasTitle: 'Mini excavation across Greater Quebec',
			areasIntro: 'We offer our mini excavation services in:',
			whyTitle: 'Why choose Mini Excavations Érable?',
			why: [
				{ icon: Shield, title: 'RBQ APCHQ CMTQ certified', desc: 'All licenses required in Quebec' },
				{ icon: Award, title: '15-year warranty', desc: 'Written warranty transferable to next owner' },
				{ icon: Zap, title: '24h response', desc: 'Detailed free quote, no obligation' },
				{ icon: Star, title: '4.9/5 (127 reviews)', desc: 'Recognized for quality and clean work' }
			],
			faqTitle: 'Frequently asked questions — Mini excavation',
			faqs: [
				{
					q: 'What is the difference between mini excavation and traditional excavation?',
					a: "Mini excavation uses compact machinery (1-8 tons) that accesses restricted spaces (backyards, narrow paths). Traditional excavation uses heavy machinery (15-30 tons) for large projects. Both are precise but mini excavation is better suited for residential."
				},
				{
					q: 'How much does a mini excavation cost in Quebec?',
					a: "The cost varies from $95 to $195/h depending on the machine. For a complete French drain, count $4,000 to $12,000. For pool excavation, $3,500 to $8,000. Free detailed quote in 24h."
				},
				{
					q: 'How long does a mini excavation take?',
					a: "It depends on the project: residential French drain = 2-4 days, pool excavation = 1-2 days, foundation = 3-7 days. Our quote includes a precise schedule."
				},
				{
					q: 'Do you have a mini-excavator for very small spaces?',
					a: "Yes, we have mini-excavators starting from 1.7 tons that pass through 90cm openings. Ideal for inner courtyards and very limited access."
				},
				{
					q: 'Do you need a permit for mini excavation?',
					a: "Depends on municipality and type of work. In Montreal, some projects require a permit (street-side French drain, sewer connection). We handle the paperwork included in our services."
				},
				{
					q: 'Are you insured?',
					a: "Yes, full coverage: $5 million civil liability, CNESST for workers, property damage insurance. All our operators have their CCQ card."
				}
			]
		},
		es: {
			title: 'Mini Excavación Quebec | #1 en Quebec | Mini Excavations Érable',
			description:
				'⭐ Mini Excavación #1 en Quebec desde hace 15 años ✓ Mini-excavadora para terrenos residenciales. Drenaje francés, cimientos, demolición. Certificado RBQ. Cotización gratuita 24h.',
			keywords:
				'mini excavación, mini excavación Quebec, mini excavación Montreal, mini-excavadora, mini excavación precio, alquiler mini excavación, empresa mini excavación Quebec',
			heroTag: '⭐ Mini Excavación #1 en Quebec',
			h1: 'Mini Excavación en Quebec',
			h1sub: 'Especialista en mini excavación desde hace 15 años',
			intro:
				'Mini Excavations Érable es la empresa #1 de mini excavación en Quebec. Nuestras mini-excavadoras acceden a los terrenos más difíciles: patios traseros, espacios restringidos, accesos estrechos. Ideal para drenaje francés, cimientos, piscina, demolición y movimiento de tierras residencial.',
			ctaQuote: 'Cotización gratuita',
			ctaCall: '(514) 830-9973',
			whatTitle: '¿Qué es la mini excavación?',
			whatBody:
				'La mini excavación utiliza maquinaria compacta (mini-excavadoras de 1 a 8 toneladas) para realizar trabajos de excavación en espacios donde la maquinaria tradicional no puede acceder. Perfecto para terrenos residenciales con acceso limitado, patios traseros cercados, o áreas sensibles cerca de cimientos existentes.',
			whenTitle: '¿Cuándo usar mini excavación?',
			whenItems: [
				{ icon: '💧', title: 'Instalación drenaje francés', desc: 'Excavación perimetral sin dañar el terreno' },
				{ icon: '🏠', title: 'Reparación cimientos', desc: 'Acceso preciso sin daño a estructuras vecinas' },
				{ icon: '🏊', title: 'Excavación piscina', desc: 'Ideal para piscinas enterradas en patios' },
				{ icon: '🔧', title: 'Reparación tubería', desc: 'Excavación localizada para alcantarillado y agua' },
				{ icon: '🪨', title: 'Paisajismo', desc: 'Muros de contención, nivelación de terreno' },
				{ icon: '🏚️', title: 'Demolición parcial', desc: 'Garaje, cobertizo, balcón de concreto' }
			],
			advantagesTitle: 'Ventajas de la mini excavación',
			advantagesList: [
				'✅ Acceso a terrenos restringidos (cercas, pasillos estrechos)',
				'✅ Sin daño al césped o paisajismo',
				'✅ Precisión milimétrica cerca de estructuras',
				'✅ Ahorro: menos relleno y restauración',
				'✅ Más rápido para proyectos pequeños (1-3 días)',
				'✅ Eco-responsable: menos combustible, menos ruido'
			],
			pricesTitle: 'Precios mini excavación Quebec 2026',
			pricesIntro:
				'Las tarifas de mini excavación en Quebec varían según la maquinaria, duración y complejidad del terreno.',
			prices: [
				{ service: 'Mini-excavadora 1.7T (hora)', price: 'Desde $95/h', detail: 'Espacios muy restringidos' },
				{ service: 'Mini-excavadora 3T (hora)', price: 'Desde $125/h', detail: 'Estándar residencial, patio' },
				{ service: 'Mini-excavadora 5T (hora)', price: 'Desde $165/h', detail: 'Drenaje francés, cimientos' },
				{ service: 'Mini-excavadora 8T (hora)', price: 'Desde $195/h', detail: 'Excavación profunda' },
				{ service: 'Tarifa diaria', price: 'Desde $850/día', detail: 'Operador certificado incluido' }
			],
			pricesNote: '* Precios incluyen operador certificado, transporte y combustible. Cotización detallada gratuita.',
			areasTitle: 'Mini excavación en toda el área de Quebec',
			areasIntro: 'Ofrecemos servicios de mini excavación en:',
			whyTitle: '¿Por qué elegir Mini Excavations Érable?',
			why: [
				{ icon: Shield, title: 'Certificado RBQ APCHQ CMTQ', desc: 'Todas las licencias requeridas en Quebec' },
				{ icon: Award, title: 'Garantía 15 años', desc: 'Garantía escrita transferible al próximo propietario' },
				{ icon: Zap, title: 'Respuesta en 24h', desc: 'Cotización detallada gratuita sin compromiso' },
				{ icon: Star, title: '4.9/5 (127 reseñas)', desc: 'Reconocidos por calidad y trabajo limpio' }
			],
			faqTitle: 'Preguntas frecuentes — Mini excavación',
			faqs: [
				{
					q: '¿Cuál es la diferencia entre mini excavación y excavación tradicional?',
					a: 'La mini excavación usa maquinaria compacta (1-8 toneladas) que accede a espacios restringidos. La excavación tradicional usa maquinaria pesada (15-30 toneladas) para grandes obras.'
				},
				{
					q: '¿Cuánto cuesta una mini excavación en Quebec?',
					a: 'El costo varía de $95 a $195/h según la máquina. Para un drenaje francés completo, $4,000 a $12,000. Cotización gratuita y detallada en 24h.'
				},
				{
					q: '¿Cuánto tiempo toma una mini excavación?',
					a: 'Depende del proyecto: drenaje francés residencial = 2-4 días, piscina = 1-2 días, cimientos = 3-7 días.'
				},
				{
					q: '¿Tienen mini-excavadora para espacios muy pequeños?',
					a: 'Sí, mini-excavadoras desde 1.7 toneladas que pasan por aberturas de 90 cm. Ideal para patios interiores.'
				},
				{
					q: '¿Necesito permiso para mini excavación?',
					a: 'Depende de la municipalidad y tipo de trabajo. Nos encargamos de todos los trámites incluidos en el servicio.'
				},
				{
					q: '¿Están asegurados?',
					a: 'Sí, cobertura completa: $5 millones responsabilidad civil, CNESST para trabajadores, seguro de daños.'
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

	$: jsonLd = [
		localBusinessJsonLd(lang),
		websiteJsonLd(lang),
		serviceJsonLd({
			name: lang === 'fr' ? 'Mini Excavation au Québec' : lang === 'es' ? 'Mini Excavación en Quebec' : 'Mini Excavation in Quebec',
			description: c.intro,
			url: `${SITE.url}/mini-excavation`,
			lang,
			priceFrom: 95,
			priceTo: 195
		}),
		faqSchema,
		breadcrumbJsonLd([
			{ name: lang === 'fr' ? 'Accueil' : lang === 'es' ? 'Inicio' : 'Home', url: SITE.url },
			{
				name: lang === 'fr' ? 'Mini Excavation' : lang === 'es' ? 'Mini Excavación' : 'Mini Excavation',
				url: `${SITE.url}/mini-excavation`
			}
		])
	];

	const cities = [
		'Montréal', 'Laval', 'Longueuil', 'Brossard', 'Boucherville', 'Saint-Jérôme',
		'Terrebonne', 'Repentigny', 'Mascouche', 'Blainville', 'Mont-Tremblant',
		'Joliette', 'Vaudreuil-Dorion', 'Saint-Hyacinthe', 'Verdun', 'Westmount',
		'Saint-Laurent', 'Anjou', 'Pointe-Claire', 'LaSalle', 'Rosemère',
		'Sainte-Thérèse', 'Mirabel', 'Saint-Eustache', 'Beloeil', 'Sainte-Julie'
	];
</script>

<SEO
	{lang}
	title={c.title}
	description={c.description}
	keywords={c.keywords}
	path="/mini-excavation"
	{jsonLd}
/>

<main class="bg-white dark:bg-black text-black dark:text-white">
	<!-- Hero -->
	<section class="relative pt-32 pb-20 px-4 bg-gradient-to-br from-yellow-50 via-white to-yellow-50 dark:from-zinc-950 dark:via-black dark:to-zinc-950 overflow-hidden">
		<div class="absolute top-0 right-0 w-96 h-96 bg-[#febd17] rounded-full blur-[150px] opacity-15 -z-0"></div>
		<div class="absolute bottom-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-[150px] opacity-10 -z-0"></div>

		<div class="container max-w-5xl relative z-10">
			<nav aria-label="Breadcrumb" class="mb-6 text-sm">
				<ol class="flex flex-wrap gap-2 text-gray-500 dark:text-gray-400">
					<li><a href="/" class="hover:text-[#febd17]">{lang === 'fr' ? 'Accueil' : lang === 'es' ? 'Inicio' : 'Home'}</a></li>
					<li>/</li>
					<li class="text-[#febd17] font-bold" aria-current="page">{lang === 'fr' ? 'Mini Excavation' : lang === 'es' ? 'Mini Excavación' : 'Mini Excavation'}</li>
				</ol>
			</nav>

			<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#febd17]/10 border border-[#febd17]/30 mb-6">
				<span class="text-[#febd17] font-black tracking-wider uppercase text-xs">{c.heroTag}</span>
			</div>

			<h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 leading-[1.05]">
				<span class="bg-gradient-to-r from-[#febd17] to-orange-500 bg-clip-text text-transparent">{c.h1}</span>
			</h1>
			<p class="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-300 mb-6">{c.h1sub}</p>

			<p class="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed mb-8">
				{c.intro}
			</p>

			<!-- Trust badges -->
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
				<svg class="w-3 h-3 text-gray-400 group-hover:text-[#febd17]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
			</a>

			<div class="flex flex-col sm:flex-row gap-3">
				<a
					href="#contact"
					class="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#febd17] to-yellow-500 text-black font-black text-base shadow-2xl shadow-yellow-500/40 hover:scale-105 transition-all"
				>
					<Calendar class="w-5 h-5" />
					{c.ctaQuote}
					<ArrowRight class="w-4 h-4" />
				</a>
				<a
					href="tel:+15148309973"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-bold text-base transition-all hover:scale-105"
				>
					<Phone class="w-5 h-5" />
					{c.ctaCall}
				</a>
			</div>
		</div>
	</section>

	<!-- What is mini excavation -->
	<section class="py-16 md:py-24 px-4 bg-white dark:bg-black">
		<div class="container max-w-4xl">
			<h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">{c.whatTitle}</h2>
			<p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{c.whatBody}</p>
		</div>
	</section>

	<!-- When to use -->
	<section class="py-16 md:py-24 px-4 bg-gray-50 dark:bg-zinc-950">
		<div class="container max-w-6xl">
			<h2 class="text-3xl md:text-5xl font-black tracking-tight mb-12 text-center">{c.whenTitle}</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each c.whenItems as item}
					<div class="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-200 dark:border-zinc-800 hover:border-[#febd17] hover:-translate-y-1 transition-all">
						<div class="text-4xl mb-4">{item.icon}</div>
						<h3 class="text-xl font-black mb-2">{item.title}</h3>
						<p class="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Advantages -->
	<section class="py-16 md:py-24 px-4 bg-white dark:bg-black">
		<div class="container max-w-4xl">
			<h2 class="text-3xl md:text-5xl font-black tracking-tight mb-10">{c.advantagesTitle}</h2>
			<ul class="space-y-3">
				{#each c.advantagesList as adv}
					<li class="text-lg text-gray-700 dark:text-gray-300">{adv}</li>
				{/each}
			</ul>
		</div>
	</section>

	<!-- Prices -->
	<section class="py-16 md:py-24 px-4 bg-gradient-to-b from-yellow-50 to-white dark:from-zinc-950 dark:to-black">
		<div class="container max-w-5xl">
			<h2 class="text-3xl md:text-5xl font-black tracking-tight mb-4">{c.pricesTitle}</h2>
			<p class="text-lg text-gray-600 dark:text-gray-400 mb-10">{c.pricesIntro}</p>

			<div class="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden shadow-xl">
				<table class="w-full">
					<thead class="bg-black text-white">
						<tr>
							<th class="text-left p-4 font-black">Service</th>
							<th class="text-left p-4 font-black">Prix</th>
							<th class="text-left p-4 font-black hidden md:table-cell">Détail</th>
						</tr>
					</thead>
					<tbody>
						{#each c.prices as p, i}
							<tr class="border-t border-gray-200 dark:border-zinc-800 {i % 2 === 1 ? 'bg-gray-50 dark:bg-zinc-950' : ''}">
								<td class="p-4 font-bold">{p.service}</td>
								<td class="p-4 text-[#febd17] font-black">{p.price}</td>
								<td class="p-4 text-gray-600 dark:text-gray-400 text-sm hidden md:table-cell">{p.detail}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<p class="text-xs text-gray-500 dark:text-gray-500 mt-4 italic">{c.pricesNote}</p>
		</div>
	</section>

	<!-- Why us -->
	<section class="py-16 md:py-24 px-4 bg-white dark:bg-black">
		<div class="container max-w-5xl">
			<h2 class="text-3xl md:text-5xl font-black tracking-tight mb-12 text-center">{c.whyTitle}</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{#each c.why as w}
					<div class="text-center p-6 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800">
						<div class="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[#febd17] to-orange-500 flex items-center justify-center text-black mb-4">
							<svelte:component this={w.icon} class="w-7 h-7" />
						</div>
						<h3 class="font-black text-lg mb-2">{w.title}</h3>
						<p class="text-sm text-gray-600 dark:text-gray-400">{w.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Areas served -->
	<section class="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-zinc-950">
		<div class="container max-w-5xl">
			<h2 class="text-3xl md:text-5xl font-black tracking-tight mb-4">{c.areasTitle}</h2>
			<p class="text-lg text-gray-600 dark:text-gray-400 mb-8">{c.areasIntro}</p>
			<div class="flex flex-wrap gap-2">
				{#each cities as city}
					<a
						href={`/excavation/${city.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`}
						class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:bg-[#febd17] hover:text-black hover:border-[#febd17] text-sm font-semibold transition-all"
					>
						<MapPin class="w-3.5 h-3.5" />
						Mini excavation {city}
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- FAQ -->
	<section class="py-16 md:py-24 px-4 bg-white dark:bg-black">
		<div class="container max-w-4xl">
			<h2 class="text-3xl md:text-5xl font-black tracking-tight mb-12 text-center">{c.faqTitle}</h2>
			<div class="space-y-4">
				{#each c.faqs as faq}
					<details class="group bg-gray-50 dark:bg-zinc-900 rounded-2xl p-6 border border-gray-200 dark:border-zinc-800">
						<summary class="font-bold text-lg cursor-pointer flex justify-between items-center">
							{faq.q}
							<span class="text-[#febd17] text-2xl group-open:rotate-45 transition-transform">+</span>
						</summary>
						<p class="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
					</details>
				{/each}
			</div>
		</div>
	</section>

	<InlineCTA variant="banner" />

	<section id="contact" class="py-16 px-4 bg-gray-50 dark:bg-zinc-950">
		<div class="container max-w-5xl">
			<ContactUs nDays={9} />
		</div>
	</section>

	<Footer />
</main>
