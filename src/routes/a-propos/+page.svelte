<script lang="ts">
	import { language } from '$lib/store/store';
	import Footer from '$lib/Footer.svelte';
	import SEO from '$lib/seo/SEO.svelte';
	import { SITE, organizationJsonLd, localBusinessJsonLd } from '$lib/seo/seo-config';
	import excavation2 from '$lib/images/excavation2.webp';
	import frenchdrain2 from '$lib/images/frenchdrain2.webp';

	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';

	$: t = {
		fr: {
			tag: 'Qui sommes-nous',
			h1: 'Une entreprise familiale au cœur du Québec',
			intro:
				"Mini Excavations Érable est une entreprise familiale fondée et opérée par des Québécois, avec plus de 15 ans d'expérience dans le domaine de l'excavation, du drain français, des réparations de fissures et de la démolition.",
			storyTitle: 'Notre histoire',
			storyP1:
				"Tout a commencé dans une petite communauté du Bas-Saint-Laurent. Trois générations plus tard, nous portons le même engagement: un travail soigné, des prix justes, et la parole donnée respectée.",
			storyP2:
				"Aujourd'hui, notre équipe compte des techniciens certifiés, des opérateurs de machinerie expérimentés et un service à la clientèle dédié. Nous desservons toute la grande région du Québec, de Montréal jusqu'au Bas-Saint-Laurent.",
			valuesTitle: 'Ce qui nous distingue',
			values: [
				{ title: '15+ ans d\'expertise', desc: 'Des centaines de projets résidentiels et commerciaux livrés.' },
				{ title: 'Travail garanti par écrit', desc: 'Garantie 15 ans transférable sur le drain français.' },
				{ title: 'Certifications complètes', desc: 'RBQ, NEQ, CCQ, CMMTQ — toutes les licences requises.' }
			],
			servicesTitle: 'Ce que nous faisons',
			services: [
				'Installation et réparation de drain français',
				'Excavation résidentielle et commerciale',
				'Réparation de fissures de fondation',
				'Démolition de garage, cabanon, piscine',
				'Inspection caméra de drain et égout',
				'Imperméabilisation de fondation'
			],
			teamTitle: 'Notre équipe',
			teamSubtitle: 'Les visages derrière chaque projet.',
			team: [
				{ name: 'Direction', role: 'Fondateur & Propriétaire' },
				{ name: 'Chef de chantier', role: 'Opérations & qualité' },
				{ name: 'Équipe technique', role: 'Opérateurs certifiés' }
			],
			ctaTitle: "Prêt à démarrer votre projet?",
			ctaSub: 'Soumission gratuite, détaillée, en moins de 24h.',
			ctaBtn: 'Demander une soumission',
			ctaCall: 'Appeler maintenant'
		},
		en: {
			tag: 'About us',
			h1: 'A family business rooted in Quebec',
			intro:
				"Mini Excavations Érable is a family-founded and operated company with 15+ years of experience in excavation, French drain installation, crack repair and demolition across Quebec.",
			storyTitle: 'Our story',
			storyP1:
				"It all started in a small community in Bas-Saint-Laurent. Three generations later, we still carry the same commitment: careful work, fair pricing, and a promise that we keep.",
			storyP2:
				"Today our team includes certified technicians, experienced equipment operators and dedicated customer service. We serve the greater Quebec region, from Montreal to Bas-Saint-Laurent.",
			valuesTitle: 'What sets us apart',
			values: [
				{ title: '15+ years of expertise', desc: 'Hundreds of residential and commercial projects delivered.' },
				{ title: 'Written warranty', desc: '15-year transferable warranty on French drains.' },
				{ title: 'Full certifications', desc: 'RBQ, NEQ, CCQ, CMMTQ — all required licenses.' }
			],
			servicesTitle: 'What we do',
			services: [
				'French drain installation and repair',
				'Residential and commercial excavation',
				'Foundation crack repair',
				'Garage, shed, pool demolition',
				'Drain and sewer camera inspection',
				'Foundation waterproofing'
			],
			teamTitle: 'Our team',
			teamSubtitle: 'The faces behind every project.',
			team: [
				{ name: 'Management', role: 'Founder & Owner' },
				{ name: 'Site supervisor', role: 'Operations & quality' },
				{ name: 'Technical team', role: 'Certified operators' }
			],
			ctaTitle: 'Ready to start your project?',
			ctaSub: 'Free, detailed quote in less than 24h.',
			ctaBtn: 'Request a quote',
			ctaCall: 'Call now'
		},
		es: {
			tag: 'Quiénes somos',
			h1: 'Una empresa familiar en el corazón de Quebec',
			intro:
				'Mini Excavations Érable es una empresa familiar fundada y operada con más de 15 años de experiencia en excavación, drenaje francés, reparación de grietas y demolición en Quebec.',
			storyTitle: 'Nuestra historia',
			storyP1:
				'Todo comenzó en una pequeña comunidad del Bas-Saint-Laurent. Tres generaciones después, mantenemos el mismo compromiso: trabajo cuidadoso, precios justos, y la palabra dada se cumple.',
			storyP2:
				'Hoy nuestro equipo cuenta con técnicos certificados, operadores de maquinaria con experiencia y un servicio al cliente dedicado. Servimos toda la gran región de Quebec, desde Montreal hasta el Bas-Saint-Laurent.',
			valuesTitle: 'Lo que nos distingue',
			values: [
				{ title: '+15 años de experiencia', desc: 'Cientos de proyectos residenciales y comerciales entregados.' },
				{ title: 'Garantía por escrito', desc: 'Garantía de 15 años transferible en drenaje francés.' },
				{ title: 'Certificaciones completas', desc: 'RBQ, NEQ, CCQ, CMMTQ — todas las licencias requeridas.' }
			],
			servicesTitle: 'Lo que hacemos',
			services: [
				'Instalación y reparación de drenaje francés',
				'Excavación residencial y comercial',
				'Reparación de grietas de cimientos',
				'Demolición de garaje, cobertizo, piscina',
				'Inspección por cámara de drenaje y alcantarillado',
				'Impermeabilización de cimientos'
			],
			teamTitle: 'Nuestro equipo',
			teamSubtitle: 'Los rostros detrás de cada proyecto.',
			team: [
				{ name: 'Dirección', role: 'Fundador y propietario' },
				{ name: 'Jefe de obra', role: 'Operaciones y calidad' },
				{ name: 'Equipo técnico', role: 'Operadores certificados' }
			],
			ctaTitle: '¿Listo para empezar su proyecto?',
			ctaSub: 'Cotización gratuita y detallada en menos de 24h.',
			ctaBtn: 'Solicitar cotización',
			ctaCall: 'Llamar ahora'
		}
	}[lang];

	$: jsonLd = [organizationJsonLd(), localBusinessJsonLd(lang)];
</script>

<SEO lang={lang} path="/a-propos" jsonLd={jsonLd} />

<main class="bg-white dark:bg-black text-black dark:text-white">

	<!-- Hero -->
	<section class="relative pt-28 pb-20 lg:pt-36 lg:pb-28 border-b border-gray-100 dark:border-zinc-900">
		<div class="container max-w-5xl px-4 sm:px-6 lg:px-8">
			<div class="max-w-3xl">
				<span class="text-[#c9920f] dark:text-[#febd17] font-semibold tracking-[0.2em] uppercase text-xs mb-4 block">
					{t.tag}
				</span>
				<h1 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
					{t.h1}
				</h1>
				<p class="text-lg lg:text-xl text-gray-600 dark:text-zinc-400 leading-relaxed">
					{t.intro}
				</p>
			</div>
		</div>
	</section>

	<!-- Story -->
	<section class="py-20 lg:py-28 bg-gray-50 dark:bg-zinc-950 border-b border-gray-100 dark:border-zinc-900">
		<div class="container max-w-6xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
			<div>
				<h2 class="text-3xl lg:text-4xl font-black tracking-tight mb-6">{t.storyTitle}</h2>
				<p class="text-gray-700 dark:text-zinc-300 text-lg leading-relaxed mb-4">{t.storyP1}</p>
				<p class="text-gray-700 dark:text-zinc-300 text-lg leading-relaxed">{t.storyP2}</p>
			</div>
			<div class="grid grid-cols-2 gap-4">
				<img
					src={frenchdrain2}
					alt="Travaux drain français"
					loading="lazy"
					class="rounded-2xl shadow-lg w-full h-48 lg:h-64 object-cover"
				/>
				<img
					src={excavation2}
					alt="Mini excavation"
					loading="lazy"
					class="rounded-2xl shadow-lg w-full h-48 lg:h-64 object-cover mt-8"
				/>
			</div>
		</div>
	</section>

	<!-- Values -->
	<section class="py-20 lg:py-28 bg-white dark:bg-black border-b border-gray-100 dark:border-zinc-900">
		<div class="container max-w-6xl px-4 sm:px-6 lg:px-8">
			<h2 class="text-3xl lg:text-4xl font-black tracking-tight mb-12 text-center">{t.valuesTitle}</h2>
			<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
				{#each t.values as v}
					<div class="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6">
						<div class="w-1.5 h-7 bg-[#febd17] mb-4 rounded-full"></div>
						<h3 class="text-lg font-bold mb-2 text-black dark:text-white">{v.title}</h3>
						<p class="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">{v.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Services list -->
	<section class="py-20 lg:py-28 bg-gray-50 dark:bg-zinc-950 border-b border-gray-100 dark:border-zinc-900">
		<div class="container max-w-4xl px-4 sm:px-6 lg:px-8">
			<h2 class="text-3xl lg:text-4xl font-black tracking-tight mb-8">{t.servicesTitle}</h2>
			<ul class="space-y-3">
				{#each t.services as s}
					<li class="flex items-start gap-3 text-lg text-gray-700 dark:text-zinc-300">
						<svg class="w-5 h-5 text-[#c9920f] dark:text-[#febd17] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
						</svg>
						<span>{s}</span>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<!-- Team -->
	<section class="py-20 lg:py-28 bg-white dark:bg-black border-b border-gray-100 dark:border-zinc-900">
		<div class="container max-w-6xl px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl lg:text-4xl font-black tracking-tight mb-3">{t.teamTitle}</h2>
				<p class="text-gray-600 dark:text-zinc-400 text-lg">{t.teamSubtitle}</p>
			</div>
			<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each t.team as person}
					<div class="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
						<!-- Image placeholder: ratio 4/5 -->
						<div class="aspect-[4/5] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center">
							<svg class="w-16 h-16 text-gray-400 dark:text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
								<path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
							</svg>
						</div>
						<div class="p-5">
							<h3 class="text-lg font-bold text-black dark:text-white">{person.name}</h3>
							<p class="text-sm text-gray-600 dark:text-zinc-400">{person.role}</p>
						</div>
					</div>
				{/each}
			</div>
			<p class="text-center text-xs text-gray-400 dark:text-zinc-600 mt-8">
				{lang === 'fr'
					? 'Les photos de notre équipe seront ajoutées prochainement.'
					: lang === 'es'
						? 'Las fotos de nuestro equipo se añadirán próximamente.'
						: 'Photos of our team coming soon.'}
			</p>
		</div>
	</section>

	<!-- CTA -->
	<section class="py-20 lg:py-24 bg-zinc-950 text-white">
		<div class="container max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
			<h2 class="text-3xl lg:text-4xl font-black tracking-tight mb-3">{t.ctaTitle}</h2>
			<p class="text-zinc-400 text-lg mb-8">{t.ctaSub}</p>
			<div class="flex flex-col sm:flex-row gap-3 justify-center">
				<a
					href="/#contact"
					class="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg bg-[#febd17] hover:bg-[#e5aa10] text-black font-bold transition-colors"
				>
					{t.ctaBtn}
				</a>
				<a
					href="tel:+15148309973"
					class="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg border border-zinc-700 hover:border-white text-white font-semibold transition-colors"
				>
					{t.ctaCall}
				</a>
			</div>
		</div>
	</section>

	<Footer />
</main>
