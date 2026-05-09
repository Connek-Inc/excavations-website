import { jsPDF } from 'jspdf';
import logoUrl from '$lib/logo.png';
import {
	COMPANY,
	calcTotals,
	fmtMoney,
	articleTotal,
	articlesSubtotal
} from './company';
import { SECTION_ORDER, getSectionText } from './default-sections';
import type { Modalite, Article, SectionsMap } from './types';

export type SoumissionData = {
	numero?: string | null;
	clientNom?: string | null;
	clientAdresse?: string | null;
	projetAdresse?: string | null;
	dateSoumission?: string | Date | null;
	sousTotal?: string | number | null;
	notes?: string | null;
	modalites?: Modalite[] | null;
	articles?: Article[] | null;
	sections?: SectionsMap | null;
	entrepreneurNom?: string | null;
	entrepreneurSignature?: string | null;
	entrepreneurSignedAt?: string | Date | null;
	clientSignataireNom?: string | null;
	clientSignature?: string | null;
	clientSignedAt?: string | Date | null;
};

const M = 50;
const PAGE_W = 612;
const PAGE_H = 792;
const CONTENT_W = PAGE_W - M * 2;

let cachedLogo: string | null = null;
async function loadLogo(): Promise<string | null> {
	if (cachedLogo) return cachedLogo;
	try {
		const res = await fetch(logoUrl);
		const blob = await res.blob();
		cachedLogo = await new Promise<string>((resolve, reject) => {
			const r = new FileReader();
			r.onload = () => resolve(r.result as string);
			r.onerror = reject;
			r.readAsDataURL(blob);
		});
		return cachedLogo;
	} catch {
		return null;
	}
}

function dateLabel(d: string | Date | null | undefined): string {
	if (!d) return '—';
	const dt = typeof d === 'string' ? new Date(d) : d;
	if (isNaN(dt.getTime())) return String(d);
	return dt.toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' });
}

export async function generatePdf(s: SoumissionData): Promise<jsPDF> {
	const doc = new jsPDF({ unit: 'pt', format: 'letter' });
	const logo = await loadLogo();
	let y = M;

	const ensureSpace = (h: number) => {
		if (y + h > PAGE_H - M) {
			doc.addPage();
			y = M;
		}
	};

	const text = (
		str: string,
		opts: {
			size?: number;
			bold?: boolean;
			color?: [number, number, number];
			indent?: number;
		} = {}
	) => {
		const size = opts.size ?? 10;
		doc.setFont('helvetica', opts.bold ? 'bold' : 'normal');
		doc.setFontSize(size);
		doc.setTextColor(...(opts.color ?? [25, 25, 25]));
		const indent = opts.indent ?? 0;
		const lines = doc.splitTextToSize(str, CONTENT_W - indent);
		const lineH = size * 1.35;
		for (const line of lines) {
			ensureSpace(lineH);
			doc.text(line, M + indent, y + size);
			y += lineH;
		}
	};

	const sectionTitle = (str: string, opts: { primary?: boolean } = {}) => {
		y += opts.primary ? 14 : 6;
		const barH = opts.primary ? 22 : 12;
		const size = opts.primary ? 16 : 11;
		ensureSpace(barH + 8);
		doc.setFillColor(255, 209, 0);
		doc.rect(M, y, opts.primary ? 6 : 3, barH, 'F');
		text(str, { size, bold: true, color: [20, 20, 20], indent: opts.primary ? 14 : 10 });
		y += opts.primary ? 4 : 1;
	};

	const hr = () => {
		ensureSpace(10);
		doc.setDrawColor(220, 220, 220);
		doc.line(M, y, M + CONTENT_W, y);
		y += 8;
	};

	// HEADER
	doc.setFillColor(20, 20, 20);
	doc.rect(0, 0, PAGE_W, 80, 'F');
	doc.setFillColor(255, 209, 0);
	doc.rect(0, 80, PAGE_W, 4, 'F');
	if (logo) {
		const logoSize = 64;
		try {
			doc.addImage(logo, 'PNG', PAGE_W - M - logoSize, 8, logoSize, logoSize, undefined, 'FAST');
		} catch {
			/* ignore */
		}
	}
	doc.setTextColor(255, 209, 0);
	doc.setFont('helvetica', 'bold');
	doc.setFontSize(20);
	doc.text(COMPANY.name.toUpperCase(), M, 40);
	doc.setTextColor(255, 255, 255);
	doc.setFont('helvetica', 'normal');
	doc.setFontSize(9);
	doc.text(`RBQ ${COMPANY.rbq}  •  NEQ ${COMPANY.neq}`, M, 56);
	doc.text(`${COMPANY.phone}  •  ${COMPANY.website}`, M, 70);

	y = 110;

	// TITLE
	doc.setTextColor(20, 20, 20);
	doc.setFont('helvetica', 'bold');
	doc.setFontSize(18);
	doc.text('SOUMISSION-CONTRAT', M, y + 14);
	y += 26;
	if (s.numero) {
		doc.setFontSize(10);
		doc.setFont('helvetica', 'normal');
		doc.setTextColor(90, 90, 90);
		doc.text(`N° ${s.numero}`, M, y);
		y += 14;
	}

	hr();
	text('CLIENT', { size: 9, bold: true, color: [120, 120, 120] });
	text(s.clientNom || '—', { size: 11, bold: true });
	text(s.clientAdresse || '—');
	y += 4;
	text('ADRESSE DU PROJET', { size: 9, bold: true, color: [120, 120, 120] });
	text(s.projetAdresse || '—');
	y += 4;
	text('DATE DE LA SOUMISSION', { size: 9, bold: true, color: [120, 120, 120] });
	text(dateLabel(s.dateSoumission));

	const sectionsMap = (s.sections ?? {}) as SectionsMap;
	const modalites = (s.modalites ?? []) as Modalite[];
	const articles = (s.articles ?? []) as Article[];
	const payBase = articles.length > 0 ? articlesSubtotal(articles) : Number(s.sousTotal ?? 0);
	const totals = calcTotals(payBase);

	for (const sec of SECTION_ORDER) {
		const isPrimary = sec.key === 'travaux' || sec.key === 'prix';
		sectionTitle(`${sec.num}. ${sec.title}`, { primary: isPrimary });
		const body = getSectionText(sectionsMap, sec.key).replace(/\r\n/g, '\n');
		const bodySize = isPrimary ? 11 : 9;
		for (const para of body.split('\n')) text(para.length ? para : ' ', { size: bodySize });
		if (sec.key === 'modalites' && modalites.length > 0) {
			y += 3;
			text('Détail calculé automatiquement :', { bold: true, size: 9 });
			modalites.forEach((m) => {
				const montant = (totals.total * m.pourcentage) / 100;
				text(`•  ${m.pourcentage}% — ${m.label} : ${fmtMoney(montant)}`, {
					indent: 6,
					size: 9
				});
			});
		}
	}

	if (articles.length > 0) {
		sectionTitle('Détail des articles / propriétés');
		ensureSpace(28);
		doc.setFillColor(20, 20, 20);
		doc.rect(M, y, CONTENT_W, 18, 'F');
		doc.setTextColor(255, 209, 0);
		doc.setFont('helvetica', 'bold');
		doc.setFontSize(9.5);
		doc.text('Description', M + 6, y + 12);
		doc.text('Qté', M + CONTENT_W - 200, y + 12, { align: 'right' });
		doc.text('Prix unit.', M + CONTENT_W - 110, y + 12, { align: 'right' });
		doc.text('Total', M + CONTENT_W - 6, y + 12, { align: 'right' });
		y += 18;
		doc.setTextColor(25, 25, 25);
		doc.setFont('helvetica', 'normal');
		articles.forEach((a, idx) => {
			const lines = doc.splitTextToSize(a.description || '—', CONTENT_W - 230);
			const rowH = Math.max(18, lines.length * 12 + 8);
			ensureSpace(rowH);
			if (idx % 2 === 0) {
				doc.setFillColor(248, 248, 245);
				doc.rect(M, y, CONTENT_W, rowH, 'F');
			}
			doc.setFontSize(9.5);
			doc.setTextColor(25, 25, 25);
			lines.forEach((ln: string, i: number) => {
				doc.text(ln, M + 6, y + 12 + i * 12);
			});
			doc.text(String(a.quantite ?? 0), M + CONTENT_W - 200, y + 12, { align: 'right' });
			doc.text(fmtMoney(Number(a.prix_unitaire) || 0), M + CONTENT_W - 110, y + 12, {
				align: 'right'
			});
			doc.setFont('helvetica', 'bold');
			doc.text(fmtMoney(articleTotal(a)), M + CONTENT_W - 6, y + 12, { align: 'right' });
			doc.setFont('helvetica', 'normal');
			doc.setDrawColor(220, 220, 220);
			doc.line(M, y + rowH, M + CONTENT_W, y + rowH);
			y += rowH;
		});
		y += 6;
	}

	sectionTitle('Détail des coûts');
	ensureSpace(80);
	const tableX = M;
	const colW = CONTENT_W;
	const row = (label: string, value: string) => {
		ensureSpace(18);
		doc.setFont('helvetica', 'normal');
		doc.setFontSize(10.5);
		doc.setTextColor(25, 25, 25);
		doc.text(label, tableX + 8, y + 12);
		doc.text(value, tableX + colW - 8, y + 12, { align: 'right' });
		doc.setDrawColor(230, 230, 230);
		doc.line(tableX, y + 18, tableX + colW, y + 18);
		y += 18;
	};
	doc.setFillColor(248, 248, 245);
	doc.rect(tableX, y, colW, 18 * 4 + 4, 'F');
	row('Sous-total', fmtMoney(totals.sousTotal));
	row('TPS (5 %)', fmtMoney(totals.tps));
	row('TVQ (9,975 %)', fmtMoney(totals.tvq));
	doc.setFillColor(255, 209, 0);
	doc.rect(tableX, y, colW, 22, 'F');
	doc.setFont('helvetica', 'bold');
	doc.setFontSize(12);
	doc.setTextColor(20, 20, 20);
	doc.text('TOTAL', tableX + 8, y + 15);
	doc.text(fmtMoney(totals.total), tableX + colW - 8, y + 15, { align: 'right' });
	y += 30;

	if (s.notes && s.notes.trim()) {
		sectionTitle('Notes supplémentaires');
		text(s.notes);
	}

	sectionTitle('12. Signatures');
	ensureSpace(140);
	const halfW = (CONTENT_W - 20) / 2;
	const sigBlock = (
		x: number,
		role: string,
		name: string,
		sub: string,
		sigImg: string | null | undefined,
		signedAt: string | Date | null | undefined
	) => {
		doc.setFont('helvetica', 'bold');
		doc.setFontSize(10);
		doc.setTextColor(20, 20, 20);
		doc.text(role, x, y + 12);
		if (sigImg) {
			try {
				doc.addImage(sigImg, 'PNG', x, y + 22, halfW, 40, undefined, 'FAST');
			} catch {
				/* ignore */
			}
		}
		doc.setDrawColor(40, 40, 40);
		doc.line(x, y + 60, x + halfW, y + 60);
		doc.setFont('helvetica', 'normal');
		doc.setFontSize(9);
		doc.setTextColor(80, 80, 80);
		doc.text(name, x, y + 74);
		doc.text(sub, x, y + 86);
		const dateStr = signedAt
			? new Date(signedAt).toLocaleDateString('fr-CA')
			: '____________________';
		doc.text(`Date : ${dateStr}`, x, y + 102);
	};
	sigBlock(
		M,
		'ENTREPRENEUR',
		s.entrepreneurNom || `${COMPANY.dirigeant} — ${COMPANY.titre}`,
		COMPANY.name,
		s.entrepreneurSignature,
		s.entrepreneurSignedAt
	);
	sigBlock(
		M + halfW + 20,
		'CLIENT',
		s.clientSignataireNom || s.clientNom || 'Nom du client',
		'Signature',
		s.clientSignature,
		s.clientSignedAt
	);
	y += 120;

	const pages = doc.getNumberOfPages();
	for (let i = 1; i <= pages; i++) {
		doc.setPage(i);
		if (logo) {
			try {
				doc.addImage(logo, 'PNG', M, PAGE_H - 38, 18, 18, undefined, 'FAST');
			} catch {
				/* ignore */
			}
		}
		doc.setDrawColor(255, 209, 0);
		doc.setLineWidth(2);
		doc.line(M, PAGE_H - 30, PAGE_W - M, PAGE_H - 30);
		doc.setLineWidth(1);
		doc.setFont('helvetica', 'normal');
		doc.setFontSize(8);
		doc.setTextColor(120, 120, 120);
		doc.text(`${COMPANY.name}  •  RBQ ${COMPANY.rbq}  •  ${COMPANY.phone}`, M + 24, PAGE_H - 18);
		doc.text(`Page ${i} / ${pages}`, PAGE_W - M, PAGE_H - 18, { align: 'right' });
	}

	return doc;
}

export function pdfFileName(s: SoumissionData) {
	const safeName = (s.clientNom || 'client').replace(/[^a-z0-9]+/gi, '_');
	const dateStr = s.dateSoumission
		? new Date(s.dateSoumission).toISOString().slice(0, 10)
		: new Date().toISOString().slice(0, 10);
	return `Soumission_${safeName}_${dateStr}.pdf`;
}

export async function downloadPdf(s: SoumissionData) {
	const doc = await generatePdf(s);
	doc.save(pdfFileName(s));
}
