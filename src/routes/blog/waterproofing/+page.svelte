<script lang="ts">
	import Footer from '$lib/Footer.svelte';
	import { language } from '$lib/store/store.js';
	import waterproofing from '$lib/images/basement-sump-pumps-installation-1.png';
	import logo from '$lib/logo.png';
	import SEO from '$lib/seo/SEO.svelte';
	import { SITE, breadcrumbJsonLd, localBusinessJsonLd } from '$lib/seo/seo-config';

	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';

	$: data =
		lang === 'fr'
			? {
					title: "Solutions d'Imperméabilisation pour un Sous-Sol Sec au Québec",
					subtitle: '14 JUILLET 2024',
					subtitle2: "IMPERMÉABILISATION SOUS-SOL",
					pagetitle:
						"Imperméabilisation Sous-Sol Québec | Pompe Puisard | Mini Excavations Érable",
					description:
						"Solutions d'imperméabilisation et installation de pompe de puisard au Québec. Prévenir l'humidité, moisissures et infiltrations. Soumission gratuite.",
					keywords:
						"imperméabilisation sous-sol Québec, pompe puisard Montréal, infiltration eau sous-sol, moisissure sous-sol, drainage Québec",
					author_desc: "Les spécialistes de l'excavation au Québec",
					content: `<h2 class='text-3xl font-bold mt-8 mb-4'>Risques d'un Sous-Sol Humide au Québec</h2>
<p class='mb-6'>Au Québec, les cycles gel-dégel et le climat humide augmentent les risques d'infiltration. Un sous-sol humide cause moisissures, dommages structurels et problèmes de santé respiratoire.</p>

<h2 class='text-3xl font-bold mt-8 mb-4'>Techniques d'Imperméabilisation</h2>
<h3 class='text-2xl font-bold mt-6 mb-3'>Imperméabilisation Intérieure</h3>
<p class='mb-4'>Application de scellants, membranes et drains intérieurs. Idéal pour problèmes mineurs, coût entre 2 000$ et 5 000$.</p>
<h3 class='text-2xl font-bold mt-6 mb-3'>Imperméabilisation Extérieure</h3>
<p class='mb-4'>Excavation périphérique, application de membrane élastomère, drain français. Solution permanente, coût entre 8 000$ et 18 000$ au Québec.</p>

<h2 class='text-3xl font-bold mt-8 mb-4'>Installation de Pompe de Puisard</h2>
<p class='mb-4'>Une pompe de puisard évacue l'eau accumulée et prévient les inondations. Installation incluant batterie de secours pour pannes électriques (essentiel au Québec en hiver).</p>

<h2 class='text-3xl font-bold mt-8 mb-4'>Avantages de l'Imperméabilisation</h2>
<ul class='list-disc pl-6 mb-6 space-y-2'>
<li>Prévention des moisissures et amélioration qualité de l'air</li>
<li>Augmentation de la valeur immobilière (jusqu'à 15%)</li>
<li>Économies à long terme sur réparations</li>
<li>Espace de vie additionnel utilisable</li>
</ul>`
				}
			: lang === 'es'
				? {
						title: 'Soluciones de Impermeabilización para un Sótano Seco en Quebec',
						subtitle: '14 JULIO 2024',
						subtitle2: 'IMPERMEABILIZACIÓN SÓTANO',
						pagetitle:
							'Impermeabilización Sótano Quebec | Bomba Sumidero | Mini Excavations Érable',
						description:
							'Soluciones de impermeabilización y bomba de sumidero en Quebec. Prevenir humedad, moho e infiltraciones. Cotización gratuita.',
						keywords:
							'impermeabilización sótano Quebec, bomba sumidero Montreal, infiltración agua sótano, moho sótano, drenaje Quebec',
						author_desc: 'Especialistas en excavación en Quebec',
						content: `<h2 class='text-3xl font-bold mt-8 mb-4'>Riesgos de un Sótano Húmedo en Quebec</h2>
<p class='mb-6'>En Quebec, los ciclos hielo-deshielo y clima húmedo aumentan riesgos de infiltración. Un sótano húmedo causa moho, daños estructurales y problemas respiratorios.</p>

<h2 class='text-3xl font-bold mt-8 mb-4'>Técnicas de Impermeabilización</h2>
<h3 class='text-2xl font-bold mt-6 mb-3'>Impermeabilización Interior</h3>
<p class='mb-4'>Aplicación de selladores, membranas y drenajes interiores. Ideal para problemas menores, entre 2,000$ y 5,000$.</p>
<h3 class='text-2xl font-bold mt-6 mb-3'>Impermeabilización Exterior</h3>
<p class='mb-4'>Excavación perimetral, membrana elastómera, drenaje francés. Solución permanente, entre 8,000$ y 18,000$ en Quebec.</p>

<h2 class='text-3xl font-bold mt-8 mb-4'>Instalación de Bomba de Sumidero</h2>
<p class='mb-4'>Evacúa el agua acumulada y previene inundaciones. Instalación con batería de respaldo para apagones (esencial en invierno).</p>

<h2 class='text-3xl font-bold mt-8 mb-4'>Beneficios</h2>
<ul class='list-disc pl-6 mb-6 space-y-2'>
<li>Prevención de moho y aire de calidad</li>
<li>Aumento de valor inmobiliario (hasta 15%)</li>
<li>Ahorros a largo plazo en reparaciones</li>
<li>Espacio adicional utilizable</li>
</ul>`
					}
				: {
						title: 'Waterproofing Solutions for a Dry Basement in Quebec',
						subtitle: 'JULY 14, 2024',
						subtitle2: 'BASEMENT WATERPROOFING',
						pagetitle:
							'Basement Waterproofing Quebec | Sump Pump | Mini Excavations Érable',
						description:
							'Waterproofing solutions and sump pump installation in Quebec. Prevent dampness, mold and infiltration. Free quote.',
						keywords:
							'basement waterproofing Quebec, sump pump Montreal, basement water infiltration, basement mold, drainage Quebec',
						author_desc: 'Quebec excavation specialists',
						content: `<h2 class='text-3xl font-bold mt-8 mb-4'>Risks of a Damp Basement in Quebec</h2>
<p class='mb-6'>In Quebec, freeze-thaw cycles and humid climate increase infiltration risks. A damp basement causes mold, structural damage and respiratory issues.</p>

<h2 class='text-3xl font-bold mt-8 mb-4'>Waterproofing Techniques</h2>
<h3 class='text-2xl font-bold mt-6 mb-3'>Interior Waterproofing</h3>
<p class='mb-4'>Sealants, membranes and interior drains. Ideal for minor issues, $2,000 to $5,000.</p>
<h3 class='text-2xl font-bold mt-6 mb-3'>Exterior Waterproofing</h3>
<p class='mb-4'>Perimeter excavation, elastomeric membrane, French drain. Permanent solution, $8,000 to $18,000 in Quebec.</p>

<h2 class='text-3xl font-bold mt-8 mb-4'>Sump Pump Installation</h2>
<p class='mb-4'>Removes accumulated water and prevents flooding. Installation with battery backup for power outages (essential in Quebec winter).</p>

<h2 class='text-3xl font-bold mt-8 mb-4'>Benefits</h2>
<ul class='list-disc pl-6 mb-6 space-y-2'>
<li>Mold prevention and improved air quality</li>
<li>Increased property value (up to 15%)</li>
<li>Long-term savings on repairs</li>
<li>Additional usable living space</li>
</ul>`
					};

	$: articleJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}/blog/waterproofing` },
		headline: data.title,
		description: data.description,
		image: `${SITE.url}/logo.png`,
		datePublished: '2024-07-14',
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
			{ name: data.title, url: `${SITE.url}/blog/waterproofing` }
		])
	];
</script>

<SEO
	{lang}
	title={data.pagetitle}
	description={data.description}
	keywords={data.keywords}
	path="/blog/waterproofing"
	image={`${SITE.url}/logo.png`}
	type="article"
	publishedTime="2024-07-14"
	modifiedTime="2026-04-30"
	{jsonLd}
/>

<main class="bg-white dark:bg-black text-black dark:text-white min-h-screen">
	<article itemscope itemtype="https://schema.org/Article" class="pt-32 pb-16">
		<header class="text-center px-4 mb-12 max-w-4xl mx-auto">
			<p class="text-sm md:text-base text-[#febd17] font-bold tracking-wider uppercase mb-4">
				<time datetime="2024-07-14" itemprop="datePublished">{data.subtitle}</time>
				<span class="text-gray-400 mx-2">/</span>{data.subtitle2}
			</p>
			<h1 class="font-black text-3xl md:text-5xl lg:text-6xl tracking-tight" itemprop="headline">
				{data.title}
			</h1>
		</header>

		<figure class="container max-w-6xl mx-auto px-4 mb-12">
			<img
				src={waterproofing}
				alt={lang === 'fr'
					? "Installation de pompe de puisard au Québec par Mini Excavations Érable"
					: lang === 'es'
						? 'Instalación de bomba de sumidero en Quebec por Mini Excavations Érable'
						: 'Sump pump installation in Quebec by Mini Excavations Érable'}
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
