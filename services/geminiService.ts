import { GoogleGenAI } from "@google/genai";
import { AccessibilityReport } from '../types';

const formatReportsForGeminiPrompt = (reports: AccessibilityReport[]): string => {
  let formattedString = "Relatórios de Teste:\n\n";
  reports.forEach((report, index) => {
    formattedString += `--- RELATÓRIO ${index + 1} ---\n`;
    formattedString += `Tela: ${report.screenName}\n`;
    const testTypeName = report.testType === 'acessibilidade' ? 'Teste de Acessibilidade' : 'Teste Exploratório';
    formattedString += `Tipo de Teste: ${testTypeName}\n`;
    formattedString += `Data: ${report.testDate}\n`;
    formattedString += `Prioridade: ${report.priority}\n`;
    formattedString += `Responsável: ${report.testerName}\n\n`;
    formattedString += `Resultados por Categoria:\n`;
    Object.entries(report.categories).forEach(([key, value]) => {
      const categoryName = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
      formattedString += `- ${categoryName}:\n`;
      formattedString += `  - Resultado: ${value.result}\n`;
      if (value.observations) {
        formattedString += `  - Observações: ${value.observations}\n`;
      }
    });
    if (report.generalObservations) {
      formattedString += `\nObservações Gerais: ${report.generalObservations}\n`;
    }
    formattedString += `--- FIM DO RELATÓRIO ${index + 1} ---\n\n`;
  });
  return formattedString;
};

export const analyzeAccessibilityReports = async (reports: AccessibilityReport[]): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Erro: A chave da API Gemini não foi configurada. Verifique as configurações do ambiente.";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-2.5-flash';
  
  const systemInstruction = `Você é um especialista sênior em garantia de qualidade de software (QA) e acessibilidade web. Sua tarefa é analisar o(s) seguinte(s) relatório(s) de teste.
Os relatórios podem ser de diferentes tipos (ex: Acessibilidade, Exploratório). Adapte sua análise ao tipo de teste indicado.

Com base nos dados fornecidos, realize as seguintes ações:
1.  **Resumo Executivo:** Forneça um resumo conciso dos principais problemas encontrados em todos os relatórios, destacando os pontos mais críticos.
2.  **Padrões Recorrentes:** Identifique se existem problemas que se repetem em diferentes telas ou categorias. Isso ajuda a encontrar falhas sistêmicas.
3.  **Análise Detalhada e Recomendações:** Para cada ponto negativo ("Negativo") identificado, forneça uma explicação clara do problema, o impacto para o usuário (especialmente para acessibilidade) e sugira soluções técnicas e práticas para corrigi-lo. Seja específico e considere o contexto do tipo de teste.
4.  **Pontos Positivos:** Destaque brevemente as áreas que passaram nos testes ("Positivo") para reforçar boas práticas.

Formate sua resposta usando markdown para clareza e legibilidade. Use títulos, listas e negrito para organizar a informação. A resposta deve ser em português do Brasil.`;

  const userPrompt = formatReportsForGeminiPrompt(reports);

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `Falha ao obter análise da API Gemini: ${error.message}`;
    }
    return "Falha ao obter análise da API Gemini devido a um erro desconhecido.";
  }
};
