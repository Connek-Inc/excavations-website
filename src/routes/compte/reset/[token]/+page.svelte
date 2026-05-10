<script lang="ts">
	import { enhance } from '$app/forms';
	import { ArrowLeft, ArrowRight, Lock, Loader2, KeyRound } from 'lucide-svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
	let loading = false;
</script>

<svelte:head>
	<title>Réinitialiser le mot de passe — Mini Excavations Érable</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="min-h-screen bg-zinc-950 text-white flex flex-col">
	<header class="border-b border-zinc-800">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
			<a href="/" class="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-amber-400 transition">
				<ArrowLeft class="h-4 w-4" /> Retour au site
			</a>
		</div>
	</header>

	<main class="flex-1 flex items-center justify-center px-4 py-12">
		<div class="w-full max-w-md">
			<div class="text-center mb-8">
				<div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 mb-4">
					<KeyRound class="h-7 w-7 text-amber-500" />
				</div>
				<h1 class="text-3xl font-black mb-2">Nouveau mot de passe</h1>
				<p class="text-sm text-zinc-500">Choisissez un mot de passe d'au moins 8 caractères</p>
			</div>

			<form
				method="POST"
				use:enhance={() => {
					loading = true;
					return async ({ update }) => {
						await update();
						loading = false;
					};
				}}
				class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5"
			>
				{#if form?.error}
					<div class="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
						{form.error}
					</div>
				{/if}

				<div>
					<label for="pwd" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Nouveau mot de passe</label>
					<div class="relative">
						<Lock class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
						<input
							id="pwd"
							type="password"
							name="password"
							required
							minlength={8}
							autocomplete="new-password"
							class="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-lg text-white outline-none transition"
						/>
					</div>
				</div>

				<div>
					<label for="cpwd" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Confirmer</label>
					<div class="relative">
						<Lock class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
						<input
							id="cpwd"
							type="password"
							name="confirm"
							required
							minlength={8}
							autocomplete="new-password"
							class="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-lg text-white outline-none transition"
						/>
					</div>
				</div>

				<button
					type="submit"
					disabled={loading}
					class="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider text-sm transition disabled:opacity-50"
				>
					{#if loading}
						<Loader2 class="h-4 w-4 animate-spin" /> Enregistrement…
					{:else}
						Mettre à jour <ArrowRight class="h-4 w-4" />
					{/if}
				</button>
			</form>
		</div>
	</main>
</div>
