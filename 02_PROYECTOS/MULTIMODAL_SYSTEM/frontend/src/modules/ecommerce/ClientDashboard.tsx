import React from 'react';
import { EmptyState } from '../../components/EmptyState';

export const ClientDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Catálogo E-commerce</h1>
        <p className="text-sm text-slate-400">Productos disponibles y compras en línea</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
        <EmptyState title="Todavía no hay productos cargados en el catálogo" message="Consulte más tarde para ver las novedades de la tienda." />
      </div>
    </div>
  );
};
