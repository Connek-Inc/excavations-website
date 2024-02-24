<script>
    export let partners
</script>


<div class="flex items-center">

    <div class="">
    
        <h1 class="h1 opacity-50 text-gray p-12">Partners</h1>
    
    </div>
    
    <div class="flex justify-around w-full">
    
        {#each partners as par}
    
            <div class="md:h-48 md:w-48 h-24 w-24 mt-12 grayscale">
                <img src="{par.logo}" class="" alt=""> 
                <!-- <p class="text-center">{par.name}</p> -->
            </div>
    
        {/each}
        
    </div>

</div>