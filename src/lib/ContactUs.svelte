<script>
    import { goto } from "$app/navigation";
    import { getContext } from "svelte";
    import { contactUsSchema } from "$lib/yup/contactUsSchema";
    import { translate } from "$lib/utils"

    const language = getContext('language')

    let contactTitle;
    let calendarTitle;
    let calendarSubtitle;
    let calendarDates;
    let formLabels;

    if (language=='en') {
        contactTitle = 'Contact for a quote.'
        calendarTitle = 'Book a call for a quote'
        calendarSubtitle = 'Below are our times available. Choose your times and we will give you a call.' 
        calendarDates = 
        formLabels = {
            name: 'Name',
            email: 'Email',
            phone: 'Phone',
            messageText: 'Message (minimum 30 characters)',
        }
    } else if (language=='fr') {
        contactTitle = 'Contactez-nous pour une soumission.'
        calendarTitle = 'Réservez un appel pour une soumission';
        calendarSubtitle = 'Ci-dessous se trouvent nos créneaux disponibles. Choisissez votre horaire et nous vous appellerons.';
        formLabels = {
            name: 'Nom',
            email: 'Courriel',
            phone: 'Téléphone',
            messageText: 'Message (minimum 30 caractères)',
        };
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

        const first = 'text-left h-6 w-full max-w-24 p-1 mb-1 text-sm rounded-md '

        if (formData.bookedTimes.includes(id)) {  //Seleccionado
            
            return first + 'bg-yellow-500 text-white'

        } else if (blockedDays.includes(id)) { //Grey, not selectable

            return first + 'bg-gray-500 cursor-default active:shadow-inner transform active:-translate-y-1 transition duration-150 ease-in-out'

        } else { // El normal

            return first + 'bg-black text-white hover:bg-yellow-500 hover:text-black'

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
    const sendContactForm = async (formData) => {

        const response = await fetch('/send-contact-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({formData})
        })

        console.log('SEND CONTACT RES', response.json())
        // goto('/#contact')
        // return response.body
    }

    console.log(calendarWeeks)



</script>


<div id="contact" class="flex flex-col items-center justify-center bg-gray-200 py-16">


    

    

    <div class="grid grid-cols md:grid-cols-[5fr_6fr] w-full">



        
        <div id='contact-title'>

            <div class='header text-center mb-4'>
                <h1 class="h1 font-bold">{contactTitle}</h1>
            </div>

        </div>
        
        





        <div id='contact-blank'>
        </div>
        










    



        <div id='contact-form' class="lg:px-16 sm:px-4 px-4">

            <div class="flex justify-center items-center">
                
                <div class="flex flex-col w-full">
                    
                    <div class="mb-5">
                        <label for="name" class="mb-2 text-sm text-gray-600">{formLabels.name}</label>
                        <input type="text" name="name" id="name" placeholder={formLabels.name} required 
                            bind:value={formData.name}
                            on:input={() => onChangeValidation("name")}
                            class="pl-4 pr-12 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 
                                {formDataValid['name']? 'focus:ring-blue-500': 'focus:ring-red-500'} 
                                focus:border-transparent w-full"
                            >
                    </div>
                    <div class="mb-5">
                        <label for="email" class="mb-2 text-sm text-gray-600">{formLabels.email}</label>
                        <input type="email" name="email" id="email" placeholder={formLabels.email} required 
                            bind:value={formData.email}    
                            on:input={() => onChangeValidation("email")}
                            class="pl-4 pr-12 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 
                                {formDataValid['email']? 'focus:ring-blue-500': 'focus:ring-red-500'} 
                                focus:border-transparent w-full"
                            >
                    </div>
                    <div class="mb-5">
                        <label for="phone" class="mb-2 text-sm text-gray-600">{formLabels.phone}</label>
                        <input type="tel" name="phone" id="phone" placeholder={formLabels.phone} required 
                            bind:value={formData.phone}    
                            on:input={() => onChangeValidation("phone")}
                            class="pl-4 pr-12 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 
                                {formDataValid['phone']? 'focus:ring-blue-500': 'focus:ring-red-500'} 
                                focus:border-transparent w-full"
                            >
                    </div>
                    <div class="mb-5">
                        <label for="message" class="mb-2 text-sm text-gray-600">{formLabels.messageText}</label>
                        <textarea rows="4" name="message" id="message" placeholder={formLabels.messageText} required 
                            bind:value={formData.messageText}
                            on:input={() => onChangeValidation("messageText")}
                            class="pl-4 pr-12 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 
                                {formDataValid['messageText']? 'focus:ring-blue-500': 'focus:ring-red-500'} 
                                focus:border-transparent w-full"
                            ></textarea>
                    </div>
                </div>
                
            </div>
            
        </div>


        
        <div id='contact-content' class="px-[5%]">


            <div id='contact-calendar' class="flex flex-col">

                <div class="flex flex-col md:py-2 py-8 gap-4">
                    <h4 class="h4 text-black font-bold">{calendarTitle}</h4>
                    <p class="text-sm">{calendarSubtitle}</p>
                </div>
                
                <div class="flex flex-col justify-center items-center w-full gap-y-8">
                    <div class="grid grid-cols-3 md:grid-cols-5 w-full">
                    
                        {#each calendarWeeks.slice(0, nDays) as day}

                            <div class="bg-gray-50 border-4 p-2 border-gray-100 hover:bg-white">
                                <div class="pb-4">
                                    <p class="text-sm font-bold">{translate(day.day, language)}</p>
                                    <p class="text-xs text-gray opacity-60">{translate(day.date.split(' ')[0], language)} {day.date.split(' ')[1]}</p>
                                </div>
                                <div class="">
                                    <button id='{day.date}_noon'
                                        on:click={onClickDay} 
                                        class="{buttonColor(day.date+'_noon')}" 
                                    >
                                        {blockedDays.includes(day.date+'_noon')? 'Not Available' : translate('Noon', language)}
                                    </button>
                                    <button id='{day.date}_afternoon' 
                                        on:click={onClickDay} 
                                        class="{buttonColor(day.date+'_afternoon')}" 
                                    >
                                        {blockedDays.includes(day.date+'_afternoon')? 'Not Available' : translate('Afternoon', language)}
                                    </button>
                                </div>
                            </div>
    
                        {/each}

                    </div>


                </div>
            </div>


        </div>


    
    </div>
    
    <div class="mt-10 flex justify-center items-center">
        <button type="submit" on:click={() => sendContactForm(formData)} 
            class="p-4 text-sm w-48 font-medium text-black bg-[#febd17] rounded">Send</button>
    </div>



</div>

<!-- </form> -->