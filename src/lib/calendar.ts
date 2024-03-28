
export class CalendarClass {
    bookedTimes: string[];
    blockedTimes: string[];
    // Must be in form March 19_noon or afternoon

    constructor(bookedTimes: string[], blockedTimes: string[]) {
        this.blockedTimes = blockedTimes
        this.bookedTimes = bookedTimes
    }

    getNextNDays(inputDate: Date, n: number) {
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


    addBlockedTimes(_time: string) {
        this.blockedTimes.push(_time)
    }
    removeBlockedTimes(_time: string) {
        this.blockedTimes = this.blockedTimes.filter(x => x !== _time)
    }

    addBookedTimes(_time: string) {
        this.blockedTimes.push(_time)
    }
    removeBookedTimes(_time: string) {
        this.bookedTimes = this.bookedTimes.filter(x => x !== _time)
    }

}
