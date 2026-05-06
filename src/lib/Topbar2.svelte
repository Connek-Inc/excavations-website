<script>
    import { setContext, onMount } from 'svelte';
    import { getContext } from "svelte";
    // Implement photos changing in the background
    export let menuOptions;
    export let logo;
    import { language, theme } from './store/store';
    
    let lang
    language.subscribe(value => {
        lang = value
    })
    function changeLanguage(selectedLanguage) {
        language.update((value) => {
            return selectedLanguage;
        });

    } 
    
    function toggleTheme() {
        theme.update(current => current === 'dark' ? 'light' : 'dark');
    } 
    let showMenu = false;
    function closeMenu() {
        showMenu = false;
    }

    let isScrolled = false;

    onMount(() => {
        const handleScroll = () => {
            isScrolled = window.scrollY > 50;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });
</script>


<nav class="py-4 px-6 sm:px-8 lg:px-12 fixed top-0 left-0 w-full z-50 transition-all duration-300 {isScrolled ? ($theme === 'dark' ? 'bg-black shadow-lg text-white border-b border-zinc-800' : 'bg-[#febd17] shadow-lg text-black') : ($theme === 'dark' ? 'bg-transparent text-white' : 'bg-transparent text-black') }">
<div class="flex flex-wrap justify-between items-center">
  <div class="flex items-center w-full lg:w-auto justify-between lg:justify-start">
    <a href="/" class="flex items-center" on:click={closeMenu}>
      <img src={logo} alt="mini excavations erable" class="h-8 sm:h-10 mr-2">
      <span class="text-lg font-bold">Mini Excavations Erable</span>
    </a>
    <button on:click={() => (showMenu = !showMenu)} class="lg:hidden focus:outline-none transition-colors {isScrolled ? ($theme === 'dark' ? 'text-white' : 'text-black') : 'text-white'}" aria-label="Toggle Menu">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>
  <div class="hidden lg:flex items-center space-x-6 font-bold">
    {#each menuOptions as opt}
      <a href={opt.link} class="h-full">
        <div class="h-full flex items-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black sm:p-4 p-2 sm:px-8 rounded sm:text-lg transition-colors text-sm">{opt.text}</div>
      </a>
    {/each}
    <select bind:value={$language} on:change={(event) => changeLanguage(event.target.value)} class="border-none hover:border-none rounded-md selection:border-none m-2 bg-transparent focus:ring-0">
      <option value="en" class="text-black" selected={$language == 'en'}>En</option>
      <option value="fr" class="text-black" selected={$language == 'fr'}>Fr</option>
      <option value="es" class="text-black" selected={$language == 'es'}>Es</option>
    </select>
    
 
  </div>
  <div class="hidden lg:flex items-center">
    <a href="tel:15148309973" class="flex items-center font-bold hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      +1 (514) 830-9973
    </a>
  </div>
</div>
{#if showMenu}
  <div class="lg:hidden mt-4 font-bold bg-[#febd17] dark:bg-zinc-900 border-t border-black/10 dark:border-zinc-800 py-4 px-6 transition-colors duration-300">
    {#each menuOptions as opt}
      <a href={opt.link} class="block mb-2" on:click={closeMenu}>
        <div class="flex items-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black dark:text-white p-2 rounded text-sm transition-colors">{opt.text}</div>
      </a>
    {/each}
    <a href="tel:15148309973" on:click={closeMenu} class="block mb-2">
      <div class="flex items-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black dark:text-white p-2 rounded text-sm transition-colors">
        +1 (514) 830-9973
      </div>
    </a>
    <select bind:value={$language} on:change={(event) => changeLanguage(event.target.value)} class="border-none hover:border-none rounded-md selection:border-none text-black dark:text-white bg-transparent m-2 focus:ring-0">
      <option value="en" class="text-black" selected={$language == 'en'}>En</option>
      <option value="fr" class="text-black" selected={$language == 'fr'}>Fr</option>
      <option value="es" class="text-black" selected={$language == 'es'}>Es</option>
    </select>
    

  </div>
{/if}
</nav>
