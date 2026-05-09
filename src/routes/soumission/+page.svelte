<script lang="ts">
	import { supabase } from '$lib/supabase/client';
	import {
		FileText,
		Send,
		ArrowLeft,
		Mail,
		Phone,
		MapPin,
		Check,
		Copy,
		Shield,
		Clock,
		CheckCircle2
	} from 'lucide-svelte';

	type ProjetType =
		| 'Drain français'
		| 'Excavation générale'
		| 'Fondation'
		| 'Imperméabilisation'
		| 'Urgence'
		| 'Autre';

	let form = {
		client_nom: '',
		client_email: '',
		client_telephone: '',
		client_adresse: '',
		projet_adresse: '',
		projet_type: '' as ProjetType | '',
		projet_description: '',
		notes_client: ''
	};

	let sending = false;
	let errorMsg = '';
	let success = false;
	let createdToken = '';
	let createdLink = '';
	let copied = false;

	const projetTypes: ProjetType[] = [
		'Drain français',
		'Excavation générale',
		'Fondation',
		'Imperméabilisation',
		'Urgence',
		'Autre'
	];

	$: emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.client_email);
	$: phoneValid = form.client_telephone.replace(/\D/g, '').length >= 10;
	$: descValid = form.projet_description.trim().length >= 30;
	$: formValid =
		form.client_nom.trim().length > 1 &&
		emailValid &&
		phoneValid &&
		form.projet_adresse.trim().length > 3 &&
		form.projet_type !== '' &&
		descValid;

	async function submitForm() {
		if (!formValid || sending) return;
		sending = true;
		errorMsg = '';
		try {
			const payload = {
				client_nom: form.client_nom.trim(),
				client_email: form.client_email.trim().toLowerCase(),
				client_telephone: form.client_telephone.trim(),
				client_adresse: form.client_adresse.trim() || null,
				projet_adresse: form.projet_adresse.trim(),
				projet_type: form.projet_type || null,
				projet_description: form.projet_description.trim(),
				notes_client: form.notes_client.trim() || null,
				statut: 'nouvelle'
			};
			const { data, error } = await supabase
				.from('soumissions')
				.insert(payload)
				.select()
				.single();
			if (error) throw error;
			createdToken = data.client_token;
			createdLink = `${window.location.origin}/soumission/${createdToken}`;
			success = true;
		} catch (e: any) {
			console.error(e);
			errorMsg = e?.message || 'Une erreur est survenue. Veuillez réessayer.';
		} finally {
			sending = false;
		}
	}

	async function copyLink() {
		try {
			await navigator.clipboard.writeText(createdLink);
			copied = true;
			setTimeout(() => (copied = false), 2500);
		} catch (e) {
			console.warn(e);
		}
	}
</script>

<svelte:head>
	<title>Demande de soumission — Mini Excavations Érable</title>
	<meta
		name="description"
		content="Obtenez une soumission gratuite pour vos travaux d'excavation au Bas-Saint-Laurent. RBQ 5823-7736-01."
	/>
</svelte:head>

<div class="min-h-screen bg-zinc-950 text-white">
	<!-- Top bar -->
	<header class="border-b border-zinc-800 bg-zinc-950/95 backdrop-blur sticky top-0 z-30">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
			<a
				href="/"
				class="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-amber-400 transition"
			>
				<ArrowLeft class="h-4 w-4" /> Retour au site
			</a>
			<div class="hidden sm:flex items-center gap-2 text-xs text-zinc-500">
				<Shield class="h-3.5 w-3.5 text-amber-500" />
				RBQ 5823-7736-01
			</div>
		</div>
	</header>

	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
		<!-- Hero -->
		<div class="mb-10 lg:mb-14">
			<div
				class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4"
			>
				<FileText class="h-3.5 w-3.5" /> Demande de soumission
			</div>
			<h1 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
				Obtenez votre <span class="text-amber-500">soumission</span>
			</h1>
			<p class="mt-3 text-zinc-400 max-w-2xl">
				Remplissez le formulaire ci-dessous et notre équipe analysera votre projet. Nous vous
				enverrons une offre détaillée par courriel rapidement. Mini Excavations Érable —
				Saint-Hubert-de-Rivière-du-Loup.
			</p>
		</div>

		{#if success}
			<!-- Success screen -->
			<div class="max-w-3xl mx-auto">
				<div
					class="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 sm:p-12 text-center"
				>
					<div
						class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 mb-6"
					>
						<CheckCircle2 class="h-8 w-8 text-emerald-400" />
					</div>
					<h2 class="text-2xl sm:text-3xl font-bold mb-3">Demande reçue avec succès!</h2>
					<p class="text-zinc-400 mb-8 max-w-xl mx-auto">
						Merci. Notre équipe analyse votre projet et vous enverra une offre détaillée par
						courriel dans les meilleurs délais. Conservez le lien ci-dessous pour suivre votre
						soumission.
					</p>

					<div class="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6 text-left">
						<div class="text-xs uppercase tracking-wider text-zinc-500 mb-2">
							Votre lien personnel
						</div>
						<div class="flex items-center gap-2">
							<input
								type="text"
								readonly
								value={createdLink}
								class="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-amber-300 font-mono"
							/>
							<button
								type="button"
								on:click={copyLink}
								class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition"
							>
								{#if copied}
									<Check class="h-4 w-4" /> Copié
								{:else}
									<Copy class="h-4 w-4" /> Copier
								{/if}
							</button>
						</div>
					</div>

					<div class="flex flex-col sm:flex-row gap-3 justify-center">
						<a
							href={`/soumission/${createdToken}`}
							class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold transition"
						>
							Voir ma soumission
						</a>
						<a
							href="/"
							class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-zinc-700 hover:border-zinc-600 text-zinc-300 font-semibold transition"
						>
							Retour au site
						</a>
					</div>
				</div>
			</div>
		{:else}
			<div class="grid lg:grid-cols-3 gap-8">
				<!-- Form (left, 2 cols) -->
				<form
					on:submit|preventDefault={submitForm}
					class="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6"
				>
					<div>
						<h2 class="text-xl font-bold mb-1">Vos coordonnées</h2>
						<p class="text-sm text-zinc-500">Nous utilisons ces informations pour vous joindre.</p>
					</div>

					<div class="grid sm:grid-cols-2 gap-4">
						<div>
							<label for="nom" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
								Nom complet *
							</label>
							<input
								id="nom"
								type="text"
								bind:value={form.client_nom}
								placeholder="Jean Tremblay"
								required
								class="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-lg text-white placeholder-zinc-600 outline-none transition"
							/>
						</div>
						<div>
							<label for="tel" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
								Téléphone *
							</label>
							<div class="relative">
								<Phone class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
								<input
									id="tel"
									type="tel"
									bind:value={form.client_telephone}
									placeholder="(418) 555-1234"
									required
									class="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-lg text-white placeholder-zinc-600 outline-none transition"
								/>
							</div>
						</div>
					</div>

					<div>
						<label for="email" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
							Courriel *
						</label>
						<div class="relative">
							<Mail class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
							<input
								id="email"
								type="email"
								bind:value={form.client_email}
								placeholder="jean@exemple.com"
								required
								class="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-lg text-white placeholder-zinc-600 outline-none transition"
							/>
						</div>
					</div>

					<div>
						<label for="adr" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
							Adresse personnelle (optionnel)
						</label>
						<input
							id="adr"
							type="text"
							bind:value={form.client_adresse}
							placeholder="123 rue Principale, Ville"
							class="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-lg text-white placeholder-zinc-600 outline-none transition"
						/>
					</div>

					<div class="border-t border-zinc-800 pt-6">
						<h2 class="text-xl font-bold mb-1">Votre projet</h2>
						<p class="text-sm text-zinc-500">Décrivez les travaux à effectuer.</p>
					</div>

					<div>
						<label for="padr" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
							Adresse du projet *
						</label>
						<div class="relative">
							<MapPin class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
							<input
								id="padr"
								type="text"
								bind:value={form.projet_adresse}
								placeholder="456 chemin du Lac, Saint-Hubert-de-Rivière-du-Loup, QC"
								required
								class="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-lg text-white placeholder-zinc-600 outline-none transition"
							/>
						</div>
					</div>

					<div>
						<label for="ptype" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
							Type de projet *
						</label>
						<select
							id="ptype"
							bind:value={form.projet_type}
							required
							class="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-lg text-white outline-none transition"
						>
							<option value="" disabled>Sélectionnez un type…</option>
							{#each projetTypes as t}
								<option value={t}>{t}</option>
							{/each}
						</select>
					</div>

					<div>
						<label for="desc" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
							Description du projet *
						</label>
						<textarea
							id="desc"
							rows="5"
							bind:value={form.projet_description}
							placeholder="Décrivez les travaux: nature, surface, accès, contraintes, échéancier souhaité… (min. 30 caractères)"
							required
							class="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-lg text-white placeholder-zinc-600 outline-none transition resize-none"
						></textarea>
						<div class="text-right text-xs mt-1 {descValid ? 'text-emerald-400' : 'text-zinc-500'}">
							{form.projet_description.length} / 30 caractères
						</div>
					</div>

					<div>
						<label for="notes" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
							Détails additionnels (optionnel)
						</label>
						<textarea
							id="notes"
							rows="3"
							bind:value={form.notes_client}
							placeholder="Photos, documents, particularités du terrain…"
							class="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-lg text-white placeholder-zinc-600 outline-none transition resize-none"
						></textarea>
					</div>

					{#if errorMsg}
						<div class="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
							{errorMsg}
						</div>
					{/if}

					<button
						type="submit"
						disabled={!formValid || sending}
						class="w-full inline-flex items-center justify-center gap-3 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/20"
					>
						{#if sending}
							<svg class="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
							</svg>
							Envoi en cours…
						{:else}
							<Send class="h-5 w-5" />
							Envoyer ma demande
						{/if}
					</button>
					<p class="text-xs text-zinc-500 text-center">
						En soumettant ce formulaire, vous acceptez d'être contacté concernant votre demande.
					</p>
				</form>

				<!-- Help card (right) -->
				<aside class="lg:col-span-1 space-y-6">
					<div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sticky top-24">
						<div class="flex items-center gap-2 mb-4">
							<Clock class="h-5 w-5 text-amber-500" />
							<h3 class="font-bold">Comment ça fonctionne?</h3>
						</div>
						<ol class="space-y-4 text-sm">
							<li class="flex gap-3">
								<span
									class="flex-shrink-0 w-7 h-7 rounded-full bg-amber-500 text-black font-bold text-xs flex items-center justify-center"
								>
									1
								</span>
								<span class="text-zinc-300">Vous remplissez ce formulaire.</span>
							</li>
							<li class="flex gap-3">
								<span
									class="flex-shrink-0 w-7 h-7 rounded-full bg-amber-500 text-black font-bold text-xs flex items-center justify-center"
								>
									2
								</span>
								<span class="text-zinc-300">Notre équipe analyse votre projet.</span>
							</li>
							<li class="flex gap-3">
								<span
									class="flex-shrink-0 w-7 h-7 rounded-full bg-amber-500 text-black font-bold text-xs flex items-center justify-center"
								>
									3
								</span>
								<span class="text-zinc-300">
									Vous recevez une offre détaillée par courriel.
								</span>
							</li>
							<li class="flex gap-3">
								<span
									class="flex-shrink-0 w-7 h-7 rounded-full bg-amber-500 text-black font-bold text-xs flex items-center justify-center"
								>
									4
								</span>
								<span class="text-zinc-300">
									Vous pouvez accepter, contre-offrir, ou demander des modifications.
								</span>
							</li>
							<li class="flex gap-3">
								<span
									class="flex-shrink-0 w-7 h-7 rounded-full bg-amber-500 text-black font-bold text-xs flex items-center justify-center"
								>
									5
								</span>
								<span class="text-zinc-300">
									Une fois acceptée, signez électroniquement.
								</span>
							</li>
						</ol>
					</div>

					<div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
						<div class="flex items-center gap-2 mb-3">
							<Shield class="h-5 w-5 text-amber-500" />
							<h3 class="font-bold">Entrepreneur certifié</h3>
						</div>
						<p class="text-sm text-zinc-400 mb-2">
							<span class="text-zinc-200 font-semibold">RBQ 5823-7736-01</span> — Mini Excavations
							Érable Inc.
						</p>
						<p class="text-sm text-zinc-400">
							Saint-Hubert-de-Rivière-du-Loup, Bas-Saint-Laurent. Service rapide et professionnel.
						</p>
					</div>
				</aside>
			</div>
		{/if}
	</main>
</div>
