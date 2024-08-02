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
    </script>


<!-- bg-gradient-to-b from-black to-[#ffff00] -->
<div class="fixed flex flex-wrap text-white justify-between top-0 left-0 w-full z-30 bg-[#febd17]">
    <div class="w-36 h-full pb-0 pl-4">
        <a href="../#home">
            <img class="h-full w-full items-center" src={logo} alt="mini excavations erable">
        </a>
        <!-- <div class="text-3xl">
            {logo}
        </div> -->
    </div>
    <div class="flex  items-center md:text-2xl font-bold bg-[#febd17]">
        {#each menuOptions as opt}
            <a href="../{opt.link}" class="h-full">
                <div class="h-full flex items-center hover:bg-black text-black sm:p-4 p-2 sm:px-8 rounded sm:text-lg hover:text-white text-sm">{opt.text}</div>
            </a>
        {/each}
        <a href="tel:15148309973" class="h-full text-white ">
            <div class="h-full flex items-center hover:bg-black text-black sm:p-4 p-2 sm:px-8 rounded sm:text-lg hover:text-white text-sm">+1 (514) 830-9973</div>
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
</div>

<style> 
  /* Custom class for the top inner shadow */
  .top-inner-shadow {
    box-shadow: inset 0 8px 16px -8px rgba(0, 0, 0, 1);
  }
</style>