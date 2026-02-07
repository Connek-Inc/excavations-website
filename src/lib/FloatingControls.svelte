<script>
    import { theme } from './store/store';
    import { onMount } from 'svelte';

    let mounted = false;
    onMount(() => {
        mounted = true;
    });

    function toggleTheme() {
        theme.update(current => current === 'dark' ? 'light' : 'dark');
    }
</script>

{#if mounted}
    <div class="fixed right-6 bottom-6 z-50 flex flex-col gap-4">
        
        <!-- Floating Theme Toggle -->
        <button on:click={toggleTheme} 
            class="p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110
            {$theme === 'dark' ? 'bg-zinc-800 text-[#febd17] border border-zinc-700 hover:shadow-[#febd17]/20' : 'bg-white text-orange-500 border border-gray-100 hover:shadow-orange-500/20'}"
            aria-label="Toggle Theme">
            {#if $theme === 'dark'}
                <!-- Sun Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            {:else}
                <!-- Moon Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            {/if}
        </button>

         <!-- Floating Call Button -->
         <a href="tel:15148309973" 
            class="p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center
            bg-[#febd17] text-black border border-[#e5aa15] hover:shadow-yellow-500/40 relative group"
            aria-label="Call Us">
            
            <span class="absolute right-full mr-4 bg-black text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                Call Us
            </span>

            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.43-5.15-3.75-6.58-6.59l1.97-1.57c.3-.24.39-.65.24-1.01a17.27 17.27 0 01-.56-3.53.987.987 0 00-1-1H4.05a1.006 1.006 0 00-1 1c0 8.84 7.16 16 16 16 .55 0 1-.45 1-1v-3.95c0-.55-.45-1-1-1zM5.03 5h1.5a15.22 15.22 0 00.41 2.7l-1.12.89C5.38 7.37 5.16 6.21 5.03 5zm13.97 13.97c-1.21-.13-2.37-.35-3.48-.8l.89-1.12c.96.2 1.88.35 2.7.41v1.51z"/>
            </svg>
        </a>

    </div>
{/if}
