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
	}
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
