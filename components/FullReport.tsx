import React from 'react';
import { AccessibilityReport, TestCategory, TestType } from '../types';
import AnalysisDisplay from './AnalysisDisplay';

interface FullReportProps {
  reports: AccessibilityReport[];
  analysis: string;
  onBack: () => void;
  onGeneratePdf: () => void;
  isAnalyzing: boolean;
}

const FullReport: React.FC<FullReportProps> = ({ reports, analysis, onBack, onGeneratePdf, isAnalyzing }) => {

    const getCategoryLabel = (key: string): string => {
        const withSpaces = key.replace(/([A-Z])/g, ' $1');
        return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
    };

    const getTestTypeName = (type: TestType) => {
        if (type === 'acessibilidade') return 'Teste de Acessibilidade';
        if (type === 'exploratorio') return 'Teste Exploratório';
        return 'Teste';
    }
    
    return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 dark:border-slate-700 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-0">Relatório Completo</h1>
          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-100 font-bold py-2 px-4 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
            >
              &larr; Voltar
            </button>
            <button
              onClick={onGeneratePdf}
              disabled={reports.length === 0}
              className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              Gerar PDF
            </button>
          </div>
        </div>

        {/* Individual Reports */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Resumo dos Testes</h2>
          {reports.map((report) => (
            <div key={report.id} className="border border-slate-200 dark:border-slate-700 p-6 rounded-xl">
              <div className="border-b border-slate-200 dark:border-slate-700 pb-3 mb-4">
                <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{report.screenName}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  <strong>Tipo:</strong> {getTestTypeName(report.testType)} | <strong>Data:</strong> {report.testDate} | <strong>Prioridade:</strong> {report.priority} | <strong>Responsável:</strong> {report.testerName}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-4">
                {Object.entries(report.categories).map(([key, value]: [string, TestCategory]) => {
                  const resultColor = value.result === 'Positivo' ? 'text-green-600 dark:text-green-400' : value.result === 'Negativo' ? 'text-red-500 dark:text-red-400' : 'text-slate-500 dark:text-slate-400';
                  
                  return (
                    <div key={key}>
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200">{getCategoryLabel(key)}</h4>
                        <p className="text-sm">
                            <span className={`font-bold ${resultColor}`}>{value.result}</span>
                            {value.observations && <span className="text-slate-600 dark:text-slate-400"> - {value.observations}</span>}
                        </p>
                    </div>
                  );
                })}
              </div>

              {report.generalObservations && (
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Observações Gerais</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap">{report.generalObservations}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* AI Analysis */}
        <div className="mt-12">
           <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-700 pt-8">Análise com IA Gemini</h2>
            <AnalysisDisplay analysis={analysis} isLoading={isAnalyzing} />
        </div>
      </div>
    </main>
  );
};

export default FullReport;
