<script lang="ts">
    import { getContext } from "svelte";
    import { translate } from "$lib/utils"
    import type { Calendar } from "./calendar.ts";

    const language = getContext('language')
    const theme = getContext('theme')

    export let calendar: Calendar;
    export let title: string;
    export let subtitle: string;


    const today = new Date()
    export let nDays = 7;
    

    
    // const calendarWeeks = getTwoWeeksFromDate(today)
    const calendarWeeks = calendar.getNextNDays(today, nDays)
    

    // Handle calendar time click
    const onClickDay = (e) => {

        if (calendar.bookedTimes.includes(e.target.id) || calendar.blockedTimes.includes(e.target.id)) {
            // Remove form bookedTimes
            calendar.removeBookedTimes(e.target.id)
        } else {
            // Add time to bookedTimes
            calendar.addBookedTimes(e.target.id)
        }
        
        
        console.log('days', nDays)
    }

    // Change button color with clicks 
    $: buttonColor = (id) => {

        const first = 'text-left h-6 w-full max-w-24 p-1 mb-1 text-xs rounded-md '

        if (calendar.bookedTimes.includes(id)) {  //Seleccionado
            
            return first + 'bg-yellow-500 text-white'

        } else if (calendar.blockedTimes.includes(id)) { //Grey, not selectable

            return first + 'bg-gray-500 cursor-default active:shadow-inner transform active:-translate-y-1 transition duration-150 ease-in-out'

        } else { // El normal

            return first + 'bg-black text-white hover:bg-yellow-500 hover:text-black'

        }
        
    }



</script>


<div id='contact-calendar' class="flex flex-col">

    <div class="flex flex-col md:py-2 py-8 gap-4">
        <h4 class="h4 text-black font-bold">{title}</h4>
        <p class="text-sm">{subtitle}</p>
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
                            {calendar.blockedTimes.includes(day.date+'_noon')? translate('Not Available', language) : translate('Noon', language)}
                        </button>
                        <button id='{day.date}_afternoon' 
                            on:click={onClickDay} 
                            class="{buttonColor(day.date+'_afternoon')}" 
                        >
                            {calendar.blockedTimes.includes(day.date+'_afternoon')? translate('Not Available', language) : translate('Afternoon', language)}
                        </button>
                    </div>
                </div>

            {/each}

        </div>

    
    </div>


</div>

<!-- </form> -->