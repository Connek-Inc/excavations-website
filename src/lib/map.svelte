<script>
	import { language } from '$lib/store/store.js'

</script>

<div class="container py-10 px-10 mx-0 min-w-full flex flex-col items-center bg-white dark:bg-black transition-colors duration-300">
    {#if $language == 'en' }
        <h2 class="text-5xl mb-3 text-black dark:text-white font-bold tracking-tight">Location</h2>
    {:else}
        <h2 class="text-5xl mb-3 text-black dark:text-white font-bold tracking-tight">Emplacement</h2>
    {/if}
    
</div>
<div class="map-responsive">
    
    <iframe title="Mini Excavations Érable - Localisation Montréal Québec sur Google Maps"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1183.2234025592456!2d-73.45350570359973!3d45.49448531876793!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc905553064dc7f%3A0xa4c908350cd9c214!2sMini%20Excavation%20%C3%89rable!5e1!3m2!1ses-419!2sve!4v1714498727194!5m2!1ses-419!2sve" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
        >
    </iframe>
</div>

<style>
.map-responsive {
    overflow:hidden;
    padding-bottom:40%;
    position:relative;
    height:0;
}
.map-responsive iframe {
    left:0;
    top:0;
    height:100%;
    width:100%;
    position:absolute;
}
</style>
