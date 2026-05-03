<script lang="ts">
    import { language } from '$lib/store/store';
    import { cn } from '$lib/lib-utils';
    
    export const hideTitle = false;

    let step = 1;
    const totalSteps = 3;

    let formData = {
        problemType: '',
        urgencyLevel: '',
        name: '',
        phone: '',
        email: '',
        messageText: ''
    };

    let sending = false;
    let success = false;
    let errorMessage = '';

    const problems = [
        { id: 'infiltration', icon: '💧', labelFr: 'Infiltration d\'eau', labelEn: 'Water Infiltration', labelEs: 'Infiltración de agua' },
        { id: 'refoulement', icon: '🚽', labelFr: 'Refoulement d\'égout', labelEn: 'Sewer Backup', labelEs: 'Respaldo de alcantarillado' },
        { id: 'fissure', icon: '⚡', labelFr: 'Fissure de fondation', labelEn: 'Foundation Crack', labelEs: 'Grieta de cimientos' },
        { id: 'drain', icon: '🏡', labelFr: 'Drain Français', labelEn: 'French Drain', labelEs: 'Drenaje Francés' },
        { id: 'autre', icon: '❓', labelFr: 'Autre', labelEn: 'Other', labelEs: 'Otro' }
    ];

    const urgencies = [
        { id: 'immediat', icon: '🚨', labelFr: 'Immédiate (Moins de 2h)', labelEn: 'Immediate (Under 2h)', labelEs: 'Inmediata (Menos de 2h)' },
        { id: 'aujourdhui', icon: '📅', labelFr: 'Aujourd\'hui (2h - 12h)', labelEn: 'Today (2h - 12h)', labelEs: 'Hoy (2h - 12h)' },
        { id: 'semaine', icon: '🗓️', labelFr: 'Cette semaine', labelEn: 'This week', labelEs: 'Esta semana' }
    ];

    $: isStep1Valid = formData.problemType !== '';
    $: isStep2Valid = formData.urgencyLevel !== '';
    $: isStep3Valid = formData.name.trim() !== '' && formData.phone.trim() !== '' && formData.email.trim() !== '';

    function nextStep() {
        if (step === 1 && !isStep1Valid) return;
        if (step === 2 && !isStep2Valid) return;
        if (step < totalSteps) step++;
    }

    function prevStep() {
        if (step > 1) step--;
    }

    const submitForm = async () => {
        if (!isStep3Valid || sending) return;
        
        sending = true;
        errorMessage = '';
        
        try {
            // Combine data into a message string to reuse existing backend
            const combinedMessage = `PROBLÈME: ${formData.problemType}\nURGENCE: ${formData.urgencyLevel}\nDÉTAILS: ${formData.messageText || 'Aucun détail'}`;
            
            const payloadData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                messageText: combinedMessage,
                bookedTimes: ['Urgence Web']
            };

            const response = await fetch('/send-contact-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ formData: payloadData })
            });

            const payload = await response.json();

            if (!response.ok || payload?.success === false) {
                throw new Error(payload?.error || 'Server error');
            }
            
            success = true;
            
            // 🎯 Track Google Ads conversion + GA4 lead event
            import('$lib/analytics/gtag').then(({ trackContactFormSubmit }) => {
                trackContactFormSubmit({
                    value: 1.0,
                    currency: 'CAD',
                    serviceType: formData.problemType,
                    lang: $language
                });
            });

            step = 4; // Move to success step
            setTimeout(() => { 
                success = false; 
                step = 1;
                formData = { problemType: '', urgencyLevel: '', name: '', phone: '', email: '', messageText: '' };
            }, 8000);
        } catch (err) {
            errorMessage = $language === 'en' ? `Error: ${err.message}` : `Erreur: ${err.message}`;
        } finally {
            sending = false;
        }
    };
</script>

<div class="w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900/80 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-100 dark:border-zinc-800 p-6 md:p-10 relative overflow-hidden transition-all duration-500">
    
    <!-- Progress Bar -->
    {#if step <= totalSteps}
        <div class="w-full h-2 bg-gray-100 dark:bg-zinc-800 rounded-full mb-8 overflow-hidden flex">
            <div class="h-full bg-[#febd17] transition-all duration-500 ease-out" style="width: {(step / totalSteps) * 100}%"></div>
        </div>
        <div class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">
            {$language === 'en' ? `Step ${step} of ${totalSteps}` : ($language === 'es' ? `Paso ${step} de ${totalSteps}` : `Étape ${step} sur ${totalSteps}`)}
        </div>
    {/if}

    <!-- Step 1: Problem Type -->
    {#if step === 1}
        <div class="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 class="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                {$language === 'en' ? 'What is the problem?' : ($language === 'es' ? '¿Cuál es el problema?' : 'Quel est le problème?')}
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {#each problems as prob}
                    <button 
                        class="flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-200 {formData.problemType === prob.id ? 'border-[#febd17] bg-[#febd17]/10 dark:bg-[#febd17]/5 scale-105 shadow-lg shadow-yellow-500/20' : 'border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 hover:border-[#febd17]/50 hover:bg-gray-100 dark:hover:bg-zinc-800'}"
                        on:click={() => formData.problemType = prob.id}
                    >
                        <span class="text-4xl mb-3">{prob.icon}</span>
                        <span class="font-bold text-center text-sm text-gray-900 dark:text-white">
                            {$language === 'en' ? prob.labelEn : ($language === 'es' ? prob.labelEs : prob.labelFr)}
                        </span>
                    </button>
                {/each}
            </div>
            
            <button 
                class="w-full mt-8 py-4 rounded-xl font-black uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed {isStep1Valid ? 'bg-[#febd17] hover:bg-[#e5aa15] text-black shadow-lg shadow-yellow-500/30' : 'bg-gray-200 dark:bg-zinc-800 text-gray-400'}"
                disabled={!isStep1Valid}
                on:click={nextStep}
            >
                {$language === 'en' ? 'Next Step' : ($language === 'es' ? 'Siguiente Paso' : 'Étape Suivante')} &rarr;
            </button>
        </div>
    {/if}

    <!-- Step 2: Urgency Level -->
    {#if step === 2}
        <div class="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 class="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                {$language === 'en' ? 'How urgent is it?' : ($language === 'es' ? '¿Qué tan urgente es?' : 'Quel est le niveau d\'urgence?')}
            </h3>
            
            <div class="flex flex-col gap-4">
                {#each urgencies as urg}
                    <button 
                        class="flex items-center p-5 rounded-2xl border-2 transition-all duration-200 {formData.urgencyLevel === urg.id ? 'border-[#febd17] bg-[#febd17]/10 dark:bg-[#febd17]/5 shadow-md shadow-yellow-500/10 scale-[1.02]' : 'border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 hover:border-[#febd17]/50 hover:bg-gray-100 dark:hover:bg-zinc-800'}"
                        on:click={() => formData.urgencyLevel = urg.id}
                    >
                        <span class="text-3xl mr-4">{urg.icon}</span>
                        <span class="font-bold text-lg text-gray-900 dark:text-white">
                            {$language === 'en' ? urg.labelEn : ($language === 'es' ? urg.labelEs : urg.labelFr)}
                        </span>
                    </button>
                {/each}
            </div>

            <div class="flex gap-4 mt-8">
                <button class="px-6 py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors" on:click={prevStep}>
                    &larr; {$language === 'en' ? 'Back' : ($language === 'es' ? 'Atrás' : 'Retour')}
                </button>
                <button 
                    class="flex-1 py-4 rounded-xl font-black uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed {isStep2Valid ? 'bg-[#febd17] hover:bg-[#e5aa15] text-black shadow-lg shadow-yellow-500/30' : 'bg-gray-200 dark:bg-zinc-800 text-gray-400'}"
                    disabled={!isStep2Valid}
                    on:click={nextStep}
                >
                    {$language === 'en' ? 'Next Step' : ($language === 'es' ? 'Siguiente Paso' : 'Étape Suivante')} &rarr;
                </button>
            </div>
        </div>
    {/if}

    <!-- Step 3: Contact Info -->
    {#if step === 3}
        <div class="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 class="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-2">
                {$language === 'en' ? 'Your Contact Info' : ($language === 'es' ? 'Su Información de Contacto' : 'Vos Coordonnées')}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
                {$language === 'en' ? 'We will contact you immediately to coordinate the inspection.' : ($language === 'es' ? 'Nos pondremos en contacto inmediatamente para coordinar la inspección.' : 'Nous vous contacterons immédiatement pour coordonner l\'inspection.')}
            </p>

            <div class="space-y-4">
                <div>
                    <input type="text" placeholder="{$language === 'en' ? 'Full Name' : ($language === 'es' ? 'Nombre Completo' : 'Nom Complet')}" bind:value={formData.name} class="w-full px-4 py-4 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-all">
                </div>
                <div>
                    <input type="tel" placeholder="{$language === 'en' ? 'Phone Number' : ($language === 'es' ? 'Número de Teléfono' : 'Numéro de Téléphone')}" bind:value={formData.phone} class="w-full px-4 py-4 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-all">
                </div>
                <div>
                    <input type="email" placeholder="{$language === 'en' ? 'Email Address' : ($language === 'es' ? 'Correo Electrónico' : 'Adresse Courriel')}" bind:value={formData.email} class="w-full px-4 py-4 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-all">
                </div>
                <div>
                    <textarea placeholder="{$language === 'en' ? 'Additional details (optional)' : ($language === 'es' ? 'Detalles adicionales (opcional)' : 'Détails supplémentaires (optionnel)')}" bind:value={formData.messageText} rows="2" class="w-full px-4 py-4 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-all resize-none"></textarea>
                </div>
            </div>

            {#if errorMessage}
                <div class="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-bold mt-4">
                    {errorMessage}
                </div>
            {/if}

            <div class="flex gap-4 mt-8">
                <button class="px-6 py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors" on:click={prevStep}>
                    &larr; {$language === 'en' ? 'Back' : ($language === 'es' ? 'Atrás' : 'Retour')}
                </button>
                <button 
                    class="flex-1 py-4 rounded-xl font-black uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 {isStep3Valid ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30' : 'bg-gray-200 dark:bg-zinc-800 text-gray-400'}"
                    disabled={!isStep3Valid || sending}
                    on:click={submitForm}
                >
                    {#if sending}
                        <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>{$language === 'en' ? 'Sending...' : ($language === 'es' ? 'Enviando...' : 'Envoi...')}</span>
                    {:else}
                        <span>{$language === 'en' ? 'Send Request' : ($language === 'es' ? 'Enviar Solicitud' : 'Envoyer la Demande')}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    {/if}
                </button>
            </div>
        </div>
    {/if}

    <!-- Step 4: Success Message -->
    {#if step === 4}
        <div class="text-center py-12 animate-in zoom-in duration-500">
            <div class="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl">
                ✓
            </div>
            <h3 class="text-3xl font-black text-gray-900 dark:text-white mb-4">
                {$language === 'en' ? 'Request Sent!' : ($language === 'es' ? '¡Solicitud Enviada!' : 'Demande Envoyée!')}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-lg max-w-sm mx-auto">
                {$language === 'en' ? 'Our emergency team has received your request and will contact you shortly.' : ($language === 'es' ? 'Nuestro equipo de emergencia ha recibido su solicitud y se pondrá en contacto con usted en breve.' : 'Notre équipe d\'urgence a bien reçu votre demande et vous contactera dans les plus brefs délais.')}
            </p>
            <p class="text-sm font-bold text-red-600 mt-6">
                {$language === 'en' ? 'For absolute emergencies, please call (514) 830-9973' : ($language === 'es' ? 'Para urgencias absolutas, llame al (514) 830-9973' : 'Pour une urgence absolue, appelez le (514) 830-9973')}
            </p>
        </div>
    {/if}

</div>
