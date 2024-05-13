import { language } from '$lib/store/store.js';
// Process each date string in the array
export const formatBookedTimes = (dates, $language) => {
    // Dates are in format js object
    // bookedTimes: [
    //     'March 25_noon',
    //     'March 25_afternoon',
    //     'March 26_noon',
    //     'March 26_afternoon'
    //   ]

    const finalString = dates.map(dateString => {
        const [date, partOfDay] = dateString.split('_');

        const formatPartOfDay = (part, $language) => {
            if ($language=='fr') {
                return (part === 'noon'? 'à midi' : 'après-midi')
            } else {
                return (part === 'noon' ? 'at Noon' : 'in the Afternoon')
            }
        }

        return `${date} ${formatPartOfDay(partOfDay, $language)}`;
    }).join(', ');

    console.log(finalString)
    return finalString
}


export function translate(word, $language) {
    
    // English to French month mapping
    const translation = {
        'January': 'Janvier',
        'February': 'Février',
        'March': 'Mars',
        'April': 'Avril',
        'May': 'Mai',
        'June': 'Juin',
        'July': 'Juillet',
        'August': 'Août',
        'September': 'Septembre',
        'October': 'Octobre',
        'November': 'Novembre',
        'December': 'Décembre',
        // DAYS
        'Monday': 'Lundi',
        'Tuesday': 'Mardi',
        'Wednesday': 'Mercredi',
        'Thursday': 'Jeudi',
        'Friday': 'Vendredi',
        'Saturday': 'Samedi',
        'Sunday': 'Dimanche',
        // TIME OF DAY
        'Noon': 'Midi',
        'Afternoon': 'Après-midi',
        // OTHER
        'Not Available': 'Pas disponible'
    }

    if ($language=='fr') {
        return translation[word] || word
    } else {
        return word
    }
}