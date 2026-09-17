import React from 'react';
import { EmptyState } from '../../components/EmptyState';

export const TradingDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Módulo de Trading & Backtesting</h1>
        <p className="text-sm text-slate-400">Estrategias, gestión de riesgo y análisis cuantitativo (Solo Administrador)</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
        <EmptyState title="Todavía no hay estrategias de trading activas" message="Configure un script de backtesting en TRADING_SYSTEM para desplegar los bots." />
      </div>
    </div>
  );
};
