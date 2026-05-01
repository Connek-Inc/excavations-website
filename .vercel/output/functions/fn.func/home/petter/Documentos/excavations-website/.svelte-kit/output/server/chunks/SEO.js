import { c as create_ssr_component, e as escape, b as add_attribute, d as each } from "./ssr.js";
const SITE = {
  url: "https://miniexcavationserable.com",
  name: "Mini Excavations Érable",
  logo: "https://miniexcavationserable.com/logo.png",
  phone: "+1-514-000-0000",
  email: "info@miniexcavationserable.com",
  address: {
    streetAddress: "",
    addressLocality: "Montréal",
    addressRegion: "QC",
    postalCode: "",
    addressCountry: "CA"
  },
  geo: {
    latitude: 46.8139,
    longitude: -71.208
  },
  areaServed: [
    "Québec",
    "Montréal",
    "Laval",
    "Laurentides",
    "Lanaudière",
    "Montérégie",
    "Rive-Nord",
    "Rive-Sud"
  ],
  priceRange: "$$",
  foundingDate: "2010",
  sameAs: [
    "https://www.facebook.com/miniexcavationserable",
    "https://www.instagram.com/miniexcavationserable"
  ]
};
const seoData = {
  fr: {
    title: "Mini Excavations Érable | Drain Français, Excavation & Fondation Québec",
    description: "Entreprise d'excavation #1 au Québec ✓ Drain français, réparation fissures, démolition, inspection caméra. 15+ ans d'expérience, certifié RBQ. Soumission gratuite 24h.",
    keywords: "excavation Québec, drain français Montréal, réparation fissure fondation, mini excavation, entrepreneur excavation certifié RBQ, imperméabilisation sous-sol, démolition résidentielle, inspection caméra drain, pompe puisard, excavation Laval, excavation Laurentides, drain agricole Québec, excavateur Montréal, excavation résidentielle commerciale",
    ogLocale: "fr_CA"
  },
  en: {
    title: "Mini Excavations Érable | French Drain, Excavation & Foundation Quebec",
    description: "#1 Excavation contractor in Quebec ✓ French drain, foundation crack repair, demolition, camera inspection. 15+ years experience, RBQ certified. Free quote in 24h.",
    keywords: "excavation Quebec, french drain Montreal, foundation crack repair, mini excavation, RBQ certified excavation contractor, basement waterproofing, residential demolition, sewer camera inspection, sump pump installation, excavation Laval, drainage solutions Quebec, residential commercial excavation",
    ogLocale: "en_CA"
  },
  es: {
    title: "Mini Excavations Érable | Drenaje Francés, Excavación y Cimientos Quebec",
    description: "Empresa de excavación #1 en Quebec ✓ Drenaje francés, reparación de grietas, demolición, inspección con cámara. +15 años de experiencia, certificada RBQ. Cotización gratuita 24h.",
    keywords: "excavación Quebec, drenaje francés Montreal, reparación grietas cimientos, mini excavación, contratista excavación certificado RBQ, impermeabilización sótano, demolición residencial, inspección cámara drenaje, instalación bomba sumidero, excavación Laval, excavación residencial comercial",
    ogLocale: "es_ES"
  }
};
function localBusinessJsonLd(lang) {
  const data = seoData[lang];
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    image: SITE.logo,
    logo: SITE.logo,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: SITE.priceRange,
    description: data.description,
    foundingDate: SITE.foundingDate,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.address.addressLocality,
      addressRegion: SITE.address.addressRegion,
      addressCountry: SITE.address.addressCountry
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude
    },
    areaServed: SITE.areaServed.map((a) => ({ "@type": "City", name: a })),
    sameAs: SITE.sameAs,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "15:00"
      }
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services d'excavation",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Installation Drain Français" }
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Excavation Résidentielle" }
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Réparation Fissures Fondation" }
        },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Démolition" } },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Inspection par Caméra" }
        }
      ]
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1"
    }
  };
}
function websiteJsonLd(lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: seoData[lang].description,
    inLanguage: lang === "fr" ? "fr-CA" : lang === "es" ? "es-ES" : "en-CA",
    publisher: { "@id": `${SITE.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}
function faqJsonLd(lang) {
  const faqs = {
    fr: [
      {
        q: "Combien coûte l'installation d'un drain français au Québec en 2026 ?",
        a: "Le coût d'installation d'un drain français au Québec varie entre 4 000$ et 12 000$ selon la longueur, la profondeur et l'accès au site. Mini Excavations Érable offre des soumissions gratuites avec garantie écrite."
      },
      {
        q: "Quand faut-il remplacer son drain français ?",
        a: "Un drain français a une durée de vie de 25 à 40 ans. Les signes : infiltration d'eau au sous-sol, humidité, efflorescence, fissures dans la fondation. Nous offrons une inspection par caméra pour diagnostiquer précisément."
      },
      {
        q: "Êtes-vous certifié RBQ pour l'excavation au Québec ?",
        a: "Oui, Mini Excavations Érable détient les licences RBQ, NEQ, CCQ et CMMTQ. Nous respectons toutes les normes du Code de construction du Québec et garantissons nos travaux."
      },
      {
        q: "Quelles régions desservez-vous au Québec ?",
        a: "Nous desservons Montréal, Laval, les Laurentides, Lanaudière, la Montérégie et la grande région métropolitaine de Québec."
      },
      {
        q: "Combien de temps prend une réparation de fissure de fondation ?",
        a: "Une réparation de fissure par injection d'époxy ou polyuréthane prend généralement 1 à 2 jours. Pour des dommages structurels majeurs, comptez 3 à 7 jours selon l'ampleur."
      },
      {
        q: "Offrez-vous des soumissions gratuites ?",
        a: "Oui, toutes nos soumissions sont gratuites et sans engagement. Nous nous déplaçons sur place pour évaluer votre projet et vous remettons une soumission écrite détaillée en moins de 24h."
      }
    ],
    en: [
      {
        q: "How much does French drain installation cost in Quebec in 2026?",
        a: "French drain installation in Quebec costs between $4,000 and $12,000 depending on length, depth, and site access. Mini Excavations Érable offers free quotes with written warranty."
      },
      {
        q: "When should you replace your French drain?",
        a: "A French drain lasts 25 to 40 years. Signs of failure: basement water infiltration, dampness, efflorescence, foundation cracks. We offer camera inspections for precise diagnosis."
      },
      {
        q: "Are you RBQ certified for excavation in Quebec?",
        a: "Yes, Mini Excavations Érable holds RBQ, NEQ, CCQ and CMMTQ licenses. We comply with all Quebec Construction Code standards and warranty our work."
      },
      {
        q: "What areas do you serve in Quebec?",
        a: "We serve Montreal, Laval, the Laurentians, Lanaudière, Montérégie and the greater Quebec metropolitan area."
      },
      {
        q: "How long does foundation crack repair take?",
        a: "Crack repair via epoxy or polyurethane injection typically takes 1 to 2 days. For major structural damage, expect 3 to 7 days depending on severity."
      },
      {
        q: "Do you offer free quotes?",
        a: "Yes, all our quotes are free and without obligation. We come on-site to evaluate your project and provide a detailed written quote within 24 hours."
      }
    ],
    es: [
      {
        q: "¿Cuánto cuesta instalar un drenaje francés en Quebec en 2026?",
        a: "La instalación de drenaje francés en Quebec cuesta entre 4,000$ y 12,000$ según largo, profundidad y acceso. Mini Excavations Érable ofrece cotizaciones gratuitas con garantía escrita."
      },
      {
        q: "¿Cuándo se debe reemplazar un drenaje francés?",
        a: "Un drenaje francés dura entre 25 y 40 años. Señales: infiltración de agua en sótano, humedad, eflorescencia, grietas en cimientos. Ofrecemos inspección con cámara para diagnóstico preciso."
      },
      {
        q: "¿Están certificados RBQ para excavación en Quebec?",
        a: "Sí, Mini Excavations Érable tiene licencias RBQ, NEQ, CCQ y CMMTQ. Cumplimos todas las normas del Código de Construcción de Quebec."
      },
      {
        q: "¿Qué regiones cubren en Quebec?",
        a: "Cubrimos Montreal, Laval, Laurentides, Lanaudière, Montérégie y el área metropolitana de Quebec."
      },
      {
        q: "¿Cuánto tarda la reparación de grietas de cimientos?",
        a: "La reparación con inyección de epoxi o poliuretano tarda 1 a 2 días. Para daños estructurales mayores, de 3 a 7 días."
      },
      {
        q: "¿Ofrecen cotizaciones gratuitas?",
        a: "Sí, todas nuestras cotizaciones son gratuitas y sin compromiso. Visitamos su sitio y entregamos cotización detallada en menos de 24h."
      }
    ]
  };
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs[lang].map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a
      }
    }))
  };
}
function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url
    }))
  };
}
function serviceJsonLd(opts) {
  const offer = opts.priceFrom ? {
    "@type": "AggregateOffer",
    priceCurrency: "CAD",
    lowPrice: opts.priceFrom,
    highPrice: opts.priceTo || opts.priceFrom * 3,
    offerCount: "50",
    availability: "https://schema.org/InStock"
  } : void 0;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    image: opts.image || SITE.logo,
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: SITE.areaServed.map((a) => ({ "@type": "City", name: a })),
    availableLanguage: ["fr", "en", "es"],
    ...offer && { offers: offer },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: opts.name,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: opts.name },
          availability: "https://schema.org/InStock",
          priceCurrency: "CAD"
        }
      ]
    }
  };
}
function howToJsonLd(opts) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    ...opts.totalTime && { totalTime: opts.totalTime },
    ...opts.estimatedCost && {
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: opts.estimatedCost.currency,
        value: {
          "@type": "QuantitativeValue",
          minValue: opts.estimatedCost.min,
          maxValue: opts.estimatedCost.max
        }
      }
    },
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text
    }))
  };
}
const SEO = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let data;
  let finalTitle;
  let finalDescription;
  let finalKeywords;
  let canonical;
  let ogLocale;
  let finalImageAlt;
  let hreflangAlternates;
  let { lang = "fr" } = $$props;
  let { title = void 0 } = $$props;
  let { description = void 0 } = $$props;
  let { keywords = void 0 } = $$props;
  let { path = "/" } = $$props;
  let { image = `${SITE.url}/logo.png` } = $$props;
  let { imageAlt = void 0 } = $$props;
  let { type = "website" } = $$props;
  let { publishedTime = void 0 } = $$props;
  let { modifiedTime = void 0 } = $$props;
  let { author = void 0 } = $$props;
  let { section = void 0 } = $$props;
  let { tags = [] } = $$props;
  let { noIndex = false } = $$props;
  let { jsonLd = [] } = $$props;
  if ($$props.lang === void 0 && $$bindings.lang && lang !== void 0)
    $$bindings.lang(lang);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.keywords === void 0 && $$bindings.keywords && keywords !== void 0)
    $$bindings.keywords(keywords);
  if ($$props.path === void 0 && $$bindings.path && path !== void 0)
    $$bindings.path(path);
  if ($$props.image === void 0 && $$bindings.image && image !== void 0)
    $$bindings.image(image);
  if ($$props.imageAlt === void 0 && $$bindings.imageAlt && imageAlt !== void 0)
    $$bindings.imageAlt(imageAlt);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.publishedTime === void 0 && $$bindings.publishedTime && publishedTime !== void 0)
    $$bindings.publishedTime(publishedTime);
  if ($$props.modifiedTime === void 0 && $$bindings.modifiedTime && modifiedTime !== void 0)
    $$bindings.modifiedTime(modifiedTime);
  if ($$props.author === void 0 && $$bindings.author && author !== void 0)
    $$bindings.author(author);
  if ($$props.section === void 0 && $$bindings.section && section !== void 0)
    $$bindings.section(section);
  if ($$props.tags === void 0 && $$bindings.tags && tags !== void 0)
    $$bindings.tags(tags);
  if ($$props.noIndex === void 0 && $$bindings.noIndex && noIndex !== void 0)
    $$bindings.noIndex(noIndex);
  if ($$props.jsonLd === void 0 && $$bindings.jsonLd && jsonLd !== void 0)
    $$bindings.jsonLd(jsonLd);
  data = seoData[lang];
  finalTitle = title || data.title;
  finalDescription = description || data.description;
  finalKeywords = keywords || data.keywords;
  canonical = `${SITE.url}${path}`;
  ogLocale = data.ogLocale;
  finalImageAlt = imageAlt || finalTitle;
  hreflangAlternates = [
    { lang: "fr-CA", url: `${SITE.url}${path}` },
    {
      lang: "en-CA",
      url: `${SITE.url}${path}?lang=en`
    },
    {
      lang: "es",
      url: `${SITE.url}${path}?lang=es`
    },
    {
      lang: "x-default",
      url: `${SITE.url}${path}`
    }
  ];
  return `${$$result.head += `<!-- HEAD_svelte-1pfnrx0_START -->${$$result.title = `<title>${escape(finalTitle)}</title>`, ""}<meta name="description"${add_attribute("content", finalDescription, 0)}><meta name="keywords"${add_attribute("content", finalKeywords, 0)}><link rel="canonical"${add_attribute("href", canonical, 0)}>${noIndex ? `<meta name="robots" content="noindex, nofollow">` : `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"> <meta name="googlebot" content="index, follow, max-image-preview:large">`}${each(hreflangAlternates, (alt) => {
    return `<link rel="alternate"${add_attribute("hreflang", alt.lang, 0)}${add_attribute("href", alt.url, 0)}>`;
  })}<meta property="og:type"${add_attribute("content", type, 0)}><meta property="og:site_name"${add_attribute("content", SITE.name, 0)}><meta property="og:title"${add_attribute("content", finalTitle, 0)}><meta property="og:description"${add_attribute("content", finalDescription, 0)}><meta property="og:url"${add_attribute("content", canonical, 0)}><meta property="og:image"${add_attribute("content", image, 0)}><meta property="og:image:secure_url"${add_attribute("content", image, 0)}><meta property="og:image:type" content="image/jpeg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt"${add_attribute("content", finalImageAlt, 0)}><meta property="og:locale"${add_attribute("content", ogLocale, 0)}><meta property="og:locale:alternate" content="fr_CA"><meta property="og:locale:alternate" content="en_CA"><meta property="og:locale:alternate" content="es_ES">${type === "article" ? `${publishedTime ? `<meta property="article:published_time"${add_attribute("content", publishedTime, 0)}>` : ``} ${modifiedTime ? `<meta property="article:modified_time"${add_attribute("content", modifiedTime, 0)}>` : ``} ${author ? `<meta property="article:author"${add_attribute("content", author, 0)}>` : ``} ${section ? `<meta property="article:section"${add_attribute("content", section, 0)}>` : ``} ${each(tags, (tag) => {
    return `<meta property="article:tag"${add_attribute("content", tag, 0)}>`;
  })}` : ``}<meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@miniexcavationserable"><meta name="twitter:creator" content="@miniexcavationserable"><meta name="twitter:title"${add_attribute("content", finalTitle, 0)}><meta name="twitter:description"${add_attribute("content", finalDescription, 0)}><meta name="twitter:image"${add_attribute("content", image, 0)}><meta name="twitter:image:alt"${add_attribute("content", finalImageAlt, 0)}><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><meta name="apple-mobile-web-app-title"${add_attribute("content", SITE.name, 0)}><meta name="application-name"${add_attribute("content", SITE.name, 0)}><meta name="msapplication-TileColor" content="#febd17">${each(jsonLd, (schema) => {
    return `<!-- HTML_TAG_START -->${`<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}<\/script>`}<!-- HTML_TAG_END -->`;
  })}<!-- HEAD_svelte-1pfnrx0_END -->`, ""}`;
});
export {
  SITE as S,
  SEO as a,
  breadcrumbJsonLd as b,
  faqJsonLd as f,
  howToJsonLd as h,
  localBusinessJsonLd as l,
  serviceJsonLd as s,
  websiteJsonLd as w
};
