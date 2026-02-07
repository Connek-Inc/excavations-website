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

    $: isEn = $language === 'en';
    
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

<div class="flex flex-col min-h-screen bg-background font-sans">
    <!-- Hero Section -->
    <!-- Hero Section -->
    <section class="relative bg-white dark:bg-black text-black dark:text-white overflow-hidden pb-16 lg:pb-24 pt-20" id="home">
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
                         {isEn ? 'Professional Excavation Services' : 'Services d\'Excavation Professionnels'}
                    </div>

                    <h1 class="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
                        <span class="block text-black dark:text-white">Mini Excavations</span>
                        <span class="block text-[#febd17]"> Érable</span>
                    </h1>

                    <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl leading-relaxed font-light">
                        {texts.heroSubtitle}
                        {isEn 
                            ? " We provide top-tier excavation solutions for residential and commercial projects." 
                            : " Nous fournissons des solutions d'excavation de premier ordre pour les projets résidentiels et commerciaux."}
                    </p>

                    <div class="flex flex-col sm:flex-row gap-4">
                         <a href="#contact" class="flex-shrink-0">
                             <Button size="lg" class="w-full rounded-full px-8 py-6 text-lg font-bold bg-[#febd17] text-black hover:bg-[#e5aa15] shadow-lg shadow-yellow-500/20 transition-all hover:scale-105">
                               {texts.cta}
                            </Button>
                        </a>
                        <a href="#services" class="flex-shrink-0">
                            <Button variant="outline" size="lg" class="w-full rounded-full px-8 py-6 text-lg font-bold border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-all hover:scale-105 hover:border-black dark:hover:border-white">
                               {texts.servicesCta}
                            </Button>
                        </a>
                    </div>
                </div>

                <!-- Right Image (Angled) -->
                <div class="relative lg:col-span-6 lg:-mr-8 xl:absolute xl:inset-y-0 xl:right-0 xl:w-1/2">
                    <div class="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full clip-path-slant">
                        <!-- svelte-ignore a11y-img-redundant-alt -->
                        <img class="h-full w-full object-cover" src={banner} alt="Excavation Hero Image">
                        <!-- Gradient Overlay for Image to blend slightly if needed -->
                         <div class="absolute inset-0 bg-gradient-to-l from-transparent to-white/30 dark:to-black/30 lg:to-white/60 dark:lg:to-black/60 opacity-50"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Global Style for Clip Path (scoped to this file or global) -->
    <style>
        @media (min-width: 1024px) {
            .clip-path-slant {
                clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%);
            }
        }
    </style>

    <!-- Guarantee Banner -->
    <div class="bg-black dark:bg-black text-white py-12 relative overflow-hidden border-y border-white/10">
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
    <section class="py-24 bg-white dark:bg-background transition-colors duration-300" id="services">
        <div class="container px-4 md:px-6">
            <div class="mb-16 max-w-3xl">
                <span class="text-[#febd17] font-bold tracking-wider uppercase text-sm mb-2 block">{texts.servicesCta}</span>
                <h2 class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-black dark:text-white mb-6">
                    {texts.servicesTitle}
                </h2>
                <p class="text-gray-600 dark:text-gray-400 text-xl font-light">
                    {texts.servicesSubtitle}
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 auto-rows-[minmax(300px,_auto)]">
                {#each services as service, i}
                    <div class="group relative overflow-hidden rounded-3xl bg-gray-100 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 transition-all hover:shadow-lg dark:hover:bg-zinc-900 {i === 0 ? 'lg:col-span-4 md:col-span-2' : (i === 1 ? 'lg:col-span-2 md:col-span-1' : 'lg:col-span-2 md:col-span-1')}">
                        
                        <div class="absolute inset-0 z-0">
                            <!-- svelte-ignore a11y-img-redundant-alt -->
                            <img src={service.image} alt={service.title} class="h-full w-full object-cover opacity-30 dark:opacity-40 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-40 dark:group-hover:opacity-50" />
                            <div class="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80 dark:to-transparent"></div>
                        </div>

                        <div class="relative z-10 flex flex-col justify-end h-full p-8">
                            <div class="mb-4">
                                <span class="inline-block h-1 w-12 bg-[#febd17] rounded-full mb-4"></span>
                                <h3 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                            </div>
                            <p class="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-sm md:text-base">
                                {service.description}
                            </p>
                            
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- About Us Section -->
    <section class="py-24 bg-muted/50 dark:bg-black relative overflow-hidden transition-colors duration-300">
        <div class="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div class="space-y-8 order-2 lg:order-1">
                 <h2 class="text-3xl md:text-5xl font-black tracking-tight text-black dark:text-white">{texts.aboutTitle}</h2>
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
                     <img src={fissure2} alt="About 1" class="rounded-2xl shadow-2xl w-full h-[300px] object-cover transform translate-y-8 hover:scale-105 transition-transform duration-500" />
                     <img src={demolition2} alt="About 2" class="rounded-2xl shadow-2xl w-full h-[300px] object-cover transform -translate-y-8 hover:scale-105 transition-transform duration-500" />
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

    <!-- Blog & Map -->
    <div class="bg-background dark:bg-black pb-10 space-y-10 transition-colors duration-300">
        <Blogs />
        <Map />
    </div>

    <Footer />

</div>
