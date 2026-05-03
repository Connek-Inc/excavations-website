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
			urgent: '⚡ Réponse rapide garantie'
		},
		en: {
			title: 'Need a quote?',
			subtitle: 'Get your free estimate in less than 24 hours',
			cta: 'Get my quote',
			call: 'Or call',
			phone: '+1 (514) 830-9973',
			urgent: '⚡ Fast response guaranteed'
		},
		es: {
			title: '¿Necesita una cotización?',
			subtitle: 'Reciba su estimación gratuita en menos de 24 horas',
			cta: 'Obtener mi cotización',
			call: 'O llame',
			phone: '+1 (514) 830-9973',
			urgent: '⚡ Respuesta rápida garantizada'
		}
	};
</script>

{#if variant === 'banner'}
	<section class="relative my-16 px-4" aria-label="Call to action">
		<div class="container max-w-5xl">
			<div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-black via-zinc-900 to-black border border-[#febd17]/30 p-8 md:p-12 shadow-2xl">
				<div class="absolute top-0 right-0 w-96 h-96 bg-[#febd17] rounded-full blur-3xl opacity-20 -z-0"></div>
				<div class="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500 rounded-full blur-3xl opacity-10 -z-0"></div>
				<div class="absolute inset-0 bg-[linear-gradient(rgba(254,189,23,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(254,189,23,0.03)_1px,transparent_1px)] bg-[size:30px_30px]"></div>

				<div class="relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between">
					<div class="flex-1 text-center md:text-left">
						<span class="inline-block text-[#febd17] font-bold uppercase tracking-widest text-xs mb-3">
							{t[lang].urgent}
						</span>
						<h3 class="text-3xl md:text-4xl font-black text-white mb-2">
							{t[lang].title}
						</h3>
						<p class="text-zinc-300 text-lg">
							{t[lang].subtitle}
						</p>
					</div>
					<div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
						<a
							href="#contact"
							on:click={() => trackCTAClick(t[lang].cta, location)}
							class="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#febd17] to-yellow-500 hover:from-yellow-400 hover:to-[#febd17] text-black font-black text-base transition-all hover:scale-105 shadow-2xl shadow-yellow-500/40 whitespace-nowrap"
						>
							<Calendar class="w-5 h-5" />
							{t[lang].cta}
							<ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
						</a>
						<a
							href="tel:+15148309973"
							on:click={() => trackPhoneClick('+15148309973', location)}
							class="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/20 text-white hover:bg-white/10 font-bold text-base transition-all whitespace-nowrap"
						>
							<Phone class="w-5 h-5" />
							{t[lang].phone}
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>
{:else if variant === 'card'}
	<div class="rounded-2xl bg-gradient-to-br from-[#febd17] to-yellow-600 p-6 text-black shadow-2xl">
		<h3 class="text-xl font-black mb-2">{t[lang].title}</h3>
		<p class="mb-4 opacity-80">{t[lang].subtitle}</p>
		<a
			href="#contact"
			class="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black text-[#febd17] font-bold text-sm hover:scale-105 transition-transform"
		>
			{t[lang].cta} <ArrowRight class="w-4 h-4" />
		</a>
	</div>
{:else}
	<div class="flex items-center justify-between gap-4 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-500/10 border border-[#febd17]/30">
		<p class="font-semibold text-sm">{t[lang].title}</p>
		<a
			href="#contact"
			class="inline-flex items-center gap-1 text-[#febd17] font-bold text-sm hover:underline whitespace-nowrap"
		>
			{t[lang].cta} <ArrowRight class="w-4 h-4" />
		</a>
	</div>
{/if}
