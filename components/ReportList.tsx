
import React from 'react';
import { AccessibilityReport, TestCategory } from '../types';

interface ReportListProps {
  reports: AccessibilityReport[];
  onRemoveReport: (id: string) => void;
  onGeneratePdf: () => void;
}

const ReportList: React.FC<ReportListProps> = ({ reports, onRemoveReport, onGeneratePdf }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-4 mb-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Relatórios Adicionados</h2>
        <button
            onClick={onGeneratePdf}
            disabled={reports.length === 0}
            className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
            Gerar PDF
        </button>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {reports.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-500 dark:text-slate-400">Nenhum relatório adicionado ainda.</p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">Clique em "Novo Teste de Tela" para começar.</p>
          </div>
        ) : (
          reports.map((report) => (
            <div key={report.id} className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">{report.screenName}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{report.testDate} - por {report.testerName}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {Object.values(report.categories).some((c: TestCategory) => c.result === 'Negativo') ? 
                    <span className="text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/70 dark:text-red-200 px-2 py-1 rounded-full">
                      Problemas Encontrados
                    </span>
                   : 
                    <span className="text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/70 dark:text-green-200 px-2 py-1 rounded-full">
                      Tudo OK
                    </span>
                  }
                </div>
              </div>
              <button 
                onClick={() => onRemoveReport(report.id)} 
                className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label={`Remover relatório da tela ${report.screenName}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReportList;
