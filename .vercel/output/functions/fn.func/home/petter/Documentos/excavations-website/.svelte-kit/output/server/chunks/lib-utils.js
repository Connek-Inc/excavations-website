import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const formatBookedTimes = (dates, $language) => {
  const finalString = dates.map((dateString) => {
    const [date, partOfDay] = dateString.split("_");
    const formatPartOfDay = (part, $language2) => {
      if ($language2 == "fr") {
        return part === "noon" ? "à midi" : "après-midi";
      } else {
        return part === "noon" ? "at Noon" : "in the Afternoon";
      }
    };
    return `${date} ${formatPartOfDay(partOfDay, $language)}`;
  }).join(", ");
  console.log(finalString);
  return finalString;
};
function translate(word, $language) {
  const translation = {
    "January": "Janvier",
    "February": "Février",
    "March": "Mars",
    "April": "Avril",
    "May": "Mai",
    "June": "Juin",
    "July": "Juillet",
    "August": "Août",
    "September": "Septembre",
    "October": "Octobre",
    "November": "Novembre",
    "December": "Décembre",
    // DAYS
    "Monday": "Lundi",
    "Tuesday": "Mardi",
    "Wednesday": "Mercredi",
    "Thursday": "Jeudi",
    "Friday": "Vendredi",
    "Saturday": "Samedi",
    "Sunday": "Dimanche",
    // TIME OF DAY
    "Noon": "Midi",
    "Afternoon": "Après-midi",
    // OTHER
    "Not Available": "Pas disponible"
  };
  if ($language == "fr") {
    return translation[word] || word;
  } else {
    return word;
  }
}
export {
  cn as c,
  formatBookedTimes as f,
  translate as t
};
