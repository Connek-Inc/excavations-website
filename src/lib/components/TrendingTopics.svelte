<script lang="ts">
	import { language } from '$lib/store/store';
	import { TrendingUp, MapPin, DollarSign, Leaf, Mic, Zap } from 'lucide-svelte';

	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';

	const t = {
		fr: {
			tag: 'Tendances 2026',
			title: 'Ce que recherchent nos clients',
			subtitle: 'Les questions et services les plus demandés par nos clients cette année.',
			topics: [
				{ icon: MapPin, title: 'Drain français près de moi', desc: 'Service local rapide à Montréal, Laval, Longueuil et 40+ villes.', link: '/excavation/montreal', tag: '+340% recherches' },
				{ icon: DollarSign, title: 'Prix drain français 2026', desc: 'Soumission transparente, sans frais cachés. À partir de 4 000$.', link: '/services/drain-francais', tag: 'Prix garantis' },
				{ icon: Zap, title: 'Urgence inondation 24/7', desc: 'Refoulement, infiltration, fissure majeure. Intervention en 2h.', link: '/urgences', tag: '24/7 disponible' },
				{ icon: Leaf, title: 'Excavation écoresponsable', desc: 'Tri et recyclage de 75%+ des matériaux selon les normes Québec.', link: '/services/excavation', tag: 'Éco-certifié' },
				{ icon: Mic, title: 'Garantie 15 ans transférable', desc: 'Une garantie qui suit votre maison à la revente. Unique au Québec.', link: '/urgences#garantie', tag: 'Exclusif' },
				{ icon: TrendingUp, title: 'Inspection caméra pré-achat', desc: 'Diagnostic HD avant d\'acheter une maison. Évitez les surprises.', link: '/services/inspection-camera', tag: 'Très demandé' }
			]
		},
		en: {
			tag: '2026 Trends',
			title: 'What our clients are searching for',
			subtitle: 'The most requested questions and services from our clients this year.',
			topics: [
				{ icon: MapPin, title: 'French drain near me', desc: 'Fast local service in Montreal, Laval, Longueuil and 40+ cities.', link: '/excavation/montreal', tag: '+340% searches' },
				{ icon: DollarSign, title: 'French drain price 2026', desc: 'Transparent quote, no hidden fees. Starting from $4,000.', link: '/services/drain-francais', tag: 'Guaranteed pricing' },
				{ icon: Zap, title: '24/7 emergency flooding', desc: 'Backup, infiltration, major crack. Intervention in 2h.', link: '/urgences', tag: '24/7 available' },
				{ icon: Leaf, title: 'Eco-friendly excavation', desc: 'Sort and recycle 75%+ of materials per Quebec standards.', link: '/services/excavation', tag: 'Eco-certified' },
				{ icon: Mic, title: '15-year transferable warranty', desc: 'A warranty that follows your home at resale. Unique in Quebec.', link: '/urgences#garantie', tag: 'Exclusive' },
				{ icon: TrendingUp, title: 'Pre-purchase camera inspection', desc: 'HD diagnostic before buying a home. Avoid surprises.', link: '/services/inspection-camera', tag: 'High demand' }
			]
		},
		es: {
			tag: 'Tendencias 2026',
			title: 'Lo que buscan nuestros clientes',
			subtitle: 'Las preguntas y servicios más solicitados por nuestros clientes este año.',
			topics: [
				{ icon: MapPin, title: 'Drenaje francés cerca de mí', desc: 'Servicio local rápido en Montreal, Laval, Longueuil y +40 ciudades.', link: '/excavation/montreal', tag: '+340% búsquedas' },
				{ icon: DollarSign, title: 'Precio drenaje francés 2026', desc: 'Cotización transparente, sin costos ocultos. Desde $4,000.', link: '/services/drain-francais', tag: 'Precios garantizados' },
				{ icon: Zap, title: 'Urgencia inundación 24/7', desc: 'Reflujo, infiltración, grieta mayor. Intervención en 2h.', link: '/urgences', tag: '24/7 disponible' },
				{ icon: Leaf, title: 'Excavación eco-responsable', desc: 'Reciclaje del 75%+ de materiales según normas Quebec.', link: '/services/excavation', tag: 'Eco-certificado' },
				{ icon: Mic, title: 'Garantía 15 años transferible', desc: 'Una garantía que sigue su casa al revenderla. Único en Quebec.', link: '/urgences#garantie', tag: 'Exclusivo' },
				{ icon: TrendingUp, title: 'Inspección cámara pre-compra', desc: 'Diagnóstico HD antes de comprar casa. Evite sorpresas.', link: '/services/inspection-camera', tag: 'Muy solicitado' }
			]
		}
	};

	$: c = t[lang];
</script>

<section class="py-16 md:py-24 bg-gray-50 dark:bg-zinc-950 border-y border-gray-100 dark:border-zinc-900" aria-labelledby="trends-heading">

	<div class="container max-w-7xl px-4 md:px-6">
		<div class="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 mb-5">
				<span class="text-gray-700 dark:text-gray-300 font-semibold tracking-widest uppercase text-xs">{c.tag}</span>
			</div>
			<h2 id="trends-heading" class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black dark:text-white mb-4 leading-[1.05]">
				{c.title}
			</h2>
			<p class="text-base md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
				{c.subtitle}
			</p>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
			{#each c.topics as topic, i}
				<a
					href={topic.link}
					class="group relative bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-gray-300 dark:hover:border-zinc-700 transition-colors"
					style="animation: fadeInUp 0.6s ease-out {i * 0.08}s both;"
				>
					<!-- Trending tag -->
					<span class="absolute top-4 right-4 inline-flex items-center px-2.5 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 text-[10px] font-semibold tracking-wider uppercase">
						{topic.tag}
					</span>

					<!-- Icon -->
					<div class="w-11 h-11 rounded-lg bg-gray-50 dark:bg-zinc-800 flex items-center justify-center text-[#c9920f] dark:text-[#febd17] mb-4">
						<svelte:component this={topic.icon} class="w-5 h-5" />
					</div>

					<h3 class="text-lg md:text-xl font-bold text-black dark:text-white mb-2 leading-tight pr-16">
						{topic.title}
					</h3>
					<p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
						{topic.desc}
					</p>

					<span class="inline-flex items-center gap-1 text-sm font-semibold text-[#c9920f] dark:text-[#febd17] group-hover:gap-2 transition-all">
						{lang === 'fr' ? 'En savoir plus' : lang === 'es' ? 'Saber más' : 'Learn more'}
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
					</span>
				</a>
			{/each}
		</div>
	</div>
</section>
