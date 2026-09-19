'use client';

import React from 'react';
import { BarChart3, Clock, Cpu, HardDrive, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const AnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
        <Card className="bg-zinc-950/80 border-zinc-800/80">
          <CardContent className="p-4">
            <div className="text-[10px] text-zinc-400 uppercase">Order Execution Latency</div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">4.2 ms avg</div>
            <div className="text-[10px] text-zinc-500 mt-1">P99 Latency: 12.8ms</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-950/80 border-zinc-800/80">
          <CardContent className="p-4">
            <div className="text-[10px] text-zinc-400 uppercase">LLM Agent Token Usage</div>
            <div className="text-2xl font-bold text-zinc-100 mt-1">1.42M tokens</div>
            <div className="text-[10px] text-zinc-500 mt-1">Estimated Cost: $14.20/day</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-950/80 border-zinc-800/80">
          <CardContent className="p-4">
            <div className="text-[10px] text-zinc-400 uppercase">Database Queries / sec</div>
            <div className="text-2xl font-bold text-sky-400 mt-1">185 TPS</div>
            <div className="text-[10px] text-zinc-500 mt-1">Cache Hit Rate: 99.8%</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-950/80 border-zinc-800/80 font-mono">
        <CardHeader className="p-4 border-b border-zinc-800/60">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            <CardTitle className="text-sm font-semibold text-zinc-100 uppercase">
              System Resource & Performance Telemetry
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-48 bg-zinc-900/40 rounded border border-zinc-800/60 flex items-center justify-center text-xs text-zinc-400">
            [ Interactive Resource Load & Analytics Histogram ]
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
