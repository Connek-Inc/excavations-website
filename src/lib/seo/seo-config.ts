export const SITE = {
	url: 'https://miniexcavationserable.com',
	altUrl: 'https://excavationserable.com',
	name: 'Mini Excavations Érable',
	legalName: 'Mini Excavations Érable Inc.',
	logo: 'https://miniexcavationserable.com/logo.png',
	phone: '+1-514-830-9973',
	emergencyPhone: '+1-514-830-9973',
	email: 'info@miniexcavationserable.com',
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
	sameAs: [
		'https://www.facebook.com/miniexcavationserable',
		'https://www.instagram.com/mini_excavation_erable'
	]
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
		title: 'Mini Excavations Érable | Drain Français, Excavation & Fondation Québec',
		description:
			"Entreprise d'excavation #1 au Québec ✓ Drain français, réparation fissures, démolition, inspection caméra. 15+ ans d'expérience, certifié RBQ. Soumission gratuite 24h.",
		keywords:
			"excavation Québec, drain français Montréal, réparation fissure fondation, mini excavation, entrepreneur excavation certifié RBQ, imperméabilisation sous-sol, démolition résidentielle, inspection caméra drain, pompe puisard, excavation Laval, excavation Laurentides, drain agricole Québec, excavateur Montréal, excavation résidentielle, excavation commerciale, urgence excavation, refoulement égout, réparation drain français, installation drain français prix, excavation Rive-Nord, excavation Rive-Sud, excavation Lanaudière, excavation Montérégie, travaux de terrassement, nivellement de terrain, excavation fondation, réparation solage, fissure injection époxy, drain bouché, urgence inondation sous-sol, excavation machinerie lourde, mini pelle, location excavatrice, démolition intérieure, démolition garage, entrée d'eau, raccordement égout, excavation piscine, excavation asphalte, pavage, murs de soutènement",
		ogLocale: 'fr_CA'
	},
	en: {
		title: 'Mini Excavations Érable | French Drain, Excavation & Foundation Quebec',
		description:
			'#1 Excavation contractor in Quebec ✓ French drain, foundation crack repair, demolition, camera inspection. 15+ years experience, RBQ certified. Free quote in 24h.',
		keywords:
			'excavation Quebec, french drain Montreal, foundation crack repair, mini excavation, RBQ certified excavation contractor, basement waterproofing, residential demolition, sewer camera inspection, sump pump installation, excavation Laval, drainage solutions Quebec, residential excavation, commercial excavation, emergency excavation, sewer backup repair, french drain repair, french drain installation cost, excavation North Shore, excavation South Shore, excavation Laurentians, earthworks, land grading, foundation excavation, foundation repair, epoxy crack injection, clogged drain, basement flood emergency, heavy machinery excavation, mini excavator, excavator rental, interior demolition, garage demolition, water main entry, sewer connection, pool excavation, asphalt excavation, retaining walls',
		ogLocale: 'en_CA'
	},
	es: {
		title: 'Mini Excavations Érable | Drenaje Francés, Excavación y Cimientos Quebec',
		description:
			'Empresa de excavación #1 en Quebec ✓ Drenaje francés, reparación de grietas, demolición, inspección con cámara. +15 años de experiencia, certificada RBQ. Cotización gratuita 24h.',
		keywords:
			'excavación Quebec, drenaje francés Montreal, reparación grietas cimientos, mini excavación, contratista excavación certificado RBQ, impermeabilización sótano, demolición residencial, inspección cámara drenaje, instalación bomba sumidero, excavación Laval, excavación residencial, excavación comercial, urgencia excavación, reparación respaldo alcantarillado, reparación drenaje francés, costo instalación drenaje francés, excavación Laurentides, excavación Rive-Nord, excavación Rive-Sud, movimiento de tierras, nivelación de terreno, excavación cimientos, reparación cimientos, inyección epoxi grietas, drenaje obstruido, emergencia inundación sótano, maquinaria pesada excavación, mini excavadora, alquiler excavadora, demolición interior, demolición garaje, entrada de agua, conexión alcantarillado, excavación piscina, muros de contención',
		ogLocale: 'es_ES'
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
		}
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
		award: ['RBQ Certified', 'APCHQ Member', 'CMTQ Licensed', '4.9★ Google Rating'],
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
				name: 'RBQ — Régie du bâtiment du Québec'
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
