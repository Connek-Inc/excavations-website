<script lang="ts">
	import {
		FileText,
		Send,
		Mail,
		Phone,
		MapPin,
		CheckCircle2,
		Shield,
		Clock
	} from 'lucide-svelte';

	type ProjetType =
		| 'Drain français'
		| 'Excavation générale'
		| 'Fondation'
		| 'Imperméabilisation'
		| 'Urgence'
		| 'Autre';

	export let showHero: boolean = false;
	export let showSidebar: boolean = true;

	// FormSubmit.co — zero-config form-to-email service.
	// First submission asks the owner to confirm via a link in the first email.
	const ADMIN_EMAIL = 'miniexcavationerable@gmail.com';
	const FORM_ENDPOINT = `https://formsubmit.co/ajax/${ADMIN_EMAIL}`;

	type Step = 'data' | 'success';
	let step: Step = 'data';

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
	$: descValid = form.projet_description.trim().length >= 5;
	$: dataValid =
		form.client_nom.trim().length > 1 &&
		emailValid &&
		phoneValid &&
		form.projet_adresse.trim().length > 3 &&
		form.projet_type !== '' &&
		descValid;

	function buildMailtoFallback() {
		const subject = `Nouveau lead: ${form.client_nom} — ${form.projet_type}`;
		const body = [
			`Nom: ${form.client_nom}`,
			`Courriel: ${form.client_email}`,
			`Téléphone: ${form.client_telephone}`,
			`Adresse personnelle: ${form.client_adresse || '—'}`,
			'',
			`Adresse du projet: ${form.projet_adresse}`,
			`Type de projet: ${form.projet_type}`,
			'',
			'Description:',
			form.projet_description,
			'',
			`Notes: ${form.notes_client || '—'}`
		].join('\n');
		return `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
	}

	let mailtoFallback = '';

	async function submitForm() {
		if (!dataValid || sending) return;
		sending = true;
		errorMsg = '';
		mailtoFallback = buildMailtoFallback();

		try {
			const res = await fetch(FORM_ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify({
					_subject: `Nouveau lead: ${form.client_nom} — ${form.projet_type}`,
					_template: 'table',
					_captcha: 'false',
					Nom: form.client_nom,
					Courriel: form.client_email,
					Telephone: form.client_telephone,
					Adresse_personnelle: form.client_adresse || '—',
					Adresse_projet: form.projet_adresse,
					Type_projet: form.projet_type,
					Description: form.projet_description,
					Notes: form.notes_client || '—'
				})
			});
			const data = await res.json().catch(() => ({}));
			// FormSubmit returns success=true (or "true") on accepted submission.
			// On the very first submission it may also return success=true while
			// triggering an activation email to the admin — UX is fine either way.
			if (res.ok && (data.success === 'true' || data.success === true || data.success === undefined)) {
				step = 'success';
			} else {
				errorMsg =
					(data.message || "Le service de courriel a refusé la demande.") +
					" Utilisez le bouton ci-dessous pour envoyer directement.";
			}
		} catch (err) {
			errorMsg =
				"Connexion réseau impossible. Utilisez le bouton ci-dessous pour envoyer directement, ou appelez-nous.";
		} finally {
			sending = false;
		}
	}
</script>

<div id="contact" class="text-white">
	{#if showHero}
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
				Remplissez le formulaire ci-dessous et notre équipe analysera votre projet. Vous recevrez
				une offre détaillée par courriel rapidement.
			</p>
		</div>
	{/if}

	{#if step === 'success'}
		<div class="max-w-3xl mx-auto">
			<div class="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 sm:p-12 text-center">
				<div
					class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 mb-6"
				>
					<CheckCircle2 class="h-8 w-8 text-emerald-400" />
				</div>
				<h2 class="text-2xl sm:text-3xl font-bold mb-3">Demande reçue avec succès!</h2>
				<p class="text-zinc-400 mb-8 max-w-xl mx-auto">
					Notre équipe analyse votre projet. Nous vous enverrons une offre détaillée par courriel
					dans les meilleurs délais. Pour une réponse immédiate, appelez-nous au
					<a href="tel:+15148309973" class="text-[#febd17] font-semibold hover:underline">(514) 830-9973</a>.
				</p>

				<div class="flex flex-col sm:flex-row gap-3 justify-center">
					<a
						href="/"
						class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#febd17] hover:bg-[#e5aa10] text-black font-semibold transition-colors"
					>
						Retour à l'accueil
					</a>
					<a
						href="tel:+15148309973"
						class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-200 font-semibold transition-colors"
					>
						<Phone class="h-4 w-4" />
						(514) 830-9973
					</a>
				</div>
			</div>
		</div>
	{:else}
		<div class="grid {showSidebar ? 'lg:grid-cols-3' : 'lg:grid-cols-1'} gap-8">
			<form
				on:submit|preventDefault={submitForm}
				class="{showSidebar ? 'lg:col-span-2' : ''} bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6"
			>
				<div>
					<h2 class="text-xl font-bold mb-1">Vos coordonnées</h2>
					<p class="text-sm text-zinc-500">Nous utilisons ces informations pour vous joindre.</p>
				</div>

				<div class="grid sm:grid-cols-2 gap-4">
					<div>
						<label for="nom" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Nom complet *</label>
						<input
							id="nom"
							type="text"
							bind:value={form.client_nom}
							placeholder="Jean Tremblay"
							required
							class="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-[#febd17] rounded-lg text-white placeholder-zinc-600 outline-none transition-colors"
						/>
					</div>
					<div>
						<label for="tel" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Téléphone *</label>
						<div class="relative">
							<Phone class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
							<input
								id="tel"
								type="tel"
								bind:value={form.client_telephone}
								placeholder="(418) 555-1234"
								required
								class="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-[#febd17] rounded-lg text-white placeholder-zinc-600 outline-none transition-colors"
							/>
						</div>
					</div>
				</div>

				<div>
					<label for="email" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Courriel *</label>
					<div class="relative">
						<Mail class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
						<input
							id="email"
							type="email"
							bind:value={form.client_email}
							placeholder="jean@exemple.com"
							required
							class="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-[#febd17] rounded-lg text-white placeholder-zinc-600 outline-none transition-colors"
						/>
					</div>
				</div>

				<div>
					<label for="adr" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Adresse personnelle (optionnel)</label>
					<input
						id="adr"
						type="text"
						bind:value={form.client_adresse}
						placeholder="123 rue Principale, Ville"
						class="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-[#febd17] rounded-lg text-white placeholder-zinc-600 outline-none transition-colors"
					/>
				</div>

				<div class="border-t border-zinc-800 pt-6">
					<h2 class="text-xl font-bold mb-1">Votre projet</h2>
					<p class="text-sm text-zinc-500">Décrivez les travaux à effectuer.</p>
				</div>

				<div>
					<label for="padr" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Adresse du projet *</label>
					<div class="relative">
						<MapPin class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
						<input
							id="padr"
							type="text"
							bind:value={form.projet_adresse}
							placeholder="456 chemin du Lac, Saint-Hubert-de-Rivière-du-Loup, QC"
							required
							class="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-[#febd17] rounded-lg text-white placeholder-zinc-600 outline-none transition-colors"
						/>
					</div>
				</div>

				<div>
					<label for="ptype" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Type de projet *</label>
					<select
						id="ptype"
						bind:value={form.projet_type}
						required
						class="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-[#febd17] rounded-lg text-white outline-none transition-colors"
					>
						<option value="" disabled>Sélectionnez un type…</option>
						{#each projetTypes as t}
							<option value={t}>{t}</option>
						{/each}
					</select>
				</div>

				<div>
					<label for="desc" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Description du projet *</label>
					<textarea
						id="desc"
						rows="5"
						bind:value={form.projet_description}
						placeholder="Décrivez les travaux: nature, surface, accès, contraintes, échéancier souhaité…"
						required
						class="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-[#febd17] rounded-lg text-white placeholder-zinc-600 outline-none transition-colors resize-none"
					></textarea>
					<div class="text-right text-xs mt-1 {descValid ? 'text-emerald-400' : 'text-zinc-500'}">
						{form.projet_description.length} caractères
					</div>
				</div>

				<div>
					<label for="notes" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Détails additionnels (optionnel)</label>
					<textarea
						id="notes"
						rows="3"
						bind:value={form.notes_client}
						placeholder="Particularités du terrain, échéancier souhaité…"
						class="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-[#febd17] rounded-lg text-white placeholder-zinc-600 outline-none transition-colors resize-none"
					></textarea>
				</div>

				{#if errorMsg}
					<div class="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm space-y-3">
						<p>{errorMsg}</p>
						{#if mailtoFallback}
							<a
								href={mailtoFallback}
								class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#febd17] hover:bg-[#e5aa10] text-black font-semibold text-sm transition-colors"
							>
								<Mail class="h-4 w-4" /> Envoyer par courriel maintenant
							</a>
							<p class="text-zinc-400 text-xs">
								Ou appelez-nous au <a href="tel:+15148309973" class="text-[#febd17] underline">(514) 830-9973</a>.
							</p>
						{/if}
					</div>
				{/if}

				<button
					type="submit"
					disabled={!dataValid || sending}
					class="w-full inline-flex items-center justify-center gap-3 py-4 rounded-lg bg-[#febd17] hover:bg-[#e5aa10] text-black font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{#if sending}
						<svg class="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
						</svg>
						Envoi…
					{:else}
						<Send class="h-5 w-5" />
						Envoyer ma demande
					{/if}
				</button>

				<p class="text-xs text-zinc-500 text-center">
					En soumettant ce formulaire, vous acceptez d'être contacté concernant votre demande.
				</p>
			</form>

			{#if showSidebar}
				<aside class="lg:col-span-1 space-y-6">
					<div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sticky top-24">
						<div class="flex items-center gap-2 mb-4">
							<Clock class="h-5 w-5 text-amber-500" />
							<h3 class="font-bold">Comment ça fonctionne?</h3>
						</div>
						<ol class="space-y-4 text-sm">
							<li class="flex gap-3">
								<span
									class="flex-shrink-0 w-7 h-7 rounded-full bg-[#febd17] text-black font-bold text-xs flex items-center justify-center"
								>
									1
								</span>
								<span class="text-zinc-300">Vous remplissez ce formulaire.</span>
							</li>
							<li class="flex gap-3">
								<span
									class="flex-shrink-0 w-7 h-7 rounded-full bg-[#febd17] text-black font-bold text-xs flex items-center justify-center"
								>
									2
								</span>
								<span class="text-zinc-300">Notre équipe analyse votre projet.</span>
							</li>
							<li class="flex gap-3">
								<span
									class="flex-shrink-0 w-7 h-7 rounded-full bg-[#febd17] text-black font-bold text-xs flex items-center justify-center"
								>
									3
								</span>
								<span class="text-zinc-300">Vous recevez une offre détaillée par courriel.</span>
							</li>
							<li class="flex gap-3">
								<span
									class="flex-shrink-0 w-7 h-7 rounded-full bg-[#febd17] text-black font-bold text-xs flex items-center justify-center"
								>
									4
								</span>
								<span class="text-zinc-300"
									>Vous pouvez accepter, contre-offrir, ou demander des modifications.</span
								>
							</li>
							<li class="flex gap-3">
								<span
									class="flex-shrink-0 w-7 h-7 rounded-full bg-[#febd17] text-black font-bold text-xs flex items-center justify-center"
								>
									5
								</span>
								<span class="text-zinc-300">Une fois acceptée, signez électroniquement.</span>
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
			{/if}
		</div>
	{/if}
</div>
