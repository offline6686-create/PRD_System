import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { EmptyState } from '../../components/EmptyState';
import { TrendingUp, Database, ExternalLink } from 'lucide-react';

export const EconomyDashboard: React.FC = () => {
  const [providers, setProviders] = useState<any[]>([]);

  useEffect(() => {
    api.get('/economy/providers').then((res) => setProviders(res.data.data)).catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Investigación Económica Global</h1>
        <p className="text-sm text-slate-400">Proveedores oficiales de datos macroeconómicos y mercados</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {providers.map((p) => (
          <div key={p.id} className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{p.country}</span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                p.status === 'AVAILABLE' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
              }`}>
                {p.status}
              </span>
            </div>
            <h3 className="font-semibold text-slate-200 text-sm leading-snug">{p.name}</h3>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Estado: Configurado</span>
              <Database className="w-4 h-4 text-slate-500" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          Indicadores Macroeconómicos
        </h2>
        <EmptyState 
          title="Todavía no hay series o indicadores sincronizados" 
          message="Ejecute una tarea de automatización o sincronización en n8n para descargar las series oficiales." 
        />
      </div>
    </div>
  );
};
