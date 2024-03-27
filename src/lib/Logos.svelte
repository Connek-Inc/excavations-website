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
    logosOnScreen = 5
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

<div class="grid grid-cols-1 md:flex items-center justify-between">

    <div class="">
    
        <h1 class="h1 opacity-50 text-gray md:p-12 pt-4">{title}</h1>
    
    </div>
    
    <div class="overflow-hidden w-full">
        
        <div class="{sliderStyle}">

            {#each logosAnimation as logo}
        
                <div class="flex flex-col justify-center items-center 
                    w-[{oneLogoWidth*100}%] h-[{oneLogoWidth*100}%]
                    max-w-24 max-h-24 md:max-h-48 md:max-w-48">
                    <img src="{logo.logo}" class="" alt=""> 
                    <p class="text-center pt-4 opacity-70">{logo.name? logo.name : ''}</p>
                </div>
        
            {/each}
        </div>
        
    </div>

</div>