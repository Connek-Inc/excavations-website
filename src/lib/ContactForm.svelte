<script lang="ts">
    import { goto } from "$app/navigation";
    import { getContext } from "svelte";
    import { contactUsSchema } from "$lib/yup/contactUsSchema";
    import { translate } from "$lib/utils"
    import type { ContactFormClass } from "./contact-form";

    const language = getContext('language')
    const theme = getContext('theme')

    const primaryColor: string = theme.primary
    const secondaryColor: string = theme.secondary
    const tertiaryColor: string = theme.tertiary

    export let contactForm: ContactFormClass;
    export let title: string;
    export let buttonText: string
    



    // Send notification of contact thru email
    const sendContactForm = async (contactForm: ContactFormClass) => {

        const response = await fetch('/send-contact-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactForm.toObject())
        })

        console.log('SEND CONTACT RES', response.json())
        // goto('/#contact')
        // return response.body
    }



</script>


<div class="">

    <div id='contact-title'>
        
        <div class='header text-center mb-4'>
            <h2 class="h2 font-bold">{title}</h2>
        </div>
        
    </div>



    <div id="contact-form" class="flex flex-col w-full text-[{secondaryColor}]">
        <form action="">
            <div class="mb-5">
                <label for="name" class="mb-2 text-sm text-left">{contactForm.name.label}</label>
                <input type="text" name="name" id="name" placeholder={contactForm.name.value} required 
                bind:value={contactForm.name.value}
                on:input={async () => await contactForm.validateField('name')}
                class="pl-4 pr-12 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 
                    {contactForm.name.valid? 'focus:ring-blue-500': 'focus:ring-red-500 focus:ring-8'} 
                    focus:border-transparent w-full"
                >
            </div>
            <div class="mb-5">
                <label for="email" class="mb-2 text-sm text-left">{contactForm.email.label}</label>
                <input type="email" name="email" id="email" placeholder={contactForm.email.value} required 
                bind:value={contactForm.email.value}    
                on:input={async () => await contactForm.validateField('email')}
                class="pl-4 pr-12 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 
                    {contactForm.email.valid? 'focus:ring-blue-500': 'focus:ring-red-500 focus:ring-8'} 
                    focus:border-transparent w-full"
                >
            </div>
            <div class="mb-5">
                <label for="phone" class="mb-2 text-sm text-left">{contactForm.phone.label}</label>
                <input type="tel" name="phone" id="phone" placeholder={contactForm.phone.value} required 
                bind:value={contactForm.phone.value}    
                on:input={async () => await contactForm.validateField("phone")}
                class="pl-4 pr-12 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 
                    {contactForm.phone.valid? 'focus:ring-blue-500': 'focus:ring-red-500 focus:ring-8'} 
                    focus:border-transparent w-full"
                >
            </div>
            <div class="mb-5">
                <label for="message" class="mb-2 text-sm text-left">{contactForm.description.label}</label>
                <textarea rows="4" name="message" id="message" placeholder={contactForm.description.value} required 
                bind:value={contactForm.description.value}
                on:input={async () => await contactForm.validateField("description")}
                    class="pl-4 pr-12 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 
                        {contactForm.description.valid? 'focus:ring-blue-500': 'focus:ring-red-500 focus:ring-8'} 
                        focus:border-transparent w-full"
                    ></textarea>
            </div>
            <button type="submit" on:click={() => sendContactForm(contactForm)} 
                class="p-4 text-sm w-48 font-medium text-black bg-[#febd17] rounded">{buttonText}</button>
        </form>
    </div>

</div>











