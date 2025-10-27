
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-slate-800 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <span className="text-3xl mr-2">🧪</span>
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
              Accessibility Report Analyzer
            </h1>
          </div>
          <a
            href="https://ai.google.dev/gemini-api/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Powered by Gemini
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
