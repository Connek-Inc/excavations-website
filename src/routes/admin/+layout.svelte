<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabase/client';
	import {
		LayoutDashboard,
		FileText,
		LogOut,
		Shield,
		Menu,
		X
	} from 'lucide-svelte';

	let userEmail = '';
	let checking = true;
	let mobileOpen = false;

	$: isLogin = $page.url.pathname === '/admin/login';

	onMount(async () => {
		try {
			const {
				data: { session }
			} = await supabase.auth.getSession();

			if (!session) {
				if (!isLogin) {
					goto('/admin/login');
					return;
				}
				checking = false;
				return;
			}

			// Verify whitelisted
			const { data: adminRow } = await supabase
				.from('admin_users')
				.select('email')
				.eq('email', session.user.email)
				.maybeSingle();
			if (!adminRow) {
				await supabase.auth.signOut();
				if (!isLogin) goto('/admin/login');
				checking = false;
				return;
			}

			userEmail = session.user.email || '';
			checking = false;

			// If we're on login page and already authed, send to dashboard
			if (isLogin) goto('/admin');
		} catch (e) {
			console.error(e);
			checking = false;
			if (!isLogin) goto('/admin/login');
		}
	});

	async function logout() {
		await supabase.auth.signOut();
		userEmail = '';
		goto('/admin/login');
	}

	const navItems = [
		{ href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard, exact: true },
		{ href: '/admin/soumissions', label: 'Soumissions', icon: FileText, exact: false }
	];

	function isActive(href: string, exact: boolean) {
		const path = $page.url.pathname;
		return exact ? path === href : path === href || path.startsWith(href + '/');
	}
</script>

{#if isLogin}
	<slot />
{:else if checking}
	<div class="min-h-screen bg-zinc-950 flex items-center justify-center">
		<div class="text-zinc-500 text-sm">Vérification…</div>
	</div>
{:else}
	<div class="min-h-screen bg-zinc-950 text-white flex">
		<!-- Sidebar (desktop) -->
		<aside
			class="hidden lg:flex w-64 flex-col bg-zinc-900 border-r border-zinc-800 fixed inset-y-0 left-0 z-30"
		>
			<div class="h-16 flex items-center gap-2 px-6 border-b border-zinc-800">
				<Shield class="h-6 w-6 text-amber-500" />
				<div>
					<div class="text-sm font-bold">Admin</div>
					<div class="text-[10px] uppercase tracking-wider text-zinc-500">
						Mini Excavations Érable
					</div>
				</div>
			</div>
			<nav class="flex-1 px-3 py-4 space-y-1">
				{#each navItems as item}
					<a
						href={item.href}
						class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition {isActive(
							item.href,
							item.exact
						)
							? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
							: 'text-zinc-400 hover:bg-zinc-800 hover:text-white border border-transparent'}"
					>
						<svelte:component this={item.icon} class="h-4 w-4" />
						{item.label}
					</a>
				{/each}
			</nav>
			<div class="border-t border-zinc-800 p-3">
				<button
					type="button"
					on:click={logout}
					class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition"
				>
					<LogOut class="h-4 w-4" />
					Déconnexion
				</button>
			</div>
		</aside>

		<!-- Mobile drawer -->
		{#if mobileOpen}
			<div
				class="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
				on:click={() => (mobileOpen = false)}
				role="presentation"
			></div>
			<aside
				class="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col"
			>
				<div class="h-16 flex items-center justify-between px-6 border-b border-zinc-800">
					<div class="flex items-center gap-2">
						<Shield class="h-5 w-5 text-amber-500" />
						<div class="text-sm font-bold">Admin</div>
					</div>
					<button
						type="button"
						on:click={() => (mobileOpen = false)}
						class="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400"
						aria-label="Fermer"
					>
						<X class="h-5 w-5" />
					</button>
				</div>
				<nav class="flex-1 px-3 py-4 space-y-1">
					{#each navItems as item}
						<a
							href={item.href}
							on:click={() => (mobileOpen = false)}
							class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition {isActive(
								item.href,
								item.exact
							)
								? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
								: 'text-zinc-400 hover:bg-zinc-800 hover:text-white border border-transparent'}"
						>
							<svelte:component this={item.icon} class="h-4 w-4" />
							{item.label}
						</a>
					{/each}
				</nav>
				<div class="border-t border-zinc-800 p-3">
					<button
						type="button"
						on:click={logout}
						class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition"
					>
						<LogOut class="h-4 w-4" />
						Déconnexion
					</button>
				</div>
			</aside>
		{/if}

		<!-- Main -->
		<div class="flex-1 lg:pl-64 min-w-0">
			<header
				class="sticky top-0 z-20 h-16 bg-zinc-950/95 backdrop-blur border-b border-zinc-800 flex items-center justify-between px-4 sm:px-6"
			>
				<button
					type="button"
					on:click={() => (mobileOpen = true)}
					class="lg:hidden p-2 -ml-2 rounded-lg hover:bg-zinc-800 text-zinc-300"
					aria-label="Menu"
				>
					<Menu class="h-5 w-5" />
				</button>
				<div class="flex-1"></div>
				<div class="flex items-center gap-3">
					<div class="text-right hidden sm:block">
						<div class="text-xs text-zinc-500">Connecté en tant que</div>
						<div class="text-sm text-white font-medium">{userEmail}</div>
					</div>
					<div
						class="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-sm uppercase"
					>
						{userEmail ? userEmail[0] : 'A'}
					</div>
				</div>
			</header>

			<main class="p-4 sm:p-6 lg:p-8">
				<slot />
			</main>
		</div>
	</div>
{/if}
