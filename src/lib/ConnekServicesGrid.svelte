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

	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';
	$: t = {
		title:
			lang === 'fr'
				? 'Mes services'
				: lang === 'es'
					? 'Mis servicios'
					: 'My services',
		subtitle:
			lang === 'fr'
				? 'Cliquez sur un service pour en savoir plus.'
				: lang === 'es'
					? 'Haga clic en un servicio para más detalles.'
					: 'Click a service to learn more.',
		from: lang === 'fr' ? 'À partir de' : lang === 'es' ? 'Desde' : 'From',
		duration:
			lang === 'fr' ? 'min' : lang === 'es' ? 'min' : 'min',
		quote:
			lang === 'fr'
				? 'En savoir plus'
				: lang === 'es'
					? 'Ver más'
					: 'Learn more',
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

	// Tapping a service opens its description page when one exists; the SEO
	// detail page's CTA then drives the submission. Services without a
	// matching page fall straight through to the submission form, with the
	// service preselected.
	const SLUG_BY_NAME: Record<string, string> = {
		'drain français': 'drain-francais',
		excavation: 'excavation',
		'réparation fissures': 'reparation-fissures',
		'réparation de fissures': 'reparation-fissures',
		démolition: 'demolition',
		'inspection caméra': 'inspection-camera'
	};

	function hrefFor(name: string | null): string {
		const clean = (name ?? '').trim();
		const slug = SLUG_BY_NAME[clean.toLowerCase()];
		return slug
			? `/services/${slug}`
			: `/soumission?project_type=${encodeURIComponent(clean)}`;
	}
</script>

<section
	id="connek-services"
	class="py-16 md:py-24 bg-white dark:bg-black border-t border-gray-200 dark:border-zinc-800"
>
	<div class="container max-w-6xl mx-auto px-4">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-black text-black dark:text-white mb-3">
				{t.title}
			</h2>
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
					<a
						href={hrefFor(svc.name)}
						class="group block p-6 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl hover:border-[#febd17] hover:shadow-xl transition-all"
					>
						<div class="w-12 h-1 bg-[#febd17] rounded-full mb-4"></div>
						<h3 class="text-xl font-bold text-black dark:text-white mb-2">
							{svc.name ?? '—'}
						</h3>
						{#if svc.description}
							<p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
								{svc.description}
							</p>
						{/if}
						<div class="flex items-center justify-between text-sm mt-4 pt-4 border-t border-gray-200 dark:border-zinc-800">
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
						<span class="inline-block mt-4 text-[#febd17] font-bold text-sm group-hover:translate-x-1 transition-transform">
							{t.quote} →
						</span>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</section>
