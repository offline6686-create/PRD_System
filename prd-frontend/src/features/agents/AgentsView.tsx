'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  Bot,
  CheckCircle2,
  Cpu,
  Info,
  Pause,
  Play,
  RefreshCw,
  Terminal,
} from 'lucide-react';
import { useAgents } from '@/hooks/useAgents';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const AgentsView: React.FC = () => {
  const { agents, logs, loading, selectedAgentId, setSelectedAgentId, restartAgent } =
    useAgents();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full font-mono text-xs text-zinc-400">
        Connecting to AI Agent Fleet Manager...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Fleet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map((agt) => {
          const isSelected = selectedAgentId === agt.id;
          return (
            <Card
              key={agt.id}
              onClick={() => setSelectedAgentId(agt.id)}
              className={`cursor-pointer transition-all ${
                isSelected
                  ? 'bg-zinc-900 border-emerald-500/80 shadow-emerald-500/10 shadow-lg'
                  : 'bg-zinc-950/80 border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-emerald-400" />
                    <div>
                      <h4 className="text-xs font-mono font-bold text-zinc-100">{agt.name}</h4>
                      <p className="text-[10px] text-zinc-400 font-mono">{agt.model}</p>
                    </div>
                  </div>
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded uppercase ${
                      agt.status === 'running'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {agt.status}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 mt-2 font-sans line-clamp-2">{agt.role}</p>

                {/* Meter Bars: CPU & RAM */}
                <div className="mt-4 space-y-2.5 font-mono text-[11px]">
                  <div>
                    <div className="flex justify-between text-zinc-400 mb-1">
                      <span>CPU Load</span>
                      <span className="text-zinc-200">{agt.metrics.cpuUsagePercent}%</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden border border-zinc-800">
                      <div
                        className="bg-emerald-400 h-full rounded-full transition-all"
                        style={{ width: `${agt.metrics.cpuUsagePercent}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-zinc-400 mb-1">
                      <span>Memory</span>
                      <span className="text-zinc-200">
                        {agt.metrics.memoryUsageMb} MB / {agt.metrics.maxMemoryMb} MB
                      </span>
                    </div>
                    <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden border border-zinc-800">
                      <div
                        className="bg-sky-400 h-full rounded-full transition-all"
                        style={{
                          width: `${(agt.metrics.memoryUsageMb / agt.metrics.maxMemoryMb) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-800/60 font-mono text-[10px] text-zinc-500">
                  <span>Tasks: {agt.metrics.tasksCompleted}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      restartAgent(agt.id);
                    }}
                    className="hover:text-emerald-400 flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Reboot
                  </button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Terminal Log Console */}
      <Card className="bg-zinc-950/90 border-zinc-800/80 shadow-2xl">
        <CardHeader className="p-4 border-b border-zinc-800/60 flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <CardTitle className="text-xs font-semibold font-mono text-zinc-100 uppercase tracking-wider">
              Agent Execution Telemetry Log Console
            </CardTitle>
          </div>
          {selectedAgentId && (
            <button
              onClick={() => setSelectedAgentId(undefined)}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200"
            >
              Clear Filter
            </button>
          )}
        </CardHeader>
        <CardContent className="p-4 bg-black/80 font-mono text-xs text-zinc-300 space-y-2 max-h-[350px] overflow-y-auto divide-y divide-zinc-900">
          {logs.map((log) => (
            <div key={log.id} className="pt-2 flex items-start gap-3">
              <span className="text-[10px] text-zinc-500 shrink-0">{log.timestamp}</span>
              <span className="text-xs font-bold text-emerald-400 shrink-0">
                [{log.agentName}]
              </span>
              <p className="text-xs text-zinc-300 flex-1 leading-relaxed">{log.message}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
