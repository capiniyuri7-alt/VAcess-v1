
import React, { useState, useCallback } from 'react';
import { AccessibilityReport } from './types';
import { analyzeAccessibilityReports } from './services/geminiService';
import { generatePdf } from './services/pdfService';
import ReportForm from './components/ReportForm';
import ReportList from './components/ReportList';
import Header from './components/Header';
import FullReport from './components/FullReport';

const App: React.FC = () => {
  const [reports, setReports] = useState<AccessibilityReport[]>([]);
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'home' | 'form' | 'report'>('home');

  const handleAddReport = useCallback((report: Omit<AccessibilityReport, 'id'>) => {
    const newReport = { ...report, id: `report-${Date.now()}` };
    setReports(prevReports => [...prevReports, newReport]);
    setViewMode('home');
  }, []);

  const handleRemoveReport = useCallback((id: string) => {
    setReports(prevReports => prevReports.filter(report => report.id !== id));
  }, []);

  const handleAnalyze = async () => {
    if (reports.length === 0) return;
    setIsAnalyzing(true);
    setAnalysis('');
    setError(null);
    try {
      const result = await analyzeAccessibilityReports(reports);
      // Check if the result indicates an error from the service
      if (result.startsWith('Erro:') || result.startsWith('Falha:')) {
          setError(result);
      } else {
          setAnalysis(result);
      }
      setViewMode('report');
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Ocorreu um erro ao analisar os relatórios: ${errorMessage}`);
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleGeneratePdf = () => {
    generatePdf(reports);
  };

  const handleBackToHome = useCallback(() => {
    setViewMode('home');
    setAnalysis('');
    setError(null);
  }, []);

  const handleNewTest = useCallback(() => {
    setViewMode('form');
  }, []);

  const renderContent = () => {
    switch (viewMode) {
      case 'report':
        return (
          <FullReport
            reports={reports}
            analysis={analysis}
            onBack={handleBackToHome}
            onGeneratePdf={handleGeneratePdf}
            isAnalyzing={isAnalyzing}
          />
        );
      case 'form':
        return (
          <main className="container mx-auto p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <button 
                  onClick={handleBackToHome} 
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold flex items-center gap-2 transition-colors"
                  aria-label="Voltar ao Painel"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Voltar ao Painel
                </button>
              </div>
              <ReportForm onAddReport={handleAddReport} />
            </div>
          </main>
        );
      case 'home':
      default:
        return (
          <main className="container mx-auto p-4 md:p-8">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Painel de Relatórios
              </h2>
              <button 
                onClick={handleNewTest} 
                className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Novo Teste de Tela
              </button>
            </div>
            <div className="space-y-8">
              <ReportList reports={reports} onRemoveReport={handleRemoveReport} onGeneratePdf={handleGeneratePdf}/>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Análise com IA Gemini</h2>
                <p className="mb-4 text-slate-600 dark:text-slate-400">
                  Após adicionar os relatórios, clique para gerar uma análise detalhada e sugestões de melhoria.
                </p>
                <button
                  onClick={handleAnalyze}
                  disabled={reports.length === 0 || isAnalyzing}
                  className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-live="polite"
                >
                  {isAnalyzing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analisando...
                    </>
                  ) : 'Analisar e Ver Relatório Completo'}
                </button>
                {error && <p className="text-red-500 mt-4" role="alert">{error}</p>}
              </div>
            </div>
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200">
      <Header />
      {renderContent()}
    </div>
  );
};

export default App;
