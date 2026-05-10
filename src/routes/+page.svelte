<script lang="ts">
	import { language } from '$lib/store/store.js';
	import Button from "$lib/components/ui/button/button.svelte";
	import * as Card from "$lib/components/ui/card";
	import { cn } from "$lib/lib-utils";
    
    // Images — WebP optimized (~70% smaller than JPG/PNG)
	import banner from '$lib/images/banner.webp';
	import banner480 from '$lib/images/banner-480.webp';
	import banner800 from '$lib/images/banner-800.webp';
	import excavation2 from "$lib/images/excavation2.webp";
	import frenchdrain2 from "$lib/images/frenchdrain2.webp";
	import fissure2 from "$lib/images/fissure2.webp";
	import demolition2 from "$lib/images/demolition2.webp";
	import inspection2 from "$lib/images/inspection2.webp";
    import partner1 from "$lib/images/partner1.jpg";
	import partner2 from "$lib/images/partner2.webp";
	import partner3 from "$lib/images/partner3.jpg";
    import certif1 from "$lib/images/neq.png";
	import certif2 from "$lib/images/RBQ.png";
	import certif3 from "$lib/images/CMMTQ.svg";
	import certif4 from "$lib/images/CCQ.png";
    
    // Components
	import SoumissionForm from '$lib/SoumissionForm.svelte';
	import Footer from '$lib/Footer.svelte';
	import Map from '$lib/map.svelte';
    import Blogs from './blog/blogs.svelte';
    import SEO from '$lib/seo/SEO.svelte';
    import InlineCTA from '$lib/components/InlineCTA.svelte';
    import TrendingTopics from '$lib/components/TrendingTopics.svelte';
    import { localBusinessJsonLd, websiteJsonLd, faqJsonLd, serviceJsonLd, videoObjectJsonLd, SITE } from '$lib/seo/seo-config';

    $: isEn = $language === 'en';
    $: currentLang = ($language as 'fr' | 'en' | 'es') || 'fr';

    // Video loads only when user clicks play (saves 1.5-2MB on mobile load)
    let videoLoaded = false;

    // Auto-load video after 4s if connection is fast (Network Information API)
    import { onMount } from 'svelte';
    onMount(() => {
        if (typeof navigator === 'undefined') return;
        // @ts-ignore - connection API is experimental
        const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const isFast = !conn || (conn.effectiveType !== 'slow-2g' && conn.effectiveType !== '2g' && conn.effectiveType !== '3g' && !conn.saveData);
        if (isFast) {
            const timer = setTimeout(() => {
                if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
                    videoLoaded = true;
                }
            }, 4000);
            return () => clearTimeout(timer);
        }
    });

    $: homeJsonLd = [
        videoObjectJsonLd({
            name: currentLang === 'fr' ? 'Installation Drain Français Montréal — Mini Excavations Érable' : currentLang === 'es' ? 'Instalación Drenaje Francés Montreal' : 'French Drain Installation Montreal',
            description: currentLang === 'fr' ? "Vidéo réelle d'installation de drain français au Québec par Mini Excavations Érable. Excavation périphérique avec mini-pelle." : currentLang === 'es' ? 'Video real de instalación de drenaje francés en Quebec.' : 'Real video of French drain installation in Quebec.',
            thumbnailUrl: `${SITE.url}/videos/work-1-poster.jpg`,
            contentUrl: `${SITE.url}/videos/work-1.mp4`
        }),
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

    // Featured services data (premium grid)
    $: serviceData = [
        { title: currentLang === 'fr' ? 'Drain Français' : currentLang === 'es' ? 'Drenaje Francés' : 'French Drain', desc: currentLang === 'fr' ? "L'expertise #1 au Québec pour protéger votre fondation contre l'eau." : currentLang === 'es' ? 'Expertise #1 en Quebec para proteger sus cimientos del agua.' : 'Quebec\'s #1 expertise to protect your foundation from water.', image: frenchdrain2, slug: 'drain-francais', icon: '💧', priceFrom: '4 000$', tag: currentLang === 'fr' ? 'POPULAIRE' : currentLang === 'es' ? 'POPULAR' : 'POPULAR' },
        { title: 'Excavation', desc: currentLang === 'fr' ? 'Mini-pelles, excavatrices, terrains difficiles. On passe partout.' : currentLang === 'es' ? 'Mini-excavadoras, terrenos difíciles. Pasamos por todos lados.' : 'Mini-excavators, tough terrain. We get through anywhere.', image: excavation2, slug: 'excavation', icon: '🚜', priceFrom: '125$/h', tag: '' },
        { title: currentLang === 'fr' ? 'Réparation Fissures' : currentLang === 'es' ? 'Reparación Grietas' : 'Crack Repair', desc: currentLang === 'fr' ? 'Injection époxy ou polyuréthane. Étanche à vie, garantie 10 ans.' : currentLang === 'es' ? 'Inyección epoxi o poliuretano. Estanco de por vida, garantía 10 años.' : 'Epoxy or polyurethane injection. Watertight for life, 10-year warranty.', image: fissure2, slug: 'reparation-fissures', icon: '🔧', priceFrom: '450$', tag: '' },
        { title: currentLang === 'fr' ? 'Démolition' : currentLang === 'es' ? 'Demolición' : 'Demolition', desc: currentLang === 'fr' ? 'Maison, garage, piscine. Rapide, propre, écoresponsable.' : currentLang === 'es' ? 'Casa, garaje, piscina. Rápido, limpio, ecoresponsable.' : 'House, garage, pool. Fast, clean, eco-friendly.', image: demolition2, slug: 'demolition', icon: '🔨', priceFrom: '12 000$', tag: '' },
        { title: currentLang === 'fr' ? 'Inspection Caméra' : currentLang === 'es' ? 'Inspección Cámara' : 'Camera Inspection', desc: currentLang === 'fr' ? 'Diagnostic HD sans excavation. Rapport vidéo complet inclus.' : currentLang === 'es' ? 'Diagnóstico HD sin excavación. Reporte de video incluido.' : 'HD diagnostic without excavation. Full video report included.', image: inspection2, slug: 'inspection-camera', icon: '📹', priceFrom: '250$', tag: '' }
    ];
</script>

<SEO lang={currentLang} path="/" jsonLd={homeJsonLd} />

<main class="flex flex-col min-h-screen bg-background font-sans" itemscope itemtype="https://schema.org/LocalBusiness">

    <!-- 🎨 HERO PREMIUM — Bento-style with floating cards -->
    <section class="relative min-h-screen flex items-center bg-gradient-to-br from-white via-yellow-50/40 to-white dark:from-black dark:via-zinc-950 dark:to-black text-black dark:text-white overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24" id="home" aria-labelledby="hero-heading">

        <!-- Animated background: blobs ONLY desktop (mobile = static for perf) -->
        <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none hidden md:block">
            <div class="absolute top-0 -left-40 w-[500px] h-[500px] bg-[#febd17] rounded-full blur-[120px] opacity-20 dark:opacity-15 animate-blob"></div>
            <div class="absolute top-1/3 right-0 w-[600px] h-[600px] bg-yellow-400 rounded-full blur-[140px] opacity-15 dark:opacity-10 animate-blob" style="animation-delay: 2s;"></div>
            <div class="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-orange-400 rounded-full blur-[100px] opacity-10 dark:opacity-10 animate-blob" style="animation-delay: 4s;"></div>
            <div class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_50%,transparent_100%)]"></div>
        </div>
        <!-- Mobile: simple static gradient -->
        <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none md:hidden">
            <div class="absolute top-0 right-0 w-64 h-64 bg-[#febd17] rounded-full blur-3xl opacity-15 dark:opacity-10"></div>
        </div>

        <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                <!-- LEFT — Content -->
                <div class="lg:col-span-7 flex flex-col text-left">

                    <!-- Top pills: Live availability + RBQ License -->
                    <div class="flex flex-wrap items-center gap-2 mb-6" style="animation: heroFadeIn 0.6s ease-out;">
                        <!-- Live availability pill -->
                        <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-green-300 dark:border-green-500/30 shadow-lg">
                            <span class="relative flex h-2.5 w-2.5">
                                <span class="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                            <span class="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wider">
                                {currentLang === 'fr' ? "Équipe disponible 24h" : currentLang === 'es' ? "Equipo disponible 24h" : "Team available 24h"}
                            </span>
                        </div>

                        <!-- RBQ License pill — verifiable -->
                        <a href="https://www.rbq.gouv.qc.ca/recherche-licence-titulaire?numLicence=5823-7736-01" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#febd17]/20 to-yellow-500/20 dark:from-[#febd17]/15 dark:to-yellow-500/15 backdrop-blur-md border border-[#febd17] hover:from-[#febd17]/30 hover:to-yellow-500/30 transition-all shadow-lg hover:scale-105">
                            <svg class="w-3.5 h-3.5 text-green-600 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                            <span class="text-xs font-bold text-gray-800 dark:text-white uppercase tracking-wider">
                                R.B.Q.
                            </span>
                            <span class="text-xs font-black font-mono text-[#febd17] tracking-wider">5823-7736-01</span>
                        </a>
                    </div>

                    <!-- Pre-headline tag — focus keyword "Mini Excavation" -->
                    <div class="inline-flex items-center gap-2 mb-5" style="animation: heroFadeIn 0.6s ease-out 0.1s both;">
                        <span class="text-[#febd17] font-black tracking-[0.2em] uppercase text-xs md:text-sm">
                            {currentLang === 'fr' ? "★ Mini Excavation #1 au Québec ★" : currentLang === 'es' ? "★ Mini Excavación #1 en Quebec ★" : "★ Mini Excavation #1 in Quebec ★"}
                        </span>
                    </div>

                    <!-- H1 with gradient + emphasis (BRAND + KEY SERVICES visible for SEO) -->
                    <h1 id="hero-heading" class="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter mb-5 md:mb-6 leading-[0.95]" itemprop="name" style="animation: heroFadeIn 0.7s ease-out 0.2s both;">
                        <span class="block text-black dark:text-white">
                            Mini Excavations
                        </span>
                        <span class="block bg-gradient-to-br from-[#febd17] via-yellow-500 to-orange-500 bg-clip-text text-transparent drop-shadow-sm pb-1">
                            Érable
                        </span>
                    </h1>
                    <p class="text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white mb-4 md:mb-5 leading-tight" style="animation: heroFadeIn 0.7s ease-out 0.25s both;">
                        {currentLang === 'fr'
                            ? "Drain Français · Excavation · Fissure · Démolition"
                            : currentLang === 'es'
                                ? "Drenaje Francés · Excavación · Grietas · Demolición"
                                : "French Drain · Excavation · Crack · Demolition"}
                    </p>

                    <!-- Subtitle with strong value prop -->
                    <p class="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-3 max-w-2xl leading-snug font-medium" style="animation: heroFadeIn 0.7s ease-out 0.3s both;">
                        {currentLang === 'fr'
                            ? "Drain français, fondation, fissures et démolition partout au Québec."
                            : currentLang === 'es'
                                ? 'Drenaje francés, cimientos, grietas y demolición en todo Quebec.'
                                : 'French drain, foundation, cracks and demolition across Quebec.'}
                    </p>
                    <p class="text-sm md:text-base lg:text-lg text-gray-500 dark:text-zinc-400 mb-6 md:mb-8 max-w-2xl leading-relaxed" itemprop="description" style="animation: heroFadeIn 0.7s ease-out 0.4s both;">
                        {currentLang === 'fr'
                            ? "15+ ans d'expertise, garantie écrite 15 ans transférable, certifié RBQ. Une seule visite et vous saurez exactement combien va coûter votre projet."
                            : currentLang === 'es'
                                ? "+15 años de experiencia, garantía escrita 15 años transferible, certificado RBQ. Una sola visita y sabrá exactamente cuánto costará su proyecto."
                                : "15+ years experience, transferable 15-year warranty, RBQ certified. One visit and you'll know exactly how much your project will cost."}
                    </p>

                    <!-- Mega CTA group — bigger tap targets on mobile -->
                    <div class="flex flex-col sm:flex-row gap-2.5 md:gap-3 mb-5 md:mb-6" style="animation: heroFadeIn 0.7s ease-out 0.5s both;">
                        <a href="#contact" class="group relative inline-flex items-center justify-center gap-2 px-6 md:px-8 py-4 md:py-5 min-h-[56px] rounded-2xl bg-gradient-to-r from-[#febd17] via-yellow-400 to-[#febd17] bg-[length:200%_100%] text-black font-black text-base md:text-lg shadow-[0_20px_60px_-15px_rgba(254,189,23,0.6)] hover:shadow-[0_25px_70px_-15px_rgba(254,189,23,0.8)] transition-all hover:scale-[1.03] active:scale-[0.98] hover:bg-[position:100%_0] overflow-hidden">
                            <span class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"></span>
                            <span class="relative z-10 flex items-center gap-2">
                                📋 {currentLang === 'fr' ? 'Soumission gratuite' : currentLang === 'es' ? 'Cotización gratuita' : 'Free quote'}
                                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                            </span>
                        </a>
                        <a href="tel:+15148309973" class="group inline-flex items-center justify-center gap-2 px-6 md:px-8 py-4 md:py-5 min-h-[56px] rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-2 border-gray-200 dark:border-zinc-700 hover:border-black dark:hover:border-white text-black dark:text-white font-bold text-base md:text-lg transition-all hover:scale-[1.03] active:scale-[0.98]">
                            <svg class="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                            <span>(514) 830-9973</span>
                        </a>
                    </div>

                    <!-- RBQ License badge — prominente y verificable -->
                    <a href="https://www.rbq.gouv.qc.ca/recherche-licence-titulaire?numLicence=5823-7736-01" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#febd17]/10 dark:bg-[#febd17]/15 border border-[#febd17]/40 hover:border-[#febd17] hover:bg-[#febd17]/20 transition-colors mb-4 w-fit" style="animation: heroFadeIn 0.7s ease-out 0.55s both;">
                        <svg class="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                        <span class="text-xs font-bold text-gray-700 dark:text-gray-200">
                            {currentLang === 'fr' ? 'Licence R.B.Q.' : currentLang === 'es' ? 'Licencia R.B.Q.' : 'R.B.Q. License'}
                        </span>
                        <span class="text-xs font-black font-mono text-[#febd17] tracking-wider">5823-7736-01</span>
                        <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                    </a>

                    <!-- Microproof bar -->
                    <div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-600 dark:text-zinc-400" style="animation: heroFadeIn 0.7s ease-out 0.6s both;">
                        <div class="flex items-center gap-1.5">
                            <svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                            {currentLang === 'fr' ? 'Sans engagement' : currentLang === 'es' ? 'Sin compromiso' : 'No obligation'}
                        </div>
                        <div class="flex items-center gap-1.5">
                            <svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                            {currentLang === 'fr' ? 'Garantie 15 ans' : currentLang === 'es' ? 'Garantía 15 años' : '15-year warranty'}
                        </div>
                        <div class="flex items-center gap-1.5">
                            <svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                            {currentLang === 'fr' ? 'Devis détaillé en 24h' : currentLang === 'es' ? 'Cotización en 24h' : 'Detailed quote in 24h'}
                        </div>
                    </div>

                    <!-- Quick service tags (SEO link juice — Mini Excavation prioritized) -->
                    <nav aria-label="Quick services" class="mt-8 flex flex-wrap gap-2" style="animation: heroFadeIn 0.7s ease-out 0.7s both;">
                        {#each [
                            { url: '/mini-excavation', label: currentLang === 'fr' ? '⭐ Mini Excavation' : currentLang === 'es' ? '⭐ Mini Excavación' : '⭐ Mini Excavation', primary: true },
                            { url: '/services/drain-francais', label: currentLang === 'fr' ? 'Drain Français' : currentLang === 'es' ? 'Drenaje Francés' : 'French Drain' },
                            { url: '/services/excavation', label: 'Excavation' },
                            { url: '/services/reparation-fissures', label: currentLang === 'fr' ? 'Fissures' : currentLang === 'es' ? 'Grietas' : 'Cracks' },
                            { url: '/services/demolition', label: currentLang === 'fr' ? 'Démolition' : currentLang === 'es' ? 'Demolición' : 'Demolition' },
                            { url: '/urgences', label: currentLang === 'fr' ? '🚨 Urgence 24/7' : currentLang === 'es' ? '🚨 Urgencia 24/7' : '🚨 24/7 Emergency', highlight: true }
                        ] as svc}
                            <a href={svc.url} class="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 {svc.highlight ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/30' : svc.primary ? 'bg-gradient-to-r from-[#febd17] to-yellow-500 text-black shadow-lg shadow-yellow-500/30' : 'bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 hover:bg-[#febd17] hover:text-black border border-gray-200 dark:border-zinc-800'}">
                                {svc.label}
                            </a>
                        {/each}
                    </nav>
                </div>

                <!-- RIGHT — Bento card stack with image + floating reviews -->
                <div class="lg:col-span-5 relative" style="animation: heroFadeIn 1s ease-out 0.4s both;">

                    <!-- Main image card with glow -->
                    <div class="relative max-w-md mx-auto lg:max-w-none">
                        <!-- Glow halo (less intense on mobile for perf) -->
                        <div class="absolute -inset-3 md:-inset-6 bg-gradient-to-tr from-[#febd17] via-yellow-400 to-orange-400 rounded-[2rem] md:rounded-[2.5rem] blur-xl md:blur-2xl opacity-25 md:opacity-30 hidden md:block"></div>

                        <!-- 🎬 Hero IMAGEN (default) + Video lazy on click — PERF optimized -->
                        <div class="relative aspect-[4/3] sm:aspect-[3/4] rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/40 dark:border-zinc-700 shadow-2xl group">
                            <!-- LIVE WORK badge -->
                            <div class="absolute top-3 left-3 md:top-4 md:left-4 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full bg-red-500/90 backdrop-blur-md text-white text-[10px] md:text-xs font-black uppercase tracking-wider shadow-lg border border-white/20">
                                <span class="relative flex h-2 w-2">
                                    <span class="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping"></span>
                                    <span class="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                </span>
                                {currentLang === 'fr' ? 'Travail en direct' : currentLang === 'es' ? 'Trabajo en vivo' : 'Live work'}
                            </div>

                            <!-- Imagen por defecto (LCP rápido) — video se reemplaza on-demand -->
                            {#if videoLoaded}
                                <video
                                    autoplay
                                    loop
                                    muted
                                    playsinline
                                    preload="metadata"
                                    poster="/videos/work-1-poster.jpg"
                                    aria-label={currentLang === 'fr' ? "Vidéo en direct: installation de drain français au Québec" : currentLang === 'es' ? "Video en vivo: instalación de drenaje francés" : "Live video: French drain installation"}
                                    class="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s]"
                                    itemprop="video"
                                >
                                    <source src="/videos/work-1-mobile.mp4" media="(max-width: 768px)" type="video/mp4" />
                                    <source src="/videos/work-1.mp4" type="video/mp4" />
                                </video>
                            {:else}
                                <picture>
                                    <source media="(max-width: 480px)" srcset={banner480} type="image/webp" />
                                    <source media="(max-width: 1024px)" srcset={banner800} type="image/webp" />
                                    <img
                                        src={banner}
                                        alt={currentLang === 'fr' ? "Excavation drain français Montréal" : currentLang === 'es' ? "Excavación drenaje francés Montreal" : "Excavation french drain Montreal"}
                                        width="800"
                                        height="1000"
                                        loading="eager"
                                        fetchpriority="high"
                                        decoding="async"
                                        class="h-full w-full object-cover"
                                    />
                                </picture>
                                <!-- Play button overlay — click para cargar video -->
                                <button
                                    type="button"
                                    on:click={() => videoLoaded = true}
                                    class="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group/play"
                                    aria-label={currentLang === 'fr' ? 'Voir la vidéo' : currentLang === 'es' ? 'Ver el video' : 'Watch video'}
                                >
                                    <span class="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-2xl group-hover/play:scale-110 transition-transform">
                                        <svg class="w-7 h-7 md:w-8 md:h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                    </span>
                                </button>
                            {/if}
                            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                            <!-- On-image bottom card: live counter -->
                            <div class="absolute bottom-5 left-5 right-5 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/50 dark:border-zinc-700">
                                <div class="flex items-center gap-3">
                                    <div class="flex -space-x-2">
                                        <div class="w-9 h-9 rounded-full bg-gradient-to-br from-[#febd17] to-yellow-600 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-black font-black text-xs">M</div>
                                        <div class="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-red-500 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-white font-black text-xs">JF</div>
                                        <div class="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-white font-black text-xs">SL</div>
                                        <div class="w-9 h-9 rounded-full bg-zinc-800 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-white font-black text-xs">+</div>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <div class="flex items-center gap-1 mb-0.5">
                                            <span class="text-[#febd17]">★★★★★</span>
                                            <span class="text-xs font-bold">4.9</span>
                                        </div>
                                        <p class="text-xs text-gray-600 dark:text-zinc-400 truncate">
                                            <span class="font-bold text-gray-900 dark:text-white">127</span>
                                            {currentLang === 'fr' ? 'clients satisfaits au Québec' : currentLang === 'es' ? 'clientes satisfechos en Quebec' : 'happy clients in Quebec'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Floating RBQ badge top-left (with license number) -->
                        <a href="https://www.rbq.gouv.qc.ca/recherche-licence-titulaire?numLicence=5823-7736-01" target="_blank" rel="noopener" class="absolute -top-3 -left-2 md:-top-4 md:-left-4 lg:-left-6 bg-white dark:bg-zinc-900 rounded-xl md:rounded-2xl px-2.5 py-2 md:px-4 md:py-3 shadow-xl md:shadow-2xl border border-gray-200 dark:border-zinc-700 flex items-center gap-1.5 md:gap-2 animate-float-slow hover:scale-105 transition-transform">
                            <div class="w-7 h-7 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white">
                                <svg class="w-3.5 h-3.5 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                            </div>
                            <div>
                                <p class="text-[8px] md:text-[10px] text-gray-500 dark:text-zinc-500 uppercase tracking-wider font-bold leading-tight">Licence R.B.Q.</p>
                                <p class="text-[11px] md:text-sm font-black leading-tight font-mono">5823-7736-01</p>
                            </div>
                        </a>

                        <!-- Floating "24h" badge top-right (smaller on mobile) -->
                        <div class="absolute -top-3 -right-2 md:-top-4 md:-right-4 lg:-right-6 bg-gradient-to-br from-[#febd17] to-yellow-600 rounded-xl md:rounded-2xl px-2.5 py-2 md:px-4 md:py-3 shadow-xl md:shadow-2xl shadow-yellow-500/40 flex items-center gap-1.5 md:gap-2 animate-float-slow" style="animation-delay: 1.5s;">
                            <span class="text-base md:text-2xl">⚡</span>
                            <div>
                                <p class="text-[8px] md:text-[10px] text-black/70 uppercase tracking-wider font-bold leading-tight">{currentLang === 'fr' ? 'Réponse' : currentLang === 'es' ? 'Respuesta' : 'Response'}</p>
                                <p class="text-[11px] md:text-sm font-black text-black leading-tight">24h max</p>
                            </div>
                        </div>

                        <!-- Floating warranty badge bottom-right (only tablet+) -->
                        <div class="hidden md:flex absolute -bottom-6 -right-2 lg:-right-6 bg-white dark:bg-zinc-900 rounded-2xl px-4 py-3 shadow-2xl border border-gray-200 dark:border-zinc-700 items-center gap-2 animate-float-slow" style="animation-delay: 3s;">
                            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-black text-base">15</div>
                            <div>
                                <p class="text-[10px] text-gray-500 dark:text-zinc-500 uppercase tracking-wider font-bold">{currentLang === 'fr' ? 'Garantie' : currentLang === 'es' ? 'Garantía' : 'Warranty'}</p>
                                <p class="text-sm font-black">{currentLang === 'fr' ? 'ans transférable' : currentLang === 'es' ? 'años transferible' : 'years transferable'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Scroll indicator -->
        <div class="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-gray-400 dark:text-zinc-600">
            <div class="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1.5">
                <div class="w-1 h-2 rounded-full bg-current animate-scroll-dot"></div>
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
        @keyframes heroFadeIn {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(40px, -30px) scale(1.1); }
            66% { transform: translate(-30px, 30px) scale(0.95); }
        }
        :global(.animate-blob) {
            animation: blob 10s ease-in-out infinite;
        }
        @keyframes float-slow {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(-1deg); }
        }
        :global(.animate-float-slow) {
            animation: float-slow 4s ease-in-out infinite;
        }
        @keyframes scroll-dot {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(12px); opacity: 0; }
        }
        :global(.animate-scroll-dot) {
            animation: scroll-dot 1.5s ease-in-out infinite;
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

        /* 🚀 Performance: disable expensive blob animations on mobile */
        @media (max-width: 768px) {
            :global(.animate-blob) {
                animation: none;
            }
        }

        /* ♿ Accessibility: respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
            :global(.animate-blob),
            :global(.animate-float-slow),
            :global(.animate-scroll-dot),
            :global(.animate-pulse) {
                animation: none !important;
            }
            * {
                animation-duration: 0.01ms !important;
                transition-duration: 0.01ms !important;
            }
        }
    </style>

    <!-- 🔥 Trending Topics 2026 (SEO + UX boost) -->
    <TrendingTopics />

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

    <!-- Soumission Form Section -->
    <section class="py-16 bg-zinc-950 transition-colors duration-300">
        <div class="container max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-10 lg:mb-14 max-w-3xl mx-auto">
                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
                    📋 {currentLang === 'fr' ? 'Demande de soumission' : currentLang === 'es' ? 'Solicitud de cotización' : 'Quote request'}
                </div>
                <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                    {currentLang === 'fr' ? 'Obtenez votre' : currentLang === 'es' ? 'Obtenga su' : 'Get your'}
                    <span class="text-amber-500">{currentLang === 'fr' ? 'soumission' : currentLang === 'es' ? 'cotización' : 'quote'}</span>
                </h2>
                <p class="mt-3 text-zinc-400">
                    {currentLang === 'fr' ? 'Remplissez le formulaire et notre équipe vous enverra une offre détaillée par courriel rapidement.' : currentLang === 'es' ? 'Complete el formulario y nuestro equipo le enviará una oferta detallada por correo rápidamente.' : 'Fill out the form and our team will send you a detailed offer by email shortly.'}
                </p>
            </div>
            <SoumissionForm showHero={false} showSidebar={true} />
        </div>
    </section>

    <!-- 🎨 SERVICES — Premium Bento Grid (mobile-optimized) -->
    <section class="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white via-yellow-50/30 to-white dark:from-black dark:via-zinc-950 dark:to-black relative overflow-hidden" id="services" aria-labelledby="services-heading">
        <!-- Background decoration -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#febd17] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>

        <div class="container max-w-7xl px-4 md:px-6 relative z-10">
            <!-- Header -->
            <div class="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#febd17]/10 border border-[#febd17]/30 mb-5">
                    <span class="text-[#febd17] font-black tracking-[0.2em] uppercase text-[10px] md:text-xs">{texts.servicesCta}</span>
                </div>
                <h2 id="services-heading" class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black dark:text-white mb-4 leading-[1.05]">
                    {currentLang === 'fr' ? 'Tout ce dont' : currentLang === 'es' ? 'Todo lo que' : 'Everything'}
                    <span class="bg-gradient-to-r from-[#febd17] to-orange-500 bg-clip-text text-transparent">
                        {currentLang === 'fr' ? 'votre projet a besoin' : currentLang === 'es' ? 'tu proyecto necesita' : 'your project needs'}
                    </span>
                </h2>
                <p class="text-base md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                    {currentLang === 'fr' ? 'Une équipe certifiée, des prix transparents, et 15 ans de garantie sur chaque travail.' : currentLang === 'es' ? 'Equipo certificado, precios transparentes, y garantía de 15 años en cada trabajo.' : 'A certified team, transparent pricing, and a 15-year warranty on every job.'}
                </p>
            </div>

            <!-- Bento Grid: 1col mobile → 2col tablet → 3col desktop with featured first -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-6">
                {#each serviceData as svc, i}
                    {@const isFeatured = i === 0}
                    {@const colSpan = isFeatured ? 'sm:col-span-2 lg:col-span-3 lg:row-span-2' : 'lg:col-span-3 sm:col-span-1'}
                    <a
                        href={`/services/${svc.slug}`}
                        class="group relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/20 hover:-translate-y-1 hover:border-[#febd17]/50 dark:hover:border-[#febd17]/50 {colSpan} {isFeatured ? 'min-h-[420px] md:min-h-[500px]' : 'min-h-[280px] md:min-h-[240px]'} flex flex-col"
                        itemscope itemtype="https://schema.org/Service"
                        style="animation: fadeInUp 0.6s ease-out {i * 0.08}s both;"
                    >
                        <!-- Tag (only on featured) -->
                        {#if svc.tag}
                            <div class="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-gradient-to-r from-[#febd17] to-yellow-500 text-black text-[10px] font-black tracking-wider shadow-lg">
                                ⭐ {svc.tag}
                            </div>
                        {/if}

                        <!-- Image with mobile-friendly overlay -->
                        <div class="relative {isFeatured ? 'h-64 md:h-80' : 'h-44 md:h-40'} overflow-hidden">
                            <img
                                src={svc.image}
                                alt={`${svc.title} — Mini Excavations Érable Québec`}
                                class="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                                loading="lazy"
                                width={isFeatured ? "800" : "400"}
                                height={isFeatured ? "500" : "300"}
                                decoding="async"
                                itemprop="image"
                            />
                            <!-- Bottom gradient for legibility -->
                            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                            <!-- Icon badge bottom-left -->
                            <div class="absolute bottom-3 left-3 w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur flex items-center justify-center text-xl md:text-2xl shadow-lg">
                                {svc.icon}
                            </div>
                            <!-- Price badge bottom-right -->
                            <div class="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                                {currentLang === 'fr' ? 'Dès' : currentLang === 'es' ? 'Desde' : 'From'} {svc.priceFrom}
                            </div>
                        </div>

                        <!-- Content -->
                        <div class="flex-1 flex flex-col p-5 md:p-6">
                            <h3 class="text-xl md:text-2xl font-black text-black dark:text-white mb-2 leading-tight" itemprop="name">
                                {svc.title}
                            </h3>
                            <p class="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed flex-1" itemprop="description">
                                {svc.desc}
                            </p>

                            <!-- CTA at bottom -->
                            <div class="mt-4 flex items-center justify-between pt-4 border-t border-gray-100 dark:border-zinc-800">
                                <span class="text-xs font-bold text-[#febd17] uppercase tracking-wider flex items-center gap-1.5">
                                    <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                    {currentLang === 'fr' ? 'Disponible' : currentLang === 'es' ? 'Disponible' : 'Available'}
                                </span>
                                <span class="inline-flex items-center gap-1 text-sm font-bold text-black dark:text-white group-hover:text-[#febd17] transition-colors">
                                    {currentLang === 'fr' ? 'Voir détails' : currentLang === 'es' ? 'Ver detalles' : 'See details'}
                                    <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
                                </span>
                            </div>
                            <meta itemprop="areaServed" content="Québec, Montréal, Laval, Laurentides" />
                            <meta itemprop="provider" content="Mini Excavations Érable" />
                        </div>
                    </a>
                {/each}
            </div>

            <!-- View all + emergency CTA at bottom -->
            <div class="mt-10 md:mt-14 flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a href="/services" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-sm hover:scale-105 transition-transform">
                    {currentLang === 'fr' ? 'Voir tous les services' : currentLang === 'es' ? 'Ver todos los servicios' : 'View all services'}
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>
                <a href="/urgences" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-500 text-white font-bold text-sm hover:bg-red-600 hover:scale-105 transition-all shadow-lg shadow-red-500/30">
                    🚨 {currentLang === 'fr' ? 'Service d\'urgence 24/7' : currentLang === 'es' ? 'Servicio de urgencia 24/7' : '24/7 emergency service'}
                </a>
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

    <!-- 📊 STATS — performance + trust -->
    <section class="py-16 md:py-20 bg-gradient-to-b from-zinc-950 to-black text-white relative overflow-hidden" aria-labelledby="stats-heading">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-[#febd17] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>

        <div class="container max-w-6xl px-4 relative z-10">
            <div class="text-center mb-10 max-w-3xl mx-auto">
                <h2 id="stats-heading" class="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3">
                    {currentLang === 'fr' ? 'Les chiffres' : currentLang === 'es' ? 'Los números' : 'The numbers'}
                    <span class="bg-gradient-to-r from-[#febd17] to-orange-400 bg-clip-text text-transparent">
                        {currentLang === 'fr' ? 'qui parlent.' : currentLang === 'es' ? 'que hablan.' : 'that speak.'}
                    </span>
                </h2>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
                <div class="text-center bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5">
                    <p class="text-4xl md:text-5xl font-black bg-gradient-to-br from-[#febd17] to-orange-500 bg-clip-text text-transparent">500+</p>
                    <p class="text-xs md:text-sm text-zinc-400 uppercase tracking-wider mt-1">{currentLang === 'fr' ? 'Projets' : currentLang === 'es' ? 'Proyectos' : 'Projects'}</p>
                </div>
                <div class="text-center bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5">
                    <p class="text-4xl md:text-5xl font-black bg-gradient-to-br from-[#febd17] to-orange-500 bg-clip-text text-transparent">15</p>
                    <p class="text-xs md:text-sm text-zinc-400 uppercase tracking-wider mt-1">{currentLang === 'fr' ? "Ans d'expertise" : currentLang === 'es' ? 'Años' : 'Years'}</p>
                </div>
                <div class="text-center bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5">
                    <p class="text-4xl md:text-5xl font-black bg-gradient-to-br from-[#febd17] to-orange-500 bg-clip-text text-transparent">4.9★</p>
                    <p class="text-xs md:text-sm text-zinc-400 uppercase tracking-wider mt-1">{currentLang === 'fr' ? 'Note Google' : currentLang === 'es' ? 'Google' : 'Google rating'}</p>
                </div>
                <div class="text-center bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5">
                    <p class="text-4xl md:text-5xl font-black bg-gradient-to-br from-[#febd17] to-orange-500 bg-clip-text text-transparent">24h</p>
                    <p class="text-xs md:text-sm text-zinc-400 uppercase tracking-wider mt-1">{currentLang === 'fr' ? 'Soumission' : currentLang === 'es' ? 'Cotización' : 'Quote'}</p>
                </div>
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
