<script lang="ts">
	import { onMount } from 'svelte';
	import { X, Gift, Phone, Calendar } from 'lucide-svelte';
	import { language } from '$lib/store/store';

	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';

	let visible = false;
	let triggered = false;

	onMount(() => {
		const STORAGE_KEY = 'mi_exit_intent_shown';
		const lastShown = sessionStorage.getItem(STORAGE_KEY);

		if (lastShown) return;

		const handleMouseLeave = (e: MouseEvent) => {
			if (e.clientY <= 0 && !triggered) {
				triggered = true;
				visible = true;
				sessionStorage.setItem(STORAGE_KEY, '1');
			}
		};

		const timer = setTimeout(() => {
			document.addEventListener('mouseleave', handleMouseLeave);
		}, 15000);

		return () => {
			clearTimeout(timer);
			document.removeEventListener('mouseleave', handleMouseLeave);
		};
	});

	const t = {
		fr: {
			badge: 'Offre exclusive',
			title: 'Attendez ! Économisez 10% sur votre projet',
			subtitle:
				'Obtenez votre soumission gratuite aujourd\'hui et économisez 10% sur tous nos services d\'excavation et drain français.',
			cta: 'Obtenir ma soumission',
			call: 'Appeler maintenant',
			no: 'Non merci'
		},
		en: {
			badge: 'Exclusive offer',
			title: 'Wait! Save 10% on your project',
			subtitle:
				'Get your free quote today and save 10% on all our excavation and French drain services.',
			cta: 'Get my quote',
			call: 'Call now',
			no: 'No thanks'
		},
		es: {
			badge: 'Oferta exclusiva',
			title: '¡Espere! Ahorre 10% en su proyecto',
			subtitle:
				'Obtenga su cotización gratuita hoy y ahorre 10% en todos nuestros servicios de excavación y drenaje francés.',
			cta: 'Obtener mi cotización',
			call: 'Llamar ahora',
			no: 'No gracias'
		}
	};
</script>

{#if visible}
	<div class="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
		<button
			type="button"
			aria-label="Close"
			on:click={() => (visible = false)}
			class="absolute inset-0 bg-black/70 backdrop-blur-sm"
		></button>

		<div class="relative bg-white dark:bg-zinc-900 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-scale-up border border-[#febd17]/20">
			<button
				on:click={() => (visible = false)}
				aria-label="Close"
				class="absolute top-4 right-4 p-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 z-10"
			>
				<X class="w-4 h-4" />
			</button>

			<div class="absolute top-0 right-0 w-64 h-64 bg-[#febd17] rounded-full blur-3xl opacity-20 -z-0"></div>

			<div class="relative p-8 md:p-10">
				<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#febd17]/20 text-[#febd17] text-xs font-bold uppercase tracking-wider mb-4">
					<Gift class="w-3.5 h-3.5" />
					{t[lang].badge}
				</div>

				<h2 class="text-3xl md:text-4xl font-black mb-3 leading-tight">
					{t[lang].title}
				</h2>

				<p class="text-gray-600 dark:text-zinc-400 mb-6 leading-relaxed">
					{t[lang].subtitle}
				</p>

				<div class="flex flex-col gap-3">
					<a
						href="#contact"
						on:click={() => (visible = false)}
						class="group inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-[#febd17] to-yellow-500 text-black font-black text-base hover:scale-105 transition-transform shadow-2xl shadow-yellow-500/40"
					>
						<Calendar class="w-5 h-5" />
						{t[lang].cta}
					</a>
					<a
						href="tel:+15148309973"
						class="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border-2 border-gray-200 dark:border-zinc-700 font-bold text-base hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
					>
						<Phone class="w-5 h-5" />
						{t[lang].call}
					</a>
				</div>

				<button
					on:click={() => (visible = false)}
					class="block w-full mt-4 text-xs text-gray-400 dark:text-zinc-600 hover:underline text-center"
				>
					{t[lang].no}
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	@keyframes fade-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}
	@keyframes scale-up {
		from { opacity: 0; transform: scale(0.92); }
		to { opacity: 1; transform: scale(1); }
	}
	.animate-fade-in {
		animation: fade-in 0.3s ease-out;
	}
	.animate-scale-up {
		animation: scale-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}
</style>
