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
			"meilleure entreprise drain français Québec, meilleure entreprise excavation Montréal, top excavation Québec, top drain français Laval, qui appeler drain français bouché, qui contacter inondation sous-sol, qui appeler urgence drain, entrepreneur drain français pas cher, soumission drain français rapide, devis excavation gratuit 24h, drain français garantie transférable, drain français maison neuve, drain français maison ancienne, drain français rénovation, " +
			// EXCAVATION par type de terrain
			"excavation roc, excavation rocheuse, excavation argile, excavation glaise, excavation sable, excavation gravier, excavation terrain difficile, excavation terrain pentu, excavation terrain inondable, excavation terrain humide, excavation terrain sec, excavation cour avant, excavation cour arrière, excavation devant maison, excavation derrière maison, excavation côté maison, excavation entrée garage, excavation entrée principale, excavation autour piscine, excavation autour fondation, " +
			// EXCAVATION par projet
			"excavation pour piscine, excavation pour spa, excavation pour fondation, excavation pour garage détaché, excavation pour cabanon, excavation pour patio, excavation pour terrasse, excavation pour gazebo, excavation pour pergola, excavation pour mur soutènement, excavation pour fontaine, excavation pour étang, excavation pour arbre, excavation pour racines, excavation pour conduite gaz, excavation pour conduite électrique, excavation pour conduite eau, excavation pour fibre optique, excavation pour câblage, " +
			// DRAINAGE — autres types
			"drain pluvial Québec, drain de toit, drain de gouttière, drain de balcon, drain de terrasse, drain de cour, drain de stationnement, drain industriel, drain agricole installation, drain de fondation, drain perforé, drain rigide, drain flexible, drain BNQ, drain certifié BNQ, drain conforme BNQ 3624-115, drain BNQ neuf, " +
			// DRAINAGE — problèmes
			"drain qui sent, drain qui pue, mauvaise odeur drain, drain qui refoule, drain qui déborde, drain plein de boue, drain plein de racines, racines dans drain, drain bouché racines, drain bouché terre, drain bouché sédiments, drain saturé, drain ne fonctionne plus, drain inefficace, drain endommagé, drain effondré, drain affaissé, drain percé, drain fissuré, drain rouillé, " +
			// FONDATION — types détaillés
			"fondation béton, fondation béton armé, fondation pieux, fondation pieux vissés, fondation radier, fondation dalle béton, fondation poteaux, fondation maison mobile, fondation chalet, fondation chalet trois saisons, fondation chalet quatre saisons, mur de fondation, mur de fondation béton, semelle fondation, dalle fondation, hauteur fondation standard Québec, profondeur fondation Québec, fondation hors gel, fondation gel-dégel, fondation inondation, fondation soulèvement, fondation tassement, fondation bombée, fondation enfoncée, fondation déformée, fondation à refaire, " +
			// HUMIDITÉ / EAU
			"humidité sous-sol, humidité sous-sol cause, humidité sous-sol solution, humidité fondation, humidité mur béton, condensation sous-sol, moisissure sous-sol, moisissure mur béton, moisissure cause, moisissure danger, eau sous-sol, eau dans sous-sol, sous-sol inondé, sous-sol mouillé, sous-sol humide, sous-sol qui sent, dégât d'eau sous-sol, dégât eau fondation, infiltration plancher, infiltration mur, infiltration coin sous-sol, infiltration fenêtre sous-sol, infiltration porte garage, " +
			// EXCAVATION — équipement spécialisé
			"excavation hydraulique, excavation hydrovac, hydrovac Montréal, hydrovac Québec, hydrovac excavation, excavation par succion, camion vacuum, excavation localisée, excavation précise, excavation manuelle pelle, excavation manuelle bêche, excavation à la main, excavation sans dommage, excavation près de fil électrique, excavation près de gaz, excavation autour racine arbre, " +
			// CERTIFICATIONS détaillées
			"licence RBQ entrepreneur excavation, RBQ catégorie 2.5 excavation, RBQ catégorie 1.4 maçonnerie, RBQ assuré, GCR garantie construction résidentielle, GCR maison neuve, garantie de construction résidentielle, ACQ Association de la construction du Québec, CCQ travailleur certifié, carte CCQ excavation, CNESST couverture, CNESST assurance, assurance responsabilité civile 2 millions, assurance responsabilité civile 5 millions, " +
			// QUESTIONS — voice search style
			"comment installer drain français, comment réparer fissure fondation, comment imperméabiliser sous-sol, comment savoir si drain français est bouché, combien coûte un drain français au Québec, combien coûte une excavation, combien coûte une démolition de garage, quel est le meilleur drain français, quelle est la durée de vie d'un drain français, à quelle profondeur installer drain français, est-ce que drain français a besoin entretien, est-ce que drain français se bouche, quand remplacer drain français, " +
			// MUNICIPAL / RÉGLEMENTATION
			"permis excavation Montréal, permis excavation Laval, permis excavation Québec, permis démolition Montréal, permis démolition Québec, règlement municipal excavation, règlement excavation Québec, code construction Québec, code plomberie Québec, code drainage Québec, conformité municipale, inspection municipale drain, plan d'arpentage, plan localisation, certificat localisation, " +
			// SAISONNIER / CLIMAT
			"excavation printemps, excavation été, excavation automne, excavation hiver, drain français printemps, drain français hiver Québec, drain français gel hiver, dégât gel-dégel, cycle gel-dégel fondation, dommages gel fondation, prévention gel drain, calcium chloride drain, sel drain hiver, déneigement avant excavation, " +
			// FORMATS — questions FAQ
			"que faire si mon sous-sol est inondé, que faire si drain français bouché, que faire fissure fondation apparaît, que faire si je vois eau dans sous-sol, comment trouver bonne entreprise excavation, comment choisir entrepreneur drain français, comment vérifier licence RBQ, comment lire soumission excavation, qu'est-ce qu'un drain français BNQ, c'est quoi imperméabilisation extérieure, " +
			// COMPÉTITION — superlatives
			"#1 drain français Québec, #1 excavation Montréal, premier excavation Québec, expert excavation Québec, expert drain français, spécialiste drain français Québec, spécialiste fondation Montréal, spécialiste fissure fondation, professionnel excavation, professionnel drain français, contracteur fiable Québec, entrepreneur réputé Montréal, entreprise familiale excavation, entreprise locale Québec, propriétaire entrepreneur, " +
			// AUTRES SERVICES connexes
			"drain de bain, drainage gazon, drainage cour, drainage terrain golf, drainage stationnement, drainage commercial, drainage agricole, drainage parc, infrastructure drainage, gestion eaux pluviales, bassin de rétention, fosse de retenue, puits absorbant, puits perdu, " +
			// DRAIN FRANÇAIS — étapes installation
			"étapes installation drain français, processus installation drain français, durée installation drain français, temps installation drain français, jours installation drain français, équipe installation drain français, machinerie installation drain français, " +
			// PRIX — variations
			"combien coûte drain français 2000 pieds carrés, combien coûte drain français maison 25 pieds, prix drain français maison standard Québec, prix drain français maison de ville, prix drain français bungalow, prix drain français cottage, prix drain français duplex, prix drain français triplex, prix drain français quatre saisons, prix réparation drain français Québec, prix débouchage drain français, prix inspection caméra drain français, " +
			// FOURNISSEURS / PARTENAIRES
			"Soprema membrane, BMR matériaux, Patrick Morin matériaux, Réno-Dépôt matériaux, Home Depot Québec, Lowes Québec, IPL drain, Soleno drain, Big O drain, Réseau pluvial Québec, raccordement aqueduc Québec, Vitogaz, Énergir gaz, Hydro-Québec ligne, " +
			// MOTS-CLÉS visuels (image search)
			"photo drain français installation, image drain français Québec, vidéo installation drain français, photo excavation Montréal, photo réparation fissure fondation, image avant après drain français, photo machinerie excavation, photo équipe excavation, " +
			// AUDIENCE — propriétaires
			"propriétaire maison Québec, propriétaire condo Montréal, propriétaire chalet Laurentides, premier acheteur maison Québec, vendeur maison Québec, courtier immobilier Québec, agent immobilier Montréal, inspecteur en bâtiment, conseiller hypothécaire, " +
			// MOTS DERIVED — gestion eau pluviale
			"gestion durable eau pluviale, infiltration eau pluviale, ruissellement, ruissellement urbain, infiltration au sol, débordement printanier, fonte des neiges, accumulation eau, mare eau cour, flaque permanente cour, " +
			// PROBLÈMES SPÉCIFIQUES
			"odeur égout dans maison, odeur soufre maison, gaz soufre sous-sol, méthane sous-sol, eau qui remonte par les drains, eau dans sous-sol après pluie, eau sous-sol après dégel, sous-sol inondé après orage, refoulement après pluie forte, refoulement après orage, refoulement bain, refoulement toilette, refoulement évier, refoulement laveuse, " +
			// SECTEURS commerciaux
			"excavation immeuble commercial, excavation immeuble locatif, excavation centre commercial, excavation école, excavation hôpital, excavation municipalité, excavation infrastructure publique, excavation parc municipal, excavation aréna, excavation centre communautaire, drain français commercial Québec, drain français industriel Québec, drain français bâtiment commercial, " +
			// VOISINAGES MONTRÉAL
			"excavation Plateau Mont-Royal, excavation Mile End, excavation Rosemont, excavation Hochelaga-Maisonneuve, excavation Villeray, excavation Petite-Patrie, excavation Ahuntsic, excavation Cartierville, excavation Ville-Marie, excavation Côte-des-Neiges, excavation Notre-Dame-de-Grâce, excavation Sud-Ouest, excavation Pointe-Saint-Charles, excavation Saint-Henri, excavation Verdun arrondissement, excavation Lachine, excavation LaSalle arrondissement, excavation Saint-Léonard, excavation Saint-Michel, excavation Mercier, excavation Pierrefonds, excavation Roxboro, excavation L'Île-Bizard, excavation Sainte-Geneviève, drain français Plateau Mont-Royal, drain français Rosemont, drain français Hochelaga, drain français Villeray, drain français Ahuntsic, drain français NDG, drain français Lachine, drain français Saint-Léonard, drain français Mercier, drain français Pierrefonds, " +
			// CODES POSTAUX (geo-targeting)
			"excavation H1, excavation H2, excavation H3, excavation H4, excavation H7, excavation H8, excavation H9, drain français H1, drain français H2, drain français H3, drain français H4, drain français H7, drain français H8, drain français H9, fondation Montréal H, " +
			// SERVICES connexes — autres
			"travaux de pelle mécanique, opérateur pelle mécanique certifié, opérateur excavatrice expérimenté, contracteur creusage, creusage tranchée, creusage piscine prix, creusage cave, creusage vide sanitaire, creusage roc, dynamitage roc Québec, sciage béton, perçage béton, " +
			// MAÇONNERIE
			"maçonnerie Québec, maçonnerie Montréal, réparation brique fondation, scellage brique, briquetage Montréal, parement extérieur, crépi fondation, crépi extérieur, " +
			// EXCAVATION INDUSTRIELLE
			"excavation chantier construction, excavation parc industriel, excavation entrepôt, excavation bâtiment industriel, excavation usine, excavation manufacture, excavation entreposage, excavation parking commercial, excavation sous-sol commercial, excavation immeuble bureau, " +
			// PROJETS RÉSIDENTIELS
			"projet rénovation maison, rénovation sous-sol, finition sous-sol, agrandissement maison Québec, ajout étage, deuxième étage maison, sous-sol habitable, conversion sous-sol logement, basement legal Québec, sous-sol locatif Québec, conversion duplex, conversion triplex, " +
			// CONFORMITÉ / NORMES BNQ
			"norme BNQ 3624-115, norme BNQ drain français, norme NQ drain, norme drain Québec, certification BNQ drain, certification drain français Québec, BNQ NQ 3624-115-115, BNQ 3624 conforme, drain conforme code Québec, drain conforme municipalité, " +
			// PROFONDEUR / SPECS
			"profondeur drain français standard, drain français 4 pieds, drain français 5 pieds, drain français 6 pieds, drain français 8 pieds, drain français 10 pieds, drain français hors gel, drain français sous gelée, hauteur drain semelle fondation, " +
			// TYPES DE PROBLÈMES PAR SAISON
			"infiltration printemps fonte neige, infiltration automne pluie, infiltration hiver gel, infiltration été orage, dégât d'eau printemps, dégât eau automne, urgence inondation printemps, urgence dégât eau, " +
			// COMPARAISONS — types de drain
			"drain français vs drain pluvial, drain français vs drain sanitaire, drain français vs membrane, drain extérieur vs drain intérieur, drain BNQ vs drain standard, drain perforé vs drain rigide, " +
			// MATÉRIAUX SPÉCIFIQUES
			"pierre nette concassée, pierre nette 3/4, pierre concassée 0-3/4, gravier roulé, sable filtrant, géotextile non-tissé, géotextile tissé, géotextile drain, drain en PVC, drain en polyéthylène, drain BNQ flexible, tuyau BNQ, raccord PVC, raccord plomberie, ABS plomberie, " +
			// AUTRES BUSINESS LINKS
			"entrepreneur paysagiste excavation, paysagement résidentiel, paysagement commercial, aménagement piscine creusée, installation piscine creusée prix, installation piscine creusée Québec, " +
			// EXCAVATION ÉTÉ — INVERNO ESPECÍFICO
			"excavation chaude saison, excavation période sec, excavation après dégel printanier, excavation septembre octobre, excavation avant gel, excavation novembre, excavation pré-hiver, " +
			// SAFETY / SÉCURITÉ
			"excavation sécuritaire, excavation respect normes CNESST, sécurité chantier excavation, EPI excavation, formation sécurité excavation, prévention accidents excavation, excavation sans danger, " +
			// COMPETITIVE — comparatif marché
			"excavation Québec vs Montréal, prix moyen drain français Québec, statistiques drain français Québec, étude marché excavation Québec, demande drain français croissante, " +
			// COMMUNAUTÉ / RÉSEAUX
			"recommandation drain français Québec, témoignage drain français, avis Google drain français Montréal, photos avant après drain français, vidéo travaux drain français Québec, " +
			// SUB-CIUDADES NIVEL 3 (small towns Quebec)
			"excavation Saint-Constant, excavation Sainte-Catherine, excavation Mercier ville, excavation Saint-Philippe, excavation Saint-Mathieu, excavation Léry, excavation Mercier rive-sud, excavation Delson, excavation Saint-Isidore, excavation Hemmingford, excavation Saint-Rémi, excavation Sainte-Madeleine, excavation Saint-Liboire, excavation Acton Vale, excavation Sorel-Tracy, excavation Saint-Joseph-du-Lac, excavation Pointe-Calumet, excavation Deux-Montagnes, excavation Rosemère, excavation Lorraine, excavation Bois-des-Filion, excavation Saint-François, excavation Pont-Rouge, excavation Donnacona, excavation Saint-Augustin, excavation Sainte-Foy, excavation Sillery, excavation Lévis, excavation Charlesbourg, excavation Beauport, excavation Limoilou, excavation Cap-Rouge, excavation Loretteville, excavation Val-Bélair, excavation Stoneham, excavation Lac-Beauport, excavation Lac-Saint-Charles, excavation Magog, excavation Bromont, excavation Cowansville, excavation Sutton, excavation Saint-Sauveur, excavation Morin-Heights, excavation Val-David, excavation Val-Morin, excavation Saint-Donat, excavation Mont-Laurier, excavation Sainte-Anne-des-Plaines, excavation Saint-Lin-Laurentides, excavation Saint-Calixte, excavation Notre-Dame-des-Prairies, excavation Saint-Charles-Borromée, excavation Saint-Côme, excavation Rawdon, excavation Crabtree, excavation Sainte-Marthe-sur-le-Lac, excavation Pointe-Calumet, " +
			// PROBLÉMATIQUES SPÉCIFIQUES PAR ÂGE DE MAISON
			"drain français maison 1950, drain français maison 1960, drain français maison 1970, drain français maison 1980, drain français maison 1990, drain français maison 2000, drain français maison récente, drain français maison ancienne Québec, fondation maison ancienne, fondation maison patrimoniale, rénovation drain français maison ancienne, mise aux normes drain français, mise à jour drain français, " +
			// MOTS-CLÉS COMPARATIFS
			"avant et après drain français, étude de cas drain français, projet drain français Québec, témoignage client drain français, success story drain français, " +
			// ALERTES / SIGNAUX
			"signe précurseur fissure fondation, signe alerte drain français, alerte infiltration eau, alerte humidité sous-sol, signe drain français à remplacer, signe drain français à inspecter, " +
			// MARQUES PARTENAIRES
			"béton fini Québec, béton préfabriqué, fournisseur béton Québec, transport béton Montréal, livraison béton Laval, béton expédié à pied d'œuvre, " +
			// MOTS DERIVATIVE
			"infiltrer eau, infiltrer humidité, infiltrer sous-sol, étanchéifier fondation, étanchéifier sous-sol, sécher sous-sol humide, ventiler sous-sol, déshumidifier sous-sol, isolation sous-sol après imperméabilisation, isolation extérieure fondation, " +
			// LICENCES PROFESSIONNELLES
			"licence excavation Québec, licence opérateur machinerie lourde, certification excavateur Québec, formation opérateur excavatrice, école excavation Québec, métier excavation, métier excavateur, carrière excavation Québec, " +
			// COMPATIBILITÉ ÉQUIPEMENTS
			"compatible piscine creusée, compatible piscine béton, compatible spa creusé, compatible jardinière, compatible terrasse béton, compatible patio pavé, " +
			// SERVICES SAISONNIERS PRINTEMPS
			"inspection drain printemps Québec, dégât eau printemps, urgence printemps drain, calcium drain printemps, redémarrage drain printemps, ouverture drain saison, " +
			// SERVICES SAISONNIERS AUTOMNE
			"inspection drain automne, préparation hiver drain, fermeture drain automne, hivernage drain, vidange drain automne, sécurisation drain hiver, " +
			// AUTRES VARIATIONS BRAND
			"Mini-Excavations Érable, Excavations-Erable, Mini Excavations Erable Quebec, Mini-Excavations Érable Inc, Erable Excavation, Excavation Érable Montréal, mini exc érable, mini-exc érable, " +
			// MOTS LONG-TAIL HYPER-SPÉCIFIQUES
			"qui fait drain français près de moi, où trouver entrepreneur drain français, comment contacter excavation Québec, à qui demander soumission drain français, comparer prix drain français Québec, soumissions multiples drain français, plusieurs soumissions drain français, " +
			// PIPELINE / TRAVAUX SPÉCIFIQUES
			"raccordement plomberie eau pluviale, raccordement plomberie sanitaire, séparateur eau pluviale eau sanitaire, raccordement eau pluviale rue, raccordement égout pluvial municipal, branchement eau aqueduc municipal, déconnexion gouttières égout, redirection gouttières, raccordement extension drain, raccordement réservoir eau pluviale, raccordement baril récupération eau, " +
			// PISCINE TRAVAUX
			"installation piscine creusée Québec, prix installation piscine creusée Québec, excavation piscine creusée prix Québec, installation piscine creusée Montréal, installation piscine creusée Laval, excavation piscine béton coulé, excavation piscine béton préfabriqué, excavation piscine fibre de verre Québec, démolition vieille piscine Québec, fermeture piscine creusée, démantèlement piscine creusée, retrait piscine creusée, " +
			// AGRANDISSEMENT MAISON
			"excavation pour agrandissement maison, excavation ajout étage maison, excavation pour annexe maison, excavation deuxième étage, excavation rallonge maison, fondation pour agrandissement, fondation rallonge maison, fondation extension maison Québec, " +
			// COMMERCIAL OFFICE BUILDINGS
			"excavation immeuble bureaux Montréal, excavation immeuble bureaux Québec, excavation édifice bureaux, excavation tour de bureaux, excavation édifice gouvernemental, excavation édifice public Québec, excavation pavillon, " +
			// MUNICIPAL / PUBLIC WORKS
			"excavation pour ville, sous-traitant ville Montréal, sous-traitant ville Québec, sous-traitant ville Laval, contracteur agréé ville, contrat municipal excavation, appel offres excavation municipal, soumission appel offres ville, " +
			// SOUS-CATÉGORIES SOLAGE
			"réparation solage Québec, réparation solage maison ancienne, ré-ancrage solage, sous-pinage solage, retrait crawl space, conversion crawl space sous-sol, augmentation hauteur sous-sol, abaissement sous-sol Québec, sous-pinage maison, soulèvement maison Québec, levage maison fondation, " +
			// PROBLÉMATIQUES POMPE PUISARD
			"pompe puisard ne démarre pas, pompe puisard tourne sans arrêt, pompe puisard inondée, pompe puisard fait du bruit, pompe puisard 1/3 HP, pompe puisard 1/2 HP, pompe puisard submersible, pompe puisard sur batterie, pompe puisard backup AC DC, alarme pompe puisard, capteur niveau eau, pompe puisard alimentation autonome, " +
			// COULEURS / TEINTES
			"béton standard, béton coloré, béton imprimé, asphalte couleur, pavé uni couleur, " +
			// ENJEUX 2026 SPECIFICS
			"changement climatique excavation Québec, intempéries extrêmes Québec, pluies torrentielles Québec, ouragan Québec, tempête Québec, infiltration cause changement climatique, " +
			// EQUIPEMENT MARQUES
			"Bobcat E35, Bobcat E26, Kubota KX040, Kubota U17, Caterpillar 305, Caterpillar 308, JCB 8035, Volvo EC15, mini-pelle Bobcat Québec, location Bobcat Montréal, location Kubota Québec, " +
			// PROCESSUS COMPLET
			"étape par étape installation drain français, processus complet excavation, déroulement projet drain français, plan installation drain français, planification drain français, conception drain français, ingénieur drain français Québec, plan ingénieur drain, " +
			// LIENS BLOG / EDUCATION
			"guide drain français Québec, guide installation drain français, guide réparation fissure, blog excavation Québec, blog drain français Montréal, articles excavation Québec, ressources drain français, conseils excavation, tutoriel drain français, ",
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
			"best french drain company Quebec, best excavation company Montreal, top excavation Quebec, top french drain Laval, who to call clogged french drain, who to call basement flooding, who to call drain emergency, cheap french drain contractor, fast french drain quote, free 24h excavation quote, transferable french drain warranty, french drain new home, french drain old home, french drain renovation, " +
			// Excavation by terrain type
			"rock excavation, rocky terrain excavation, clay excavation, sand excavation, gravel excavation, difficult terrain excavation, sloped terrain excavation, flood-prone terrain excavation, wet terrain excavation, dry terrain excavation, front yard excavation, backyard excavation, side yard excavation, driveway excavation, main entrance excavation, around pool excavation, around foundation excavation, " +
			// Excavation by project
			"excavation for pool, excavation for spa, excavation for foundation, excavation for detached garage, excavation for shed, excavation for patio, excavation for terrace, excavation for gazebo, excavation for pergola, excavation for retaining wall, excavation for fountain, excavation for pond, excavation for tree, excavation for roots, excavation for gas line, excavation for electrical line, excavation for water line, excavation for fiber optic, excavation for cabling, " +
			// Drainage other types
			"storm drain Quebec, roof drain, gutter drain, balcony drain, terrace drain, yard drain, parking drain, industrial drain, agricultural drain installation, foundation drain, perforated drain, rigid drain, flexible drain, BNQ drain, BNQ certified drain, BNQ 3624-115 compliant drain, new BNQ drain, " +
			// Drainage problems
			"smelly drain, stinky drain, drain bad odor, drain backflow, drain overflow, mud-filled drain, root-filled drain, roots in drain, root-clogged drain, dirt-clogged drain, sediment-clogged drain, saturated drain, drain not working, ineffective drain, damaged drain, collapsed drain, sunken drain, punctured drain, cracked drain, rusted drain, " +
			// Foundation detailed types
			"concrete foundation, reinforced concrete foundation, pile foundation, screw pile foundation, mat foundation, slab foundation, post foundation, mobile home foundation, cottage foundation, three-season cottage foundation, four-season cottage foundation, foundation wall, concrete foundation wall, foundation footing, foundation slab, standard foundation height Quebec, foundation depth Quebec, frost-resistant foundation, freeze-thaw foundation, flood foundation, foundation heaving, foundation settling, bulged foundation, sunken foundation, deformed foundation, foundation to redo, " +
			// Humidity / water
			"basement humidity, basement humidity cause, basement humidity solution, foundation humidity, concrete wall humidity, basement condensation, basement mold, concrete wall mold, mold cause, mold danger, basement water, water in basement, flooded basement, wet basement, damp basement, smelly basement, basement water damage, foundation water damage, floor infiltration, wall infiltration, basement corner infiltration, basement window infiltration, garage door infiltration, " +
			// Specialized equipment
			"hydraulic excavation, hydrovac excavation, hydrovac Montreal, hydrovac Quebec, vacuum excavation, suction excavation, vacuum truck, localized excavation, precise excavation, manual excavation shovel, hand digging, no-damage excavation, excavation near electrical line, excavation near gas, excavation around tree roots, " +
			// Detailed certifications
			"RBQ excavation contractor license, RBQ category 2.5 excavation, RBQ category 1.4 masonry, RBQ insured, GCR residential construction warranty, GCR new home, residential construction guarantee, ACQ Quebec construction association, CCQ certified worker, CCQ excavation card, CNESST coverage, CNESST insurance, civil liability insurance 2 million, civil liability insurance 5 million, " +
			// Voice search questions
			"how to install french drain, how to repair foundation crack, how to waterproof basement, how to know if french drain is clogged, how much does french drain cost in Quebec, how much does excavation cost, how much does garage demolition cost, what is the best french drain, what is the lifespan of french drain, how deep to install french drain, does french drain need maintenance, does french drain get clogged, when to replace french drain, " +
			// Municipal / regulations
			"Montreal excavation permit, Laval excavation permit, Quebec excavation permit, Montreal demolition permit, Quebec demolition permit, municipal excavation regulations, Quebec excavation regulations, Quebec construction code, Quebec plumbing code, Quebec drainage code, municipal compliance, municipal drain inspection, survey plan, location plan, location certificate, " +
			// Seasonal / climate
			"spring excavation, summer excavation, fall excavation, winter excavation, spring french drain, Quebec winter french drain, winter freeze french drain, freeze-thaw damage, foundation freeze-thaw cycle, foundation frost damage, drain freeze prevention, drain calcium chloride, winter drain salt, snow removal before excavation, " +
			// FAQ format
			"what to do if my basement is flooded, what to do if french drain clogged, what to do if foundation crack appears, what to do if I see water in basement, how to find good excavation company, how to choose french drain contractor, how to verify RBQ license, how to read excavation quote, what is BNQ french drain, what is exterior waterproofing, " +
			// Competition superlatives
			"#1 french drain Quebec, #1 excavation Montreal, premier excavation Quebec, expert excavation Quebec, expert french drain, french drain specialist Quebec, foundation specialist Montreal, foundation crack specialist, professional excavation, professional french drain, reliable contractor Quebec, reputable contractor Montreal, family-owned excavation business, local Quebec business, owner-operated contractor, " +
			// Other related services
			"bath drain, lawn drainage, yard drainage, golf course drainage, parking drainage, commercial drainage, agricultural drainage, park drainage, drainage infrastructure, stormwater management, retention basin, retention pit, soakaway, dry well, " +
			// Installation steps
			"french drain installation steps, french drain installation process, french drain installation duration, french drain installation time, french drain installation days, french drain installation team, french drain installation machinery, " +
			// Pricing variations
			"how much does french drain cost 2000 sq ft, french drain cost 25 ft house, standard Quebec home french drain price, townhouse french drain price, bungalow french drain price, cottage french drain price, duplex french drain price, triplex french drain price, four-season french drain price, Quebec french drain repair price, french drain unclog price, french drain camera inspection price, " +
			// Suppliers / partners
			"Soprema membrane, BMR materials, Patrick Morin materials, Reno-Depot materials, Home Depot Quebec, Lowes Quebec, IPL drain, Soleno drain, Big O drain, Quebec storm sewer, Quebec water main connection, Vitogaz, Energir gas, Hydro-Quebec line, " +
			// Visual keywords (image search)
			"french drain installation photo, Quebec french drain image, french drain installation video, Montreal excavation photo, foundation crack repair photo, before after french drain image, excavation machinery photo, excavation team photo, " +
			// Audience — homeowners
			"Quebec home owner, Montreal condo owner, Laurentians cottage owner, Quebec first-time home buyer, Quebec home seller, Quebec real estate broker, Montreal real estate agent, building inspector, mortgage advisor, " +
			// Stormwater management
			"sustainable stormwater management, stormwater infiltration, runoff, urban runoff, ground infiltration, spring overflow, snowmelt, water accumulation, yard puddle, permanent yard puddle, " +
			// Specific problems
			"sewer odor in house, sulfur smell house, sulfur gas basement, basement methane, water coming up through drains, basement water after rain, basement water after thaw, flooded basement after storm, backflow after heavy rain, backflow after storm, bath backflow, toilet backflow, sink backflow, washer backflow, " +
			// Commercial sectors
			"commercial building excavation, rental building excavation, mall excavation, school excavation, hospital excavation, municipality excavation, public infrastructure excavation, municipal park excavation, arena excavation, community center excavation, Quebec commercial french drain, Quebec industrial french drain, commercial building french drain, " +
			// MONTREAL NEIGHBORHOODS
			"excavation Plateau Mont-Royal, excavation Mile End, excavation Rosemont, excavation Hochelaga-Maisonneuve, excavation Villeray, excavation Petite-Patrie, excavation Ahuntsic, excavation Cartierville, excavation Ville-Marie, excavation Cote-des-Neiges, excavation Notre-Dame-de-Grace, excavation Sud-Ouest, excavation Pointe-Saint-Charles, excavation Saint-Henri, excavation Verdun borough, excavation Lachine, excavation LaSalle borough, excavation Saint-Leonard, excavation Saint-Michel, excavation Mercier, excavation Pierrefonds, excavation Roxboro, excavation Ile-Bizard, excavation Sainte-Genevieve, french drain Plateau Mont-Royal, french drain Rosemont, french drain Hochelaga, french drain Villeray, french drain Ahuntsic, french drain NDG, french drain Lachine, french drain Saint-Leonard, french drain Mercier, french drain Pierrefonds, " +
			// POSTAL CODES (geo targeting)
			"excavation H1, excavation H2, excavation H3, excavation H4, excavation H7, excavation H8, excavation H9, french drain H1, french drain H2, french drain H3, french drain H4, french drain H7, french drain H8, french drain H9, foundation Montreal H, " +
			// RELATED SERVICES
			"mechanical shovel work, certified mechanical shovel operator, experienced excavator operator, digging contractor, trench digging, pool digging price, cellar digging, crawl space digging, rock digging, Quebec rock blasting, concrete cutting, concrete drilling, " +
			// MASONRY
			"masonry Quebec, masonry Montreal, foundation brick repair, brick sealing, Montreal bricklaying, exterior cladding, foundation parging, exterior parging, " +
			// INDUSTRIAL EXCAVATION
			"construction site excavation, industrial park excavation, warehouse excavation, industrial building excavation, factory excavation, manufacturing excavation, storage excavation, commercial parking excavation, commercial basement excavation, office building excavation, " +
			// RESIDENTIAL PROJECTS
			"home renovation project, basement renovation, basement finishing, Quebec home extension, story addition, second floor addition, livable basement, basement to apartment conversion, Quebec legal basement, Quebec rental basement, duplex conversion, triplex conversion, " +
			// BNQ COMPLIANCE
			"BNQ 3624-115 standard, BNQ french drain standard, NQ drain standard, Quebec drain standard, BNQ drain certification, Quebec french drain certification, BNQ NQ 3624-115-115, BNQ 3624 compliant, Quebec code compliant drain, municipal compliant drain, " +
			// DEPTH SPECS
			"standard french drain depth, 4 feet french drain, 5 feet french drain, 6 feet french drain, 8 feet french drain, 10 feet french drain, frost-resistant french drain, sub-frost french drain, drain height foundation footing, " +
			// SEASONAL PROBLEMS
			"spring snowmelt infiltration, fall rain infiltration, winter freeze infiltration, summer storm infiltration, spring water damage, fall water damage, spring flooding emergency, water damage emergency, " +
			// DRAIN COMPARISONS
			"french drain vs storm drain, french drain vs sanitary drain, french drain vs membrane, exterior drain vs interior drain, BNQ drain vs standard drain, perforated drain vs rigid drain, " +
			// MATERIALS
			"crushed clean stone, 3/4 clean stone, 0-3/4 crushed stone, rolled gravel, filtering sand, non-woven geotextile, woven geotextile, drain geotextile, PVC drain, polyethylene drain, BNQ flexible drain, BNQ pipe, PVC fitting, plumbing fitting, ABS plumbing, " +
			// LANDSCAPING LINKS
			"landscaping excavation contractor, residential landscaping, commercial landscaping, in-ground pool landscaping, in-ground pool installation price, Quebec in-ground pool installation, " +
			// SEASONAL EXCAVATION
			"warm season excavation, dry period excavation, post-spring thaw excavation, September October excavation, pre-frost excavation, November excavation, pre-winter excavation, " +
			// SAFETY
			"safe excavation, CNESST compliant excavation, excavation site safety, excavation PPE, excavation safety training, excavation accident prevention, no-danger excavation, " +
			// MARKET COMPARISON
			"Quebec vs Montreal excavation, average french drain price Quebec, Quebec french drain statistics, Quebec excavation market study, growing french drain demand, " +
			// COMMUNITY
			"Quebec french drain recommendation, french drain testimonial, french drain Google reviews Montreal, french drain before after photos, Quebec french drain work video, " +
			// LEVEL 3 SUB-CITIES
			"excavation Saint-Constant, excavation Sainte-Catherine, excavation Mercier ville, excavation Saint-Philippe, excavation Saint-Mathieu, excavation Lery, excavation Mercier rive-sud, excavation Delson, excavation Saint-Isidore, excavation Hemmingford, excavation Saint-Remi, excavation Sainte-Madeleine, excavation Saint-Liboire, excavation Acton Vale, excavation Sorel-Tracy, excavation Saint-Joseph-du-Lac, excavation Pointe-Calumet, excavation Deux-Montagnes, excavation Rosemere, excavation Lorraine, excavation Bois-des-Filion, excavation Saint-Francois, excavation Pont-Rouge, excavation Donnacona, excavation Saint-Augustin, excavation Sainte-Foy, excavation Sillery, excavation Levis, excavation Charlesbourg, excavation Beauport, excavation Limoilou, excavation Cap-Rouge, excavation Loretteville, excavation Val-Belair, excavation Stoneham, excavation Lac-Beauport, excavation Lac-Saint-Charles, excavation Magog, excavation Bromont, excavation Cowansville, excavation Sutton, excavation Saint-Sauveur, excavation Morin-Heights, excavation Val-David, excavation Val-Morin, excavation Saint-Donat, excavation Mont-Laurier, excavation Sainte-Anne-des-Plaines, excavation Saint-Lin-Laurentides, excavation Saint-Calixte, excavation Notre-Dame-des-Prairies, excavation Saint-Charles-Borromee, excavation Saint-Come, excavation Rawdon, excavation Crabtree, excavation Sainte-Marthe-sur-le-Lac, " +
			// AGE-SPECIFIC
			"french drain 1950 home, french drain 1960 home, french drain 1970 home, french drain 1980 home, french drain 1990 home, french drain 2000 home, french drain new home, french drain old Quebec home, old foundation, heritage foundation, old home french drain renovation, french drain code update, " +
			// PIPELINE
			"stormwater plumbing connection, sanitary plumbing connection, stormwater sanitary separator, stormwater street connection, municipal storm sewer connection, municipal water main connection, gutter sewer disconnection, gutter redirection, drain extension connection, rainwater tank connection, water collection barrel connection, " +
			// POOL WORK
			"in-ground pool installation Quebec, in-ground pool installation price Quebec, in-ground pool excavation price Quebec, in-ground pool installation Montreal, in-ground pool installation Laval, poured concrete pool excavation, precast concrete pool excavation, fiberglass pool excavation Quebec, old pool demolition Quebec, in-ground pool closing, in-ground pool dismantling, in-ground pool removal, " +
			// HOME EXTENSION
			"excavation for home extension, excavation for story addition, excavation for home annex, excavation for second floor, excavation for home extension, foundation for extension, foundation for home extension, foundation home extension Quebec, " +
			// COMMERCIAL OFFICE
			"office building excavation Montreal, office building excavation Quebec, office building excavation, office tower excavation, government building excavation, Quebec public building excavation, pavilion excavation, " +
			// MUNICIPAL
			"city excavation, Montreal city subcontractor, Quebec city subcontractor, Laval city subcontractor, certified city contractor, municipal excavation contract, municipal excavation tender, city tender quote, " +
			// FOOTING
			"Quebec footing repair, old home footing repair, footing re-anchoring, footing underpinning, crawl space removal, crawl space to basement conversion, basement height increase, Quebec basement lowering, house underpinning, Quebec house lifting, foundation house lifting, " +
			// SUMP PUMP PROBLEMS
			"sump pump won't start, sump pump runs continuously, flooded sump pump, noisy sump pump, 1/3 HP sump pump, 1/2 HP sump pump, submersible sump pump, battery sump pump, AC DC backup sump pump, sump pump alarm, water level sensor, autonomous sump pump power, " +
			// CLIMATE 2026
			"climate change Quebec excavation, extreme weather Quebec, torrential rain Quebec, Quebec hurricane, Quebec storm, climate change infiltration cause, " +
			// EQUIPMENT BRANDS
			"Bobcat E35, Bobcat E26, Kubota KX040, Kubota U17, Caterpillar 305, Caterpillar 308, JCB 8035, Volvo EC15, Quebec Bobcat mini-excavator, Montreal Bobcat rental, Quebec Kubota rental, " +
			// PROCESS
			"step by step french drain installation, complete excavation process, french drain project flow, french drain installation plan, french drain planning, french drain design, Quebec french drain engineer, drain engineer plan, " +
			// EDUCATION
			"Quebec french drain guide, french drain installation guide, crack repair guide, Quebec excavation blog, Montreal french drain blog, Quebec excavation articles, french drain resources, excavation tips, french drain tutorial, ",
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
			"mejor empresa drenaje francés Quebec, mejor empresa excavación Montreal, top excavación Quebec, top drenaje francés Laval, a quién llamar drenaje francés obstruido, a quién llamar inundación sótano, a quién llamar urgencia drenaje, contratista drenaje francés barato, cotización drenaje francés rápida, cotización excavación gratuita 24h, drenaje francés garantía transferible, drenaje francés casa nueva, drenaje francés casa antigua, drenaje francés renovación, " +
			// Excavación por tipo de terreno
			"excavación roca, excavación terreno rocoso, excavación arcilla, excavación arena, excavación grava, excavación terreno difícil, excavación terreno inclinado, excavación terreno inundable, excavación terreno húmedo, excavación terreno seco, excavación patio frontal, excavación patio trasero, excavación patio lateral, excavación entrada coche, excavación entrada principal, excavación alrededor piscina, excavación alrededor cimientos, " +
			// Excavación por proyecto
			"excavación para piscina, excavación para spa, excavación para cimientos, excavación para garaje aislado, excavación para cobertizo, excavación para patio, excavación para terraza, excavación para gazebo, excavación para pérgola, excavación para muro contención, excavación para fuente, excavación para estanque, excavación para árbol, excavación para raíces, excavación para línea gas, excavación para línea eléctrica, excavación para línea agua, excavación para fibra óptica, excavación para cableado, " +
			// Drenaje otros tipos
			"drenaje pluvial Quebec, drenaje techo, drenaje canalón, drenaje balcón, drenaje terraza, drenaje patio, drenaje estacionamiento, drenaje industrial, instalación drenaje agrícola, drenaje cimientos, drenaje perforado, drenaje rígido, drenaje flexible, drenaje BNQ, drenaje certificado BNQ, drenaje conforme BNQ 3624-115, drenaje BNQ nuevo, " +
			// Problemas drenaje
			"drenaje huele, drenaje apesta, drenaje mal olor, drenaje refluye, drenaje desborda, drenaje lleno barro, drenaje lleno raíces, raíces en drenaje, drenaje obstruido raíces, drenaje obstruido tierra, drenaje obstruido sedimentos, drenaje saturado, drenaje no funciona, drenaje ineficaz, drenaje dañado, drenaje colapsado, drenaje hundido, drenaje perforado, drenaje agrietado, drenaje oxidado, " +
			// Cimientos detallados
			"cimientos concreto, cimientos concreto reforzado, cimientos pilotes, cimientos pilotes atornillados, cimientos losa, cimientos losa de concreto, cimientos pilares, cimientos casa móvil, cimientos cabaña, cimientos cabaña tres estaciones, cimientos cabaña cuatro estaciones, muro de cimientos, muro de cimientos concreto, zapata cimientos, losa cimientos, altura cimientos estándar Quebec, profundidad cimientos Quebec, cimientos resistente al hielo, cimientos hielo-deshielo, cimientos inundación, cimientos levantamiento, cimientos asentamiento, cimientos abultados, cimientos hundidos, cimientos deformados, cimientos a rehacer, " +
			// Humedad / agua
			"humedad sótano, humedad sótano causa, humedad sótano solución, humedad cimientos, humedad muro concreto, condensación sótano, moho sótano, moho muro concreto, moho causa, moho peligro, agua sótano, agua en sótano, sótano inundado, sótano mojado, sótano húmedo, sótano huele, daño agua sótano, daño agua cimientos, infiltración piso, infiltración muro, infiltración esquina sótano, infiltración ventana sótano, infiltración puerta garaje, " +
			// Equipo especializado
			"excavación hidráulica, excavación hidrovac, hidrovac Montreal, hidrovac Quebec, excavación al vacío, excavación por succión, camión vacuum, excavación localizada, excavación precisa, excavación manual pala, excavación a mano, excavación sin daños, excavación cerca línea eléctrica, excavación cerca gas, excavación alrededor raíces árbol, " +
			// Certificaciones detalladas
			"licencia RBQ contratista excavación, RBQ categoría 2.5 excavación, RBQ categoría 1.4 mampostería, RBQ asegurado, GCR garantía construcción residencial, GCR casa nueva, garantía construcción residencial, ACQ Asociación construcción Quebec, CCQ trabajador certificado, tarjeta CCQ excavación, CNESST cobertura, CNESST seguro, seguro responsabilidad civil 2 millones, seguro responsabilidad civil 5 millones, " +
			// Preguntas búsqueda voz
			"cómo instalar drenaje francés, cómo reparar grieta cimientos, cómo impermeabilizar sótano, cómo saber si drenaje francés está obstruido, cuánto cuesta drenaje francés en Quebec, cuánto cuesta excavación, cuánto cuesta demolición garaje, cuál es el mejor drenaje francés, cuál es la vida útil del drenaje francés, qué tan profundo instalar drenaje francés, drenaje francés necesita mantenimiento, drenaje francés se obstruye, cuándo reemplazar drenaje francés, " +
			// Municipal / regulación
			"permiso excavación Montreal, permiso excavación Laval, permiso excavación Quebec, permiso demolición Montreal, permiso demolición Quebec, regulación municipal excavación, regulación excavación Quebec, código construcción Quebec, código plomería Quebec, código drenaje Quebec, conformidad municipal, inspección municipal drenaje, plano levantamiento, plano localización, certificado localización, " +
			// Estacional / clima
			"excavación primavera, excavación verano, excavación otoño, excavación invierno, drenaje francés primavera, drenaje francés invierno Quebec, drenaje francés congelado invierno, daño hielo-deshielo, ciclo hielo-deshielo cimientos, daños hielo cimientos, prevención hielo drenaje, cloruro calcio drenaje, sal drenaje invierno, retiro nieve antes excavación, " +
			// Formato FAQ
			"qué hacer si mi sótano está inundado, qué hacer si drenaje francés obstruido, qué hacer si grieta cimientos aparece, qué hacer si veo agua en sótano, cómo encontrar buena empresa excavación, cómo elegir contratista drenaje francés, cómo verificar licencia RBQ, cómo leer cotización excavación, qué es drenaje francés BNQ, qué es impermeabilización exterior, " +
			// Superlativos
			"#1 drenaje francés Quebec, #1 excavación Montreal, primera excavación Quebec, experto excavación Quebec, experto drenaje francés, especialista drenaje francés Quebec, especialista cimientos Montreal, especialista grietas cimientos, profesional excavación, profesional drenaje francés, contratista confiable Quebec, contratista reputado Montreal, empresa familiar excavación, empresa local Quebec, propietario contratista, " +
			// Otros servicios
			"drenaje baño, drenaje césped, drenaje patio, drenaje campo golf, drenaje estacionamiento, drenaje comercial, drenaje agrícola, drenaje parque, infraestructura drenaje, gestión aguas pluviales, cuenca retención, fosa retención, pozo absorción, pozo perdido, " +
			// Etapas instalación
			"etapas instalación drenaje francés, proceso instalación drenaje francés, duración instalación drenaje francés, tiempo instalación drenaje francés, días instalación drenaje francés, equipo instalación drenaje francés, maquinaria instalación drenaje francés, " +
			// Variaciones de precio
			"cuánto cuesta drenaje francés 2000 pies cuadrados, drenaje francés casa 25 pies, precio drenaje francés casa estándar Quebec, precio drenaje francés casa adosada, precio drenaje francés bungalow, precio drenaje francés casa de campo, precio drenaje francés dúplex, precio drenaje francés tríplex, precio drenaje francés cuatro estaciones, precio reparación drenaje francés Quebec, precio desbloqueo drenaje francés, precio inspección cámara drenaje francés, " +
			// Audiencia
			"propietario casa Quebec, propietario condominio Montreal, propietario cabaña Laurentides, primer comprador casa Quebec, vendedor casa Quebec, agente bienes raíces Quebec, agente inmobiliario Montreal, inspector edificios, asesor hipotecario, " +
			// Manejo aguas pluviales
			"gestión sostenible agua pluvial, infiltración agua pluvial, escurrimiento, escurrimiento urbano, infiltración suelo, desbordamiento primavera, deshielo nieve, acumulación agua, charco agua patio, charco permanente patio, " +
			// Problemas específicos
			"olor alcantarillado en casa, olor azufre casa, gas azufre sótano, metano sótano, agua sube por drenajes, agua sótano después lluvia, agua sótano después deshielo, sótano inundado después tormenta, reflujo después lluvia fuerte, reflujo después tormenta, reflujo bañera, reflujo inodoro, reflujo lavabo, reflujo lavadora, " +
			// Sectores comerciales
			"excavación edificio comercial, excavación edificio alquiler, excavación centro comercial, excavación escuela, excavación hospital, excavación municipalidad, excavación infraestructura pública, excavación parque municipal, excavación arena, excavación centro comunitario, drenaje francés comercial Quebec, drenaje francés industrial Quebec, drenaje francés edificio comercial, " +
			// Equivalentes francófonos para hispanohablantes en Quebec
			"drain francais Quebec, drain francais Montreal, mini excavation Quebec, mini excavation Montreal, RBQ Quebec, certificacion RBQ, garantie 15 ans Quebec, " +
			// VECINDARIOS MONTREAL
			"excavación Plateau Mont-Royal, excavación Mile End, excavación Rosemont, excavación Hochelaga-Maisonneuve, excavación Villeray, excavación Petite-Patrie, excavación Ahuntsic, excavación Cartierville, excavación Ville-Marie, excavación Côte-des-Neiges, excavación Notre-Dame-de-Grâce, excavación Sud-Ouest, excavación Pointe-Saint-Charles, excavación Saint-Henri, excavación Verdun, excavación Lachine, excavación LaSalle, excavación Saint-Léonard, excavación Saint-Michel, excavación Mercier, excavación Pierrefonds, excavación Roxboro, excavación L'Île-Bizard, drenaje francés Plateau Mont-Royal, drenaje francés Rosemont, drenaje francés Hochelaga, drenaje francés Villeray, drenaje francés Ahuntsic, drenaje francés NDG, drenaje francés Lachine, drenaje francés Saint-Léonard, drenaje francés Mercier, drenaje francés Pierrefonds, " +
			// CÓDIGOS POSTALES
			"excavación H1, excavación H2, excavación H3, excavación H4, excavación H7, excavación H8, excavación H9, drenaje francés H1, drenaje francés H2, drenaje francés H3, drenaje francés H4, drenaje francés H7, drenaje francés H8, drenaje francés H9, cimientos Montreal H, " +
			// SERVICIOS RELACIONADOS
			"trabajo pala mecánica, operador pala mecánica certificado, operador excavadora experimentado, contratista excavación, excavación zanja, excavación piscina precio, excavación bodega, excavación espacio gateo, excavación roca, voladura roca Quebec, corte concreto, perforación concreto, " +
			// ALBAÑILERÍA
			"albañilería Quebec, albañilería Montreal, reparación ladrillo cimientos, sellado ladrillo, albañilería Montreal, revestimiento exterior, enlucido cimientos, enlucido exterior, " +
			// EXCAVACIÓN INDUSTRIAL
			"excavación obra construcción, excavación parque industrial, excavación bodega, excavación edificio industrial, excavación fábrica, excavación manufactura, excavación almacenamiento, excavación estacionamiento comercial, excavación sótano comercial, excavación edificio oficinas, " +
			// PROYECTOS RESIDENCIALES
			"proyecto renovación casa, renovación sótano, acabado sótano, ampliación casa Quebec, agregar piso, segundo piso casa, sótano habitable, conversión sótano apartamento, sótano legal Quebec, sótano alquiler Quebec, conversión dúplex, conversión tríplex, " +
			// CONFORMIDAD BNQ
			"norma BNQ 3624-115, norma BNQ drenaje francés, norma NQ drenaje, norma drenaje Quebec, certificación BNQ drenaje, certificación drenaje francés Quebec, BNQ NQ 3624-115-115, BNQ 3624 conforme, drenaje conforme código Quebec, drenaje conforme municipalidad, " +
			// PROFUNDIDAD
			"profundidad drenaje francés estándar, drenaje francés 4 pies, drenaje francés 5 pies, drenaje francés 6 pies, drenaje francés 8 pies, drenaje francés 10 pies, drenaje francés resistente hielo, drenaje francés bajo helada, altura drenaje zapata cimientos, " +
			// PROBLEMAS ESTACIONALES
			"infiltración primavera deshielo, infiltración otoño lluvia, infiltración invierno hielo, infiltración verano tormenta, daño agua primavera, daño agua otoño, urgencia inundación primavera, urgencia daño agua, " +
			// COMPARACIONES
			"drenaje francés vs drenaje pluvial, drenaje francés vs drenaje sanitario, drenaje francés vs membrana, drenaje exterior vs drenaje interior, drenaje BNQ vs drenaje estándar, drenaje perforado vs drenaje rígido, " +
			// MATERIALES
			"piedra limpia triturada, piedra limpia 3/4, piedra triturada 0-3/4, grava rodada, arena filtrante, geotextil no tejido, geotextil tejido, geotextil drenaje, drenaje PVC, drenaje polietileno, drenaje BNQ flexible, tubería BNQ, accesorio PVC, accesorio plomería, plomería ABS, " +
			// PAISAJISMO
			"contratista paisajismo excavación, paisajismo residencial, paisajismo comercial, paisajismo piscina enterrada, instalación piscina enterrada precio, instalación piscina enterrada Quebec, " +
			// EXCAVACIÓN ESTACIONAL
			"excavación estación cálida, excavación período seco, excavación post-deshielo primaveral, excavación septiembre octubre, excavación pre-hielo, excavación noviembre, excavación pre-invierno, " +
			// SEGURIDAD
			"excavación segura, excavación cumpliendo normas CNESST, seguridad obra excavación, EPI excavación, capacitación seguridad excavación, prevención accidentes excavación, excavación sin peligro, " +
			// MERCADO
			"Quebec vs Montreal excavación, precio promedio drenaje francés Quebec, estadísticas drenaje francés Quebec, estudio mercado excavación Quebec, demanda creciente drenaje francés, " +
			// COMUNIDAD
			"recomendación drenaje francés Quebec, testimonio drenaje francés, reseñas Google drenaje francés Montreal, fotos antes después drenaje francés, video trabajos drenaje francés Quebec, " +
			// SUB-CIUDADES NIVEL 3
			"excavación Saint-Constant, excavación Sainte-Catherine, excavación Mercier ville, excavación Saint-Philippe, excavación Saint-Mathieu, excavación Léry, excavación Mercier rive-sud, excavación Delson, excavación Saint-Isidore, excavación Hemmingford, excavación Saint-Rémi, excavación Sainte-Madeleine, excavación Saint-Liboire, excavación Acton Vale, excavación Sorel-Tracy, excavación Saint-Joseph-du-Lac, excavación Pointe-Calumet, excavación Deux-Montagnes, excavación Rosemère, excavación Lorraine, excavación Bois-des-Filion, excavación Saint-François, excavación Pont-Rouge, excavación Donnacona, excavación Saint-Augustin, excavación Sainte-Foy, excavación Sillery, excavación Lévis, excavación Charlesbourg, excavación Beauport, excavación Limoilou, excavación Cap-Rouge, excavación Loretteville, excavación Val-Bélair, excavación Stoneham, excavación Lac-Beauport, excavación Lac-Saint-Charles, excavación Magog, excavación Bromont, excavación Cowansville, excavación Sutton, excavación Saint-Sauveur, excavación Morin-Heights, excavación Val-David, excavación Val-Morin, excavación Saint-Donat, excavación Mont-Laurier, excavación Sainte-Anne-des-Plaines, excavación Saint-Lin-Laurentides, excavación Saint-Calixte, excavación Notre-Dame-des-Prairies, excavación Saint-Charles-Borromée, excavación Saint-Côme, excavación Rawdon, excavación Crabtree, excavación Sainte-Marthe-sur-le-Lac, " +
			// EDAD CASA
			"drenaje francés casa 1950, drenaje francés casa 1960, drenaje francés casa 1970, drenaje francés casa 1980, drenaje francés casa 1990, drenaje francés casa 2000, drenaje francés casa nueva, drenaje francés casa antigua Quebec, cimientos casa antigua, cimientos casa patrimonial, renovación drenaje francés casa antigua, actualización drenaje francés código, " +
			// PIPELINE
			"conexión plomería agua pluvial, conexión plomería sanitaria, separador agua pluvial agua sanitaria, conexión agua pluvial calle, conexión alcantarillado pluvial municipal, conexión agua acueducto municipal, desconexión canalones alcantarillado, redireccionamiento canalones, conexión extensión drenaje, conexión tanque agua pluvial, conexión barril recolección agua, " +
			// TRABAJOS PISCINA
			"instalación piscina enterrada Quebec, precio instalación piscina enterrada Quebec, excavación piscina enterrada precio Quebec, instalación piscina enterrada Montreal, instalación piscina enterrada Laval, excavación piscina concreto vertido, excavación piscina concreto prefabricado, excavación piscina fibra de vidrio Quebec, demolición vieja piscina Quebec, cierre piscina enterrada, desmantelamiento piscina enterrada, retiro piscina enterrada, " +
			// AMPLIACIÓN CASA
			"excavación para ampliación casa, excavación para agregar piso casa, excavación para anexo casa, excavación para segundo piso, excavación para extensión casa, cimientos para ampliación, cimientos para extensión casa, cimientos extensión casa Quebec, " +
			// MUNICIPAL
			"excavación para ciudad, subcontratista ciudad Montreal, subcontratista ciudad Quebec, subcontratista ciudad Laval, contratista certificado ciudad, contrato municipal excavación, licitación excavación municipal, cotización licitación ciudad, " +
			// SOLERA
			"reparación solera Quebec, reparación solera casa antigua, re-anclaje solera, recalzado solera, retiro espacio gateo, conversión espacio gateo a sótano, aumento altura sótano, descenso sótano Quebec, recalzado casa, levantamiento casa Quebec, levantamiento casa cimientos, " +
			// PROBLEMAS BOMBA
			"bomba sumidero no arranca, bomba sumidero funciona sin parar, bomba sumidero inundada, bomba sumidero hace ruido, bomba sumidero 1/3 HP, bomba sumidero 1/2 HP, bomba sumidero sumergible, bomba sumidero con batería, bomba sumidero respaldo AC DC, alarma bomba sumidero, sensor nivel agua, alimentación autónoma bomba sumidero, " +
			// CLIMA 2026
			"cambio climático excavación Quebec, clima extremo Quebec, lluvias torrenciales Quebec, huracán Quebec, tormenta Quebec, infiltración causa cambio climático, " +
			// MARCAS EQUIPO
			"Bobcat E35, Bobcat E26, Kubota KX040, Kubota U17, Caterpillar 305, Caterpillar 308, JCB 8035, Volvo EC15, mini-excavadora Bobcat Quebec, alquiler Bobcat Montreal, alquiler Kubota Quebec, " +
			// PROCESO
			"paso a paso instalación drenaje francés, proceso completo excavación, flujo proyecto drenaje francés, plan instalación drenaje francés, planificación drenaje francés, diseño drenaje francés, ingeniero drenaje francés Quebec, plan ingeniero drenaje, " +
			// EDUCACIÓN
			"guía drenaje francés Quebec, guía instalación drenaje francés, guía reparación grietas, blog excavación Quebec, blog drenaje francés Montreal, artículos excavación Quebec, recursos drenaje francés, consejos excavación, tutorial drenaje francés, ",
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
