import type { SectionKey, SectionsMap } from './types';

export const SECTION_ORDER: { key: SectionKey; num: string; title: string }[] = [
	{ key: 'objet', num: '1', title: 'Objet du projet' },
	{ key: 'normes', num: '2', title: 'Normes et conformité' },
	{ key: 'travaux', num: '3', title: 'Description détaillée des travaux' },
	{ key: 'remblayage', num: '4', title: 'Remblayage et finition' },
	{ key: 'exclusions', num: '5', title: 'Exclusions' },
	{ key: 'conditions', num: '6', title: 'Conditions générales' },
	{ key: 'garantie', num: '7', title: 'Garantie' },
	{ key: 'garantie_exclusions', num: '7.1', title: 'Exclusions de garantie' },
	{ key: 'entretien', num: '7.2', title: 'Entretien recommandé' },
	{ key: 'modalites', num: '8', title: 'Modalités de paiement' },
	{ key: 'validite', num: '9', title: 'Validité de la soumission' },
	{ key: 'prix', num: '10', title: 'Prix' },
	{ key: 'acceptation', num: '11', title: 'Acceptation des travaux' }
];

export const DEFAULT_SECTIONS: Record<SectionKey, string> = {
	objet: `• Le présent projet consiste à effectuer le remplacement complet du système de drainage périphérique (drain français) ainsi que l'imperméabilisation des fondations du bâtiment afin d'assurer une protection durable contre les infiltrations d'eau et les pressions hydrostatiques.
• Les travaux seront exécutés conformément aux normes reconnues de l'industrie, avec une attention particulière portée à la durabilité des installations, à la sécurité des occupants et à la qualité globale d'exécution.`,
	normes: `• Code de construction du Québec – Chapitre I, Bâtiment
• Code national du bâtiment du Canada (CNB 2015 modifié Québec)
• Normes BNQ applicables aux systèmes de drainage et aux matériaux utilisés
• Exigences de la CNESST relatives à la sécurité des chantiers
• Code électrique du Québec
• Règlements municipaux en vigueur`,
	travaux: `• Excavation complète jusqu'au niveau de la semelle de fondation.
• Excavation approximative de 272 pieds linéaires.
• Excavation sous les balcons et solariums du sous-sol lorsque requis.
• Réparation de deux (2) fissures de fondation incluses.
• Application d'un système d'étanchéité haute performance de type RESISTO ou équivalent approuvé.
• Installation d'une membrane alvéolée DELTA-MS ou équivalent.
• Installation d'un drain français rigide perforé de 4 pouces conforme BNQ.
• Installation de 18 pouces de pierre nette ¾ conforme BNQ.
• Installation d'une membrane géotextile conforme BNQ.
• Installation de deux (2) cheminées d'accès en PVC rigide conforme BNQ.
• Installation d'un bassin de captation et d'une pompe de drainage lorsque requis.
• Raccordement électrique effectué par un maître électricien.
• Installation de clôtures temporaires, garde-corps et passerelles sécurisées.
• Maintien des accès aux logements pendant les travaux.
• Inspection visuelle finale du système de drainage.
• Tous les matériaux utilisés seront neufs et conformes aux normes applicables.`,
	remblayage: `• Remblayage avec matériaux granulaires conformes.
• Compactage effectué selon les bonnes pratiques de l'industrie.
• Nivellement du terrain.
• Préparation des surfaces pour aménagement futur.`,
	exclusions: `• Réfection complète de l'asphalte, du béton ou du pavé uni.
• Gazon en rouleau et aménagement paysager final.
• Reconstruction ou modification des balcons, patios, terrasses ou structures existantes.
• Travaux structuraux non visibles au moment de l'estimation.
• Conditions imprévues : roc, béton enfoui, contamination ou infrastructures souterraines non localisées.`,
	conditions: `• Toute condition imprévue découverte durant les travaux pourra entraîner des coûts supplémentaires après autorisation du client.
• Le client devra assurer l'accessibilité des zones de travail avant le début du chantier.
• Les véhicules et objets personnels devront être déplacés.
• Un léger tassement naturel du sol peut survenir après les travaux.
• Des photos du chantier pourront être prises à des fins de documentation.
• Une demande Info-Excavation sera effectuée avant le début des travaux.
• Toutes les précautions raisonnables seront prises afin de minimiser les impacts sur les structures existantes.
• Des mesures temporaires de gestion des eaux pourront être mises en place durant les travaux.`,
	garantie: `• Garantie transférable de dix (10) ans sur le système de drainage et les travaux d'imperméabilisation.
• En cas de vente de l'immeuble, une inspection devra être effectuée par Mini Excavation Érable Inc. avant le transfert de garantie.
• Le transfert de garantie sera valide uniquement si aucun dommage ou travail effectué par un tiers n'a affecté le système.`,
	garantie_exclusions: `• Mouvements de sol ou affaissements.
• Pressions hydrostatiques anormales.
• Conditions de sol imprévisibles.
• Infiltrations provenant de zones non incluses.
• Défaut d'entretien du système.
• Travaux effectués par des tiers.
• Événements naturels ou conditions extrêmes.`,
	entretien: `• Afin de préserver la performance du système de drainage, un entretien périodique et une inspection des cheminées d'accès sont recommandés.`,
	modalites: `• 60 % payable à la signature du contrat.
• 30 % payable en cours de travaux.
• 10 % payable à la fin des travaux.`,
	validite: `• La présente soumission est valide pour une période de trente (30) jours suivant sa date d'émission.`,
	prix: `• Prix préférentiel accordé considérant le volume des travaux.
• Voir le détail des articles et le tableau des coûts ci-dessous.`,
	acceptation: `• En signant la présente soumission, le client reconnaît avoir pris connaissance des travaux proposés, des exclusions, des conditions générales ainsi que des modalités de garantie.`
};

export function getSectionText(
	sections: SectionsMap | null | undefined,
	key: SectionKey
): string {
	const v = sections?.[key];
	return v && v.trim().length > 0 ? v : DEFAULT_SECTIONS[key];
}
