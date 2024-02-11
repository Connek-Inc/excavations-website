<script>

    export let mainTitle;
    export let subtitle;
    export let logo
    export let bannerImage


</script>


<div class="h-screen w-full flex justify-center items-center m-auto overflow-x-hidden">
    <div class="text-center text-white flex flex-col">
        
        <div class="relative w-screen h-screen">
            <img
                class="absolute z-0 w-full h-screen object-fit" 
                src="{bannerImage}" 
                alt="banner">
            <div class="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-60 z-10"></div>
            
            <div class="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-4">

                {#if logo}
                    <div id="logo">
                        Logo
                    </div>
                {/if}
                <div class="">
                    <h1 class="h1 font-bold">
                        {mainTitle}
                    </h1>
                </div>
                <div>
                    {subtitle}
                </div>
                
            </div>
            
        </div>
        
        

        
    </div>
</div>
