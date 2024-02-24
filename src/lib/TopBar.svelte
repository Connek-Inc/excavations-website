<script>
    
    // Implement photos changing in the background
    export let menuOptions;

</script>


<!-- bg-gradient-to-b from-black to-[#ffff00] -->
<div class="fixed flex text-white justify-between top-0 left-0 w-full z-30 bg-[#febd17]">
    <div>
        <div class="text-3xl">
            (logo)
        </div>
    </div>
    <div class="flex flex-row md:text-2xl sm:text-lg font-bold">
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