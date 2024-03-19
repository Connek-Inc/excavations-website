<script>
    export let title;
    export let logos;
</script>


<div class="flex md:flex-row flex-col items-center justify-between">

    <div class="">
    
        <h1 class="h1 opacity-50 text-gray md:p-12 pt-4">{title}</h1>
    
    </div>
    
    <div class="flex justify-center items-center w-full px-4">
    
        {#each logos as logo}
    
            <div class="flex flex-col justify-center lg:h-48 lg:w-48 h-36 w-36">
                <img src="{logo.logo}" class="" alt=""> 
                <p class="text-center pt-4 opacity-70">{logo.name? logo.name : ''}</p>
            </div>
    
        {/each}
        
    </div>

</div>