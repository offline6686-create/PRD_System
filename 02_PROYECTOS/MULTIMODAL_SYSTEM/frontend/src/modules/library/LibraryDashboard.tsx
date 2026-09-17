import React from 'react';
import { EmptyState } from '../../components/EmptyState';

export const LibraryDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Biblioteca Digital Central</h1>
        <p className="text-sm text-slate-400">Repositorio de conocimientos, PDFs, audios y multimedia</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
        <EmptyState title="Todavía no hay recursos digitales guardados" message="Cargue nuevos documentos o backing tracks para poblar la biblioteca." />
      </div>
    </div>
  );
};
