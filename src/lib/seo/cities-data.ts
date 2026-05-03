// Datos geo para SEO local — cada ciudad genera una landing automáticamente
// Foco: Quebec / Montréal / Rive-Sud / Rive-Nord / Laurentides / Lanaudière / Montérégie

export type Lang = 'fr' | 'en' | 'es';

export interface CityData {
	slug: string;
	name: string;
	region: string;
	postalArea: string;
	lat: number;
	lng: number;
	population: number;
	keywords: { fr: string; en: string; es: string };
}

export const cities: CityData[] = [
	{
		slug: 'montreal',
		name: 'Montréal',
		region: 'Montréal',
		postalArea: 'H',
		lat: 45.5019,
		lng: -73.5674,
		population: 1762949,
		keywords: {
			fr: 'excavation Montréal, drain français Montréal, mini excavation Montréal, entrepreneur excavation Montréal, réparation fissure fondation Montréal, démolition Montréal, urgence excavation Montréal, infiltration eau sous-sol Montréal, refoulement égout Montréal',
			en: 'excavation Montreal, french drain Montreal, mini excavation Montreal, foundation crack repair Montreal, demolition Montreal, emergency excavation Montreal',
			es: 'excavación Montreal, drenaje francés Montreal, mini excavación Montreal, reparación grietas Montreal, demolición Montreal'
		}
	},
	{
		slug: 'laval',
		name: 'Laval',
		region: 'Laval',
		postalArea: 'H7',
		lat: 45.5697,
		lng: -73.7233,
		population: 437413,
		keywords: {
			fr: 'excavation Laval, drain français Laval, mini excavation Laval, réparation fissure Laval, démolition Laval, urgence excavation Laval, drainage Laval, fondation Laval',
			en: 'excavation Laval, french drain Laval, mini excavation Laval, foundation repair Laval, demolition Laval',
			es: 'excavación Laval, drenaje francés Laval, mini excavación Laval'
		}
	},
	{
		slug: 'longueuil',
		name: 'Longueuil',
		region: 'Montérégie',
		postalArea: 'J4',
		lat: 45.5312,
		lng: -73.5184,
		population: 254483,
		keywords: {
			fr: 'excavation Longueuil, drain français Longueuil, mini excavation Longueuil, réparation fissure Longueuil, démolition Longueuil',
			en: 'excavation Longueuil, french drain Longueuil',
			es: 'excavación Longueuil, drenaje francés Longueuil'
		}
	},
	{
		slug: 'brossard',
		name: 'Brossard',
		region: 'Montérégie',
		postalArea: 'J4',
		lat: 45.4587,
		lng: -73.4651,
		population: 91525,
		keywords: {
			fr: 'excavation Brossard, drain français Brossard, mini excavation Brossard, fondation Brossard',
			en: 'excavation Brossard, french drain Brossard',
			es: 'excavación Brossard'
		}
	},
	{
		slug: 'saint-jerome',
		name: 'Saint-Jérôme',
		region: 'Laurentides',
		postalArea: 'J7',
		lat: 45.7806,
		lng: -74.0036,
		population: 80213,
		keywords: {
			fr: 'excavation Saint-Jérôme, drain français Saint-Jérôme, mini excavation Saint-Jérôme, fondation Saint-Jérôme',
			en: 'excavation Saint-Jerome, french drain Saint-Jerome',
			es: 'excavación Saint-Jérôme'
		}
	},
	{
		slug: 'terrebonne',
		name: 'Terrebonne',
		region: 'Lanaudière',
		postalArea: 'J6',
		lat: 45.7,
		lng: -73.6333,
		population: 119944,
		keywords: {
			fr: 'excavation Terrebonne, drain français Terrebonne, mini excavation Terrebonne, démolition Terrebonne',
			en: 'excavation Terrebonne, french drain Terrebonne',
			es: 'excavación Terrebonne'
		}
	},
	{
		slug: 'repentigny',
		name: 'Repentigny',
		region: 'Lanaudière',
		postalArea: 'J5',
		lat: 45.7423,
		lng: -73.4505,
		population: 84965,
		keywords: {
			fr: 'excavation Repentigny, drain français Repentigny, mini excavation Repentigny',
			en: 'excavation Repentigny, french drain Repentigny',
			es: 'excavación Repentigny'
		}
	},
	{
		slug: 'mascouche',
		name: 'Mascouche',
		region: 'Lanaudière',
		postalArea: 'J7',
		lat: 45.7474,
		lng: -73.5986,
		population: 49582,
		keywords: {
			fr: 'excavation Mascouche, drain français Mascouche, mini excavation Mascouche',
			en: 'excavation Mascouche, french drain Mascouche',
			es: 'excavación Mascouche'
		}
	},
	{
		slug: 'blainville',
		name: 'Blainville',
		region: 'Laurentides',
		postalArea: 'J7',
		lat: 45.6775,
		lng: -73.8825,
		population: 59819,
		keywords: {
			fr: 'excavation Blainville, drain français Blainville, mini excavation Blainville',
			en: 'excavation Blainville, french drain Blainville',
			es: 'excavación Blainville'
		}
	},
	{
		slug: 'boisbriand',
		name: 'Boisbriand',
		region: 'Laurentides',
		postalArea: 'J7',
		lat: 45.6147,
		lng: -73.8336,
		population: 27778,
		keywords: {
			fr: 'excavation Boisbriand, drain français Boisbriand',
			en: 'excavation Boisbriand',
			es: 'excavación Boisbriand'
		}
	},
	{
		slug: 'sainte-therese',
		name: 'Sainte-Thérèse',
		region: 'Laurentides',
		postalArea: 'J7',
		lat: 45.64,
		lng: -73.84,
		population: 26619,
		keywords: {
			fr: 'excavation Sainte-Thérèse, drain français Sainte-Thérèse',
			en: 'excavation Sainte-Therese',
			es: 'excavación Sainte-Thérèse'
		}
	},
	{
		slug: 'mirabel',
		name: 'Mirabel',
		region: 'Laurentides',
		postalArea: 'J7',
		lat: 45.65,
		lng: -74.08,
		population: 65399,
		keywords: {
			fr: 'excavation Mirabel, drain français Mirabel, mini excavation Mirabel',
			en: 'excavation Mirabel, french drain Mirabel',
			es: 'excavación Mirabel'
		}
	},
	{
		slug: 'saint-eustache',
		name: 'Saint-Eustache',
		region: 'Laurentides',
		postalArea: 'J7',
		lat: 45.5667,
		lng: -73.9,
		population: 46895,
		keywords: {
			fr: 'excavation Saint-Eustache, drain français Saint-Eustache',
			en: 'excavation Saint-Eustache',
			es: 'excavación Saint-Eustache'
		}
	},
	{
		slug: 'chateauguay',
		name: 'Châteauguay',
		region: 'Montérégie',
		postalArea: 'J6',
		lat: 45.3667,
		lng: -73.75,
		population: 50815,
		keywords: {
			fr: 'excavation Châteauguay, drain français Châteauguay',
			en: 'excavation Chateauguay',
			es: 'excavación Châteauguay'
		}
	},
	{
		slug: 'vaudreuil-dorion',
		name: 'Vaudreuil-Dorion',
		region: 'Montérégie',
		postalArea: 'J7',
		lat: 45.4,
		lng: -74.0333,
		population: 42796,
		keywords: {
			fr: 'excavation Vaudreuil-Dorion, drain français Vaudreuil',
			en: 'excavation Vaudreuil',
			es: 'excavación Vaudreuil'
		}
	},
	{
		slug: 'saint-hyacinthe',
		name: 'Saint-Hyacinthe',
		region: 'Montérégie',
		postalArea: 'J2',
		lat: 45.6309,
		lng: -72.957,
		population: 60046,
		keywords: {
			fr: 'excavation Saint-Hyacinthe, drain français Saint-Hyacinthe',
			en: 'excavation Saint-Hyacinthe',
			es: 'excavación Saint-Hyacinthe'
		}
	},
	{
		slug: 'quebec-city',
		name: 'Québec',
		region: 'Capitale-Nationale',
		postalArea: 'G1',
		lat: 46.8139,
		lng: -71.208,
		population: 549459,
		keywords: {
			fr: 'excavation Québec, drain français Québec, mini excavation ville de Québec, fondation Québec',
			en: 'excavation Quebec City, french drain Quebec',
			es: 'excavación Quebec, drenaje francés Quebec'
		}
	},
	// Grand Montréal — Île de Montréal (arrondissements clés)
	{ slug: 'pointe-claire', name: 'Pointe-Claire', region: 'Montréal', postalArea: 'H9', lat: 45.4477, lng: -73.8163, population: 33488, keywords: { fr: 'excavation Pointe-Claire, drain français Pointe-Claire', en: 'excavation Pointe-Claire', es: 'excavación Pointe-Claire' } },
	{ slug: 'dollard-des-ormeaux', name: 'Dollard-des-Ormeaux', region: 'Montréal', postalArea: 'H9', lat: 45.4938, lng: -73.8233, population: 48899, keywords: { fr: 'excavation Dollard-des-Ormeaux, drain français DDO', en: 'excavation DDO', es: 'excavación DDO' } },
	{ slug: 'kirkland', name: 'Kirkland', region: 'Montréal', postalArea: 'H9', lat: 45.4533, lng: -73.8675, population: 21253, keywords: { fr: 'excavation Kirkland, drain français Kirkland', en: 'excavation Kirkland', es: 'excavación Kirkland' } },
	{ slug: 'beaconsfield', name: 'Beaconsfield', region: 'Montréal', postalArea: 'H9', lat: 45.4329, lng: -73.8650, population: 19873, keywords: { fr: 'excavation Beaconsfield, fondation Beaconsfield', en: 'excavation Beaconsfield', es: 'excavación Beaconsfield' } },
	{ slug: 'lasalle', name: 'LaSalle', region: 'Montréal', postalArea: 'H8', lat: 45.4375, lng: -73.6433, population: 78305, keywords: { fr: 'excavation LaSalle, drain français LaSalle', en: 'excavation LaSalle', es: 'excavación LaSalle' } },
	{ slug: 'verdun', name: 'Verdun', region: 'Montréal', postalArea: 'H4', lat: 45.4581, lng: -73.5681, population: 72820, keywords: { fr: 'excavation Verdun, drain français Verdun, fondation Verdun', en: 'excavation Verdun', es: 'excavación Verdun' } },
	{ slug: 'westmount', name: 'Westmount', region: 'Montréal', postalArea: 'H3', lat: 45.4843, lng: -73.5972, population: 20312, keywords: { fr: 'excavation Westmount, drain français Westmount', en: 'excavation Westmount', es: 'excavación Westmount' } },
	{ slug: 'outremont', name: 'Outremont', region: 'Montréal', postalArea: 'H2', lat: 45.5142, lng: -73.6098, population: 26505, keywords: { fr: 'excavation Outremont, drain français Outremont', en: 'excavation Outremont', es: 'excavación Outremont' } },
	{ slug: 'saint-laurent', name: 'Saint-Laurent', region: 'Montréal', postalArea: 'H4', lat: 45.5088, lng: -73.6927, population: 98828, keywords: { fr: 'excavation Saint-Laurent, drain français Ville Saint-Laurent', en: 'excavation Saint-Laurent', es: 'excavación Saint-Laurent' } },
	{ slug: 'anjou', name: 'Anjou', region: 'Montréal', postalArea: 'H1', lat: 45.6147, lng: -73.5683, population: 42796, keywords: { fr: 'excavation Anjou, drain français Anjou', en: 'excavation Anjou', es: 'excavación Anjou' } },
	{ slug: 'montreal-nord', name: 'Montréal-Nord', region: 'Montréal', postalArea: 'H1', lat: 45.5944, lng: -73.6256, population: 84234, keywords: { fr: 'excavation Montréal-Nord, drain français Montréal-Nord', en: 'excavation Montreal North', es: 'excavación Montreal Norte' } },
	{ slug: 'rivieres-des-prairies', name: 'Rivière-des-Prairies', region: 'Montréal', postalArea: 'H1', lat: 45.6533, lng: -73.5217, population: 106743, keywords: { fr: 'excavation Rivière-des-Prairies, drain français RDP', en: 'excavation RDP', es: 'excavación RDP' } },
	// Rive-Sud
	{ slug: 'saint-lambert', name: 'Saint-Lambert', region: 'Montérégie', postalArea: 'J4', lat: 45.5042, lng: -73.5083, population: 21555, keywords: { fr: 'excavation Saint-Lambert, drain français Saint-Lambert Rive-Sud', en: 'excavation Saint-Lambert', es: 'excavación Saint-Lambert' } },
	{ slug: 'greenfield-park', name: 'Greenfield Park', region: 'Montérégie', postalArea: 'J4', lat: 45.4906, lng: -73.4825, population: 17118, keywords: { fr: 'excavation Greenfield Park, drain français Greenfield Park', en: 'excavation Greenfield Park', es: 'excavación Greenfield Park' } },
	{ slug: 'boucherville', name: 'Boucherville', region: 'Montérégie', postalArea: 'J4', lat: 45.5947, lng: -73.4364, population: 41671, keywords: { fr: 'excavation Boucherville, drain français Boucherville, fondation Boucherville', en: 'excavation Boucherville', es: 'excavación Boucherville' } },
	{ slug: 'saint-bruno', name: 'Saint-Bruno-de-Montarville', region: 'Montérégie', postalArea: 'J3', lat: 45.5333, lng: -73.35, population: 26900, keywords: { fr: 'excavation Saint-Bruno, drain français Saint-Bruno-de-Montarville', en: 'excavation Saint-Bruno', es: 'excavación Saint-Bruno' } },
	{ slug: 'sainte-julie', name: 'Sainte-Julie', region: 'Montérégie', postalArea: 'J3', lat: 45.5833, lng: -73.3333, population: 30133, keywords: { fr: 'excavation Sainte-Julie, drain français Sainte-Julie', en: 'excavation Sainte-Julie', es: 'excavación Sainte-Julie' } },
	{ slug: 'la-prairie', name: 'La Prairie', region: 'Montérégie', postalArea: 'J5', lat: 45.4147, lng: -73.5031, population: 26556, keywords: { fr: 'excavation La Prairie, drain français La Prairie', en: 'excavation La Prairie', es: 'excavación La Prairie' } },
	{ slug: 'candiac', name: 'Candiac', region: 'Montérégie', postalArea: 'J5', lat: 45.3833, lng: -73.5167, population: 22072, keywords: { fr: 'excavation Candiac, drain français Candiac', en: 'excavation Candiac', es: 'excavación Candiac' } },
	{ slug: 'beloeil', name: 'Beloeil', region: 'Montérégie', postalArea: 'J3', lat: 45.5667, lng: -73.2, population: 22849, keywords: { fr: 'excavation Beloeil, drain français Beloeil', en: 'excavation Beloeil', es: 'excavación Beloeil' } },
	// Laurentides Nord
	{ slug: 'mont-tremblant', name: 'Mont-Tremblant', region: 'Laurentides', postalArea: 'J8', lat: 46.1185, lng: -74.5962, population: 9842, keywords: { fr: 'excavation Mont-Tremblant, drain français Mont-Tremblant chalet', en: 'excavation Mont-Tremblant', es: 'excavación Mont-Tremblant' } },
	{ slug: 'sainte-agathe', name: 'Sainte-Agathe-des-Monts', region: 'Laurentides', postalArea: 'J8', lat: 46.05, lng: -74.2833, population: 11000, keywords: { fr: 'excavation Sainte-Agathe, drain français Sainte-Agathe-des-Monts', en: 'excavation Sainte-Agathe', es: 'excavación Sainte-Agathe' } },
	{ slug: 'prevost', name: 'Prévost', region: 'Laurentides', postalArea: 'J0', lat: 45.8667, lng: -74, population: 13692, keywords: { fr: 'excavation Prévost, drain français Prévost', en: 'excavation Prevost', es: 'excavación Prévost' } },
	{ slug: 'sainte-adele', name: 'Sainte-Adèle', region: 'Laurentides', postalArea: 'J8', lat: 45.95, lng: -74.13, population: 12891, keywords: { fr: 'excavation Sainte-Adèle, drain français Sainte-Adèle', en: 'excavation Sainte-Adele', es: 'excavación Sainte-Adèle' } },
	// Lanaudière
	{ slug: 'joliette', name: 'Joliette', region: 'Lanaudière', postalArea: 'J6', lat: 46.0167, lng: -73.4333, population: 20484, keywords: { fr: 'excavation Joliette, drain français Joliette', en: 'excavation Joliette', es: 'excavación Joliette' } },
	{ slug: 'lassomption', name: "L'Assomption", region: 'Lanaudière', postalArea: 'J5', lat: 45.8217, lng: -73.4242, population: 23517, keywords: { fr: "excavation L'Assomption, drain français L'Assomption", en: 'excavation L\'Assomption', es: "excavación L'Assomption" } }
];

export interface ServiceMeta {
	slug: string;
	titleFr: string;
	titleEn: string;
	titleEs: string;
	priceFromCAD: number;
	priceToCAD: number;
}

export const servicesGeo: ServiceMeta[] = [
	{ slug: 'drain-francais', titleFr: 'Drain Français', titleEn: 'French Drain', titleEs: 'Drenaje Francés', priceFromCAD: 4000, priceToCAD: 12000 },
	{ slug: 'excavation', titleFr: 'Excavation', titleEn: 'Excavation', titleEs: 'Excavación', priceFromCAD: 2500, priceToCAD: 25000 },
	{ slug: 'reparation-fissures', titleFr: 'Réparation de Fissures', titleEn: 'Crack Repair', titleEs: 'Reparación de Grietas', priceFromCAD: 450, priceToCAD: 1200 },
	{ slug: 'demolition', titleFr: 'Démolition', titleEn: 'Demolition', titleEs: 'Demolición', priceFromCAD: 12000, priceToCAD: 35000 },
	{ slug: 'inspection-camera', titleFr: 'Inspection Caméra', titleEn: 'Camera Inspection', titleEs: 'Inspección con Cámara', priceFromCAD: 250, priceToCAD: 600 }
];
