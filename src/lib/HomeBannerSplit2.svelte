<script lang="ts">
  	import { onMount, getContext } from "svelte";


    export let title: string;
    export let text: string;
	export let logo: string;
    export let bannerImages: string[];

	let contentDiv: HTMLElement | null = null;
	let divHeight = 0
	let topPadding = getContext('topBarHeight')
	console.log(topPadding)

	onMount(() => {
		if (contentDiv) {	
			divHeight = contentDiv.offsetHeight + 100; // or use getBoundingClientRect()
			// console.log(`Height of the div: ${divHeight}px`);
		}

		
	});

	const topMargin = ''

</script>


<div id="contact" class="w-full overflow-x-hidden">

    <div class="relative text-center text-white flex flex-col min-h-screen h-[1000px] md:h-[800px] overflow-hidden">
	
		<div class="absolute top-0 left-0 right-0 bottom-0 w-screen min-h-screen overflow-hidden ">
			{#each bannerImages as image}
				<img
					class="absolute animatingImage z-0 w-full h-full" 
					src="{image}" 
					alt="banner">    
			{/each}
			<div class="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-60 z-10"></div>
		</div>
		
		<div class="absolute z-20 top-0 left-0 right-0 bottom-0 
			w-screen min-h-screen "
			bind:this={contentDiv}>
			

			<div class="absolute top-0 left-0 right-0 bottom-0 
				md:grid md:grid-cols-2 flex flex-col justify-center items-center min-h-screen w-full 
				h-auto md:h-screen md:p-16 p-8 mt-8 md:mt-0">
				<!-- pt-72 sm:pt-60 md:pt-16  -->
					<div id="left-content-homebanner" class="flex flex-col justify-center items-start md:pt-8 md:pr-8 w-full">

						<div>
							<img src="{logo}" alt="Logo" class="h-32 w-32">
						</div>	

						<div class="w-full text-left">
							<h1 class="h1 font-bold text-[#febd17]">
								{title}
							</h1>
						</div>
						<div>
							<p class="text-lg md:py-6 py-2">{text}</p>
						</div>

					</div>

					<div id="right-content-homebanner" class="w-full md:pt-16 pt-8">

						<slot />

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