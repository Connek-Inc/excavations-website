<script>
    import { language } from "./store/store";
</script>


<footer class="bg-gray-900 text-white dark:bg-black border-t border-gray-800 transition-colors duration-300">
    <div class="container mx-auto px-6 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            
            <!-- Brand Column -->
            <div class="flex flex-col items-center md:items-start space-y-4">
                <span class="text-2xl font-black uppercase tracking-tighter">
                    Mini Excavations <span class="text-[#febd17]">Érable</span>
                </span>
                <p class="text-gray-400 text-sm max-w-xs leading-relaxed">
                    {#if $language == 'en'}
                        Professional excavation, demolition, and drain services across Quebec. Quality and integrity guaranteed.
                    {:else if $language == 'es'}
                        Servicios profesionales de excavación, demolición y drenaje en todo Quebec. Calidad e integridad garantizadas.
                    {:else}
                        Services professionnels d'excavation, de démolition et de drainage à travers le Québec. Qualité et intégrité garanties.
                    {/if}
                </p>
            </div>

            <!-- Quick Links (Simulated for visual balance, or reused existing functionality) -->
            <div class="flex flex-col items-center md:items-start space-y-4">
                 <h4 class="font-bold uppercase tracking-wider text-[#febd17] text-sm">
                    {#if $language == 'en'} Quick Links {:else if $language == 'es'} Enlaces Rápidos {:else} Liens Rapides {/if}
                 </h4>
                 <nav class="flex flex-col space-y-2 text-sm text-gray-300">
                    <a href="#services" class="hover:text-white hover:underline decoration-[#febd17] underline-offset-4 transition-all">
                        {#if $language == 'en'} Services {:else if $language == 'es'} Servicios {:else} Services {/if}
                    </a>
                     <a href="#about-us" class="hover:text-white hover:underline decoration-[#febd17] underline-offset-4 transition-all">
                        {#if $language == 'en'} About Us {:else if $language == 'es'} Sobre Nosotros {:else} À Propos {/if}
                    </a>
                     <a href="#contact" class="hover:text-white hover:underline decoration-[#febd17] underline-offset-4 transition-all">
                        {#if $language == 'en'} Contact {:else if $language == 'es'} Contacto {:else} Contact {/if}
                    </a>
                 </nav>
            </div>

            <!-- Social & Contact -->
             <div class="flex flex-col items-center md:items-end space-y-6">
                <div class="flex space-x-6">
                    <a href="https://www.instagram.com/mini_excavation_erable?igsh=cnc2dzY5OGpjdGFs" target="_blank" rel="noopener noreferrer" class="group transition-transform hover:scale-110">
                        <svg class="h-6 w-6 text-gray-400 group-hover:text-[#E1306C] transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.315 2zm-1.2 1.8c-2.69 0-2.924.015-3.816.05-.88.04-1.35.2-1.668.32-.426.16-.73.34-1.042.66-.319.31-.502.61-.661 1.04-.124.31-.284.78-.324 1.66-.04.89-.05 1.13-.05 4.25s.01 3.35.05 4.25c.04.88.2 1.35.32 1.66.16.42.34.73.66 1.04.31.32.61.5.104.66.31.12.78.28 1.66.32 4.25.04 4.25.04 4.25.04s.01-3.35.05-4.25c.04-.88.2-1.35.32-1.66.16-.42.34-.73.66-1.04.32-.31.5-.61.66-1.04.12-.31.28-.78.32-1.66.04-.89.05-1.12.05-3.81 0-2.69-.01-2.93-.05-3.82-.04-.88-.2-1.35-.32-1.66a2.89 2.89 0 00-.66-1.04 2.89 2.89 0 00-1.04-.66c-.31-.12-.78-.28-1.66-.32-.9-.04-1.13-.05-3.82-.05z" clip-rule="evenodd" /></svg>
                    </a>
                    <a href="https://www.facebook.com/share/XDdWREBZZxgCwBnT/?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer" class="group transition-transform hover:scale-110">
                        <svg class="h-6 w-6 text-gray-400 group-hover:text-[#1877F2] transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
                    </a>
                    <a href="mailto:miniexcavationerable@gmail.com" target="_blank" rel="noopener noreferrer" class="group transition-transform hover:scale-110">
                         <svg class="h-6 w-6 text-gray-400 group-hover:text-[#febd17] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </a>
                </div>
                 <a href="tel:15148309973" class="text-sm font-bold text-gray-300 hover:text-[#febd17] transition-colors">
                     +1 (514) 830-9973
                </a>
            </div>
        </div>

        <div class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>
                &copy; {new Date().getFullYear()} Mini Excavations Érable. 
                {#if $language == 'en'} All rights reserved. {:else if $language == 'es'} Todos los derechos reservados. {:else} Tous droits réservés. {/if}
            </p>
            <p class="mt-2 md:mt-0 flex items-center">
                {#if $language == 'en'} Designed by {:else if $language == 'es'} Diseñado por {:else} Conçu par {/if}
                 <span class="font-bold text-[#febd17] ml-1">Connek</span>
            </p>
        </div>
    </div>
</footer>
