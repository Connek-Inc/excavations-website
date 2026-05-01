import { c as create_ssr_component, a as subscribe, v as validate_component, e as escape, b as add_attribute } from "../../../../chunks/ssr.js";
import { l as language } from "../../../../chunks/store.js";
import { i as importance } from "../../../../chunks/frenchdrain2.js";
import { l as logo } from "../../../../chunks/logo.js";
import { S as SITE, l as localBusinessJsonLd, b as breadcrumbJsonLd, a as SEO } from "../../../../chunks/SEO.js";
import { F as Footer } from "../../../../chunks/Footer.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let lang;
  let data;
  let articleJsonLd;
  let jsonLd;
  let $language, $$unsubscribe_language;
  $$unsubscribe_language = subscribe(language, (value) => $language = value);
  lang = $language || "fr";
  data = lang === "fr" ? {
    title: "L'Importance de l'Installation de Drains Français pour Votre Maison au Québec",
    subtitle: "04 JUILLET 2024",
    subtitle2: "DRAIN FRANÇAIS",
    pagetitle: "L'Importance du Drain Français au Québec | Guide Complet 2026 | Mini Excavations Érable",
    description: "Guide complet 2026 sur l'importance du drain français pour votre maison au Québec. Causes d'infiltration, signes d'alerte, prix, processus d'installation. Soumission gratuite.",
    keywords: "drain français Québec, importance drain français, installation drain français Montréal, infiltration eau sous-sol Québec, gel-dégel fondation",
    author_desc: "Les spécialistes de l'excavation au Québec",
    content: `<h2 class='text-3xl font-bold mt-8 mb-4'>Pourquoi un Drain Français est Essentiel au Québec</h2>
<p class='mb-6'>Un bon drainage est essentiel pour maintenir l'intégrité de votre maison au Québec. Le climat avec ses cycles de gel-dégel, ses fortes pluies estivales et la fonte printanière exerce une pression hydrostatique constante sur les fondations. Sans drain français, l'eau peut s'accumuler, causant des problèmes structurels, des inondations de sous-sol et l'érosion du sol.</p>

<h2 class='text-3xl font-bold mt-8 mb-4'>Qu'est-ce qu'un Drain Français?</h2>
<p class='mb-4'>Les drains français gèrent efficacement l'excès d'eau autour de votre maison. Nommés d'après Henry Flagg French, ces systèmes se composent d'une tranchée remplie de gravier et d'un tuyau perforé qui redirige l'eau loin de votre propriété.</p>
<h3 class='text-2xl font-bold mt-6 mb-3'>Composants d'un Drain Français Conforme au Code du Québec</h3>
<ul class='list-disc pl-6 mb-6 space-y-2'>
<li><strong>Pierre nette concassée:</strong> Filtre les débris et permet l'écoulement de l'eau.</li>
<li><strong>Tuyau perforé en PVC ou flexible:</strong> Dirige l'eau vers le puisard.</li>
<li><strong>Membrane géotextile:</strong> Empêche le colmatage par les particules de sol.</li>
<li><strong>Membrane drainante de fondation:</strong> Protège le mur et facilite l'écoulement vertical.</li>
</ul>

<h2 class='text-3xl font-bold mt-8 mb-4'>Avantages du Drain Français</h2>
<h3 class='text-2xl font-bold mt-6 mb-3'>Prévention des Infiltrations d'Eau</h3>
<p class='mb-4'>Les drains français empêchent l'accumulation d'eau autour de votre fondation, évitant les inondations de sous-sol et les problèmes structurels qui coûtent en moyenne 15 000$ à réparer au Québec.</p>
<h3 class='text-2xl font-bold mt-6 mb-3'>Protection des Fondations contre le Gel-Dégel</h3>
<p class='mb-4'>Au Québec, le cycle gel-dégel est l'ennemi numéro un des fondations. Un drain français efficace garde votre fondation sèche, prévenant le déplacement du sol et le tassement.</p>

<h2 class='text-3xl font-bold mt-8 mb-4'>Processus d'Installation Certifié RBQ</h2>
<ol class='list-decimal pl-6 mb-6 space-y-2'>
<li><strong>Inspection et soumission gratuite</strong> dans un délai de 24h.</li>
<li><strong>Excavation périphérique</strong> jusqu'à la semelle de fondation.</li>
<li><strong>Nettoyage et imperméabilisation</strong> du mur de béton.</li>
<li><strong>Pose de la membrane drainante</strong> avec géotextile.</li>
<li><strong>Installation du drain perforé</strong> sur lit de pierre concassée.</li>
<li><strong>Raccordement</strong> au puisard ou égout pluvial municipal.</li>
<li><strong>Remblayage et restauration</strong> du terrain.</li>
</ol>

<h2 class='text-3xl font-bold mt-8 mb-4'>Pourquoi Choisir Mini Excavations Érable?</h2>
<p class='mb-4'>Plus de 15 ans d'expertise au Québec, certifications RBQ, NEQ, CCQ et CMMTQ, garantie écrite, soumissions gratuites en 24h. En possédant nos propres machines, nous offrons des prix compétitifs sans compromis sur la qualité.</p>`
  } : lang === "es" ? {
    title: "La Importancia del Drenaje Francés para su Casa en Quebec",
    subtitle: "04 JULIO 2024",
    subtitle2: "DRENAJE FRANCÉS",
    pagetitle: "Importancia del Drenaje Francés en Quebec | Guía 2026 | Mini Excavations Érable",
    description: "Guía completa 2026 sobre la importancia del drenaje francés en Quebec. Causas de infiltración, señales, precios, proceso de instalación.",
    keywords: "drenaje francés Quebec, instalación drenaje Montreal, infiltración agua sótano, hielo-deshielo cimientos",
    author_desc: "Especialistas en excavación en Quebec",
    content: `<h2 class='text-3xl font-bold mt-8 mb-4'>Por qué un Drenaje Francés es Esencial en Quebec</h2>
<p class='mb-6'>Un buen drenaje es esencial para mantener la integridad de su casa en Quebec. El clima con ciclos de hielo-deshielo, lluvias intensas y deshielo primaveral ejerce presión hidrostática constante sobre los cimientos.</p>
<h2 class='text-3xl font-bold mt-8 mb-4'>¿Qué es un Drenaje Francés?</h2>
<p class='mb-4'>Sistema de zanja con grava y tubería perforada que redirige el agua lejos de la propiedad.</p>
<h2 class='text-3xl font-bold mt-8 mb-4'>Por qué Elegir Mini Excavations Érable</h2>
<p class='mb-4'>+15 años de experiencia, certificaciones RBQ, NEQ, CCQ, CMMTQ, garantía escrita, cotización gratuita en 24h.</p>`
  } : {
    title: "The Importance of French Drain Installation for Your Home in Quebec",
    subtitle: "04 JULY 2024",
    subtitle2: "FRENCH DRAIN",
    pagetitle: "French Drain Importance in Quebec | 2026 Complete Guide | Mini Excavations Érable",
    description: "Complete 2026 guide on French drain importance for Quebec homes. Infiltration causes, warning signs, pricing, installation process. Free quote.",
    keywords: "french drain Quebec, french drain importance, installation Montreal, basement water infiltration, freeze-thaw foundation",
    author_desc: "Quebec excavation specialists",
    content: `<h2 class='text-3xl font-bold mt-8 mb-4'>Why French Drains Are Essential in Quebec</h2>
<p class='mb-6'>Proper drainage is essential to maintain home integrity in Quebec. The climate with freeze-thaw cycles, summer rains and spring thaw exerts constant hydrostatic pressure on foundations.</p>
<h2 class='text-3xl font-bold mt-8 mb-4'>What is a French Drain?</h2>
<p class='mb-4'>A trench system with gravel and perforated pipe that redirects water away from your property, named after Henry Flagg French.</p>
<h2 class='text-3xl font-bold mt-8 mb-4'>Why Choose Mini Excavations Érable</h2>
<p class='mb-4'>15+ years experience, RBQ, NEQ, CCQ, CMMTQ certified, written warranty, free 24h quote.</p>`
  };
  articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/blog/importance`
    },
    headline: data.title,
    description: data.description,
    image: `${SITE.url}/logo.png`,
    datePublished: "2024-07-04",
    dateModified: "2026-04-30",
    author: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/logo.png`
      }
    },
    inLanguage: lang === "fr" ? "fr-CA" : lang === "es" ? "es-ES" : "en-CA"
  };
  jsonLd = [
    articleJsonLd,
    localBusinessJsonLd(lang),
    breadcrumbJsonLd([
      {
        name: lang === "fr" ? "Accueil" : lang === "es" ? "Inicio" : "Home",
        url: SITE.url
      },
      { name: "Blog", url: `${SITE.url}/blog` },
      {
        name: data.title,
        url: `${SITE.url}/blog/importance`
      }
    ])
  ];
  $$unsubscribe_language();
  return `${validate_component(SEO, "SEO").$$render(
    $$result,
    {
      lang,
      title: data.pagetitle,
      description: data.description,
      keywords: data.keywords,
      path: "/blog/importance",
      image: `${SITE.url}/logo.png`,
      type: "article",
      publishedTime: "2024-07-04",
      modifiedTime: "2026-04-30",
      jsonLd
    },
    {},
    {}
  )} <main class="bg-white dark:bg-black text-black dark:text-white min-h-screen"><article itemscope itemtype="https://schema.org/Article" class="pt-32 pb-16"><header class="text-center px-4 mb-12 max-w-4xl mx-auto"><p class="text-sm md:text-base text-[#febd17] font-bold tracking-wider uppercase mb-4"><time datetime="2024-07-04" itemprop="datePublished">${escape(data.subtitle)}</time> <span class="text-gray-400 mx-2" data-svelte-h="svelte-18s3iky">/</span>${escape(data.subtitle2)}</p> <h1 class="font-black text-3xl md:text-5xl lg:text-6xl tracking-tight" itemprop="headline">${escape(data.title)}</h1></header> <figure class="container max-w-6xl mx-auto px-4 mb-12"><img${add_attribute("src", importance, 0)}${add_attribute(
    "alt",
    lang === "fr" ? "Installation de drain français au Québec par Mini Excavations Érable" : lang === "es" ? "Instalación de drenaje francés en Quebec por Mini Excavations Érable" : "French drain installation in Quebec by Mini Excavations Érable",
    0
  )} width="1200" height="675" class="w-full h-auto rounded-2xl shadow-2xl object-cover" itemprop="image" loading="eager" fetchpriority="high"></figure> <div class="container max-w-4xl mx-auto px-6 prose prose-lg dark:prose-invert" itemprop="articleBody"><!-- HTML_TAG_START -->${data.content}<!-- HTML_TAG_END --></div> <footer class="container max-w-4xl mx-auto px-6 mt-16 pt-8 border-t border-gray-200 dark:border-zinc-800"><div class="flex items-center gap-4" itemprop="author" itemscope itemtype="https://schema.org/Organization"><img${add_attribute("src", logo, 0)} alt="Mini Excavations Érable" class="w-12 h-12 rounded-full"> <div><p class="font-bold text-lg" itemprop="name" data-svelte-h="svelte-6o2lhu">Mini Excavations Érable</p> <p class="text-gray-500 dark:text-gray-400 text-sm">${escape(data.author_desc)}</p></div></div></footer></article> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</main>`;
});
export {
  Page as default
};
