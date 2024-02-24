<script>

    const today = new Date()
    export let nDays = 7;

    function getTwoWeeksFromDate(inputDate, n) {
        let result = [];
        let date = new Date(inputDate);
        let day = date.getDay();
        let mondayOffset = day === 0 ? -6 : 1 - day; // Calculate the difference to get to Monday

        // Starting from the Monday of the current week
        let monday = new Date(date.setDate(date.getDate() + mondayOffset));

        // Get all the days for two weeks from that Monday
        for (let i = 0; i < n; i++) {
            let currentDate = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
            let options = { month: 'long', day: 'numeric', weekday: 'long' };
            let dateString = currentDate.toLocaleDateString('en-US', options).split(', ');
            console.log(dateString)
            result.push({
                date: `${dateString[1]}`,
                day: dateString[0]
            });
        }
        return result;
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

    
    function formatDateId(dateString) {
        return dateString.replace('_', ' - ').replace('afternoon', 'Afternoon').replace('noon', 'Noon');
    }


    // const calendarWeeks = getTwoWeeksFromDate(today)
    const calendarWeeks = getNextFourteenDays(today, nDays)
    const blockedDays = ['February 27_noon']


    console.log(calendarWeeks.slice(0,7))


    let bookedTimes = []

    const onClickDay = (e) => {

        if (bookedTimes.includes(e.target.id) | blockedDays.includes(e.target.id)) {
            console.log('Nope')
            return
        }
        
        bookedTimes = [...bookedTimes, e.target.id]
        
        console.log('days', nDays)
    }

    $: buttonColor = (id) => {

        const first = 'text-left h-6 w-full max-w-24 p-1 mb-1 text-sm rounded-md '

        if (bookedTimes.includes(id)) {
            
            return first + 'bg-yellow-500 text-white'

        } else if (blockedDays.includes(id)) {

            return first + 'bg-gray-500 cursor-default active:shadow-inner transform active:-translate-y-1 transition duration-150 ease-in-out'

        } else { // El normal

            return first + 'bg-black text-white hover:bg-yellow-500 hover:text-black'

        }
        
    }

    $: console.log(bookedTimes)

</script>



<div id="contact" class="flex flex-col items-center justify-center bg-gray-200 py-16">


    <div class="grid grid-cols md:grid-cols-[5fr_6fr] w-full">



        
        <div id='contact-title'>

            <div class='header text-center mb-4'>
                <h1 class="h1 font-bold">Contact for a quote.</h1>
            </div>

        </div>
        
        





        <div id='contact-blank'>
        </div>
        













        <div id='contact-form' class="md:px-16 px-4">

            <div class="flex justify-center items-center">
                <form class="w-full">
                    <div class="mb-5">
                        <label for="name" class="mb-2 text-sm text-gray-600">Name*</label>
                        <input type="text" name="name" id="name" placeholder="Name" required class="w-full p-4 text-gray-700 bg-gray-100 rounded border border-gray-300">
                    </div>
                    <div class="mb-5">
                        <label for="email" class="mb-2 text-sm text-gray-600">Email*</label>
                        <input type="email" name="email" id="email" placeholder="Email" required class="w-full p-4 text-gray-700 bg-gray-100 rounded border border-gray-300">
                    </div>
                    <div class="mb-5">
                        <label for="phone" class="mb-2 text-sm text-gray-600">Phone*</label>
                        <input type="tel" name="phone" id="phone" placeholder="Phone" required class="w-full p-4 text-gray-700 bg-gray-100 rounded border border-gray-300">
                    </div>
                    <div class="mb-5">
                        <label for="message" class="mb-2 text-sm text-gray-600">Message*</label>
                        <textarea rows="4" name="message" id="message" placeholder="Message" required class="w-full h-32 p-4 text-gray-700 bg-gray-100 rounded border border-gray-300"></textarea>
                    </div>
                </form>
            </div>
            
        </div>


        
        <div id='contact-content' class="px-[5%]">


            <div id='contact-calendar' class="flex flex-col">

                <div class="flex flex-col py-12 gap-4">
                    <h4 class="h4 text-black font-bold">Book a call for a quote.</h4>
                    <p class="text-sm">Below are our times available. Book a time and we will give you a call.</p>
                </div>
                
                <div class="flex flex-col justify-center items-center w-full gap-y-8">
                    <div class="grid grid-cols-3 md:grid-cols-5 w-full">
                    
                        {#each calendarWeeks.slice(0, nDays) as day}

                            <div class="bg-gray-50 border-4 p-2 border-gray-100 hover:bg-white">
                                <div class="pb-4">
                                    <p class="text-sm font-bold">{day.day}</p>
                                    <p class="text-xs text-gray opacity-60">{day.date}</p>
                                </div>
                                <div class="">
                                    <button id='{day.date}_noon'
                                        on:click={onClickDay} 
                                        class="{buttonColor(day.date+'_noon')}" 
                                    >
                                    {blockedDays.includes(day.date+'_noon')? 'Not Available' : 'Noon'}
                                        </button>
                                    <button id='{day.date}_afternoon' 
                                        on:click={onClickDay} 
                                        class="{buttonColor(day.date+'_afternoon')}" 
                                    >
                                        {blockedDays.includes(day.date+'_afternoon')? 'Not Available' : 'Afternoon'}
                                    </button>
                                </div>
                            </div>
    
                        {/each}

                    </div>
                    

                    <!-- <div class="flex w-full">
                        Selected: {#each bookedTimes as sel} {`${formatDateId(sel)} ; `} {/each} 
                    </div> -->

                </div>
            </div>


        </div>


    
    </div>
    
    <div class="mt-10 flex justify-center items-center">
        <button type="submit" class="p-4 text-sm w-48 font-medium text-black bg-[#febd17] rounded">Send</button>
    </div>


</div>