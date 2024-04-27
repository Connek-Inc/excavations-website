
<script lang="ts">

    import type { AnyObjectSchema } from 'yup';

    export let id: string = '';
    export let name: string= '';
    export let label: string = '';
    export let placeholder: string = '';
    export let value: string= '';
    export let isValid: boolean = false;
    export let validationSchema: AnyObjectSchema | null = null;
    export let position: string = 'horizontal'

    let validationError;

    const onChangeValidation = async (e) => {
        // Validate with schema
        if (validationSchema){
            try {
                await validationSchema.fields[name].validate(value)
                validationError = null
                isValid = true
            } catch (err) {
                validationError = err
                isValid = false
            }
        }
    }

    const positionDiv = (position)=> {
        if (position=='horizontal') {
            return 'grid md:grid-cols-[1fr_2fr] grid-cols-1'
        } else if (position=='vertical') {
            return 'flex flex-col items-start'
        }
    }

    

</script>

<div class="{positionDiv(position)} mb-2">
    <label class="mb-2 text-sm font-medium text-gray-900 dark:text-white" for={id}>{label}</label>
    <textarea
        bind:value={value}
        on:input={onChangeValidation}
        name={name}
        id={id}
        placeholder={placeholder}
        class="pl-4 pr-12 py-2 border bg-white rounded-md text-gray-700 sm:text-sm border-gray-300 focus:outline-none focus:ring-2 
            {isValid? 'focus:ring-primary-600 focus:border-primary-600': 
            'focus:ring-red-500'} 
            focus:border-transparent w-full" 
    ></textarea>
    {#if validationError}
        <p class="text-red-500 text-sm font-semibold">{validationError.message}</p>
    {/if}
</div>
    