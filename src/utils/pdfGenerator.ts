import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// We attach autoTable to jsPDF to avoid type errors in some environments
(jsPDF as any).autoTable = autoTable;

/**
 * Utility to create the premium $15K report from the new expanded JSON payload
 */
export const generatePremiumReport = (reportData: any) => {
    const doc = new jsPDF({ format: 'a4', unit: 'mm' });

    const primaryColor: [number, number, number] = [20, 184, 166]; // Teal: #14B8A6
    const secondaryColor: [number, number, number] = [100, 116, 139]; // Slate
    const textColor: [number, number, number] = [30, 41, 59]; // Slate 800
    const margin = 20;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    let y = margin;

    const addFooter = (pageNumber: number) => {
        doc.setFontSize(9);
        doc.setTextColor(...secondaryColor);
        doc.text("SENSO Cognitive Engine | aiworkforceos.org", margin, pageHeight - 15);
        doc.text(`Page ${pageNumber}`, pageWidth - margin - 15, pageHeight - 15);
    };

    const checkPageBreak = (neededHeight: number) => {
        if (y + neededHeight > pageHeight - margin) {
            const pageCount = doc.getNumberOfPages();
            addFooter(pageCount);
            doc.addPage();
            y = margin;
            return true;
        }
        return false;
    };

    const drawSectionTitle = (title: string, number: string) => {
        checkPageBreak(25);
        doc.setFontSize(18);
        doc.setTextColor(...primaryColor);
        doc.setFont("helvetica", "bold");
        doc.text(`${number}. ${title}`, margin, y);
        y += 12;
    };

    const drawLineDivider = () => {
        y += 8;
        doc.setLineWidth(0.5);
        doc.setDrawColor(226, 232, 240); // Slate 200
        doc.line(margin, y, pageWidth - margin, y);
        y += 12;
    };

    // --- PAGE 1: COVER PAGE ---
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, pageWidth, 8, 'F');

    y = 60;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(32);
    doc.setTextColor(...primaryColor);
    doc.text("ORGANIZATIONAL", margin, y);
    y += 14;
    doc.setFontSize(26);
    doc.setTextColor(...textColor);
    doc.text("DIAGNOSTIC REPORT", margin, y);

    y += 40;
    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);

    y += 35;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("PREPARED BY:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    y += 8;
    doc.text("SENSO | Ved Cognitive Engine", margin, y);
    y += 6;
    doc.text("aiworkforceos.org", margin, y);

    y += 35;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("DATE & STATUS:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    y += 8;
    doc.text(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), margin, y);
    y += 6;
    doc.setTextColor(220, 38, 38); // Red
    doc.setFont("helvetica", "bold");
    doc.text("CONFIDENTIAL & PROPRIETARY", margin, y);

    addFooter(1);
    doc.addPage();
    y = margin;

    // --- PAGE 2: EXECUTIVE SUMMARY ---
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, pageWidth, 4, 'F');

    drawSectionTitle("Executive Summary", "1");

    doc.setFontSize(11);
    doc.setTextColor(...textColor);
    doc.setFont("helvetica", "normal");
    const execSummary = `This diagnostic report synthesizes behavioral data captured during the live organizational sensing session. Using SENSO's proprietary Triangulation Methodology, the VED engine has identified critical systemic misalignments that are producing structural friction and fueling a "Shadow Decision Architecture" within your team. The primary diagnosis isolates the core organizational breakdown, moving beyond obvious symptoms to expose the true root cause.`;
    const splitExec = doc.splitTextToSize(execSummary, pageWidth - margin * 2);
    doc.text(splitExec, margin, y);
    y += splitExec.length * 5 + 10;

    // Diagnosis Box
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("Primary Diagnosis", margin, y);
    y += 8;

    doc.setFontSize(12);
    doc.setTextColor(...textColor);
    doc.setFont("helvetica", "normal");
    const splitDiag = doc.splitTextToSize(reportData.diagnosis || "No diagnosis provided.", pageWidth - margin * 2 - 5);
    doc.setLineWidth(1);
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.line(margin, y - 4, margin, y + splitDiag.length * 5 + 2);
    doc.text(splitDiag, margin + 5, y);
    y += splitDiag.length * 5 + 15;

    // Root Cause Box
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("Hidden Root Cause", margin, y);
    y += 8;

    doc.setFontSize(12);
    doc.setTextColor(...textColor);
    doc.setFont("helvetica", "normal");
    const splitRoot = doc.splitTextToSize(reportData.rootCause || "No root cause provided.", pageWidth - margin * 2);
    doc.text(splitRoot, margin, y);
    y += splitRoot.length * 5 + 15;

    // Detailed Findings Array (from new expanded backend response)
    if (reportData.detailed_findings && reportData.detailed_findings.length > 0) {
        drawLineDivider();
        drawSectionTitle("Detailed Findings & Evidence", "2");

        reportData.detailed_findings.forEach((finding: any) => {
            checkPageBreak(50);

            doc.setFontSize(14);
            doc.setTextColor(...textColor);
            doc.setFont("helvetica", "bold");
            const fTitle = doc.splitTextToSize(`${finding.title}`, pageWidth - margin * 2);
            doc.text(fTitle, margin, y);
            y += fTitle.length * 5 + 5;

            doc.setFontSize(11);
            doc.setFont("helvetica", "normal");
            const fDesc = doc.splitTextToSize(finding.description, pageWidth - margin * 2);
            doc.text(fDesc, margin, y);
            y += fDesc.length * 5 + 5;

            doc.setFont("helvetica", "italic");
            doc.setTextColor(...secondaryColor);
            const fEvid = doc.splitTextToSize(`" ${finding.evidence} "`, pageWidth - margin * 2 - 10);
            doc.text(fEvid, margin + 10, y);
            y += fEvid.length * 5 + 15;
        });
    }

    // --- FINANCIAL IMPACT ---
    checkPageBreak(120);
    drawLineDivider();
    drawSectionTitle("Financial Impact Assessment", reportData.detailed_findings ? "3" : "2");

    doc.setFontSize(11);
    doc.setTextColor(...textColor);
    doc.setFont("helvetica", "normal");
    const impactIntro = `The financial cost of organizational dysfunction is rarely tracked on a P&L, yet it is often the largest source of invisible margin erosion. This "Cost of Inaction" model calculates the systemic value leakage driven by the identified patterns, highlighting the compounding financial risk of ignoring structural tension.`;
    const splitImpactIntro = doc.splitTextToSize(impactIntro, pageWidth - margin * 2);
    doc.text(splitImpactIntro, margin, y);
    y += splitImpactIntro.length * 5 + 15;

    // Impact Highlight Box
    doc.setFillColor(248, 250, 252); // Slate 50
    doc.setDrawColor(226, 232, 240); // Slate 200
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, y, pageWidth - margin * 2, 30, 3, 3, 'FD');

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Estimated Cost of Inaction:", margin + 5, y + 12);
    doc.setFontSize(16);
    doc.setTextColor(220, 38, 38); // Red
    doc.text(reportData.impact || "N/A", margin + 5, y + 22);

    y += 45;

    if (reportData.financial_breakdown && reportData.financial_breakdown.length > 0) {
        autoTable(doc, {
            startY: y,
            head: [['Dysfunction Pattern', 'Estimated Impact', 'Confidence']],
            body: reportData.financial_breakdown.map((item: any) => [item.pattern, item.cost, item.confidence]),
            theme: 'striped',
            headStyles: { fillColor: primaryColor, textColor: 255, fontStyle: 'bold' },
            bodyStyles: { textColor: 50 },
            alternateRowStyles: { fillColor: [248, 250, 252] },
            margin: { left: margin, right: margin }
        });
        y = (doc as any).lastAutoTable.finalY + 20;
    }

    // --- INTERVENTION ROADMAP ---
    checkPageBreak(120);
    drawLineDivider();
    drawSectionTitle("Intervention Roadmap", reportData.detailed_findings ? "4" : "3");

    doc.setFontSize(11);
    doc.setTextColor(...textColor);
    doc.setFont("helvetica", "normal");
    const intIntro = `Interventions are prioritized based on SENSO's Homo Amans philosophy—treating organizations as interconnected human systems rather than transactional machines. The critical path outlined below is designed to dismantle shadow architectures and rapidly re-establish systemic trust and execution alignment.`;
    const splitIntIntro = doc.splitTextToSize(intIntro, pageWidth - margin * 2);
    doc.text(splitIntIntro, margin, y);
    y += splitIntIntro.length * 5 + 15;

    if (reportData.roadmap && reportData.roadmap.length > 0) {
        autoTable(doc, {
            startY: y,
            head: [['Action', 'Owner', 'Timeline', 'Expected Impact']],
            body: reportData.roadmap.map((item: any) => [
                item.action,
                item.owner,
                item.timeline,
                item.impact
            ]),
            theme: 'grid',
            headStyles: { fillColor: [51, 65, 85], textColor: 255 }, // Dark slate
            styles: { cellPadding: 4, fontSize: 10, textColor: 40 },
            columnStyles: {
                0: { cellWidth: 70 },
                1: { cellWidth: 30 },
                2: { cellWidth: 25 },
                3: { cellWidth: 45 }
            },
            margin: { left: margin, right: margin }
        });
        y = (doc as any).lastAutoTable.finalY + 20;
    } else {
        // Fallback if the backend hasn't generated the advanced structure yet
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text("Immediate Recommended Action", margin, y);
        y += 8;

        doc.setFontSize(12);
        doc.setTextColor(...textColor);
        doc.setFont("helvetica", "normal");
        const splitAction = doc.splitTextToSize(reportData.intervention || "No action provided.", pageWidth - margin * 2);

        doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2], 0.1);
        doc.rect(margin, y - 5, pageWidth - margin * 2, splitAction.length * 5 + 10, 'F');
        doc.text(splitAction, margin + 5, y + 2);
        y += splitAction.length * 5 + 20;
    }

    // --- Methodology ---
    checkPageBreak(100);
    drawLineDivider();
    drawSectionTitle("Methodology & Data Security", reportData.detailed_findings ? "5" : "4");

    doc.setFontSize(10);
    doc.setTextColor(...secondaryColor);
    doc.setFont("helvetica", "normal");
    const methodology = `SENSO's diagnostic methodology combines deep organizational psychology with continuous multi-agent AI analysis (AMOS for network sociology & VED for cognitive psychology). By leveraging Organizational Triangulation, the system maps structural patterns across silos, stripping away political bias and "Artificial Harmony".\n\nAll data is processed within secure memory enclaves following enterprise-grade privacy protocols. This report was generated autonomously by the SENSO AI Cognitive Engine.`;
    const splitMethodology = doc.splitTextToSize(methodology, pageWidth - margin * 2);
    doc.text(splitMethodology, margin, y);

    addFooter(doc.getNumberOfPages());

    doc.save("SENSO_Executive_Diagnostic_Report.pdf");
};
