<script lang="ts">
	import { language } from '$lib/store/store';
	import SEO from '$lib/seo/SEO.svelte';
	import {
		localBusinessJsonLd,
		websiteJsonLd,
		breadcrumbJsonLd,
		faqJsonLd,
		serviceJsonLd,
		SITE
	} from '$lib/seo/seo-config';
	import Footer from '$lib/Footer.svelte';
	import ContactUs from '$lib/ContactUs.svelte';
	import InlineCTA from '$lib/components/InlineCTA.svelte';
	import { servicesGeo } from '$lib/seo/cities-data';
	import { Phone, MapPin, Calendar, ArrowRight, CheckCircle2, Star } from 'lucide-svelte';

	export let data: { city: import('$lib/seo/cities-data').CityData };

	const city = data.city;
	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';
	const pagePath = `/excavation/${city.slug}`;
	const pageUrl = `${SITE.url}${pagePath}`;

	$: title =
		lang === 'fr'
			? `Excavation ${city.name} | Drain Français, Fondation, Démolition | Mini Excavations Érable`
			: lang === 'es'
				? `Excavación ${city.name} | Drenaje Francés, Cimientos, Demolición | Mini Excavations Érable`
				: `Excavation ${city.name} | French Drain, Foundation, Demolition | Mini Excavations Érable`;

	$: description =
		lang === 'fr'
			? `Entreprise d'excavation #1 à ${city.name} ✓ Drain français, réparation fissures, démolition, inspection caméra. Certifié RBQ. Soumission gratuite 24h. Service ${city.region}.`
			: lang === 'es'
				? `Empresa de excavación #1 en ${city.name} ✓ Drenaje francés, grietas, demolición. Certificado RBQ. Cotización gratuita 24h.`
				: `#1 excavation contractor in ${city.name} ✓ French drain, crack repair, demolition, camera inspection. RBQ certified. Free quote 24h.`;

	$: localGeoLocalBusiness = {
		'@context': 'https://schema.org',
		'@type': ['LocalBusiness', 'GeneralContractor'],
		'@id': `${pageUrl}#local`,
		name: `${SITE.name} — ${city.name}`,
		image: SITE.logo,
		url: pageUrl,
		telephone: SITE.phone,
		email: SITE.email,
		priceRange: SITE.priceRange,
		description,
		address: {
			'@type': 'PostalAddress',
			addressLocality: city.name,
			addressRegion: 'QC',
			addressCountry: 'CA',
			postalCode: city.postalArea
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: city.lat,
			longitude: city.lng
		},
		areaServed: {
			'@type': 'City',
			name: city.name,
			'@id': `https://en.wikipedia.org/wiki/${encodeURIComponent(city.name)}`
		},
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
				opens: '07:00',
				closes: '18:00'
			}
		],
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.9',
			reviewCount: '127',
			bestRating: '5'
		}
	};

	$: jsonLd = [
		localBusinessJsonLd(lang),
		localGeoLocalBusiness,
		websiteJsonLd(lang),
		faqJsonLd(lang),
		breadcrumbJsonLd([
			{ name: lang === 'fr' ? 'Accueil' : lang === 'es' ? 'Inicio' : 'Home', url: SITE.url },
			{ name: city.name, url: pageUrl }
		]),
		...servicesGeo.map((s) =>
			serviceJsonLd({
				name: `${lang === 'fr' ? s.titleFr : lang === 'es' ? s.titleEs : s.titleEn} ${city.name}`,
				description: `${s.titleFr} à ${city.name}, ${city.region}, Québec.`,
				url: `${pageUrl}#${s.slug}`,
				lang,
				priceFrom: s.priceFromCAD,
				priceTo: s.priceToCAD
			})
		)
	];

	const t = {
		fr: {
			tag: '📍 Service local certifié',
			heroSubtitle: `Notre équipe certifiée RBQ intervient à ${city.name} et dans toute la région ${city.region}. Plus de 15 ans d'expertise locale, garantie écrite 15 ans.`,
			servicesTitle: `Nos services d'excavation à ${city.name}`,
			servicesSubtitle: `Solutions complètes adaptées aux propriétés résidentielles et commerciales de ${city.name} et environs.`,
			whyTitle: `Pourquoi choisir Mini Excavations Érable à ${city.name} ?`,
			whyPoints: [
				`Connaissance approfondie du sol et du climat de ${city.name}`,
				`Conformité avec les règlements municipaux locaux`,
				`Équipe locale, déplacement rapide à ${city.name}`,
				`Centaines de projets réalisés dans la région ${city.region}`,
				`Garantie 15 ans transférable`,
				`Soumission gratuite et sans engagement en 24h-48h`
			],
			cta: 'Soumission gratuite',
			callBtn: 'Appeler',
			ratingLabel: '4.9/5 — 127 avis vérifiés'
		},
		en: {
			tag: '📍 Certified local service',
			heroSubtitle: `Our RBQ-certified team works in ${city.name} and throughout ${city.region}. 15+ years local expertise, written 15-year warranty.`,
			servicesTitle: `Our excavation services in ${city.name}`,
			servicesSubtitle: `Complete solutions for residential and commercial properties in ${city.name} and surroundings.`,
			whyTitle: `Why choose Mini Excavations Érable in ${city.name}?`,
			whyPoints: [
				`Deep knowledge of ${city.name} soil and climate`,
				`Compliant with local municipal regulations`,
				`Local team, fast response in ${city.name}`,
				`Hundreds of projects completed in ${city.region}`,
				`15-year transferable warranty`,
				`Free no-obligation quote in 24-48h`
			],
			cta: 'Free quote',
			callBtn: 'Call',
			ratingLabel: '4.9/5 — 127 verified reviews'
		},
		es: {
			tag: '📍 Servicio local certificado',
			heroSubtitle: `Nuestro equipo certificado RBQ trabaja en ${city.name} y toda la región ${city.region}. +15 años de experiencia local, garantía escrita 15 años.`,
			servicesTitle: `Servicios de excavación en ${city.name}`,
			servicesSubtitle: `Soluciones completas para propiedades residenciales y comerciales en ${city.name}.`,
			whyTitle: `¿Por qué elegirnos en ${city.name}?`,
			whyPoints: [
				`Conocimiento profundo del suelo y clima de ${city.name}`,
				`Cumplimos con regulaciones municipales locales`,
				`Equipo local, respuesta rápida en ${city.name}`,
				`Cientos de proyectos completados en ${city.region}`,
				`Garantía 15 años transferible`,
				`Cotización gratuita sin compromiso en 24-48h`
			],
			cta: 'Cotización gratuita',
			callBtn: 'Llamar',
			ratingLabel: '4.9/5 — 127 reseñas verificadas'
		}
	};

	$: c = t[lang];
</script>

<SEO
	{lang}
	{title}
	{description}
	keywords={city.keywords[lang]}
	path={pagePath}
	{jsonLd}
/>

<main class="bg-white dark:bg-black text-black dark:text-white">
	<!-- Hero -->
	<section class="relative pt-32 pb-20 px-4 bg-gradient-to-b from-yellow-50 to-white dark:from-zinc-950 dark:to-black overflow-hidden" aria-labelledby="city-h1">
		<div class="absolute top-0 right-0 w-96 h-96 bg-[#febd17] rounded-full blur-3xl opacity-10 -z-0"></div>

		<div class="container max-w-5xl relative z-10">
			<nav aria-label="Breadcrumb" class="mb-6 text-sm">
				<ol class="flex flex-wrap gap-2 text-gray-500 dark:text-gray-400">
					<li><a href="/" class="hover:text-[#febd17]">{lang === 'fr' ? 'Accueil' : lang === 'es' ? 'Inicio' : 'Home'}</a></li>
					<li>/</li>
					<li class="text-[#febd17]" aria-current="page">{city.name}</li>
				</ol>
			</nav>

			<div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#febd17]/10 border border-[#febd17]/30 text-[#febd17] font-bold text-xs uppercase tracking-wider mb-6">
				<MapPin class="w-3.5 h-3.5" />
				{c.tag}
			</div>

			<h1 id="city-h1" class="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
				{lang === 'fr' ? 'Excavation' : lang === 'es' ? 'Excavación' : 'Excavation'}
				<span class="text-[#febd17]">{city.name}</span>
			</h1>

			<p class="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6 max-w-3xl leading-relaxed font-light">
				{c.heroSubtitle}
			</p>

			<!-- Trust badges -->
			<div class="flex flex-wrap gap-2 mb-8">
				<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/30 text-yellow-700 dark:text-yellow-400 text-xs font-semibold">
					<Star class="w-3 h-3 fill-current" /> {c.ratingLabel}
				</span>
				<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-400 text-xs font-semibold">
					<CheckCircle2 class="w-3 h-3" /> RBQ • APCHQ • CMTQ
				</span>
				<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-400 text-xs font-semibold">
					⚡ {lang === 'fr' ? '24h' : '24h'}
				</span>
			</div>

			<div class="flex flex-col sm:flex-row gap-3">
				<a
					href="#contact"
					class="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#febd17] to-yellow-500 text-black font-black text-base shadow-2xl shadow-yellow-500/40 hover:scale-105 transition-all"
				>
					<Calendar class="w-5 h-5" />
					{c.cta}
					<ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
				</a>
				<a
					href="tel:+15148309973"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-bold text-base transition-all hover:scale-105"
				>
					<Phone class="w-5 h-5" />
					{c.callBtn} (514) 830-9973
				</a>
			</div>
		</div>
	</section>

	<!-- Services in this city -->
	<section class="py-20 px-4 bg-white dark:bg-black" aria-labelledby="city-services">
		<div class="container max-w-6xl">
			<h2 id="city-services" class="text-3xl md:text-4xl font-black tracking-tight mb-3">
				{c.servicesTitle}
			</h2>
			<p class="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-3xl">
				{c.servicesSubtitle}
			</p>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each servicesGeo as svc}
					<a
						id={svc.slug}
						href={`/services/${svc.slug}`}
						class="group bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-[#febd17] hover:shadow-xl hover:-translate-y-0.5 transition-all"
					>
						<div class="w-10 h-1 bg-[#febd17] rounded-full mb-4"></div>
						<h3 class="text-xl font-black mb-2">
							{lang === 'fr' ? svc.titleFr : lang === 'es' ? svc.titleEs : svc.titleEn}
							<span class="text-gray-500 dark:text-zinc-500 font-medium text-sm block mt-1">
								{lang === 'fr' ? 'à' : lang === 'es' ? 'en' : 'in'} {city.name}
							</span>
						</h3>
						<p class="text-sm text-gray-600 dark:text-zinc-400 mt-2">
							{lang === 'fr' ? 'À partir de' : lang === 'es' ? 'Desde' : 'From'} {svc.priceFromCAD}$ CAD
						</p>
						<span class="inline-flex items-center gap-1 text-[#febd17] font-bold text-sm mt-3 group-hover:gap-2 transition-all">
							{lang === 'fr' ? 'En savoir plus' : lang === 'es' ? 'Saber más' : 'Learn more'} →
						</span>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- Why us in this city -->
	<section class="py-20 px-4 bg-gray-50 dark:bg-zinc-950" aria-labelledby="why-city">
		<div class="container max-w-5xl">
			<h2 id="why-city" class="text-3xl md:text-4xl font-black tracking-tight mb-10">
				{c.whyTitle}
			</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				{#each c.whyPoints as point}
					<div class="flex items-start gap-4 p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800">
						<CheckCircle2 class="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
						<p class="text-gray-700 dark:text-zinc-300">{point}</p>
					</div>
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
