'use client';

import React from 'react';
import { Cpu, Database, Play, RefreshCw, ShieldAlert, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const QuickActions: React.FC = () => {
  const actions = [
    {
      label: 'Desplegar Estrategia',
      icon: Play,
      color: 'bg-black text-white border-zinc-800 hover:border-white hover:bg-zinc-900',
      description: 'Lanzar bot de trading cuantitativo',
    },
    {
      label: 'Indexador Vectorial RAG',
      icon: Database,
      color: 'bg-black text-white border-zinc-800 hover:border-white hover:bg-zinc-900',
      description: 'Sincronizar base de conocimiento Qdrant',
    },
    {
      label: 'Reiniciar Agentes',
      icon: Cpu,
      color: 'bg-black text-white border-zinc-800 hover:border-white hover:bg-zinc-900',
      description: 'Reboot de procesos inactivos de la flota',
    },
    {
      label: 'Freno de Emergencia',
      icon: ShieldAlert,
      color: 'bg-rose-950/60 text-rose-200 border-rose-800 hover:border-rose-500 hover:bg-rose-900/80',
      description: 'Congelar ejecuciones activas de bots',
    },
  ];

  return (
    <Card className="bg-[#09090b] border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all shadow-2xl">
      <CardHeader className="p-4 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-white" />
          <CardTitle className="text-xs font-bold font-mono text-white uppercase tracking-wider">
            Acciones Rápidas CORE
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 grid grid-cols-1 gap-3">
        {actions.map((act, idx) => {
          const Icon = act.icon;
          return (
            <button
              key={idx}
              className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex items-start gap-3.5 group ${act.color}`}
            >
              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-700 shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold font-mono text-white flex items-center justify-between">
                  <span>{act.label}</span>
                  <RefreshCw className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                </div>
                <div className="text-[10px] text-zinc-400 font-sans mt-0.5 truncate">
                  {act.description}
                </div>
              </div>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
};
