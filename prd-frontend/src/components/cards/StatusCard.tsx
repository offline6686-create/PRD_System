'use client';

import React from 'react';
import { HealthStatus } from '@/types';
import { Card, CardContent } from '@/components/ui/card';

interface StatusCardProps {
  title: string;
  subtitle?: string;
  status: HealthStatus;
  latencyMs?: number;
  uptime?: string;
  metrics?: Array<{ label: string; value: string | number }>;
  actions?: React.ReactNode;
}

export const StatusCard: React.FC<StatusCardProps> = ({
  title,
  subtitle,
  status,
  latencyMs,
  uptime,
  metrics,
  actions,
}) => {
  const getStatusColor = (st: HealthStatus) => {
    switch (st) {
      case 'online':
        return 'bg-emerald-500 shadow-emerald-500/50';
      case 'degraded':
        return 'bg-amber-500 shadow-amber-500/50';
      case 'offline':
        return 'bg-rose-500 shadow-rose-500/50';
      case 'maintenance':
        return 'bg-sky-500 shadow-sky-500/50';
    }
  };

  return (
    <Card className="bg-zinc-950/80 border-zinc-800/80 hover:border-zinc-700 transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <span
              className={`w-2.5 h-2.5 rounded-full shadow-lg ${getStatusColor(status)} animate-pulse`}
            />
            <div>
              <h4 className="text-sm font-semibold text-zinc-100 font-mono tracking-tight">
                {title}
              </h4>
              {subtitle && <p className="text-xs text-zinc-400">{subtitle}</p>}
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 uppercase">
            {status}
          </span>
        </div>

        {(latencyMs !== undefined || uptime) && (
          <div className="flex items-center gap-4 mt-3 text-xs font-mono text-zinc-400">
            {latencyMs !== undefined && (
              <div>
                Latency: <span className="text-zinc-200 font-semibold">{latencyMs}ms</span>
              </div>
            )}
            {uptime && (
              <div>
                Uptime: <span className="text-zinc-200 font-semibold">{uptime}</span>
              </div>
            )}
          </div>
        )}

        {metrics && metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-zinc-800/60 font-mono text-xs">
            {metrics.map((m, idx) => (
              <div key={idx} className="bg-zinc-900/60 p-2 rounded border border-zinc-800/40">
                <div className="text-[10px] text-zinc-500 uppercase">{m.label}</div>
                <div className="text-xs font-semibold text-zinc-200 truncate">{m.value}</div>
              </div>
            ))}
          </div>
        )}

        {actions && <div className="mt-3 pt-2">{actions}</div>}
      </CardContent>
    </Card>
  );
};
