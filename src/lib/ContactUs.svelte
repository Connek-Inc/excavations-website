<script lang="ts">
    import { contactUsSchema } from "$lib/yup/contactUsSchema";
    import { translate, formatBookedTimes } from "$lib/lib-utils"
    import { language } from "./store/store";
    import { trackContactFormSubmit } from "$lib/analytics/gtag";

    const today = new Date()
    export let nDays: number = 7;
    // let bookedTimes = []
    let formData = {
        name: '',
        email: '',
        phone: '',
        messageText: '',
        bookedTimes: []
    }
    let formDataValid = {
        name: false,
        email: false,
        phone: false,
        messageText: false,
        bookedTimes: true
    }

    // Initial validation on load
    $: if (formData.name) onChangeValidation('name')
    $: if (formData.email) onChangeValidation('email')
    $: if (formData.phone) onChangeValidation('phone')
    $: if (formData.messageText) onChangeValidation('messageText')

    // Reactive validation
    $: formDataValid.name = formData.name ? formDataValid.name : false
    $: formDataValid.email = formData.email ? formDataValid.email : false
    $: formDataValid.phone = formData.phone ? formDataValid.phone : false
    $: formDataValid.messageText = formData.messageText ? formDataValid.messageText : false



    function getNextFourteenDays(inputDate, n) {
        
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        let datesArray = [];
        
        for (let i = 0; i < n; i++) {
            let currentDate = new Date(inputDate);
            currentDate.setDate(currentDate.getDate() + i);
            
            let formattedDate = currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
            let dayOfWeek = days[currentDate.getDay()];
            
            datesArray.push({ date: formattedDate, day: dayOfWeek });
        }
        
        return datesArray;
    }
    // const calendarWeeks = getTwoWeeksFromDate(today)
    const calendarWeeks = getNextFourteenDays(today, nDays)
    const blockedDays = ['March 19_noon']

    

    // Handle calendar time click
    const onClickDay = (e) => {

        if (formData.bookedTimes.includes(e.target.id) | blockedDays.includes(e.target.id)) {
            // Remove form bookedTimes
            formData.bookedTimes = formData.bookedTimes.filter(x => x !== e.target.id)
        } else {
            // Add time to bookedTimes
            formData.bookedTimes = [...formData.bookedTimes, e.target.id]
        }
    }

    // Validate contact form
    const onChangeValidation = async (inputName) => {
        try {
            await contactUsSchema.fields[inputName].validate(formData[inputName])
            formDataValid[inputName] = true
        } catch (err) {
            // console.log(err.name, err.errors)
            formDataValid[inputName] = false
        }
    }


    // Send notification of contact thru email
    let sending = false
    let errorMessage = ''
    let success = false

    const sendContactForm = async () => {
        if (sending) return;

        sending = true;
        errorMessage = '';
        success = false;

        try {
            const formattedTimes = formatBookedTimes(formData.bookedTimes, $language);
            const subject = `Nouveau contact — ${formData.name}`;
            const message = `Nom: ${formData.name}\nEmail: ${formData.email}\nTéléphone: ${formData.phone}\nLangue: ${$language}\n\nMessage:\n${formData.messageText}\n\nHoraires:\n${formattedTimes}`;

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    access_key: '0a8cc60e-d18a-4a90-95f5-ed29eccf6651',
                    subject,
                    from_name: 'Mini Excavations Érable - Site Web',
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message
                })
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Submission failed');
            }

            success = true;

            // Google Ads conversion + GA4 lead event
            trackContactFormSubmit({
                value: 1.0,
                currency: 'CAD',
                lang: $language
            });

            formData = { name: '', email: '', phone: '', messageText: '', bookedTimes: [] };
            formDataValid = { name: false, email: false, phone: false, messageText: false, bookedTimes: true };

            setTimeout(() => { success = false; }, 5000);
        } catch (err: any) {
            console.error('Form submit error:', err);
            errorMessage = $language === 'en' ? `Error: ${err.message}` : `Erreur: ${err.message}`;
        } finally {
            sending = false;
        }
    };

</script>


<div id="contact" class="flex flex-col items-center justify-center bg-transparent py-16 w-full font-[sans-serif]">
    
    <!-- Modern Container with Glassmorphism/Dark Theme Card style -->
    <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="text-center mb-16 space-y-4">
            <h2 class="text-4xl md:text-5xl font-black text-black dark:text-white tracking-tight uppercase">
                {#if $language == 'en'}
                    Contact <span class="text-[#febd17]">Us</span>
                {:else if $language == 'es'}
                    Contácta<span class="text-[#febd17]">nos</span>
                {:else}
                    Contactez-<span class="text-[#febd17]">Nous</span>
                {/if}
            </h2>
            <div class="h-1 w-24 bg-[#febd17] mx-auto rounded-full"></div>
            <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {#if $language == 'en'}
                    Ready to start your project? Fill out the form or book a call directly.
                {:else if $language == 'es'}
                    ¿Listo para comenzar su proyecto? Complete el formulario o reserve una llamada directamente.
                {:else}
                    Prêt à commencer votre projet ? Remplissez le formulaire ou réservez un appel directement.
                {/if}
            </p>
        </div>


        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            <!-- Left Column: Contact Form -->
            <div class="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl dark:shadow-none border border-gray-100 dark:border-zinc-800 transition-all duration-300 hover:border-[#febd17]/30">
                <div class="mb-8">
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                         {#if $language == 'en'}
                            Get a Quote
                        {:else if $language == 'es'}
                            Obtenga una Cotización
                        {:else}
                            Obtenez une Soumission
                        {/if}
                    </h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                        {#if $language == 'en'}
                            Fill in your details and we'll get back to you shortly.
                        {:else if $language == 'es'}
                            Complete sus datos y nos pondremos en contacto con usted en breve.
                        {:else}
                            Remplissez vos coordonnées et nous vous répondrons sous peu.
                        {/if}
                    </p>
                </div>

                <div class="space-y-6">
                    <!-- Form Fields -->
                    {#if $language == 'en'}
                        <div class="group">
                            <label for="name" class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#febd17] transition-colors">Name</label>
                            <input type="text" name="name" id="name" placeholder='Your Name' required 
                                bind:value={formData.name}
                                on:input={() => onChangeValidation("name")}
                                class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none"
                            >
                        </div>
                        <div class="group">
                            <label for="email" class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#febd17] transition-colors">Email</label>
                            <input type="email" name="email" id="email" placeholder='john@example.com' required 
                                bind:value={formData.email}    
                                on:input={() => onChangeValidation("email")}
                                class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none"
                            >
                        </div>
                        <div class="group">
                             <label for="phone" class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#febd17] transition-colors">Phone</label>
                            <input type="tel" name="phone" id="phone" placeholder='(555) 123-4567' required 
                                bind:value={formData.phone}    
                                on:input={() => onChangeValidation("phone")}
                                class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none"
                            >
                        </div>
                        <div class="group">
                            <label for="message" class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#febd17] transition-colors">Message</label>
                            <textarea rows="4" name="message" id="message" placeholder='Tell us about your project (min 30 chars)...' required 
                                bind:value={formData.messageText}
                                on:input={() => onChangeValidation("messageText")}
                                class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none resize-none"
                            ></textarea>
                            <div class="text-right text-xs mt-1 {formData.messageText.length >= 30 ? 'text-green-500' : 'text-gray-400'}">
                                {formData.messageText.length} / 30
                            </div>
                        </div>
                    {:else if $language == 'es'}
                        <div class="group">
                            <label for="name" class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#febd17] transition-colors">Nombre</label>
                            <input type="text" name="name" id="name" placeholder='Su Nombre' required 
                                bind:value={formData.name}
                                on:input={() => onChangeValidation("name")}
                                class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none"
                            >
                        </div>
                        <div class="group">
                            <label for="email" class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#febd17] transition-colors">Correo Electrónico</label>
                            <input type="email" name="email" id="email" placeholder='juan@ejemplo.com' required 
                                bind:value={formData.email}    
                                on:input={() => onChangeValidation("email")}
                                class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none"
                            >
                        </div>
                        <div class="group">
                             <label for="phone" class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#febd17] transition-colors">Teléfono</label>
                            <input type="tel" name="phone" id="phone" placeholder='(555) 123-4567' required 
                                bind:value={formData.phone}    
                                on:input={() => onChangeValidation("phone")}
                                class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none"
                            >
                        </div>
                        <div class="group">
                            <label for="message" class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#febd17] transition-colors">Mensaje</label>
                            <textarea rows="4" name="message" id="message" placeholder='Cuéntenos sobre su proyecto (mín 30 car.)...' required 
                                bind:value={formData.messageText}
                                on:input={() => onChangeValidation("messageText")}
                                class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none resize-none"
                            ></textarea>
                            <div class="text-right text-xs mt-1 {formData.messageText.length >= 30 ? 'text-green-500' : 'text-gray-400'}">
                                {formData.messageText.length} / 30
                            </div>
                        </div>
                    {:else}
                         <div class="group">
                            <label for="name" class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#febd17] transition-colors">Nom</label>
                            <input type="text" name="name" id="name" placeholder='Votre Nom' required 
                                bind:value={formData.name}
                                on:input={() => onChangeValidation("name")}
                                class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none"
                            >
                        </div>
                        <div class="group">
                            <label for="email" class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#febd17] transition-colors">Courriel</label>
                            <input type="email" name="email" id="email" placeholder='jean@exemple.com' required 
                                bind:value={formData.email}    
                                on:input={() => onChangeValidation("email")}
                                class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none"
                            >
                        </div>
                        <div class="group">
                             <label for="phone" class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#febd17] transition-colors">Téléphone</label>
                            <input type="tel" name="phone" id="phone" placeholder='(555) 123-4567' required 
                                bind:value={formData.phone}    
                                on:input={() => onChangeValidation("phone")}
                                class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none"
                            >
                        </div>
                        <div class="group">
                            <label for="message" class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#febd17] transition-colors">Message</label>
                            <textarea rows="4" name="message" id="message" placeholder='Parlez-nous de votre projet (min 30 car.)...' required 
                                bind:value={formData.messageText}
                                on:input={() => onChangeValidation("messageText")}
                                class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none resize-none"
                            ></textarea>
                            <div class="text-right text-xs mt-1 {formData.messageText.length >= 30 ? 'text-green-500' : 'text-gray-400'}">
                                {formData.messageText.length} / 30
                            </div>
                        </div>
                    {/if}
                </div>
            </div>


            <!-- Right Column: Calendar & Submit -->
            <div class="flex flex-col space-y-8">
                
                <!-- Calendar Card -->
                <div class="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl dark:shadow-none border border-gray-100 dark:border-zinc-800 transition-all duration-300 hover:border-[#febd17]/30">
                    <div class="mb-8">
                        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                             {#if $language == 'en'}
                                Book a Call
                             {:else if $language == 'es'}
                                Reservar una Llamada
                             {:else}
                                Réserver un Appel
                             {/if}
                        </h3>
                         <p class="text-sm text-gray-500 dark:text-gray-400">
                             {#if $language == 'en'}
                                Select available times below for us to call you.
                             {:else if $language == 'es'}
                                Seleccione los horarios disponibles a continuación para que lo llamemos.
                             {:else}
                                Sélectionnez ci-dessous les créneaux disponibles pour que nous vous appelions.
                             {/if}
                        </p>
                    </div>

                    <div class="grid grid-cols-2 lg:grid-cols-2 gap-4">
                        {#each calendarWeeks.slice(0, nDays) as day}
                             <div class="flex flex-col space-y-2">
                                <span class="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 ml-1">
                                    {translate(day.day, $language).slice(0, 3)} {day.date.split(' ')[1]}
                                </span>
                                
                                <button id={day.date + '_noon'}
                                    on:click={onClickDay}
                                    class="w-full py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 border 
                                    {formData.bookedTimes.includes(day.date+'_noon') 
                                        ? 'bg-[#febd17] border-[#febd17] text-black shadow-lg shadow-yellow-500/20 transform scale-105' 
                                        : blockedDays.includes(day.date+'_noon')
                                            ? 'bg-gray-100 dark:bg-zinc-800 border-transparent text-gray-400 cursor-not-allowed'
                                            : 'bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-300 hover:border-[#febd17] hover:text-[#febd17] active:scale-95'
                                    }"
                                    disabled={blockedDays.includes(day.date+'_noon')}
                                >
                                    {blockedDays.includes(day.date+'_noon')? '---' : translate('Noon', $language)}
                                </button>

                                <button id={day.date + '_afternoon'}
                                    on:click={onClickDay}
                                    class="w-full py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 border 
                                    {formData.bookedTimes.includes(day.date+'_afternoon') 
                                        ? 'bg-[#febd17] border-[#febd17] text-black shadow-lg shadow-yellow-500/20 transform scale-105' 
                                        : blockedDays.includes(day.date+'_afternoon')
                                            ? 'bg-gray-100 dark:bg-zinc-800 border-transparent text-gray-400 cursor-not-allowed'
                                            : 'bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-300 hover:border-[#febd17] hover:text-[#febd17] active:scale-95'
                                    }"
                                     disabled={blockedDays.includes(day.date+'_afternoon')}
                                >
                                    {blockedDays.includes(day.date+'_afternoon')? '---' : translate('Afternoon', $language)}
                                </button>
                             </div>
                        {/each}
                    </div>
                </div>

                <!-- Submit Button Area -->
                <div class="flex flex-col items-center">
                    {#if success}
                        <div class="mb-4 p-4 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 w-full rounded-2xl text-center animate-pulse">
                            <p class="font-bold">{$language === 'en' ? 'Success!' : ($language === 'es' ? '¡Éxito!' : 'Succès!')}</p>
                            <p class="text-sm">{$language === 'en' ? 'We will be in touch shortly.' : ($language === 'es' ? 'Nos pondremos en contacto en breve.' : 'Nous vous contacterons bientôt.')}</p>
                        </div>
                    {/if}

                    {#if errorMessage}
                         <div class="mb-4 p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 w-full rounded-2xl text-center">
                            <p class="font-bold">Error</p>
                            <p class="text-sm">{errorMessage}</p>
                        </div>
                    {/if}

                    <button type="button" on:click={() => sendContactForm()}
                        disabled={sending || !formDataValid.name || !formDataValid.email || !formDataValid.phone || !formDataValid.messageText}
                        class="w-full py-5 text-base font-bold text-black uppercase tracking-wider bg-[#febd17] hover:bg-[#e5aa15] rounded-xl shadow-lg shadow-yellow-500/20 transform hover:-translate-y-1 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-3">
                        
                        {#if sending}
                            <svg class="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>{$language == 'en' ? 'Sending...' : ($language === 'es' ? 'Enviando...' : 'Envoi...')}</span>
                        {:else}
                            <span>{$language == 'en' ? 'Send Request' : ($language === 'es' ? 'Enviar Solicitud' : 'Envoyer la Demande')}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        {/if}
                    </button>
                    <p class="mt-4 text-xs text-gray-400 text-center">
                        {$language == 'en' ? 'Protected by industry standard encryption.' : ($language === 'es' ? 'Protegido por cifrado estándar de la industria.' : 'Protégé par un cryptage standard de l\'industrie.')}
                    </p>
                </div>

            </div>

        </div>
    </div>
</div>
