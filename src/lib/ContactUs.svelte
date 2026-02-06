<script lang= 'ts'>
    import { goto } from "$app/navigation";
    import { getContext } from "svelte";
    import { contactUsSchema } from "$lib/yup/contactUsSchema";
    import { translate } from "$lib/utils"
    import { language } from "./store/store";
    //const language = getContext('language')

    let contactTitle;
    let calendarTitle;
    let calendarSubtitle;
    let formLabels;
    let sendButton;

    if ($language=='en') {
        contactTitle = 'Contact for a quote.'
        calendarTitle = 'Book a call for a quote'
        calendarSubtitle = 'Below are our times available. Choose your times and we will give you a call.' 
        formLabels = {
            name: 'Name',
            email: 'Email',
            phone: 'Phone',
            messageText: 'Message (minimum 30 characters)',
        }
        sendButton = 'Send'
    } else if ($language=='fr') {
        contactTitle = 'Contactez-nous pour une soumission.'
        calendarTitle = 'Réservez un appel pour une soumission';
        calendarSubtitle = 'Ci-dessous se trouvent nos créneaux disponibles. Choisissez votre horaire et nous vous appellerons.';
        formLabels = {
            name: 'Nom',
            email: 'Courriel',
            phone: 'Téléphone',
            messageText: 'Message (minimum 30 caractères)',
        };
        sendButton = 'Envoyer'
    }

    const today = new Date()
    export let nDays = 7;
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
        
        
        console.log('days', nDays)
    }

    // Change button color with clicks 
    $: buttonColor = (id) => {

        const first = 'text-left h-6 w-full max-w-24 p-1 mb-1 text-xs rounded-md '

        if (formData.bookedTimes.includes(id)) {  //Seleccionado
            
            return first + 'bg-yellow-500 text-white'

        } else if (blockedDays.includes(id)) { //Grey, not selectable

            return first + 'bg-gray-500 cursor-default active:shadow-inner transform active:-translate-y-1 transition duration-150 ease-in-out'

        } else { // El normal
            // hover:bg-yellow-500 hover:text-black
            return first + 'bg-black text-white'

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
        
        console.log('--- FORM SUBMIT V4 START ---');
        sending = true;
        errorMessage = '';
        success = false;

        try {
            console.log('Data to send:', formData);

            const response = await fetch('/send-contact-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ formData })
            });

            console.log('Response status:', response.status);
            
            const payload = await response.json();
            console.log('Result from server:', payload);

            if (!response.ok || payload?.success === false) {
                throw new Error(payload?.error || 'Server error');
            }
            
            success = true;
            formData = { name: '', email: '', phone: '', messageText: '', bookedTimes: [] };
            formDataValid = { name: false, email: false, phone: false, messageText: false, bookedTimes: true };
            
            console.log('--- FORM SUBMIT V4 SUCCESS ---');
            setTimeout(() => { success = false; }, 5000);
        } catch (err) {
            console.error('--- FORM SUBMIT V4 ERROR ---', err);
            errorMessage = $language === 'en' ? `Error: ${err.message}` : `Erreur: ${err.message}`;
        } finally {
            sending = false;
        }
    };

    //console.log(calendarWeeks)



</script>


<div id="contact" class="flex flex-col items-center justify-center bg-gray-200 py-16">


    

    

    <div class="grid grid-cols md:grid-cols-[5fr_6fr] w-full">



        
        <div id='contact-title'>

            <div class='header text-center mb-4'>
                {#if $language == 'en'}
                    <h1 class="h1 font-bold">
                        Contact for a quote
                    </h1>
                {:else}
                    <h1 class="h1 font-bold">
                        Contactez-nous pour une soumission.
                    </h1>
                {/if}
                
            </div>

        </div>
        
        





        <div id='contact-blank'>
        </div>
        










    



        <div id='contact-form' class="lg:px-16 sm:px-4 px-4">

            <div class="flex justify-center items-center">
                
                <div class="flex flex-col w-full">
                    {#if $language == 'en'}
                    <div class="mb-5">
                        <label for="name" class="mb-2 text-sm text-gray-600">Name</label>
                        <input type="text" name="name" id="name" placeholder='Name' required 
                            bind:value={formData.name}
                            on:input={() => onChangeValidation("name")}
                            class="pl-4 pr-12 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 
                                {formDataValid['name']? 'focus:ring-blue-500': 'focus:ring-red-500'} 
                                focus:border-transparent w-full"
                            >
                    </div>
                    <div class="mb-5">
                        <label for="email" class="mb-2 text-sm text-gray-600">Email</label>
                        <input type="email" name="email" id="email" placeholder='Email' required 
                            bind:value={formData.email}    
                            on:input={() => onChangeValidation("email")}
                            class="pl-4 pr-12 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 
                                {formDataValid['email']? 'focus:ring-blue-500': 'focus:ring-red-500'} 
                                focus:border-transparent w-full"
                            >
                    </div>
                    <div class="mb-5">
                        <label for="phone" class="mb-2 text-sm text-gray-600">Phone</label>
                        <input type="tel" name="phone" id="phone" placeholder='Phone' required 
                            bind:value={formData.phone}    
                            on:input={() => onChangeValidation("phone")}
                            class="pl-4 pr-12 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 
                                {formDataValid['phone']? 'focus:ring-blue-500': 'focus:ring-red-500'} 
                                focus:border-transparent w-full"
                            >
                    </div>
                    <div class="mb-5">
                        <label for="message" class="mb-2 text-sm text-gray-600">Message (minimum 30 characters)</label>
                        <textarea rows="4" name="message" id="message" placeholder='Message (minimum 30 characters)' required 
                            bind:value={formData.messageText}
                            on:input={() => onChangeValidation("messageText")}
                            class="pl-4 pr-12 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 
                                {formDataValid['messageText']? 'focus:ring-blue-500': 'focus:ring-red-500'} 
                                focus:border-transparent w-full"
                            ></textarea>
                    </div>
                    {:else}
                    <div class="mb-5">
                        <label for="name" class="mb-2 text-sm text-gray-600">Nom</label>
                        <input type="text" name="name" id="name" placeholder='Nom' required 
                            bind:value={formData.name}
                            on:input={() => onChangeValidation("name")}
                            class="pl-4 pr-12 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 
                                {formDataValid['name']? 'focus:ring-blue-500': 'focus:ring-red-500'} 
                                focus:border-transparent w-full"
                            >
                    </div>
                    <div class="mb-5">
                        <label for="email" class="mb-2 text-sm text-gray-600">Courriel</label>
                        <input type="email" name="email" id="email" placeholder='Courriel' required 
                            bind:value={formData.email}    
                            on:input={() => onChangeValidation("email")}
                            class="pl-4 pr-12 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 
                                {formDataValid['email']? 'focus:ring-blue-500': 'focus:ring-red-500'} 
                                focus:border-transparent w-full"
                            >
                    </div>
                    <div class="mb-5">
                        <label for="phone" class="mb-2 text-sm text-gray-600">Téléphone</label>
                        <input type="tel" name="phone" id="phone" placeholder='Téléphone' required 
                            bind:value={formData.phone}    
                            on:input={() => onChangeValidation("phone")}
                            class="pl-4 pr-12 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 
                                {formDataValid['phone']? 'focus:ring-blue-500': 'focus:ring-red-500'} 
                                focus:border-transparent w-full"
                            >
                    </div>
                    <div class="mb-5">
                        <label for="message" class="mb-2 text-sm text-gray-600">Message (minimum 30 caractères)</label>
                        <textarea rows="4" name="message" id="message" placeholder='Message (minimum 30 caractères) ' required 
                            bind:value={formData.messageText}
                            on:input={() => onChangeValidation("messageText")}
                            class="pl-4 pr-12 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 
                                {formDataValid['messageText']? 'focus:ring-blue-500': 'focus:ring-red-500'} 
                                focus:border-transparent w-full"
                            ></textarea>
                    </div>
                    {/if}
                </div>
                
            </div>
            
        </div>


        
        <div id='contact-content' class="px-[5%]">


            <div id='contact-calendar' class="flex flex-col">

                <div class="flex flex-col md:py-2 py-8 gap-4">
                    {#if $language == 'en'}
                        <h4 class="h4 text-black font-bold">Book a call for a quote</h4>
                        <p class="text-sm">Below are our times available. Choose your times and we will give you a call.</p>
                    {:else}
                        <h4 class="h4 text-black font-bold">Réservez un appel pour une soumission</h4>
                        <p class="text-sm">Ci-dessous se trouvent nos créneaux disponibles. Choisissez votre horaire et nous vous appellerons.</p>
                    {/if}
                </div>
                
                <div class="flex flex-col justify-center items-center w-full gap-y-8">
                    <div class="grid grid-cols-3 md:grid-cols-5 w-full">
                    
                        {#each calendarWeeks.slice(0, nDays) as day}

                            <div class="bg-gray-50 border-4 p-2 border-gray-100 hover:bg-white">
                                <div class="pb-4">
                                    <p class="text-sm font-bold">{translate(day.day, $language)}</p>
                                    <p class="text-xs text-gray opacity-60">{translate(day.date.split(' ')[0], $language)} {day.date.split(' ')[1]}</p>
                                </div>
                                <div class="">
                                    <button id={day.date + '_noon'}
                                        on:click={onClickDay} 
                                        class="{buttonColor(day.date+'_noon')}" 
                                        
                                    >
                                        {blockedDays.includes(day.date+'_noon')? translate('Not Available', $language) : translate('Noon', $language)}
                                    </button>
                                    <button id={day.date + '_afternoon'} 
                                        on:click={onClickDay} 
                                        class="{buttonColor(day.date+'_afternoon')}" 
                                    >
                                        {blockedDays.includes(day.date+'_afternoon')? translate('Not Available', $language) : translate('Afternoon', $language)}
                                    </button>
                                </div>
                            </div>
    
                        {/each}

                    </div>


                </div>
            </div>


        </div>


    
    </div>
    
    <div class="mt-10 flex flex-col justify-center items-center w-full max-w-md mx-auto">
        {#if success}
            <div class="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 w-full rounded shadow-md animate-pulse">
                <p class="font-bold">{$language === 'en' ? 'Success!' : 'Succès!'}</p>
                <p>{$language === 'en' ? 'Your message has been sent. We will contact you soon.' : 'Votre message a été envoyé. Nous vous contacteros bientôt.'}</p>
            </div>
        {/if}

        {#if errorMessage}
            <div class="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 w-full rounded shadow-md">
                <p class="font-bold">{$language === 'en' ? 'Error' : 'Erreur'}</p>
                <p>{errorMessage}</p>
            </div>
        {/if}

        <button type="button" on:click={() => sendContactForm()}
            disabled={sending || !formDataValid.name || !formDataValid.email || !formDataValid.phone || !formDataValid.messageText}
            class="flex items-center justify-center p-4 text-sm w-48 font-medium text-black bg-[#febd17] rounded shadow-lg transform active:scale-95 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed">
            
            {#if sending}
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{$language == 'en' ? 'Sending...' : 'Envoi...'}</span>
            {:else}
                <span>{$language == 'en' ? 'Send Message' : 'Envoyer le Message'}</span>
            {/if}
        </button>
    </div>
</div>

<!-- </form> -->