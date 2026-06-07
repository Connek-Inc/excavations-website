<script lang="ts">
	import { ArrowLeft, Shield } from 'lucide-svelte';
	import SoumissionForm from '$lib/SoumissionForm.svelte';
</script>

<svelte:head>
	<title>Demande de soumission — Mini Excavations Érable</title>
	<meta
		name="description"
		content="Obtenez une soumission gratuite pour vos travaux d'excavation au Bas-Saint-Laurent. RBQ 5823-7736-01."
	/>
</svelte:head>

<div class="min-h-screen bg-white text-black dark:bg-zinc-950 dark:text-white">
	<header class="border-b border-gray-200 bg-white/95 dark:border-zinc-800 dark:bg-zinc-950/95 backdrop-blur sticky top-0 z-30">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
			<a
				href="/"
				class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#c9920f] dark:text-zinc-400 dark:hover:text-[#febd17] transition-colors"
			>
				<ArrowLeft class="h-4 w-4" /> Retour au site
			</a>
			<div class="hidden sm:flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-500">
				<Shield class="h-3.5 w-3.5 text-[#c9920f] dark:text-[#febd17]" />
				RBQ 5823-7736-01
			</div>
		</div>
	</header>

	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
		<SoumissionForm showHero={true} showSidebar={true} />
	</main>
</div>
