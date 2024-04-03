<script>
    import { getContext } from 'svelte';

    export let galleryImages;
    export let title;
    export let text;

    const language = getContext('language')

</script>
    
<div id="about-us" style="position:relative; top:-100px;"></div>
<div id="about" class='flex justify-center items-center md:p-24 p-8'>
    <div class="grid grid-cols-1 lg:grid-cols-[2fr_3fr] w-full">
        

        <div class='flex flex-col md:gap-16 gap-8'>
            <h1 class="h1 font-bold">{title}</h1>
            <p class='lg:px-0 text-justify md:text-base text-sm'>{text}</p>
        </div>

        <div>
            <slot />
        </div>

    </div>
</div>

