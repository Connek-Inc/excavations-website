export type Modalite = { label: string; pourcentage: number };

export type Article = {
	description: string;
	quantite: number;
	prix_unitaire: number;
};

export type SectionKey =
	| 'objet'
	| 'normes'
	| 'travaux'
	| 'remblayage'
	| 'exclusions'
	| 'conditions'
	| 'garantie'
	| 'garantie_exclusions'
	| 'entretien'
	| 'modalites'
	| 'validite'
	| 'prix'
	| 'acceptation';

export type SectionsMap = Partial<Record<SectionKey, string>>;

export type Statut = 'Brouillon' | 'Envoyée' | 'Acceptée' | 'Signée';

export type SoumissionFormState = {
	numero: string;
	clientNom: string;
	clientAdresse: string;
	projetAdresse: string;
	clientEmail: string;
	clientPhone: string;
	dateSoumission: string;
	notes: string;
	sousTotal: number;
	modalites: Modalite[];
	articles: Article[];
	sections: SectionsMap;
};
