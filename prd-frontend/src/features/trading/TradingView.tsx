'use client';

import React, { useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Globe,
  Pause,
  Play,
  ShieldCheck,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { NavigationMenu } from '@/components/layout/NavigationMenu';
import { EquityChartWidget } from '@/components/widgets/EquityChartWidget';
import { useTrading } from '@/hooks/useTrading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TradingView: React.FC = () => {
  const { account, brokers, bots, positions, trades, loading, toggleBot } = useTrading();
  const [activeTab, setActiveTab] = useState('bots');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full font-mono text-xs text-zinc-400">
        Initializing Trading Terminal...
      </div>
    );
  }

  const tabs = [
    { id: 'bots', label: 'Active Bots', count: bots.length },
    { id: 'positions', label: 'Open Positions', count: positions.length },
    { id: 'brokers', label: 'Broker Connections', count: brokers.length },
    { id: 'trades', label: 'Execution History', count: trades.length },
  ];

  return (
    <div className="space-y-6">
      {/* Portfolio Equity Summary */}
      <EquityChartWidget account={account} />

      {/* Navigation Sub-Menu */}
      <NavigationMenu tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab: Active Bots */}
      {activeTab === 'bots' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {bots.map((bot) => {
              const isPositive = bot.pnlDailyUsd >= 0;
              return (
                <Card
                  key={bot.id}
                  className="bg-zinc-950/80 border-zinc-800/80 hover:border-zinc-700 transition-all"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Bot className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs font-mono font-semibold text-zinc-100">
                            {bot.name}
                          </span>
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400 mt-0.5">
                          {bot.pair} • {bot.broker}
                        </div>
                      </div>
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded uppercase ${
                          bot.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {bot.status}
                      </span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-800/60 font-mono">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-zinc-400">Daily PnL</span>
                        <span
                          className={`text-sm font-bold flex items-center ${
                            isPositive ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {isPositive ? (
                            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                          ) : (
                            <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                          )}
                          ${bot.pnlDailyUsd.toFixed(2)} ({bot.pnlDailyPercent}%)
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-3 text-[11px] text-zinc-400 bg-zinc-900/60 p-2 rounded border border-zinc-800/60">
                        <div>
                          Win Rate:{' '}
                          <span className="text-zinc-200 font-semibold">{bot.winRate}%</span>
                        </div>
                        <div>
                          Trades:{' '}
                          <span className="text-zinc-200 font-semibold">{bot.totalTrades}</span>
                        </div>
                        <div>
                          Max DD:{' '}
                          <span className="text-rose-400 font-semibold">
                            {bot.maxDrawdownPercent}%
                          </span>
                        </div>
                        <div>
                          Uptime: <span className="text-zinc-200">{bot.uptime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-zinc-500">
                        {bot.strategy}
                      </span>
                      <button
                        onClick={() => toggleBot(bot.id)}
                        className={`px-3 py-1 rounded text-xs font-mono flex items-center gap-1 transition-all ${
                          bot.status === 'active'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                        }`}
                      >
                        {bot.status === 'active' ? (
                          <>
                            <Pause className="w-3 h-3" /> Pause
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3" /> Start
                          </>
                        )}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab: Open Positions */}
      {activeTab === 'positions' && (
        <Card className="bg-zinc-950/80 border-zinc-800/80">
          <CardHeader className="p-4 border-b border-zinc-800/60">
            <CardTitle className="text-sm font-semibold font-mono text-zinc-100 uppercase">
              Live Open Positions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left font-mono text-xs text-zinc-300">
              <thead className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800 text-[10px] uppercase">
                <tr>
                  <th className="p-3">Symbol</th>
                  <th className="p-3">Side</th>
                  <th className="p-3">Size</th>
                  <th className="p-3">Entry Price</th>
                  <th className="p-3">Mark Price</th>
                  <th className="p-3">Unrealized PnL</th>
                  <th className="p-3">Leverage</th>
                  <th className="p-3">Broker</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {positions.map((pos) => {
                  const isPos = pos.unrealizedPnlUsd >= 0;
                  return (
                    <tr key={pos.id} className="hover:bg-zinc-900/50">
                      <td className="p-3 font-bold text-zinc-100">{pos.symbol}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            pos.side === 'BUY'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}
                        >
                          {pos.side}
                        </span>
                      </td>
                      <td className="p-3">{pos.size}</td>
                      <td className="p-3">${pos.entryPrice.toLocaleString()}</td>
                      <td className="p-3">${pos.markPrice.toLocaleString()}</td>
                      <td className="p-3">
                        <span className={isPos ? 'text-emerald-400' : 'text-rose-400'}>
                          ${pos.unrealizedPnlUsd.toFixed(2)} ({pos.unrealizedPnlPercent}%)
                        </span>
                      </td>
                      <td className="p-3">{pos.leverage}x</td>
                      <td className="p-3 text-zinc-400">{pos.broker}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Tab: Broker Connections */}
      {activeTab === 'brokers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {brokers.map((broker) => (
            <Card key={broker.id} className="bg-zinc-950/80 border-zinc-800/80">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-sky-400" />
                    <div>
                      <h4 className="text-sm font-bold font-mono text-zinc-100">
                        {broker.broker}
                      </h4>
                      <p className="text-xs text-zinc-400 font-mono">{broker.accountName}</p>
                    </div>
                  </div>
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded uppercase ${
                      broker.status === 'online'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {broker.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-zinc-800/60 font-mono text-xs">
                  <div className="bg-zinc-900/60 p-2.5 rounded border border-zinc-800/60">
                    <div className="text-[10px] text-zinc-500 uppercase">Balance</div>
                    <div className="text-sm font-bold text-zinc-100">
                      ${broker.balanceUsd.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-zinc-900/60 p-2.5 rounded border border-zinc-800/60">
                    <div className="text-[10px] text-zinc-500 uppercase">Ping / Latency</div>
                    <div className="text-sm font-bold text-emerald-400">
                      {broker.pingMs} ms
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 text-[10px] font-mono text-zinc-500">
                  <span>Key: {broker.apiKeyMasked}</span>
                  <span>Env: {broker.environment}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Tab: Execution History */}
      {activeTab === 'trades' && (
        <Card className="bg-zinc-950/80 border-zinc-800/80">
          <CardHeader className="p-4 border-b border-zinc-800/60">
            <CardTitle className="text-sm font-semibold font-mono text-zinc-100 uppercase">
              Recent Order Executions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-left font-mono text-xs text-zinc-300">
              <thead className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800 text-[10px] uppercase">
                <tr>
                  <th className="p-3">Time</th>
                  <th className="p-3">Bot</th>
                  <th className="p-3">Symbol</th>
                  <th className="p-3">Side</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Fee</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {trades.map((trd) => (
                  <tr key={trd.id} className="hover:bg-zinc-900/50">
                    <td className="p-3 text-zinc-400">{trd.timestamp}</td>
                    <td className="p-3 font-semibold text-zinc-200">{trd.botName}</td>
                    <td className="p-3">{trd.symbol}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] ${
                          trd.side === 'BUY'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-rose-500/10 text-rose-400'
                        }`}
                      >
                        {trd.side}
                      </span>
                    </td>
                    <td className="p-3">{trd.amount}</td>
                    <td className="p-3">${trd.price.toLocaleString()}</td>
                    <td className="p-3 text-zinc-400">${trd.feeUsd}</td>
                    <td className="p-3 text-emerald-400 uppercase">{trd.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
