<script>

    export let mainTitle;
    export let subtitle;
    export let logo;
    export let bannerImage;

    // Animation
    export let bannerImages;

</script>


<div class="h-screen w-full flex justify-center items-center m-auto overflow-x-hidden">
    <div class="text-center text-white flex flex-col">
        
        <div class="">
            <div class="relative w-screen h-screen overflow-hidden">
                {#each bannerImages as image}
                    <img
                        class="absolute animatingImage z-0 w-full h-screen" 
                        src="{image}" 
                        alt="banner">    
                {/each}
                <!-- <img
                    class="absolute animatingImage z-0 w-full h-screen object-fit" 
                    src="{bannerImage}" 
                    alt="banner"> -->
                <div class="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-60 z-10"></div>
            </div>
            
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
                
                <div class="mt-8">
                    <button class="rounded-md bg-[#febd17] text-black text-lg font-semibold py-4 px-16">Contact us</button>
                </div>

            </div>

            
        </div>
        
        

        
    </div>
</div>

<style>
  /* Custom animation keyframes for zooming out the image */
  @keyframes zoomIn {
    0% {
      transform: scale(1); /* Start first image at 100%*/
      opacity: 1;
    }

    50% {
      transform: scale(1.5); /* Zoom in */
      opacity: 1;
    }

    51% {
      transform: scale(1.5); /* Zoom in */
      opacity: 0;
    }

    100% {
      transform: scale(1); /* End first Image at 100% hidden */
      opacity: 0;
    }
  }

  .animatingImage {
    /* Add the animation properties */
    animation: zoomIn 20s ease-in-out infinite; /* Animation runs for 5 seconds */
  }

  .animatingImage:nth-child(2) {
    animation-delay: 10s; /* Start the second image's animation when the first is halfway done */
  }

</style>