'use client';

import React from 'react';
import {
  Activity,
  Box,
  CheckCircle2,
  Database,
  HardDrive,
  Network,
  Server,
  Workflow,
} from 'lucide-react';
import { StatusCard } from '@/components/cards/StatusCard';
import { useInfrastructure } from '@/hooks/useInfrastructure';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const InfrastructureView: React.FC = () => {
  const { infra, loading } = useInfrastructure();

  if (loading || !infra) {
    return (
      <div className="flex items-center justify-center h-full font-mono text-xs text-zinc-400">
        Inspecting Infrastructure Cluster Services...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Services Grid: Docker, PostgreSQL, Redis, N8N, MinIO, Gitea */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {infra.services.map((srv) => (
          <StatusCard
            key={srv.id}
            title={`${srv.name} Service`}
            subtitle={`v${srv.version} • Port ${srv.port}`}
            status={srv.status}
            latencyMs={srv.latencyMs}
            uptime={srv.uptime}
            metrics={Object.entries(srv.metrics).map(([k, v]) => ({
              label: k,
              value: v,
            }))}
          />
        ))}
      </div>

      {/* Docker Containers Matrix */}
      <Card className="bg-zinc-950/80 border-zinc-800/80 font-mono text-xs">
        <CardHeader className="p-4 border-b border-zinc-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4 text-emerald-400" />
            <CardTitle className="text-xs font-semibold text-zinc-100 uppercase">
              Active Docker Containers
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left text-zinc-300">
            <thead className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800 text-[10px] uppercase">
              <tr>
                <th className="p-3">Container Name</th>
                <th className="p-3">Image</th>
                <th className="p-3">Status</th>
                <th className="p-3">CPU %</th>
                <th className="p-3">Memory</th>
                <th className="p-3">Ports</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {infra.dockerContainers.map((ctr) => (
                <tr key={ctr.id} className="hover:bg-zinc-900/50">
                  <td className="p-3 font-bold text-zinc-100">{ctr.name}</td>
                  <td className="p-3 text-zinc-400">{ctr.image}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                      {ctr.status}
                    </span>
                  </td>
                  <td className="p-3 text-emerald-400">{ctr.cpuPercent}%</td>
                  <td className="p-3">{ctr.memoryMb} MB</td>
                  <td className="p-3 text-zinc-400">{ctr.ports}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};
