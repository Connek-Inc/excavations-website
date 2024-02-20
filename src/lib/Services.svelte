<script>

    export let services;
    // services.name
    // services.description

    import demolition from "$lib/images/demolition.jpg"
    import construction from "$lib/icons/construction.svg"


    const countServices = services.length

</script>


<div class="flex w-full bg-gray-200 px-16 py-12 justify-center items-center m-auto">
    <!-- <div class="text-black md:w-[70%] w-[90%] m-auto">
        hi
    </div> -->
    <div class="flex flex-col space-y-8 justify-center items-center md:w-[90%] lg:w[65%]">
        <!-- <p class="font-semibold">Services</p> -->

        <div class='grid grid-cols-1 md:grid-cols-2 xl:gap-x-32 md:gap-x-6 gap-x-2 gap-y-4'>

            {#each services as serv, i}
                

                <div class="card card-hover flex flex-col items-center justify-center rounded-lg shadow-md text-white 
                    {countServices==i+1? 'md:col-span-2 md:justify-self-center md:w-1/2': ''}">

                    <div class="bg-blue-500 h-[350px] w-full">
                        Image
                    </div>
                    <div class="bg-black flex flex-col items-center p-4 rounded-md w-full h-[60%]">
                        <div class="-translate-y-16 -mb-8">
                            <img src={construction} class="bg-white p-4 rounded-full h-24" alt="">
                        </div>
                        <div class="flex flex-col items-center">
                            <h2 class="h2 text-3xl font-bold text-[#febd17] mb-6">{serv.name.toUpperCase()}</h2>
                            <p class="lg:px-12 text-xl">{serv.description}</p>
                        </div>

                    </div>


                    <!-- <h2 class="h2 font-bold mb-2">{serv.name}</h2>
                    <img src="{demolition}" alt="Descriptive Alt Text" class="h-64 object-cover">
                    <p class='text-center'>
                        {serv.description}
                    </p> -->


                </div>



            {/each}
            
        </div>

    </div>

</div>