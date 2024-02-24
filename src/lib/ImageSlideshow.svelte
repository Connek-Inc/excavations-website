<script lang="ts">

    export let slideShowImages;
    import { slide } from "svelte/transition";

    
    // const imageHeight = '1024px'
    // const imageWidth = '1024px'

</script>



<div class="flex flex-col justify-center items-center lg:pl-24 w-full h-full">

    <div class="overflow-hidden h-full w-full">
        <img src="{slideShowImages[0]}" class="my-16 lg:my-0 object-cover w-full h-full" alt="">
    </div>




</div>
