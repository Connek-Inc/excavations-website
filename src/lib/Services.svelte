<script>

export let services;

import demolition from "$lib/images/demolition.jpg"

</script>


<div class="flex w-full bg-gray-200 px-16 py-12 justify-center items-center m-auto">
    <!-- <div class="text-black md:w-[70%] w-[90%] m-auto">
        hi
    </div> -->
    <div class="flex flex-col space-y-8 justify-center items-center md:w-[80%] w-[90%]">
        <p class="font-semibold">Services</p>

        <div class='grid md:grid-cols-2 gap-x-4 gap-y-4'>

            {#each services as serv}
                
                <div class='card flex flex-col items-center justify-center rounded-lg shadow-md p-8'>
                    <h2 class="h2 font-bold mb-2">{serv.name}</h2>
                    <img src="{demolition}" alt="Descriptive Alt Text" class="h-64 object-cover">
                    <p class='text-center'>
                        {serv.description}
                    </p>
                </div>

            {/each}
            
        </div>

    </div>

</div>