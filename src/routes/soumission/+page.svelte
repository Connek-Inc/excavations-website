<script lang="ts">
	import { enhance } from '$app/forms';
	import { language } from '$lib/store/store.js';
	import Footer from '$lib/Footer.svelte';
	import { CheckCircle2, FileText, ShieldCheck, Clock } from 'lucide-svelte';
	import { COMPANY } from '$lib/soumission/company';

	export let form: {
		success?: boolean;
		error?: string;
		values?: {
			name?: string;
			email?: string;
			phone?: string;
			adresse?: string;
			projetType?: string;
			description?: string;
		};
	} | null = null;

	$: isEn = $language === 'en';
	$: isEs = $language === 'es';
	$: values = form?.values;

	let submitting = false;
</script>

<svelte:head>
	<title>Demander une soumission — Mini Excavation Érable</title>
	<meta
		name="description"
		content="Obtenez une soumission gratuite pour vos travaux d'excavation, drain français, fissure ou démolition. Réponse rapide par {COMPANY.name}."
	/>
</svelte:head>

<main class="bg-gray-50 dark:bg-zinc-950 min-h-screen">
	<section class="bg-zinc-900 text-white py-12 md:py-16">
		<div class="max-w-5xl mx-auto px-4">
			<div class="flex items-center gap-2 text-[#febd17] text-sm font-bold mb-3">
				<FileText class="w-4 h-4" />
				{isEn ? 'FREE QUOTE' : isEs ? 'COTIZACIÓN GRATIS' : 'SOUMISSION GRATUITE'}
			</div>
			<h1 class="text-3xl md:text-5xl font-black tracking-tight mb-3">
				{isEn
					? 'Request a quote in 2 minutes'
					: isEs
						? 'Solicita una cotización en 2 minutos'
						: 'Demandez une soumission en 2 minutes'}
			</h1>
			<p class="text-lg text-white/80 max-w-2xl">
				{isEn
					? 'Tell us about your project and get a personalized quote, drafted by our team.'
					: isEs
						? 'Cuéntanos sobre tu proyecto y recibe una cotización personalizada de nuestro equipo.'
						: 'Décrivez votre projet et recevez une soumission personnalisée, préparée par notre équipe.'}
			</p>
			<div class="mt-6 grid sm:grid-cols-3 gap-3 text-sm">
				<div class="flex items-center gap-2"><ShieldCheck class="w-4 h-4 text-[#febd17]" /> RBQ {COMPANY.rbq}</div>
				<div class="flex items-center gap-2"><Clock class="w-4 h-4 text-[#febd17]" /> {isEn ? 'Reply within 24h' : isEs ? 'Respuesta en 24h' : 'Réponse sous 24h'}</div>
				<div class="flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-[#febd17]" /> {isEn ? 'No commitment' : isEs ? 'Sin compromiso' : 'Aucun engagement'}</div>
			</div>
		</div>
	</section>

	<section class="py-10 md:py-14">
		<div class="max-w-3xl mx-auto px-4">
			{#if form?.success}
				<div class="bg-white dark:bg-zinc-900 border border-green-200 dark:border-green-500/30 rounded-2xl p-8 text-center">
					<div class="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-500/15 flex items-center justify-center">
						<CheckCircle2 class="w-8 h-8 text-green-600 dark:text-green-400" />
					</div>
					<h2 class="text-2xl font-black mb-2">
						{isEn ? 'Request received!' : isEs ? '¡Solicitud recibida!' : 'Demande reçue !'}
					</h2>
					<p class="text-gray-600 dark:text-zinc-400">
						{isEn
							? "We'll get back to you within 24h with your personalized quote."
							: isEs
								? 'Te contactaremos en 24h con tu cotización personalizada.'
								: 'Nous vous recontactons sous 24h avec votre soumission personnalisée.'}
					</p>
					<div class="mt-6 flex flex-wrap gap-3 justify-center">
						<a
							href="/"
							class="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-800"
						>
							{isEn ? 'Back to home' : isEs ? 'Volver al inicio' : "Retour à l'accueil"}
						</a>
						<a
							href="tel:{COMPANY.phone}"
							class="px-5 py-2.5 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400"
						>
							{COMPANY.phone}
						</a>
					</div>
				</div>
			{:else}
				<form
					method="POST"
					use:enhance={() => {
						submitting = true;
						return async ({ update }) => {
							submitting = false;
							await update();
						};
					}}
					class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 space-y-5"
				>
					<input type="hidden" name="language" value={$language} />

					{#if form?.error}
						<div class="rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 p-3 text-sm text-red-700 dark:text-red-400">
							{form.error}
						</div>
					{/if}

					<div class="grid gap-4 md:grid-cols-2">
						<label class="block">
							<span class="text-sm font-semibold mb-1 block">
								{isEn ? 'Full name' : isEs ? 'Nombre completo' : 'Nom complet'} *
							</span>
							<input
								type="text"
								name="name"
								required
								value={values?.name ?? ''}
								class="w-full h-11 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#febd17]"
							/>
						</label>
						<label class="block">
							<span class="text-sm font-semibold mb-1 block">
								{isEn ? 'Email' : isEs ? 'Correo' : 'Courriel'} *
							</span>
							<input
								type="email"
								name="email"
								required
								value={values?.email ?? ''}
								class="w-full h-11 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#febd17]"
							/>
						</label>
						<label class="block">
							<span class="text-sm font-semibold mb-1 block">
								{isEn ? 'Phone' : isEs ? 'Teléfono' : 'Téléphone'}
							</span>
							<input
								type="tel"
								name="phone"
								value={values?.phone ?? ''}
								class="w-full h-11 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#febd17]"
							/>
						</label>
						<label class="block">
							<span class="text-sm font-semibold mb-1 block">
								{isEn ? 'Project type' : isEs ? 'Tipo de proyecto' : 'Type de projet'}
							</span>
							<select
								name="projetType"
								class="w-full h-11 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#febd17]"
							>
								<option value="">— {isEn ? 'Select' : isEs ? 'Seleccionar' : 'Sélectionner'} —</option>
								<option value="Drain français">Drain français</option>
								<option value="Excavation">Excavation</option>
								<option value="Mini-excavation">Mini-excavation</option>
								<option value="Réparation de fissure">Réparation de fissure</option>
								<option value="Démolition">Démolition</option>
								<option value="Inspection">Inspection</option>
								<option value="Urgence">Urgence</option>
								<option value="Autre">{isEn ? 'Other' : isEs ? 'Otro' : 'Autre'}</option>
							</select>
						</label>
					</div>

					<label class="block">
						<span class="text-sm font-semibold mb-1 block">
							{isEn ? 'Project address' : isEs ? 'Dirección del proyecto' : 'Adresse du projet'}
						</span>
						<input
							type="text"
							name="adresse"
							value={values?.adresse ?? ''}
							placeholder={isEn ? 'Street, city' : isEs ? 'Calle, ciudad' : 'Rue, ville'}
							class="w-full h-11 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#febd17]"
						/>
					</label>

					<label class="block">
						<span class="text-sm font-semibold mb-1 block">
							{isEn ? 'Project description' : isEs ? 'Descripción del proyecto' : 'Description du projet'} *
						</span>
						<textarea
							name="description"
							required
							rows="6"
							placeholder={isEn
								? 'Describe your project: dimensions, conditions, deadlines...'
								: isEs
									? 'Describe tu proyecto: dimensiones, condiciones, plazos...'
									: 'Décrivez votre projet : dimensions, conditions, délais…'}
							class="w-full rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#febd17]"
						>{values?.description ?? ''}</textarea>
					</label>

					<div class="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
						<p class="text-xs text-gray-500 dark:text-zinc-400">
							* {isEn ? 'Required fields' : isEs ? 'Campos obligatorios' : 'Champs obligatoires'}
						</p>
						<button
							type="submit"
							disabled={submitting}
							class="px-6 py-3 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400 disabled:opacity-50 inline-flex items-center justify-center gap-2"
						>
							{submitting
								? isEn ? 'Sending…' : isEs ? 'Enviando…' : 'Envoi…'
								: isEn ? 'Send my request' : isEs ? 'Enviar solicitud' : 'Envoyer ma demande'}
						</button>
					</div>
				</form>
			{/if}
		</div>
	</section>

	<Footer />
</main>
