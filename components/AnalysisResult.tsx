import React from 'react';
import { WasteAnalysis } from '../types';
import { RefreshCw, Trash2, Leaf, Zap, AlertTriangle, HelpCircle } from 'lucide-react';

interface AnalysisResultProps {
  result: WasteAnalysis;
  onReset: () => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, onReset }) => {
  
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'Recyclable':
        return {
          bg: 'bg-emerald-50 border-emerald-200',
          text: 'text-emerald-800',
          icon: <RefreshCw className="w-12 h-12 text-emerald-600" />,
          badge: 'bg-emerald-100 text-emerald-700'
        };
      case 'Compost':
        return {
          bg: 'bg-lime-50 border-lime-200',
          text: 'text-lime-800',
          icon: <Leaf className="w-12 h-12 text-lime-600" />,
          badge: 'bg-lime-100 text-lime-700'
        };
      case 'E-Waste':
        return {
          bg: 'bg-violet-50 border-violet-200',
          text: 'text-violet-800',
          icon: <Zap className="w-12 h-12 text-violet-600" />,
          badge: 'bg-violet-100 text-violet-700'
        };
      case 'Hazardous':
        return {
          bg: 'bg-amber-50 border-amber-200',
          text: 'text-amber-800',
          icon: <AlertTriangle className="w-12 h-12 text-amber-600" />,
          badge: 'bg-amber-100 text-amber-700'
        };
      case 'Trash':
        return {
          bg: 'bg-slate-50 border-slate-200',
          text: 'text-slate-800',
          icon: <Trash2 className="w-12 h-12 text-slate-600" />,
          badge: 'bg-slate-200 text-slate-700'
        };
      default:
        return {
          bg: 'bg-gray-50 border-gray-200',
          text: 'text-gray-800',
          icon: <HelpCircle className="w-12 h-12 text-gray-600" />,
          badge: 'bg-gray-200 text-gray-700'
        };
    }
  };

  const styles = getCategoryStyles(result.category);

  return (
    <div className="w-full max-w-md animate-fade-in-up">
      <div className={`rounded-3xl border-2 p-8 shadow-xl ${styles.bg} transition-all duration-300`}>
        
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-4 bg-white rounded-full shadow-sm">
            {styles.icon}
          </div>
          
          <div>
            <span className={`px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide ${styles.badge}`}>
              {result.category}
            </span>
            <h2 className={`mt-3 text-3xl font-extrabold ${styles.text}`}>
              {result.itemName}
            </h2>
          </div>

          <div className="w-full h-px bg-black/5 my-4" />

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Disposal Instructions
            </h3>
            <p className="text-lg font-medium text-gray-800 leading-relaxed">
              {result.disposalAdvice}
            </p>
          </div>
          
          {result.confidenceScore < 60 && (
             <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 text-xs rounded-lg border border-yellow-100 flex items-center gap-2">
               <AlertTriangle className="w-4 h-4" />
               <span>AI confidence is low. Please double-check locally.</span>
             </div>
          )}

        </div>

        <button
          onClick={onReset}
          className="mt-8 w-full py-4 bg-white hover:bg-gray-50 text-gray-900 font-bold rounded-xl shadow-md border border-gray-200 transition-all active:scale-95"
        >
          Scan Another Item
        </button>
      </div>
    </div>
  );
};
