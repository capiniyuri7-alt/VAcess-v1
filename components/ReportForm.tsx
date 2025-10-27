import React, { useState } from 'react';
import { AccessibilityReport, TestCategory, TestType } from '../types';
import { 
  categoryDetails, 
  accessibilityCategories, 
  exploratoryCategories 
} from '../constants/categories';
import CategoryInput from './CategoryInput';

interface ReportFormProps {
  onAddReport: (report: Omit<AccessibilityReport, 'id'>) => void;
}

const getInitialFormState = (): Omit<AccessibilityReport, 'id' | 'testType' | 'categories'> => ({
  screenName: '',
  testDate: new Date().toISOString().split('T')[0],
  priority: 'Média',
  testerName: '',
  generalObservations: '',
});

const ReportForm: React.FC<ReportFormProps> = ({ onAddReport }) => {
  const [formData, setFormData] = useState(getInitialFormState());
  const [testType, setTestType] = useState<TestType | ''>('');
  const [categories, setCategories] = useState<{ [key: string]: TestCategory }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleTestTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTestType = e.target.value as TestType | '';
    setTestType(newTestType);

    if (newTestType === 'acessibilidade') {
      setCategories(JSON.parse(JSON.stringify(accessibilityCategories)));
    } else if (newTestType === 'exploratorio') {
      setCategories(JSON.parse(JSON.stringify(exploratoryCategories)));
    } else {
      setCategories({});
    }
    
    if (errors.testType) {
        setErrors(prev => ({ ...prev, testType: '' }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
        setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleCategoryChange = (category: string, field: keyof TestCategory, value: string) => {
    setCategories(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };
  
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!testType) newErrors.testType = "Por favor, selecione o tipo de teste.";
    if (!formData.screenName.trim()) newErrors.screenName = "O nome da tela é obrigatório.";
    if (!formData.testerName.trim()) newErrors.testerName = "O nome do responsável é obrigatório.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    onAddReport({
        ...formData,
        testType: testType as TestType,
        categories,
    });
    
    setFormData(getInitialFormState());
    setTestType('');
    setCategories({});
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg space-y-6" noValidate>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-4">📋 Novo Teste de Tela</h2>
      
      <div>
        <label htmlFor="testType" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tipo de Teste</label>
        <select id="testType" value={testType} onChange={handleTestTypeChange} className="w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
          <option value="">Selecione um tipo...</option>
          <option value="acessibilidade">Teste de Acessibilidade</option>
          <option value="exploratorio">Teste Exploratório</option>
        </select>
        {errors.testType && <p className="text-red-500 text-sm mt-1" role="alert">{errors.testType}</p>}
      </div>

      {testType && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="screenName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome da Tela</label>
              <input type="text" id="screenName" value={formData.screenName} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
               {errors.screenName && <p className="text-red-500 text-sm mt-1" role="alert">{errors.screenName}</p>}
            </div>
            <div>
              <label htmlFor="testDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Data do Teste</label>
              <input type="date" id="testDate" value={formData.testDate} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Prioridade</label>
              <select id="priority" value={formData.priority} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                <option>Alta</option>
                <option>Média</option>
                <option>Baixa</option>
              </select>
            </div>
            <div>
              <label htmlFor="testerName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Responsável pelo Teste</label>
              <input type="text" id="testerName" value={formData.testerName} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
              {errors.testerName && <p className="text-red-500 text-sm mt-1" role="alert">{errors.testerName}</p>}
            </div>
          </div>
          
          <div className="space-y-4">
            {categoryDetails[testType].map(cat => (
              <CategoryInput
                key={cat.id}
                id={cat.id}
                title={cat.title}
                description={cat.description}
                value={categories[cat.id]}
                onChange={handleCategoryChange}
              />
            ))}
          </div>

          <div>
            <label htmlFor="generalObservations" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Observações Gerais</label>
            <textarea id="generalObservations" value={formData.generalObservations} onChange={handleChange} rows={4} className="w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Adicionar Tela ao Relatório</button>
        </>
      )}
    </form>
  );
};

export default ReportForm;
