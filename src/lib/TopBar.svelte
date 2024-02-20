<script>
    
    // Implement photos changing in the background
    export let menuOptions;

</script>



<div class="fixed flex text-white justify-between top-0 left-0 w-full z-30 p-4 bg-gradient-to-b from-black to-transparent">
    <div>
        <div class="text-3xl">
            <!-- Alfaritos (logo) -->
        </div>
    </div>
    <div class="flex flex-row md:space-x-16 md:text-3xl space-x-8 sm:text-lg font-bold">
        {#each menuOptions as opt}
            <div>{opt}</div>
        {/each}    
    </div>
</div>

<style> 
  /* Custom class for the top inner shadow */
  .top-inner-shadow {
    box-shadow: inset 0 8px 16px -8px rgba(0, 0, 0, 1);
  }
</style>