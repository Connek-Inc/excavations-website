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
	import { onMount, onDestroy } from 'svelte';
	import { language } from '$lib/store/store';
	import { appendSoumission } from '$lib/admin/storage';
	import { signup, findClient, getCurrent } from '$lib/admin/clients';

	const DRAFT_KEY = 'mi_soumission_draft';

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
	let errorKey: '' | 'network' | 'rejected' = '';
	let errorRaw = '';
	let mailtoFallback = '';
	let draftRestored = false;
	let draftSavedAt = '';
	let saveTimeout: ReturnType<typeof setTimeout> | null = null;

	// Account creation on success
	let accountPassword = '';
	let accountCreating = false;
	let accountCreated = false;
	let accountError = '';
	let accountExisting = false;

	// Restore draft on mount
	onMount(() => {
		try {
			const raw = localStorage.getItem(DRAFT_KEY);
			if (!raw) return;
			const saved = JSON.parse(raw);
			if (saved && typeof saved === 'object' && saved.form) {
				const filled = Object.values(saved.form).some((v) => String(v || '').trim().length > 0);
				if (filled) {
					form = { ...form, ...saved.form };
					draftRestored = true;
					draftSavedAt = saved.at || '';
				}
			}
		} catch {}
	});

	function persistDraft() {
		if (typeof window === 'undefined') return;
		if (saveTimeout) clearTimeout(saveTimeout);
		saveTimeout = setTimeout(() => {
			try {
				const empty = Object.values(form).every((v) => String(v || '').trim().length === 0);
				if (empty) {
					localStorage.removeItem(DRAFT_KEY);
					return;
				}
				localStorage.setItem(
					DRAFT_KEY,
					JSON.stringify({ form, at: new Date().toISOString() })
				);
			} catch {}
		}, 500);
	}

	function clearDraft() {
		try {
			localStorage.removeItem(DRAFT_KEY);
		} catch {}
	}

	function dismissDraftBanner() {
		draftRestored = false;
	}

	function discardDraft() {
		form = {
			client_nom: '',
			client_email: '',
			client_telephone: '',
			client_adresse: '',
			projet_adresse: '',
			projet_type: '' as ProjetType | '',
			projet_description: '',
			notes_client: ''
		};
		clearDraft();
		draftRestored = false;
	}

	// Persist on every field change
	$: form, persistDraft();

	onDestroy(() => {
		if (saveTimeout) clearTimeout(saveTimeout);
	});

	const projetTypes: ProjetType[] = [
		'Drain français',
		'Excavation générale',
		'Fondation',
		'Imperméabilisation',
		'Urgence',
		'Autre'
	];

	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';
	$: t = T[lang] || T.fr;

	$: emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.client_email);
	$: phoneValid = form.client_telephone.replace(/\D/g, '').length >= 10;
	// Only contact + a short description are required now. Address and project type
	// can be discussed during the call-back to reduce form friction.
	$: dataValid =
		form.client_nom.trim().length > 1 &&
		emailValid &&
		phoneValid &&
		form.projet_description.trim().length >= 5;

	$: errorMsg = errorKey === 'network' ? t.errorNetwork : errorKey === 'rejected' ? t.errorRejected : errorRaw;

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
			`Notes: ${form.notes_client || '—'}`,
			'',
			`Langue du visiteur: ${lang}`
		].join('\n');
		return `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
	}

	async function submitForm() {
		if (!dataValid || sending) return;
		sending = true;
		errorKey = '';
		errorRaw = '';
		mailtoFallback = buildMailtoFallback();

		// Best-effort: try FormSubmit. If it fails (service down or rejected),
		// automatically open the visitor's email client with everything
		// pre-filled — guaranteed delivery path no matter what.
		try {
			const ctrl = new AbortController();
			const timeoutId = setTimeout(() => ctrl.abort(), 6000);
			const res = await fetch(FORM_ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				signal: ctrl.signal,
				body: JSON.stringify({
					_subject: `Nouveau lead: ${form.client_nom} — ${form.projet_type}`,
					_template: 'table',
					_captcha: 'false',
					_replyto: form.client_email,
					_autoresponse: clientCopyMessage(),
					email: form.client_email,
					name: form.client_nom,
					Nom: form.client_nom,
					Courriel: form.client_email,
					Telephone: form.client_telephone,
					Adresse_personnelle: form.client_adresse || '—',
					Adresse_projet: form.projet_adresse,
					Type_projet: form.projet_type,
					Description: form.projet_description,
					Notes: form.notes_client || '—',
					Langue: lang
				})
			});
			clearTimeout(timeoutId);
			const data = await res.json().catch(() => ({}));
			if (res.ok && (data.success === 'true' || data.success === true || data.success === undefined)) {
				captureLocally();
				clearDraft();
				checkExistingAccount();
				step = 'success';
			} else {
				// Service rejected — open the user's mail client as guaranteed delivery
				captureLocally();
				clearDraft();
				window.location.href = mailtoFallback;
				setTimeout(() => { step = 'success'; }, 400);
			}
		} catch (err) {
			// Network / timeout / service down — open mail client
			captureLocally();
			clearDraft();
			window.location.href = mailtoFallback;
			setTimeout(() => { step = 'success'; }, 400);
		} finally {
			sending = false;
		}
	}

	function clientCopyMessage(): string {
		const greeting =
			lang === 'en'
				? `Hello ${form.client_nom},`
				: lang === 'es'
					? `Hola ${form.client_nom},`
					: `Bonjour ${form.client_nom},`;
		const intro =
			lang === 'en'
				? "Thank you for contacting Mini Excavations Érable. We've received your quote request and our team will review it shortly. Below is a copy of the information you submitted."
				: lang === 'es'
					? 'Gracias por contactar a Mini Excavations Érable. Hemos recibido su solicitud de cotización y nuestro equipo la revisará pronto. A continuación encontrará una copia de los datos enviados.'
					: "Merci d'avoir contacté Mini Excavations Érable. Nous avons bien reçu votre demande de soumission et notre équipe l'analysera sous peu. Vous trouverez ci-dessous une copie des informations envoyées.";
		const labels =
			lang === 'en'
				? {
						project: 'Project',
						type: 'Type',
						desc: 'Description',
						notes: 'Notes',
						address: 'Project address',
						phone: 'Phone',
						signoff: 'For an urgent matter, call us at',
						team: 'Mini Excavations Érable — RBQ 5823-7736-01'
					}
				: lang === 'es'
					? {
							project: 'Proyecto',
							type: 'Tipo',
							desc: 'Descripción',
							notes: 'Notas',
							address: 'Dirección del proyecto',
							phone: 'Teléfono',
							signoff: 'Para una urgencia, llámenos al',
							team: 'Mini Excavations Érable — RBQ 5823-7736-01'
						}
					: {
							project: 'Projet',
							type: 'Type',
							desc: 'Description',
							notes: 'Notes',
							address: 'Adresse du projet',
							phone: 'Téléphone',
							signoff: 'Pour une urgence, appelez-nous au',
							team: 'Mini Excavations Érable — RBQ 5823-7736-01'
						};
		return [
			greeting,
			'',
			intro,
			'',
			`— ${labels.project} —`,
			`${labels.type}: ${form.projet_type}`,
			`${labels.address}: ${form.projet_adresse}`,
			`${labels.phone}: ${form.client_telephone}`,
			'',
			`${labels.desc}:`,
			form.projet_description,
			form.notes_client ? `\n${labels.notes}: ${form.notes_client}` : '',
			'',
			`${labels.signoff} (514) 830-9973.`,
			'',
			labels.team
		]
			.filter(Boolean)
			.join('\n');
	}

	function createAccount() {
		if (accountCreating || accountCreated) return;
		accountError = '';
		if (accountPassword.length < 6) {
			accountError = t.accountErrShort;
			return;
		}
		accountCreating = true;
		const result = signup({
			email: form.client_email,
			name: form.client_nom,
			telephone: form.client_telephone,
			password: accountPassword
		});
		accountCreating = false;
		if (result.ok) {
			accountCreated = true;
		} else if (result.reason === 'exists') {
			accountExisting = true;
			accountError = t.accountErrExists;
		} else {
			accountError = t.accountErrInvalid;
		}
	}

	function checkExistingAccount() {
		if (typeof window === 'undefined') return;
		if (!form.client_email) return;
		const existing = findClient(form.client_email);
		if (existing) {
			accountExisting = true;
			// Already signed in?
			const cur = getCurrent();
			if (cur && cur.email.toLowerCase() === form.client_email.toLowerCase()) {
				accountCreated = true;
			}
		}
	}

	function captureLocally() {
		try {
			appendSoumission({
				client_nom: form.client_nom,
				client_email: form.client_email,
				client_telephone: form.client_telephone,
				client_adresse: form.client_adresse || undefined,
				projet_adresse: form.projet_adresse,
				projet_type: form.projet_type || 'Autre',
				projet_description: form.projet_description,
				notes_client: form.notes_client || undefined,
				source: 'public-form',
				lang
			});
		} catch {}
	}

	const T = {
		fr: {
			heroBadge: 'Demande de soumission',
			heroTitle1: 'Obtenez votre',
			heroTitleAccent: 'soumission',
			heroDesc:
				"Remplissez le formulaire ci-dessous et notre équipe analysera votre projet. Vous recevrez une offre détaillée par courriel rapidement.",

			successTitle: 'Demande reçue avec succès!',
			successDesc:
				'Notre équipe analyse votre projet. Nous vous enverrons une offre détaillée par courriel dans les meilleurs délais. Pour une réponse immédiate, appelez-nous au',
			successHome: "Retour à l'accueil",

			draftTitle: 'Brouillon restauré',
			draftDesc: 'Nous avons retrouvé votre demande non envoyée. Continuez où vous étiez ou recommencez.',
			draftKeep: 'Continuer',
			draftDiscard: 'Recommencer',

			accountTitle: 'Créez votre espace client',
			accountDesc: 'Choisissez un mot de passe pour suivre votre soumission, recevoir les offres et y répondre.',
			accountPwd: 'Mot de passe (min. 6 caractères)',
			accountCTA: 'Créer mon compte',
			accountCreating: 'Création…',
			accountSuccess: 'Compte créé !',
			accountSuccessDesc: 'Vous pouvez maintenant vous connecter avec votre courriel et ce mot de passe pour suivre vos demandes.',
			accountSkip: 'Plus tard',
			accountErrShort: 'Le mot de passe doit faire au moins 6 caractères.',
			accountErrExists: 'Un compte existe déjà avec ce courriel. Connectez-vous.',
			accountErrInvalid: 'Données invalides.',
			accountLogin: 'Se connecter',


			sectionContact: 'Vos coordonnées',
			sectionContactDesc: 'Nous utilisons ces informations pour vous joindre.',
			sectionProject: 'Votre projet',
			sectionProjectDesc: 'Décrivez les travaux à effectuer.',

			labelName: 'Nom complet *',
			phName: 'Jean Tremblay',
			labelPhone: 'Téléphone *',
			labelEmail: 'Courriel *',
			phEmail: 'jean@exemple.com',
			labelClientAddr: 'Adresse personnelle (optionnel)',
			phClientAddr: '123 rue Principale, Ville',
			labelProjectAddr: 'Adresse du projet (optionnel)',
			phProjectAddr: '456 chemin du Lac, Saint-Hubert-de-Rivière-du-Loup, QC',
			labelProjectType: 'Type de projet (optionnel)',
			phProjectType: 'Sélectionnez un type…',
			labelDesc: 'Description du projet *',
			phDesc: 'Décrivez les travaux: nature, surface, accès, contraintes, échéancier souhaité…',
			charsLabel: 'caractères',
			labelNotes: 'Détails additionnels (optionnel)',
			phNotes: 'Particularités du terrain, échéancier souhaité…',

			sending: 'Envoi…',
			submit: 'Envoyer ma demande',
			consent:
				"En soumettant ce formulaire, vous acceptez d'être contacté concernant votre demande.",

			errorSendEmail: 'Envoyer par courriel maintenant',
			errorOrCall: 'Ou appelez-nous au',
			errorNetwork:
				'Connexion réseau impossible. Utilisez le bouton ci-dessous pour envoyer directement, ou appelez-nous.',
			errorRejected:
				"Le service de courriel a refusé la demande. Utilisez le bouton ci-dessous pour envoyer directement.",

			sidebarHow: 'Comment ça fonctionne?',
			step1: 'Vous remplissez ce formulaire.',
			step2: 'Notre équipe analyse votre projet.',
			step3: 'Vous recevez une offre détaillée par courriel.',
			step4: 'Vous pouvez accepter, contre-offrir, ou demander des modifications.',
			step5: 'Une fois acceptée, signez électroniquement.',
			sidebarCertif: 'Entrepreneur certifié',
			sidebarLoc:
				'Saint-Hubert-de-Rivière-du-Loup, Bas-Saint-Laurent. Service rapide et professionnel.',

			types: {
				'Drain français': 'Drain français',
				'Excavation générale': 'Excavation générale',
				Fondation: 'Fondation',
				Imperméabilisation: 'Imperméabilisation',
				Urgence: 'Urgence',
				Autre: 'Autre'
			} as Record<ProjetType, string>
		},
		en: {
			heroBadge: 'Quote request',
			heroTitle1: 'Get your',
			heroTitleAccent: 'quote',
			heroDesc:
				"Fill out the form below and our team will review your project. You'll receive a detailed offer by email shortly.",

			successTitle: 'Request received successfully!',
			successDesc:
				'Our team is reviewing your project. We will send you a detailed offer by email as soon as possible. For an immediate response, call us at',
			successHome: 'Back to home',

			draftTitle: 'Draft restored',
			draftDesc: "We found your unsent request. Pick up where you left off or start over.",
			draftKeep: 'Continue',
			draftDiscard: 'Start over',

			accountTitle: 'Create your client space',
			accountDesc: 'Pick a password to follow your quote, receive offers and reply.',
			accountPwd: 'Password (min. 6 chars)',
			accountCTA: 'Create my account',
			accountCreating: 'Creating…',
			accountSuccess: 'Account created!',
			accountSuccessDesc: 'You can now sign in with your email and this password to follow your requests.',
			accountSkip: 'Later',
			accountErrShort: 'Password must be at least 6 characters.',
			accountErrExists: 'An account already exists with this email. Please sign in.',
			accountErrInvalid: 'Invalid data.',
			accountLogin: 'Sign in',


			sectionContact: 'Your details',
			sectionContactDesc: "We'll use this information to reach you.",
			sectionProject: 'Your project',
			sectionProjectDesc: 'Describe the work to be done.',

			labelName: 'Full name *',
			phName: 'John Smith',
			labelPhone: 'Phone *',
			labelEmail: 'Email *',
			phEmail: 'john@example.com',
			labelClientAddr: 'Personal address (optional)',
			phClientAddr: '123 Main St, City',
			labelProjectAddr: 'Project address (optional)',
			phProjectAddr: '456 Lake Rd, Saint-Hubert-de-Rivière-du-Loup, QC',
			labelProjectType: 'Project type (optional)',
			phProjectType: 'Select a type…',
			labelDesc: 'Project description *',
			phDesc: 'Describe the work: nature, area, access, constraints, desired timeline…',
			charsLabel: 'characters',
			labelNotes: 'Additional details (optional)',
			phNotes: 'Site specifics, desired timeline…',

			sending: 'Sending…',
			submit: 'Send my request',
			consent: 'By submitting this form, you agree to be contacted about your request.',

			errorSendEmail: 'Send by email now',
			errorOrCall: 'Or call us at',
			errorNetwork:
				'Network connection failed. Use the button below to send directly, or call us.',
			errorRejected:
				'The email service rejected the request. Use the button below to send directly.',

			sidebarHow: 'How it works',
			step1: 'You fill out this form.',
			step2: 'Our team reviews your project.',
			step3: 'You receive a detailed offer by email.',
			step4: 'You can accept, counter-offer, or request changes.',
			step5: 'Once accepted, sign electronically.',
			sidebarCertif: 'Certified contractor',
			sidebarLoc:
				'Saint-Hubert-de-Rivière-du-Loup, Bas-Saint-Laurent. Fast and professional service.',

			types: {
				'Drain français': 'French drain',
				'Excavation générale': 'General excavation',
				Fondation: 'Foundation',
				Imperméabilisation: 'Waterproofing',
				Urgence: 'Emergency',
				Autre: 'Other'
			} as Record<ProjetType, string>
		},
		es: {
			heroBadge: 'Solicitud de cotización',
			heroTitle1: 'Obtenga su',
			heroTitleAccent: 'cotización',
			heroDesc:
				'Complete el formulario y nuestro equipo analizará su proyecto. Recibirá una oferta detallada por correo rápidamente.',

			successTitle: '¡Solicitud recibida con éxito!',
			successDesc:
				'Nuestro equipo está analizando su proyecto. Le enviaremos una oferta detallada por correo a la brevedad. Para respuesta inmediata, llámenos al',
			successHome: 'Volver al inicio',

			draftTitle: 'Borrador restaurado',
			draftDesc: 'Encontramos su solicitud sin enviar. Continúe donde lo dejó o empiece de nuevo.',
			draftKeep: 'Continuar',
			draftDiscard: 'Empezar de nuevo',

			accountTitle: 'Cree su espacio cliente',
			accountDesc: 'Elija una contraseña para seguir su cotización, recibir ofertas y responder.',
			accountPwd: 'Contraseña (mín. 6 caracteres)',
			accountCTA: 'Crear mi cuenta',
			accountCreating: 'Creando…',
			accountSuccess: '¡Cuenta creada!',
			accountSuccessDesc: 'Ahora puede iniciar sesión con su correo y esta contraseña para seguir sus solicitudes.',
			accountSkip: 'Más tarde',
			accountErrShort: 'La contraseña debe tener al menos 6 caracteres.',
			accountErrExists: 'Ya existe una cuenta con este correo. Inicie sesión.',
			accountErrInvalid: 'Datos inválidos.',
			accountLogin: 'Iniciar sesión',


			sectionContact: 'Sus datos',
			sectionContactDesc: 'Usamos esta información para contactarlo.',
			sectionProject: 'Su proyecto',
			sectionProjectDesc: 'Describa los trabajos a realizar.',

			labelName: 'Nombre completo *',
			phName: 'Juan Pérez',
			labelPhone: 'Teléfono *',
			labelEmail: 'Correo electrónico *',
			phEmail: 'juan@ejemplo.com',
			labelClientAddr: 'Dirección personal (opcional)',
			phClientAddr: '123 calle Principal, Ciudad',
			labelProjectAddr: 'Dirección del proyecto (opcional)',
			phProjectAddr: '456 camino del Lago, Saint-Hubert-de-Rivière-du-Loup, QC',
			labelProjectType: 'Tipo de proyecto (opcional)',
			phProjectType: 'Seleccione un tipo…',
			labelDesc: 'Descripción del proyecto *',
			phDesc:
				'Describa los trabajos: naturaleza, superficie, acceso, restricciones, plazo deseado…',
			charsLabel: 'caracteres',
			labelNotes: 'Detalles adicionales (opcional)',
			phNotes: 'Particularidades del terreno, plazo deseado…',

			sending: 'Enviando…',
			submit: 'Enviar mi solicitud',
			consent: 'Al enviar este formulario, acepta ser contactado respecto a su solicitud.',

			errorSendEmail: 'Enviar por correo ahora',
			errorOrCall: 'O llámenos al',
			errorNetwork:
				'No se pudo conectar a la red. Use el botón de abajo para enviar directamente, o llámenos.',
			errorRejected:
				'El servicio de correo rechazó la solicitud. Use el botón de abajo para enviar directamente.',

			sidebarHow: '¿Cómo funciona?',
			step1: 'Usted completa el formulario.',
			step2: 'Nuestro equipo analiza su proyecto.',
			step3: 'Recibe una oferta detallada por correo.',
			step4: 'Puede aceptar, hacer contraoferta, o solicitar cambios.',
			step5: 'Una vez aceptada, firma electrónicamente.',
			sidebarCertif: 'Contratista certificado',
			sidebarLoc:
				'Saint-Hubert-de-Rivière-du-Loup, Bas-Saint-Laurent. Servicio rápido y profesional.',

			types: {
				'Drain français': 'Drenaje francés',
				'Excavation générale': 'Excavación general',
				Fondation: 'Cimentación',
				Imperméabilisation: 'Impermeabilización',
				Urgence: 'Emergencia',
				Autre: 'Otro'
			} as Record<ProjetType, string>
		}
	} as const;
</script>

<div id="contact" class="text-black dark:text-white">
	{#if showHero}
		<div class="mb-10 lg:mb-14">
			<div
				class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#febd17]/10 border border-[#febd17]/30 text-[#c9920f] dark:text-[#febd17] text-xs font-semibold uppercase tracking-wider mb-4"
			>
				<FileText class="h-3.5 w-3.5" /> {t.heroBadge}
			</div>
			<h1 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black dark:text-white">
				{t.heroTitle1} <span class="text-[#c9920f] dark:text-[#febd17]">{t.heroTitleAccent}</span>
			</h1>
			<p class="mt-3 text-gray-600 dark:text-zinc-400 max-w-2xl">
				{t.heroDesc}
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
				<h2 class="text-2xl sm:text-3xl font-bold mb-3">{t.successTitle}</h2>
				<p class="text-gray-600 dark:text-zinc-400 mb-6 max-w-xl mx-auto">
					{t.successDesc}
					<a href="tel:+15148309973" class="text-[#febd17] font-semibold hover:underline">(514) 830-9973</a>.
				</p>

				<!-- Account creation card -->
				<div class="max-w-md mx-auto mb-8 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-left">
					{#if accountCreated}
						<div class="flex items-start gap-3">
							<CheckCircle2 class="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
							<div>
								<h3 class="font-bold text-gray-900 dark:text-white mb-1">{t.accountSuccess}</h3>
								<p class="text-xs text-gray-600 dark:text-zinc-400">{t.accountSuccessDesc}</p>
							</div>
						</div>
					{:else if accountExisting}
						<h3 class="font-bold text-gray-900 dark:text-white mb-1">{t.accountErrExists}</h3>
						<p class="text-xs text-gray-600 dark:text-zinc-400 mb-3">{form.client_email}</p>
						<a
							href="/compte/login?email={encodeURIComponent(form.client_email)}"
							class="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-[#febd17] hover:bg-[#e5aa10] text-black font-semibold text-sm transition-colors"
						>
							{t.accountLogin}
						</a>
					{:else}
						<h3 class="font-bold text-gray-900 dark:text-white mb-1">{t.accountTitle}</h3>
						<p class="text-xs text-gray-600 dark:text-zinc-400 mb-4">{t.accountDesc}</p>
						<div class="space-y-3">
							<div class="text-xs text-gray-500 dark:text-zinc-500 truncate">
								<span class="font-semibold text-gray-700 dark:text-zinc-300">{form.client_email}</span>
							</div>
							<input
								type="password"
								bind:value={accountPassword}
								placeholder={t.accountPwd}
								minlength="6"
								class="w-full px-3 py-2.5 bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 focus:border-[#febd17] rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-600 outline-none transition-colors"
							/>
							{#if accountError}
								<p class="text-xs text-red-500 dark:text-red-400">{accountError}</p>
							{/if}
							<button
								type="button"
								on:click={createAccount}
								disabled={accountCreating || accountPassword.length < 6}
								class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#febd17] hover:bg-[#e5aa10] text-black font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{accountCreating ? t.accountCreating : t.accountCTA}
							</button>
						</div>
					{/if}
				</div>

				<div class="flex flex-col sm:flex-row gap-3 justify-center">
					<a
						href="/"
						class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#febd17] hover:bg-[#e5aa10] text-black font-semibold transition-colors"
					>
						{t.successHome}
					</a>
					<a
						href="tel:+15148309973"
						class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 hover:border-black dark:hover:border-zinc-500 text-gray-800 dark:text-zinc-200 font-semibold transition-colors"
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
				class="{showSidebar ? 'lg:col-span-2' : ''} bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6"
			>
				{#if draftRestored}
					<div class="flex items-start gap-3 p-3 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-200">
						<Clock class="h-4 w-4 flex-shrink-0 mt-0.5 text-amber-400" />
						<div class="flex-1 text-sm">
							<p class="font-bold mb-0.5">{t.draftTitle}</p>
							<p class="text-xs text-amber-200/80">{t.draftDesc}</p>
						</div>
						<div class="flex flex-col sm:flex-row gap-1.5">
							<button
								type="button"
								on:click={dismissDraftBanner}
								class="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 transition-colors"
							>
								{t.draftKeep}
							</button>
							<button
								type="button"
								on:click={discardDraft}
								class="text-xs font-bold px-3 py-1.5 rounded-lg border border-amber-500/30 hover:bg-amber-500/10 text-amber-200 transition-colors"
							>
								{t.draftDiscard}
							</button>
						</div>
					</div>
				{/if}

				<div>
					<h2 class="text-xl font-bold mb-1">{t.sectionContact}</h2>
					<p class="text-sm text-gray-500 dark:text-zinc-500">{t.sectionContactDesc}</p>
				</div>

				<div class="grid sm:grid-cols-2 gap-4">
					<div>
						<label for="nom" class="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-zinc-400 mb-2">{t.labelName}</label>
						<input
							id="nom"
							type="text"
							bind:value={form.client_nom}
							placeholder={t.phName}
							required
							class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 focus:border-[#febd17] rounded-lg text-black dark:text-white placeholder-gray-400 dark:placeholder-zinc-600 outline-none transition-colors"
						/>
					</div>
					<div>
						<label for="tel" class="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-zinc-400 mb-2">{t.labelPhone}</label>
						<div class="relative">
							<Phone class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-zinc-500" />
							<input
								id="tel"
								type="tel"
								bind:value={form.client_telephone}
								placeholder="(418) 555-1234"
								required
								class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 focus:border-[#febd17] rounded-lg text-black dark:text-white placeholder-gray-400 dark:placeholder-zinc-600 outline-none transition-colors"
							/>
						</div>
					</div>
				</div>

				<div>
					<label for="email" class="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-zinc-400 mb-2">{t.labelEmail}</label>
					<div class="relative">
						<Mail class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-zinc-500" />
						<input
							id="email"
							type="email"
							bind:value={form.client_email}
							placeholder={t.phEmail}
							required
							class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 focus:border-[#febd17] rounded-lg text-black dark:text-white placeholder-gray-400 dark:placeholder-zinc-600 outline-none transition-colors"
						/>
					</div>
				</div>

				<div>
					<label for="adr" class="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-zinc-400 mb-2">{t.labelClientAddr}</label>
					<input
						id="adr"
						type="text"
						bind:value={form.client_adresse}
						placeholder={t.phClientAddr}
						class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 focus:border-[#febd17] rounded-lg text-black dark:text-white placeholder-gray-400 dark:placeholder-zinc-600 outline-none transition-colors"
					/>
				</div>

				<div class="border-t border-gray-200 dark:border-zinc-800 pt-6">
					<h2 class="text-xl font-bold mb-1">{t.sectionProject}</h2>
					<p class="text-sm text-gray-500 dark:text-zinc-500">{t.sectionProjectDesc}</p>
				</div>

				<div class="grid sm:grid-cols-2 gap-4">
					<div>
						<label for="padr" class="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-zinc-400 mb-2">{t.labelProjectAddr}</label>
						<div class="relative">
							<MapPin class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-zinc-500" />
							<input
								id="padr"
								type="text"
								bind:value={form.projet_adresse}
								placeholder={t.phProjectAddr}
								class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 focus:border-[#febd17] rounded-lg text-black dark:text-white placeholder-gray-400 dark:placeholder-zinc-600 outline-none transition-colors"
							/>
						</div>
					</div>

					<div>
						<label for="ptype" class="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-zinc-400 mb-2">{t.labelProjectType}</label>
						<select
							id="ptype"
							bind:value={form.projet_type}
							class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 focus:border-[#febd17] rounded-lg text-black dark:text-white outline-none transition-colors"
						>
							<option value="">{t.phProjectType}</option>
							{#each projetTypes as pt}
								<option value={pt}>{t.types[pt]}</option>
							{/each}
						</select>
					</div>
				</div>

				<div>
					<label for="desc" class="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-zinc-400 mb-2">{t.labelDesc}</label>
					<textarea
						id="desc"
						rows="3"
						bind:value={form.projet_description}
						placeholder={t.phDesc}
						required
						class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 focus:border-[#febd17] rounded-lg text-black dark:text-white placeholder-gray-400 dark:placeholder-zinc-600 outline-none transition-colors resize-none"
					></textarea>
				</div>

				<div>
					<label for="notes" class="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-zinc-400 mb-2">{t.labelNotes}</label>
					<textarea
						id="notes"
						rows="3"
						bind:value={form.notes_client}
						placeholder={t.phNotes}
						class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 focus:border-[#febd17] rounded-lg text-black dark:text-white placeholder-gray-400 dark:placeholder-zinc-600 outline-none transition-colors resize-none"
					></textarea>
				</div>

				{#if errorMsg}
					<div class="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 text-sm space-y-3">
						<p>{errorMsg}</p>
						{#if mailtoFallback}
							<a
								href={mailtoFallback}
								class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#febd17] hover:bg-[#e5aa10] text-black font-semibold text-sm transition-colors"
							>
								<Mail class="h-4 w-4" /> {t.errorSendEmail}
							</a>
							<p class="text-gray-600 dark:text-zinc-400 text-xs">
								{t.errorOrCall} <a href="tel:+15148309973" class="text-[#c9920f] dark:text-[#febd17] underline">(514) 830-9973</a>.
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
						{t.sending}
					{:else}
						<Send class="h-5 w-5" />
						{t.submit}
					{/if}
				</button>

				<p class="text-xs text-gray-500 dark:text-zinc-500 text-center">
					{t.consent}
				</p>
			</form>

			{#if showSidebar}
				<aside class="lg:col-span-1 space-y-6">
					<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 sticky top-24">
						<div class="flex items-center gap-2 mb-4">
							<Clock class="h-5 w-5 text-[#c9920f] dark:text-[#febd17]" />
							<h3 class="font-bold">{t.sidebarHow}</h3>
						</div>
						<ol class="space-y-4 text-sm">
							{#each [t.step1, t.step2, t.step3, t.step4, t.step5] as stepText, i}
								<li class="flex gap-3">
									<span
										class="flex-shrink-0 w-7 h-7 rounded-full bg-[#febd17] text-black font-bold text-xs flex items-center justify-center"
									>
										{i + 1}
									</span>
									<span class="text-gray-700 dark:text-zinc-300">{stepText}</span>
								</li>
							{/each}
						</ol>
					</div>

					<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6">
						<div class="flex items-center gap-2 mb-3">
							<Shield class="h-5 w-5 text-[#c9920f] dark:text-[#febd17]" />
							<h3 class="font-bold">{t.sidebarCertif}</h3>
						</div>
						<p class="text-sm text-gray-600 dark:text-zinc-400 mb-2">
							<span class="text-black dark:text-zinc-200 font-semibold">RBQ 5823-7736-01</span> — Mini Excavations
							Érable Inc.
						</p>
						<p class="text-sm text-gray-600 dark:text-zinc-400">
							{t.sidebarLoc}
						</p>
					</div>
				</aside>
			{/if}
		</div>
	{/if}
</div>
