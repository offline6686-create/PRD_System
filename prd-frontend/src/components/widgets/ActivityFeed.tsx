'use client';

import React, { useState } from 'react';
import { Activity, AlertTriangle, CheckCircle2, Info, Terminal } from 'lucide-react';
import { ActivityLogItem, LogLevel } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ActivityFeedProps {
  activities: ActivityLogItem[];
  onFilterChange?: (level: string) => void;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities, onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const handleFilter = (level: string) => {
    setSelectedFilter(level);
    if (onFilterChange) {
      onFilterChange(level);
    }
  };

  const getLevelBadge = (lvl: LogLevel) => {
    switch (lvl) {
      case 'EXEC':
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" />
            EXEC
          </span>
        );
      case 'WARN':
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertTriangle className="w-3 h-3" />
            WARN
          </span>
        );
      case 'ERROR':
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertTriangle className="w-3 h-3" />
            ERROR
          </span>
        );
      case 'INFO':
      default:
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
            <Info className="w-3 h-3" />
            INFO
          </span>
        );
    }
  };

  return (
    <Card className="bg-[#09090b] border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all shadow-2xl flex flex-col h-full">
      <CardHeader className="p-4 border-b border-zinc-800 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-white" />
          <CardTitle className="text-xs font-bold font-mono text-white uppercase tracking-wider">
            Auditoría de Eventos & Telemetría CORE
          </CardTitle>
        </div>
        <div className="flex items-center gap-1">
          {['ALL', 'EXEC', 'INFO', 'WARN'].map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilter(filter)}
              className={`text-[10px] font-mono px-2.5 py-1 rounded-lg transition-colors ${
                selectedFilter === filter
                  ? 'bg-white text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-y-auto max-h-[380px] divide-y divide-zinc-900">
        {activities.length === 0 ? (
          <div className="p-8 text-center text-xs font-mono text-zinc-500">
            No hay registros que coincidan con el filtro.
          </div>
        ) : (
          activities.map((item) => (
            <div
              key={item.id}
              className="p-4 hover:bg-zinc-950 transition-colors flex items-start gap-3.5"
            >
              <div className="pt-0.5">{getLevelBadge(item.level)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span className="text-white font-bold">{item.source}</span>
                  <span className="text-zinc-400">{item.timestamp}</span>
                </div>
                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  {item.message}
                </p>
                {item.details && (
                  <div className="mt-2 p-2.5 bg-black rounded-lg border border-zinc-800 font-mono text-[10px] text-zinc-400 overflow-x-auto flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-white shrink-0" />
                    <span>{JSON.stringify(item.details)}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
