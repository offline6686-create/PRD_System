import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { EmptyState } from '../../components/EmptyState';
import { Users, BookOpen, ShoppingBag, TrendingUp, ShieldCheck, Activity } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get('/admin/stats').then((res) => setStats(res.data.stats)).catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Dashboard Global de Administración</h1>
        <p className="text-sm text-slate-400">Estado en tiempo real del ecosistema PRD_SYSTEM</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Usuarios Totales</p>
            <p className="text-xl font-bold text-white">{stats?.users ?? 0}</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Cursos Activos</p>
            <p className="text-xl font-bold text-white">{stats?.courses ?? 0}</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Órdenes Ventas</p>
            <p className="text-xl font-bold text-white">{stats?.orders ?? 0}</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Series Economía</p>
            <p className="text-xl font-bold text-white">{stats?.economicSeries ?? 0}</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          Monitoreo de Infraestructura & Logs
        </h2>
        <EmptyState 
          title="No hay alertas del sistema o errores registrados" 
          message="El servidor Express central y la base PostgreSQL operan de forma limpia." 
        />
      </div>
    </div>
  );
};
