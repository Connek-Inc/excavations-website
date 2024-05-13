<script>
    import ImageSlideshow from '$lib/ImageSlideshow.svelte';
    import { getContext } from 'svelte';
    import { language } from './store/store';

    export let galleryImages;

    export let midText;
    export let leftText;
    export let rightText;

    //const language = getContext('language')
    let titleComponent

    if ($language=='en') {
        titleComponent = 'About Us'
    } else if ($language=='fr') {
        titleComponent = 'À propos'
    }

</script>
    
    
<div id="about-us" class='flex justify-center items-center md:p-24 p-8'>
    <div class="grid grid-cols-1 lg:grid-cols-[2fr_3fr] w-full">
        

        <div class='flex flex-col md:gap-16 gap-8'>
            <h1 class="h1 font-bold">{titleComponent}</h1>
            <p class='lg:px-0 text-justify md:text-base text-sm'>{midText}</p>
        </div>

        <div>
            <ImageSlideshow slideShowImages={galleryImages} intervalSeconds={2}/>
        </div>

    </div>
</div>

