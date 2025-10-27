import React from 'react';
import { TestCategory } from '../types';
import InfoTooltip from './InfoTooltip';

interface CategoryInputProps {
  id: string;
  title: string;
  description: string;
  value: TestCategory;
  onChange: (category: string, field: keyof TestCategory, value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({ id, title, description, value, onChange }) => {
  // Handle cases where value might be undefined during state transitions
  if (!value) return null;

  return (
    <div className="border border-slate-200 dark:border-slate-700 p-4 rounded-lg">
      <div className="flex items-center mb-2">
        <h3 className="text-md font-semibold text-slate-800 dark:text-slate-200">{title}</h3>
        <InfoTooltip text={description} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <div className="md:col-span-1">
          <label htmlFor={`${id}-result`} className="sr-only">Resultado</label>
          <select
            id={`${id}-result`}
            value={value.result}
            onChange={(e) => onChange(id, 'result', e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          >
            <option>Positivo</option>
            <option>Negativo</option>
            <option>N/A</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor={`${id}-obs`} className="sr-only">Observações</label>
          <textarea
            id={`${id}-obs`}
            rows={2}
            value={value.observations}
            onChange={(e) => onChange(id, 'observations', e.target.value)}
            placeholder="Observações (opcional)"
            className="w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default CategoryInput;