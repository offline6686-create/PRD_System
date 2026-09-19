'use client';

import React from 'react';
import { Video } from 'lucide-react';
import { KpiCard } from '@/components/cards/KpiCard';
import { ActivityFeed } from '@/components/widgets/ActivityFeed';
import { EquityChartWidget } from '@/components/widgets/EquityChartWidget';
import { QuickActions } from '@/components/widgets/QuickActions';
import { useDashboard } from '@/hooks/useDashboard';
import { useTrading } from '@/hooks/useTrading';

export const DashboardView: React.FC = () => {
  const { kpis, activities, loading: loadingDash, filterLogs } = useDashboard();
  const { account } = useTrading();

  if (loadingDash) {
    return (
      <div className="flex items-center justify-center h-full font-mono text-xs text-zinc-400">
        Cargando Telemetría PRD OS...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stitch Design Live Session Banner */}
      <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-6 rounded-2xl flex flex-wrap justify-between items-center gap-4 shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Próxima Clase en Vivo & Sesión HFT
            </span>
          </div>
          <h3 className="text-xl font-black font-mono text-white tracking-tight">
            Integración de Sistemas PRD CORE & Trading Algorítmico
          </h3>
          <p className="text-xs text-zinc-400 font-sans">
            Control operativo en tiempo real e integración con servicios de infraestructura.
          </p>
        </div>
        <a
          href="https://zoom.us"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black font-bold font-mono px-6 py-3 rounded-xl text-xs hover:bg-zinc-200 transition flex items-center gap-2 shadow-xl shrink-0"
        >
          <Video className="w-4 h-4 text-black" /> Unirse a Zoom
        </a>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((item) => (
          <KpiCard key={item.id} item={item} />
        ))}
      </div>

      {/* Main Grid: Equity Chart + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EquityChartWidget account={account} />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Bottom Grid: Live Activity Feed */}
      <div className="grid grid-cols-1 gap-6">
        <ActivityFeed activities={activities} onFilterChange={filterLogs} />
      </div>
    </div>
  );
};
