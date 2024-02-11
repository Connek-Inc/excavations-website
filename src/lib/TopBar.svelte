<script>
    
    // Implement photos changing in the background
    export let menuOptions;

</script>


<div class="fixed flex flex-row text-white justify-between top-0 left-0 w-full bg-transparent z-30 p-4">
    <div>
        <div class="text-3xl">
            <!-- Alfaritos (logo) -->
        </div>
    </div>
    <div class="flex flex-row space-x-16 text-3xl font-bold">
        {#each menuOptions as opt}
            <div>{opt}</div>
        {/each}    
    </div>
</div>
