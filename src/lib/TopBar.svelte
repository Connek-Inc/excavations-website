<script>
    
    import { getContext } from "svelte";
    // Implement photos changing in the background
    export let menuOptions;
    export let logo;
    
    const language = getContext('language')


</script>


<!-- bg-gradient-to-b from-black to-[#ffff00] -->
<div class="fixed flex text-white justify-between top-0 left-0 w-full z-30 bg-[#febd17]">
    <div class="w-36 h-full pb-0 pl-4">
        <a href="#home">
            <img class="h-full w-full" src={logo} alt="">
        </a>
        <!-- <div class="text-3xl">
            {logo}
        </div> -->
    </div>
    <div class="flex flex-row justify-center items-center md:text-2xl sm:text-lg font-bold">
        {#each menuOptions as opt}
            <a href="{opt.link}">
                <div class="text-black sm:p-4 p-2 sm:px-8 rounded hover:bg-black hover:text-white">{opt.text}</div>
            </a>
        {/each}    
    </div>
</div>

<style> 
  /* Custom class for the top inner shadow */
  .top-inner-shadow {
    box-shadow: inset 0 8px 16px -8px rgba(0, 0, 0, 1);
  }
</style>