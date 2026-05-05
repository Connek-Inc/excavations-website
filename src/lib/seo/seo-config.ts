export const SITE = {
	url: 'https://excavationserable.com',
	altUrl: 'https://miniexcavationserable.com',
	name: 'Mini Excavations Érable',
	legalName: 'Mini Excavations Érable Inc.',
	logo: 'https://excavationserable.com/logo.png',
	phone: '+1-514-830-9973',
	emergencyPhone: '+1-514-830-9973',
	email: 'miniexcavationerables@gmail.com',
	address: {
		streetAddress: '',
		addressLocality: 'Montréal',
		addressRegion: 'QC',
		postalCode: '',
		addressCountry: 'CA'
	},
	geo: {
		latitude: 45.5019,
		longitude: -73.5674
	},
	geoRadius: 200000, // 200km radius
	areaServed: [
		// Grandes regiones administrativas de Quebec
		'Québec',
		'Montréal',
		'Laval',
		'Laurentides',
		'Lanaudière',
		'Montérégie',
		'Estrie',
		'Outaouais',
		'Mauricie',
		'Centre-du-Québec',
		'Rive-Nord',
		'Rive-Sud',
		// Ciudades clave del Grand Montréal
		'Longueuil',
		'Brossard',
		'Saint-Jérôme',
		'Terrebonne',
		'Repentigny',
		'Mascouche',
		'Blainville',
		'Boisbriand',
		'Sainte-Thérèse',
		'Saint-Eustache',
		'Mirabel',
		'Vaudreuil-Dorion',
		'Châteauguay',
		'Saint-Hyacinthe',
		'Saint-Jean-sur-Richelieu',
		'Granby',
		'Drummondville',
		'Trois-Rivières',
		'Sherbrooke',
		'Gatineau',
		// Provincia + país (para SEO Canadá)
		'Quebec',
		'Canada'
	],
	priceRange: '$$',
	foundingDate: '2010',
	founder: 'Mini Excavations Érable Team',
	rbqLicense: '5823-7736-01',
	taxID: 'RBQ 5823-7736-01',
	sameAs: [
		'https://www.facebook.com/miniexcavationserable',
		'https://www.instagram.com/mini_excavation_erable',
		'https://www.facebook.com/share/XDdWREBZZxgCwBnT/',
		// TODO: agregar cuando estén creados:
		// 'https://maps.google.com/?cid=YOUR_GOOGLE_PLACE_ID',
		// 'https://www.linkedin.com/company/mini-excavations-erable',
		// 'https://www.youtube.com/@miniexcavationserable',
	],
	openingHours: [
		{ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '18:00' },
		{ days: ['Saturday'], opens: '08:00', closes: '15:00' }
	],
	paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'Cheque'],
	currenciesAccepted: 'CAD'
} as const;

type Lang = 'fr' | 'en' | 'es';

export const seoData: Record<
	Lang,
	{
		title: string;
		description: string;
		keywords: string;
		ogLocale: string;
	}
> = {
	fr: {
		title: "Mini Excavation Québec | Drain Français & Fissure | Érable RBQ",
		description:
			"⭐ Mini Excavation #1 au Québec depuis 15 ans. Drain français, excavation, réparation fissure fondation, démolition. Certifié RBQ APCHQ. Soumission gratuite 24h ☎ 514-830-9973",
		keywords:
			"mini excavation, mini excavation Québec, mini excavation Montréal, mini excavations, mini-excavation, mini-pelle, drain français, drain français Québec, drain français Montréal, excavation Québec, excavation Montréal, fissure fondation, réparation fissure, Mini Excavations Érable, RBQ Québec",
		ogLocale: "fr_CA"
	},
	en: {
		title: "Mini Excavation Quebec | French Drain & Crack Repair | Érable RBQ",
		description:
			"⭐ Mini Excavation #1 in Quebec for 15 years. French drain, excavation, foundation crack repair, demolition. RBQ APCHQ certified. Free quote 24h ☎ 514-830-9973",
		keywords:
			"mini excavation, mini excavation Quebec, mini excavation Montreal, mini excavations, mini-excavation, mini-excavator, french drain, french drain Quebec, french drain Montreal, excavation Quebec, excavation Montreal, foundation crack, crack repair, Mini Excavations Erable, RBQ Quebec",
		ogLocale: "en_CA"
	},
	es: {
		title: "Mini Excavación Quebec | Drenaje Francés y Grietas | Érable RBQ",
		description:
			"⭐ Mini Excavación #1 en Quebec desde hace 15 años. Drenaje francés, excavación, reparación grietas cimientos, demolición. Certificado RBQ APCHQ. Cotización gratuita 24h ☎ 514-830-9973",
		keywords:
			"mini excavación, mini excavación Quebec, mini excavación Montreal, mini excavaciones, mini-excavación, mini-excavadora, drenaje francés, drenaje francés Quebec, drenaje francés Montreal, excavación Quebec, excavación Montreal, grieta cimientos, reparación grieta, Mini Excavations Erable, RBQ Quebec",
		ogLocale: "es_ES"
	}
};

export function localBusinessJsonLd(lang: Lang) {
	const data = seoData[lang];
	return {
		'@context': 'https://schema.org',
		'@type': ['LocalBusiness', 'GeneralContractor', 'EmergencyService', 'HomeAndConstructionBusiness'],
		'@id': `${SITE.url}/#organization`,
		name: SITE.name,
		legalName: SITE.legalName,
		alternateName: ['Excavations Érable', 'Mini Excavation Érable', 'Excavation Érable Québec'],
		image: SITE.logo,
		logo: SITE.logo,
		url: SITE.url,
		telephone: SITE.phone,
		email: SITE.email,
		priceRange: SITE.priceRange,
		description: data.description,
		foundingDate: SITE.foundingDate,
		taxID: SITE.taxID,
		identifier: {
			'@type': 'PropertyValue',
			propertyID: 'RBQ',
			name: 'Régie du bâtiment du Québec License',
			value: SITE.rbqLicense
		},
		isicV4: '4312', // Site preparation / excavation
		slogan: lang === 'fr'
			? "L'excellence en excavation depuis 2010"
			: lang === 'es'
				? 'Excelencia en excavación desde 2010'
				: 'Excellence in excavation since 2010',
		address: {
			'@type': 'PostalAddress',
			addressLocality: SITE.address.addressLocality,
			addressRegion: SITE.address.addressRegion,
			addressCountry: SITE.address.addressCountry
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: SITE.geo.latitude,
			longitude: SITE.geo.longitude
		},
		serviceArea: {
			'@type': 'GeoCircle',
			geoMidpoint: {
				'@type': 'GeoCoordinates',
				latitude: SITE.geo.latitude,
				longitude: SITE.geo.longitude
			},
			geoRadius: SITE.geoRadius
		},
		contactPoint: [
			{
				'@type': 'ContactPoint',
				telephone: SITE.phone,
				contactType: 'customer service',
				areaServed: ['CA-QC', 'CA'],
				availableLanguage: ['French', 'English', 'Spanish'],
				contactOption: 'TollFree'
			},
			{
				'@type': 'ContactPoint',
				telephone: SITE.emergencyPhone,
				contactType: 'emergency',
				areaServed: 'CA-QC',
				availableLanguage: ['French', 'English'],
				hoursAvailable: {
					'@type': 'OpeningHoursSpecification',
					dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
					opens: '00:00',
					closes: '23:59'
				}
			}
		],
		areaServed: SITE.areaServed.map((a) => ({ '@type': 'City', name: a })),
		sameAs: SITE.sameAs,
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
				opens: '07:00',
				closes: '18:00'
			},
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: 'Saturday',
				opens: '08:00',
				closes: '15:00'
			}
		],
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: 'Services d\'excavation',
			itemListElement: [
				{
					'@type': 'Offer',
					itemOffered: { '@type': 'Service', name: 'Installation Drain Français' }
				},
				{
					'@type': 'Offer',
					itemOffered: { '@type': 'Service', name: 'Excavation Résidentielle' }
				},
				{
					'@type': 'Offer',
					itemOffered: { '@type': 'Service', name: 'Réparation Fissures Fondation' }
				},
				{ '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Démolition' } },
				{
					'@type': 'Offer',
					itemOffered: { '@type': 'Service', name: 'Inspection par Caméra' }
				},
				{
					'@type': 'Offer',
					itemOffered: { '@type': 'Service', name: 'Imperméabilisation de Sous-sol' }
				},
				{
					'@type': 'Offer',
					itemOffered: { '@type': 'Service', name: 'Urgence Refoulement d\'Égout' }
				}
			]
		},
		knowsAbout: [
			'Excavation',
			'French Drain Installation',
			'Drain Français',
			'Drenaje Francés',
			'Foundation Repair',
			'Réparation de Fondation',
			'Crack Injection',
			'Injection de Fissures',
			'Demolition',
			'Sewer Inspection',
			'Waterproofing'
		],
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.9',
			reviewCount: '127',
			bestRating: '5',
			worstRating: '1'
		},
		paymentAccepted: SITE.paymentAccepted,
		currenciesAccepted: SITE.currenciesAccepted,
		makesOffer: [
			{
				'@type': 'Offer',
				name: lang === 'fr' ? 'Soumission gratuite 24h' : lang === 'es' ? 'Cotización gratuita 24h' : '24h free quote',
				price: '0',
				priceCurrency: 'CAD',
				availability: 'https://schema.org/InStock'
			}
		],
		potentialAction: [
			{
				'@type': 'ReserveAction',
				target: `${SITE.url}/#contact`,
				name: lang === 'fr' ? 'Demander une soumission' : lang === 'es' ? 'Solicitar cotización' : 'Request a quote'
			}
		]
	};
}

export function websiteJsonLd(lang: Lang) {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': `${SITE.url}/#website`,
		url: SITE.url,
		name: SITE.name,
		description: seoData[lang].description,
		inLanguage: lang === 'fr' ? 'fr-CA' : lang === 'es' ? 'es-ES' : 'en-CA',
		publisher: { '@id': `${SITE.url}/#organization` },
		potentialAction: {
			'@type': 'SearchAction',
			target: `${SITE.url}/?q={search_term_string}`,
			'query-input': 'required name=search_term_string'
		}
	};
}

// WebPage schema — every internal page should declare itself
export function webPageJsonLd(opts: {
	url: string;
	name: string;
	description: string;
	lang: Lang;
	datePublished?: string;
	dateModified?: string;
	primaryImageOfPage?: string;
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		'@id': `${opts.url}#webpage`,
		url: opts.url,
		name: opts.name,
		description: opts.description,
		isPartOf: { '@id': `${SITE.url}/#website` },
		about: { '@id': `${SITE.url}/#organization` },
		inLanguage: opts.lang === 'fr' ? 'fr-CA' : opts.lang === 'es' ? 'es-ES' : 'en-CA',
		datePublished: opts.datePublished || '2024-01-01',
		dateModified: opts.dateModified || new Date().toISOString().split('T')[0],
		...(opts.primaryImageOfPage && {
			primaryImageOfPage: {
				'@type': 'ImageObject',
				url: opts.primaryImageOfPage,
				width: 1200,
				height: 630
			}
		}),
		potentialAction: [
			{
				'@type': 'ReadAction',
				target: [opts.url]
			}
		]
	};
}

// Speakable schema — for voice assistants (Google Assistant, Alexa, Siri)
export function speakableJsonLd(opts: { url: string }) {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		'@id': `${opts.url}#speakable`,
		url: opts.url,
		speakable: {
			'@type': 'SpeakableSpecification',
			cssSelector: ['h1', 'h2', '[itemprop="description"]', '.speakable']
		}
	};
}

// Person schema — for E-E-A-T (Experience, Expertise, Authority, Trust)
export function personJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Person',
		'@id': `${SITE.url}/#founder`,
		name: SITE.founder,
		jobTitle: 'Founder & Lead Excavation Expert',
		worksFor: { '@id': `${SITE.url}/#organization` },
		url: SITE.url,
		image: SITE.logo,
		knowsAbout: [
			'Excavation',
			'French Drain Installation',
			'Foundation Repair',
			'Crack Injection',
			'Demolition',
			'Camera Inspection',
			'Waterproofing',
			'Construction Quebec',
			'RBQ Regulations'
		],
		hasCredential: [
			{
				'@type': 'EducationalOccupationalCredential',
				name: 'RBQ License — Régie du bâtiment du Québec',
				credentialCategory: 'license'
			}
		]
	};
}

// VideoObject schema — Google ranks pages with videos higher
export function videoObjectJsonLd(opts: {
	name: string;
	description: string;
	thumbnailUrl: string;
	contentUrl: string;
	uploadDate?: string;
	duration?: string;
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'VideoObject',
		name: opts.name,
		description: opts.description,
		thumbnailUrl: opts.thumbnailUrl,
		contentUrl: opts.contentUrl,
		uploadDate: opts.uploadDate || '2026-05-01',
		duration: opts.duration || 'PT22S',
		publisher: { '@id': `${SITE.url}/#organization` },
		regionsAllowed: 'CA'
	};
}

// Organization schema — separate from LocalBusiness, helps Knowledge Panel
export function organizationJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		'@id': `${SITE.url}/#organization`,
		name: SITE.name,
		legalName: SITE.legalName,
		alternateName: ['Excavations Érable', 'Mini Excavation Érable'],
		url: SITE.url,
		logo: {
			'@type': 'ImageObject',
			url: SITE.logo,
			width: 200,
			height: 200
		},
		image: SITE.logo,
		description: 'Quebec\'s leading excavation, French drain and foundation contractor since 2010.',
		foundingDate: SITE.foundingDate,
		founders: [
			{
				'@type': 'Person',
				name: 'Mini Excavations Érable Team'
			}
		],
		address: {
			'@type': 'PostalAddress',
			addressLocality: SITE.address.addressLocality,
			addressRegion: SITE.address.addressRegion,
			addressCountry: SITE.address.addressCountry
		},
		contactPoint: {
			'@type': 'ContactPoint',
			telephone: SITE.phone,
			contactType: 'customer service',
			email: SITE.email,
			areaServed: ['CA-QC', 'CA'],
			availableLanguage: ['French', 'English', 'Spanish']
		},
		sameAs: SITE.sameAs,
		knowsLanguage: ['fr-CA', 'en-CA', 'es'],
		taxID: 'NEQ',
		award: [`RBQ ${SITE.rbqLicense}`, 'APCHQ Member', 'CMTQ Licensed', '4.9★ Google Rating'],
		identifier: {
			'@type': 'PropertyValue',
			propertyID: 'RBQ',
			value: SITE.rbqLicense
		},
		memberOf: [
			{ '@type': 'Organization', name: 'APCHQ — Association des professionnels de la construction et de l\'habitation du Québec' },
			{ '@type': 'Organization', name: 'CMTQ — Corporation des maîtres mécaniciens en tuyauterie du Québec' }
		]
	};
}

// ProfessionalService schema (more specific than LocalBusiness, ranks better)
export function professionalServiceJsonLd(lang: Lang) {
	return {
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		'@id': `${SITE.url}/#service`,
		name: SITE.name,
		image: SITE.logo,
		url: SITE.url,
		telephone: SITE.phone,
		priceRange: SITE.priceRange,
		address: {
			'@type': 'PostalAddress',
			addressLocality: SITE.address.addressLocality,
			addressRegion: SITE.address.addressRegion,
			addressCountry: SITE.address.addressCountry
		},
		areaServed: SITE.areaServed.map((a) => ({ '@type': 'AdministrativeArea', name: a })),
		serviceType: lang === 'fr'
			? ['Excavation', 'Drain Français', 'Réparation de Fondation', 'Démolition', 'Inspection par Caméra']
			: lang === 'es'
				? ['Excavación', 'Drenaje Francés', 'Reparación de Cimientos', 'Demolición', 'Inspección con Cámara']
				: ['Excavation', 'French Drain', 'Foundation Repair', 'Demolition', 'Camera Inspection'],
		hasCredential: [
			{
				'@type': 'EducationalOccupationalCredential',
				credentialCategory: 'license',
				name: 'RBQ — Régie du bâtiment du Québec',
				identifier: SITE.rbqLicense,
				url: `https://www.rbq.gouv.qc.ca/recherche-licence-titulaire?numLicence=${SITE.rbqLicense}`
			},
			{
				'@type': 'EducationalOccupationalCredential',
				credentialCategory: 'membership',
				name: 'APCHQ Member'
			},
			{
				'@type': 'EducationalOccupationalCredential',
				credentialCategory: 'license',
				name: 'CMTQ Licensed'
			}
		]
	};
}

// SiteNavigationElement — produces "Sitelinks" in Google search results
export function siteNavigationJsonLd(lang: Lang) {
	const items = lang === 'fr'
		? [
				{ name: 'Garantie 15 Ans', url: `${SITE.url}/urgences#garantie`, description: 'Totalement transférable. Protégez votre investissement.' },
				{ name: 'Inspection Gratuite', url: `${SITE.url}/urgences#inspection`, description: 'Déplacement sans frais. Soumission rapide en 24h-48h.' },
				{ name: 'Nos Certifications', url: `${SITE.url}/urgences#certifications`, description: 'Licences APCHQ, RBQ et CMTQ. Machinerie récente et sécuritaire.' },
				{ name: 'Avis de nos Clients', url: `${SITE.url}/urgences#avis`, description: 'Plus de 127 avis positifs. Voyez nos travaux récents.' },
				{ name: 'Drain Français', url: `${SITE.url}/services/drain-francais`, description: 'Installation et réparation de drain français.' },
				{ name: 'Excavation', url: `${SITE.url}/services/excavation`, description: 'Excavation résidentielle et commerciale.' },
				{ name: 'Réparation de Fissures', url: `${SITE.url}/services/reparation-fissures`, description: 'Injection époxy/polyuréthane.' },
				{ name: 'Démolition', url: `${SITE.url}/services/demolition`, description: 'Démolition résidentielle sécuritaire.' },
				{ name: 'Inspection Caméra', url: `${SITE.url}/services/inspection-camera`, description: 'Diagnostic précis sans excavation.' }
			]
		: lang === 'es'
			? [
					{ name: 'Garantía 15 Años', url: `${SITE.url}/urgences#garantie`, description: 'Totalmente transferible.' },
					{ name: 'Inspección Gratuita', url: `${SITE.url}/urgences#inspection`, description: 'Sin costo de desplazamiento.' },
					{ name: 'Certificaciones', url: `${SITE.url}/urgences#certifications`, description: 'Licencias APCHQ, RBQ, CMTQ.' },
					{ name: 'Reseñas', url: `${SITE.url}/urgences#avis`, description: '+127 reseñas positivas.' },
					{ name: 'Drenaje Francés', url: `${SITE.url}/services/drain-francais`, description: 'Instalación y reparación.' },
					{ name: 'Excavación', url: `${SITE.url}/services/excavation`, description: 'Residencial y comercial.' },
					{ name: 'Reparación Grietas', url: `${SITE.url}/services/reparation-fissures`, description: 'Inyección epoxi/poliuretano.' },
					{ name: 'Demolición', url: `${SITE.url}/services/demolition`, description: 'Demolición segura.' },
					{ name: 'Inspección Cámara', url: `${SITE.url}/services/inspection-camera`, description: 'Diagnóstico sin excavación.' }
				]
			: [
					{ name: '15-Year Warranty', url: `${SITE.url}/urgences#garantie`, description: 'Fully transferable. Protect your investment.' },
					{ name: 'Free Inspection', url: `${SITE.url}/urgences#inspection`, description: 'No travel fee. Quick quote 24-48h.' },
					{ name: 'Our Certifications', url: `${SITE.url}/urgences#certifications`, description: 'APCHQ, RBQ and CMTQ licenses.' },
					{ name: 'Client Reviews', url: `${SITE.url}/urgences#avis`, description: 'Over 127 positive reviews.' },
					{ name: 'French Drain', url: `${SITE.url}/services/drain-francais`, description: 'Installation and repair.' },
					{ name: 'Excavation', url: `${SITE.url}/services/excavation`, description: 'Residential and commercial.' },
					{ name: 'Crack Repair', url: `${SITE.url}/services/reparation-fissures`, description: 'Epoxy/polyurethane injection.' },
					{ name: 'Demolition', url: `${SITE.url}/services/demolition`, description: 'Safe demolition services.' },
					{ name: 'Camera Inspection', url: `${SITE.url}/services/inspection-camera`, description: 'Precise diagnostics.' }
				];

	return items.map((item) => ({
		'@context': 'https://schema.org',
		'@type': 'SiteNavigationElement',
		name: item.name,
		description: item.description,
		url: item.url
	}));
}

export function faqJsonLd(lang: Lang) {
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
				q: 'How much does French drain installation cost in Quebec in 2026?',
				a: 'French drain installation in Quebec costs between $4,000 and $12,000 depending on length, depth, and site access. Mini Excavations Érable offers free quotes with written warranty.'
			},
			{
				q: 'When should you replace your French drain?',
				a: 'A French drain lasts 25 to 40 years. Signs of failure: basement water infiltration, dampness, efflorescence, foundation cracks. We offer camera inspections for precise diagnosis.'
			},
			{
				q: 'Are you RBQ certified for excavation in Quebec?',
				a: 'Yes, Mini Excavations Érable holds RBQ, NEQ, CCQ and CMMTQ licenses. We comply with all Quebec Construction Code standards and warranty our work.'
			},
			{
				q: 'What areas do you serve in Quebec?',
				a: 'We serve Montreal, Laval, the Laurentians, Lanaudière, Montérégie and the greater Quebec metropolitan area.'
			},
			{
				q: 'How long does foundation crack repair take?',
				a: 'Crack repair via epoxy or polyurethane injection typically takes 1 to 2 days. For major structural damage, expect 3 to 7 days depending on severity.'
			},
			{
				q: 'Do you offer free quotes?',
				a: 'Yes, all our quotes are free and without obligation. We come on-site to evaluate your project and provide a detailed written quote within 24 hours.'
			}
		],
		es: [
			{
				q: '¿Cuánto cuesta instalar un drenaje francés en Quebec en 2026?',
				a: 'La instalación de drenaje francés en Quebec cuesta entre 4,000$ y 12,000$ según largo, profundidad y acceso. Mini Excavations Érable ofrece cotizaciones gratuitas con garantía escrita.'
			},
			{
				q: '¿Cuándo se debe reemplazar un drenaje francés?',
				a: 'Un drenaje francés dura entre 25 y 40 años. Señales: infiltración de agua en sótano, humedad, eflorescencia, grietas en cimientos. Ofrecemos inspección con cámara para diagnóstico preciso.'
			},
			{
				q: '¿Están certificados RBQ para excavación en Quebec?',
				a: 'Sí, Mini Excavations Érable tiene licencias RBQ, NEQ, CCQ y CMMTQ. Cumplimos todas las normas del Código de Construcción de Quebec.'
			},
			{
				q: '¿Qué regiones cubren en Quebec?',
				a: 'Cubrimos Montreal, Laval, Laurentides, Lanaudière, Montérégie y el área metropolitana de Quebec.'
			},
			{
				q: '¿Cuánto tarda la reparación de grietas de cimientos?',
				a: 'La reparación con inyección de epoxi o poliuretano tarda 1 a 2 días. Para daños estructurales mayores, de 3 a 7 días.'
			},
			{
				q: '¿Ofrecen cotizaciones gratuitas?',
				a: 'Sí, todas nuestras cotizaciones son gratuitas y sin compromiso. Visitamos su sitio y entregamos cotización detallada en menos de 24h.'
			}
		]
	};

	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs[lang].map((f) => ({
			'@type': 'Question',
			name: f.q,
			acceptedAnswer: {
				'@type': 'Answer',
				text: f.a
			}
		}))
	};
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.name,
			item: item.url
		}))
	};
}

export function serviceJsonLd(opts: {
	name: string;
	description: string;
	url: string;
	image?: string;
	lang: Lang;
	priceFrom?: number;
	priceTo?: number;
}) {
	const offer = opts.priceFrom
		? {
				'@type': 'AggregateOffer',
				priceCurrency: 'CAD',
				lowPrice: opts.priceFrom,
				highPrice: opts.priceTo || opts.priceFrom * 3,
				offerCount: '50',
				availability: 'https://schema.org/InStock'
			}
		: undefined;

	return {
		'@context': 'https://schema.org',
		'@type': 'Service',
		serviceType: opts.name,
		name: opts.name,
		description: opts.description,
		url: opts.url,
		image: opts.image || SITE.logo,
		provider: { '@id': `${SITE.url}/#organization` },
		areaServed: SITE.areaServed.map((a) => ({ '@type': 'City', name: a })),
		availableLanguage: ['fr', 'en', 'es'],
		...(offer && { offers: offer }),
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: opts.name,
			itemListElement: [
				{
					'@type': 'Offer',
					itemOffered: { '@type': 'Service', name: opts.name },
					availability: 'https://schema.org/InStock',
					priceCurrency: 'CAD'
				}
			]
		}
	};
}

export function howToJsonLd(opts: {
	name: string;
	description: string;
	steps: { name: string; text: string }[];
	totalTime?: string;
	estimatedCost?: { currency: string; min: number; max: number };
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'HowTo',
		name: opts.name,
		description: opts.description,
		...(opts.totalTime && { totalTime: opts.totalTime }),
		...(opts.estimatedCost && {
			estimatedCost: {
				'@type': 'MonetaryAmount',
				currency: opts.estimatedCost.currency,
				value: {
					'@type': 'QuantitativeValue',
					minValue: opts.estimatedCost.min,
					maxValue: opts.estimatedCost.max
				}
			}
		}),
		step: opts.steps.map((s, i) => ({
			'@type': 'HowToStep',
			position: i + 1,
			name: s.name,
			text: s.text
		}))
	};
}

export function articleJsonLd(opts: {
	title: string;
	description: string;
	url: string;
	image: string;
	datePublished: string;
	dateModified?: string;
	lang: Lang;
	author?: string;
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		mainEntityOfPage: { '@type': 'WebPage', '@id': opts.url },
		headline: opts.title,
		description: opts.description,
		image: {
			'@type': 'ImageObject',
			url: opts.image,
			width: 1200,
			height: 630
		},
		datePublished: opts.datePublished,
		dateModified: opts.dateModified || opts.datePublished,
		author: {
			'@type': 'Organization',
			name: opts.author || SITE.name,
			url: SITE.url
		},
		publisher: {
			'@type': 'Organization',
			name: SITE.name,
			logo: {
				'@type': 'ImageObject',
				url: SITE.logo,
				width: 200,
				height: 200
			}
		},
		inLanguage: opts.lang === 'fr' ? 'fr-CA' : opts.lang === 'es' ? 'es-ES' : 'en-CA'
	};
}
