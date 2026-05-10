<script lang="ts">
	import {
		LayoutDashboard,
		Users,
		FileText,
		FileSignature,
		Wrench,
		Star,
		Settings,
		LogOut,
		ExternalLink,
		Menu,
		X,
		Sparkles
	} from 'lucide-svelte';
	import { page } from '$app/stores';

	export let data;

	$: pathname = data.pathname;
	$: isLogin = pathname === '/mi/admin/login' || pathname === '/mi/admin/login/';

	let mobileOpen = false;

	const nav = [
		{ icon: LayoutDashboard, label: 'Tableau de bord', href: '/mi/admin' },
		{ icon: FileSignature, label: 'Soumissions', href: '/mi/admin/soumissions' },
		{ icon: Users, label: 'Leads / Contacts', href: '/mi/admin/contacts' },
		{ icon: FileText, label: 'Articles Blog', href: '/mi/admin/blogs' },
		{ icon: Wrench, label: 'Services', href: '/mi/admin/services' },
		{ icon: Star, label: 'Avis Clients', href: '/mi/admin/reviews' },
		{ icon: Settings, label: 'Paramètres', href: '/mi/admin/settings' }
	];

	function isActive(href: string) {
		if (href === '/mi/admin') return pathname === '/mi/admin' || pathname === '/mi/admin/';
		return pathname.startsWith(href);
	}
</script>

<svelte:head>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

{#if isLogin}
	<slot />
{:else}
	<div class="min-h-screen bg-gray-50 dark:bg-zinc-950 flex">
		<!-- Sidebar (desktop) -->
		<aside class="hidden lg:flex w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 flex-col fixed inset-y-0 left-0 z-30">
			<!-- Brand -->
			<div class="px-6 py-5 border-b border-gray-200 dark:border-zinc-800">
				<div class="flex items-center gap-2.5">
					<div class="w-9 h-9 rounded-xl bg-gradient-to-br from-[#febd17] to-yellow-600 flex items-center justify-center">
						<Sparkles class="w-5 h-5 text-black" />
					</div>
					<div>
						<p class="font-black text-sm leading-tight">Mini Excavations</p>
						<p class="text-xs text-[#febd17] font-bold leading-tight">Érable Admin</p>
					</div>
				</div>
			</div>

			<!-- Nav -->
			<nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
				{#each nav as item}
					<a
						href={item.href}
						class="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-colors {isActive(item.href) ? 'bg-[#febd17] text-black' : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white'}"
					>
						<svelte:component this={item.icon} class="w-4 h-4" />
						<span class="flex-1">{item.label}</span>
						{#if isActive(item.href)}
							<span class="w-1.5 h-1.5 rounded-full bg-black"></span>
						{/if}
					</a>
				{/each}
			</nav>

			<!-- User card + logout -->
			<div class="p-3 border-t border-gray-200 dark:border-zinc-800 space-y-2">
				{#if data.admin}
					<div class="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800">
						<div class="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
							{data.admin.name[0]?.toUpperCase()}
						</div>
						<div class="flex-1 min-w-0">
							<p class="text-xs font-bold truncate">{data.admin.name}</p>
							<p class="text-[10px] text-gray-500 dark:text-zinc-500 truncate">{data.admin.email}</p>
						</div>
					</div>
				{/if}
				<a href="/" target="_blank" class="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
					<ExternalLink class="w-3.5 h-3.5" />
					Voir le site
				</a>
				<form method="POST" action="/mi/admin/logout">
					<button type="submit" class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
						<LogOut class="w-3.5 h-3.5" />
						Se déconnecter
					</button>
				</form>
			</div>
		</aside>

		<!-- Mobile header -->
		<header class="lg:hidden fixed top-0 inset-x-0 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 z-40 px-4 py-3 flex items-center justify-between">
			<div class="flex items-center gap-2">
				<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-[#febd17] to-yellow-600 flex items-center justify-center">
					<Sparkles class="w-4 h-4 text-black" />
				</div>
				<p class="font-black text-sm">Admin</p>
			</div>
			<button on:click={() => (mobileOpen = !mobileOpen)} class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800" aria-label="Menu">
				{#if mobileOpen}
					<X class="w-5 h-5" />
				{:else}
					<Menu class="w-5 h-5" />
				{/if}
			</button>
		</header>

		<!-- Mobile drawer -->
		{#if mobileOpen}
			<button
				type="button"
				on:click={() => (mobileOpen = false)}
				class="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
				aria-label="Close menu"
			></button>
			<aside class="lg:hidden fixed inset-y-0 left-0 w-64 bg-white dark:bg-zinc-900 z-50 flex flex-col">
				<div class="px-4 py-3 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
					<p class="font-black text-sm">Menu</p>
					<button on:click={() => (mobileOpen = false)} class="p-1 rounded">
						<X class="w-4 h-4" />
					</button>
				</div>
				<nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
					{#each nav as item}
						<a
							href={item.href}
							on:click={() => (mobileOpen = false)}
							class="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm {isActive(item.href) ? 'bg-[#febd17] text-black' : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800'}"
						>
							<svelte:component this={item.icon} class="w-4 h-4" />
							<span>{item.label}</span>
						</a>
					{/each}
				</nav>
				<div class="p-3 border-t border-gray-200 dark:border-zinc-800">
					<form method="POST" action="/mi/admin/logout">
						<button type="submit" class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10">
							<LogOut class="w-3.5 h-3.5" />
							Se déconnecter
						</button>
					</form>
				</div>
			</aside>
		{/if}

		<!-- Main content -->
		<main class="flex-1 lg:ml-64 pt-16 lg:pt-0">
			<div class="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
				<slot />
			</div>
		</main>
	</div>
{/if}
