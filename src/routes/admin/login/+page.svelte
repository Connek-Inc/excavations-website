<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase/client';
	import { Shield, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-svelte';

	let email = '';
	let password = '';
	let loading = false;
	let errorMsg = '';
	let checkingSession = true;

	onMount(async () => {
		try {
			const {
				data: { session }
			} = await supabase.auth.getSession();
			if (session) {
				const { data: adminRow } = await supabase
					.from('admin_users')
					.select('email')
					.eq('email', session.user.email)
					.maybeSingle();
				if (adminRow) {
					goto('/admin');
					return;
				}
				await supabase.auth.signOut();
			}
		} catch (e) {
			console.warn(e);
		} finally {
			checkingSession = false;
		}
	});

	async function login() {
		if (loading) return;
		errorMsg = '';
		loading = true;
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: email.trim().toLowerCase(),
				password
			});
			if (error) {
				errorMsg = error.message || 'Échec de la connexion';
				return;
			}
			if (!data.user) {
				errorMsg = 'Échec de la connexion';
				return;
			}

			const { data: adminRow } = await supabase
				.from('admin_users')
				.select('email')
				.eq('email', data.user.email)
				.maybeSingle();
			if (!adminRow) {
				await supabase.auth.signOut();
				errorMsg = 'Email non autorisé';
				return;
			}

			goto('/admin');
		} catch (e: any) {
			errorMsg = e?.message || 'Erreur inattendue';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Connexion Admin — Mini Excavations Érable</title>
</svelte:head>

<div class="min-h-screen bg-zinc-950 text-white flex flex-col">
	<header class="border-b border-zinc-800">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
			<a
				href="/"
				class="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-amber-400 transition"
			>
				<ArrowLeft class="h-4 w-4" /> Retour au site
			</a>
		</div>
	</header>

	<main class="flex-1 flex items-center justify-center px-4 py-12">
		<div class="w-full max-w-md">
			<div class="text-center mb-8">
				<div
					class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 mb-4"
				>
					<Shield class="h-7 w-7 text-amber-500" />
				</div>
				<h1 class="text-3xl font-black mb-2">Espace administrateur</h1>
				<p class="text-sm text-zinc-500">Mini Excavations Érable Inc.</p>
			</div>

			{#if checkingSession}
				<div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center text-zinc-500">
					Vérification…
				</div>
			{:else}
				<form
					on:submit|preventDefault={login}
					class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5"
				>
					<div>
						<label for="email" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
							Courriel
						</label>
						<div class="relative">
							<Mail class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
							<input
								id="email"
								type="email"
								bind:value={email}
								required
								autocomplete="email"
								placeholder="admin@exemple.com"
								class="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-lg text-white placeholder-zinc-600 outline-none transition"
							/>
						</div>
					</div>

					<div>
						<label for="pwd" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
							Mot de passe
						</label>
						<div class="relative">
							<Lock class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
							<input
								id="pwd"
								type="password"
								bind:value={password}
								required
								autocomplete="current-password"
								placeholder="••••••••"
								class="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-lg text-white placeholder-zinc-600 outline-none transition"
							/>
						</div>
					</div>

					{#if errorMsg}
						<div class="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
							{errorMsg}
						</div>
					{/if}

					<button
						type="submit"
						disabled={loading || !email || !password}
						class="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider text-sm transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/20"
					>
						{#if loading}
							<svg class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
							</svg>
							Connexion…
						{:else}
							Se connecter
							<ArrowRight class="h-4 w-4" />
						{/if}
					</button>

					<p class="text-xs text-zinc-500 text-center">
						Accès réservé aux administrateurs autorisés.
					</p>
				</form>
			{/if}
		</div>
	</main>
</div>
