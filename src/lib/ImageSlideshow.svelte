<script lang="ts">

    export let slideShowImages;
    import { slide } from "svelte/transition";

    
    const imageHeight = 512
    const imageWidth = 1024


    let elemCarousel: HTMLDivElement;
    function carouselLeft(): void {
        const x =
            elemCarousel.scrollLeft === 0
                ? elemCarousel.clientWidth * elemCarousel.childElementCount // loop
                : elemCarousel.scrollLeft - elemCarousel.clientWidth/2; // step left
        elemCarousel.scroll(x, 0);
        // console.log(elemCarousel)

        // console.log('Client width:', elemCarousel.clientWidth)
        // console.log('Total scroll width:', elemCarousel.scrollWidth)
        // console.log('New scroll left position:', elemCarousel.scrollLeft)
        // console.log('Scrolling to the left:', x)
    }

    function carouselRight(): void {
        const x =
            elemCarousel.scrollLeft === elemCarousel.scrollWidth - elemCarousel.clientWidth
                ? 0 // loop
                : elemCarousel.scrollLeft + elemCarousel.clientWidth/2; // step right
        elemCarousel.scroll(x, 0);
    }

    // console.log(elemCarousel.clientWidth)

</script>



<div class="flex flex-col justify-center items-center">



    <div class="card p-4 grid grid-cols-[auto_1fr_auto] gap-16 items-center">
        <!-- Button: Left -->
        <button type="button" class="btn-icon variant-filled" on:click={carouselLeft}>
            <i class="fa-solid fa-arrow-left" />
        </button>

        <!-- Full Images -->
        <div bind:this={elemCarousel} class="snap-x snap-mandatory scroll-smooth flex gap-16 px-32 overflow-x-auto">
            {#each slideShowImages as image}
                <img
                    class="snap-center w-[{imageWidth}px] rounded-container-token"
                    src={image}
                    alt='idk'
                    loading="lazy"
                />
            {/each}
        </div>

        <!-- Button: Right -->
        <button type="button" class="btn-icon bg-blue-500" on:click={carouselRight}>
            <i class="fa-solid fa-arrow-right color-black" />
        </button>
    </div>




</div>
