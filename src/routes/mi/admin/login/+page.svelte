<script lang="ts">
	import { Lock, Mail, ArrowRight, Loader2, ShieldCheck, AlertCircle } from 'lucide-svelte';

	let email = '';
	let password = '';
	let loading = false;
	let errorMsg = '';

	function handleSubmit(e: Event) {
		e.preventDefault();
		loading = true;
		errorMsg = '';
		setTimeout(() => {
			loading = false;
			errorMsg =
				"Le backend administrateur n'est pas encore activé sur ce déploiement. Réessayez une fois la base de données configurée.";
		}, 600);
	}
</script>

<svelte:head>
	<title>Connexion — Mini Excavations Érable</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="min-h-screen flex items-center justify-center px-4 bg-zinc-950 relative overflow-hidden">
	<div
		class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_50%,transparent_100%)]"
	></div>

	<div class="relative z-10 w-full max-w-md">
		<div class="text-center mb-8">
			<div class="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#febd17] mb-4">
				<ShieldCheck class="w-7 h-7 text-black" />
			</div>
			<h1 class="text-2xl font-bold text-white mb-1 tracking-tight">Panel de Contrôle</h1>
			<p class="text-zinc-500 text-sm">Mini Excavations Érable — Administration</p>
		</div>

		<div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
			<form on:submit={handleSubmit} class="space-y-5">
				{#if errorMsg}
					<div
						class="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm"
					>
						<AlertCircle class="w-4 h-4 flex-shrink-0 mt-0.5" />
						<span>{errorMsg}</span>
					</div>
				{/if}

				<div class="space-y-2">
					<label for="email" class="block text-sm font-medium text-zinc-300">Adresse courriel</label>
					<div class="relative">
						<Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
						<input
							id="email"
							type="email"
							name="email"
							required
							autocomplete="email"
							placeholder="admin@exemple.com"
							bind:value={email}
							class="w-full pl-10 h-11 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-600 px-4 focus:outline-none focus:border-[#febd17]"
						/>
					</div>
				</div>

				<div class="space-y-2">
					<label for="password" class="block text-sm font-medium text-zinc-300">Mot de passe</label>
					<div class="relative">
						<Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
						<input
							id="password"
							type="password"
							name="password"
							required
							autocomplete="current-password"
							placeholder="••••••••"
							bind:value={password}
							class="w-full pl-10 h-11 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-600 px-4 focus:outline-none focus:border-[#febd17]"
						/>
					</div>
				</div>

				<button
					type="submit"
					disabled={loading}
					class="w-full h-11 rounded-lg bg-[#febd17] hover:bg-[#e5aa10] text-black font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
				>
					{#if loading}
						<Loader2 class="w-4 h-4 animate-spin" />
						Connexion...
					{:else}
						Se connecter
						<ArrowRight class="w-4 h-4" />
					{/if}
				</button>
			</form>

			<div class="mt-6 pt-6 border-t border-zinc-800 text-center">
				<a href="/" class="text-xs text-zinc-500 hover:text-[#febd17] transition-colors">
					← Retour au site
				</a>
			</div>
		</div>

		<p class="text-center text-zinc-600 text-xs mt-6">
			Accès restreint • Toutes les tentatives sont enregistrées
		</p>
	</div>
</div>
