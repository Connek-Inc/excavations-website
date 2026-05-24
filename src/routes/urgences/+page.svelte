<script lang="ts">
	import { language } from '$lib/store/store.js';
	import frenchdrain2 from '$lib/images/frenchdrain2.jpg';
	import certif1 from '$lib/images/neq.png';
	import certif2 from '$lib/images/RBQ.png';
	import certif3 from '$lib/images/CMMTQ.svg';
	import certif4 from '$lib/images/CCQ.png';

	import UrgencyStepForm from '$lib/components/UrgencyStepForm.svelte';
	import Footer from '$lib/Footer.svelte';
	import SEO from '$lib/seo/SEO.svelte';
	import InlineCTA from '$lib/components/InlineCTA.svelte';
	import {
		localBusinessJsonLd,
		websiteJsonLd,
		faqJsonLd,
		serviceJsonLd,
		breadcrumbJsonLd,
		siteNavigationJsonLd,
		SITE
	} from '$lib/seo/seo-config';

	$: currentLang = ($language as 'fr' | 'en' | 'es') || 'fr';

	const testimonials = [
		{
			nameFr: 'Marie Tremblay',
			location: 'Montréal',
			textFr:
				"Infiltration d'eau soudaine réglée en urgence! L'équipe s'est déplacée le jour même pour une inspection. Soumission rapide et claire. Drain français réparé parfaitement. Je recommande à 100%."
		},
		{
			nameFr: 'Jean-François Bélanger',
			location: 'Laval',
			textFr:
				"Refoulement d'égout la nuit... Ils ont répondu à l'appel et ont réglé le problème avec une inspection par caméra détaillée. Service impeccable et rassurant dans un moment de stress."
		},
		{
			nameFr: 'Sophie Lavoie',
			location: 'Saint-Jérôme',
			textFr:
				"Découverte d'une fissure importante. Soumission en moins de 24h et garantie de 15 ans! Travail super propre et prix honnête. Une équipe en qui on peut avoir une confiance absolue."
		}
	];

	const certifications = [certif1, certif2, certif3, certif4];

	$: t = {
		fr: {
			pill: 'Service 24/7',
			h1Top: 'Urgence',
			h1Accent: 'excavation & drain',
			subtitle:
				"Infiltration, refoulement, fissures. Nos experts certifiés interviennent rapidement partout au Québec. Décrivez votre situation en 3 étapes ou appelez maintenant.",
			callBtn: '(514) 830-9973',
			rbq: 'Licence R.B.Q.',
			trustVisit: 'Déplacement gratuit',
			trustQuote: 'Soumission 24-48h',
			trustWarranty: 'Garantie 15 ans',
			guaranteeTag: 'Garantie',
			guaranteeTitle: 'Une garantie écrite de 15 ans',
			guaranteeBox1Title: 'Totalement transférable',
			guaranteeBox1:
				"Vous prévoyez vendre? Notre garantie écrite de 15 ans sur le drain français et l'imperméabilisation est 100% transférable aux futurs acheteurs.",
			guaranteeBox2Title: 'Protégez votre investissement',
			guaranteeBox2:
				"Votre maison est votre plus grand atout. Matériaux de première qualité et expertise certifiée pour des fondations solides et au sec pour des décennies.",
			certifTag: 'Certifications',
			certifTitle: 'Toutes les licences requises au Québec',
			certifBox1Title: 'APCHQ · RBQ · CMTQ',
			certifBox1:
				"Faites affaire avec un véritable professionnel. Nous détenons toutes les licences requises pour exécuter les travaux selon les normes de l'industrie.",
			certifBox2Title: 'Machinerie récente et sécuritaire',
			certifBox2:
				"L'efficacité de notre travail passe par notre équipement. Machinerie récente, adaptée à tous les types de terrains résidentiels et commerciaux.",
			avisTag: '4.9/5 — 127 avis vérifiés',
			avisTitle: 'Nos clients en parlent',
			avisCTA: "Voir plus d'avis sur Google"
		},
		en: {
			pill: '24/7 Service',
			h1Top: 'Emergency',
			h1Accent: 'excavation & drain',
			subtitle:
				'Water infiltration, sewer backup, foundation cracks. Our certified experts respond fast across Quebec. Describe your situation in 3 steps or call now.',
			callBtn: '(514) 830-9973',
			rbq: 'R.B.Q. License',
			trustVisit: 'Free site visit',
			trustQuote: 'Quote in 24-48h',
			trustWarranty: '15-year warranty',
			guaranteeTag: 'Warranty',
			guaranteeTitle: 'A written 15-year warranty',
			guaranteeBox1Title: 'Fully transferable',
			guaranteeBox1:
				"Planning to sell? Our written 15-year warranty on French drain and waterproofing is 100% transferable to future buyers.",
			guaranteeBox2Title: 'Protect your investment',
			guaranteeBox2:
				"Your home is your biggest asset. Premium materials and certified expertise keep your foundation solid and dry for decades.",
			certifTag: 'Certifications',
			certifTitle: 'All licenses required in Quebec',
			certifBox1Title: 'APCHQ · RBQ · CMTQ',
			certifBox1:
				"Work with a real professional. We hold every license required to perform the work to Quebec industry standards.",
			certifBox2Title: 'Modern, safe equipment',
			certifBox2:
				"Our efficiency comes from our equipment. Modern machinery suited to every residential and commercial terrain.",
			avisTag: '4.9/5 — 127 verified reviews',
			avisTitle: 'What clients say',
			avisCTA: 'See more reviews on Google'
		},
		es: {
			pill: 'Servicio 24/7',
			h1Top: 'Urgencia',
			h1Accent: 'excavación y drenaje',
			subtitle:
				'Infiltración de agua, respaldo de alcantarillado, grietas. Nuestros expertos certificados intervienen rápido en todo Quebec. Describa su situación en 3 pasos o llame ahora.',
			callBtn: '(514) 830-9973',
			rbq: 'Licencia R.B.Q.',
			trustVisit: 'Visita gratuita',
			trustQuote: 'Cotización 24-48h',
			trustWarranty: 'Garantía 15 años',
			guaranteeTag: 'Garantía',
			guaranteeTitle: 'Una garantía escrita de 15 años',
			guaranteeBox1Title: 'Totalmente transferible',
			guaranteeBox1:
				'¿Piensa vender? Nuestra garantía escrita de 15 años en drenaje francés e impermeabilización es 100% transferible a futuros compradores.',
			guaranteeBox2Title: 'Proteja su inversión',
			guaranteeBox2:
				'Su casa es su mayor patrimonio. Materiales premium y experiencia certificada para cimientos sólidos y secos durante décadas.',
			certifTag: 'Certificaciones',
			certifTitle: 'Todas las licencias requeridas en Quebec',
			certifBox1Title: 'APCHQ · RBQ · CMTQ',
			certifBox1:
				'Trabaje con un verdadero profesional. Tenemos todas las licencias requeridas para ejecutar los trabajos según las normas de la industria de Quebec.',
			certifBox2Title: 'Maquinaria reciente y segura',
			certifBox2:
				'Nuestra eficiencia viene de nuestro equipo. Maquinaria moderna adaptada a todos los terrenos residenciales y comerciales.',
			avisTag: '4.9/5 — 127 reseñas verificadas',
			avisTitle: 'Nuestros clientes hablan',
			avisCTA: 'Ver más reseñas en Google'
		}
	}[currentLang];

	$: jsonLd = [
		localBusinessJsonLd(currentLang),
		websiteJsonLd(currentLang),
		faqJsonLd(currentLang),
		breadcrumbJsonLd([
			{
				name: currentLang === 'fr' ? 'Accueil' : currentLang === 'es' ? 'Inicio' : 'Home',
				url: SITE.url
			},
			{
				name: currentLang === 'fr' ? 'Urgences' : currentLang === 'es' ? 'Urgencias' : 'Emergency',
				url: `${SITE.url}/urgences`
			}
		]),
		serviceJsonLd({
			name:
				currentLang === 'fr'
					? 'Urgences Excavation et Drain'
					: currentLang === 'es'
						? 'Urgencias Excavación y Drenaje'
						: 'Excavation and Drain Emergencies',
			description:
				currentLang === 'fr'
					? "Service d'urgence pour infiltration d'eau, refoulement d'égout, réparation de fissure et drain français."
					: currentLang === 'es'
						? 'Servicio de urgencia para infiltración de agua, respaldo de alcantarillado, reparación de grietas y drenaje francés.'
						: 'Emergency service for water infiltration, sewer backup, crack repair and French drain.',
			url: SITE.url + '/urgences',
			lang: currentLang
		}),
		{
			'@context': 'https://schema.org',
			'@type': 'AggregateRating',
			itemReviewed: { '@id': `${SITE.url}/#organization` },
			ratingValue: '4.9',
			reviewCount: '127',
			bestRating: '5',
			worstRating: '1'
		},
		...testimonials.map((tst) => ({
			'@context': 'https://schema.org',
			'@type': 'Review',
			itemReviewed: { '@id': `${SITE.url}/#organization` },
			author: { '@type': 'Person', name: `${tst.nameFr} (${tst.location})` },
			reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
			reviewBody: tst.textFr
		})),
		...siteNavigationJsonLd(currentLang)
	];

	$: pageTitle =
		currentLang === 'fr'
			? 'Urgence Excavation & Drain 24/7 | Inspection Gratuite | Mini Excavations Érable'
			: currentLang === 'es'
				? 'Urgencia Excavación y Drenaje 24/7 | Inspección Gratis | Mini Excavations Érable'
				: 'Emergency Excavation & Drain 24/7 | Free Inspection | Mini Excavations Érable';
	$: pageDescription =
		currentLang === 'fr'
			? "Intervention d'urgence 24/7 pour refoulement d'égout, infiltration d'eau, drain français et fissures. Déplacement rapide à Montréal, Laval et Rive-Nord. Appelez maintenant!"
			: currentLang === 'es'
				? 'Intervención de emergencia 24/7 para respaldo de alcantarillado, infiltración de agua, drenaje francés y grietas. ¡Llame ahora!'
				: '24/7 emergency intervention for sewer backup, water infiltration, french drain and cracks. Fast response in Montreal, Laval and North Shore. Call now!';
</script>

<SEO lang={currentLang} path="/urgences" title={pageTitle} description={pageDescription} {jsonLd} />

<main class="bg-white dark:bg-black text-black dark:text-white">

	<!-- ============================================
	     HERO with integrated urgency form
	============================================= -->
	<section
		id="home"
		class="relative pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-gray-100 dark:border-zinc-900 overflow-hidden"
	>
		<!-- Subtle background image, very low opacity -->
		<div class="absolute inset-0 pointer-events-none">
			<img
				src={frenchdrain2}
				alt=""
				aria-hidden="true"
				class="absolute inset-0 w-full h-full object-cover opacity-[0.05] dark:opacity-[0.08]"
				loading="eager"
				fetchpriority="high"
			/>
			<div class="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white dark:from-black dark:via-black/95 dark:to-black"></div>
		</div>

		<div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">

				<!-- LEFT: pitch + phone + trust -->
				<div class="lg:col-span-6 flex flex-col">
					<!-- Urgent pill -->
					<div class="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400 text-xs font-bold uppercase tracking-[0.18em] mb-6">
						<span class="relative flex h-2 w-2">
							<span class="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60 animate-ping"></span>
							<span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
						</span>
						{t.pill}
					</div>

					<h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter leading-[0.95] mb-5">
						<span class="block text-black dark:text-white">{t.h1Top}</span>
						<span class="block text-[#c9920f] dark:text-[#febd17]">{t.h1Accent}</span>
					</h1>

					<p class="text-base sm:text-lg text-gray-600 dark:text-zinc-400 leading-relaxed mb-8 max-w-xl">
						{t.subtitle}
					</p>

					<!-- Primary CTA: call now -->
					<a
						href="tel:+15148309973"
						onclick="return window.gtag_report_conversion ? window.gtag_report_conversion('tel:+15148309973') : true"
						class="inline-flex items-center justify-center gap-3 px-7 py-5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-lg transition-colors w-full sm:w-fit mb-5"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
						</svg>
						{t.callBtn}
					</a>

					<!-- RBQ chip -->
					<a
						href="https://www.rbq.gouv.qc.ca/recherche-licence-titulaire?numLicence=5823-7736-01"
						target="_blank"
						rel="noopener"
						class="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-[#febd17] text-xs font-semibold text-gray-700 dark:text-zinc-300 transition-colors mb-6"
					>
						<svg class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
						</svg>
						<span>{t.rbq}</span>
						<span class="font-mono text-[#c9920f] dark:text-[#febd17]">5823-7736-01</span>
					</a>

					<!-- Trust strip -->
					<div class="flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-600 dark:text-zinc-400">
						<span class="inline-flex items-center gap-1.5">
							<svg class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
							{t.trustVisit}
						</span>
						<span class="inline-flex items-center gap-1.5">
							<svg class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
							{t.trustQuote}
						</span>
						<span class="inline-flex items-center gap-1.5">
							<svg class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
							{t.trustWarranty}
						</span>
					</div>
				</div>

				<!-- RIGHT: form -->
				<div class="lg:col-span-6 w-full">
					<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-xl shadow-gray-200/40 dark:shadow-black/30 p-4 sm:p-6 lg:p-8">
						<UrgencyStepForm hideTitle={true} />
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ============================================
	     GUARANTEE
	============================================= -->
	<section id="garantie" class="py-20 lg:py-28 bg-gray-50 dark:bg-zinc-950 border-b border-gray-100 dark:border-zinc-900">
		<div class="container max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
			<span class="text-[#c9920f] dark:text-[#febd17] font-semibold tracking-[0.2em] uppercase text-xs mb-3 block">{t.guaranteeTag}</span>
			<h2 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black dark:text-white mb-10">
				{t.guaranteeTitle}
			</h2>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 text-left">
					<div class="w-11 h-11 rounded-lg bg-gray-50 dark:bg-zinc-800 flex items-center justify-center text-[#c9920f] dark:text-[#febd17] mb-5">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
					</div>
					<h3 class="text-xl font-bold text-black dark:text-white mb-2">{t.guaranteeBox1Title}</h3>
					<p class="text-gray-600 dark:text-zinc-400 leading-relaxed">{t.guaranteeBox1}</p>
				</div>
				<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 text-left">
					<div class="w-11 h-11 rounded-lg bg-gray-50 dark:bg-zinc-800 flex items-center justify-center text-[#c9920f] dark:text-[#febd17] mb-5">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
					</div>
					<h3 class="text-xl font-bold text-black dark:text-white mb-2">{t.guaranteeBox2Title}</h3>
					<p class="text-gray-600 dark:text-zinc-400 leading-relaxed">{t.guaranteeBox2}</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Inline CTA -->
	<InlineCTA variant="banner" />

	<!-- ============================================
	     CERTIFICATIONS
	============================================= -->
	<section id="certifications" class="py-20 lg:py-28 bg-white dark:bg-black border-b border-gray-100 dark:border-zinc-900">
		<div class="container max-w-5xl px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<span class="text-[#c9920f] dark:text-[#febd17] font-semibold tracking-[0.2em] uppercase text-xs mb-3 block">{t.certifTag}</span>
				<h2 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black dark:text-white">
					{t.certifTitle}
				</h2>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
				<div class="flex gap-4 p-6 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
					<div class="w-11 h-11 rounded-lg bg-white dark:bg-zinc-800 flex items-center justify-center text-[#c9920f] dark:text-[#febd17] flex-shrink-0">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
					</div>
					<div>
						<h3 class="text-lg font-bold text-black dark:text-white mb-2">{t.certifBox1Title}</h3>
						<p class="text-gray-600 dark:text-zinc-400 mb-3 text-sm leading-relaxed">{t.certifBox1}</p>
						<a
							href="https://www.rbq.gouv.qc.ca/recherche-licence-titulaire?numLicence=5823-7736-01"
							target="_blank"
							rel="noopener"
							class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#febd17]/10 border border-[#febd17]/30 text-[#c9920f] dark:text-[#febd17] font-semibold text-sm hover:bg-[#febd17]/20 transition-colors"
						>
							R.B.Q. <span class="font-mono">5823-7736-01</span>
						</a>
					</div>
				</div>
				<div class="flex gap-4 p-6 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
					<div class="w-11 h-11 rounded-lg bg-white dark:bg-zinc-800 flex items-center justify-center text-[#c9920f] dark:text-[#febd17] flex-shrink-0">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
					</div>
					<div>
						<h3 class="text-lg font-bold text-black dark:text-white mb-2">{t.certifBox2Title}</h3>
						<p class="text-gray-600 dark:text-zinc-400 text-sm leading-relaxed">{t.certifBox2}</p>
					</div>
				</div>
			</div>

			<!-- Certification logos -->
			<div class="flex flex-wrap justify-center items-center gap-8 md:gap-14 pt-10 border-t border-gray-200 dark:border-zinc-800">
				{#each certifications as cert}
					<div class="bg-white dark:bg-white/10 dark:p-3 rounded-xl">
						<img
							src={cert}
							alt="Certification"
							class="h-14 md:h-20 object-contain filter grayscale hover:grayscale-0 transition-all"
						/>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ============================================
	     TESTIMONIALS
	============================================= -->
	<section id="avis" class="py-20 lg:py-28 bg-gray-50 dark:bg-zinc-950 border-b border-gray-100 dark:border-zinc-900">
		<div class="container max-w-6xl px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12 max-w-3xl mx-auto">
				<div class="flex justify-center gap-1 mb-3">
					{#each Array(5) as _}
						<span class="text-[#c9920f] dark:text-[#febd17] text-xl">★</span>
					{/each}
				</div>
				<p class="text-[#c9920f] dark:text-[#febd17] font-semibold tracking-widest uppercase text-xs mb-3">
					{t.avisTag}
				</p>
				<h2 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black dark:text-white">
					{t.avisTitle}
				</h2>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				{#each testimonials as tst}
					<article
						class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-[#febd17]/50 transition-colors"
					>
						<div class="flex gap-1 mb-4">
							{#each Array(5) as _}<span class="text-[#c9920f] dark:text-[#febd17]">★</span>{/each}
						</div>
						<p class="text-gray-700 dark:text-zinc-300 leading-relaxed mb-5 italic text-sm">
							"{tst.textFr}"
						</p>
						<div class="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-zinc-800">
							<div class="w-10 h-10 rounded-full bg-[#febd17] flex items-center justify-center text-black font-bold">
								{tst.nameFr[0]}
							</div>
							<div>
								<p class="font-bold text-sm text-black dark:text-white">{tst.nameFr}</p>
								<p class="text-xs text-gray-500 dark:text-zinc-500">{tst.location}</p>
							</div>
						</div>
					</article>
				{/each}
			</div>

			<div class="mt-12 text-center">
				<a
					href="https://g.page/r/CYourGooglePlaceID/review"
					target="_blank"
					rel="noopener"
					class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#febd17] hover:bg-[#e5aa10] text-black font-semibold transition-colors"
				>
					{t.avisCTA}
				</a>
			</div>
		</div>
	</section>

	<Footer />
</main>
