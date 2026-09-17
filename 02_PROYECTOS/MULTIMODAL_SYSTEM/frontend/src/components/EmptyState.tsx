import React from 'react';
import { AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No hay datos disponibles todavía",
  message = "Configure una fuente de datos o agregue registros para comenzar."
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-slate-900/60 border border-slate-800 rounded-xl text-center">
      <AlertCircle className="w-12 h-12 text-slate-500 mb-4" />
      <h3 className="text-lg font-semibold text-slate-300 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-md">{message}</p>
    </div>
  );
};
