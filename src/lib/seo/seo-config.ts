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
		title: 'Mini Excavations Érable | Drain Français #1 Québec | Excavation, Fondation, Démolition',
		description:
			"Entreprise d'excavation #1 au Québec depuis 15 ans ✓ Drain français, réparation fissures fondation, démolition, inspection caméra. Certifié RBQ APCHQ CMTQ. Garantie 15 ans. Soumission gratuite 24h. Montréal, Laval, Rive-Sud, Rive-Nord.",
		keywords:
			// CORE — Excavation generic
			"excavation, excavation Québec, excavation Montréal, excavation Laval, excavation Longueuil, excavation Brossard, excavation Saint-Jérôme, excavation Terrebonne, excavation Repentigny, excavation Mascouche, excavation Blainville, excavation Boisbriand, excavation Sainte-Thérèse, excavation Mirabel, excavation Saint-Eustache, excavation Châteauguay, excavation Vaudreuil-Dorion, excavation Saint-Hyacinthe, excavation ville de Québec, excavation Pointe-Claire, excavation Dollard-des-Ormeaux, excavation Kirkland, excavation Beaconsfield, excavation LaSalle, excavation Verdun, excavation Westmount, excavation Outremont, excavation Saint-Laurent, excavation Anjou, excavation Montréal-Nord, excavation Rivière-des-Prairies, excavation Saint-Lambert, excavation Greenfield Park, excavation Boucherville, excavation Saint-Bruno, excavation Sainte-Julie, excavation La Prairie, excavation Candiac, excavation Beloeil, excavation Mont-Tremblant, excavation Sainte-Agathe, excavation Prévost, excavation Sainte-Adèle, excavation Joliette, excavation L'Assomption, excavation Rive-Nord, excavation Rive-Sud, excavation Lanaudière, excavation Montérégie, excavation Laurentides, excavation Outaouais, excavation Estrie, excavation Mauricie, excavation Centre-du-Québec, excavation Gatineau, excavation Sherbrooke, excavation Trois-Rivières, excavation Drummondville, excavation Granby, " +
			// CORE — Drain français exhaustive
			"drain français, drain français Québec, drain français Montréal, drain français Laval, drain français Longueuil, drain français Brossard, drain français Saint-Jérôme, drain français Terrebonne, drain français Repentigny, drain français Boucherville, drain français Verdun, drain français LaSalle, drain français Westmount, drain français Outremont, drain français Anjou, drain français Mont-Tremblant, drain français Boucherville, drain français Saint-Bruno, drain français Mascouche, drain français Mirabel, drain français Châteauguay, drain français Vaudreuil, drain français Saint-Hyacinthe, drain français ville de Québec, drain français résidentiel, drain français commercial, drain français industriel, installation drain français, réparation drain français, remplacement drain français, débouchage drain français, nettoyage drain français, inspection drain français, prix drain français, coût drain français, soumission drain français, devis drain français gratuit, drain français certifié RBQ, drain français garantie 15 ans, drain français pas cher, meilleur drain français Québec, drain français urgence, drain français sous-sol, drain français fondation, drain français bouché, drain français qui coule, drain français qui sent mauvais, drain français hiver, drain français gel, drain français saturé, drain français efficace, drain français écologique, drain français chambre filtrante, drain français géotextile, drain français membrane, drain français pompe puisard, drain français raccordement, drain français inspection caméra, drain français durée de vie, drain français entretien, " +
			// FONDATION
			"fondation, fondation Québec, fondation Montréal, réparation fondation, réparation fondation Québec, réparation fondation Montréal, réparation fondation Laval, fissure fondation, fissure fondation Québec, fissure fondation Montréal, réparation fissure, réparation fissure fondation, réparation fissure béton, réparation fissure solage, réparation fissure muret, fissure horizontale, fissure verticale, fissure escalier, fissure structurelle, fissure cosmétique, fissure traversante, fissure active, fissure dormante, injection époxy, injection époxy fissure, injection polyuréthane, injection polyuréthane fondation, injection fissure prix, injection fissure garantie, scellage fissure, étanchéité fissure, étanchéité fondation, imperméabilisation fondation, imperméabilisation sous-sol, imperméabilisation extérieure, imperméabilisation intérieure, membrane élastomère, membrane drainante, membrane Delta-MS, membrane Platon, fondation neuve, construction fondation, agrandissement fondation, sous-pinage, soulèvement maison, redressement fondation, " +
			// DÉMOLITION
			"démolition, démolition Québec, démolition Montréal, démolition Laval, démolition résidentielle, démolition commerciale, démolition industrielle, démolition maison, démolition garage, démolition cabanon, démolition piscine, démolition piscine creusée, démolition piscine béton, démolition piscine fibre de verre, démolition piscine hors-terre, démolition intérieure, démolition partielle, démolition complète, démolition sécuritaire, démolition écoresponsable, démolition tri matériaux, démolition récupération, démolition prix, démolition coût, démolition gratuite estimation, soumission démolition, devis démolition, démolition certifiée RBQ, démolition mur porteur, démolition cheminée, démolition perron, démolition balcon, démolition entrée garage, démolition asphalte, démolition béton, démolition structure, " +
			// INSPECTION CAMÉRA
			"inspection caméra, inspection caméra Montréal, inspection caméra Québec, inspection caméra drain, inspection caméra drain français, inspection caméra égout, inspection caméra conduit, inspection vidéo drain, inspection vidéo égout, inspection vidéo conduit, caméra HD drain, caméra HD inspection, diagnostic drain, diagnostic drain français, diagnostic conduit, rapport vidéo inspection, inspection préachat, inspection préachat maison, inspection préachat drain, inspection préventive, inspection annuelle drain, " +
			// URGENCE
			"urgence excavation, urgence excavation 24/7, urgence excavation Montréal, urgence excavation Québec, urgence excavation Laval, urgence drain, urgence drain français, urgence drain bouché, urgence refoulement égout, urgence inondation, urgence inondation sous-sol, urgence infiltration eau, urgence infiltration sous-sol, urgence fissure fondation, urgence fissure majeure, urgence drain hiver, urgence pompe puisard, urgence évacuation eau, intervention urgence, intervention rapide, service urgence 24 heures, service urgence weekend, dépannage drain, dépannage urgent, " +
			// POMPE / SUMP
			"pompe puisard, pompe puisard installation, pompe puisard prix, pompe puisard Québec, pompe puisard Montréal, pompe puisard remplacement, pompe puisard batterie, pompe puisard backup, pompe puisard automatique, pompe puisard réparation, sump pump installation Québec, " +
			// RACCORDEMENT
			"raccordement égout, raccordement égout municipal, raccordement aqueduc, raccordement eau potable, raccordement plomberie, branchement égout, branchement aqueduc, conduit égout, conduit pluvial, conduit sanitaire, drain pluvial, drain sanitaire, drain agricole, " +
			// SEPTIC
			"fosse septique, fosse septique installation, champ épuration, champ épuration installation, traitement eau, système septique, vidange fosse septique, " +
			// MACHINERIE
			"mini-pelle, mini pelle, mini-excavateur, excavateur, excavatrice, mini-pelle Montréal, mini-pelle Québec, mini-pelle Laval, mini-pelle 3 tonnes, mini-pelle 5 tonnes, mini-pelle 8 tonnes, location mini-pelle, location mini pelle Montréal, location excavatrice, location excavatrice Québec, location backhoe, backhoe service, " +
			// TERRASSEMENT
			"terrassement, terrassement Québec, terrassement Montréal, terrassement résidentiel, nivellement terrain, nivellement, nivellement terrain Montréal, aménagement terrain, aménagement extérieur, paysagement, paysagement excavation, " +
			// PAVAGE
			"pavage, pavage uni, pavé uni, pavé uni installation, pavage asphalte, asphaltage, asphaltage Québec, " +
			// MURS
			"mur soutènement, mur de soutènement, mur de soutènement béton, mur de soutènement pierre, construction mur soutènement, " +
			// PISCINE
			"excavation piscine, excavation piscine creusée, excavation piscine béton, excavation piscine fibre, creusage piscine, terrain piscine, " +
			// HIVER
			"déneigement excavation, calcium drain hiver, gel drain français, dégel drain, plomberie hiver, " +
			// CONSTRUCTION GENERAL
			"construction, construction Québec, construction Montréal, construction résidentielle, construction commerciale, contracteur construction, contracteur résidentiel Québec, contracteur résidentiel Montréal, entrepreneur construction, entrepreneur construction Québec, entrepreneur général, entrepreneur général Montréal, sous-traitant construction, sous-traitant excavation, " +
			// CERTIFICATIONS / TRUST
			"RBQ, certifié RBQ, licence RBQ, RBQ excavation, APCHQ, APCHQ membre, CMTQ, CMTQ certifié, CCQ, NEQ, garanti maison neuve, GCR, ACQ, " +
			// MARQUES / VARIATIONS
			"Mini Excavations Érable, Excavations Érable, Mini Excavation Erable, mini excavation, mini excavation Montréal, mini excavation Québec, mini excavations, " +
			// QUESTIONS DE TENDANCE 2026
			"prix drain français 2026, prix excavation 2026, coût démolition 2026, garantie drain français Québec, durée vie drain français, signes drain français bouché, comment savoir drain français bouché, quand changer drain français, à quelle profondeur drain français, drain français combien d'années, fissure fondation dangereuse, infiltration eau sous-sol que faire, refoulement égout que faire, " +
			// COMPETITIVE / LONG TAIL
			"meilleure entreprise drain français Québec, meilleure entreprise excavation Montréal, top excavation Québec, top drain français Laval, qui appeler drain français bouché, qui contacter inondation sous-sol, qui appeler urgence drain, entrepreneur drain français pas cher, soumission drain français rapide, devis excavation gratuit 24h, drain français garantie transférable, drain français maison neuve, drain français maison ancienne, drain français rénovation",
		ogLocale: 'fr_CA'
	},
	en: {
		title: 'Mini Excavations Érable | #1 French Drain & Excavation Quebec | Foundation, Demolition',
		description:
			'#1 Excavation contractor in Quebec for 15 years ✓ French drain, foundation crack repair, demolition, camera inspection. RBQ APCHQ CMTQ certified. 15-year warranty. Free quote 24h. Montreal, Laval, North Shore, South Shore.',
		keywords:
			// Excavation by city
			"excavation, excavation Quebec, excavation Montreal, excavation Laval, excavation Longueuil, excavation Brossard, excavation Saint-Jerome, excavation Terrebonne, excavation Repentigny, excavation Mascouche, excavation Blainville, excavation Boisbriand, excavation Sainte-Therese, excavation Mirabel, excavation Saint-Eustache, excavation Chateauguay, excavation Vaudreuil-Dorion, excavation Saint-Hyacinthe, excavation Quebec City, excavation Pointe-Claire, excavation Dollard-des-Ormeaux, excavation Kirkland, excavation Beaconsfield, excavation LaSalle, excavation Verdun, excavation Westmount, excavation Outremont, excavation Saint-Laurent, excavation Anjou, excavation Boucherville, excavation Saint-Bruno, excavation Mont-Tremblant, excavation Joliette, excavation North Shore, excavation South Shore, excavation Laurentians, excavation Lanaudiere, excavation Monteregie, excavation Outaouais, excavation Eastern Townships, excavation Mauricie, excavation Gatineau, excavation Sherbrooke, excavation Trois-Rivieres, " +
			// French drain exhaustive
			"french drain, french drain Quebec, french drain Montreal, french drain Laval, french drain Longueuil, french drain Brossard, french drain Boucherville, french drain Verdun, french drain LaSalle, french drain Westmount, french drain Anjou, french drain Mont-Tremblant, french drain Saint-Bruno, french drain Mascouche, french drain residential, french drain commercial, french drain industrial, french drain installation, french drain installation Montreal, french drain installation Quebec, french drain repair, french drain replacement, french drain unclog, french drain cleaning, french drain inspection, french drain price, french drain cost, french drain cost Quebec, french drain quote, french drain free quote, french drain RBQ certified, french drain 15 year warranty, best french drain Quebec, french drain emergency, french drain basement, french drain foundation, french drain clogged, french drain leaking, french drain bad smell, french drain winter, french drain frozen, french drain saturated, french drain effective, french drain eco-friendly, french drain filter chamber, french drain geotextile, french drain membrane, french drain sump pump, french drain connection, french drain camera inspection, french drain lifespan, french drain maintenance, " +
			// Foundation
			"foundation, foundation Quebec, foundation Montreal, foundation repair, foundation repair Quebec, foundation repair Montreal, foundation repair Laval, foundation crack, foundation crack repair, concrete crack repair, concrete crack injection, horizontal crack, vertical crack, step crack, structural crack, cosmetic crack, through crack, active crack, dormant crack, epoxy injection, epoxy crack injection, polyurethane injection, polyurethane foundation injection, crack injection price, crack injection warranty, crack sealing, foundation sealing, foundation waterproofing, basement waterproofing, exterior waterproofing, interior waterproofing, elastomeric membrane, drainage membrane, Delta-MS membrane, Platon membrane, new foundation, foundation construction, foundation extension, underpinning, house lifting, foundation straightening, " +
			// Demolition
			"demolition, demolition Quebec, demolition Montreal, demolition Laval, residential demolition, commercial demolition, industrial demolition, house demolition, garage demolition, shed demolition, pool demolition, in-ground pool demolition, concrete pool demolition, fiberglass pool demolition, above-ground pool demolition, interior demolition, partial demolition, complete demolition, safe demolition, eco-friendly demolition, demolition material sorting, demolition recycling, demolition price, demolition cost, free demolition estimate, demolition quote, RBQ certified demolition, load-bearing wall demolition, chimney demolition, porch demolition, balcony demolition, driveway demolition, asphalt demolition, concrete demolition, structure demolition, " +
			// Camera inspection
			"camera inspection, camera inspection Montreal, camera inspection Quebec, drain camera inspection, sewer camera inspection, pipe camera inspection, video drain inspection, video sewer inspection, video pipe inspection, HD drain camera, HD inspection camera, drain diagnosis, sewer diagnosis, pipe diagnosis, video inspection report, pre-purchase inspection, pre-purchase home inspection, pre-purchase drain inspection, preventive inspection, annual drain inspection, " +
			// Emergency
			"emergency excavation, 24/7 emergency excavation, emergency excavation Montreal, emergency excavation Quebec, emergency excavation Laval, emergency drain, emergency french drain, emergency clogged drain, emergency sewer backup, emergency flooding, emergency basement flooding, emergency water infiltration, emergency basement infiltration, emergency foundation crack, emergency major crack, emergency winter drain, emergency sump pump, emergency water evacuation, emergency intervention, fast intervention, 24 hour emergency service, weekend emergency service, drain repair emergency, urgent repair, " +
			// Sump pump
			"sump pump, sump pump installation, sump pump price, sump pump Quebec, sump pump Montreal, sump pump replacement, sump pump battery, sump pump backup, sump pump automatic, sump pump repair, " +
			// Connections
			"sewer connection, municipal sewer connection, water main connection, drinking water connection, plumbing connection, sewer line, storm drain, sanitary drain, agricultural drain, " +
			// Septic
			"septic tank, septic tank installation, leach field, leach field installation, water treatment, septic system, septic tank pumping, " +
			// Machinery
			"mini excavator, mini-excavator, mini-digger, excavator, excavating machine, mini excavator Montreal, mini excavator Quebec, mini excavator Laval, 3-ton mini excavator, 5-ton mini excavator, 8-ton mini excavator, mini excavator rental, mini excavator rental Montreal, excavator rental, excavator rental Quebec, backhoe rental, backhoe service, " +
			// Earthworks
			"earthworks, earthworks Quebec, earthworks Montreal, residential earthworks, land grading, land grading Montreal, land development, outdoor landscaping, landscaping, landscaping excavation, " +
			// Paving
			"paving, paver installation, interlocking paver, paver, asphalt paving, asphalt paving Quebec, " +
			// Retaining walls
			"retaining wall, retaining walls, concrete retaining wall, stone retaining wall, retaining wall construction, " +
			// Pool
			"pool excavation, in-ground pool excavation, concrete pool excavation, fiberglass pool excavation, pool digging, pool site, " +
			// Winter
			"winter excavation, calcium drain winter, frozen french drain, drain thawing, winter plumbing, " +
			// Construction general
			"construction, construction Quebec, construction Montreal, residential construction, commercial construction, construction contractor, residential contractor Quebec, residential contractor Montreal, construction contractor, construction contractor Quebec, general contractor, general contractor Montreal, construction subcontractor, excavation subcontractor, " +
			// Trust signals
			"RBQ, RBQ certified, RBQ license, RBQ excavation, APCHQ, APCHQ member, CMTQ, CMTQ certified, CCQ, NEQ, new home warranty, GCR, ACQ, " +
			// Brand variations
			"Mini Excavations Erable, Excavations Erable, Mini Excavation Erable, mini excavation, mini excavation Montreal, mini excavation Quebec, mini excavations, " +
			// Trending questions 2026
			"french drain price 2026, excavation price 2026, demolition cost 2026, french drain warranty Quebec, french drain lifespan, signs french drain clogged, how to know french drain clogged, when to change french drain, how deep french drain, french drain how many years, dangerous foundation crack, basement water infiltration what to do, sewer backup what to do, " +
			// Competitive
			"best french drain company Quebec, best excavation company Montreal, top excavation Quebec, top french drain Laval, who to call clogged french drain, who to call basement flooding, who to call drain emergency, cheap french drain contractor, fast french drain quote, free 24h excavation quote, transferable french drain warranty, french drain new home, french drain old home, french drain renovation",
		ogLocale: 'en_CA'
	},
	es: {
		title: 'Mini Excavations Érable | Drenaje Francés #1 Quebec | Excavación, Cimientos, Demolición',
		description:
			'Empresa de excavación #1 en Quebec desde hace 15 años ✓ Drenaje francés, reparación grietas cimientos, demolición, inspección con cámara. Certificado RBQ APCHQ CMTQ. Garantía 15 años. Cotización gratuita 24h. Montreal, Laval, Rive-Sud, Rive-Nord.',
		keywords:
			// Excavación por ciudad
			"excavación, excavación Quebec, excavación Montreal, excavación Laval, excavación Longueuil, excavación Brossard, excavación Saint-Jérôme, excavación Terrebonne, excavación Repentigny, excavación Mascouche, excavación Blainville, excavación Boisbriand, excavación Sainte-Thérèse, excavación Mirabel, excavación Saint-Eustache, excavación Châteauguay, excavación Vaudreuil-Dorion, excavación Saint-Hyacinthe, excavación ciudad de Quebec, excavación Pointe-Claire, excavación Dollard-des-Ormeaux, excavación Kirkland, excavación Beaconsfield, excavación LaSalle, excavación Verdun, excavación Westmount, excavación Outremont, excavación Saint-Laurent, excavación Anjou, excavación Boucherville, excavación Saint-Bruno, excavación Mont-Tremblant, excavación Joliette, excavación Rive-Nord, excavación Rive-Sud, excavación Lanaudière, excavación Montérégie, excavación Laurentides, excavación Outaouais, excavación Estrie, excavación Mauricie, excavación Gatineau, excavación Sherbrooke, excavación Trois-Rivières, " +
			// Drenaje francés exhaustivo
			"drenaje francés, drenaje francés Quebec, drenaje francés Montreal, drenaje francés Laval, drenaje francés Longueuil, drenaje francés Brossard, drenaje francés Boucherville, drenaje francés Verdun, drenaje francés LaSalle, drenaje francés Westmount, drenaje francés Anjou, drenaje francés Mont-Tremblant, drenaje francés Saint-Bruno, drenaje francés Mascouche, drenaje francés residencial, drenaje francés comercial, drenaje francés industrial, instalación drenaje francés, instalación drenaje francés Montreal, instalación drenaje francés Quebec, reparación drenaje francés, reemplazo drenaje francés, desbloqueo drenaje francés, limpieza drenaje francés, inspección drenaje francés, precio drenaje francés, costo drenaje francés, costo drenaje francés Quebec, cotización drenaje francés, cotización gratuita drenaje francés, drenaje francés certificado RBQ, drenaje francés garantía 15 años, mejor drenaje francés Quebec, drenaje francés urgencia, drenaje francés sótano, drenaje francés cimientos, drenaje francés obstruido, drenaje francés con fugas, drenaje francés mal olor, drenaje francés invierno, drenaje francés congelado, drenaje francés saturado, drenaje francés efectivo, drenaje francés ecológico, drenaje francés cámara filtrante, drenaje francés geotextil, drenaje francés membrana, drenaje francés bomba sumidero, drenaje francés conexión, drenaje francés inspección cámara, drenaje francés vida útil, drenaje francés mantenimiento, " +
			// Cimientos
			"cimientos, cimientos Quebec, cimientos Montreal, reparación cimientos, reparación cimientos Quebec, reparación cimientos Montreal, reparación cimientos Laval, grieta cimientos, grieta cimientos Quebec, grieta cimientos Montreal, reparación grietas, reparación grietas cimientos, reparación grietas concreto, reparación grietas solera, reparación grietas muro, grieta horizontal, grieta vertical, grieta escalera, grieta estructural, grieta cosmética, grieta pasante, grieta activa, grieta dormante, inyección epoxi, inyección epoxi grieta, inyección poliuretano, inyección poliuretano cimientos, precio inyección grieta, garantía inyección grieta, sellado grieta, estanqueidad grieta, estanqueidad cimientos, impermeabilización cimientos, impermeabilización sótano, impermeabilización exterior, impermeabilización interior, membrana elastomérica, membrana drenante, membrana Delta-MS, membrana Platon, cimientos nuevos, construcción cimientos, ampliación cimientos, recalzado, levantamiento casa, enderezamiento cimientos, " +
			// Demolición
			"demolición, demolición Quebec, demolición Montreal, demolición Laval, demolición residencial, demolición comercial, demolición industrial, demolición casa, demolición garaje, demolición cobertizo, demolición piscina, demolición piscina enterrada, demolición piscina concreto, demolición piscina fibra de vidrio, demolición piscina elevada, demolición interior, demolición parcial, demolición completa, demolición segura, demolición ecológica, demolición clasificación materiales, demolición reciclaje, precio demolición, costo demolición, estimación gratuita demolición, cotización demolición, demolición certificada RBQ, demolición pared estructural, demolición chimenea, demolición porche, demolición balcón, demolición entrada coche, demolición asfalto, demolición concreto, demolición estructura, " +
			// Inspección cámara
			"inspección cámara, inspección cámara Montreal, inspección cámara Quebec, inspección cámara drenaje, inspección cámara drenaje francés, inspección cámara alcantarillado, inspección cámara conducto, inspección video drenaje, inspección video alcantarillado, inspección video conducto, cámara HD drenaje, cámara HD inspección, diagnóstico drenaje, diagnóstico drenaje francés, diagnóstico conducto, reporte video inspección, inspección pre-compra, inspección pre-compra casa, inspección pre-compra drenaje, inspección preventiva, inspección anual drenaje, " +
			// Urgencias
			"urgencia excavación, urgencia excavación 24/7, urgencia excavación Montreal, urgencia excavación Quebec, urgencia excavación Laval, urgencia drenaje, urgencia drenaje francés, urgencia drenaje obstruido, urgencia respaldo alcantarillado, urgencia inundación, urgencia inundación sótano, urgencia infiltración agua, urgencia infiltración sótano, urgencia grieta cimientos, urgencia grieta mayor, urgencia drenaje invierno, urgencia bomba sumidero, urgencia evacuación agua, intervención urgencia, intervención rápida, servicio urgencia 24 horas, servicio urgencia fin de semana, reparación drenaje urgencia, reparación urgente, " +
			// Bomba sumidero
			"bomba sumidero, instalación bomba sumidero, precio bomba sumidero, bomba sumidero Quebec, bomba sumidero Montreal, reemplazo bomba sumidero, batería bomba sumidero, respaldo bomba sumidero, bomba sumidero automática, reparación bomba sumidero, " +
			// Conexiones
			"conexión alcantarillado, conexión alcantarillado municipal, conexión acueducto, conexión agua potable, conexión plomería, línea alcantarillado, drenaje pluvial, drenaje sanitario, drenaje agrícola, " +
			// Séptico
			"fosa séptica, instalación fosa séptica, campo absorción, instalación campo absorción, tratamiento agua, sistema séptico, vaciado fosa séptica, " +
			// Maquinaria
			"mini excavadora, mini-excavadora, mini-pala, excavadora, máquina excavadora, mini excavadora Montreal, mini excavadora Quebec, mini excavadora Laval, mini excavadora 3 toneladas, mini excavadora 5 toneladas, mini excavadora 8 toneladas, alquiler mini excavadora, alquiler mini excavadora Montreal, alquiler excavadora, alquiler excavadora Quebec, alquiler retroexcavadora, servicio retroexcavadora, " +
			// Movimiento de tierra
			"movimiento de tierras, movimiento tierras Quebec, movimiento tierras Montreal, movimiento tierras residencial, nivelación terreno, nivelación, nivelación terreno Montreal, desarrollo terreno, paisajismo exterior, paisajismo, paisajismo excavación, " +
			// Pavimentación
			"pavimentación, instalación adoquines, adoquín entrelazado, adoquín, pavimentación asfalto, pavimentación asfalto Quebec, " +
			// Muros
			"muro contención, muros contención, muro contención concreto, muro contención piedra, construcción muro contención, " +
			// Piscina
			"excavación piscina, excavación piscina enterrada, excavación piscina concreto, excavación piscina fibra de vidrio, excavación piscina, sitio piscina, " +
			// Invierno
			"excavación invierno, calcio drenaje invierno, drenaje francés congelado, descongelar drenaje, plomería invierno, " +
			// Construcción general
			"construcción, construcción Quebec, construcción Montreal, construcción residencial, construcción comercial, contratista construcción, contratista residencial Quebec, contratista residencial Montreal, contratista construcción, contratista construcción Quebec, contratista general, contratista general Montreal, subcontratista construcción, subcontratista excavación, " +
			// Confianza
			"RBQ, certificado RBQ, licencia RBQ, RBQ excavación, APCHQ, APCHQ miembro, CMTQ, CMTQ certificado, CCQ, NEQ, garantía vivienda nueva, GCR, ACQ, " +
			// Marca
			"Mini Excavations Érable, Excavations Érable, Mini Excavation Erable, mini excavación, mini excavación Montreal, mini excavación Quebec, mini excavaciones, " +
			// Preguntas tendencia 2026
			"precio drenaje francés 2026, precio excavación 2026, costo demolición 2026, garantía drenaje francés Quebec, vida útil drenaje francés, señales drenaje francés obstruido, cómo saber drenaje francés obstruido, cuándo cambiar drenaje francés, qué tan profundo drenaje francés, drenaje francés cuántos años, grieta cimientos peligrosa, infiltración agua sótano qué hacer, respaldo alcantarillado qué hacer, " +
			// Competitivo
			"mejor empresa drenaje francés Quebec, mejor empresa excavación Montreal, top excavación Quebec, top drenaje francés Laval, a quién llamar drenaje francés obstruido, a quién llamar inundación sótano, a quién llamar urgencia drenaje, contratista drenaje francés barato, cotización drenaje francés rápida, cotización excavación gratuita 24h, drenaje francés garantía transferible, drenaje francés casa nueva, drenaje francés casa antigua, drenaje francés renovación",
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
