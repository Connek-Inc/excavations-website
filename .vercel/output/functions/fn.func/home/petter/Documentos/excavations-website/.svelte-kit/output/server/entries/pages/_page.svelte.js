import { c as create_ssr_component, f as compute_rest_props, g as spread, h as escape_attribute_value, i as escape_object, a as subscribe, e as escape, b as add_attribute, v as validate_component, d as each } from "../../chunks/ssr.js";
import { l as language } from "../../chunks/store.js";
import { cva } from "class-variance-authority";
import { c as cn } from "../../chunks/lib-utils.js";
import "clsx";
import { i as importance } from "../../chunks/frenchdrain2.js";
import { C as ContactUs, I as InlineCTA } from "../../chunks/InlineCTA.js";
import { F as Footer } from "../../chunks/Footer.js";
import { w as waterproofing } from "../../chunks/basement-sump-pumps-installation-1.js";
import { b as benefits } from "../../chunks/residential-excavating-service-image-600x400-1.js";
import { l as localBusinessJsonLd, w as websiteJsonLd, f as faqJsonLd, s as serviceJsonLd, S as SITE, a as SEO } from "../../chunks/SEO.js";
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "variant", "size"]);
  const buttonVariants = cva("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: { variant: "default", size: "default" }
  });
  let { class: className = void 0 } = $$props;
  let { variant = "default" } = $$props;
  let { size = "default" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `<button${spread(
    [
      {
        class: escape_attribute_value(cn(buttonVariants({ variant, size, className })))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</button>`;
});
const banner = "/_app/immutable/assets/banner.BM-gk5F_.jpg";
const excavation2 = "/_app/immutable/assets/excavation2.YFAEktvn.jpg";
const fissure2 = "/_app/immutable/assets/fissure2.CyqstC3W.jpg";
const demolition2 = "/_app/immutable/assets/demolition2.3dWaItIa.jpg";
const inspection2 = "/_app/immutable/assets/inspection2.BI1_foG9.jpg";
const partner1 = "/_app/immutable/assets/partner1.BYZJ2Kf0.jpg";
const partner2 = "/_app/immutable/assets/partner2.CrgWnSAm.jpg";
const partner3 = "/_app/immutable/assets/partner3.BZhMnZJe.jpg";
const certif1 = "data:image/png;base64,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";
const certif2 = "/_app/immutable/assets/RBQ.DXAyArpO.png";
const certif3 = "/_app/immutable/assets/CMMTQ.QYKK5cAN.svg";
const certif4 = "/_app/immutable/assets/CCQ.D3M7-nHi.png";
const css = {
  code: ".map-responsive.svelte-zrgfih.svelte-zrgfih{overflow:hidden;padding-bottom:40%;position:relative;height:0}.map-responsive.svelte-zrgfih iframe.svelte-zrgfih{left:0;top:0;height:100%;width:100%;position:absolute}",
  map: null
};
const Map = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $language, $$unsubscribe_language;
  $$unsubscribe_language = subscribe(language, (value) => $language = value);
  $$result.css.add(css);
  $$unsubscribe_language();
  return `<div class="container py-10 px-10 mx-0 min-w-full flex flex-col items-center bg-white dark:bg-black transition-colors duration-300">${$language == "en" ? `<h2 class="text-5xl mb-3 text-black dark:text-white font-bold tracking-tight" data-svelte-h="svelte-1c0zdb3">Location</h2>` : `<h2 class="text-5xl mb-3 text-black dark:text-white font-bold tracking-tight" data-svelte-h="svelte-jnhtrb">Emplacement</h2>`}</div> <div class="map-responsive svelte-zrgfih" data-svelte-h="svelte-3khja"><iframe title="Location Map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1183.2234025592456!2d-73.45350570359973!3d45.49448531876793!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc905553064dc7f%3A0xa4c908350cd9c214!2sMini%20Excavation%20%C3%89rable!5e1!3m2!1ses-419!2sve!4v1714498727194!5m2!1ses-419!2sve" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="svelte-zrgfih"></iframe> </div>`;
});
const Blogs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $language, $$unsubscribe_language;
  $$unsubscribe_language = subscribe(language, (value) => $language = value);
  let maintitle;
  let button;
  let subtitle1;
  let title1;
  let description1;
  let subtitle2;
  let title2;
  let description2;
  let subtitle3;
  let title3;
  let description3;
  if ($language == "en") {
    maintitle = "LATEST BLOGS";
    button = "Read More";
    subtitle1 = "";
    title1 = "The Importance of French Drain Installation for Your Home";
    description1 = "Learn about the importance of French drain installation for your home. Discover how proper drainage solutions can prevent flooding and protect your foundation";
    subtitle2 = "";
    title2 = "Top 5 Benefits of Excavation Services for Your Residential Projects";
    description2 = "Discover the top 5 benefits of excavation services for your residential projects. Learn how professional excavation can ensure successful site preparation and foundation stability.";
    subtitle3 = "";
    title3 = "Waterproofing Solutions for a Dry Basement";
    description3 = "Discover effective waterproofing solutions for keeping your basement dry. Learn about sump pump installation and other techniques to protect your home.";
  } else if ($language == "fr") {
    maintitle = "DERNIERS BLOGS";
    button = "En Savoir Plus";
    subtitle1 = "";
    title1 = "L'Importance de l'Installation de Drains Français pour Votre Maison";
    description1 = "Learn about the importance of French drain installation for your home. Discover how proper drainage solutions can prevent flooding and protect your foundation";
    subtitle2 = "";
    title2 = "Les 5 Principaux Avantages des Services d'Excavation pour Vos Projets Résidentiels";
    description2 = "Découvrez les 5 principaux avantages des services d'excavation pour vos projets résidentiels. Apprenez comment une excavation professionnelle peut garantir une préparation du site réussie et une stabilité des fondations.";
    subtitle3 = "";
    title3 = "Solutions d'Imperméabilisation pour un Sous-Sol Sec";
    description3 = "Découvrez des solutions efficaces d'imperméabilisation pour garder votre sous-sol sec. Apprenez-en plus sur l'installation de pompes de puisard et d'autres techniques pour protéger votre maison.";
  }
  $$unsubscribe_language();
  return `<div id="blogs" class="bg-gray-100 dark:bg-black px-4 py-20 font-[sans-serif] transition-colors duration-300"><div class="max-w-6xl mx-auto"><div class="text-center"><h2 class="text-3xl font-extrabold text-[#333] dark:text-white uppercase tracking-tight">${escape(maintitle)}</h2></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-md:max-w-lg mx-auto"><div class="rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-transparent dark:border-zinc-800 p-6 hover:shadow-xl dark:hover:bg-zinc-800 transition-all duration-300 group"><div class="overflow-hidden rounded-lg mb-4" data-svelte-h="svelte-101807c"><img${add_attribute("src", importance, 0)} alt="Blog Post 1" class="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"></div> <div class="text-center"><span class="text-xs font-bold text-[#febd17] mb-2 mt-2 block uppercase tracking-wider">${escape(subtitle1 || "BLOG POST")}</span> <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">${escape(title1)}</h3> <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">${escape(description1)}</p> <a href="/blog/importance"><button type="button" class="px-6 py-3 text-black font-bold text-sm tracking-wider border-none outline-none bg-[#febd17] hover:bg-[#e5aa15] rounded-full mt-6 transition-all hover:scale-105 shadow-lg shadow-yellow-500/20">${escape(button)}</button></a></div></div> <div class="rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-transparent dark:border-zinc-800 p-6 hover:shadow-xl dark:hover:bg-zinc-800 transition-all duration-300 group"><div class="overflow-hidden rounded-lg mb-4" data-svelte-h="svelte-1p9khbv"><img${add_attribute("src", benefits, 0)} alt="Blog Post 2" class="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"></div> <div class="text-center"><span class="text-xs font-bold text-[#febd17] mb-2 mt-2 block uppercase tracking-wider">${escape(subtitle2 || "BLOG POST")}</span> <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">${escape(title2)}</h3> <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">${escape(description2)}</p> <a href="/blog/benefits"><button type="button" class="px-6 py-3 text-black font-bold text-sm tracking-wider border-none outline-none bg-[#febd17] hover:bg-[#e5aa15] rounded-full mt-6 transition-all hover:scale-105 shadow-lg shadow-yellow-500/20">${escape(button)}</button></a></div></div> <div class="rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-transparent dark:border-zinc-800 p-6 hover:shadow-xl dark:hover:bg-zinc-800 transition-all duration-300 group"><div class="overflow-hidden rounded-lg mb-4" data-svelte-h="svelte-ckpqpl"><img${add_attribute("src", waterproofing, 0)} alt="Blog Post 3" class="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"></div> <div class="text-center"><span class="text-xs font-bold text-[#febd17] mb-2 mt-2 block uppercase tracking-wider">${escape(subtitle3 || "BLOG POST")}</span> <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">${escape(title3)}</h3> <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">${escape(description3)}</p> <a href="/blog/waterproofing"><button type="button" class="px-6 py-3 text-black font-bold text-sm tracking-wider border-none outline-none bg-[#febd17] hover:bg-[#e5aa15] rounded-full mt-6 transition-all hover:scale-105 shadow-lg shadow-yellow-500/20">${escape(button)}</button></a></div></div></div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentLang;
  let homeJsonLd;
  let texts;
  let services;
  let $language, $$unsubscribe_language;
  $$unsubscribe_language = subscribe(language, (value) => $language = value);
  const partners = [partner2, partner3, partner1];
  const certifications = [certif1, certif2, certif3, certif4];
  currentLang = $language || "fr";
  homeJsonLd = [
    localBusinessJsonLd(currentLang),
    websiteJsonLd(currentLang),
    faqJsonLd(currentLang),
    serviceJsonLd({
      name: currentLang === "fr" ? "Installation de Drain Français au Québec" : currentLang === "es" ? "Instalación de Drenaje Francés en Quebec" : "French Drain Installation in Quebec",
      description: currentLang === "fr" ? "Installation, réparation et remplacement de drain français résidentiel et commercial. Garantie écrite, certifié RBQ." : currentLang === "es" ? "Instalación, reparación y reemplazo de drenaje francés residencial y comercial. Garantía escrita, certificado RBQ." : "Residential and commercial French drain installation, repair and replacement. Written warranty, RBQ certified.",
      url: SITE.url,
      lang: currentLang
    })
  ];
  texts = {
    heroTitle: "Mini Excavations Érable",
    heroSubtitle: $language === "en" ? "With 15+ years of experience." : $language === "es" ? "Con más de 15 años de experiencia." : "Avec plus de 15 ans d’expérience.",
    cta: $language === "en" ? "Contact Us" : $language === "es" ? "Contáctanos" : "Contactez nous",
    servicesCta: $language === "en" ? "Our Services" : $language === "es" ? "Nuestros Servicios" : "Nos Services",
    guarantee: $language === "en" ? "BEST SERVICE GUARANTEED" : $language === "es" ? "MEJOR SERVICIO GARANTIZADO" : "MEILLEUR SERVICE GARANTI",
    servicesTitle: $language === "en" ? "Our Services" : $language === "es" ? "Nuestros Servicios" : "Nos Services",
    servicesSubtitle: $language === "en" ? "Professional solutions for your excavation needs" : $language === "es" ? "Soluciones profesionales para sus necesidades de excavación" : "Solutions professionnelles pour vos besoins d'excavation",
    aboutTitle: $language === "en" ? "About Us" : $language === "es" ? "Sobre Nosotros" : "À Propos",
    aboutText: $language === "en" ? "With more than 15 years of experience, Mini Excavations Érable is recognized as a leader in Quebec in the fields of construction and restoration of French drains, demolition, crack repair, and camera inspections. Our long history and deep expertise testify to our commitment to excellence and quality of service, supported by all the necessary certifications and qualifications. Our team of experts is dedicated to offering customized and effective solutions, precisely meeting the specific needs of each project. By choosing Mini Excavations Érable, you opt for a company whose reliability and excellence are proven by decades of experience." : $language === "es" ? "Con más de 15 años de experiencia, Mini Excavations Érable es reconocido como líder en Quebec en los campos de construcción y restauración de drenajes franceses, demolición, reparación de grietas e inspecciones con cámara. Nuestra larga historia y profunda experiencia atestiguan nuestro compromiso con la excelencia y la calidad del servicio, respaldados por todas las certificaciones y calificaciones necesarias. Nuestro equipo de expertos está dedicado a ofrecer soluciones personalizadas y efectivas, respondiendo con precisión a las necesidades específicas de cada proyecto. Al elegir Mini Excavations Érable, opta por una empresa cuya confiabilidad y excelencia están probadas por décadas de experiencia." : "Fort de plus de 15 ans d'expérience, Mini Excavations Érable est reconnu comme un leader au Québec dans les domaines de la construction et de la restauration de drains français, de la démolition, de la réparation de fissures et des inspections par caméra. Notre longue histoire et notre expertise approfondie témoignent de notre engagement envers l'excellence et la qualité de service, soutenus par toutes les certifications et qualifications nécessaires. Notre équipe d'experts est dédiée à offrir des solutions personnalisées et efficaces, répondant précisément aux besoins spécifiques de chaque projet. En choisissant Mini Excavations Érable, vous optez pour une entreprise dont la fiabilité et l'excellence sont prouvées par des décennies d'expérience.",
    partnersTitle: $language === "en" ? "Partners" : $language === "es" ? "Socios" : "Partenaires",
    certificationsTitle: $language === "en" ? "Certifications" : $language === "es" ? "Certificaciones" : "Attestations",
    learnMore: $language === "en" ? "Learn More" : $language === "es" ? "Saber Más" : "En savoir plus"
  };
  services = [
    {
      title: $language === "en" ? "Excavations" : $language === "es" ? "Excavaciones" : "Excavations",
      description: $language === "en" ? "Complete excavation services with a commitment to safety and the environment for each project." : $language === "es" ? "Servicios completos de excavación con un compromiso con la seguridad y el medio ambiente para cada proyecto." : "Services complets d'excavation avec un engagement envers la sécurité et l'environnement pour chaque projet.",
      image: excavation2
    },
    {
      title: $language === "en" ? "French Drains" : $language === "es" ? "Drenajes Franceses" : "Drains Français",
      description: $language === "en" ? "Expert French drain solutions for long-lasting protection against moisture." : $language === "es" ? "Soluciones expertas en drenajes franceses para una protección duradera contra la humedad." : "Solutions expertes en drains français pour une protection durable contre l'humidité.",
      image: importance
    },
    {
      title: $language === "en" ? "Crack Repairs" : $language === "es" ? "Reparación de Grietas" : "Réparations de Fissures",
      description: $language === "en" ? "Effective crack repairs, ensuring the safety and integrity of foundations." : $language === "es" ? "Reparaciones efectivas de grietas, garantizando la seguridad e integridad de los cimientos." : "Réparations efficaces de fissures, garantissant la sécurité et l'intégrité des fondations.",
      image: fissure2
    },
    {
      title: $language === "en" ? "Demolition" : $language === "es" ? "Demolición" : "Démolition",
      description: $language === "en" ? "Secure and environmentally respectful demolition, suitable for all types of projects." : $language === "es" ? "Demolición segura y respetuosa con el medio ambiente, adecuada para todo tipo de proyectos." : "Démolition sécurisée et respectueuse de l'environnement, adaptée à tous types de projets.",
      image: demolition2
    },
    {
      title: $language === "en" ? "Camera Inspection" : $language === "es" ? "Inspección con Cámara" : "Inspection par Caméra",
      description: $language === "en" ? "Precise pipeline diagnostics with cutting-edge technology for non-invasive inspections." : $language === "es" ? "Diagnósticos precisos de tuberías con tecnología de punta para inspecciones no invasivas." : "Diagnostics précis de canalisations avec une technologie de pointe pour des inspections non invasives.",
      image: inspection2
    }
  ];
  $$unsubscribe_language();
  return `${validate_component(SEO, "SEO").$$render(
    $$result,
    {
      lang: currentLang,
      path: "/",
      jsonLd: homeJsonLd
    },
    {},
    {}
  )} <main class="flex flex-col min-h-screen bg-background font-sans" itemscope itemtype="https://schema.org/LocalBusiness"> <section class="relative bg-white dark:bg-black text-black dark:text-white overflow-hidden pb-16 lg:pb-24 pt-20" id="home" aria-labelledby="hero-heading"> <div class="absolute inset-0 z-0" data-svelte-h="svelte-v69hlg"><div class="absolute top-0 left-0 w-1/2 h-full bg-white dark:bg-black"></div></div> <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div class="lg:grid lg:grid-cols-12 lg:gap-8"> <div class="lg:col-span-6 flex flex-col justify-center text-left py-12 lg:py-32"><div class="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-900 px-4 py-1.5 text-sm font-medium text-gray-800 dark:text-gray-300 mb-8 self-start border border-gray-200 dark:border-gray-800"><span class="flex h-2 w-2 rounded-full bg-[#febd17] mr-2"></span> ${escape(currentLang === "en" ? "Professional Excavation Services" : currentLang === "es" ? "Servicios Profesionales de Excavación" : "Services d'Excavation Professionnels")}</div> <h1 id="hero-heading" class="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6" itemprop="name" data-svelte-h="svelte-exqswy"><span class="block text-black dark:text-white">Mini Excavations</span> <span class="block text-[#febd17]">Érable</span></h1> <p class="text-2xl md:text-3xl font-bold text-black dark:text-white mb-4">${escape(currentLang === "fr" ? "Drain Français, Excavation & Réparation de Fondation au Québec" : currentLang === "es" ? "Drenaje Francés, Excavación y Reparación de Cimientos en Quebec" : "French Drain, Excavation & Foundation Repair in Quebec")}</p> <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl leading-relaxed font-light" itemprop="description">${escape(texts.heroSubtitle)} ${escape(currentLang === "fr" ? " Entrepreneur certifié RBQ desservant Montréal, Laval, Laurentides et Lanaudière. Soumission gratuite en 24h." : currentLang === "es" ? " Contratista certificado RBQ que sirve Montreal, Laval, Laurentides y Lanaudière. Cotización gratuita en 24h." : " RBQ-certified contractor serving Montreal, Laval, Laurentians and Lanaudière. Free quote within 24 hours.")}</p>  <div class="flex flex-wrap gap-2 mb-8 text-xs"><span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-400 font-semibold"><span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> ${escape(currentLang === "fr" ? "Disponible maintenant" : currentLang === "es" ? "Disponible ahora" : "Available now")}</span> <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/30 text-yellow-700 dark:text-yellow-400 font-semibold">★ 4.9/5 (127 ${escape(currentLang === "fr" ? "avis" : currentLang === "es" ? "reseñas" : "reviews")})</span> <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-400 font-semibold" data-svelte-h="svelte-55ymuz">✓ RBQ</span> <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/30 text-orange-700 dark:text-orange-400 font-semibold">⚡ ${escape(currentLang === "fr" ? "Réponse 24h" : currentLang === "es" ? "Respuesta 24h" : "24h response")}</span></div> <div class="flex flex-col sm:flex-row gap-3"><a href="#contact" class="group inline-flex items-center justify-center gap-2 px-8 py-5 rounded-full bg-gradient-to-r from-[#febd17] to-yellow-500 hover:from-yellow-400 hover:to-[#febd17] text-black font-black text-lg shadow-2xl shadow-yellow-500/40 hover:shadow-yellow-500/60 transition-all hover:scale-105 active:scale-95 relative overflow-hidden"><span class="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity"></span> <span class="relative">📋 ${escape(currentLang === "fr" ? "Soumission gratuite" : currentLang === "es" ? "Cotización gratuita" : "Free quote")}</span> <svg class="w-5 h-5 relative group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg></a> <a href="tel:+15148309973" class="group inline-flex items-center justify-center gap-2 px-8 py-5 rounded-full border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-bold text-lg transition-all hover:scale-105 active:scale-95" data-svelte-h="svelte-u9xklt"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            (514) 830-9973</a></div> <p class="mt-4 text-xs text-gray-500 dark:text-zinc-500 flex items-center gap-1.5"><svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> ${escape(currentLang === "fr" ? "Sans engagement · Réponse rapide · Devis détaillé" : currentLang === "es" ? "Sin compromiso · Respuesta rápida · Cotización detallada" : "No obligation · Fast response · Detailed quote")}</p></div>  <div class="relative lg:col-span-6 lg:-mr-8 xl:absolute xl:inset-y-0 xl:right-0 xl:w-1/2"><div class="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full clip-path-slant"><img class="h-full w-full object-cover"${add_attribute("src", banner, 0)}${add_attribute(
    "alt",
    currentLang === "fr" ? "Excavation et installation de drain français à Montréal par Mini Excavations Érable" : currentLang === "es" ? "Excavación e instalación de drenaje francés en Montreal por Mini Excavations Érable" : "Excavation and French drain installation in Montreal by Mini Excavations Érable",
    0
  )} width="1200" height="800" loading="eager" fetchpriority="high" itemprop="image">  <div class="absolute inset-0 bg-gradient-to-l from-transparent to-white/30 dark:to-black/30 lg:to-white/60 dark:lg:to-black/60 opacity-50"></div></div></div></div></div></section>  <style data-svelte-h="svelte-1rl6517">@media (min-width: 1024px) {
            .clip-path-slant {
                -webkit-clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%);
                        clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%);
            }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
        }</style>  <section class="bg-white dark:bg-zinc-950 border-y border-gray-200 dark:border-zinc-800 py-10" aria-label="Stats de confiance"><div class="container max-w-6xl"><div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">${each(
    [
      {
        num: "15+",
        label: currentLang === "fr" ? "Années d'expérience" : currentLang === "es" ? "Años de experiencia" : "Years experience"
      },
      {
        num: "500+",
        label: currentLang === "fr" ? "Projets réalisés" : currentLang === "es" ? "Proyectos completados" : "Projects completed"
      },
      {
        num: "24h",
        label: currentLang === "fr" ? "Soumission gratuite" : currentLang === "es" ? "Cotización gratuita" : "Free quote"
      },
      {
        num: "RBQ",
        label: currentLang === "fr" ? "Certifié et assuré" : currentLang === "es" ? "Certificado y asegurado" : "Certified & insured"
      }
    ],
    (stat, i) => {
      return `<div class="text-center group" style="${"animation: fadeInUp 0.6s ease-out " + escape(i * 0.1, true) + "s both;"}"><p class="text-4xl md:text-5xl font-black bg-gradient-to-br from-[#febd17] to-yellow-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">${escape(stat.num)}</p> <p class="text-xs md:text-sm font-medium text-gray-600 dark:text-zinc-400 uppercase tracking-wider mt-1">${escape(stat.label)}</p> </div>`;
    }
  )}</div></div></section>  <div class="bg-black dark:bg-black text-white py-12 relative overflow-hidden border-y border-white/10"> <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#febd17] to-transparent"></div> <div class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#febd17] to-transparent"></div> <div class="container flex justify-center relative z-10"><h2 class="text-xl md:text-3xl font-black text-[#febd17] tracking-[0.2em] text-center uppercase drop-shadow-sm flex items-center gap-4"><span class="hidden md:inline-block w-8 h-1 bg-[#febd17]"></span> ${escape(texts.guarantee)} <span class="hidden md:inline-block w-8 h-1 bg-[#febd17]"></span></h2></div></div>  <section class="py-16 bg-muted/30 dark:bg-black transition-colors duration-300"><div class="container max-w-5xl">${validate_component(ContactUs, "ContactUs").$$render($$result, { nDays: 9 }, {}, {})}</div></section>  <section class="py-24 bg-white dark:bg-background transition-colors duration-300" id="services" aria-labelledby="services-heading"><div class="container px-4 md:px-6"><div class="mb-16 max-w-3xl"><span class="text-[#febd17] font-bold tracking-wider uppercase text-sm mb-2 block">${escape(texts.servicesCta)}</span> <h2 id="services-heading" class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-black dark:text-white mb-6">${escape(currentLang === "fr" ? "Services d'Excavation Professionnels au Québec" : currentLang === "es" ? "Servicios Profesionales de Excavación en Quebec" : "Professional Excavation Services in Quebec")}</h2> <p class="text-gray-600 dark:text-gray-400 text-xl font-light">${escape(texts.servicesSubtitle)}</p></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 auto-rows-[minmax(300px,_auto)]">${each(services, (service, i) => {
    return `<article class="${"group relative overflow-hidden rounded-3xl bg-gray-100 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 transition-all hover:shadow-lg dark:hover:bg-zinc-900 " + escape(
      i === 0 ? "lg:col-span-4 md:col-span-2" : i === 1 ? "lg:col-span-2 md:col-span-1" : "lg:col-span-2 md:col-span-1",
      true
    )}" itemscope itemtype="https://schema.org/Service"><div class="absolute inset-0 z-0"><img${add_attribute("src", service.image, 0)}${add_attribute(
      "alt",
      `${service.title} - ${currentLang === "fr" ? "Service professionnel par Mini Excavations Érable au Québec" : currentLang === "es" ? "Servicio profesional por Mini Excavations Érable en Quebec" : "Professional service by Mini Excavations Érable in Quebec"}`,
      0
    )} class="h-full w-full object-cover opacity-30 dark:opacity-40 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-40 dark:group-hover:opacity-50" loading="lazy" width="800" height="600" itemprop="image"> <div class="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80 dark:to-transparent"></div></div> <div class="relative z-10 flex flex-col justify-end h-full p-8"><div class="mb-4"><span class="inline-block h-1 w-12 bg-[#febd17] rounded-full mb-4"></span> <h3 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2" itemprop="name">${escape(service.title)}</h3></div> <p class="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-sm md:text-base" itemprop="description">${escape(service.description)}</p> <meta itemprop="areaServed" content="Québec, Montréal, Laval, Laurentides"> <meta itemprop="provider" content="Mini Excavations Érable"></div> </article>`;
  })}</div></div></section>  ${validate_component(InlineCTA, "InlineCTA").$$render($$result, { variant: "banner" }, {}, {})}  <section class="py-24 bg-muted/50 dark:bg-black relative overflow-hidden transition-colors duration-300" id="about-us" aria-labelledby="about-heading"><div class="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"><div class="space-y-8 order-2 lg:order-1"><h2 id="about-heading" class="text-3xl md:text-5xl font-black tracking-tight text-black dark:text-white">${escape(currentLang === "fr" ? "À Propos de Mini Excavations Érable - Leader en Excavation au Québec" : currentLang === "es" ? "Sobre Mini Excavations Érable - Líder en Excavación en Quebec" : "About Mini Excavations Érable - Leader in Quebec Excavation")}</h2> <p class="text-lg text-muted-foreground dark:text-gray-400 leading-relaxed text-justify font-light">${escape(texts.aboutText)}</p> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      size: "lg",
      variant: "outline",
      class: "border-primary/20 dark:border-white/20 text-foreground dark:text-white hover:bg-primary hover:text-primary-foreground dark:hover:bg-white dark:hover:text-black shadow-sm px-8"
    },
    {},
    {
      default: () => {
        return `${escape(texts.learnMore)}`;
      }
    }
  )}</div> <div class="relative order-1 lg:order-2"><div class="absolute -inset-4 bg-[#febd17]/20 rounded-full blur-3xl opacity-50"></div> <div class="grid grid-cols-2 gap-4 relative z-10 p-4"><img${add_attribute("src", fissure2, 0)}${add_attribute(
    "alt",
    currentLang === "fr" ? "Réparation de fissure de fondation par injection époxy au Québec" : currentLang === "es" ? "Reparación de grieta de cimientos por inyección de epoxi en Quebec" : "Foundation crack repair by epoxy injection in Quebec",
    0
  )} class="rounded-2xl shadow-2xl w-full h-[300px] object-cover transform translate-y-8 hover:scale-105 transition-transform duration-500" loading="lazy" width="600" height="400"> <img${add_attribute("src", demolition2, 0)}${add_attribute(
    "alt",
    currentLang === "fr" ? "Démolition résidentielle sécuritaire et écologique au Québec" : currentLang === "es" ? "Demolición residencial segura y ecológica en Quebec" : "Safe and eco-friendly residential demolition in Quebec",
    0
  )} class="rounded-2xl shadow-2xl w-full h-[300px] object-cover transform -translate-y-8 hover:scale-105 transition-transform duration-500" loading="lazy" width="600" height="400"></div></div></div></section>  <section class="py-20 container flex flex-col items-center space-y-20 bg-white dark:bg-black transition-colors duration-300"><div class="w-full text-center space-y-10"><h3 class="text-xl font-bold text-muted-foreground dark:text-gray-500 uppercase tracking-[0.2em]">${escape(texts.partnersTitle)}</h3> <div class="flex flex-wrap justify-center items-center gap-12 md:gap-20">${each(partners, (partner) => {
    return `<img${add_attribute("src", partner, 0)} alt="Partner" class="h-16 md:h-24 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 dark:invert-[0.8] dark:hover:invert-0 transition-all duration-500 hover:scale-110">`;
  })}</div></div> <div class="w-full h-px bg-gradient-to-r from-transparent via-border dark:via-zinc-800 to-transparent max-w-4xl mx-auto"></div> <div class="w-full text-center space-y-10"><h3 class="text-xl font-bold text-muted-foreground dark:text-gray-500 uppercase tracking-[0.2em]">${escape(texts.certificationsTitle)}</h3> <div class="flex flex-wrap justify-center items-center gap-12 md:gap-16">${each(certifications, (cert) => {
    return ` <div class="bg-white dark:bg-white/10 dark:p-4 rounded-xl transition-colors duration-300"><img${add_attribute("src", cert, 0)} alt="Certification" class="h-20 md:h-28 object-contain hover:scale-110 transition-transform duration-300 drop-shadow-lg"> </div>`;
  })}</div></div></section>  <section class="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-zinc-950 relative overflow-hidden" aria-labelledby="why-heading"><div class="absolute top-0 right-0 w-96 h-96 bg-[#febd17] rounded-full blur-3xl opacity-5 -z-0"></div> <div class="absolute bottom-0 left-0 w-96 h-96 bg-[#febd17] rounded-full blur-3xl opacity-5 -z-0"></div> <div class="container relative z-10"><div class="text-center mb-16 max-w-3xl mx-auto"><span class="text-[#febd17] font-bold tracking-wider uppercase text-sm mb-2 block">${escape(currentLang === "fr" ? "Pourquoi nous choisir" : currentLang === "es" ? "Por qué elegirnos" : "Why choose us")}</span> <h2 id="why-heading" class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black dark:text-white mb-4">${escape(currentLang === "fr" ? "L'excellence, simplement." : currentLang === "es" ? "La excelencia, simplemente." : "Excellence, simply.")}</h2></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${each(
    [
      {
        icon: "🏆",
        titleFr: "Certifié RBQ",
        titleEn: "RBQ Certified",
        titleEs: "Certificado RBQ",
        descFr: "Licences RBQ, NEQ, CCQ, CMMTQ. Travail garanti par écrit.",
        descEn: "RBQ, NEQ, CCQ, CMMTQ licenses. Written warranty on all work.",
        descEs: "Licencias RBQ, NEQ, CCQ, CMMTQ. Garantía escrita en todos los trabajos."
      },
      {
        icon: "⚡",
        titleFr: "Réponse en 24h",
        titleEn: "24h Response",
        titleEs: "Respuesta en 24h",
        descFr: "Soumission gratuite, détaillée et sans engagement, livrée en moins de 24h.",
        descEn: "Free, detailed quote with no obligation, delivered in less than 24h.",
        descEs: "Cotización gratuita y detallada, sin compromiso, en menos de 24h."
      },
      {
        icon: "💎",
        titleFr: "Prix Compétitifs",
        titleEn: "Competitive Pricing",
        titleEs: "Precios Competitivos",
        descFr: "Nos propres machines = économies pour vous, sans compromis sur la qualité.",
        descEn: "We own our equipment = savings for you, without compromising quality.",
        descEs: "Equipo propio = ahorro para ti, sin comprometer la calidad."
      },
      {
        icon: "🛡️",
        titleFr: "Pleinement Assurés",
        titleEn: "Fully Insured",
        titleEs: "Totalmente Asegurados",
        descFr: "Couverture complète RC + dommages. Vos biens sont protégés.",
        descEn: "Full liability + damage coverage. Your property is protected.",
        descEs: "Cobertura completa de responsabilidad + daños. Su propiedad está protegida."
      },
      {
        icon: "🌱",
        titleFr: "Écoresponsable",
        titleEn: "Eco-Friendly",
        titleEs: "Eco-Responsable",
        descFr: "Tri et recyclage de 75%+ des matériaux selon normes Québec.",
        descEn: "75%+ material recycling per Quebec environmental standards.",
        descEs: "Reciclaje de 75%+ de materiales según normas ambientales de Quebec."
      },
      {
        icon: "🤝",
        titleFr: "Service Personnalisé",
        titleEn: "Personal Service",
        titleEs: "Servicio Personalizado",
        descFr: "Un seul contact dédié pour tout votre projet, du devis à la fin.",
        descEn: "One dedicated contact for your entire project, from quote to completion.",
        descEs: "Un contacto dedicado para todo su proyecto, de la cotización al final."
      }
    ],
    (f, i) => {
      return `<div class="group relative bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden" style="${"animation: fadeInUp 0.6s ease-out " + escape(i * 0.1, true) + "s both;"}"><div class="absolute top-0 right-0 w-32 h-32 bg-[#febd17] rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity"></div> <div class="relative"><div class="text-5xl mb-4 group-hover:scale-110 transition-transform" style="display: inline-block;">${escape(f.icon)}</div> <h3 class="text-xl font-black text-black dark:text-white mb-2">${escape(currentLang === "fr" ? f.titleFr : currentLang === "es" ? f.titleEs : f.titleEn)}</h3> <p class="text-gray-600 dark:text-zinc-400 leading-relaxed text-sm">${escape(currentLang === "fr" ? f.descFr : currentLang === "es" ? f.descEs : f.descEn)}</p> <div class="mt-4 w-12 h-0.5 bg-[#febd17] rounded-full group-hover:w-20 transition-all"></div></div> </div>`;
    }
  )}</div></div></section>  <section class="py-24 bg-black text-white relative overflow-hidden" aria-labelledby="testimonials-heading"><div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(254,189,23,0.1),transparent_70%)]"></div> <div class="container relative z-10"><div class="text-center mb-16 max-w-3xl mx-auto"><div class="flex justify-center gap-1 mb-4">${each(Array(5), (_) => {
    return `<span class="text-[#febd17] text-2xl" data-svelte-h="svelte-1m9nwfe">★</span>`;
  })}</div> <p class="text-[#febd17] font-bold tracking-wider uppercase text-sm mb-2">4.9/5 — 127 ${escape(currentLang === "fr" ? "avis vérifiés" : currentLang === "es" ? "reseñas verificadas" : "verified reviews")}</p> <h2 id="testimonials-heading" class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">${escape(currentLang === "fr" ? "Nos clients en parlent" : currentLang === "es" ? "Nuestros clientes hablan" : "What clients say")}</h2></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-6">${each(
    [
      {
        nameFr: "Marie Tremblay",
        nameEn: "Marie Tremblay",
        nameEs: "Marie Tremblay",
        location: "Montréal",
        textFr: "Drain français installé en 3 jours. Équipe ultra professionnelle, soumission claire et travail impeccable. Je recommande à 100%.",
        textEn: "French drain installed in 3 days. Ultra professional team, clear quote and impeccable work. I recommend 100%.",
        textEs: "Drenaje francés instalado en 3 días. Equipo muy profesional, cotización clara y trabajo impecable. Recomiendo al 100%."
      },
      {
        nameFr: "Jean-François Bélanger",
        nameEn: "Jean-François Bélanger",
        nameEs: "Jean-François Bélanger",
        location: "Laval",
        textFr: "Réparation de fissures rapide et efficace. Plus jamais d'infiltration depuis 2 ans. Garantie tenue, vraiment satisfait.",
        textEn: "Fast and efficient crack repair. No more infiltration in 2 years. Warranty honored, truly satisfied.",
        textEs: "Reparación de grietas rápida y eficaz. Sin infiltraciones desde hace 2 años. Garantía cumplida, muy satisfecho."
      },
      {
        nameFr: "Sophie Lavoie",
        nameEn: "Sophie Lavoie",
        nameEs: "Sophie Lavoie",
        location: "Saint-Jérôme",
        textFr: "Excavation pour piscine creusée. Travail propre, échéancier respecté et prix honnête. Une équipe en qui on peut faire confiance.",
        textEn: "Excavation for in-ground pool. Clean work, schedule respected and honest pricing. A team you can trust.",
        textEs: "Excavación para piscina. Trabajo limpio, plazos respetados y precio honesto. Un equipo confiable."
      }
    ],
    (t, i) => {
      return `<article class="bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-3xl p-8 hover:border-[#febd17]/50 transition-all" style="${"animation: fadeInUp 0.6s ease-out " + escape(i * 0.15, true) + "s both;"}" itemscope itemtype="https://schema.org/Review"><div class="flex gap-1 mb-4">${each(Array(5), (_) => {
        return `<span class="text-[#febd17]" data-svelte-h="svelte-1soar40">★</span>`;
      })}</div> <p class="text-gray-300 leading-relaxed mb-6 italic" itemprop="reviewBody">&quot;${escape(currentLang === "fr" ? t.textFr : currentLang === "es" ? t.textEs : t.textEn)}&quot;</p> <div class="flex items-center gap-3 pt-4 border-t border-zinc-800"><div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#febd17] to-yellow-600 flex items-center justify-center text-black font-black">${escape(t.nameFr[0])}</div> <div itemprop="author" itemscope itemtype="https://schema.org/Person"><p class="font-bold text-sm" itemprop="name">${escape(currentLang === "fr" ? t.nameFr : currentLang === "es" ? t.nameEs : t.nameEn)}</p> <p class="text-xs text-zinc-500">${escape(t.location)}</p> </div></div> </article>`;
    }
  )}</div></div></section>  ${validate_component(InlineCTA, "InlineCTA").$$render($$result, { variant: "banner" }, {}, {})}  <section class="py-24 bg-white dark:bg-black transition-colors duration-300" id="faq" aria-labelledby="faq-heading"><div class="container max-w-4xl"><div class="mb-12 text-center"><span class="text-[#febd17] font-bold tracking-wider uppercase text-sm mb-2 block" data-svelte-h="svelte-l51bvc">FAQ</span> <h2 id="faq-heading" class="text-3xl md:text-5xl font-black tracking-tight text-black dark:text-white">${escape(currentLang === "fr" ? "Questions Fréquentes - Excavation et Drain Français au Québec" : currentLang === "es" ? "Preguntas Frecuentes - Excavación y Drenaje Francés en Quebec" : "Frequently Asked Questions - Excavation and French Drain in Quebec")}</h2></div> <div class="space-y-4">${each(
    currentLang === "fr" ? [
      {
        q: "Combien coûte l'installation d'un drain français au Québec en 2026 ?",
        a: "Le coût d'installation varie entre 4 000$ et 12 000$ selon la longueur, la profondeur et l'accès au site. Soumissions gratuites avec garantie écrite."
      },
      {
        q: "Quand faut-il remplacer son drain français ?",
        a: "Un drain français a une durée de vie de 25 à 40 ans. Signes : infiltration d'eau, humidité, efflorescence, fissures dans la fondation."
      },
      {
        q: "Êtes-vous certifié RBQ pour l'excavation au Québec ?",
        a: "Oui, nous détenons les licences RBQ, NEQ, CCQ et CMMTQ. Tous nos travaux sont garantis."
      },
      {
        q: "Quelles régions desservez-vous au Québec ?",
        a: "Montréal, Laval, Laurentides, Lanaudière, Montérégie et la grande région métropolitaine de Québec."
      },
      {
        q: "Combien de temps prend une réparation de fissure de fondation ?",
        a: "Une réparation par injection d'époxy ou polyuréthane prend 1 à 2 jours. Pour des dommages structurels, 3 à 7 jours."
      },
      {
        q: "Offrez-vous des soumissions gratuites ?",
        a: "Oui, toutes nos soumissions sont gratuites et sans engagement, livrées en moins de 24h."
      }
    ] : currentLang === "es" ? [
      {
        q: "¿Cuánto cuesta instalar un drenaje francés en Quebec en 2026?",
        a: "Entre 4,000$ y 12,000$ según largo, profundidad y acceso. Cotizaciones gratuitas con garantía escrita."
      },
      {
        q: "¿Cuándo se debe reemplazar un drenaje francés?",
        a: "Dura 25 a 40 años. Señales: infiltración de agua, humedad, eflorescencia, grietas en cimientos."
      },
      {
        q: "¿Están certificados RBQ para excavación en Quebec?",
        a: "Sí, tenemos licencias RBQ, NEQ, CCQ y CMMTQ. Todos los trabajos están garantizados."
      },
      {
        q: "¿Qué regiones cubren en Quebec?",
        a: "Montreal, Laval, Laurentides, Lanaudière, Montérégie y área metropolitana de Quebec."
      },
      {
        q: "¿Cuánto tarda la reparación de grietas?",
        a: "Inyección de epoxi o poliuretano: 1 a 2 días. Daños estructurales: 3 a 7 días."
      },
      {
        q: "¿Ofrecen cotizaciones gratuitas?",
        a: "Sí, gratuitas y sin compromiso, entregadas en menos de 24h."
      }
    ] : [
      {
        q: "How much does French drain installation cost in Quebec in 2026?",
        a: "Between $4,000 and $12,000 depending on length, depth, and site access. Free quotes with written warranty."
      },
      {
        q: "When should you replace your French drain?",
        a: "Lifespan of 25 to 40 years. Signs: basement water infiltration, dampness, efflorescence, foundation cracks."
      },
      {
        q: "Are you RBQ certified for excavation in Quebec?",
        a: "Yes, we hold RBQ, NEQ, CCQ and CMMTQ licenses. All work is warrantied."
      },
      {
        q: "What areas do you serve in Quebec?",
        a: "Montreal, Laval, Laurentians, Lanaudière, Montérégie and greater Quebec metropolitan area."
      },
      {
        q: "How long does foundation crack repair take?",
        a: "Epoxy or polyurethane injection: 1 to 2 days. Major structural damage: 3 to 7 days."
      },
      {
        q: "Do you offer free quotes?",
        a: "Yes, all quotes are free, no obligation, delivered within 24 hours."
      }
    ],
    (item) => {
      return `<details class="group bg-gray-50 dark:bg-zinc-900 rounded-2xl p-6 border border-gray-200 dark:border-zinc-800"><summary class="font-bold text-lg text-black dark:text-white cursor-pointer flex justify-between items-center">${escape(item.q)} <span class="text-[#febd17] text-2xl group-open:rotate-45 transition-transform" data-svelte-h="svelte-wvux7h">+</span></summary> <p class="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">${escape(item.a)}</p> </details>`;
    }
  )}</div></div></section>  <div class="bg-background dark:bg-black pb-10 space-y-10 transition-colors duration-300">${validate_component(Blogs, "Blogs").$$render($$result, {}, {}, {})} ${validate_component(Map, "Map").$$render($$result, {}, {}, {})}</div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</main>`;
});
export {
  Page as default
};
