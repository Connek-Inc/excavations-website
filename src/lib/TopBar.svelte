<script lang="ts">
    
    import { getContext, onMount, onDestroy, setContext } from "svelte";
    // Implement photos changing in the background
    export let menuOptions;
    export let logo;
    
    const language = getContext('language')
    const theme = getContext('theme')
    const primaryColor = theme.primary

    let topBar: HTMLElement | undefined = undefined;
    let topBar2: HTMLElement | undefined = undefined;
	export let topBarHeight: string | number | undefined;
    let isMdOrLarger: boolean = false;

    

    function handleResize() {
        isMdOrLarger = window.innerWidth >= 768; // 'md' breakpoint in Tailwind CSS
        topBarHeight = topBar?.offsetHeight
        // console.log(`Height of the Top bar1: ${topBarHeight}`);
    }

	onMount(() => {
        if(topBar) {
            topBarHeight = topBar.offsetHeight
        }
        window.addEventListener('resize', handleResize);
        handleResize(); // Call it immediately on mount to check initial size
	});

    

</script>


<!-- bg-gradient-to-b from-black to-[#ffff00] -->
<div id="top-bar" class="fixed w-screen z-30 top-0 px-4 sm:px-8 left-0 bg-[{primaryColor}]" bind:this={topBar}>


    <div id="top-bar-1" class="flex justify-between w-full">

        <div id="top-bar-1-logo" class="w-36 h-auto">
            <a href="#home" class="">
                <img class="h-full w-full" src={logo} alt="">
            </a>
        </div>

        <div class="flex flex-row md:text-2xl sm:text-lg font-bold">
            {#each menuOptions as opt}
                <a href="{opt.link}" class="h-full">
                    <div class="h-full flex items-center hover:bg-black text-black sm:p-4 px-2 sm:px-8 rounded 
                        md:text-lg hover:text-white text-xs whitespace-nowrap"
                    >
                        {opt.text}
                    </div>
                </a>
            {/each}  
            {#if isMdOrLarger}
                <button>
                    <div class="text-center md:text-lg text-xs text-black font-bold">
                        <a href="tel:+15148309973">
                            +1 (514) 830-9973
                        </a>
                    </div>
                </button>
            {/if}
        </div>

    </div>

    {#if !isMdOrLarger}
        <div id="top-bar-2" class="flex justify-center items-center pb-2" bind:this={topBar2}>
            <div class="text-center text-black font-bold">
                <a href="tel:+15148309973">
                    +1 (514) 830-9973
                </a>
            </div>
            
        </div>
    {/if}
        
    
</div>


<style>
  /* Custom class for the top inner shadow */
  .top-inner-shadow {
    box-shadow: inset 0 8px 16px -8px rgba(0, 0, 0, 1);
  }
</style>