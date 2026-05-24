<script lang="ts">
    import { onMount } from 'svelte';
    import { language, theme } from './store/store';

    type MenuItem = {
        text: string;
        link?: string;
        children?: { text: string; link: string; desc?: string }[];
    };

    export let menuOptions: MenuItem[];
    export let logo: string;

    let lang: 'fr' | 'en' | 'es' = 'fr';
    language.subscribe((value) => {
        lang = value as 'fr' | 'en' | 'es';
    });

    function changeLanguage(selectedLanguage: string) {
        language.update(() => selectedLanguage as 'fr' | 'en' | 'es');
    }

    let showMenu = false;
    let openMobile: Record<string, boolean> = {};
    let openDesktop: string | null = null;

    function closeMenu() {
        showMenu = false;
        openMobile = {};
        openDesktop = null;
    }

    function toggleMobile(key: string) {
        openMobile = { ...openMobile, [key]: !openMobile[key] };
    }

    let isScrolled = false;
    onMount(() => {
        const handleScroll = () => {
            isScrolled = window.scrollY > 50;
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    });

    // close desktop dropdown on Esc
    function handleKey(e: KeyboardEvent) {
        if (e.key === 'Escape') openDesktop = null;
    }
</script>

<svelte:window on:keydown={handleKey} />

<nav
    class="py-3 px-4 sm:px-6 lg:px-10 fixed top-0 left-0 w-full z-50 transition-all duration-300 {isScrolled
        ? $theme === 'dark'
            ? 'bg-black/95 backdrop-blur-md shadow-lg text-white border-b border-zinc-800'
            : 'bg-[#febd17]/95 backdrop-blur-md shadow-lg text-black'
        : $theme === 'dark'
            ? 'bg-transparent text-white'
            : 'bg-transparent text-black'}"
>
    <div class="flex flex-wrap justify-between items-center max-w-[1500px] mx-auto">
        <!-- Logo + mobile burger -->
        <div class="flex items-center w-full lg:w-auto justify-between lg:justify-start">
            <a href="/" class="flex items-center" on:click={closeMenu}>
                <img
                    src={logo}
                    alt="Mini Excavations Érable"
                    class="h-8 sm:h-10 mr-2 dark:brightness-0 dark:invert"
                />
                <span class="text-base sm:text-lg font-bold">Mini Excavations Érable</span>
            </a>
            <button
                on:click={() => (showMenu = !showMenu)}
                class="lg:hidden focus:outline-none p-2 -mr-2"
                aria-label="Toggle menu"
            >
                {#if showMenu}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                {/if}
            </button>
        </div>

        <!-- Desktop nav -->
        <div class="hidden lg:flex items-center gap-1 font-semibold">
            {#each menuOptions as opt (opt.text)}
                {#if opt.children && opt.children.length > 0}
                    <!-- Dropdown -->
                    <div
                        class="relative"
                        on:mouseenter={() => (openDesktop = opt.text)}
                        on:mouseleave={() => (openDesktop = null)}
                        role="none"
                    >
                        <button
                            type="button"
                            on:click={() => (openDesktop = openDesktop === opt.text ? null : opt.text)}
                            class="inline-flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-sm"
                            aria-haspopup="true"
                            aria-expanded={openDesktop === opt.text}
                        >
                            {opt.text}
                            <svg
                                class="h-3.5 w-3.5 transition-transform {openDesktop === opt.text ? 'rotate-180' : ''}"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {#if openDesktop === opt.text}
                            <div
                                class="absolute left-0 top-full pt-2 min-w-[300px]"
                                role="menu"
                            >
                                <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden">
                                    {#each opt.children as child}
                                        <a
                                            href={child.link}
                                            on:click={() => (openDesktop = null)}
                                            class="block px-4 py-3 hover:bg-[#febd17]/10 dark:hover:bg-[#febd17]/10 transition-colors border-b border-gray-100 dark:border-zinc-800 last:border-b-0"
                                            role="menuitem"
                                        >
                                            <div class="text-sm font-bold text-gray-900 dark:text-white">{child.text}</div>
                                            {#if child.desc}
                                                <div class="text-xs text-gray-500 dark:text-zinc-500 mt-0.5">{child.desc}</div>
                                            {/if}
                                        </a>
                                    {/each}
                                </div>
                            </div>
                        {/if}
                    </div>
                {:else if opt.link}
                    <a
                        href={opt.link}
                        class="inline-flex items-center px-3 py-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-sm"
                    >
                        {opt.text}
                    </a>
                {/if}
            {/each}

            <select
                bind:value={$language}
                on:change={(event) => changeLanguage(event.currentTarget.value)}
                class="ml-2 border-none rounded-md bg-transparent text-sm font-semibold focus:ring-0 cursor-pointer"
            >
                <option value="fr" class="text-black">Fr</option>
                <option value="en" class="text-black">En</option>
                <option value="es" class="text-black">Es</option>
            </select>

            <button
                type="button"
                on:click={() => theme.update((v) => (v === 'dark' ? 'light' : 'dark'))}
                title={$theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
                aria-label="Toggle theme"
                class="inline-flex items-center justify-center w-9 h-9 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
                {#if $theme === 'dark'}
                    <!-- Sun: switch to light -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                {:else}
                    <!-- Moon: switch to dark -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                {/if}
            </button>
        </div>

        <!-- Desktop CTAs -->
        <div class="hidden lg:flex items-center gap-3">
            <a
                href="/mi/admin/login"
                title="Admin"
                aria-label="Admin"
                class="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-300/40 dark:border-zinc-700 hover:border-[#febd17] hover:bg-[#febd17]/10 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </a>
            <a
                href="/soumission"
                class="inline-flex items-center gap-2 rounded-lg bg-[#febd17] hover:bg-[#e5aa10] text-black px-4 py-2 font-bold text-sm transition-colors shadow-md"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Soumission
            </a>
            <a
                href="tel:+15148309973"
                class="inline-flex items-center font-bold hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-sm"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +1 (514) 830-9973
            </a>
        </div>
    </div>

    <!-- Mobile drawer -->
    {#if showMenu}
        <div
            class="lg:hidden mt-3 font-bold bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 rounded-b-2xl shadow-2xl max-h-[calc(100vh-5rem)] overflow-y-auto"
        >
            <div class="py-3 px-4">
                {#each menuOptions as opt (opt.text)}
                    {#if opt.children && opt.children.length > 0}
                        <div class="border-b border-gray-100 dark:border-zinc-800 last:border-b-0">
                            <button
                                type="button"
                                on:click={() => toggleMobile(opt.text)}
                                class="w-full flex items-center justify-between p-3 text-left text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                            >
                                <span class="text-sm">{opt.text}</span>
                                <svg
                                    class="h-4 w-4 text-gray-400 transition-transform {openMobile[opt.text] ? 'rotate-180' : ''}"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {#if openMobile[opt.text]}
                                <div class="pl-3 pb-2">
                                    {#each opt.children as child}
                                        <a
                                            href={child.link}
                                            on:click={closeMenu}
                                            class="block p-2.5 pl-4 text-sm font-medium text-gray-700 dark:text-zinc-300 hover:bg-[#febd17]/10 rounded-lg transition-colors"
                                        >
                                            {child.text}
                                            {#if child.desc}
                                                <span class="block text-[11px] font-normal text-gray-500 dark:text-zinc-500 mt-0.5">{child.desc}</span>
                                            {/if}
                                        </a>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    {:else if opt.link}
                        <a
                            href={opt.link}
                            on:click={closeMenu}
                            class="block p-3 text-sm text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-lg transition-colors border-b border-gray-100 dark:border-zinc-800 last:border-b-0"
                        >
                            {opt.text}
                        </a>
                    {/if}
                {/each}

                <!-- Mobile CTAs -->
                <div class="mt-3 pt-3 border-t border-gray-200 dark:border-zinc-800 space-y-2">
                    <a
                        href="/mi/admin/login"
                        on:click={closeMenu}
                        class="flex items-center justify-center gap-2 border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 p-3 rounded-lg text-sm font-bold transition-colors hover:border-[#febd17] hover:bg-[#febd17]/10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Admin
                    </a>
                    <a
                        href="/soumission"
                        on:click={closeMenu}
                        class="flex items-center justify-center gap-2 bg-[#febd17] hover:bg-[#e5aa10] text-black p-3 rounded-lg text-sm font-bold transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Demander une soumission
                    </a>
                    <a
                        href="tel:+15148309973"
                        on:click={closeMenu}
                        class="flex items-center justify-center gap-2 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white p-3 rounded-lg text-sm font-bold transition-colors hover:bg-gray-50 dark:hover:bg-zinc-800"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        +1 (514) 830-9973
                    </a>
                    <button
                        type="button"
                        on:click={() => theme.update((v) => (v === 'dark' ? 'light' : 'dark'))}
                        class="flex items-center justify-center gap-2 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white p-3 rounded-lg text-sm font-bold transition-colors hover:bg-gray-50 dark:hover:bg-zinc-800"
                    >
                        {#if $theme === 'dark'}
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            Mode clair
                        {:else}
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                            Mode sombre
                        {/if}
                    </button>
                    <select
                        bind:value={$language}
                        on:change={(event) => changeLanguage(event.currentTarget.value)}
                        class="w-full p-3 border border-gray-200 dark:border-zinc-800 rounded-lg bg-transparent text-gray-900 dark:text-white text-sm font-bold focus:ring-0"
                    >
                        <option value="fr" class="text-black">Français</option>
                        <option value="en" class="text-black">English</option>
                        <option value="es" class="text-black">Español</option>
                    </select>
                </div>
            </div>
        </div>
    {/if}
</nav>
