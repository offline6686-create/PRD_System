'use client';

import React from 'react';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import { KpiItem } from '@/types';
import { Card, CardContent } from '@/components/ui/card';

interface KpiCardProps {
  item: KpiItem;
}

export const KpiCard: React.FC<KpiCardProps> = ({ item }) => {
  const isPositive = item.change > 0;
  const isNegative = item.change < 0;

  return (
    <Card className="bg-[#09090b] border-zinc-800 rounded-2xl hover:border-white transition-all duration-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.12)]">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-center justify-between text-xs text-zinc-400 font-mono uppercase tracking-wider">
          <span>{item.title}</span>
          <div
            className={`flex items-center text-[11px] font-mono px-2 py-0.5 rounded-full border ${
              isPositive
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : isNegative
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                : 'bg-zinc-900 text-zinc-400 border-zinc-700'
            }`}
          >
            {isPositive && <ArrowUpRight className="w-3 h-3 mr-1" />}
            {isNegative && <ArrowDownRight className="w-3 h-3 mr-1" />}
            {!isPositive && !isNegative && <Minus className="w-3 h-3 mr-1" />}
            {item.change > 0 ? `+${item.change}%` : `${item.change}%`}
          </div>
        </div>

        <div className="flex items-baseline justify-between">
          <h3 className="text-2xl font-black font-mono text-white tracking-tight">
            {item.value}
          </h3>
          {item.timeframe && (
            <span className="text-[10px] text-zinc-400 font-mono">{item.timeframe}</span>
          )}
        </div>

        {item.subtext && (
          <p className="text-xs text-zinc-400 font-mono truncate">{item.subtext}</p>
        )}

        {item.sparkline && item.sparkline.length > 0 && (
          <div className="pt-2 border-t border-zinc-800/80 flex items-end gap-1.5 h-7">
            {item.sparkline.map((val, idx) => {
              const max = Math.max(...item.sparkline!);
              const min = Math.min(...item.sparkline!);
              const range = max - min || 1;
              const heightPct = Math.max(20, Math.round(((val - min) / range) * 100));

              return (
                <div
                  key={idx}
                  className="flex-1 bg-zinc-800 rounded-t hover:bg-white transition-all"
                  style={{ height: `${heightPct}%` }}
                />
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
