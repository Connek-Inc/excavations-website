<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { language } from '$lib/store/store';
	import {
		findSoumission,
		updateSoumission,
		deleteSoumission as removeSoumission,
		statusLabel,
		statusColor,
		checkAdminSession,
		type Soumission,
		type SoumissionStatus
	} from '$lib/admin/storage';
	import {
		ArrowLeft,
		Mail,
		Phone,
		MapPin,
		Calendar,
		FileText,
		Trash2,
		CheckCircle2,
		XCircle,
		Send,
		Eye,
		Archive,
		Save
	} from 'lucide-svelte';

	let soumission: Soumission | null = null;
	let checked = false;
	let saving = false;
	let toast: { msg: string; type: 'success' | 'error' } | null = null;
	let admin_notes = '';

	$: id = $page.params.id;
	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';
	$: t = T[lang] || T.fr;

	const T = {
		fr: {
			back: 'Retour à la liste',
			notFound: 'Soumission introuvable',
			notFoundDesc: "Cette soumission n'existe pas ou a été supprimée.",
			client: 'Client',
			project: 'Projet',
			description: 'Description',
			clientNotes: 'Notes du client',
			adminNotes: 'Notes internes',
			adminNotesPh: "Notes visibles uniquement par l'admin…",
			actions: 'Actions',
			markReview: 'Marquer en révision',
			markOffer: 'Marquer comme offre envoyée',
			markAccept: 'Marquer comme acceptée',
			markReject: 'Rejeter',
			archive: 'Archiver',
			deleteBtn: 'Supprimer',
			save: 'Sauvegarder les notes',
			saving: 'Enregistrement…',
			confirmDelete: 'Supprimer définitivement cette soumission?',
			savedNotes: 'Notes sauvegardées',
			statusUpdated: 'Statut mis à jour',
			source: 'Source',
			sourceLabels: {
				'public-form': 'Formulaire public',
				'urgences-form': 'Formulaire urgences',
				'manual': 'Création manuelle'
			},
			received: 'Reçue le',
			contact: 'Coordonnées',
			emailClient: 'Écrire au client',
			callClient: 'Appeler le client'
		},
		en: {
			back: 'Back to list',
			notFound: 'Submission not found',
			notFoundDesc: 'This submission does not exist or has been deleted.',
			client: 'Client',
			project: 'Project',
			description: 'Description',
			clientNotes: 'Client notes',
			adminNotes: 'Internal notes',
			adminNotesPh: 'Notes visible only to admin…',
			actions: 'Actions',
			markReview: 'Mark as under review',
			markOffer: 'Mark as quote sent',
			markAccept: 'Mark as accepted',
			markReject: 'Reject',
			archive: 'Archive',
			deleteBtn: 'Delete',
			save: 'Save notes',
			saving: 'Saving…',
			confirmDelete: 'Permanently delete this submission?',
			savedNotes: 'Notes saved',
			statusUpdated: 'Status updated',
			source: 'Source',
			sourceLabels: {
				'public-form': 'Public form',
				'urgences-form': 'Emergency form',
				'manual': 'Manual entry'
			},
			received: 'Received on',
			contact: 'Contact',
			emailClient: 'Email client',
			callClient: 'Call client'
		},
		es: {
			back: 'Volver a la lista',
			notFound: 'Solicitud no encontrada',
			notFoundDesc: 'Esta solicitud no existe o fue eliminada.',
			client: 'Cliente',
			project: 'Proyecto',
			description: 'Descripción',
			clientNotes: 'Notas del cliente',
			adminNotes: 'Notas internas',
			adminNotesPh: 'Notas visibles solo para el admin…',
			actions: 'Acciones',
			markReview: 'Marcar en revisión',
			markOffer: 'Marcar como cotización enviada',
			markAccept: 'Marcar como aceptada',
			markReject: 'Rechazar',
			archive: 'Archivar',
			deleteBtn: 'Eliminar',
			save: 'Guardar notas',
			saving: 'Guardando…',
			confirmDelete: '¿Eliminar definitivamente esta solicitud?',
			savedNotes: 'Notas guardadas',
			statusUpdated: 'Estado actualizado',
			source: 'Origen',
			sourceLabels: {
				'public-form': 'Formulario público',
				'urgences-form': 'Formulario de urgencias',
				'manual': 'Entrada manual'
			},
			received: 'Recibida el',
			contact: 'Contacto',
			emailClient: 'Escribir al cliente',
			callClient: 'Llamar al cliente'
		}
	};

	onMount(async () => {
		const admin = await checkAdminSession();
		if (!admin) {
			goto('/mi/admin/login', { replaceState: true });
			return;
		}
		await load();
		checked = true;
	});

	async function load() {
		const r = await findSoumission(id);
		soumission = r?.soumission ?? null;
		admin_notes = soumission?.admin_notes || '';
	}

	async function setStatus(status: SoumissionStatus) {
		const updated = await updateSoumission(id, { status });
		if (updated) {
			soumission = updated;
			showToast(t.statusUpdated);
		}
	}

	async function saveNotes() {
		saving = true;
		const updated = await updateSoumission(id, { admin_notes });
		saving = false;
		if (updated) {
			soumission = updated;
			showToast(t.savedNotes);
		}
	}

	async function handleDelete() {
		if (!confirm(t.confirmDelete)) return;
		await removeSoumission(id);
		goto('/mi/admin/soumissions', { replaceState: true });
	}

	function showToast(msg: string, type: 'success' | 'error' = 'success') {
		toast = { msg, type };
		setTimeout(() => (toast = null), 2800);
	}

	function fmtDateTime(s: string): string {
		try {
			return new Date(s).toLocaleString(
				lang === 'en' ? 'en-CA' : lang === 'es' ? 'es-ES' : 'fr-CA',
				{ dateStyle: 'long', timeStyle: 'short' }
			);
		} catch {
			return s;
		}
	}
</script>

<svelte:head>
	<title>{soumission?.client_nom || 'Soumission'} — Admin</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

{#if toast}
	<div
		class="fixed top-4 right-4 z-50 px-4 py-3 rounded-lg border shadow-xl text-sm font-medium {toast.type ===
		'success'
			? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
			: 'bg-red-500/10 border-red-500/40 text-red-300'}"
	>
		{toast.msg}
	</div>
{/if}

{#if checked}
	<div class="min-h-screen bg-gray-50 dark:bg-white dark:bg-zinc-950 text-gray-900 dark:text-white">
		<main class="max-w-5xl w-full mx-auto px-4 sm:px-6 py-10">
			<a
				href="/mi/admin/soumissions"
				class="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400 hover:text-[#febd17] transition-colors mb-6"
			>
				<ArrowLeft class="w-4 h-4" /> {t.back}
			</a>

			{#if !soumission}
				<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-12 text-center">
					<XCircle class="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-zinc-600" />
					<h1 class="text-xl font-bold mb-2">{t.notFound}</h1>
					<p class="text-sm text-gray-500 dark:text-zinc-500">{t.notFoundDesc}</p>
				</div>
			{:else}
				<div class="flex items-start justify-between gap-4 flex-wrap mb-6">
					<div>
						<h1 class="text-2xl sm:text-3xl font-black tracking-tight">{soumission.client_nom}</h1>
						<p class="text-xs text-gray-500 dark:text-zinc-500 mt-1">
							{t.received} {fmtDateTime(soumission.created_at)} · {t.source}: {t.sourceLabels[soumission.source]}
						</p>
					</div>
					<span
						class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border {statusColor(soumission.status)}"
					>
						{statusLabel(soumission.status, lang)}
					</span>
				</div>

				<div class="grid lg:grid-cols-3 gap-5">
					<!-- Left: details -->
					<div class="lg:col-span-2 space-y-5">
						<section class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5">
							<h2 class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-500 mb-3">{t.contact}</h2>
							<div class="grid sm:grid-cols-2 gap-3 text-sm">
								<a
									href="mailto:{soumission.client_email}"
									class="flex items-center gap-2 p-3 rounded-lg bg-white dark:bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 hover:border-[#febd17] hover:bg-[#febd17]/5 transition-colors"
								>
									<Mail class="w-4 h-4 text-[#febd17] flex-shrink-0" />
									<span class="text-gray-900 dark:text-white truncate">{soumission.client_email}</span>
								</a>
								{#if soumission.client_telephone}
									<a
										href="tel:{soumission.client_telephone}"
										class="flex items-center gap-2 p-3 rounded-lg bg-white dark:bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 hover:border-[#febd17] hover:bg-[#febd17]/5 transition-colors"
									>
										<Phone class="w-4 h-4 text-[#febd17] flex-shrink-0" />
										<span class="text-gray-900 dark:text-white">{soumission.client_telephone}</span>
									</a>
								{/if}
								{#if soumission.client_adresse}
									<div class="flex items-center gap-2 p-3 rounded-lg bg-white dark:bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 sm:col-span-2">
										<MapPin class="w-4 h-4 text-gray-500 dark:text-zinc-500 flex-shrink-0" />
										<span class="text-gray-700 dark:text-zinc-300 text-sm">{soumission.client_adresse}</span>
									</div>
								{/if}
							</div>
						</section>

						<section class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5">
							<h2 class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-500 mb-3">{t.project}</h2>
							<div class="space-y-3 text-sm">
								<div class="flex items-start gap-2">
									<MapPin class="w-4 h-4 text-gray-500 dark:text-zinc-500 flex-shrink-0 mt-0.5" />
									<span class="text-gray-900 dark:text-white">{soumission.projet_adresse}</span>
								</div>
								<div class="flex items-start gap-2">
									<FileText class="w-4 h-4 text-gray-500 dark:text-zinc-500 flex-shrink-0 mt-0.5" />
									<span class="text-gray-900 dark:text-white font-semibold">{soumission.projet_type}</span>
								</div>
								<div class="pt-3 border-t border-gray-200 dark:border-zinc-800">
									<p class="text-xs text-gray-500 dark:text-zinc-500 mb-1">{t.description}</p>
									<p class="text-zinc-200 text-sm whitespace-pre-wrap">{soumission.projet_description}</p>
								</div>
								{#if soumission.notes_client}
									<div class="pt-3 border-t border-gray-200 dark:border-zinc-800">
										<p class="text-xs text-gray-500 dark:text-zinc-500 mb-1">{t.clientNotes}</p>
										<p class="text-zinc-200 text-sm whitespace-pre-wrap">{soumission.notes_client}</p>
									</div>
								{/if}
							</div>
						</section>

						<section class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5">
							<h2 class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-500 mb-3">{t.adminNotes}</h2>
							<textarea
								bind:value={admin_notes}
								rows="4"
								placeholder={t.adminNotesPh}
								class="w-full px-3 py-2.5 bg-white dark:bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 focus:border-[#febd17] rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-600 outline-none resize-none"
							></textarea>
							<button
								type="button"
								on:click={saveNotes}
								disabled={saving}
								class="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-900 dark:text-white font-semibold text-sm transition-colors disabled:opacity-50"
							>
								<Save class="w-4 h-4" />
								{saving ? t.saving : t.save}
							</button>
						</section>
					</div>

					<!-- Right: actions -->
					<aside class="space-y-3">
						<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5">
							<h2 class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-500 mb-3">{t.actions}</h2>
							<div class="space-y-2">
								<button
									type="button"
									on:click={() => setStatus('en_revision')}
									class="w-full inline-flex items-center gap-2 px-3 py-2.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-semibold text-sm transition-colors"
								>
									<Eye class="w-4 h-4" />
									{t.markReview}
								</button>
								<button
									type="button"
									on:click={() => setStatus('offerte')}
									class="w-full inline-flex items-center gap-2 px-3 py-2.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 font-semibold text-sm transition-colors"
								>
									<Send class="w-4 h-4" />
									{t.markOffer}
								</button>
								<button
									type="button"
									on:click={() => setStatus('acceptee')}
									class="w-full inline-flex items-center gap-2 px-3 py-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-semibold text-sm transition-colors"
								>
									<CheckCircle2 class="w-4 h-4" />
									{t.markAccept}
								</button>
								<button
									type="button"
									on:click={() => setStatus('rejetee')}
									class="w-full inline-flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 font-semibold text-sm transition-colors"
								>
									<XCircle class="w-4 h-4" />
									{t.markReject}
								</button>
								<button
									type="button"
									on:click={() => setStatus('archivee')}
									class="w-full inline-flex items-center gap-2 px-3 py-2.5 rounded-lg bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 font-semibold text-sm transition-colors"
								>
									<Archive class="w-4 h-4" />
									{t.archive}
								</button>
							</div>
							<div class="mt-3 pt-3 border-t border-gray-200 dark:border-zinc-800">
								<button
									type="button"
									on:click={handleDelete}
									class="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 font-semibold text-xs transition-colors"
								>
									<Trash2 class="w-3.5 h-3.5" />
									{t.deleteBtn}
								</button>
							</div>
						</div>
					</aside>
				</div>
			{/if}
		</main>
	</div>
{:else}
	<div class="min-h-screen bg-gray-50 dark:bg-white dark:bg-zinc-950 text-gray-900 dark:text-white flex items-center justify-center">
		<p class="text-gray-500 dark:text-zinc-500 text-sm">…</p>
	</div>
{/if}
