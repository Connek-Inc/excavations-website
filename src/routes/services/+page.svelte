<script lang="ts">
	import { language } from '$lib/store/store';
	import SEO from '$lib/seo/SEO.svelte';
	import { services } from '$lib/seo/services-content';
	import { localBusinessJsonLd, breadcrumbJsonLd, SITE } from '$lib/seo/seo-config';
	import Footer from '$lib/Footer.svelte';

	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';

	$: title =
		lang === 'fr'
			? "Tous nos Services d'Excavation au Québec | Mini Excavations Érable"
			: lang === 'es'
				? 'Todos Nuestros Servicios de Excavación en Quebec | Mini Excavations Érable'
				: 'All Our Excavation Services in Quebec | Mini Excavations Érable';

	$: description =
		lang === 'fr'
			? "Découvrez tous nos services d'excavation au Québec : drain français, fondation, démolition, fissures, inspection caméra. Certifié RBQ."
			: lang === 'es'
				? 'Descubra todos nuestros servicios de excavación en Quebec: drenaje francés, cimientos, demolición, grietas, inspección cámara.'
				: 'Discover all our excavation services in Quebec: French drain, foundation, demolition, cracks, camera inspection.';

	$: jsonLd = [
		localBusinessJsonLd(lang),
		breadcrumbJsonLd([
			{ name: lang === 'fr' ? 'Accueil' : lang === 'es' ? 'Inicio' : 'Home', url: SITE.url },
			{
				name: lang === 'fr' ? 'Services' : 'Services',
				url: `${SITE.url}/services`
			}
		])
	];
</script>

<SEO {lang} {title} {description} path="/services" {jsonLd} />

<main class="bg-white dark:bg-black text-black dark:text-white min-h-screen">
	<section class="pt-32 pb-16 px-4">
		<div class="container max-w-6xl">
			<h1 class="text-4xl md:text-6xl font-black mb-6 tracking-tight">
				{lang === 'fr' ? "Services d'Excavation au Québec" : lang === 'es' ? 'Servicios de Excavación en Quebec' : 'Excavation Services in Quebec'}
			</h1>
			<p class="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl">
				{description}
			</p>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each services as svc}
					<a
						href={`/services/${svc.slug}`}
						class="block p-8 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl hover:shadow-xl hover:scale-105 transition-all"
					>
						<div class="w-12 h-1 bg-[#febd17] rounded-full mb-4"></div>
						<h2 class="text-2xl font-bold mb-3">{svc.h1[lang]}</h2>
						<p class="text-gray-600 dark:text-gray-400 line-clamp-3">{svc.description[lang]}</p>
						<span class="inline-block mt-4 text-[#febd17] font-bold">
							{lang === 'fr' ? 'En savoir plus →' : lang === 'es' ? 'Saber más →' : 'Learn more →'}
						</span>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<Footer />
</main>
