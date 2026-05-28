<script lang="ts">
	import { onMount } from 'svelte';
	import { language } from '$lib/store/store';

	type Service = {
		id: number;
		name: string | null;
		description: string | null;
		price_cents: number | null;
		duration_minutes: number | null;
		profile_image: string | null;
		images: string | null;
		business_id: number;
	};

	let services: Service[] = [];
	let loading = true;
	let error = false;
	let selected: Service | null = null;

	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';
	$: t = {
		title: lang === 'fr' ? 'Mes services' : lang === 'es' ? 'Mis servicios' : 'My services',
		subtitle:
			lang === 'fr'
				? 'Cliquez sur un service pour en savoir plus.'
				: lang === 'es'
					? 'Haga clic en un servicio para más detalles.'
					: 'Click a service to learn more.',
		from: lang === 'fr' ? 'À partir de' : lang === 'es' ? 'Desde' : 'From',
		duration: 'min',
		more: lang === 'fr' ? 'En savoir plus' : lang === 'es' ? 'Ver más' : 'Learn more',
		quote:
			lang === 'fr'
				? 'Demander une soumission'
				: lang === 'es'
					? 'Solicitar cotización'
					: 'Request a quote',
		close: lang === 'fr' ? 'Fermer' : lang === 'es' ? 'Cerrar' : 'Close',
		empty:
			lang === 'fr'
				? 'Aucun service disponible pour le moment.'
				: lang === 'es'
					? 'No hay servicios disponibles por el momento.'
					: 'No services available at the moment.'
	};

	function fmt(cents: number | null) {
		if (cents == null) return '—';
		return new Intl.NumberFormat(
			lang === 'fr' ? 'fr-CA' : lang === 'es' ? 'es-CA' : 'en-CA',
			{ style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }
		).format(cents / 100);
	}

	function soumissionHref(name: string | null): string {
		return `/soumission?project_type=${encodeURIComponent((name ?? '').trim())}`;
	}

	function open(svc: Service) {
		selected = svc;
	}
	function close() {
		selected = null;
	}

	onMount(async () => {
		try {
			const res = await fetch('/api/connek/services');
			if (!res.ok) {
				error = true;
				return;
			}
			const body = (await res.json()) as { data?: Service[] };
			services = body.data ?? [];
		} catch {
			error = true;
		} finally {
			loading = false;
		}
	});
</script>

<section
	id="connek-services"
	class="py-16 md:py-24 bg-white dark:bg-black border-t border-gray-200 dark:border-zinc-800"
>
	<div class="container max-w-6xl mx-auto px-4">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-black text-black dark:text-white mb-3">{t.title}</h2>
			<p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t.subtitle}</p>
		</div>

		{#if loading}
			<div class="flex justify-center py-12">
				<div
					class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#febd17]"
					aria-label="loading"
				></div>
			</div>
		{:else if error || services.length === 0}
			<p class="text-center text-gray-500 dark:text-zinc-500 py-12">{t.empty}</p>
		{:else}
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each services as svc (svc.id)}
					<button
						type="button"
						on:click={() => open(svc)}
						class="group text-left block p-6 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl hover:border-[#febd17] hover:shadow-xl transition-all"
					>
						<div class="w-12 h-1 bg-[#febd17] rounded-full mb-4"></div>
						<h3 class="text-xl font-bold text-black dark:text-white mb-2">{svc.name ?? '—'}</h3>
						{#if svc.description}
							<p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
								{svc.description}
							</p>
						{/if}
						<div
							class="flex items-center justify-between text-sm mt-4 pt-4 border-t border-gray-200 dark:border-zinc-800"
						>
							{#if svc.price_cents}
								<div>
									<span class="text-gray-500 dark:text-zinc-500 block text-xs">{t.from}</span>
									<span class="font-bold text-black dark:text-white">{fmt(svc.price_cents)}</span>
								</div>
							{/if}
							{#if svc.duration_minutes}
								<div class="text-right">
									<span class="text-gray-500 dark:text-zinc-500 block text-xs">⏱</span>
									<span class="font-semibold text-gray-700 dark:text-gray-300">
										{svc.duration_minutes} {t.duration}
									</span>
								</div>
							{/if}
						</div>
						<span
							class="inline-block mt-4 text-[#febd17] font-bold text-sm group-hover:translate-x-1 transition-transform"
						>
							{t.more} →
						</span>
					</button>
				{/each}
			</div>
		{/if}
	</div>
</section>

{#if selected}
	<!-- Detail modal — shows only the service data configured in Connek. -->
	<div
		class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
		on:click={close}
		on:keydown={(e) => e.key === 'Escape' && close()}
		role="button"
		tabindex="-1"
	>
		<div
			class="relative w-full sm:max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 rounded-t-3xl sm:rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-2xl"
			on:click|stopPropagation
			role="dialog"
			aria-modal="true"
		>
			<button
				type="button"
				on:click={close}
				aria-label={t.close}
				class="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 text-black dark:text-white"
			>
				✕
			</button>

			<div class="p-6 sm:p-8">
				<div class="w-12 h-1 bg-[#febd17] rounded-full mb-5"></div>
				<h3 class="text-2xl font-black text-black dark:text-white mb-3">{selected.name ?? '—'}</h3>

				{#if selected.description}
					<p class="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line mb-6">
						{selected.description}
					</p>
				{/if}

				<div class="flex flex-wrap gap-6 mb-8">
					{#if selected.price_cents}
						<div>
							<span class="text-gray-500 dark:text-zinc-500 block text-xs uppercase tracking-wide"
								>{t.from}</span
							>
							<span class="text-xl font-bold text-black dark:text-white"
								>{fmt(selected.price_cents)}</span
							>
						</div>
					{/if}
					{#if selected.duration_minutes}
						<div>
							<span class="text-gray-500 dark:text-zinc-500 block text-xs uppercase tracking-wide"
								>⏱</span
							>
							<span class="text-xl font-bold text-black dark:text-white"
								>{selected.duration_minutes} {t.duration}</span
							>
						</div>
					{/if}
				</div>

				<a
					href={soumissionHref(selected.name)}
					class="inline-flex w-full items-center justify-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-[#febd17] to-yellow-500 hover:from-yellow-400 hover:to-[#febd17] text-black font-black text-base shadow-lg shadow-yellow-500/30 transition-all"
				>
					{t.quote} →
				</a>
			</div>
		</div>
	</div>
{/if}
