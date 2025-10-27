
import React from 'react';

interface AnalysisDisplayProps {
  analysis: string;
  isLoading: boolean;
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis, isLoading }) => {
  const formatMarkdown = (text: string) => {
    // A simple markdown to HTML converter for demonstration
    // In a real app, you might use a library like 'marked' or 'react-markdown'
    let html = text
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-6 mb-3 border-b pb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
      .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*)\*/g, '<em>$1</em>')
      .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
      .replace(/\n/g, '<br />');

    // Wrap list items in <ul>
    html = html.replace(/(<li.*<\/li>)/gs, '<ul>$1</ul>').replace(/<\/ul><br \/><ul>/g, '');

    return { __html: html };
  };

  if (isLoading) {
    return (
      <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg animate-pulse">
        <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-5/6"></div>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <div className="mt-6 prose prose-slate dark:prose-invert max-w-none p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
      <div dangerouslySetInnerHTML={formatMarkdown(analysis)} />
    </div>
  );
};

export default AnalysisDisplay;
