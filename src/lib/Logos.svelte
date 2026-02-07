<script>
    export let title;
    export let logos;
</script>

<div class="flex flex-col items-center justify-between md:flex-row">
    <div class="w-full md:w-auto">
        <h1 class="h1 opacity-50 text-gray pt-4 md:p-12 text-center md:text-left">{title}</h1>
    </div>
    
    <div class="w-full px-4 mt-4 md:mt-0">
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:flex md:flex-wrap md:justify-center">
            {#each logos as logo}
                <div class="flex flex-col items-center justify-center p-2">
                    <img src="{logo.logo}" class="sm:h-36 sm:w-36 lg:h-48 lg:w-48 object-contain" alt="mini excavations erable"> 
                    <p class="text-center pt-4 font-bold opacity-70">{logo.name ? logo.name : ''}</p>
                </div>
            {/each}
        </div>
    </div>
</div>
