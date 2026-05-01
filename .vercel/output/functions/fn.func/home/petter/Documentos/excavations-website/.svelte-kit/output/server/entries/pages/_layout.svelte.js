import { c as create_ssr_component, a as subscribe, e as escape, b as add_attribute, d as each, v as validate_component } from "../../chunks/ssr.js";
/* empty css               */
import { p as page } from "../../chunks/stores.js";
import { t as theme, l as language } from "../../chunks/store.js";
import { l as logo } from "../../chunks/logo.js";
import { l as localBusinessJsonLd, w as websiteJsonLd, f as faqJsonLd, b as breadcrumbJsonLd, S as SITE, a as SEO } from "../../chunks/SEO.js";
const Topbar2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  let $language, $$unsubscribe_language;
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe_language = subscribe(language, (value) => $language = value);
  let { menuOptions } = $$props;
  let { logo: logo2 } = $$props;
  language.subscribe((value) => {
  });
  if ($$props.menuOptions === void 0 && $$bindings.menuOptions && menuOptions !== void 0)
    $$bindings.menuOptions(menuOptions);
  if ($$props.logo === void 0 && $$bindings.logo && logo2 !== void 0)
    $$bindings.logo(logo2);
  $$unsubscribe_theme();
  $$unsubscribe_language();
  return `<nav class="${"py-4 px-6 sm:px-8 lg:px-12 fixed top-0 left-0 w-full z-50 transition-all duration-300 " + escape(
    $theme === "dark" ? "bg-transparent text-white" : "bg-transparent text-black",
    true
  )}"><div class="flex flex-wrap justify-between items-center"><div class="flex items-center w-full lg:w-auto justify-between lg:justify-start"><a href="/" class="flex items-center"><img${add_attribute("src", logo2, 0)} alt="mini excavations erable" class="h-8 sm:h-10 mr-2"> <span class="text-lg font-bold" data-svelte-h="svelte-qrxj5o">Mini Excavations Erable</span></a> <button class="${"lg:hidden focus:outline-none transition-colors " + escape(
    "text-white",
    true
  )}" aria-label="Toggle Menu"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button></div> <div class="hidden lg:flex items-center space-x-6 font-bold">${each(menuOptions, (opt) => {
    return `<a href="${"../" + escape(opt.link, true)}" class="h-full"><div class="h-full flex items-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black sm:p-4 p-2 sm:px-8 rounded sm:text-lg transition-colors text-sm">${escape(opt.text)}</div> </a>`;
  })} <select class="border-none hover:border-none rounded-md selection:border-none m-2 bg-transparent focus:ring-0"><option value="en" class="text-black" ${$language == "en" ? "selected" : ""}>En</option><option value="fr" class="text-black" ${$language == "fr" ? "selected" : ""}>Fr</option><option value="es" class="text-black" ${$language == "es" ? "selected" : ""}>Es</option></select></div> <div class="hidden lg:flex items-center" data-svelte-h="svelte-1k31upe"><a href="tel:15148309973" class="flex items-center font-bold hover:text-gray-700 dark:hover:text-gray-300 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
      +1 (514) 830-9973</a></div></div> ${``}</nav>`;
});
const css$2 = {
  code: "@keyframes svelte-m02k13-fade-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.animate-fade-in.svelte-m02k13{animation:svelte-m02k13-fade-in 0.3s ease-out}",
  map: null
};
const FloatingActions = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_language;
  let $$unsubscribe_theme;
  $$unsubscribe_language = subscribe(language, (value) => value);
  $$unsubscribe_theme = subscribe(theme, (value) => value);
  $$result.css.add(css$2);
  $$unsubscribe_language();
  $$unsubscribe_theme();
  return `${``}`;
});
const css$1 = {
  code: "@keyframes svelte-77b2q4-slide-up{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}.animate-slide-up.svelte-77b2q4{animation:svelte-77b2q4-slide-up 0.4s ease-out}",
  map: null
};
const StickyCTA = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_language;
  $$unsubscribe_language = subscribe(language, (value) => value);
  $$result.css.add(css$1);
  $$unsubscribe_language();
  return `${``}`;
});
const css = {
  code: "@keyframes svelte-1ig6d26-fade-in{from{opacity:0}to{opacity:1}}@keyframes svelte-1ig6d26-scale-up{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}.animate-fade-in.svelte-1ig6d26{animation:svelte-1ig6d26-fade-in 0.3s ease-out}.animate-scale-up.svelte-1ig6d26{animation:svelte-1ig6d26-scale-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)}",
  map: null
};
const ExitIntentModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_language;
  $$unsubscribe_language = subscribe(language, (value) => value);
  $$result.css.add(css);
  $$unsubscribe_language();
  return `${``}`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentLang;
  let isAdmin;
  let jsonLdSchemas;
  let menuOptions;
  let $page, $$unsubscribe_page;
  let $language, $$unsubscribe_language;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_language = subscribe(language, (value) => $language = value);
  currentLang = $language || "fr";
  isAdmin = $page.url.pathname.startsWith("/mi/");
  jsonLdSchemas = [
    localBusinessJsonLd(currentLang),
    websiteJsonLd(currentLang),
    faqJsonLd(currentLang),
    breadcrumbJsonLd([{ name: "Accueil", url: SITE.url }])
  ];
  menuOptions = currentLang === "fr" ? [
    { text: "Services", link: "#services" },
    { text: "Blogs", link: "#blogs" },
    { text: "À propos", link: "#about-us" },
    { text: "Contact", link: "#contact" }
  ] : currentLang === "es" ? [
    { text: "Servicios", link: "#services" },
    { text: "Blogs", link: "#blogs" },
    {
      text: "Sobre Nosotros",
      link: "#about-us"
    },
    { text: "Contacto", link: "#contact" }
  ] : [
    { text: "Services", link: "#services" },
    { text: "Blogs", link: "#blogs" },
    { text: "About Us", link: "#about-us" },
    { text: "Contact", link: "#contact" }
  ];
  $$unsubscribe_page();
  $$unsubscribe_language();
  return `${isAdmin ? `${slots.default ? slots.default({}) : ``}` : `${validate_component(SEO, "SEO").$$render($$result, { lang: currentLang, jsonLd: jsonLdSchemas }, {}, {})} ${validate_component(Topbar2, "Topbar2").$$render($$result, { menuOptions, logo }, {}, {})} ${slots.default ? slots.default({}) : ``} ${validate_component(FloatingActions, "FloatingActions").$$render($$result, {}, {}, {})} ${validate_component(StickyCTA, "StickyCTA").$$render($$result, {}, {}, {})} ${validate_component(ExitIntentModal, "ExitIntentModal").$$render($$result, {}, {}, {})}`}`;
});
export {
  Layout as default
};
