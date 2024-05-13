<script lang="ts">

    import { onMount } from "svelte";

    export let slideShowImages: string[];
    export let intervalSeconds: number = 5;
    let indexImage: number = 0 
    const nImages: number = slideShowImages.length


    onMount(() => {
    const interval = setInterval(() => {
        indexImage = (indexImage + 1) % nImages; // Cycle through the images
    }, intervalSeconds*1000); 

    return () => {
      clearInterval(interval); // Clean up the interval on component destroy
    };
  });
    


    import { slide } from "svelte/transition";

    




    // const imageHeight = '1024px'
    // const imageWidth = '1024px'

</script>



<div class="flex flex-col justify-center items-center lg:pl-24 w-full h-full">

    <div class="relative overflow-hidden w-full h-96 my-8 lg:my-0 ">
        {#each slideShowImages as image, i}
            <img
                src={image}
                alt= {`Image ${i + 1}`}
                class="w-full h-full object-cover absolute transition-opacity duration-1000"
                style:opacity="{i === indexImage ? '1' : '0'}" />
            <!-- <img src="{image}" class="object-cover w-full h-full" alt=""> -->
        {/each}
    </div>




</div>
