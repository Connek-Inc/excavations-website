<script>
    export let partners
</script>


<div class="flex items-center">

    <div class="">
    
        <h1 class="h1 opacity-50 text-gray p-12">Partenaires</h1>
    
    </div>
    
    <div class="flex justify-around items-center w-full">
    
        {#each partners as par}
    
            <div class="flex items-center md:h-48 md:w-48 h-24 w-24 grayscale">
                <img src="{par.logo}" class="" alt=""> 
                <!-- <p class="text-center">{par.name}</p> -->
            </div>
    
        {/each}
        
    </div>

</div>