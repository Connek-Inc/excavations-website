<script lang="ts">
	import { ArrowRight, Phone, Calendar } from 'lucide-svelte';
	import { language } from '$lib/store/store';
	import { trackCTAClick, trackPhoneClick } from '$lib/analytics/gtag';

	export let variant: 'banner' | 'card' | 'minimal' = 'banner';
	export let location: string = 'inline_cta';

	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';

	const t = {
		fr: {
			title: "Besoin d'une soumission ?",
			subtitle: 'Recevez votre estimation gratuite en moins de 24 heures',
			cta: 'Obtenir ma soumission',
			call: 'Ou appelez',
			phone: '+1 (514) 830-9973',
			urgent: 'Réponse rapide garantie'
		},
		en: {
			title: 'Need a quote?',
			subtitle: 'Get your free estimate in less than 24 hours',
			cta: 'Get my quote',
			call: 'Or call',
			phone: '+1 (514) 830-9973',
			urgent: 'Fast response guaranteed'
		},
		es: {
			title: '¿Necesita una cotización?',
			subtitle: 'Reciba su estimación gratuita en menos de 24 horas',
			cta: 'Obtener mi cotización',
			call: 'O llame',
			phone: '+1 (514) 830-9973',
			urgent: 'Respuesta rápida garantizada'
		}
	};
</script>

{#if variant === 'banner'}
	<section class="relative my-16 px-4" aria-label="Call to action">
		<div class="container max-w-5xl">
			<div class="rounded-2xl bg-zinc-950 border border-zinc-800 p-8 md:p-12">
				<div class="flex flex-col md:flex-row items-center gap-8 justify-between">
					<div class="flex-1 text-center md:text-left">
						<span class="inline-block text-[#febd17] font-semibold uppercase tracking-[0.2em] text-xs mb-3">
							{t[lang].urgent}
						</span>
						<h3 class="text-3xl md:text-4xl font-black text-white mb-2">
							{t[lang].title}
						</h3>
						<p class="text-zinc-400 text-lg">
							{t[lang].subtitle}
						</p>
					</div>
					<div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
						<a
							href="#contact"
							on:click={() => trackCTAClick(t[lang].cta, location)}
							class="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg bg-[#febd17] hover:bg-[#e5aa10] text-black font-bold text-base transition-colors whitespace-nowrap"
						>
							<Calendar class="w-4 h-4" />
							{t[lang].cta}
							<ArrowRight class="w-4 h-4" />
						</a>
						<a
							href="tel:+15148309973"
							on:click={() => trackPhoneClick('+15148309973', location)}
							class="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg border border-zinc-700 text-white hover:border-white font-semibold text-base transition-colors whitespace-nowrap"
						>
							<Phone class="w-4 h-4" />
							{t[lang].phone}
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>
{:else if variant === 'card'}
	<div class="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 text-white">
		<h3 class="text-xl font-bold mb-2">{t[lang].title}</h3>
		<p class="mb-4 text-zinc-400">{t[lang].subtitle}</p>
		<a
			href="#contact"
			class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#febd17] hover:bg-[#e5aa10] text-black font-semibold text-sm transition-colors"
		>
			{t[lang].cta} <ArrowRight class="w-4 h-4" />
		</a>
	</div>
{:else}
	<div class="flex items-center justify-between gap-4 p-4 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
		<p class="font-semibold text-sm">{t[lang].title}</p>
		<a
			href="#contact"
			class="inline-flex items-center gap-1 text-[#c9920f] dark:text-[#febd17] font-semibold text-sm hover:underline whitespace-nowrap"
		>
			{t[lang].cta} <ArrowRight class="w-4 h-4" />
		</a>
	</div>
{/if}
