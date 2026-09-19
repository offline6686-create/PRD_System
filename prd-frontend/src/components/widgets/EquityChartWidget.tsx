'use client';

import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { Account } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EquityChartWidgetProps {
  account: Account | null;
}

export const EquityChartWidget: React.FC<EquityChartWidgetProps> = ({ account }) => {
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '1Y' | 'ALL'>('1M');

  const points = [
    { label: '01 Sep', val: 132000 },
    { label: '04 Sep', val: 134200 },
    { label: '08 Sep', val: 131800 },
    { label: '12 Sep', val: 136400 },
    { label: '15 Sep', val: 139100 },
    { label: '18 Sep', val: 142850 },
  ];

  const min = Math.min(...points.map((p) => p.val));
  const max = Math.max(...points.map((p) => p.val));
  const range = max - min || 1;

  const svgWidth = 600;
  const svgHeight = 160;

  const coords = points.map((p, idx) => {
    const x = (idx / (points.length - 1)) * svgWidth;
    const y = svgHeight - ((p.val - min) / range) * (svgHeight - 40) - 20;
    return { x, y };
  });

  const pathD = coords.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x},${curr.y}` : `${acc} L ${curr.x},${curr.y}`;
  }, '');

  const areaD = `${pathD} L ${svgWidth},${svgHeight} L 0,${svgHeight} Z`;

  return (
    <Card className="bg-[#09090b] border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all shadow-2xl">
      <CardHeader className="p-5 border-b border-zinc-800/80 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <div>
            <CardTitle className="text-sm font-bold font-mono text-white uppercase tracking-wider">
              Curva de Equity & Asignación de Capital
            </CardTitle>
            <div className="text-xs text-zinc-400 font-mono mt-0.5">
              Rendimiento acumulado TradingView Style
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-black p-1 rounded-xl border border-zinc-800">
          {(['1D', '1W', '1M', '1Y', 'ALL'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`text-[10px] font-mono px-2.5 py-1 rounded-lg transition-all ${
                timeframe === tf
                  ? 'bg-white text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 font-mono">
          <div className="bg-black p-3.5 rounded-xl border border-zinc-800">
            <div className="text-[10px] text-zinc-400 uppercase">Equity Total</div>
            <div className="text-lg font-black text-white">
              ${account?.totalEquityUsd.toLocaleString() || '142,850.45'}
            </div>
          </div>
          <div className="bg-black p-3.5 rounded-xl border border-zinc-800">
            <div className="text-[10px] text-zinc-400 uppercase">PnL Diario</div>
            <div className="text-lg font-black text-emerald-400">
              +${account?.dailyPnlUsd.toLocaleString() || '1,240.50'} (
              {account?.dailyPnlPercent || 0.88}%)
            </div>
          </div>
          <div className="bg-black p-3.5 rounded-xl border border-zinc-800">
            <div className="text-[10px] text-zinc-400 uppercase">Ratio Sharpe</div>
            <div className="text-lg font-black text-white">
              {account?.sharpeRatio || 2.84}
            </div>
          </div>
          <div className="bg-black p-3.5 rounded-xl border border-zinc-800">
            <div className="text-[10px] text-zinc-400 uppercase">Max Drawdown</div>
            <div className="text-lg font-black text-rose-400">
              {account?.maxDrawdownPercent || 4.15}%
            </div>
          </div>
        </div>

        {/* SVG Equity Chart */}
        <div className="relative h-44 w-full bg-black rounded-xl p-3 border border-zinc-800 overflow-hidden">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path d={areaD} fill="url(#equityGradient)" />
            <path
              d={pathD}
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {coords.map((c, i) => (
              <circle
                key={i}
                cx={c.x}
                cy={c.y}
                r="4"
                className="fill-white stroke-black stroke-2 hover:r-6 transition-all cursor-pointer"
              />
            ))}
          </svg>

          <div className="flex justify-between text-[10px] font-mono text-zinc-400 mt-2">
            {points.map((p, idx) => (
              <span key={idx}>{p.label}</span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
