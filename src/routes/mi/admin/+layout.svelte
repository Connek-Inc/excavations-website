<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import {
		LayoutDashboard,
		Users,
		FileText,
		Wrench,
		Settings,
		LogOut,
		ChevronLeft,
		Menu,
		X,
		Sun,
		Moon,
		Sparkles
	} from 'lucide-svelte';
	import { theme } from '$lib/store/store';

	export let data;

	$: isLogin = $page.url.pathname === '/mi/admin/login';

	const navItems = [
		{ href: '/mi/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
		{ href: '/mi/admin/contacts', label: 'Contacts / Leads', icon: Users },
		{ href: '/mi/admin/blogs', label: 'Articles Blog', icon: FileText },
		{ href: '/mi/admin/services', label: 'Services', icon: Wrench },
		{ href: '/mi/admin/settings', label: 'Paramètres', icon: Settings }
	];

	let sidebarOpen = false;

	$: isActive = (href: string, exact?: boolean) =>
		exact ? $page.url.pathname === href : $page.url.pathname.startsWith(href);

	function toggleTheme() {
		theme.update((v) => (v === 'dark' ? 'light' : 'dark'));
	}
</script>

{#if isLogin}
	<slot />
{:else}
	<div class="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white flex">
		<!-- Mobile overlay -->
		{#if sidebarOpen}
			<button
				type="button"
				aria-label="Close sidebar"
				class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
				on:click={() => (sidebarOpen = false)}
			></button>
		{/if}

		<!-- Sidebar -->
		<aside
			class="fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 transition-transform duration-300 flex flex-col {sidebarOpen
				? 'translate-x-0'
				: '-translate-x-full lg:translate-x-0'}"
		>
			<!-- Brand -->
			<div class="p-6 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
				<a href="/mi/admin" class="flex items-center gap-3">
					<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#febd17] to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/30">
						<Sparkles class="w-5 h-5 text-black" />
					</div>
					<div>
						<p class="font-black text-sm leading-tight">Panel</p>
						<p class="text-[10px] text-gray-500 dark:text-zinc-500 uppercase tracking-wider">Mini Excavations</p>
					</div>
				</a>
				<button
					class="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
					on:click={() => (sidebarOpen = false)}
					aria-label="Close menu"
				>
					<X class="w-5 h-5" />
				</button>
			</div>

			<!-- Nav -->
			<nav class="flex-1 p-4 space-y-1 overflow-y-auto">
				{#each navItems as item}
					{@const active = isActive(item.href, item.exact)}
					<a
						href={item.href}
						class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all relative group {active
							? 'bg-[#febd17] text-black shadow-lg shadow-yellow-500/20'
							: 'text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800'}"
						on:click={() => (sidebarOpen = false)}
					>
						<svelte:component this={item.icon} class="w-5 h-5 flex-shrink-0" />
						<span>{item.label}</span>
						{#if active}
							<div class="ml-auto w-1.5 h-1.5 rounded-full bg-black"></div>
						{/if}
					</a>
				{/each}
			</nav>

			<!-- Bottom: user + actions -->
			<div class="p-4 border-t border-gray-200 dark:border-zinc-800 space-y-3">
				<div class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-zinc-950">
					<div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#febd17] to-yellow-600 flex items-center justify-center text-black font-black text-sm">
						{data.admin?.name?.[0]?.toUpperCase() ?? 'A'}
					</div>
					<div class="flex-1 min-w-0">
						<p class="text-sm font-bold truncate">{data.admin?.name}</p>
						<p class="text-xs text-gray-500 dark:text-zinc-500 truncate">{data.admin?.email}</p>
					</div>
				</div>

				<div class="flex gap-2">
					<button
						on:click={toggleTheme}
						class="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
						aria-label="Toggle theme"
					>
						{#if $theme === 'dark'}
							<Sun class="w-4 h-4" /> Clair
						{:else}
							<Moon class="w-4 h-4" /> Sombre
						{/if}
					</button>
					<form method="POST" action="/mi/admin/logout" use:enhance class="flex-1">
						<button
							type="submit"
							class="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
						>
							<LogOut class="w-4 h-4" /> Quitter
						</button>
					</form>
				</div>

				<a
					href="/"
					target="_blank"
					rel="noopener"
					class="flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-500 hover:text-[#febd17] transition-colors px-3"
				>
					<ChevronLeft class="w-3 h-3" />
					Voir le site public
				</a>
			</div>
		</aside>

		<!-- Main -->
		<div class="flex-1 min-w-0">
			<!-- Mobile header -->
			<header class="lg:hidden sticky top-0 z-30 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 px-4 py-3 flex items-center justify-between">
				<button
					on:click={() => (sidebarOpen = true)}
					class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
					aria-label="Open menu"
				>
					<Menu class="w-5 h-5" />
				</button>
				<p class="font-bold text-sm">Panel</p>
				<div class="w-9"></div>
			</header>

			<main class="p-4 md:p-8 max-w-7xl mx-auto">
				<slot />
			</main>
		</div>
	</div>
{/if}
