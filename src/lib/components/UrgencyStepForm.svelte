<script lang="ts">
	import { language } from '$lib/store/store';
	import {
		Droplets,
		AlertOctagon,
		Zap,
		Home as HomeIcon,
		HelpCircle,
		Siren,
		Clock,
		CalendarDays,
		CheckCircle2,
		User as UserIcon,
		Mail,
		Phone,
		MessageSquare,
		ArrowRight,
		ArrowLeft,
		Loader2,
		Send,
		AlertTriangle
	} from 'lucide-svelte';

	export const hideTitle = false;

	let step = 1;
	const totalSteps = 3;

	let formData = {
		problemType: '',
		urgencyLevel: '',
		name: '',
		phone: '',
		email: '',
		messageText: ''
	};

	let sending = false;
	let errorMessage = '';
	let mailtoFallback = '';

	const problems = [
		{
			id: 'infiltration',
			Icon: Droplets,
			labelFr: "Infiltration d'eau",
			labelEn: 'Water infiltration',
			labelEs: 'Infiltración de agua',
			descFr: 'Eau au sous-sol',
			descEn: 'Water in basement',
			descEs: 'Agua en el sótano'
		},
		{
			id: 'refoulement',
			Icon: AlertOctagon,
			labelFr: "Refoulement d'égout",
			labelEn: 'Sewer backup',
			labelEs: 'Reflujo de alcantarillado',
			descFr: "Égout qui déborde",
			descEn: 'Overflowing sewer',
			descEs: 'Alcantarilla desbordada'
		},
		{
			id: 'fissure',
			Icon: Zap,
			labelFr: 'Fissure de fondation',
			labelEn: 'Foundation crack',
			labelEs: 'Grieta de cimientos',
			descFr: 'Mur ou plancher fendu',
			descEn: 'Wall or floor cracked',
			descEs: 'Pared o piso agrietado'
		},
		{
			id: 'drain',
			Icon: HomeIcon,
			labelFr: 'Drain français',
			labelEn: 'French drain',
			labelEs: 'Drenaje francés',
			descFr: 'Drain bouché ou défaillant',
			descEn: 'Clogged or failing drain',
			descEs: 'Drenaje obstruido o fallando'
		},
		{
			id: 'autre',
			Icon: HelpCircle,
			labelFr: 'Autre',
			labelEn: 'Other',
			labelEs: 'Otro',
			descFr: 'Décrivez-le à létape 3',
			descEn: 'Describe at step 3',
			descEs: 'Describir en el paso 3'
		}
	];

	const urgencies = [
		{
			id: 'immediat',
			Icon: Siren,
			tone: 'red',
			labelFr: 'Immédiate',
			labelEn: 'Immediate',
			labelEs: 'Inmediata',
			descFr: "Moins de 2 heures",
			descEn: 'Under 2 hours',
			descEs: 'Menos de 2 horas'
		},
		{
			id: 'aujourdhui',
			Icon: Clock,
			tone: 'amber',
			labelFr: "Aujourd'hui",
			labelEn: 'Today',
			labelEs: 'Hoy',
			descFr: 'Entre 2 h et 12 h',
			descEn: 'Between 2h and 12h',
			descEs: 'Entre 2 y 12 horas'
		},
		{
			id: 'semaine',
			Icon: CalendarDays,
			tone: 'zinc',
			labelFr: 'Cette semaine',
			labelEn: 'This week',
			labelEs: 'Esta semana',
			descFr: 'Planification flexible',
			descEn: 'Flexible scheduling',
			descEs: 'Planificación flexible'
		}
	];

	$: isStep1Valid = formData.problemType !== '';
	$: isStep2Valid = formData.urgencyLevel !== '';
	$: isStep3Valid =
		formData.name.trim() !== '' && formData.phone.trim() !== '' && formData.email.trim() !== '';
	$: emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
	$: phoneValid = formData.phone.replace(/\D/g, '').length >= 10;

	function nextStep() {
		if (step === 1 && !isStep1Valid) return;
		if (step === 2 && !isStep2Valid) return;
		if (step < totalSteps) step++;
	}

	function prevStep() {
		if (step > 1) step--;
	}

	function selectProblem(id: string) {
		formData.problemType = id;
		setTimeout(() => {
			if (step === 1) nextStep();
		}, 250);
	}

	function selectUrgency(id: string) {
		formData.urgencyLevel = id;
		setTimeout(() => {
			if (step === 2) nextStep();
		}, 250);
	}

	const ADMIN_EMAIL = 'miniexcavationerable@gmail.com';
	const FORM_ENDPOINT = `https://formsubmit.co/ajax/${ADMIN_EMAIL}`;

	function buildMailtoFallback() {
		const probLabel = problems.find((p) => p.id === formData.problemType)?.labelFr || formData.problemType;
		const urgLabel = urgencies.find((u) => u.id === formData.urgencyLevel)?.labelFr || formData.urgencyLevel;
		const subject = `URGENCE — ${formData.name} (${probLabel})`;
		const body = [
			`URGENCE — ${urgLabel}`,
			'',
			`Nom: ${formData.name}`,
			`Courriel: ${formData.email}`,
			`Téléphone: ${formData.phone}`,
			'',
			`Type de problème: ${probLabel}`,
			`Niveau d'urgence: ${urgLabel}`,
			'',
			`Détails: ${formData.messageText || '—'}`
		].join('\n');
		return `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
	}

	function finishSuccess() {
		step = 4;
		import('$lib/analytics/gtag').then(({ trackContactFormSubmit }) => {
			trackContactFormSubmit({
				value: 1.0,
				currency: 'CAD',
				serviceType: formData.problemType,
				lang: $language
			});
		});
	}

	async function submitForm() {
		if (!isStep3Valid || sending) return;
		sending = true;
		errorMessage = '';
		mailtoFallback = buildMailtoFallback();

		const probLabel = problems.find((p) => p.id === formData.problemType)?.labelFr || formData.problemType;
		const urgLabel = urgencies.find((u) => u.id === formData.urgencyLevel)?.labelFr || formData.urgencyLevel;

		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 12000);

		try {
			const response = await fetch(FORM_ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify({
					_subject: `URGENCE — ${formData.name} (${probLabel})`,
					_template: 'table',
					_captcha: 'false',
					Type: 'URGENCE',
					Nom: formData.name,
					Courriel: formData.email,
					Telephone: formData.phone,
					Type_probleme: probLabel,
					Niveau_urgence: urgLabel,
					Details: formData.messageText || '—'
				}),
				signal: controller.signal
			});
			clearTimeout(timeoutId);

			const payload = await response.json().catch(() => ({}));

			if (
				response.ok &&
				(payload.success === true || payload.success === 'true' || payload.success === undefined)
			) {
				finishSuccess();
			} else {
				window.location.href = mailtoFallback;
				setTimeout(() => finishSuccess(), 400);
			}
		} catch {
			window.location.href = mailtoFallback;
			setTimeout(() => finishSuccess(), 400);
		} finally {
			sending = false;
		}
	}

	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';
	$: t = T[lang] || T.fr;

	const T = {
		fr: {
			stepLabel: 'Étape',
			of: 'sur',
			steps: ['Problème', 'Urgence', 'Coordonnées'],
			step1Title: 'Quel est le problème?',
			step1Desc: 'Choisissez la situation qui vous concerne.',
			step2Title: "Quelle est l'urgence?",
			step2Desc: 'On adapte notre temps de réponse en conséquence.',
			step3Title: 'Vos coordonnées',
			step3Desc: 'On vous rappelle pour confirmer la visite.',
			next: 'Continuer',
			back: 'Retour',
			send: "Envoyer ma demande",
			sending: 'Envoi en cours…',
			name: 'Nom complet',
			phone: 'Téléphone',
			email: 'Courriel',
			extra: 'Détails additionnels (optionnel)',
			extraPh: 'Décrivez la situation, photos, contraintes…',
			successTitle: 'Demande reçue !',
			successDesc: "Notre équipe vous rappelle rapidement pour planifier l'inspection.",
			successHint: 'Pour une urgence absolue, appelez',
			fallbackTitle: 'Connexion lente détectée',
			fallbackDesc: 'On ouvre votre application courriel par sécurité.',
			fallbackBtn: 'Envoyer par courriel',
			fallbackCall: 'Appeler (514) 830-9973'
		},
		en: {
			stepLabel: 'Step',
			of: 'of',
			steps: ['Problem', 'Urgency', 'Contact'],
			step1Title: 'What is the problem?',
			step1Desc: 'Pick the situation that applies to you.',
			step2Title: 'How urgent is it?',
			step2Desc: 'We adjust our response time accordingly.',
			step3Title: 'Your contact info',
			step3Desc: "We'll call you to confirm the visit.",
			next: 'Continue',
			back: 'Back',
			send: 'Send my request',
			sending: 'Sending…',
			name: 'Full name',
			phone: 'Phone',
			email: 'Email',
			extra: 'Extra details (optional)',
			extraPh: 'Describe the situation, photos, constraints…',
			successTitle: 'Request received!',
			successDesc: "Our team will call you back shortly to schedule the inspection.",
			successHint: 'For an absolute emergency, call',
			fallbackTitle: 'Slow connection detected',
			fallbackDesc: 'Opening your email client as a safety net.',
			fallbackBtn: 'Send by email',
			fallbackCall: 'Call (514) 830-9973'
		},
		es: {
			stepLabel: 'Paso',
			of: 'de',
			steps: ['Problema', 'Urgencia', 'Contacto'],
			step1Title: '¿Cuál es el problema?',
			step1Desc: 'Elija la situación que le concierne.',
			step2Title: '¿Qué tan urgente es?',
			step2Desc: 'Adaptamos nuestro tiempo de respuesta.',
			step3Title: 'Sus datos de contacto',
			step3Desc: 'Le llamamos para confirmar la visita.',
			next: 'Continuar',
			back: 'Atrás',
			send: 'Enviar mi solicitud',
			sending: 'Enviando…',
			name: 'Nombre completo',
			phone: 'Teléfono',
			email: 'Correo',
			extra: 'Detalles adicionales (opcional)',
			extraPh: 'Describa la situación, fotos, restricciones…',
			successTitle: '¡Solicitud recibida!',
			successDesc: 'Nuestro equipo le llamará pronto para programar la inspección.',
			successHint: 'Para una urgencia absoluta, llame al',
			fallbackTitle: 'Conexión lenta detectada',
			fallbackDesc: 'Abrimos su cliente de correo como respaldo.',
			fallbackBtn: 'Enviar por correo',
			fallbackCall: 'Llamar (514) 830-9973'
		}
	};
</script>

<div
	class="w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 p-5 sm:p-8 md:p-10 relative"
>
	{#if step <= totalSteps}
		<!-- Step indicator: dots + connector lines -->
		<div class="mb-8">
			<div class="flex items-center gap-2 mb-3">
				{#each [1, 2, 3] as n, i}
					<div class="flex items-center gap-2 flex-1 last:flex-none">
						<div class="flex flex-col items-center gap-1.5">
							<div
								class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 {step >
								n
									? 'bg-emerald-500 text-white'
									: step === n
										? 'bg-[#febd17] text-black ring-4 ring-[#febd17]/20'
										: 'bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500'}"
							>
								{#if step > n}
									<CheckCircle2 class="w-4 h-4" />
								{:else}
									{n}
								{/if}
							</div>
						</div>
						{#if i < 2}
							<div
								class="flex-1 h-0.5 rounded-full transition-all duration-500 {step > n
									? 'bg-emerald-500'
									: 'bg-gray-100 dark:bg-zinc-800'}"
							></div>
						{/if}
					</div>
				{/each}
			</div>
			<div class="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider">
				{#each t.steps as label, i}
					<span
						class="transition-colors duration-300 {step === i + 1
							? 'text-gray-900 dark:text-white'
							: step > i + 1
								? 'text-emerald-600 dark:text-emerald-400'
								: 'text-gray-400 dark:text-zinc-500'}"
					>
						{label}
					</span>
				{/each}
			</div>
		</div>
	{/if}

	{#if step === 1}
		<div class="space-y-5 animate-in fade-in slide-in-from-right-2 duration-300">
			<div>
				<h3 class="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-1">
					{t.step1Title}
				</h3>
				<p class="text-sm text-gray-500 dark:text-zinc-400">{t.step1Desc}</p>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
				{#each problems as prob}
					{@const selected = formData.problemType === prob.id}
					<button
						type="button"
						on:click={() => selectProblem(prob.id)}
						class="group text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3 {selected
							? 'border-[#febd17] bg-[#febd17]/10 ring-2 ring-[#febd17]/30'
							: 'border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-[#febd17]/60 hover:bg-[#febd17]/5 hover:-translate-y-0.5 hover:shadow-md'}"
					>
						<div
							class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors {selected
								? 'bg-[#febd17] text-black'
								: 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 group-hover:bg-[#febd17]/20 group-hover:text-[#c9920f]'}"
						>
							<svelte:component this={prob.Icon} class="w-5 h-5" />
						</div>
						<div class="flex-1 min-w-0">
							<div class="font-bold text-sm text-gray-900 dark:text-white">
								{lang === 'en' ? prob.labelEn : lang === 'es' ? prob.labelEs : prob.labelFr}
							</div>
							<div class="text-xs text-gray-500 dark:text-zinc-500 mt-0.5">
								{lang === 'en' ? prob.descEn : lang === 'es' ? prob.descEs : prob.descFr}
							</div>
						</div>
					</button>
				{/each}
			</div>

			<button
				type="button"
				disabled={!isStep1Valid}
				on:click={nextStep}
				class="w-full mt-2 py-3.5 rounded-xl font-bold tracking-wide transition-all flex items-center justify-center gap-2 {isStep1Valid
					? 'bg-[#febd17] hover:bg-[#e5aa10] text-black shadow-md'
					: 'bg-gray-100 dark:bg-zinc-800 text-gray-400 cursor-not-allowed'}"
			>
				{t.next}
				<ArrowRight class="w-4 h-4" />
			</button>
		</div>
	{/if}

	{#if step === 2}
		<div class="space-y-5 animate-in fade-in slide-in-from-right-2 duration-300">
			<div>
				<h3 class="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-1">
					{t.step2Title}
				</h3>
				<p class="text-sm text-gray-500 dark:text-zinc-400">{t.step2Desc}</p>
			</div>

			<div class="flex flex-col gap-3">
				{#each urgencies as urg}
					{@const selected = formData.urgencyLevel === urg.id}
					{@const toneRing =
						urg.tone === 'red'
							? 'ring-red-500/30 border-red-500'
							: urg.tone === 'amber'
								? 'ring-amber-500/30 border-amber-500'
								: 'ring-zinc-400/30 border-zinc-400'}
					{@const toneBg =
						urg.tone === 'red'
							? 'bg-red-500 text-white'
							: urg.tone === 'amber'
								? 'bg-[#febd17] text-black'
								: 'bg-gray-700 text-white dark:bg-zinc-700'}
					<button
						type="button"
						on:click={() => selectUrgency(urg.id)}
						class="text-left p-4 rounded-2xl border flex items-center gap-4 transition-all duration-200 {selected
							? `${toneRing} bg-white dark:bg-zinc-900 ring-2`
							: 'border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-gray-300 dark:hover:border-zinc-700 hover:-translate-y-0.5 hover:shadow-md'}"
					>
						<div
							class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 {selected
								? toneBg
								: 'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400'}"
						>
							<svelte:component this={urg.Icon} class="w-5 h-5" />
						</div>
						<div class="flex-1 min-w-0">
							<div class="font-bold text-base text-gray-900 dark:text-white">
								{lang === 'en' ? urg.labelEn : lang === 'es' ? urg.labelEs : urg.labelFr}
							</div>
							<div class="text-xs text-gray-500 dark:text-zinc-500 mt-0.5">
								{lang === 'en' ? urg.descEn : lang === 'es' ? urg.descEs : urg.descFr}
							</div>
						</div>
						{#if selected}
							<CheckCircle2 class="w-5 h-5 text-emerald-500 flex-shrink-0" />
						{/if}
					</button>
				{/each}
			</div>

			<div class="flex gap-2 mt-2">
				<button
					type="button"
					on:click={prevStep}
					class="px-5 py-3.5 rounded-xl font-semibold text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2"
				>
					<ArrowLeft class="w-4 h-4" />
					{t.back}
				</button>
				<button
					type="button"
					disabled={!isStep2Valid}
					on:click={nextStep}
					class="flex-1 py-3.5 rounded-xl font-bold tracking-wide transition-all flex items-center justify-center gap-2 {isStep2Valid
						? 'bg-[#febd17] hover:bg-[#e5aa10] text-black shadow-md'
						: 'bg-gray-100 dark:bg-zinc-800 text-gray-400 cursor-not-allowed'}"
				>
					{t.next}
					<ArrowRight class="w-4 h-4" />
				</button>
			</div>
		</div>
	{/if}

	{#if step === 3}
		<div class="space-y-5 animate-in fade-in slide-in-from-right-2 duration-300">
			<div>
				<h3 class="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-1">
					{t.step3Title}
				</h3>
				<p class="text-sm text-gray-500 dark:text-zinc-400">{t.step3Desc}</p>
			</div>

			<div class="space-y-3">
				<div class="relative">
					<UserIcon class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
					<input
						type="text"
						bind:value={formData.name}
						placeholder={t.name}
						autocomplete="name"
						class="w-full pl-10 pr-4 py-3.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-800 focus:border-[#febd17] focus:bg-white dark:focus:bg-zinc-900 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 outline-none transition-all"
					/>
				</div>
				<div class="grid sm:grid-cols-2 gap-3">
					<div class="relative">
						<Phone class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
						<input
							type="tel"
							bind:value={formData.phone}
							placeholder={t.phone}
							autocomplete="tel"
							class="w-full pl-10 pr-4 py-3.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-800 focus:border-[#febd17] focus:bg-white dark:focus:bg-zinc-900 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 outline-none transition-all {formData.phone &&
							!phoneValid
								? 'border-red-300 dark:border-red-500/40'
								: ''}"
						/>
					</div>
					<div class="relative">
						<Mail class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
						<input
							type="email"
							bind:value={formData.email}
							placeholder={t.email}
							autocomplete="email"
							class="w-full pl-10 pr-4 py-3.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-800 focus:border-[#febd17] focus:bg-white dark:focus:bg-zinc-900 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 outline-none transition-all {formData.email &&
							!emailValid
								? 'border-red-300 dark:border-red-500/40'
								: ''}"
						/>
					</div>
				</div>
				<div class="relative">
					<MessageSquare class="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
					<textarea
						bind:value={formData.messageText}
						placeholder={t.extraPh}
						rows="2"
						class="w-full pl-10 pr-4 py-3.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-800 focus:border-[#febd17] focus:bg-white dark:focus:bg-zinc-900 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 outline-none transition-all resize-none"
					></textarea>
				</div>
			</div>

			{#if errorMessage}
				<div
					class="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-300 text-sm space-y-3"
				>
					<div class="flex items-start gap-2">
						<AlertTriangle class="w-4 h-4 mt-0.5 flex-shrink-0" />
						<div>
							<p class="font-bold">{t.fallbackTitle}</p>
							<p class="text-xs mt-0.5">{t.fallbackDesc}</p>
						</div>
					</div>
					<div class="flex flex-col sm:flex-row gap-2">
						<a
							href={mailtoFallback}
							class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#febd17] hover:bg-[#e5aa10] text-black font-semibold text-sm transition-colors"
						>
							<Mail class="w-4 h-4" />
							{t.fallbackBtn}
						</a>
						<a
							href="tel:+15148309973"
							class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-colors"
						>
							<Phone class="w-4 h-4" />
							{t.fallbackCall}
						</a>
					</div>
				</div>
			{/if}

			<div class="flex gap-2 mt-2">
				<button
					type="button"
					on:click={prevStep}
					disabled={sending}
					class="px-5 py-3.5 rounded-xl font-semibold text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2 disabled:opacity-50"
				>
					<ArrowLeft class="w-4 h-4" />
					{t.back}
				</button>
				<button
					type="button"
					disabled={!isStep3Valid || sending}
					on:click={submitForm}
					class="flex-1 py-3.5 rounded-xl font-bold tracking-wide transition-all flex items-center justify-center gap-2 {isStep3Valid && !sending
						? 'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-500/30'
						: 'bg-gray-100 dark:bg-zinc-800 text-gray-400 cursor-not-allowed'}"
				>
					{#if sending}
						<Loader2 class="w-4 h-4 animate-spin" />
						{t.sending}
					{:else}
						<Send class="w-4 h-4" />
						{t.send}
					{/if}
				</button>
			</div>
		</div>
	{/if}

	{#if step === 4}
		<div class="text-center py-8 animate-in zoom-in-95 duration-500">
			<div class="w-20 h-20 mx-auto mb-5 rounded-full bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center">
				<CheckCircle2 class="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
			</div>
			<h3 class="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-3">
				{t.successTitle}
			</h3>
			<p class="text-gray-600 dark:text-zinc-400 max-w-sm mx-auto mb-6">{t.successDesc}</p>
			<div
				class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-300 text-sm font-semibold"
			>
				<Phone class="w-4 h-4" />
				<span>{t.successHint} (514) 830-9973</span>
			</div>
		</div>
	{/if}
</div>
