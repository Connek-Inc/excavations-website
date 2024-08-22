<script>
    import { setContext } from 'svelte';
    import { getContext } from "svelte";
    // Implement photos changing in the background
    export let menuOptions;
    export let logo;
    import { language  } from './store/store';
    
    let lang
    language.subscribe(value => {
        lang = value
    })
    function changeLanguage(selectedLanguage) {
        language.update((value) => {
            return selectedLanguage;
        });

    } 
    let showMenu = false;
    function closeMenu() {
        showMenu = false;
    }
</script>
  
  <nav class="bg-[#febd17] py-4 px-6 sm:px-8 md:px-12 fixed top-0 left-0 w-full z-50">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <a href="#" class="flex items-center">
          <img src={logo} alt="mini excavations erable" class="h-8 sm:h-10 mr-2">
          <span class="text-lg font-bold">Mini Excavations Erable</span>
        </a>
      </div>
      <div class="hidden sm:flex items-center space-x-6 font-bold">
        {#each menuOptions as opt}
            <a href="../{opt.link}" class="h-full">
                <div class="h-full flex items-center hover:bg-black text-black sm:p-4 p-2 sm:px-8 rounded sm:text-lg hover:text-white text-sm">{opt.text}</div>
            </a>
        {/each}
        <select bind:value={$language} on:change={(event) => changeLanguage(event.target.value)} class="border-none hover:border-none rounded-md selection:border-none text-black m-2">
            {#if $language == 'en'}
                <option value="en" selected>En</option>
                <option value="fr">Fr</option>
            {:else}
                <option value="en">En</option>
                <option value="fr" selected>Fr</option>
            {/if}
        </select> 
      </div>
      <div class="flex items-center">
        <a href="tel:15148309973" class="hidden sm:flex items-center font-bold hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          +1 (514) 830-9973
        </a>
        <button on:click={() => (showMenu = !showMenu)} class="sm:hidden focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
    {#if showMenu}
      <div class="sm:hidden mt-4 font-bold bg-[#febd17] py-4 px-6">
        {#each menuOptions as opt}
            <a href="../{opt.link}" class="h-full" on:click={closeMenu}>
                <div class="h-full flex items-center hover:bg-black text-black sm:p-4 p-2 sm:px-8 rounded sm:text-lg hover:text-white text-sm">{opt.text}</div>
            </a>
        {/each}
        
        
        <a href="tel:15148309973" on:click={closeMenu} class="h-full flex items-center hover:bg-black text-black sm:p-4 p-2 sm:px-8 rounded sm:text-lg hover:text-white text-sm">
            
            +1 (514) 830-9973
        </a>
        <select bind:value={$language} on:change={(event) => changeLanguage(event.target.value)} class="border-none hover:border-none rounded-md selection:border-none text-black m-2">
            {#if $language == 'en'}
                <option value="en" selected>En</option>
                <option value="fr">Fr</option>
            {:else}
                <option value="en">En</option>
                <option value="fr" selected>Fr</option>
            {/if}
        </select>
      </div>
    {/if}
  </nav>