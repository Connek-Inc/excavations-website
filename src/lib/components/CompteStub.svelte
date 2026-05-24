<script lang="ts">
	import { ArrowLeft, Phone, Mail } from 'lucide-svelte';
	import { language } from '$lib/store/store';

	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';
	$: t = T[lang] || T.fr;

	const T = {
		fr: {
			title: 'Espace client',
			body:
				"L'espace client en ligne sera disponible prochainement. Pour toute demande, contactez-nous directement.",
			write: 'Nous écrire',
			home: "Retour à l'accueil"
		},
		en: {
			title: 'Client area',
			body:
				'The online client area will be available soon. For any request, contact us directly.',
			write: 'Write to us',
			home: 'Back to home'
		},
		es: {
			title: 'Espacio cliente',
			body:
				'El espacio cliente en línea estará disponible próximamente. Para cualquier consulta, contáctenos directamente.',
			write: 'Escríbanos',
			home: 'Volver al inicio'
		}
	};
</script>

<div class="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4 py-24">
	<div class="max-w-xl w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 sm:p-12 text-center">
		<h1 class="text-2xl sm:text-3xl font-bold mb-3">{t.title}</h1>
		<p class="text-zinc-400 mb-8">{t.body}</p>
		<div class="flex flex-col sm:flex-row gap-3 justify-center">
			<a
				href="tel:+15148309973"
				class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#febd17] hover:bg-[#e5aa10] text-black font-semibold transition-colors"
			>
				<Phone class="h-4 w-4" /> (514) 830-9973
			</a>
			<a
				href="mailto:miniexcavationerable@gmail.com"
				class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-200 font-semibold transition-colors"
			>
				<Mail class="h-4 w-4" /> {t.write}
			</a>
		</div>
		<a
			href="/"
			class="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-[#febd17] transition-colors mt-8"
		>
			<ArrowLeft class="h-4 w-4" /> {t.home}
		</a>
	</div>
</div>
