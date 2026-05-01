<script lang="ts">
	import { onMount } from 'svelte';
	import { Phone, Calendar } from 'lucide-svelte';
	import { language } from '$lib/store/store';

	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';

	let visible = false;
	let dismissed = false;

	onMount(() => {
		const onScroll = () => {
			visible = window.scrollY > 600;
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	const t = {
		fr: {
			urgent: 'Disponible maintenant',
			cta: 'Soumission gratuite 24h',
			tel: 'Appeler'
		},
		en: {
			urgent: 'Available now',
			cta: 'Free quote in 24h',
			tel: 'Call'
		},
		es: {
			urgent: 'Disponible ahora',
			cta: 'Cotización gratuita 24h',
			tel: 'Llamar'
		}
	};
</script>

{#if visible && !dismissed}
	<div
		class="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-gradient-to-r from-black via-zinc-900 to-black border-t border-[#febd17]/30 shadow-2xl shadow-yellow-500/20 animate-slide-up"
	>
		<div class="px-3 py-3 flex items-center gap-2">
			<a
				href="tel:+15148309973"
				class="flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-100 transition-colors"
				aria-label={t[lang].tel}
			>
				<Phone class="w-4 h-4" />
				<span class="hidden xs:inline">{t[lang].tel}</span>
			</a>
			<a
				href="#contact"
				class="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#febd17] to-yellow-500 text-black font-black text-sm shadow-lg"
			>
				<Calendar class="w-4 h-4" />
				{t[lang].cta}
			</a>
		</div>
		<div class="text-center pb-1">
			<span class="inline-flex items-center gap-1.5 text-[10px] text-green-400 font-semibold">
				<span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
				{t[lang].urgent}
			</span>
		</div>
	</div>
{/if}

<style>
	@keyframes slide-up {
		from {
			transform: translateY(100%);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}
	.animate-slide-up {
		animation: slide-up 0.4s ease-out;
	}
</style>
