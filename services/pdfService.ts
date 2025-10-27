import { jsPDF } from 'jspdf';
import { AccessibilityReport } from '../types';

export const generatePdf = (reports: AccessibilityReport[]) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('Relatório de Teste de Acessibilidade', 14, 22);
  let y = 35;

  reports.forEach((tela, index) => {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(14);
    doc.text(`Tela ${index + 1}: ${tela.screenName}`, 14, y);
    y += 8;
    
    doc.setFontSize(10);
    doc.text(`Data: ${tela.testDate} | Prioridade: ${tela.priority} | Responsável: ${tela.testerName}`, 14, y);
    y += 10;

    Object.entries(tela.categories).forEach(([key, value]) => {
      if (y > 270) {
          doc.addPage();
          y = 20;
      }
      doc.setFontSize(11);
      const categoryName = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
      doc.text(`• ${categoryName}: ${value.result}`, 16, y);
      y += 6;
      if (value.observations) {
          doc.setFontSize(9);
          const splitObs = doc.splitTextToSize(`  Obs: ${value.observations}`, 170);
          doc.text(splitObs, 18, y);
          y += (splitObs.length * 4) + 2;
      }
    });

    if (tela.generalObservations) {
      if (y > 270) {
          doc.addPage();
          y = 20;
      }
      doc.setFontSize(11);
      doc.text('Observações Gerais:', 14, y);
      y += 6;
      doc.setFontSize(9);
      const splitGeneralObs = doc.splitTextToSize(tela.generalObservations, 180);
      doc.text(splitGeneralObs, 16, y);
      y += (splitGeneralObs.length * 4) + 2;
    }
    y += 10;
    if (index < reports.length - 1) {
        doc.line(14, y-5, 196, y-5);
    }
  });

  doc.save('relatorio_acessibilidade.pdf');
};
