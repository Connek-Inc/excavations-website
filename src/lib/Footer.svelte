<script>
    import { language } from "./store/store";
</script>


<div class="bg-gray-600 flex flex-col justify-center items-center py-12 text-white">
    {#if $language == 'en'}
    <p>
        Written by Connek
    </p>
    <p>
        All rights reserved
    </p>
    {:else}
    <p>
        Écrit par Connek
    </p>
    <p>
        Tous droits réservés
    </p>
    {/if}
</div>