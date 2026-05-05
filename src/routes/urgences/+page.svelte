<script lang="ts">
	import { language } from '$lib/store/store.js';
	import Button from "$lib/components/ui/button/button.svelte";
	import { cn } from "$lib/lib-utils";
    
    // Images
	import banner from '$lib/images/banner.jpg';
	import excavation2 from "$lib/images/excavation2.jpg";
	import frenchdrain2 from "$lib/images/frenchdrain2.jpg";
	import inspection2 from "$lib/images/inspection2.jpg";
	import certif1 from "$lib/images/neq.png";
	import certif2 from "$lib/images/RBQ.png";
	import certif3 from "$lib/images/CMMTQ.svg";
	import certif4 from "$lib/images/CCQ.png";
    
    // Components
	import UrgencyStepForm from '$lib/components/UrgencyStepForm.svelte';
	import Footer from '$lib/Footer.svelte';
    import SEO from '$lib/seo/SEO.svelte';
    import InlineCTA from '$lib/components/InlineCTA.svelte';
    import { localBusinessJsonLd, websiteJsonLd, faqJsonLd, serviceJsonLd, breadcrumbJsonLd, siteNavigationJsonLd, SITE } from '$lib/seo/seo-config';

    $: isEn = $language === 'en';
    $: currentLang = ($language as 'fr' | 'en' | 'es') || 'fr';

    $: homeJsonLd = [
        localBusinessJsonLd(currentLang),
        websiteJsonLd(currentLang),
        faqJsonLd(currentLang),
        breadcrumbJsonLd([
            { name: currentLang === 'fr' ? 'Accueil' : currentLang === 'es' ? 'Inicio' : 'Home', url: SITE.url },
            { name: currentLang === 'fr' ? 'Urgences' : currentLang === 'es' ? 'Urgencias' : 'Emergency', url: `${SITE.url}/urgences` }
        ]),
        serviceJsonLd({
            name: currentLang === 'fr' ? 'Urgences Excavation et Drain' : currentLang === 'es' ? 'Urgencias Excavación y Drenaje' : 'Excavation and Drain Emergencies',
            description: currentLang === 'fr' ? 'Service d\'urgence pour infiltration d\'eau, refoulement d\'égout, réparation de fissure et drain français.' : currentLang === 'es' ? 'Servicio de urgencia para infiltración de agua, respaldo de alcantarillado, reparación de grietas y drenaje francés.' : 'Emergency service for water infiltration, sewer backup, crack repair and French drain.',
            url: SITE.url + '/urgences',
            lang: currentLang
        }),
        // Reviews structured data for #avis section
        {
            '@context': 'https://schema.org',
            '@type': 'AggregateRating',
            itemReviewed: { '@id': `${SITE.url}/#organization` },
            ratingValue: '4.9',
            reviewCount: '127',
            bestRating: '5',
            worstRating: '1'
        },
        ...testimonials.map((tst) => ({
            '@context': 'https://schema.org',
            '@type': 'Review',
            itemReviewed: { '@id': `${SITE.url}/#organization` },
            author: { '@type': 'Person', name: `${tst.nameFr} (${tst.location})` },
            reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
            reviewBody: tst.textFr
        })),
        // SiteNavigationElement → tells Google to show these as Sitelinks
        ...siteNavigationJsonLd(currentLang)
    ];

    const certifications = [certif1, certif2, certif3, certif4];

    // Data for Testimonials
    const testimonials = [
        {
            nameFr: 'Marie Tremblay',
            location: 'Montréal',
            textFr: 'Infiltration d\'eau soudaine réglée en urgence! L\'équipe s\'est déplacée le jour même pour une inspection. Soumission rapide et claire. Drain français réparé parfaitement. Je recommande à 100%.',
        },
        {
            nameFr: 'Jean-François Bélanger',
            location: 'Laval',
            textFr: 'Refoulement d\'égout la nuit... Ils ont répondu à l\'appel et ont réglé le problème avec une inspection par caméra détaillée. Service impeccable et rassurant dans un moment de stress.',
        },
        {
            nameFr: 'Sophie Lavoie',
            location: 'Saint-Jérôme',
            textFr: 'Découverte d\'une fissure importante. Soumission en moins de 24h et garantie de 15 ans! Travail super propre et prix honnête. Une équipe en qui on peut avoir une confiance absolue.',
        }
    ];

    $: pageTitle = currentLang === 'fr' ? 'Urgence Excavation & Drain 24/7 | Inspection Gratuite | Mini Excavations Érable' : currentLang === 'es' ? 'Urgencia Excavación y Drenaje 24/7 | Inspección Gratis | Mini Excavations Érable' : 'Emergency Excavation & Drain 24/7 | Free Inspection | Mini Excavations Érable';
    $: pageDescription = currentLang === 'fr' ? 'Intervention d\'urgence 24/7 pour refoulement d\'égout, infiltration d\'eau, drain français et fissures. Déplacement rapide à Montréal, Laval et Rive-Nord. Appelez maintenant!' : currentLang === 'es' ? 'Intervención de emergencia 24/7 para respaldo de alcantarillado, infiltración de agua, drenaje francés y grietas. Desplazamiento rápido. ¡Llame ahora!' : '24/7 emergency intervention for sewer backup, water infiltration, french drain and cracks. Fast response in Montreal, Laval and North Shore. Call now!';

</script>

<SEO 
    lang={currentLang} 
    path="/urgences" 
    title={pageTitle}
    description={pageDescription}
    jsonLd={homeJsonLd} 
/>

<main class="flex flex-col min-h-screen bg-background font-sans" itemscope itemtype="https://schema.org/LocalBusiness">
    <!-- Hero Section (Brutal & Urgency Focused) -->
    <section class="relative bg-black text-white overflow-hidden pb-16 lg:pb-32 pt-24 min-h-[90vh] flex items-center" id="home">
        <!-- Animated Background Orbs -->
        <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
             <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse" style="animation-duration: 4s;"></div>
             <div class="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#febd17]/20 rounded-full blur-[100px] mix-blend-screen animate-pulse" style="animation-duration: 6s; animation-delay: 1s;"></div>
             <!-- Grid overlay -->
             <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>
        </div>

        <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            <div class="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
                <!-- Left Content -->
                <div class="lg:col-span-7 flex flex-col justify-center text-left py-12 lg:py-24 relative z-20">
                    <div class="inline-flex items-center rounded-full bg-red-500/10 backdrop-blur-md px-5 py-2 text-sm font-black text-red-500 mb-8 self-start border border-red-500/30 uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(239,68,68,0.3)]" style="animation: fadeInUp 0.8s ease-out;">
                        <span class="flex h-2.5 w-2.5 rounded-full bg-red-500 mr-3 animate-ping"></span>
                        <span class="relative flex h-2 w-2 rounded-full bg-red-500 mr-2 -ml-4"></span>
                         {currentLang === 'fr' ? 'Intervention Immédiate' : currentLang === 'es' ? 'Intervención Inmediata' : "Immediate Intervention"}
                    </div>

                    <h1 class="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[0.9]" style="animation: fadeInUp 0.8s ease-out 0.2s both;">
                        <span class="block text-white drop-shadow-md">PROBLÈME</span>
                        <span class="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 pb-2 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">URGENT?</span>
                    </h1>
                    <p class="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight border-l-4 border-[#febd17] pl-6" style="animation: fadeInUp 0.8s ease-out 0.4s both;">
                        {currentLang === 'fr' ? 'Ne laissez pas l\'eau détruire votre investissement.' : currentLang === 'es' ? 'No deje que el agua destruya su inversión.' : 'Don\'t let water destroy your investment.'}
                    </p>

                    <p class="text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed font-light" style="animation: fadeInUp 0.8s ease-out 0.6s both;">
                        {currentLang === 'fr' 
                            ? "Infiltration, refoulement, fissures. Nos experts certifiés interviennent 24/7. Sécurisez votre propriété maintenant."
                            : currentLang === 'es'
                                ? "Infiltración, respaldo, grietas. Nuestros expertos intervienen 24/7. Asegure su propiedad ahora."
                                : "Infiltration, backup, cracks. Our certified experts intervene 24/7. Secure your property now."}
                    </p>

                    <div class="flex flex-col sm:flex-row gap-5 mb-10" style="animation: fadeInUp 0.8s ease-out 0.8s both;">
                        <a href="tel:+15148309973" 
                            onclick="return window.gtag_report_conversion ? window.gtag_report_conversion('tel:+15148309973') : true"
                            class="group flex-1 inline-flex items-center justify-center gap-3 px-8 py-6 rounded-full bg-red-600 text-white font-black text-xl shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:shadow-[0_0_50px_rgba(239,68,68,0.6)] transition-all hover:scale-105 active:scale-95 relative overflow-hidden border border-red-400/50">
                            <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                            <svg class="w-7 h-7 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                            (514) 830-9973
                        </a>
                        <a href="#inspection" class="group flex-1 inline-flex items-center justify-center gap-3 px-8 py-6 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black font-bold text-xl transition-all hover:scale-105 active:scale-95">
                            📋 {currentLang === 'fr' ? 'Demander Inspection' : currentLang === 'es' ? 'Pedir Inspección' : 'Request Inspection'}
                        </a>
                    </div>
                    
                    <div class="flex flex-wrap gap-6 mt-6" style="animation: fadeInUp 0.8s ease-out 1s both;">
                        <a href="#garantie" class="text-sm font-bold text-gray-400 hover:text-[#febd17] transition-colors flex items-center gap-2">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#febd17]"></span> Garantie 15 Ans
                        </a>
                        <a href="#certifications" class="text-sm font-bold text-gray-400 hover:text-[#febd17] transition-colors flex items-center gap-2">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#febd17]"></span> Certifications
                        </a>
                        <a href="#avis" class="text-sm font-bold text-gray-400 hover:text-[#febd17] transition-colors flex items-center gap-2">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#febd17]"></span> Avis Clients
                        </a>
                    </div>
                </div>

                <!-- Right Image -->
                <div class="relative lg:col-span-5 h-[400px] lg:h-[600px] mt-10 lg:mt-0" style="animation: fadeInUp 1s ease-out 0.4s both;">
                    <!-- Decorative border/glow behind image -->
                    <div class="absolute -inset-4 bg-gradient-to-tr from-red-600 to-[#febd17] rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                    
                    <div class="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                        <img class="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-1000" src={frenchdrain2} alt="Urgence Drain Français" loading="eager" fetchpriority="high">
                        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                        <div class="absolute inset-0 bg-red-900/20 mix-blend-multiply"></div>
                        
                        <!-- Floating Badge -->
                        <div class="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-xl border border-white/20 p-5 rounded-2xl flex items-center justify-between transform translate-y-2 group-hover:translate-y-0 transition-transform">
                            <div>
                                <p class="text-white font-black text-lg">Disponible 24/7</p>
                                <p class="text-gray-400 text-sm">Équipe en alerte</p>
                            </div>
                            <div class="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center border border-red-500/50 relative">
                                <span class="absolute w-full h-full rounded-full bg-red-500/20 animate-ping"></span>
                                🚨
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Global Style: Clip Path + Animations -->
    <style>
        html { scroll-behavior: smooth; }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
            100% { transform: translateX(100%); }
        }
    </style>

    <!-- Section: Inspection Gratuite (#inspection) -->
    <section id="inspection" class="py-24 bg-muted/30 dark:bg-zinc-950 transition-colors duration-300 relative overflow-hidden">
        <div class="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-50 -z-0"></div>
        <div class="container relative z-10 max-w-6xl">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div class="space-y-8">
                    <div class="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-sm font-bold text-blue-600 dark:text-blue-400">
                        Sitelink: Inspection Gratuite
                    </div>
                    <h2 class="text-4xl md:text-5xl font-black tracking-tight text-black dark:text-white">
                        Inspection Gratuite
                    </h2>
                    <div class="space-y-6">
                        <div class="flex gap-4">
                            <div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                                <span class="text-2xl text-blue-600 dark:text-blue-400">🚗</span>
                            </div>
                            <div>
                                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Déplacement sans frais.</h3>
                                <p class="text-gray-600 dark:text-gray-400 text-lg">Notre équipe d'experts se déplace directement chez vous pour évaluer la situation, et ce, tout à fait gratuitement. Ne laissez pas l'incertitude vous coûter cher.</p>
                            </div>
                        </div>
                        <div class="flex gap-4">
                            <div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                                <span class="text-2xl text-blue-600 dark:text-blue-400">⏱️</span>
                            </div>
                            <div>
                                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Soumission rapide en 24h-48h.</h3>
                                <p class="text-gray-600 dark:text-gray-400 text-lg">En situation d'urgence, le temps compte. Vous recevrez une soumission claire, détaillée et sans surprise dans les 24 à 48 heures suivant notre visite.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rounded-3xl shadow-2xl lg:p-4">
                    <UrgencyStepForm hideTitle={true} />
                </div>
            </div>
        </div>
    </section>

    <!-- Section: Garantie 15 Ans (#garantie) -->
    <section id="garantie" class="py-24 bg-gradient-to-br from-[#febd17]/20 to-transparent dark:from-[#febd17]/5 dark:to-black relative overflow-hidden">
        <div class="container max-w-5xl text-center relative z-10">
            <div class="inline-flex items-center justify-center mb-6">
                <span class="bg-[#febd17] text-black px-4 py-1.5 rounded-full text-sm font-black tracking-widest uppercase shadow-lg shadow-yellow-500/30">
                    Sitelink: Garantie 15 Ans
                </span>
            </div>
            
            <h2 class="text-5xl md:text-6xl font-black tracking-tight text-black dark:text-white mb-10">
                Garantie 15 Ans
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-12">
                <div class="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/50 dark:border-zinc-800 rounded-3xl p-10 hover:-translate-y-2 transition-transform duration-300 shadow-xl">
                    <div class="text-6xl mb-6">🤝</div>
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Totalement transférable.</h3>
                    <p class="text-gray-600 dark:text-gray-400 text-lg">Vous prévoyez vendre? Notre garantie écrite de 15 ans sur les travaux de drain français et d'imperméabilisation est 100% transférable aux futurs acheteurs. Un argument de vente majeur pour votre propriété.</p>
                </div>
                <div class="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/50 dark:border-zinc-800 rounded-3xl p-10 hover:-translate-y-2 transition-transform duration-300 shadow-xl">
                    <div class="text-6xl mb-6">🛡️</div>
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Protégez votre investissement.</h3>
                    <p class="text-gray-600 dark:text-gray-400 text-lg">Votre maison est votre plus grand atout. Avec nos matériaux de première qualité et notre expertise certifiée, nous nous assurons que vos fondations restent solides et au sec pour des décennies.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Inline CTA -->
    <InlineCTA variant="banner" />

    <!-- Section: Nos Certifications (#certifications) -->
    <section id="certifications" class="py-24 bg-white dark:bg-black transition-colors duration-300 relative">
        <div class="container max-w-5xl">
            <div class="text-center mb-16">
                <span class="text-gray-500 font-bold tracking-wider uppercase text-sm mb-2 block">Sitelink: Nos Certifications</span>
                <h2 class="text-4xl md:text-5xl font-black tracking-tight text-black dark:text-white mb-6">
                    Nos Certifications
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto mt-12">
                    <div class="flex gap-4 p-6 rounded-2xl bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800">
                        <div class="text-4xl">📜</div>
                        <div>
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Licences APCHQ, RBQ et CMTQ.</h3>
                            <p class="text-gray-600 dark:text-gray-400 mb-3">Faites affaire avec un véritable professionnel. Nous détenons toutes les licences requises pour exécuter les travaux selon les normes de l'industrie du Québec.</p>
                            <a href="https://www.rbq.gouv.qc.ca/recherche-licence-titulaire?numLicence=5823-7736-01" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#febd17]/10 border border-[#febd17]/30 text-[#febd17] font-bold text-sm hover:bg-[#febd17]/20 transition-colors">
                                ✓ R.B.Q. <span class="font-mono">5823-7736-01</span>
                            </a>
                        </div>
                    </div>
                    <div class="flex gap-4 p-6 rounded-2xl bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800">
                        <div class="text-4xl">🚜</div>
                        <div>
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Machinerie récente et sécuritaire.</h3>
                            <p class="text-gray-600 dark:text-gray-400">L'efficacité de notre travail passe par notre équipement. Nous possédons notre propre machinerie récente, adaptée à tous les types de terrains résidentiels et commerciaux.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Certification Badges -->
            <div class="flex flex-wrap justify-center items-center gap-10 md:gap-16 mt-16 pt-16 border-t border-gray-200 dark:border-zinc-800">
                {#each certifications as cert}
                    <div class="bg-white dark:bg-white/10 dark:p-4 rounded-xl transition-colors duration-300"> 
                        <img src={cert} alt="Certification" class="h-16 md:h-24 object-contain hover:scale-110 transition-transform duration-300 drop-shadow-lg filter grayscale hover:grayscale-0 dark:grayscale-0" />
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- Section: Avis de nos Clients (#avis) -->
    <section id="avis" class="py-24 bg-black text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(254,189,23,0.15),transparent_70%)]"></div>
        <div class="container relative z-10">
            <div class="text-center mb-16 max-w-3xl mx-auto">
                <span class="text-[#febd17] font-bold tracking-wider uppercase text-sm mb-2 block">Sitelink: Avis de nos Clients</span>
                <h2 class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8">
                    Avis de nos Clients
                </h2>
                
                <div class="flex flex-col md:flex-row justify-center gap-8 mb-12">
                    <div class="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 flex items-center gap-4 text-left">
                        <div class="text-4xl">⭐</div>
                        <div>
                            <h3 class="text-xl font-bold mb-1">Plus de 20 avis positifs.</h3>
                            <p class="text-gray-400 text-sm">Nos clients nous évaluent avec 5 étoiles sur Google.</p>
                        </div>
                    </div>
                    <div class="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 flex items-center gap-4 text-left">
                        <div class="text-4xl">📸</div>
                        <div>
                            <h3 class="text-xl font-bold mb-1">Voyez nos travaux récents.</h3>
                            <p class="text-gray-400 text-sm">Une transparence totale sur nos chantiers et réalisations.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                {#each testimonials as t, i}
                    <article class="bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-3xl p-8 hover:border-[#febd17]/50 transition-all hover:-translate-y-1" style="animation: fadeInUp 0.6s ease-out {i * 0.15}s both;">
                        <div class="flex gap-1 mb-4">
                            {#each Array(5) as _}<span class="text-[#febd17]">★</span>{/each}
                        </div>
                        <p class="text-gray-300 leading-relaxed mb-6 italic">
                            "{t.textFr}"
                        </p>
                        <div class="flex items-center gap-3 pt-4 border-t border-zinc-800">
                            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#febd17] to-yellow-600 flex items-center justify-center text-black font-black">
                                {t.nameFr[0]}
                            </div>
                            <div>
                                <p class="font-bold text-sm">{t.nameFr}</p>
                                <p class="text-xs text-zinc-500">{t.location}</p>
                            </div>
                        </div>
                    </article>
                {/each}
            </div>
            
            <div class="mt-16 text-center">
                <Button size="lg" class="bg-[#febd17] hover:bg-yellow-500 text-black font-bold rounded-full px-8 py-6 text-lg">
                    Voir plus d'avis sur Google
                </Button>
            </div>
        </div>
    </section>

    <Footer />
</main>
