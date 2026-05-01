<script lang="ts">
	import { enhance } from '$app/forms';
	import { Lock, Mail, ArrowRight, Loader2, ShieldCheck } from 'lucide-svelte';
	import type { ActionData } from './$types';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export let form: ActionData;

	let loading = false;
</script>

<div class="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black relative overflow-hidden">
	<!-- Animated background blobs -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		<div class="absolute -top-40 -left-40 w-96 h-96 bg-[#febd17] rounded-full blur-3xl opacity-10 animate-pulse"></div>
		<div class="absolute -bottom-40 -right-40 w-96 h-96 bg-[#febd17] rounded-full blur-3xl opacity-10 animate-pulse" style="animation-delay: 2s;"></div>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500 rounded-full blur-3xl opacity-5"></div>
	</div>

	<!-- Grid pattern -->
	<div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

	<div class="relative z-10 w-full max-w-md">
		<!-- Logo / Brand -->
		<div class="text-center mb-8">
			<div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#febd17] to-yellow-600 mb-4 shadow-2xl shadow-yellow-500/30">
				<ShieldCheck class="w-8 h-8 text-black" />
			</div>
			<h1 class="text-3xl font-black text-white mb-2 tracking-tight">Panel de Control</h1>
			<p class="text-zinc-400 text-sm">Mini Excavations Érable — Administration</p>
		</div>

		<!-- Card -->
		<div class="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl">
			<form
				method="POST"
				use:enhance={() => {
					loading = true;
					return async ({ update }) => {
						await update();
						loading = false;
					};
				}}
				class="space-y-5"
			>
				{#if form?.error}
					<div class="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
						{form.error}
					</div>
				{/if}

				<div class="space-y-2">
					<Label forId="email" class="text-zinc-300">Adresse courriel</Label>
					<div class="relative">
						<Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 z-10" />
						<Input
							id="email"
							type="email"
							name="email"
							required
							autocomplete="email"
							placeholder="admin@exemple.com"
							value={form?.email ?? ''}
							class="pl-10 h-12 bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600"
						/>
					</div>
				</div>

				<div class="space-y-2">
					<Label forId="password" class="text-zinc-300">Mot de passe</Label>
					<div class="relative">
						<Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 z-10" />
						<Input
							id="password"
							type="password"
							name="password"
							required
							autocomplete="current-password"
							placeholder="••••••••"
							class="pl-10 h-12 bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600"
						/>
					</div>
				</div>

				<button
					type="submit"
					disabled={loading}
					class="w-full h-12 rounded-xl bg-gradient-to-r from-[#febd17] to-yellow-500 hover:from-yellow-500 hover:to-[#febd17] text-black font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-yellow-500/30 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
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
