// Default contract sections (pré-remplies, editable par l'admin)

export interface SectionMeta {
	key: SectionKey;
	num: string;
	title: string;
}

export type SectionKey =
	| 'preambule'
	| 'travaux'
	| 'prix'
	| 'modalites'
	| 'delais'
	| 'garanties'
	| 'rbq'
	| 'assurance'
	| 'changements'
	| 'litiges'
	| 'signatures';

export type SectionsMap = Partial<Record<SectionKey, string>>;

export const SECTION_ORDER: SectionMeta[] = [
	{ key: 'preambule', num: '1', title: 'Préambule' },
	{ key: 'travaux', num: '2', title: 'Description des travaux' },
	{ key: 'prix', num: '3', title: 'Prix et taxes' },
	{ key: 'modalites', num: '4', title: 'Modalités de paiement' },
	{ key: 'delais', num: '5', title: 'Délais d\'exécution' },
	{ key: 'garanties', num: '6', title: 'Garanties' },
	{ key: 'rbq', num: '7', title: 'Licence RBQ' },
	{ key: 'assurance', num: '8', title: 'Assurance et responsabilité' },
	{ key: 'changements', num: '9', title: 'Changements et imprévus' },
	{ key: 'litiges', num: '10', title: 'Litiges' },
	{ key: 'signatures', num: '11', title: 'Signatures' }
];

export const DEFAULT_SECTIONS: Record<SectionKey, string> = {
	preambule: `La présente soumission-contrat est conclue entre Mini Excavations Érable Inc. (ci-après « l'Entrepreneur »), titulaire de la licence RBQ 5823-7736-01, et le Client identifié en page 1 du présent document.

L'Entrepreneur s'engage à exécuter les travaux décrits ci-dessous selon les règles de l'art et les normes en vigueur au Québec.`,

	travaux: `Description détaillée des travaux à effectuer, incluant la nature des opérations d'excavation, de drainage, de fondation ou de tout autre service convenu.

Les travaux seront exécutés à l'adresse indiquée en page 1 et incluent :
- Préparation du site et signalisation
- Exécution des travaux selon les spécifications
- Nettoyage et restauration finale du terrain

L'Entrepreneur fournira la machinerie, l'équipement et la main-d'œuvre nécessaires.`,

	prix: `Le prix total mentionné en page 1 inclut la main-d'œuvre, la machinerie et les matériaux décrits.

Les taxes applicables au Québec (TPS 5 % et TVQ 9,975 %) sont calculées sur le sous-total. Tout matériel ou service additionnel non mentionné fera l'objet d'un avenant écrit signé par les deux parties.`,

	modalites: `Les modalités de paiement sont détaillées en page 1. Tout retard de paiement de plus de trente (30) jours après la date d'échéance entraînera des frais de 2 % par mois.

Les paiements se font par virement Interac, chèque ou autre mode convenu à l'avance.`,

	delais: `Les travaux débuteront à une date convenue par écrit entre les parties, généralement dans un délai de 2 à 6 semaines suivant la signature, sous réserve des conditions météorologiques et de la disponibilité des équipements.

L'Entrepreneur informera le Client de tout retard imprévu dans les meilleurs délais.`,

	garanties: `L'Entrepreneur garantit la qualité des travaux pour une période de un (1) an suivant la date de fin des travaux, contre tout défaut de main-d'œuvre. Cette garantie ne couvre pas les dommages résultant d'un usage inapproprié, de modifications par un tiers, ou de causes externes (météo extrême, etc.).`,

	rbq: `L'Entrepreneur est titulaire de la licence RBQ numéro 5823-7736-01, valide et en règle, lui permettant légalement d'exécuter les travaux convenus au Québec.`,

	assurance: `L'Entrepreneur détient une assurance responsabilité civile couvrant les dommages corporels et matériels pouvant survenir durant l'exécution des travaux. Une preuve d'assurance peut être fournie sur demande.`,

	changements: `Tout changement à la nature ou à l'étendue des travaux après la signature du présent contrat fera l'objet d'un avenant écrit, signé par les deux parties, et pourra entraîner un ajustement du prix et des délais.`,

	litiges: `En cas de différend, les parties s'engagent à tenter une résolution à l'amiable avant tout recours judiciaire. Le présent contrat est régi par les lois du Québec et tout litige relèvera des tribunaux compétents du district judiciaire concerné.`,

	signatures: `Le présent contrat n'est valide qu'après signature par les deux parties. La signature électronique est reconnue comme légalement contraignante en vertu de la Loi concernant le cadre juridique des technologies de l'information du Québec.`
};
