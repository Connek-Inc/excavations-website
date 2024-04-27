<script lang="ts">
    import { getContext } from "svelte";
    import { contactUsSchema } from "$lib/yup/contactUsSchema";
    import InputText from "$lib/inputs/InputText.svelte"
    import InputTextarea from "$lib/inputs/InputTextarea.svelte"
    import { enhance } from "$app/forms";

    const language = getContext('language')
    const theme = getContext('theme')

    const primaryColor: string = theme.primary
    const secondaryColor: string = theme.secondary
    const tertiaryColor: string = theme.tertiary

    export let title: string;
    export let buttonText: string

    export let form;


    let successMessage: string;
    let errorMessage: string;

    if (language=='en') {
        successMessage = 'Thank you, we received your message. We will contact you soon.'
        errorMessage = 'There was an error please try again'
    } else if (language=='fr') {
        successMessage = 'Merci pour votre message. Nous vous contacterons bientôt.'
        errorMessage = 'Il y a eu une erreur. SVP essayer encore.'
    }

    console.log(form)

</script>


<div class="">

    <div id='contact-title'>
        
        <div class='header text-center mb-4'>
            <h2 class="h2 font-bold">{title}</h2>
        </div>
        
    </div>


    <div id="contact-form" class="flex flex-col w-full text-[{secondaryColor}]">
        {#if form}
            {#if form?.success}
                <!-- this message is ephemeral; it exists because the page was rendered in
                    response to a form submission. it will vanish if the user reloads -->
                <p class="text-3xl font-semibold text-[{primaryColor}]">{successMessage}</p>
            {:else if !form?.success}
                <p class="text-[{primaryColor}]">{errorMessage}</p>
            {/if}
        {/if}
        <form use:enhance method='post'>
            <div class="mb-5">
                <InputText name={'name'} label={language=='en'? 'Name': 'Nom'} position={'vertical'} validationSchema={contactUsSchema}/>
            </div>
            <div class="mb-5">
                <InputText name={'email'} label={'Email'} position={'vertical'} validationSchema={contactUsSchema}/>
            </div>
            <div class="mb-5">
                <InputText name={'phone'} label={language=='en'? 'Phone': 'Téléphone'} position={'vertical'} validationSchema={contactUsSchema}/>
            </div>
            <div class="mb-5">
                <InputTextarea name={'description'} label={'Description'} position={'vertical'} validationSchema={contactUsSchema}/>
            </div>
            
            <button type="submit" 
                class="p-4 text-sm w-48 font-medium text-black bg-[#febd17] rounded"
            >
                {buttonText}
            </button>

        </form>
    </div>

</div>











