import { c as create_ssr_component, a as subscribe, b as add_attribute, e as escape, d as each, v as validate_component } from "./ssr.js";
import * as yup from "yup";
import { t as translate } from "./lib-utils.js";
import { l as language } from "./store.js";
import { C as Calendar } from "./calendar.js";
import { A as ArrowRight } from "./arrow-right.js";
import { P as Phone } from "./phone.js";
yup.object().shape({
  name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters long"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  phone: yup.string().required("Phone is required").matches(/^[0-9]+$/, "Phone number must be only digits").min(10, "Phone number must be at least 10 digits long").max(15, "Phone number must be less than 15 digits long"),
  messageText: yup.string().required("Message is required").min(30, "Message must be at least 30 characters long")
});
function getNextFourteenDays(inputDate, n) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let datesArray = [];
  for (let i = 0; i < n; i++) {
    let currentDate = new Date(inputDate);
    currentDate.setDate(currentDate.getDate() + i);
    let formattedDate = currentDate.toLocaleDateString("en-US", { month: "long", day: "numeric" });
    let dayOfWeek = days[currentDate.getDay()];
    datesArray.push({ date: formattedDate, day: dayOfWeek });
  }
  return datesArray;
}
const ContactUs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $language, $$unsubscribe_language;
  $$unsubscribe_language = subscribe(language, (value) => $language = value);
  const today = /* @__PURE__ */ new Date();
  let { nDays = 7 } = $$props;
  let formData = {
    name: "",
    email: "",
    phone: "",
    messageText: "",
    bookedTimes: []
  };
  let formDataValid = {
    name: false,
    email: false,
    phone: false,
    messageText: false,
    bookedTimes: true
  };
  const calendarWeeks = getNextFourteenDays(today, nDays);
  const blockedDays = ["March 19_noon"];
  if ($$props.nDays === void 0 && $$bindings.nDays && nDays !== void 0)
    $$bindings.nDays(nDays);
  formDataValid.name = false;
  formDataValid.email = false;
  formDataValid.phone = false;
  formDataValid.messageText = false;
  $$unsubscribe_language();
  return `<div id="contact" class="flex flex-col items-center justify-center bg-transparent py-16 w-full font-[sans-serif]"> <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-16 space-y-4"><h2 class="text-4xl md:text-5xl font-black text-black dark:text-white tracking-tight uppercase">${$language == "en" ? `Contact <span class="text-[#febd17]" data-svelte-h="svelte-1smzwvz">Us</span>` : `${$language == "es" ? `Contácta<span class="text-[#febd17]" data-svelte-h="svelte-kfkgcn">nos</span>` : `Contactez-<span class="text-[#febd17]" data-svelte-h="svelte-kc1f6i">Nous</span>`}`}</h2> <div class="h-1 w-24 bg-[#febd17] mx-auto rounded-full"></div> <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">${$language == "en" ? `Ready to start your project? Fill out the form or book a call directly.` : `${$language == "es" ? `¿Listo para comenzar su proyecto? Complete el formulario o reserve una llamada directamente.` : `Prêt à commencer votre projet ? Remplissez le formulaire ou réservez un appel directement.`}`}</p></div> <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start"> <div class="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl dark:shadow-none border border-gray-100 dark:border-zinc-800 transition-all duration-300 hover:border-[#febd17]/30"><div class="mb-8"><h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">${$language == "en" ? `Get a Quote` : `${$language == "es" ? `Obtenga una Cotización` : `Obtenez une Soumission`}`}</h3> <p class="text-sm text-gray-500 dark:text-gray-400">${$language == "en" ? `Fill in your details and we&#39;ll get back to you shortly.` : `${$language == "es" ? `Complete sus datos y nos pondremos en contacto con usted en breve.` : `Remplissez vos coordonnées et nous vous répondrons sous peu.`}`}</p></div> <div class="space-y-6"> ${$language == "en" ? `<div class="group"><label for="name" class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#febd17] transition-colors" data-svelte-h="svelte-1a75zho">Name</label> <input type="text" name="name" id="name" placeholder="Your Name" required class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none"${add_attribute("value", formData.name, 0)}></div> <div class="group"><label for="email" class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#febd17] transition-colors" data-svelte-h="svelte-1cq8x8e">Email</label> <input type="email" name="email" id="email" placeholder="john@example.com" required class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none"${add_attribute("value", formData.email, 0)}></div> <div class="group"><label for="phone" class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#febd17] transition-colors" data-svelte-h="svelte-1yzl2mu">Phone</label> <input type="tel" name="phone" id="phone" placeholder="(555) 123-4567" required class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none"${add_attribute("value", formData.phone, 0)}></div> <div class="group"><label for="message" class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#febd17] transition-colors" data-svelte-h="svelte-14u37cy">Message</label> <textarea rows="4" name="message" id="message" placeholder="Tell us about your project (min 30 chars)..." required class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none resize-none">${escape("")}</textarea> <div class="${"text-right text-xs mt-1 " + escape(
    formData.messageText.length >= 30 ? "text-green-500" : "text-gray-400",
    true
  )}">${escape(formData.messageText.length)} / 30</div></div>` : `${$language == "es" ? `<div class="group"><label for="name" class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#febd17] transition-colors" data-svelte-h="svelte-1spqo0u">Nombre</label> <input type="text" name="name" id="name" placeholder="Su Nombre" required class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none"${add_attribute("value", formData.name, 0)}></div> <div class="group"><label for="email" class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#febd17] transition-colors" data-svelte-h="svelte-6noghb">Correo Electrónico</label> <input type="email" name="email" id="email" placeholder="juan@ejemplo.com" required class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none"${add_attribute("value", formData.email, 0)}></div> <div class="group"><label for="phone" class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#febd17] transition-colors" data-svelte-h="svelte-1gsbiwa">Teléfono</label> <input type="tel" name="phone" id="phone" placeholder="(555) 123-4567" required class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none"${add_attribute("value", formData.phone, 0)}></div> <div class="group"><label for="message" class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#febd17] transition-colors" data-svelte-h="svelte-vijf8c">Mensaje</label> <textarea rows="4" name="message" id="message" placeholder="Cuéntenos sobre su proyecto (mín 30 car.)..." required class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none resize-none">${escape("")}</textarea> <div class="${"text-right text-xs mt-1 " + escape(
    formData.messageText.length >= 30 ? "text-green-500" : "text-gray-400",
    true
  )}">${escape(formData.messageText.length)} / 30</div></div>` : `<div class="group"><label for="name" class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#febd17] transition-colors" data-svelte-h="svelte-19gk433">Nom</label> <input type="text" name="name" id="name" placeholder="Votre Nom" required class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none"${add_attribute("value", formData.name, 0)}></div> <div class="group"><label for="email" class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#febd17] transition-colors" data-svelte-h="svelte-y9ze4z">Courriel</label> <input type="email" name="email" id="email" placeholder="jean@exemple.com" required class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none"${add_attribute("value", formData.email, 0)}></div> <div class="group"><label for="phone" class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#febd17] transition-colors" data-svelte-h="svelte-14de93q">Téléphone</label> <input type="tel" name="phone" id="phone" placeholder="(555) 123-4567" required class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none"${add_attribute("value", formData.phone, 0)}></div> <div class="group"><label for="message" class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#febd17] transition-colors" data-svelte-h="svelte-14u37cy">Message</label> <textarea rows="4" name="message" id="message" placeholder="Parlez-nous de votre projet (min 30 car.)..." required class="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#febd17] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none resize-none">${escape("")}</textarea> <div class="${"text-right text-xs mt-1 " + escape(
    formData.messageText.length >= 30 ? "text-green-500" : "text-gray-400",
    true
  )}">${escape(formData.messageText.length)} / 30</div></div>`}`}</div></div>  <div class="flex flex-col space-y-8"> <div class="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl dark:shadow-none border border-gray-100 dark:border-zinc-800 transition-all duration-300 hover:border-[#febd17]/30"><div class="mb-8"><h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">${$language == "en" ? `Book a Call` : `${$language == "es" ? `Reservar una Llamada` : `Réserver un Appel`}`}</h3> <p class="text-sm text-gray-500 dark:text-gray-400">${$language == "en" ? `Select available times below for us to call you.` : `${$language == "es" ? `Seleccione los horarios disponibles a continuación para que lo llamemos.` : `Sélectionnez ci-dessous les créneaux disponibles pour que nous vous appelions.`}`}</p></div> <div class="grid grid-cols-2 lg:grid-cols-2 gap-4">${each(calendarWeeks.slice(0, nDays), (day) => {
    return `<div class="flex flex-col space-y-2"><span class="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 ml-1">${escape(translate(day.day, $language).slice(0, 3))} ${escape(day.date.split(" ")[1])}</span> <button${add_attribute("id", day.date + "_noon", 0)} class="${"w-full py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 border " + escape(
      formData.bookedTimes.includes(day.date + "_noon") ? "bg-[#febd17] border-[#febd17] text-black shadow-lg shadow-yellow-500/20 transform scale-105" : blockedDays.includes(day.date + "_noon") ? "bg-gray-100 dark:bg-zinc-800 border-transparent text-gray-400 cursor-not-allowed" : "bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-300 hover:border-[#febd17] hover:text-[#febd17] active:scale-95",
      true
    )}" ${blockedDays.includes(day.date + "_noon") ? "disabled" : ""}>${escape(blockedDays.includes(day.date + "_noon") ? "---" : translate("Noon", $language))}</button> <button${add_attribute("id", day.date + "_afternoon", 0)} class="${"w-full py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 border " + escape(
      formData.bookedTimes.includes(day.date + "_afternoon") ? "bg-[#febd17] border-[#febd17] text-black shadow-lg shadow-yellow-500/20 transform scale-105" : blockedDays.includes(day.date + "_afternoon") ? "bg-gray-100 dark:bg-zinc-800 border-transparent text-gray-400 cursor-not-allowed" : "bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-300 hover:border-[#febd17] hover:text-[#febd17] active:scale-95",
      true
    )}" ${blockedDays.includes(day.date + "_afternoon") ? "disabled" : ""}>${escape(blockedDays.includes(day.date + "_afternoon") ? "---" : translate("Afternoon", $language))}</button> </div>`;
  })}</div></div>  <div class="flex flex-col items-center">${``} ${``} <button type="button" ${!formDataValid.name || !formDataValid.email || !formDataValid.phone || !formDataValid.messageText ? "disabled" : ""} class="w-full py-5 text-base font-bold text-black uppercase tracking-wider bg-[#febd17] hover:bg-[#e5aa15] rounded-xl shadow-lg shadow-yellow-500/20 transform hover:-translate-y-1 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-3">${`<span>${escape($language == "en" ? "Send Request" : $language === "es" ? "Enviar Solicitud" : "Envoyer la Demande")}</span> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>`}</button> <p class="mt-4 text-xs text-gray-400 text-center">${escape($language == "en" ? "Protected by industry standard encryption." : $language === "es" ? "Protegido por cifrado estándar de la industria." : "Protégé par un cryptage standard de l'industrie.")}</p></div></div></div></div></div>`;
});
const InlineCTA = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let lang;
  let $language, $$unsubscribe_language;
  $$unsubscribe_language = subscribe(language, (value) => $language = value);
  let { variant = "banner" } = $$props;
  const t = {
    fr: {
      title: "Besoin d'une soumission ?",
      subtitle: "Recevez votre estimation gratuite en moins de 24 heures",
      cta: "Obtenir ma soumission",
      call: "Ou appelez",
      phone: "+1 (514) 830-9973",
      urgent: "⚡ Réponse rapide garantie"
    },
    en: {
      title: "Need a quote?",
      subtitle: "Get your free estimate in less than 24 hours",
      cta: "Get my quote",
      call: "Or call",
      phone: "+1 (514) 830-9973",
      urgent: "⚡ Fast response guaranteed"
    },
    es: {
      title: "¿Necesita una cotización?",
      subtitle: "Reciba su estimación gratuita en menos de 24 horas",
      cta: "Obtener mi cotización",
      call: "O llame",
      phone: "+1 (514) 830-9973",
      urgent: "⚡ Respuesta rápida garantizada"
    }
  };
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  lang = $language || "fr";
  $$unsubscribe_language();
  return `${variant === "banner" ? `<section class="relative my-16 px-4" aria-label="Call to action"><div class="container max-w-5xl"><div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-black via-zinc-900 to-black border border-[#febd17]/30 p-8 md:p-12 shadow-2xl"><div class="absolute top-0 right-0 w-96 h-96 bg-[#febd17] rounded-full blur-3xl opacity-20 -z-0"></div> <div class="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500 rounded-full blur-3xl opacity-10 -z-0"></div> <div class="absolute inset-0 bg-[linear-gradient(rgba(254,189,23,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(254,189,23,0.03)_1px,transparent_1px)] bg-[size:30px_30px]"></div> <div class="relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between"><div class="flex-1 text-center md:text-left"><span class="inline-block text-[#febd17] font-bold uppercase tracking-widest text-xs mb-3">${escape(t[lang].urgent)}</span> <h3 class="text-3xl md:text-4xl font-black text-white mb-2">${escape(t[lang].title)}</h3> <p class="text-zinc-300 text-lg">${escape(t[lang].subtitle)}</p></div> <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto"><a href="#contact" class="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#febd17] to-yellow-500 hover:from-yellow-400 hover:to-[#febd17] text-black font-black text-base transition-all hover:scale-105 shadow-2xl shadow-yellow-500/40 whitespace-nowrap">${validate_component(Calendar, "Calendar").$$render($$result, { class: "w-5 h-5" }, {}, {})} ${escape(t[lang].cta)} ${validate_component(ArrowRight, "ArrowRight").$$render(
    $$result,
    {
      class: "w-4 h-4 group-hover:translate-x-1 transition-transform"
    },
    {},
    {}
  )}</a> <a href="tel:+15148309973" class="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/20 text-white hover:bg-white/10 font-bold text-base transition-all whitespace-nowrap">${validate_component(Phone, "Phone").$$render($$result, { class: "w-5 h-5" }, {}, {})} ${escape(t[lang].phone)}</a></div></div></div></div></section>` : `${variant === "card" ? `<div class="rounded-2xl bg-gradient-to-br from-[#febd17] to-yellow-600 p-6 text-black shadow-2xl"><h3 class="text-xl font-black mb-2">${escape(t[lang].title)}</h3> <p class="mb-4 opacity-80">${escape(t[lang].subtitle)}</p> <a href="#contact" class="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black text-[#febd17] font-bold text-sm hover:scale-105 transition-transform">${escape(t[lang].cta)} ${validate_component(ArrowRight, "ArrowRight").$$render($$result, { class: "w-4 h-4" }, {}, {})}</a></div>` : `<div class="flex items-center justify-between gap-4 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-500/10 border border-[#febd17]/30"><p class="font-semibold text-sm">${escape(t[lang].title)}</p> <a href="#contact" class="inline-flex items-center gap-1 text-[#febd17] font-bold text-sm hover:underline whitespace-nowrap">${escape(t[lang].cta)} ${validate_component(ArrowRight, "ArrowRight").$$render($$result, { class: "w-4 h-4" }, {}, {})}</a></div>`}`}`;
});
export {
  ContactUs as C,
  InlineCTA as I
};
