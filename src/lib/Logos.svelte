<script>
    export let title;
    export let logos;
</script>


<div class="flex items-center justify-between">

    <div class="">
    
        <h1 class="h1 opacity-50 text-gray p-12">{title}</h1>
    
    </div>
    
    <div class="flex justify-center items-center w-full">
    
        {#each logos as logo}
    
            <div class="flex flex-col justify-center md:h-48 md:w-48 h-24 w-24">
                <img src="{logo.logo}" class="" alt=""> 
                <p class="text-center pt-4 opacity-70">{logo.name? logo.name : ''}</p>
            </div>
    
        {/each}
        
    </div>

</div>