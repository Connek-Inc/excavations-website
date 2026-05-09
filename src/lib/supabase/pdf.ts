import jsPDF from 'jspdf';
import { fmtMoney, type Soumission } from './client';
import { SECTION_ORDER, DEFAULT_SECTIONS } from './default-sections';

export function generateSoumissionPDF(s: Soumission): jsPDF {
	const doc = new jsPDF({ unit: 'mm', format: 'a4' });
	const pageWidth = doc.internal.pageSize.getWidth();
	const pageHeight = doc.internal.pageSize.getHeight();
	const margin = 20;
	const contentWidth = pageWidth - margin * 2;
	let y = margin;

	const ensureSpace = (needed: number) => {
		if (y + needed > pageHeight - margin) {
			doc.addPage();
			y = margin;
		}
	};

	// ─── Header ─────────────────────────────────────────────────────────
	doc.setFillColor(245, 158, 11); // amber
	doc.rect(0, 0, pageWidth, 28, 'F');
	doc.setTextColor(20, 20, 20);
	doc.setFont('helvetica', 'bold');
	doc.setFontSize(18);
	doc.text('MINI EXCAVATIONS ÉRABLE INC.', margin, 14);
	doc.setFontSize(9);
	doc.setFont('helvetica', 'normal');
	doc.text('RBQ 5823-7736-01  |  excavationserable.com  |  miniexcavationerable@gmail.com', margin, 21);
	y = 38;

	// ─── Title ──────────────────────────────────────────────────────────
	doc.setTextColor(0, 0, 0);
	doc.setFontSize(16);
	doc.setFont('helvetica', 'bold');
	doc.text('SOUMISSION-CONTRAT', margin, y);
	if (s.numero) {
		doc.setFontSize(10);
		doc.setFont('helvetica', 'normal');
		doc.text(`N° ${s.numero}`, pageWidth - margin, y, { align: 'right' });
	}
	y += 8;
	if (s.date_soumission) {
		doc.setFontSize(10);
		doc.text(`Date : ${s.date_soumission}`, margin, y);
		y += 5;
	}
	y += 4;

	// ─── Client info ────────────────────────────────────────────────────
	doc.setFontSize(11);
	doc.setFont('helvetica', 'bold');
	doc.text('CLIENT', margin, y);
	y += 5;
	doc.setFont('helvetica', 'normal');
	doc.setFontSize(10);
	const clientLines = [
		`${s.client_nom}`,
		s.client_email,
		s.client_telephone || '',
		s.client_adresse || ''
	].filter(Boolean);
	clientLines.forEach((line) => {
		doc.text(line, margin, y);
		y += 5;
	});
	y += 3;

	if (s.projet_adresse) {
		doc.setFont('helvetica', 'bold');
		doc.text('ADRESSE DU PROJET', margin, y);
		y += 5;
		doc.setFont('helvetica', 'normal');
		const projAdr = doc.splitTextToSize(s.projet_adresse, contentWidth);
		doc.text(projAdr, margin, y);
		y += projAdr.length * 5 + 3;
	}

	// ─── Articles table ──────────────────────────────────────────────────
	if (s.articles && s.articles.length > 0) {
		ensureSpace(40);
		doc.setFont('helvetica', 'bold');
		doc.setFontSize(11);
		doc.text('ARTICLES / PROPRIÉTÉS', margin, y);
		y += 6;

		// header
		doc.setFillColor(240, 240, 240);
		doc.rect(margin, y - 4, contentWidth, 7, 'F');
		doc.setFontSize(9);
		doc.text('Description', margin + 2, y);
		doc.text('Qté', margin + 110, y);
		doc.text('Prix unit.', margin + 130, y);
		doc.text('Total', pageWidth - margin - 2, y, { align: 'right' });
		y += 6;

		doc.setFont('helvetica', 'normal');
		s.articles.forEach((a) => {
			ensureSpace(12);
			const descLines = doc.splitTextToSize(a.description || '—', 105);
			const lineHeight = descLines.length * 4.5;
			doc.text(descLines, margin + 2, y);
			doc.text(String(a.quantite || 0), margin + 110, y);
			doc.text(fmtMoney(a.prix_unitaire || 0), margin + 130, y);
			doc.text(fmtMoney((a.quantite || 0) * (a.prix_unitaire || 0)), pageWidth - margin - 2, y, {
				align: 'right'
			});
			y += Math.max(lineHeight, 5) + 1;
			doc.setDrawColor(220, 220, 220);
			doc.line(margin, y - 1, pageWidth - margin, y - 1);
		});
		y += 3;
	}

	// ─── Totals ──────────────────────────────────────────────────────────
	ensureSpace(28);
	const totalsX = pageWidth - margin - 70;
	doc.setFont('helvetica', 'normal');
	doc.setFontSize(10);
	doc.text('Sous-total', totalsX, y);
	doc.text(fmtMoney(s.sous_total || 0), pageWidth - margin, y, { align: 'right' });
	y += 5;
	doc.text('TPS 5 %', totalsX, y);
	doc.text(fmtMoney(s.tps || 0), pageWidth - margin, y, { align: 'right' });
	y += 5;
	doc.text('TVQ 9,975 %', totalsX, y);
	doc.text(fmtMoney(s.tvq || 0), pageWidth - margin, y, { align: 'right' });
	y += 6;
	doc.setFont('helvetica', 'bold');
	doc.setFontSize(12);
	doc.setDrawColor(0, 0, 0);
	doc.line(totalsX, y - 3, pageWidth - margin, y - 3);
	doc.text('TOTAL', totalsX, y + 1);
	doc.text(fmtMoney(s.total || 0), pageWidth - margin, y + 1, { align: 'right' });
	y += 10;

	// ─── Modalités ───────────────────────────────────────────────────────
	if (s.modalites && s.modalites.length > 0) {
		ensureSpace(20);
		doc.setFont('helvetica', 'bold');
		doc.setFontSize(11);
		doc.text('MODALITÉS DE PAIEMENT', margin, y);
		y += 6;
		doc.setFont('helvetica', 'normal');
		doc.setFontSize(10);
		s.modalites.forEach((m) => {
			ensureSpace(6);
			doc.text(`${m.pourcentage}%`, margin + 2, y);
			doc.text(m.label, margin + 22, y);
			y += 5;
		});
		y += 4;
	}

	// ─── Sections du contrat ─────────────────────────────────────────────
	const sections = (s.sections || {}) as Record<string, string>;
	SECTION_ORDER.forEach((sec) => {
		const text = sections[sec.key] || DEFAULT_SECTIONS[sec.key];
		ensureSpace(15);
		doc.setFont('helvetica', 'bold');
		doc.setFontSize(11);
		doc.text(`${sec.num}. ${sec.title.toUpperCase()}`, margin, y);
		y += 6;
		doc.setFont('helvetica', 'normal');
		doc.setFontSize(9.5);
		const lines = doc.splitTextToSize(text, contentWidth);
		lines.forEach((line: string) => {
			ensureSpace(5);
			doc.text(line, margin, y);
			y += 4.5;
		});
		y += 4;
	});

	// ─── Signatures ──────────────────────────────────────────────────────
	ensureSpace(60);
	doc.setFont('helvetica', 'bold');
	doc.setFontSize(11);
	doc.text('SIGNATURES', margin, y);
	y += 8;

	const sigBoxWidth = (contentWidth - 10) / 2;
	const sigY = y;

	// Admin signature
	doc.setDrawColor(150, 150, 150);
	doc.rect(margin, sigY, sigBoxWidth, 30);
	doc.setFontSize(9);
	doc.setFont('helvetica', 'bold');
	doc.text("L'Entrepreneur", margin + 2, sigY + 5);
	if (s.signature_admin) {
		try {
			doc.addImage(s.signature_admin, 'PNG', margin + 2, sigY + 7, sigBoxWidth - 4, 18);
		} catch (e) {
			console.warn('Could not embed admin signature', e);
		}
	}
	doc.setFont('helvetica', 'normal');
	doc.setFontSize(8);
	doc.text(s.signature_admin_nom || 'Mini Excavations Érable Inc.', margin + 2, sigY + 33);
	if (s.signature_admin_at) {
		doc.text(`Le ${new Date(s.signature_admin_at).toLocaleDateString('fr-CA')}`, margin + 2, sigY + 37);
	}

	// Client signature
	const clientX = margin + sigBoxWidth + 10;
	doc.setDrawColor(150, 150, 150);
	doc.rect(clientX, sigY, sigBoxWidth, 30);
	doc.setFontSize(9);
	doc.setFont('helvetica', 'bold');
	doc.text('Le Client', clientX + 2, sigY + 5);
	if (s.signature_client) {
		try {
			doc.addImage(s.signature_client, 'PNG', clientX + 2, sigY + 7, sigBoxWidth - 4, 18);
		} catch (e) {
			console.warn('Could not embed client signature', e);
		}
	}
	doc.setFont('helvetica', 'normal');
	doc.setFontSize(8);
	doc.text(s.signature_client_nom || s.client_nom, clientX + 2, sigY + 33);
	if (s.signature_client_at) {
		doc.text(`Le ${new Date(s.signature_client_at).toLocaleDateString('fr-CA')}`, clientX + 2, sigY + 37);
	}

	// Footer
	const totalPages = doc.getNumberOfPages();
	for (let i = 1; i <= totalPages; i++) {
		doc.setPage(i);
		doc.setFontSize(8);
		doc.setTextColor(120, 120, 120);
		doc.text(
			`Mini Excavations Érable Inc.  |  RBQ 5823-7736-01  |  Page ${i} / ${totalPages}`,
			pageWidth / 2,
			pageHeight - 8,
			{ align: 'center' }
		);
	}

	return doc;
}
