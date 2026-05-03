<script lang="ts">
	import { onMount } from 'svelte';
	import { Cookie, X } from 'lucide-svelte';
	import { language } from '$lib/store/store';
	import { updateConsent, getStoredConsent } from '$lib/analytics/gtag';

	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';

	let visible = false;

	onMount(() => {
		const stored = getStoredConsent();
		if (stored === null) {
			setTimeout(() => (visible = true), 1500);
		}
	});

	function accept() {
		updateConsent(true);
		visible = false;
	}

	function decline() {
		updateConsent(false);
		visible = false;
	}

	const t = {
		fr: {
			title: '🍪 Cookies et confidentialité',
			text: 'Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic. Conforme à la Loi 25 du Québec.',
			accept: 'Accepter',
			decline: 'Refuser',
			learn: 'En savoir plus'
		},
		en: {
			title: '🍪 Cookies & privacy',
			text: 'We use cookies to enhance your experience and analyze our traffic. Compliant with Quebec Law 25.',
			accept: 'Accept',
			decline: 'Decline',
			learn: 'Learn more'
		},
		es: {
			title: '🍪 Cookies y privacidad',
			text: 'Usamos cookies para mejorar su experiencia y analizar el tráfico. Conforme a la Ley 25 de Quebec.',
			accept: 'Aceptar',
			decline: 'Rechazar',
			learn: 'Saber más'
		}
	};

	$: c = t[lang];
</script>

{#if visible}
	<div class="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-[55] animate-slide-up">
		<div class="relative bg-zinc-900/95 backdrop-blur-xl text-white border border-[#febd17]/30 rounded-2xl shadow-2xl shadow-yellow-500/20 p-5">
			<button
				on:click={decline}
				aria-label="Close"
				class="absolute top-3 right-3 p-1 rounded-full hover:bg-white/10"
			>
				<X class="w-4 h-4 text-zinc-400" />
			</button>

			<div class="flex items-start gap-3 mb-4">
				<div class="w-9 h-9 rounded-full bg-[#febd17]/20 border border-[#febd17]/40 flex items-center justify-center flex-shrink-0">
					<Cookie class="w-4 h-4 text-[#febd17]" />
				</div>
				<div class="pr-6">
					<p class="font-bold text-sm mb-1">{c.title}</p>
					<p class="text-xs text-zinc-400 leading-relaxed">{c.text}</p>
				</div>
			</div>

			<div class="flex gap-2">
				<button
					on:click={accept}
					class="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#febd17] to-yellow-500 text-black font-bold text-xs hover:scale-[1.02] active:scale-95 transition-transform"
				>
					{c.accept}
				</button>
				<button
					on:click={decline}
					class="flex-1 px-4 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 font-medium text-xs hover:bg-zinc-800 transition-colors"
				>
					{c.decline}
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	@keyframes slide-up {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.animate-slide-up {
		animation: slide-up 0.4s ease-out;
	}
</style>
