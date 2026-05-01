<script lang="ts">
	import { language } from '$lib/store/store.js';
	import Button from "$lib/components/ui/button/button.svelte";
	import * as Card from "$lib/components/ui/card";
	import { cn } from "$lib/lib-utils";
    
    // Images
	import banner from '$lib/images/banner.jpg';
	import excavation2 from "$lib/images/excavation2.jpg";
	import frenchdrain2 from "$lib/images/frenchdrain2.jpg";
	import fissure2 from "$lib/images/fissure2.jpg";
	import demolition2 from "$lib/images/demolition2.jpg";
	import inspection2 from "$lib/images/inspection2.jpg";
    import partner1 from "$lib/images/partner1.jpg";
	import partner2 from "$lib/images/partner2.jpg";
	import partner3 from "$lib/images/partner3.jpg";
    import certif1 from "$lib/images/neq.png";
	import certif2 from "$lib/images/RBQ.png";
	import certif3 from "$lib/images/CMMTQ.svg";
	import certif4 from "$lib/images/CCQ.png";
    
    // Components
	import ContactUs from '$lib/ContactUs.svelte';
	import Footer from '$lib/Footer.svelte';
	import Map from '$lib/map.svelte';
    import Blogs from './blog/blogs.svelte';
    import SEO from '$lib/seo/SEO.svelte';
    import InlineCTA from '$lib/components/InlineCTA.svelte';
    import { localBusinessJsonLd, websiteJsonLd, faqJsonLd, serviceJsonLd, SITE } from '$lib/seo/seo-config';

    $: isEn = $language === 'en';
    $: currentLang = ($language as 'fr' | 'en' | 'es') || 'fr';

    $: homeJsonLd = [
        localBusinessJsonLd(currentLang),
        websiteJsonLd(currentLang),
        faqJsonLd(currentLang),
        serviceJsonLd({
            name: currentLang === 'fr' ? 'Installation de Drain Français au Québec' : currentLang === 'es' ? 'Instalación de Drenaje Francés en Quebec' : 'French Drain Installation in Quebec',
            description: currentLang === 'fr' ? 'Installation, réparation et remplacement de drain français résidentiel et commercial. Garantie écrite, certifié RBQ.' : currentLang === 'es' ? 'Instalación, reparación y reemplazo de drenaje francés residencial y comercial. Garantía escrita, certificado RBQ.' : 'Residential and commercial French drain installation, repair and replacement. Written warranty, RBQ certified.',
            url: SITE.url,
            lang: currentLang
        })
    ];
    
    $: texts = {
        heroTitle: 'Mini Excavations Érable',
        heroSubtitle: $language === 'en' ? 'With 15+ years of experience.' : ($language === 'es' ? 'Con más de 15 años de experiencia.' : 'Avec plus de 15 ans d’expérience.'),
        cta: $language === 'en' ? 'Contact Us' : ($language === 'es' ? 'Contáctanos' : 'Contactez nous'),
        servicesCta: $language === 'en' ? 'Our Services' : ($language === 'es' ? 'Nuestros Servicios' : 'Nos Services'),
        guarantee: $language === 'en' ? 'BEST SERVICE GUARANTEED' : ($language === 'es' ? 'MEJOR SERVICIO GARANTIZADO' : 'MEILLEUR SERVICE GARANTI'),
        servicesTitle: $language === 'en' ? 'Our Services' : ($language === 'es' ? 'Nuestros Servicios' : 'Nos Services'),
        servicesSubtitle: $language === 'en' ? 'Professional solutions for your excavation needs' : ($language === 'es' ? 'Soluciones profesionales para sus necesidades de excavación' : 'Solutions professionnelles pour vos besoins d\'excavation'),
        aboutTitle: $language === 'en' ? 'About Us' : ($language === 'es' ? 'Sobre Nosotros' : 'À Propos'),
        aboutText: $language === 'en' 
            ? "With more than 15 years of experience, Mini Excavations Érable is recognized as a leader in Quebec in the fields of construction and restoration of French drains, demolition, crack repair, and camera inspections. Our long history and deep expertise testify to our commitment to excellence and quality of service, supported by all the necessary certifications and qualifications. Our team of experts is dedicated to offering customized and effective solutions, precisely meeting the specific needs of each project. By choosing Mini Excavations Érable, you opt for a company whose reliability and excellence are proven by decades of experience."
            : ($language === 'es'
                ? "Con más de 15 años de experiencia, Mini Excavations Érable es reconocido como líder en Quebec en los campos de construcción y restauración de drenajes franceses, demolición, reparación de grietas e inspecciones con cámara. Nuestra larga historia y profunda experiencia atestiguan nuestro compromiso con la excelencia y la calidad del servicio, respaldados por todas las certificaciones y calificaciones necesarias. Nuestro equipo de expertos está dedicado a ofrecer soluciones personalizadas y efectivas, respondiendo con precisión a las necesidades específicas de cada proyecto. Al elegir Mini Excavations Érable, opta por una empresa cuya confiabilidad y excelencia están probadas por décadas de experiencia."
                : "Fort de plus de 15 ans d'expérience, Mini Excavations Érable est reconnu comme un leader au Québec dans les domaines de la construction et de la restauration de drains français, de la démolition, de la réparation de fissures et des inspections par caméra. Notre longue histoire et notre expertise approfondie témoignent de notre engagement envers l'excellence et la qualité de service, soutenus par toutes les certifications et qualifications nécessaires. Notre équipe d'experts est dédiée à offrir des solutions personnalisées et efficaces, répondant précisément aux besoins spécifiques de chaque projet. En choisissant Mini Excavations Érable, vous optez pour une entreprise dont la fiabilité et l'excellence sont prouvées par des décennies d'expérience."),
        partnersTitle: $language === 'en' ? 'Partners' : ($language === 'es' ? 'Socios' : 'Partenaires'),
        certificationsTitle: $language === 'en' ? 'Certifications' : ($language === 'es' ? 'Certificaciones' : 'Attestations'),
		learnMore: $language === 'en' ? 'Learn More' : ($language === 'es' ? 'Saber Más' : 'En savoir plus')
    }

    $: services = [
        {
            title: $language === 'en' ? 'Excavations' : ($language === 'es' ? 'Excavaciones' : 'Excavations'),
            description: $language === 'en' ? "Complete excavation services with a commitment to safety and the environment for each project." : ($language === 'es' ? "Servicios completos de excavación con un compromiso con la seguridad y el medio ambiente para cada proyecto." : "Services complets d'excavation avec un engagement envers la sécurité et l'environnement pour chaque projet."),
            image: excavation2
        },
        {
            title: $language === 'en' ? 'French Drains' : ($language === 'es' ? 'Drenajes Franceses' : 'Drains Français'),
            description: $language === 'en' ? "Expert French drain solutions for long-lasting protection against moisture." : ($language === 'es' ? "Soluciones expertas en drenajes franceses para una protección duradera contra la humedad." : "Solutions expertes en drains français pour une protection durable contre l'humidité."),
            image: frenchdrain2
        },
        {
            title: $language === 'en' ? 'Crack Repairs' : ($language === 'es' ? 'Reparación de Grietas' : 'Réparations de Fissures'),
            description: $language === 'en' ? "Effective crack repairs, ensuring the safety and integrity of foundations." : ($language === 'es' ? "Reparaciones efectivas de grietas, garantizando la seguridad e integridad de los cimientos." : "Réparations efficaces de fissures, garantissant la sécurité et l'intégrité des fondations."),
            image: fissure2
        },
        {
            title: $language === 'en' ? 'Demolition' : ($language === 'es' ? 'Demolición' : 'Démolition'),
            description: $language === 'en' ? "Secure and environmentally respectful demolition, suitable for all types of projects." : ($language === 'es' ? "Demolición segura y respetuosa con el medio ambiente, adecuada para todo tipo de proyectos." : "Démolition sécurisée et respectueuse de l'environnement, adaptée à tous types de projets."),
            image: demolition2
        },
        {
            title: $language === 'en' ? 'Camera Inspection' : ($language === 'es' ? 'Inspección con Cámara' : 'Inspection par Caméra'),
            description: $language === 'en' ? "Precise pipeline diagnostics with cutting-edge technology for non-invasive inspections." : ($language === 'es' ? "Diagnósticos precisos de tuberías con tecnología de punta para inspecciones no invasivas." : "Diagnostics précis de canalisations avec une technologie de pointe pour des inspections non invasives."),
            image: inspection2
        }
    ];

    const partners = [partner2, partner3, partner1];
    const certifications = [certif1, certif2, certif3, certif4];
</script>

<SEO lang={currentLang} path="/" jsonLd={homeJsonLd} />

<main class="flex flex-col min-h-screen bg-background font-sans" itemscope itemtype="https://schema.org/LocalBusiness">
    <!-- Hero Section -->
    <section class="relative bg-white dark:bg-black text-black dark:text-white overflow-hidden pb-16 lg:pb-24 pt-20" id="home" aria-labelledby="hero-heading">
        <!-- Background Decor -->
        <div class="absolute inset-0 z-0">
             <div class="absolute top-0 left-0 w-1/2 h-full bg-white dark:bg-black"></div>
        </div>

        <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="lg:grid lg:grid-cols-12 lg:gap-8">
                <!-- Left Content -->
                <div class="lg:col-span-6 flex flex-col justify-center text-left py-12 lg:py-32">
                    <div class="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-900 px-4 py-1.5 text-sm font-medium text-gray-800 dark:text-gray-300 mb-8 self-start border border-gray-200 dark:border-gray-800">
                        <span class="flex h-2 w-2 rounded-full bg-[#febd17] mr-2"></span>
                         {currentLang === 'en' ? 'Professional Excavation Services' : currentLang === 'es' ? 'Servicios Profesionales de Excavación' : "Services d'Excavation Professionnels"}
                    </div>

                    <h1 id="hero-heading" class="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6" itemprop="name">
                        <span class="block text-black dark:text-white">Mini Excavations</span>
                        <span class="block text-[#febd17]"> Érable</span>
                    </h1>
                    <p class="text-2xl md:text-3xl font-bold text-black dark:text-white mb-4">
                        {currentLang === 'fr' ? 'Drain Français, Excavation & Réparation de Fondation au Québec' : currentLang === 'es' ? 'Drenaje Francés, Excavación y Reparación de Cimientos en Quebec' : 'French Drain, Excavation & Foundation Repair in Quebec'}
                    </p>

                    <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl leading-relaxed font-light" itemprop="description">
                        {texts.heroSubtitle}
                        {currentLang === 'fr'
                            ? " Entrepreneur certifié RBQ desservant Montréal, Laval, Laurentides et Lanaudière. Soumission gratuite en 24h."
                            : currentLang === 'es'
                                ? " Contratista certificado RBQ que sirve Montreal, Laval, Laurentides y Lanaudière. Cotización gratuita en 24h."
                                : " RBQ-certified contractor serving Montreal, Laval, Laurentians and Lanaudière. Free quote within 24 hours."}
                    </p>

                    <!-- Trust badges row -->
                    <div class="flex flex-wrap gap-2 mb-8 text-xs">
                        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-400 font-semibold">
                            <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            {currentLang === 'fr' ? 'Disponible maintenant' : currentLang === 'es' ? 'Disponible ahora' : 'Available now'}
                        </span>
                        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/30 text-yellow-700 dark:text-yellow-400 font-semibold">
                            ★ 4.9/5 (127 {currentLang === 'fr' ? 'avis' : currentLang === 'es' ? 'reseñas' : 'reviews'})
                        </span>
                        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-400 font-semibold">
                            ✓ RBQ
                        </span>
                        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/30 text-orange-700 dark:text-orange-400 font-semibold">
                            ⚡ {currentLang === 'fr' ? 'Réponse 24h' : currentLang === 'es' ? 'Respuesta 24h' : '24h response'}
                        </span>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-3">
                        <a href="#contact" class="group inline-flex items-center justify-center gap-2 px-8 py-5 rounded-full bg-gradient-to-r from-[#febd17] to-yellow-500 hover:from-yellow-400 hover:to-[#febd17] text-black font-black text-lg shadow-2xl shadow-yellow-500/40 hover:shadow-yellow-500/60 transition-all hover:scale-105 active:scale-95 relative overflow-hidden">
                            <span class="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity"></span>
                            <span class="relative">📋 {currentLang === 'fr' ? 'Soumission gratuite' : currentLang === 'es' ? 'Cotización gratuita' : 'Free quote'}</span>
                            <svg class="w-5 h-5 relative group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                        </a>
                        <a href="tel:+15148309973" class="group inline-flex items-center justify-center gap-2 px-8 py-5 rounded-full border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-bold text-lg transition-all hover:scale-105 active:scale-95">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                            (514) 830-9973
                        </a>
                    </div>

                    <p class="mt-4 text-xs text-gray-500 dark:text-zinc-500 flex items-center gap-1.5">
                        <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                        {currentLang === 'fr' ? 'Sans engagement · Réponse rapide · Devis détaillé' : currentLang === 'es' ? 'Sin compromiso · Respuesta rápida · Cotización detallada' : 'No obligation · Fast response · Detailed quote'}
                    </p>
                </div>

                <!-- Right Image (Angled) -->
                <div class="relative lg:col-span-6 lg:-mr-8 xl:absolute xl:inset-y-0 xl:right-0 xl:w-1/2">
                    <div class="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full clip-path-slant">
                        <img class="h-full w-full object-cover" src={banner} alt={currentLang === 'fr' ? "Excavation et installation de drain français à Montréal par Mini Excavations Érable" : currentLang === 'es' ? "Excavación e instalación de drenaje francés en Montreal por Mini Excavations Érable" : "Excavation and French drain installation in Montreal by Mini Excavations Érable"} width="1200" height="800" loading="eager" fetchpriority="high" itemprop="image">
                        <!-- Gradient Overlay for Image to blend slightly if needed -->
                         <div class="absolute inset-0 bg-gradient-to-l from-transparent to-white/30 dark:to-black/30 lg:to-white/60 dark:lg:to-black/60 opacity-50"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Global Style: Clip Path + Animations -->
    <style>
        @media (min-width: 1024px) {
            .clip-path-slant {
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
        }
    </style>

    <!-- Trust Stats Bar -->
    <section class="bg-white dark:bg-zinc-950 border-y border-gray-200 dark:border-zinc-800 py-10" aria-label="Stats de confiance">
        <div class="container max-w-6xl">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {#each [
                    { num: '15+', label: currentLang === 'fr' ? "Années d'expérience" : currentLang === 'es' ? 'Años de experiencia' : 'Years experience' },
                    { num: '500+', label: currentLang === 'fr' ? 'Projets réalisés' : currentLang === 'es' ? 'Proyectos completados' : 'Projects completed' },
                    { num: '24h', label: currentLang === 'fr' ? 'Soumission gratuite' : currentLang === 'es' ? 'Cotización gratuita' : 'Free quote' },
                    { num: 'RBQ', label: currentLang === 'fr' ? 'Certifié et assuré' : currentLang === 'es' ? 'Certificado y asegurado' : 'Certified & insured' }
                ] as stat, i}
                    <div class="text-center group" style="animation: fadeInUp 0.6s ease-out {i * 0.1}s both;">
                        <p class="text-4xl md:text-5xl font-black bg-gradient-to-br from-[#febd17] to-yellow-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">{stat.num}</p>
                        <p class="text-xs md:text-sm font-medium text-gray-600 dark:text-zinc-400 uppercase tracking-wider mt-1">{stat.label}</p>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- Guarantee Banner -->
    <div class="bg-black dark:bg-black text-white py-12 relative overflow-hidden border-y border-white/10">
        <!-- Animated decorative line -->
        <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#febd17] to-transparent"></div>
        <div class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#febd17] to-transparent"></div>
        <div class="container flex justify-center relative z-10">
            <h2 class="text-xl md:text-3xl font-black text-[#febd17] tracking-[0.2em] text-center uppercase drop-shadow-sm flex items-center gap-4">
                <span class="hidden md:inline-block w-8 h-1 bg-[#febd17]"></span>
                {texts.guarantee}
                <span class="hidden md:inline-block w-8 h-1 bg-[#febd17]"></span>
            </h2>
        </div>
    </div>

    <!-- Contact Form Section -->
    <section class="py-16 bg-muted/30 dark:bg-black transition-colors duration-300">
        <div class="container max-w-5xl">
            <ContactUs nDays={9}/>
        </div>
    </section>

    <!-- Services Section -->
    <section class="py-24 bg-white dark:bg-background transition-colors duration-300" id="services" aria-labelledby="services-heading">
        <div class="container px-4 md:px-6">
            <div class="mb-16 max-w-3xl">
                <span class="text-[#febd17] font-bold tracking-wider uppercase text-sm mb-2 block">{texts.servicesCta}</span>
                <h2 id="services-heading" class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-black dark:text-white mb-6">
                    {currentLang === 'fr' ? 'Services d\'Excavation Professionnels au Québec' : currentLang === 'es' ? 'Servicios Profesionales de Excavación en Quebec' : 'Professional Excavation Services in Quebec'}
                </h2>
                <p class="text-gray-600 dark:text-gray-400 text-xl font-light">
                    {texts.servicesSubtitle}
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 auto-rows-[minmax(300px,_auto)]">
                {#each services as service, i}
                    <article class="group relative overflow-hidden rounded-3xl bg-gray-100 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 transition-all hover:shadow-lg dark:hover:bg-zinc-900 {i === 0 ? 'lg:col-span-4 md:col-span-2' : (i === 1 ? 'lg:col-span-2 md:col-span-1' : 'lg:col-span-2 md:col-span-1')}" itemscope itemtype="https://schema.org/Service">

                        <div class="absolute inset-0 z-0">
                            <img src={service.image} alt={`${service.title} - ${currentLang === 'fr' ? 'Service professionnel par Mini Excavations Érable au Québec' : currentLang === 'es' ? 'Servicio profesional por Mini Excavations Érable en Quebec' : 'Professional service by Mini Excavations Érable in Quebec'}`} class="h-full w-full object-cover opacity-30 dark:opacity-40 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-40 dark:group-hover:opacity-50" loading="lazy" width="800" height="600" itemprop="image" />
                            <div class="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80 dark:to-transparent"></div>
                        </div>

                        <div class="relative z-10 flex flex-col justify-end h-full p-8">
                            <div class="mb-4">
                                <span class="inline-block h-1 w-12 bg-[#febd17] rounded-full mb-4"></span>
                                <h3 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2" itemprop="name">{service.title}</h3>
                            </div>
                            <p class="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-sm md:text-base" itemprop="description">
                                {service.description}
                            </p>
                            <meta itemprop="areaServed" content="Québec, Montréal, Laval, Laurentides" />
                            <meta itemprop="provider" content="Mini Excavations Érable" />
                        </div>
                    </article>
                {/each}
            </div>
        </div>
    </section>

    <!-- Inline CTA after Services -->
    <InlineCTA variant="banner" />

    <!-- About Us Section -->
    <section class="py-24 bg-muted/50 dark:bg-black relative overflow-hidden transition-colors duration-300" id="about-us" aria-labelledby="about-heading">
        <div class="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div class="space-y-8 order-2 lg:order-1">
                 <h2 id="about-heading" class="text-3xl md:text-5xl font-black tracking-tight text-black dark:text-white">
                    {currentLang === 'fr' ? 'À Propos de Mini Excavations Érable - Leader en Excavation au Québec' : currentLang === 'es' ? 'Sobre Mini Excavations Érable - Líder en Excavación en Quebec' : 'About Mini Excavations Érable - Leader in Quebec Excavation'}
                 </h2>
                 <p class="text-lg text-muted-foreground dark:text-gray-400 leading-relaxed text-justify font-light">
                    {texts.aboutText}
                 </p>
                 <Button size="lg" variant="outline" class="border-primary/20 dark:border-white/20 text-foreground dark:text-white hover:bg-primary hover:text-primary-foreground dark:hover:bg-white dark:hover:text-black shadow-sm px-8">
					{texts.learnMore}
				 </Button>
             </div>
             <div class="relative order-1 lg:order-2">
				 <div class="absolute -inset-4 bg-[#febd17]/20 rounded-full blur-3xl opacity-50"></div>
                 <div class="grid grid-cols-2 gap-4 relative z-10 p-4">
                     <img src={fissure2} alt={currentLang === 'fr' ? "Réparation de fissure de fondation par injection époxy au Québec" : currentLang === 'es' ? "Reparación de grieta de cimientos por inyección de epoxi en Quebec" : "Foundation crack repair by epoxy injection in Quebec"} class="rounded-2xl shadow-2xl w-full h-[300px] object-cover transform translate-y-8 hover:scale-105 transition-transform duration-500" loading="lazy" width="600" height="400" />
                     <img src={demolition2} alt={currentLang === 'fr' ? "Démolition résidentielle sécuritaire et écologique au Québec" : currentLang === 'es' ? "Demolición residencial segura y ecológica en Quebec" : "Safe and eco-friendly residential demolition in Quebec"} class="rounded-2xl shadow-2xl w-full h-[300px] object-cover transform -translate-y-8 hover:scale-105 transition-transform duration-500" loading="lazy" width="600" height="400" />
                 </div>
             </div>
        </div>
    </section>

    <!-- Partners & Certifications -->
     <section class="py-20 container flex flex-col items-center space-y-20 bg-white dark:bg-black transition-colors duration-300">
        <div class="w-full text-center space-y-10">
            <h3 class="text-xl font-bold text-muted-foreground dark:text-gray-500 uppercase tracking-[0.2em]">{texts.partnersTitle}</h3>
            <div class="flex flex-wrap justify-center items-center gap-12 md:gap-20">
                {#each partners as partner}
                    <img src={partner} alt="Partner" class="h-16 md:h-24 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 dark:invert-[0.8] dark:hover:invert-0 transition-all duration-500 hover:scale-110" />
                {/each}
            </div>
        </div>

        <div class="w-full h-px bg-gradient-to-r from-transparent via-border dark:via-zinc-800 to-transparent max-w-4xl mx-auto"></div>

         <div class="w-full text-center space-y-10">
            <h3 class="text-xl font-bold text-muted-foreground dark:text-gray-500 uppercase tracking-[0.2em]">{texts.certificationsTitle}</h3>
            <div class="flex flex-wrap justify-center items-center gap-12 md:gap-16">
                {#each certifications as cert}
                    <!-- Invert color for Certifications in dark mode if needed, usually they are logos that might need white bg or inversion -->
                    <div class="bg-white dark:bg-white/10 dark:p-4 rounded-xl transition-colors duration-300"> 
                        <img src={cert} alt="Certification" class="h-20 md:h-28 object-contain hover:scale-110 transition-transform duration-300 drop-shadow-lg" />
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-zinc-950 relative overflow-hidden" aria-labelledby="why-heading">
        <div class="absolute top-0 right-0 w-96 h-96 bg-[#febd17] rounded-full blur-3xl opacity-5 -z-0"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-[#febd17] rounded-full blur-3xl opacity-5 -z-0"></div>

        <div class="container relative z-10">
            <div class="text-center mb-16 max-w-3xl mx-auto">
                <span class="text-[#febd17] font-bold tracking-wider uppercase text-sm mb-2 block">
                    {currentLang === 'fr' ? 'Pourquoi nous choisir' : currentLang === 'es' ? 'Por qué elegirnos' : 'Why choose us'}
                </span>
                <h2 id="why-heading" class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black dark:text-white mb-4">
                    {currentLang === 'fr' ? "L'excellence, simplement." : currentLang === 'es' ? 'La excelencia, simplemente.' : 'Excellence, simply.'}
                </h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each [
                    {
                        icon: '🏆',
                        titleFr: 'Certifié RBQ', titleEn: 'RBQ Certified', titleEs: 'Certificado RBQ',
                        descFr: 'Licences RBQ, NEQ, CCQ, CMMTQ. Travail garanti par écrit.',
                        descEn: 'RBQ, NEQ, CCQ, CMMTQ licenses. Written warranty on all work.',
                        descEs: 'Licencias RBQ, NEQ, CCQ, CMMTQ. Garantía escrita en todos los trabajos.'
                    },
                    {
                        icon: '⚡',
                        titleFr: 'Réponse en 24h', titleEn: '24h Response', titleEs: 'Respuesta en 24h',
                        descFr: 'Soumission gratuite, détaillée et sans engagement, livrée en moins de 24h.',
                        descEn: 'Free, detailed quote with no obligation, delivered in less than 24h.',
                        descEs: 'Cotización gratuita y detallada, sin compromiso, en menos de 24h.'
                    },
                    {
                        icon: '💎',
                        titleFr: 'Prix Compétitifs', titleEn: 'Competitive Pricing', titleEs: 'Precios Competitivos',
                        descFr: 'Nos propres machines = économies pour vous, sans compromis sur la qualité.',
                        descEn: 'We own our equipment = savings for you, without compromising quality.',
                        descEs: 'Equipo propio = ahorro para ti, sin comprometer la calidad.'
                    },
                    {
                        icon: '🛡️',
                        titleFr: 'Pleinement Assurés', titleEn: 'Fully Insured', titleEs: 'Totalmente Asegurados',
                        descFr: 'Couverture complète RC + dommages. Vos biens sont protégés.',
                        descEn: 'Full liability + damage coverage. Your property is protected.',
                        descEs: 'Cobertura completa de responsabilidad + daños. Su propiedad está protegida.'
                    },
                    {
                        icon: '🌱',
                        titleFr: 'Écoresponsable', titleEn: 'Eco-Friendly', titleEs: 'Eco-Responsable',
                        descFr: 'Tri et recyclage de 75%+ des matériaux selon normes Québec.',
                        descEn: '75%+ material recycling per Quebec environmental standards.',
                        descEs: 'Reciclaje de 75%+ de materiales según normas ambientales de Quebec.'
                    },
                    {
                        icon: '🤝',
                        titleFr: 'Service Personnalisé', titleEn: 'Personal Service', titleEs: 'Servicio Personalizado',
                        descFr: 'Un seul contact dédié pour tout votre projet, du devis à la fin.',
                        descEn: 'One dedicated contact for your entire project, from quote to completion.',
                        descEs: 'Un contacto dedicado para todo su proyecto, de la cotización al final.'
                    }
                ] as f, i}
                    <div class="group relative bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden" style="animation: fadeInUp 0.6s ease-out {i * 0.1}s both;">
                        <div class="absolute top-0 right-0 w-32 h-32 bg-[#febd17] rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        <div class="relative">
                            <div class="text-5xl mb-4 group-hover:scale-110 transition-transform" style="display: inline-block;">{f.icon}</div>
                            <h3 class="text-xl font-black text-black dark:text-white mb-2">
                                {currentLang === 'fr' ? f.titleFr : currentLang === 'es' ? f.titleEs : f.titleEn}
                            </h3>
                            <p class="text-gray-600 dark:text-zinc-400 leading-relaxed text-sm">
                                {currentLang === 'fr' ? f.descFr : currentLang === 'es' ? f.descEs : f.descEn}
                            </p>
                            <div class="mt-4 w-12 h-0.5 bg-[#febd17] rounded-full group-hover:w-20 transition-all"></div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-24 bg-black text-white relative overflow-hidden" aria-labelledby="testimonials-heading">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(254,189,23,0.1),transparent_70%)]"></div>
        <div class="container relative z-10">
            <div class="text-center mb-16 max-w-3xl mx-auto">
                <div class="flex justify-center gap-1 mb-4">
                    {#each Array(5) as _}
                        <span class="text-[#febd17] text-2xl">★</span>
                    {/each}
                </div>
                <p class="text-[#febd17] font-bold tracking-wider uppercase text-sm mb-2">
                    4.9/5 — 127 {currentLang === 'fr' ? 'avis vérifiés' : currentLang === 'es' ? 'reseñas verificadas' : 'verified reviews'}
                </p>
                <h2 id="testimonials-heading" class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
                    {currentLang === 'fr' ? 'Nos clients en parlent' : currentLang === 'es' ? 'Nuestros clientes hablan' : 'What clients say'}
                </h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                {#each [
                    {
                        nameFr: 'Marie Tremblay', nameEn: 'Marie Tremblay', nameEs: 'Marie Tremblay',
                        location: 'Montréal',
                        textFr: 'Drain français installé en 3 jours. Équipe ultra professionnelle, soumission claire et travail impeccable. Je recommande à 100%.',
                        textEn: 'French drain installed in 3 days. Ultra professional team, clear quote and impeccable work. I recommend 100%.',
                        textEs: 'Drenaje francés instalado en 3 días. Equipo muy profesional, cotización clara y trabajo impecable. Recomiendo al 100%.'
                    },
                    {
                        nameFr: 'Jean-François Bélanger', nameEn: 'Jean-François Bélanger', nameEs: 'Jean-François Bélanger',
                        location: 'Laval',
                        textFr: 'Réparation de fissures rapide et efficace. Plus jamais d\'infiltration depuis 2 ans. Garantie tenue, vraiment satisfait.',
                        textEn: 'Fast and efficient crack repair. No more infiltration in 2 years. Warranty honored, truly satisfied.',
                        textEs: 'Reparación de grietas rápida y eficaz. Sin infiltraciones desde hace 2 años. Garantía cumplida, muy satisfecho.'
                    },
                    {
                        nameFr: 'Sophie Lavoie', nameEn: 'Sophie Lavoie', nameEs: 'Sophie Lavoie',
                        location: 'Saint-Jérôme',
                        textFr: 'Excavation pour piscine creusée. Travail propre, échéancier respecté et prix honnête. Une équipe en qui on peut faire confiance.',
                        textEn: 'Excavation for in-ground pool. Clean work, schedule respected and honest pricing. A team you can trust.',
                        textEs: 'Excavación para piscina. Trabajo limpio, plazos respetados y precio honesto. Un equipo confiable.'
                    }
                ] as t, i}
                    <article class="bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-3xl p-8 hover:border-[#febd17]/50 transition-all" style="animation: fadeInUp 0.6s ease-out {i * 0.15}s both;" itemscope itemtype="https://schema.org/Review">
                        <div class="flex gap-1 mb-4">
                            {#each Array(5) as _}<span class="text-[#febd17]">★</span>{/each}
                        </div>
                        <p class="text-gray-300 leading-relaxed mb-6 italic" itemprop="reviewBody">
                            "{currentLang === 'fr' ? t.textFr : currentLang === 'es' ? t.textEs : t.textEn}"
                        </p>
                        <div class="flex items-center gap-3 pt-4 border-t border-zinc-800">
                            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#febd17] to-yellow-600 flex items-center justify-center text-black font-black">
                                {t.nameFr[0]}
                            </div>
                            <div itemprop="author" itemscope itemtype="https://schema.org/Person">
                                <p class="font-bold text-sm" itemprop="name">{currentLang === 'fr' ? t.nameFr : currentLang === 'es' ? t.nameEs : t.nameEn}</p>
                                <p class="text-xs text-zinc-500">{t.location}</p>
                            </div>
                        </div>
                    </article>
                {/each}
            </div>
        </div>
    </section>

    <!-- Inline CTA after Testimonials -->
    <InlineCTA variant="banner" />

    <!-- FAQ Section (visible content matching FAQ Schema) -->
    <section class="py-24 bg-white dark:bg-black transition-colors duration-300" id="faq" aria-labelledby="faq-heading">
        <div class="container max-w-4xl">
            <div class="mb-12 text-center">
                <span class="text-[#febd17] font-bold tracking-wider uppercase text-sm mb-2 block">FAQ</span>
                <h2 id="faq-heading" class="text-3xl md:text-5xl font-black tracking-tight text-black dark:text-white">
                    {currentLang === 'fr' ? 'Questions Fréquentes - Excavation et Drain Français au Québec' : currentLang === 'es' ? 'Preguntas Frecuentes - Excavación y Drenaje Francés en Quebec' : 'Frequently Asked Questions - Excavation and French Drain in Quebec'}
                </h2>
            </div>
            <div class="space-y-4">
                {#each (currentLang === 'fr' ? [
                    { q: "Combien coûte l'installation d'un drain français au Québec en 2026 ?", a: "Le coût d'installation varie entre 4 000$ et 12 000$ selon la longueur, la profondeur et l'accès au site. Soumissions gratuites avec garantie écrite." },
                    { q: "Quand faut-il remplacer son drain français ?", a: "Un drain français a une durée de vie de 25 à 40 ans. Signes : infiltration d'eau, humidité, efflorescence, fissures dans la fondation." },
                    { q: "Êtes-vous certifié RBQ pour l'excavation au Québec ?", a: "Oui, nous détenons les licences RBQ, NEQ, CCQ et CMMTQ. Tous nos travaux sont garantis." },
                    { q: "Quelles régions desservez-vous au Québec ?", a: "Montréal, Laval, Laurentides, Lanaudière, Montérégie et la grande région métropolitaine de Québec." },
                    { q: "Combien de temps prend une réparation de fissure de fondation ?", a: "Une réparation par injection d'époxy ou polyuréthane prend 1 à 2 jours. Pour des dommages structurels, 3 à 7 jours." },
                    { q: "Offrez-vous des soumissions gratuites ?", a: "Oui, toutes nos soumissions sont gratuites et sans engagement, livrées en moins de 24h." }
                ] : currentLang === 'es' ? [
                    { q: "¿Cuánto cuesta instalar un drenaje francés en Quebec en 2026?", a: "Entre 4,000$ y 12,000$ según largo, profundidad y acceso. Cotizaciones gratuitas con garantía escrita." },
                    { q: "¿Cuándo se debe reemplazar un drenaje francés?", a: "Dura 25 a 40 años. Señales: infiltración de agua, humedad, eflorescencia, grietas en cimientos." },
                    { q: "¿Están certificados RBQ para excavación en Quebec?", a: "Sí, tenemos licencias RBQ, NEQ, CCQ y CMMTQ. Todos los trabajos están garantizados." },
                    { q: "¿Qué regiones cubren en Quebec?", a: "Montreal, Laval, Laurentides, Lanaudière, Montérégie y área metropolitana de Quebec." },
                    { q: "¿Cuánto tarda la reparación de grietas?", a: "Inyección de epoxi o poliuretano: 1 a 2 días. Daños estructurales: 3 a 7 días." },
                    { q: "¿Ofrecen cotizaciones gratuitas?", a: "Sí, gratuitas y sin compromiso, entregadas en menos de 24h." }
                ] : [
                    { q: "How much does French drain installation cost in Quebec in 2026?", a: "Between $4,000 and $12,000 depending on length, depth, and site access. Free quotes with written warranty." },
                    { q: "When should you replace your French drain?", a: "Lifespan of 25 to 40 years. Signs: basement water infiltration, dampness, efflorescence, foundation cracks." },
                    { q: "Are you RBQ certified for excavation in Quebec?", a: "Yes, we hold RBQ, NEQ, CCQ and CMMTQ licenses. All work is warrantied." },
                    { q: "What areas do you serve in Quebec?", a: "Montreal, Laval, Laurentians, Lanaudière, Montérégie and greater Quebec metropolitan area." },
                    { q: "How long does foundation crack repair take?", a: "Epoxy or polyurethane injection: 1 to 2 days. Major structural damage: 3 to 7 days." },
                    { q: "Do you offer free quotes?", a: "Yes, all quotes are free, no obligation, delivered within 24 hours." }
                ]) as item}
                    <details class="group bg-gray-50 dark:bg-zinc-900 rounded-2xl p-6 border border-gray-200 dark:border-zinc-800">
                        <summary class="font-bold text-lg text-black dark:text-white cursor-pointer flex justify-between items-center">
                            {item.q}
                            <span class="text-[#febd17] text-2xl group-open:rotate-45 transition-transform">+</span>
                        </summary>
                        <p class="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">{item.a}</p>
                    </details>
                {/each}
            </div>
        </div>
    </section>

    <!-- Blog & Map -->
    <div class="bg-background dark:bg-black pb-10 space-y-10 transition-colors duration-300">
        <Blogs />
        <Map />
    </div>

    <Footer />

</main>
