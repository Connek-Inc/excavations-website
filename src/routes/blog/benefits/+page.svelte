<script lang="ts">
	import Footer from '$lib/Footer.svelte';
	import { language } from '$lib/store/store.js';
	import benefits from '$lib/images/residential-excavating-service-image-600x400-1.webp';
	import logo from '$lib/logo.png';
	import SEO from '$lib/seo/SEO.svelte';
	import { SITE, breadcrumbJsonLd, localBusinessJsonLd } from '$lib/seo/seo-config';

	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';

	$: data =
		lang === 'fr'
			? {
					title: "Top 5 des Avantages des Services d'Excavation au Québec",
					subtitle: '23 JUIN 2024',
					subtitle2: 'EXCAVATION RÉSIDENTIELLE',
					pagetitle: "Avantages de l'Excavation au Québec | Top 5 | Mini Excavations Érable",
					description:
						"Découvrez les 5 principaux avantages des services d'excavation pour vos projets résidentiels au Québec. Fondation, drainage, valeur immobilière.",
					keywords:
						"excavation résidentielle Québec, avantages excavation, préparation terrain Montréal, fondation maison, drainage Québec",
					author_desc: "Les spécialistes de l'excavation au Québec",
					content: `<h2 class='text-3xl font-bold mt-8 mb-4'>Pourquoi les Services d'Excavation Sont Essentiels au Québec</h2>
<p class='mb-6'>Les services d'excavation sont essentiels pour tout projet de construction résidentielle au Québec. Une excavation adéquate assure une fondation solide, un drainage approprié et un site bien préparé.</p>

<h2 class='text-3xl font-bold mt-8 mb-4'>Top 5 des Avantages</h2>
<h3 class='text-2xl font-bold mt-6 mb-3'>1. Fondation Solide et Stable</h3>
<p class='mb-4'>Une excavation bien exécutée garantit que votre fondation repose sur un sol stable, prévenant tassement et fissures.</p>
<h3 class='text-2xl font-bold mt-6 mb-3'>2. Drainage Optimal et Gestion de l'Eau</h3>
<p class='mb-4'>Création de systèmes de drainage efficaces pour prévenir l'accumulation d'eau et l'érosion au Québec.</p>
<h3 class='text-2xl font-bold mt-6 mb-3'>3. Préparation Professionnelle du Site</h3>
<p class='mb-4'>Défrichement, nivellement et préparation du terrain selon les normes du Code de construction du Québec.</p>
<h3 class='text-2xl font-bold mt-6 mb-3'>4. Travail Sécuritaire avec Équipement Moderne</h3>
<p class='mb-4'>Mini-pelles, excavatrices, opérateurs certifiés CCQ pour un travail rapide et sécuritaire.</p>
<h3 class='text-2xl font-bold mt-6 mb-3'>5. Valeur Immobilière Augmentée</h3>
<p class='mb-4'>Un site bien préparé et une fondation solide augmentent la valeur de revente de votre propriété.</p>`
				}
			: lang === 'es'
				? {
						title: 'Top 5 Beneficios de los Servicios de Excavación en Quebec',
						subtitle: '23 JUNIO 2024',
						subtitle2: 'EXCAVACIÓN RESIDENCIAL',
						pagetitle: 'Beneficios de Excavación en Quebec | Top 5 | Mini Excavations Érable',
						description:
							'Descubra los 5 principales beneficios de los servicios de excavación para sus proyectos residenciales en Quebec. Cimientos, drenaje, valor inmobiliario.',
						keywords:
							'excavación residencial Quebec, beneficios excavación, preparación terreno Montreal, cimientos casa, drenaje Quebec',
						author_desc: 'Especialistas en excavación en Quebec',
						content: `<h2 class='text-3xl font-bold mt-8 mb-4'>Por qué los Servicios de Excavación son Esenciales en Quebec</h2>
<p class='mb-6'>Los servicios de excavación son esenciales para cualquier proyecto residencial en Quebec. Una excavación adecuada asegura cimientos sólidos, drenaje apropiado y sitio bien preparado.</p>

<h2 class='text-3xl font-bold mt-8 mb-4'>Top 5 Beneficios</h2>
<h3 class='text-2xl font-bold mt-6 mb-3'>1. Cimientos Sólidos y Estables</h3>
<p class='mb-4'>Una excavación bien ejecutada garantiza que sus cimientos descansen sobre suelo estable, previniendo asentamientos y grietas.</p>
<h3 class='text-2xl font-bold mt-6 mb-3'>2. Drenaje Óptimo y Gestión del Agua</h3>
<p class='mb-4'>Creación de sistemas de drenaje eficaces para prevenir acumulación de agua y erosión en Quebec.</p>
<h3 class='text-2xl font-bold mt-6 mb-3'>3. Preparación Profesional del Sitio</h3>
<p class='mb-4'>Limpieza, nivelación y preparación del terreno según normas del Código de Construcción de Quebec.</p>
<h3 class='text-2xl font-bold mt-6 mb-3'>4. Trabajo Seguro con Equipo Moderno</h3>
<p class='mb-4'>Mini-excavadoras, operadores certificados CCQ para trabajo rápido y seguro.</p>
<h3 class='text-2xl font-bold mt-6 mb-3'>5. Valor Inmobiliario Aumentado</h3>
<p class='mb-4'>Un sitio bien preparado y cimientos sólidos aumentan el valor de reventa de su propiedad.</p>`
					}
				: {
						title: 'Top 5 Benefits of Excavation Services for Quebec Residential Projects',
						subtitle: 'JUNE 23, 2024',
						subtitle2: 'RESIDENTIAL EXCAVATION',
						pagetitle: 'Excavation Benefits in Quebec | Top 5 | Mini Excavations Érable',
						description:
							'Discover the top 5 benefits of excavation services for your residential projects in Quebec. Foundation, drainage, property value.',
						keywords:
							'residential excavation Quebec, excavation benefits, site preparation Montreal, home foundation, drainage Quebec',
						author_desc: 'Quebec excavation specialists',
						content: `<h2 class='text-3xl font-bold mt-8 mb-4'>Why Excavation Services Are Essential in Quebec</h2>
<p class='mb-6'>Excavation services are crucial for any residential construction in Quebec. Proper excavation ensures a solid foundation, drainage and a well-prepared site.</p>

<h2 class='text-3xl font-bold mt-8 mb-4'>Top 5 Benefits</h2>
<h3 class='text-2xl font-bold mt-6 mb-3'>1. Solid and Stable Foundation</h3>
<p class='mb-4'>Well-executed excavation ensures your foundation rests on stable ground, preventing settling and cracks.</p>
<h3 class='text-2xl font-bold mt-6 mb-3'>2. Optimal Drainage and Water Management</h3>
<p class='mb-4'>Creation of effective drainage systems to prevent water accumulation and erosion in Quebec.</p>
<h3 class='text-2xl font-bold mt-6 mb-3'>3. Professional Site Preparation</h3>
<p class='mb-4'>Land clearing, grading and preparation per Quebec Construction Code standards.</p>
<h3 class='text-2xl font-bold mt-6 mb-3'>4. Safe Work with Modern Equipment</h3>
<p class='mb-4'>Mini-excavators, CCQ-certified operators for fast and safe work.</p>
<h3 class='text-2xl font-bold mt-6 mb-3'>5. Increased Property Value</h3>
<p class='mb-4'>A well-prepared site and solid foundation increase the resale value of your property.</p>`
					};

	$: articleJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}/blog/benefits` },
		headline: data.title,
		description: data.description,
		image: `${SITE.url}/logo.png`,
		datePublished: '2024-06-23',
		dateModified: '2026-04-30',
		author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
		publisher: {
			'@type': 'Organization',
			name: SITE.name,
			logo: { '@type': 'ImageObject', url: `${SITE.url}/logo.png` }
		},
		inLanguage: lang === 'fr' ? 'fr-CA' : lang === 'es' ? 'es-ES' : 'en-CA'
	};

	$: jsonLd = [
		articleJsonLd,
		localBusinessJsonLd(lang),
		breadcrumbJsonLd([
			{ name: lang === 'fr' ? 'Accueil' : lang === 'es' ? 'Inicio' : 'Home', url: SITE.url },
			{ name: 'Blog', url: `${SITE.url}/blog` },
			{ name: data.title, url: `${SITE.url}/blog/benefits` }
		])
	];
</script>

<SEO
	{lang}
	title={data.pagetitle}
	description={data.description}
	keywords={data.keywords}
	path="/blog/benefits"
	image={`${SITE.url}/logo.png`}
	type="article"
	publishedTime="2024-06-23"
	modifiedTime="2026-04-30"
	{jsonLd}
/>

<main class="bg-white dark:bg-black text-black dark:text-white min-h-screen">
	<article itemscope itemtype="https://schema.org/Article" class="pt-32 pb-16">
		<header class="text-center px-4 mb-12 max-w-4xl mx-auto">
			<p class="text-sm md:text-base text-[#febd17] font-bold tracking-wider uppercase mb-4">
				<time datetime="2024-06-23" itemprop="datePublished">{data.subtitle}</time>
				<span class="text-gray-400 mx-2">/</span>{data.subtitle2}
			</p>
			<h1 class="font-black text-3xl md:text-5xl lg:text-6xl tracking-tight" itemprop="headline">
				{data.title}
			</h1>
		</header>

		<figure class="container max-w-6xl mx-auto px-4 mb-12">
			<img
				src={benefits}
				alt={lang === 'fr'
					? "Service d'excavation résidentielle au Québec par Mini Excavations Érable"
					: lang === 'es'
						? 'Servicio de excavación residencial en Quebec por Mini Excavations Érable'
						: 'Residential excavation service in Quebec by Mini Excavations Érable'}
				width="1200"
				height="675"
				class="w-full h-auto rounded-2xl shadow-2xl object-cover"
				itemprop="image"
				loading="eager"
				fetchpriority="high"
			/>
		</figure>

		<div
			class="container max-w-4xl mx-auto px-6 prose prose-lg dark:prose-invert"
			itemprop="articleBody"
		>
			{@html data.content}
		</div>

		<footer class="container max-w-4xl mx-auto px-6 mt-16 pt-8 border-t border-gray-200 dark:border-zinc-800">
			<div class="flex items-center gap-4" itemprop="author" itemscope itemtype="https://schema.org/Organization">
				<img src={logo} alt="Mini Excavations Érable" class="w-12 h-12 rounded-full" />
				<div>
					<p class="font-bold text-lg" itemprop="name">Mini Excavations Érable</p>
					<p class="text-gray-500 dark:text-gray-400 text-sm">{data.author_desc}</p>
				</div>
			</div>
		</footer>
	</article>

	<Footer />
</main>
