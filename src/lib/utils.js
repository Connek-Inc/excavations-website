
// Process each date string in the array
export const formatBookedTimes = (dates) => {

    const finalString = dates.map(dateString => {
        const [date, partOfDay] = dateString.split('_');
        const formatPartOfDay = part => part === 'noon' ? 'at Noon' : 'in the Afternoon';
        return `${date} ${formatPartOfDay(partOfDay)}`;
    }).join(', ');

    return finalString
}


export function translate(word, language) {
    
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

    if (language=='fr') {
        return translation[word] || word
    } else {
        return word
    }
}