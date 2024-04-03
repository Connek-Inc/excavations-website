<script lang="ts">

    import { onMount } from "svelte"

    export let title: string;
    export let logos;
    export let logosOnScreen: number;

    let logosAnimation;
    let logosWidth: number;
    let oneLogoWidth: number;
    let sliderStyle: string;
    let animationBool: boolean = true
    let logosCount: number;

    logosCount = logos.length
    logosOnScreen = 4
    animationBool = (logosCount > logosOnScreen? true : false)


    if (animationBool) {
        logosAnimation = [...logos, ...logos]
        logosWidth = logosCount / logosOnScreen
        oneLogoWidth = 1 / logosOnScreen
        sliderStyle = `slider flex w-[${logosWidth*100*2}%] items-center`
        console.log(sliderStyle)
    } else {
        logosAnimation = logos
        logosWidth = 1
        oneLogoWidth = 1 / logosCount
        sliderStyle = `flex justify-around ` 
        console.log('FALSE', sliderStyle)
    }
    

    console.log('ANIMATION:', animationBool)
    


</script>


<style>
    @keyframes slide-infinite {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-50%);
        }
    }

    .slider {
        animation: slide-infinite 60s linear infinite;
    } 
</style>

<div class="grid grid-cols-1 md:flex items-center justify-between px-4">

    <div class="">
    
        <h1 class="h1 opacity-50 text-gray md:p-12 pt-4">{title}</h1>
    
    </div>
    
    <div class="overflow-hidden w-full px-8 py-2">
        
        <div class="{sliderStyle} gap-4">

            {#each logosAnimation as logo}
                <div class="grid grid-rows-[3fr_auto] place-items-center">
                    <img src="{logo.logo}" class="object-fit max-w-20 max-h-20 md:max-h-24 md:max-w-24 lg:max-h-32 lg:max-w-32" alt=""> 
                    <div class="h-6">
                        <p class="text-center text-xs md:text-sm w-full row-span-1 h-auto">{logo.name? logo.name : ''}</p>
                    </div>
                </div>
            {/each}
        </div>
        
    </div>

</div>