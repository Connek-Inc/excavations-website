<script lang="ts">
	import { onMount } from 'svelte';
	import { Phone, MessageCircle, X, Sun, Moon } from 'lucide-svelte';
	import { language, theme } from '$lib/store/store';
	import { trackPhoneClick, trackWhatsAppClick } from '$lib/analytics/gtag';

	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';

	let mounted = false;
	let expanded = false;

	onMount(() => {
		mounted = true;
	});

	function toggleTheme() {
		theme.update((v) => (v === 'dark' ? 'light' : 'dark'));
	}

	const t = {
		fr: { call: 'Appelez-nous', whatsapp: 'WhatsApp', label: 'Contact rapide' },
		en: { call: 'Call us', whatsapp: 'WhatsApp', label: 'Quick contact' },
		es: { call: 'Llámenos', whatsapp: 'WhatsApp', label: 'Contacto rápido' }
	};
</script>

{#if mounted}
	<div class="fixed right-4 md:right-6 bottom-20 lg:bottom-6 z-40 flex flex-col gap-3 items-end">
		<!-- Theme toggle (smaller, less prominent) -->
		<button
			on:click={toggleTheme}
			aria-label="Toggle theme"
			class="p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110
				{$theme === 'dark'
				? 'bg-zinc-800/80 backdrop-blur text-[#febd17] border border-zinc-700'
				: 'bg-white/80 backdrop-blur text-orange-500 border border-gray-200'}"
		>
			{#if $theme === 'dark'}
				<Sun class="w-4 h-4" />
			{:else}
				<Moon class="w-4 h-4" />
			{/if}
		</button>

		<!-- Expanded contact options -->
		{#if expanded}
			<div class="flex flex-col gap-3 animate-fade-in items-end">
				<a
					href="https://wa.me/15148309973?text={encodeURIComponent(
						lang === 'fr'
							? 'Bonjour, je voudrais une soumission gratuite'
							: lang === 'es'
								? 'Hola, quisiera una cotización gratuita'
								: 'Hello, I would like a free quote'
					)}"
					target="_blank"
					rel="noopener"
					on:click={() => {
						trackWhatsAppClick('floating_actions');
						if (typeof window !== 'undefined' && window.gtag_report_conversion) {
							window.gtag_report_conversion('https://wa.me/15148309973');
						}
					}}
					aria-label={t[lang].whatsapp}
					class="flex items-center gap-3 pl-4 pr-5 py-3 rounded-full shadow-2xl shadow-green-500/40 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold transition-all hover:scale-105"
				>
					<MessageCircle class="w-5 h-5" />
					<span class="text-sm">{t[lang].whatsapp}</span>
				</a>
				<a
					href="tel:+15148309973"
					on:click={() => {
						trackPhoneClick('+15148309973', 'floating_actions');
						if (typeof window !== 'undefined' && window.gtag_report_conversion) {
							window.gtag_report_conversion('tel:+15148309973');
						}
					}}
					aria-label={t[lang].call}
					class="flex items-center gap-3 pl-4 pr-5 py-3 rounded-full shadow-2xl shadow-blue-500/40 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold transition-all hover:scale-105"
				>
					<Phone class="w-5 h-5" />
					<span class="text-sm">{t[lang].call}</span>
				</a>
			</div>
		{/if}

		<!-- Main FAB -->
		<button
			on:click={() => (expanded = !expanded)}
			aria-label={t[lang].label}
			class="relative p-4 rounded-full shadow-2xl shadow-yellow-500/50 bg-gradient-to-br from-[#febd17] to-yellow-600 text-black transition-all duration-300 hover:scale-110 active:scale-95"
		>
			{#if !expanded}
				<span class="absolute inset-0 rounded-full bg-[#febd17] animate-ping opacity-20"></span>
			{/if}
			{#if expanded}
				<X class="w-6 h-6 relative z-10" />
			{:else}
				<Phone class="w-6 h-6 relative z-10" />
			{/if}
		</button>
	</div>
{/if}

<style>
	@keyframes fade-in {
		from { opacity: 0; transform: translateY(10px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.animate-fade-in {
		animation: fade-in 0.3s ease-out;
	}
</style>
