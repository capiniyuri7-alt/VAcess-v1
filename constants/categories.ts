import { TestCategory, TestType } from '../types';

export interface CategoryInfo {
  id: string;
  title: string;
  description: string;
}

export type CategoryDetailsMap = {
  [key in TestType]: CategoryInfo[];
};

export const initialCategoryState: TestCategory = { result: 'Positivo', observations: '' };

export const accessibilityCategories: { [key: string]: TestCategory } = {
  screenReader: { ...initialCategoryState },
  contrast: { ...initialCategoryState },
  magnification: { ...initialCategoryState },
  keyboardNav: { ...initialCategoryState },
  colorUsage: { ...initialCategoryState },
  responsiveness: { ...initialCategoryState },
  altText: { ...initialCategoryState },
  formLabels: { ...initialCategoryState },
};

export const exploratoryCategories: { [key: string]: TestCategory } = {
  functionality: { ...initialCategoryState },
  usability: { ...initialCategoryState },
  performance: { ...initialCategoryState },
  visualConsistency: { ...initialCategoryState },
  errorHandling: { ...initialCategoryState },
  dataIntegrity: { ...initialCategoryState },
  securityChecks: { ...initialCategoryState },
};

export const categoryDetails: CategoryDetailsMap = {
  acessibilidade: [
    { id: 'screenReader', title: '🗣️ Leitor de Tela', description: 'Todos os elementos são lidos corretamente e em ordem lógica.' },
    { id: 'contrast', title: '🎨 Contraste', description: 'O contraste entre texto e fundo atende aos padrões WCAG.' },
    { id: 'magnification', title: '🔍 Ampliação', description: 'A interface permanece funcional e legível com zoom de até 200%.' },
    { id: 'keyboardNav', title: '⌨️ Navegação por Teclado', description: 'Todos os elementos interativos são acessíveis usando apenas o teclado.' },
    { id: 'colorUsage', title: '🌈 Uso de Cores', description: 'A informação não depende exclusivamente da cor para ser compreendida.' },
    { id: 'responsiveness', title: '📱 Responsividade', description: 'A interface se adapta corretamente a diferentes tamanhos de tela.' },
    { id: 'altText', title: '🖼️ Texto Alternativo', description: 'Todas as imagens informativas possuem texto alternativo (alt text) descritivo.' },
    { id: 'formLabels', title: '📝 Rótulos de Formulário', description: 'Todos os campos de formulário têm rótulos (labels) associados corretamente.' },
  ],
  exploratorio: [
      { id: 'functionality', title: '⚙️ Funcionalidade Principal', description: 'As principais funcionalidades da tela operam como esperado.' },
      { id: 'usability', title: '🖱️ Usabilidade e Fluxo', description: 'O fluxo de usuário é intuitivo e livre de obstáculos.' },
      { id: 'performance', title: '⚡ Desempenho', description: 'A tela carrega e responde em um tempo aceitável.' },
      { id: 'visualConsistency', title: '🖼️ Consistência Visual', description: 'O design da tela é consistente com o restante da aplicação.' },
      { id: 'errorHandling', title: '⚠️ Manipulação de Erros', description: 'Mensagens de erro são claras e ajudam o usuário a corrigir o problema.' },
      { id: 'dataIntegrity', title: '💾 Integridade dos Dados', description: 'Os dados são salvos, atualizados e exibidos corretamente após as ações do usuário.' },
      { id: 'securityChecks', title: '🔒 Verificações de Segurança', description: 'A tela lida adequadamente com permissões e não expõe dados sensíveis.' },
  ]
};
