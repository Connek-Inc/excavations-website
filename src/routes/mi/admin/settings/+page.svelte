<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { language } from '$lib/store/store';
	import { Settings, Save } from 'lucide-svelte';
	import { listSettings, setSetting, type SettingValue } from '$lib/admin/settings';
	import { getCurrent } from '$lib/admin/clients';

	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';
	$: t = T[lang] || T.fr;

	const T = {
		fr: { title: 'Paramètres', subtitle: 'Configuration globale du site', save: 'Enregistrer', saving: 'Enregistrement…', saved: '✓ Paramètres mis à jour', error: 'Erreur en sauvegardant.' },
		en: { title: 'Settings', subtitle: 'Global site configuration', save: 'Save', saving: 'Saving…', saved: '✓ Settings saved', error: 'Error saving.' },
		es: { title: 'Ajustes', subtitle: 'Configuración global del sitio', save: 'Guardar', saving: 'Guardando…', saved: '✓ Ajustes guardados', error: 'Error al guardar.' }
	};

	const fields: { key: string; labelFr: string; labelEn: string; labelEs: string; type: 'text' | 'tel' | 'email' | 'url' }[] = [
		{ key: 'site_name', labelFr: "Nom de l'entreprise", labelEn: 'Company name', labelEs: 'Nombre de la empresa', type: 'text' },
		{ key: 'phone', labelFr: 'Téléphone', labelEn: 'Phone', labelEs: 'Teléfono', type: 'tel' },
		{ key: 'email', labelFr: 'Courriel', labelEn: 'Email', labelEs: 'Correo', type: 'email' },
		{ key: 'rbq_license', labelFr: 'Licence R.B.Q.', labelEn: 'R.B.Q. License', labelEs: 'Licencia R.B.Q.', type: 'text' },
		{ key: 'address', labelFr: 'Adresse', labelEn: 'Address', labelEs: 'Dirección', type: 'text' },
		{ key: 'instagram', labelFr: 'Instagram URL', labelEn: 'Instagram URL', labelEs: 'URL Instagram', type: 'url' },
		{ key: 'facebook', labelFr: 'Facebook URL', labelEn: 'Facebook URL', labelEs: 'URL Facebook', type: 'url' }
	];

	let values: Record<string, string> = {};
	let loading = true;
	let saving = false;
	let savedMsg = '';
	let errorMsg = '';

	onMount(async () => {
		const admin = await getCurrent();
		if (!admin) {
			goto('/mi/admin/login', { replaceState: true });
			return;
		}
		const data = await listSettings();
		const out: Record<string, string> = {};
		for (const f of fields) {
			const v: SettingValue = data[f.key];
			out[f.key] = v == null ? '' : String(v);
		}
		values = out;
		loading = false;
	});

	function labelFor(f: typeof fields[number]): string {
		return lang === 'en' ? f.labelEn : lang === 'es' ? f.labelEs : f.labelFr;
	}

	function handleInput(key: string, e: Event) {
		values[key] = (e.currentTarget as HTMLInputElement).value;
	}

	async function save() {
		saving = true;
		errorMsg = '';
		savedMsg = '';
		const results = await Promise.all(fields.map((f) => setSetting(f.key, values[f.key] || null)));
		saving = false;
		if (results.every(Boolean)) {
			savedMsg = t.saved;
			setTimeout(() => (savedMsg = ''), 2800);
		} else {
			errorMsg = t.error;
		}
	}
</script>

<svelte:head><title>{t.title} — Admin</title><meta name="robots" content="noindex, nofollow" /></svelte:head>

<div class="space-y-6 max-w-3xl">
	<div class="flex items-center justify-between flex-wrap gap-4">
		<div>
			<h1 class="text-3xl font-black flex items-center gap-3"><Settings class="w-7 h-7 text-[#febd17]" /> {t.title}</h1>
			<p class="text-gray-500 dark:text-zinc-400 mt-1">{t.subtitle}</p>
		</div>
		<button type="button" on:click={save} disabled={saving || loading} class="px-6 py-2.5 rounded-xl bg-[#febd17] text-black font-bold text-sm hover:bg-yellow-400 flex items-center gap-2 disabled:opacity-60">
			<Save class="w-4 h-4" /> {saving ? t.saving : t.save}
		</button>
	</div>

	{#if savedMsg}
		<div class="p-3 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-400 text-sm">{savedMsg}</div>
	{/if}
	{#if errorMsg}
		<div class="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400 text-sm">{errorMsg}</div>
	{/if}

	{#if loading}
		<p class="text-sm text-gray-400 dark:text-zinc-600">…</p>
	{:else}
		<div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
			{#each fields as f}
				<div>
					<label for={f.key} class="block text-sm font-medium mb-1 text-gray-700 dark:text-zinc-300">{labelFor(f)}</label>
					<input id={f.key} type={f.type} value={values[f.key] ?? ''} on:input={(e) => handleInput(f.key, e)} class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-[#febd17] focus:outline-none" />
				</div>
			{/each}
		</div>
	{/if}
</div>
