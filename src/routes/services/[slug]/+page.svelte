<script lang="ts">
	import { language } from '$lib/store/store';
	import SEO from '$lib/seo/SEO.svelte';
	import {
		serviceJsonLd,
		breadcrumbJsonLd,
		localBusinessJsonLd,
		howToJsonLd,
		SITE
	} from '$lib/seo/seo-config';
	import Footer from '$lib/Footer.svelte';
	import ContactUs from '$lib/ContactUs.svelte';
	import InlineCTA from '$lib/components/InlineCTA.svelte';
	import { ArrowRight, Phone, Calendar, CheckCircle2 } from 'lucide-svelte';

	export let data: { service: import('$lib/seo/services-content').ServicePageContent };

	$: service = data.service;
	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';
	$: pagePath = `/services/${service.slug}`;
	$: pageUrl = `${SITE.url}${pagePath}`;

	$: faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: service.faqs[lang].map((f) => ({
			'@type': 'Question',
			name: f.q,
			acceptedAnswer: { '@type': 'Answer', text: f.a }
		}))
	};

	$: howToSchema = service.sections.length > 0
		? howToJsonLd({
				name: service.h1[lang],
				description: service.intro[lang],
				steps: service.sections.map((s) => ({
					name: s.heading[lang],
					text: s.body[lang]
				}))
			})
		: null;

	$: jsonLd = [
		localBusinessJsonLd(lang),
		serviceJsonLd({
			name: service.h1[lang],
			description: service.description[lang],
			url: pageUrl,
			lang
		}),
		breadcrumbJsonLd([
			{ name: lang === 'fr' ? 'Accueil' : lang === 'es' ? 'Inicio' : 'Home', url: SITE.url },
			{
				name: lang === 'fr' ? 'Services' : lang === 'es' ? 'Servicios' : 'Services',
				url: `${SITE.url}/services`
			},
			{ name: service.h1[lang], url: pageUrl }
		]),
		faqSchema,
		...(howToSchema ? [howToSchema] : [])
	];
</script>

<SEO
	{lang}
	title={service.title[lang]}
	description={service.description[lang]}
	keywords={service.keywords[lang]}
	path={pagePath}
	{jsonLd}
/>

<main class="bg-white dark:bg-black text-black dark:text-white">
	<article itemscope itemtype="https://schema.org/Service">
		<!-- Hero -->
		<section class="pt-32 pb-16 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-950 dark:to-black">
			<div class="container max-w-5xl">
				<nav aria-label="Breadcrumb" class="mb-6 text-sm">
					<ol class="flex flex-wrap gap-2 text-gray-500 dark:text-gray-400">
						<li><a href="/" class="hover:text-[#febd17]">{lang === 'fr' ? 'Accueil' : lang === 'es' ? 'Inicio' : 'Home'}</a></li>
						<li>/</li>
						<li><a href="/" class="hover:text-[#febd17]">{lang === 'fr' ? 'Services' : 'Services'}</a></li>
						<li>/</li>
						<li class="text-[#febd17]" aria-current="page">{service.h1[lang]}</li>
					</ol>
				</nav>
				<!-- Trust badges -->
				<div class="flex flex-wrap gap-2 mb-6">
					<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-400 text-xs font-semibold">
						<CheckCircle2 class="w-3.5 h-3.5" />
						{lang === 'fr' ? 'Certifié RBQ' : lang === 'es' ? 'Certificado RBQ' : 'RBQ Certified'}
					</span>
					<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/30 text-yellow-700 dark:text-yellow-400 text-xs font-semibold">
						⭐ 4.9/5 (127)
					</span>
					<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-400 text-xs font-semibold">
						⚡ {lang === 'fr' ? '24h' : '24h'}
					</span>
				</div>

				<h1 class="text-4xl md:text-6xl font-black mb-6 tracking-tight" itemprop="name">
					{service.h1[lang]}
				</h1>
				<p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed font-light" itemprop="description">
					{service.intro[lang]}
				</p>
				<div class="mt-8 flex flex-col sm:flex-row gap-3">
					<a
						href="#contact-form"
						class="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#febd17] to-yellow-500 hover:from-yellow-400 hover:to-[#febd17] text-black font-black text-base shadow-2xl shadow-yellow-500/40 transition-all hover:scale-105"
					>
						<Calendar class="w-5 h-5" />
						{lang === 'fr' ? 'Soumission Gratuite' : lang === 'es' ? 'Cotización Gratuita' : 'Free Quote'}
						<ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
					</a>
					<a
						href="tel:+15148309973"
						class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-bold text-base transition-all hover:scale-105"
					>
						<Phone class="w-5 h-5" />
						(514) 830-9973
					</a>
				</div>
			</div>
		</section>

		<!-- Sections -->
		{#each service.sections as section, i}
			<section class="py-16 px-4 {i % 2 === 0 ? 'bg-white dark:bg-black' : 'bg-gray-50 dark:bg-zinc-950'}">
				<div class="container max-w-4xl">
					<h2 class="text-3xl md:text-4xl font-black mb-6 tracking-tight">
						{section.heading[lang]}
					</h2>
					<p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
						{section.body[lang]}
					</p>
				</div>
			</section>
		{/each}

		<InlineCTA variant="banner" />

		<!-- FAQ -->
		<section class="py-16 px-4 bg-white dark:bg-black" aria-labelledby="service-faq">
			<div class="container max-w-4xl">
				<h2 id="service-faq" class="text-3xl md:text-4xl font-black mb-10 tracking-tight">
					{lang === 'fr' ? 'Questions Fréquentes' : lang === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
				</h2>
				<div class="space-y-4">
					{#each service.faqs[lang] as faq}
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

		<!-- CTA / Contact -->
		<section id="contact-form" class="py-16 px-4 bg-gray-50 dark:bg-zinc-950">
			<div class="container max-w-5xl">
				<ContactUs nDays={9} />
			</div>
		</section>
	</article>

	<Footer />
</main>
