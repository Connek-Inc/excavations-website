<script lang="ts">
	import { enhance } from '$app/forms';
	import { ArrowLeft, Mail, Phone, Calendar, Globe, Trash2, Save, MessageSquare } from 'lucide-svelte';

	export let data: any = {};
	export let form;

	$: contact = data.contact;
	let status = contact.status;
	let notes = contact.notes ?? '';
	let saving = false;

	function formatDate(d: Date | string | null) {
		if (!d) return '—';
		return new Date(d).toLocaleString('fr-CA', { dateStyle: 'long', timeStyle: 'short' });
	}
</script>

<svelte:head><title>Contact #{contact.id} — Admin</title></svelte:head>

<div class="space-y-6 max-w-5xl">
	<a href="/mi/admin/contacts" class="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-400 hover:text-[#febd17]">
		<ArrowLeft class="w-4 h-4" /> Retour à la liste
	</a>

	<div class="flex items-start justify-between flex-wrap gap-4">
		<div class="flex items-center gap-4">
			<div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#febd17] to-yellow-600 flex items-center justify-center text-black font-black text-2xl shadow-lg">
				{contact.name[0]?.toUpperCase()}
			</div>
			<div>
				<h1 class="text-2xl md:text-3xl font-black">{contact.name}</h1>
				<p class="text-gray-500 dark:text-zinc-400 text-sm">Contact #{contact.id}</p>
			</div>
		</div>
		<form method="POST" action="?/delete" use:enhance>
			<button type="submit" on:click={(e) => !confirm('Supprimer définitivement ?') && e.preventDefault()} class="px-4 py-2 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-medium text-sm hover:bg-red-100 dark:hover:bg-red-500/20 flex items-center gap-2">
				<Trash2 class="w-4 h-4" /> Supprimer
			</button>
		</form>
	</div>

	{#if form?.success}
		<div class="p-3 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-400 text-sm">
			✓ Modifications enregistrées
		</div>
	{/if}

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<div class="lg:col-span-2 space-y-6">
			<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6">
				<h2 class="font-bold text-lg mb-4 flex items-center gap-2">
					<MessageSquare class="w-5 h-5 text-[#febd17]" /> Message
				</h2>
				{#if contact.subject}<p class="font-semibold mb-2">{contact.subject}</p>{/if}
				<p class="text-gray-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">{contact.message}</p>
			</div>

			<form method="POST" action="?/update" use:enhance={() => { saving = true; return async ({ update }) => { await update(); saving = false; }; }} class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
				<h2 class="font-bold text-lg">Gestion</h2>

				<div class="space-y-2">
					<label for="status" class="block text-sm font-medium">Statut</label>
					<select id="status" name="status" bind:value={status} class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:outline-none focus:ring-2 focus:ring-[#febd17]">
						<option value="new">Nouveau</option>
						<option value="contacted">Contacté</option>
						<option value="quoted">Devis envoyé</option>
						<option value="won">Gagné</option>
						<option value="lost">Perdu</option>
						<option value="archived">Archivé</option>
					</select>
				</div>

				<div class="space-y-2">
					<label for="notes" class="block text-sm font-medium">Notes internes</label>
					<textarea id="notes" name="notes" bind:value={notes} rows="5" placeholder="Notes privées..." class="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:outline-none focus:ring-2 focus:ring-[#febd17]"></textarea>
				</div>

				<button type="submit" disabled={saving} class="px-6 py-2.5 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400 flex items-center gap-2 disabled:opacity-60">
					<Save class="w-4 h-4" /> {saving ? 'Enregistrement...' : 'Enregistrer'}
				</button>
			</form>
		</div>

		<div class="space-y-4">
			<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
				<h2 class="font-bold text-lg">Coordonnées</h2>

				<div class="space-y-3 text-sm">
					<a href={`mailto:${contact.email}`} class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-zinc-950 hover:bg-yellow-50 dark:hover:bg-yellow-500/10 transition-colors group">
						<Mail class="w-4 h-4 text-[#febd17] flex-shrink-0" />
						<span class="break-all group-hover:text-[#febd17]">{contact.email}</span>
					</a>

					{#if contact.phone}
						<a href={`tel:${contact.phone}`} class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-zinc-950 hover:bg-yellow-50 dark:hover:bg-yellow-500/10 transition-colors group">
							<Phone class="w-4 h-4 text-[#febd17] flex-shrink-0" />
							<span class="group-hover:text-[#febd17]">{contact.phone}</span>
						</a>
					{/if}

					{#if contact.serviceType}
						<div class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-zinc-950">
							<Globe class="w-4 h-4 text-[#febd17] flex-shrink-0" />
							<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-gray-200 dark:border-zinc-700">{contact.serviceType}</span>
						</div>
					{/if}

					{#if contact.preferredDate}
						<div class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-zinc-950">
							<Calendar class="w-4 h-4 text-[#febd17] flex-shrink-0" />
							<span class="text-xs">{formatDate(contact.preferredDate)}</span>
						</div>
					{/if}
				</div>
			</div>

			<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 space-y-2 text-xs text-gray-500 dark:text-zinc-400">
				<div class="flex justify-between"><span>Reçu le</span><span>{formatDate(contact.createdAt)}</span></div>
				<div class="flex justify-between"><span>Source</span><span class="font-medium text-gray-700 dark:text-zinc-300">{contact.source ?? 'website'}</span></div>
				<div class="flex justify-between"><span>Langue</span><span class="font-medium text-gray-700 dark:text-zinc-300 uppercase">{contact.language ?? 'fr'}</span></div>
				{#if contact.ipAddress}<div class="flex justify-between"><span>IP</span><span class="font-mono text-gray-700 dark:text-zinc-300 text-[10px]">{contact.ipAddress}</span></div>{/if}
			</div>
		</div>
	</div>
</div>
