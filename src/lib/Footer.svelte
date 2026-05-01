<script lang="ts">
	import { language } from './store/store';
	import { Phone, Mail, MapPin, Clock, Facebook, Instagram, ArrowRight } from 'lucide-svelte';

	$: lang = ($language as 'fr' | 'en' | 'es') || 'fr';

	const t = {
		fr: {
			tagline: "Services professionnels d'excavation, drain français, démolition et inspection caméra au Québec. Plus de 15 ans d'expertise, certifié RBQ.",
			servicesTitle: 'Nos Services',
			areasTitle: 'Zones desservies',
			contactTitle: 'Contact rapide',
			ctaTitle: 'Prêt à démarrer votre projet ?',
			ctaSubtitle: 'Soumission gratuite en moins de 24 heures',
			ctaButton: 'Demander une soumission',
			rights: 'Tous droits réservés.',
			designed: 'Conçu par',
			hoursLabel: 'Heures',
			hours: 'Lun-Ven 7h-18h, Sam 8h-15h',
			company: 'Entreprise',
			about: 'À propos',
			blog: 'Blog',
			services: [
				{ url: '/services/drain-francais', label: 'Drain Français' },
				{ url: '/services/excavation', label: 'Excavation' },
				{ url: '/services/reparation-fissures', label: 'Réparation de Fissures' },
				{ url: '/services/demolition', label: 'Démolition' },
				{ url: '/services/inspection-camera', label: 'Inspection Caméra' }
			],
			areas: ['Montréal', 'Laval', 'Laurentides', 'Lanaudière', 'Montérégie', 'Rive-Nord', 'Rive-Sud']
		},
		en: {
			tagline: 'Professional excavation, French drain, demolition and camera inspection services in Quebec. 15+ years of expertise, RBQ certified.',
			servicesTitle: 'Our Services',
			areasTitle: 'Service areas',
			contactTitle: 'Quick contact',
			ctaTitle: 'Ready to start your project?',
			ctaSubtitle: 'Free quote in less than 24 hours',
			ctaButton: 'Request a quote',
			rights: 'All rights reserved.',
			designed: 'Designed by',
			hoursLabel: 'Hours',
			hours: 'Mon-Fri 7am-6pm, Sat 8am-3pm',
			company: 'Company',
			about: 'About',
			blog: 'Blog',
			services: [
				{ url: '/services/drain-francais', label: 'French Drain' },
				{ url: '/services/excavation', label: 'Excavation' },
				{ url: '/services/reparation-fissures', label: 'Crack Repair' },
				{ url: '/services/demolition', label: 'Demolition' },
				{ url: '/services/inspection-camera', label: 'Camera Inspection' }
			],
			areas: ['Montreal', 'Laval', 'Laurentians', 'Lanaudière', 'Montérégie', 'North Shore', 'South Shore']
		},
		es: {
			tagline: 'Servicios profesionales de excavación, drenaje francés, demolición e inspección con cámara en Quebec. +15 años de experiencia, certificado RBQ.',
			servicesTitle: 'Nuestros Servicios',
			areasTitle: 'Zonas atendidas',
			contactTitle: 'Contacto rápido',
			ctaTitle: '¿Listo para iniciar su proyecto?',
			ctaSubtitle: 'Cotización gratuita en menos de 24 horas',
			ctaButton: 'Solicitar cotización',
			rights: 'Todos los derechos reservados.',
			designed: 'Diseñado por',
			hoursLabel: 'Horarios',
			hours: 'Lun-Vie 7h-18h, Sáb 8h-15h',
			company: 'Empresa',
			about: 'Acerca de',
			blog: 'Blog',
			services: [
				{ url: '/services/drain-francais', label: 'Drenaje Francés' },
				{ url: '/services/excavation', label: 'Excavación' },
				{ url: '/services/reparation-fissures', label: 'Reparación de Grietas' },
				{ url: '/services/demolition', label: 'Demolición' },
				{ url: '/services/inspection-camera', label: 'Inspección con Cámara' }
			],
			areas: ['Montreal', 'Laval', 'Laurentides', 'Lanaudière', 'Montérégie', 'Rive-Nord', 'Rive-Sud']
		}
	};

	$: c = t[lang];
</script>

<footer
	class="bg-zinc-950 text-white border-t border-zinc-800 transition-colors duration-300"
	itemscope
	itemtype="https://schema.org/LocalBusiness"
>
	<!-- CTA Banner -->
	<div class="border-b border-zinc-800 bg-gradient-to-r from-[#febd17] via-yellow-400 to-[#febd17] text-black">
		<div class="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
			<div class="text-center md:text-left">
				<h3 class="text-2xl md:text-3xl font-black">{c.ctaTitle}</h3>
				<p class="text-sm md:text-base font-medium opacity-80">{c.ctaSubtitle}</p>
			</div>
			<a
				href="#contact"
				class="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black text-[#febd17] font-black text-base hover:bg-zinc-800 transition-all hover:scale-105 shadow-2xl whitespace-nowrap"
			>
				{c.ctaButton}
				<ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
			</a>
		</div>
	</div>

	<!-- Main Footer -->
	<div class="container mx-auto px-6 py-16">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
			<!-- Brand Column -->
			<div class="lg:col-span-2 space-y-5">
				<a href="/" class="inline-block">
					<span class="text-2xl font-black uppercase tracking-tighter">
						Mini Excavations <span class="text-[#febd17]">Érable</span>
					</span>
				</a>
				<p class="text-zinc-400 text-sm leading-relaxed max-w-md" itemprop="description">
					{c.tagline}
				</p>
				<!-- Trust badges -->
				<div class="flex flex-wrap gap-2">
					<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
						<span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> RBQ
					</span>
					<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
						⭐ 4.9/5 (127)
					</span>
					<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
						15+ ans
					</span>
				</div>
				<!-- Socials -->
				<div class="flex gap-3">
					<a
						href="https://www.instagram.com/mini_excavation_erable"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Instagram"
						class="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-[#E1306C] hover:border-[#E1306C] transition-all hover:scale-110"
					>
						<Instagram class="w-4 h-4" />
					</a>
					<a
						href="https://www.facebook.com/share/XDdWREBZZxgCwBnT/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Facebook"
						class="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] transition-all hover:scale-110"
					>
						<Facebook class="w-4 h-4" />
					</a>
					<a
						href="mailto:miniexcavationerable@gmail.com"
						aria-label="Email"
						class="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-[#febd17] hover:border-[#febd17] hover:text-black transition-all hover:scale-110"
					>
						<Mail class="w-4 h-4" />
					</a>
				</div>
			</div>

			<!-- Services Links -->
			<div>
				<h4 class="font-black uppercase tracking-wider text-[#febd17] text-xs mb-4">
					{c.servicesTitle}
				</h4>
				<nav>
					<ul class="space-y-2 text-sm">
						{#each c.services as svc}
							<li>
								<a
									href={svc.url}
									class="text-zinc-400 hover:text-white hover:translate-x-1 inline-block transition-all"
								>
									{svc.label}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</div>

			<!-- Areas served (SEO local) -->
			<div>
				<h4 class="font-black uppercase tracking-wider text-[#febd17] text-xs mb-4">
					{c.areasTitle}
				</h4>
				<ul class="space-y-2 text-sm">
					{#each c.areas as area}
						<li class="text-zinc-400 flex items-center gap-1.5">
							<MapPin class="w-3 h-3 text-[#febd17]" />
							<span itemprop="areaServed">{area}</span>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Contact / NAP -->
			<div>
				<h4 class="font-black uppercase tracking-wider text-[#febd17] text-xs mb-4">
					{c.contactTitle}
				</h4>
				<div class="space-y-3 text-sm">
					<a
						href="tel:+15148309973"
						class="flex items-center gap-2 text-white font-bold hover:text-[#febd17] transition-colors group"
						itemprop="telephone"
					>
						<span class="w-8 h-8 rounded-full bg-[#febd17]/10 border border-[#febd17]/30 flex items-center justify-center group-hover:bg-[#febd17] group-hover:text-black transition-colors">
							<Phone class="w-3.5 h-3.5" />
						</span>
						+1 (514) 830-9973
					</a>
					<a
						href="mailto:miniexcavationerable@gmail.com"
						class="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
						itemprop="email"
					>
						<span class="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
							<Mail class="w-3.5 h-3.5" />
						</span>
						<span class="break-all">miniexcavationerable@gmail.com</span>
					</a>
					<div
						class="flex items-start gap-2 text-zinc-400"
						itemprop="address"
						itemscope
						itemtype="https://schema.org/PostalAddress"
					>
						<span class="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0">
							<MapPin class="w-3.5 h-3.5" />
						</span>
						<span>
							<span itemprop="addressLocality">Montréal</span>,
							<span itemprop="addressRegion">QC</span>,
							<span itemprop="addressCountry">CA</span>
						</span>
					</div>
					<div class="flex items-start gap-2 text-zinc-400">
						<span class="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0">
							<Clock class="w-3.5 h-3.5" />
						</span>
						<span>
							<span class="block text-zinc-500 text-xs">{c.hoursLabel}</span>
							{c.hours}
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Bottom Bar -->
	<div class="border-t border-zinc-800">
		<div class="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-zinc-500">
			<p>
				&copy; {new Date().getFullYear()}
				<span itemprop="name" class="text-zinc-300">Mini Excavations Érable</span>.
				{c.rights}
			</p>
			<div class="flex items-center gap-4">
				<a href="/sitemap.xml" class="hover:text-[#febd17] transition-colors">Sitemap</a>
				<span class="opacity-30">•</span>
				<p class="flex items-center">
					{c.designed}
					<a
						href="https://connek.ca"
						target="_blank"
						rel="noopener"
						class="font-bold text-[#febd17] ml-1 hover:underline"
					>
						Connek
					</a>
				</p>
			</div>
		</div>
	</div>
</footer>
