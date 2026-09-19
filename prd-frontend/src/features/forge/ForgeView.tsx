'use client';

import React, { useState } from 'react';
import {
  Blocks,
  CheckCircle2,
  Cpu,
  Download,
  Hammer,
  Layers,
  Play,
  Rocket,
  Star,
  Terminal,
} from 'lucide-react';
import { NavigationMenu } from '@/components/layout/NavigationMenu';
import { useForge } from '@/hooks/useForge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ForgeView: React.FC = () => {
  const { templates, plugins, deployments, loading } = useForge();
  const [activeTab, setActiveTab] = useState('generator');

  // System Generator wizard state
  const [systemName, setSystemName] = useState('Alpha-Custom-Bot');
  const [systemType, setSystemType] = useState('Quant Strategy');
  const [language, setLanguage] = useState('Python');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full font-mono text-xs text-zinc-400">
        Loading System Forge Architecture...
      </div>
    );
  }

  const tabs = [
    { id: 'generator', label: 'System Generator' },
    { id: 'templates', label: 'Strategy Templates', count: templates.length },
    { id: 'plugins', label: 'Plugin Ecosystem', count: plugins.length },
    { id: 'deployments', label: 'Deployment Pipeline', count: deployments.length },
  ];

  return (
    <div className="space-y-6">
      <NavigationMenu tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab 1: System Generator */}
      {activeTab === 'generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-zinc-950/80 border-zinc-800/80">
            <CardHeader className="p-5 border-b border-zinc-800/60">
              <div className="flex items-center gap-2">
                <Hammer className="w-5 h-5 text-emerald-400" />
                <div>
                  <CardTitle className="text-sm font-semibold font-mono text-zinc-100 uppercase">
                    System Generator Wizard
                  </CardTitle>
                  <p className="text-xs text-zinc-400 font-sans mt-0.5">
                    Scaffold production-grade trading bots, AI agents, or data pipelines
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4 font-mono text-xs">
              <div>
                <label className="block text-zinc-400 mb-1">System Name</label>
                <input
                  type="text"
                  value={systemName}
                  onChange={(e) => setSystemName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-zinc-100 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 mb-1">Architecture Category</label>
                  <select
                    value={systemType}
                    onChange={(e) => setSystemType(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-zinc-100 focus:outline-none focus:border-emerald-500 font-mono"
                  >
                    <option value="Quant Strategy">Quant Strategy</option>
                    <option value="AI Agent">AI Agent</option>
                    <option value="Data Pipeline">Data Pipeline</option>
                    <option value="Risk Shield">Risk Shield</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Core Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-zinc-100 focus:outline-none focus:border-emerald-500 font-mono"
                  >
                    <option value="Python">Python (PyTorch / Pandas)</option>
                    <option value="TypeScript">TypeScript (Node / Bun)</option>
                    <option value="Rust">Rust (Tokio / HFT)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button className="w-full py-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-lg hover:bg-emerald-500/30 transition-all font-semibold flex items-center justify-center gap-2">
                  <Rocket className="w-4 h-4" />
                  Generate Code Base & Deploy Blueprint
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950/80 border-zinc-800/80 font-mono">
            <CardHeader className="p-4 border-b border-zinc-800/60">
              <CardTitle className="text-xs font-semibold text-zinc-300 uppercase">
                Generated Architecture Spec
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3 text-xs">
              <div className="bg-zinc-900/90 p-3 rounded border border-zinc-800 text-[11px] space-y-1 text-zinc-300">
                <div>
                  Name: <span className="text-emerald-400">{systemName}</span>
                </div>
                <div>
                  Category: <span className="text-sky-400">{systemType}</span>
                </div>
                <div>
                  Runtime: <span className="text-amber-400">{language}</span>
                </div>
                <div>Output Directory: /src/services/systems/</div>
              </div>

              <div className="text-[10px] text-zinc-500 leading-relaxed">
                Includes automated Docker containerization, PRD OS telemetry hooks, and
                standardized metrics output.
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab 2: Strategy Templates */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((tmpl) => (
            <Card key={tmpl.id} className="bg-zinc-950/80 border-zinc-800/80">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                      {tmpl.category}
                    </span>
                    <h3 className="text-base font-bold font-mono text-zinc-100 mt-2">
                      {tmpl.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-mono text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{tmpl.stars}</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 mt-2 font-sans">{tmpl.description}</p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {tmpl.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-800/60 font-mono text-xs text-zinc-400">
                  <span>Author: {tmpl.author}</span>
                  <button className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-700 rounded flex items-center gap-1 transition-colors">
                    <Download className="w-3.5 h-3.5" /> Clone Template
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Tab 3: Plugin Ecosystem */}
      {activeTab === 'plugins' && (
        <div className="space-y-4">
          {plugins.map((plg) => (
            <Card key={plg.id} className="bg-zinc-950/80 border-zinc-800/80">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800 text-emerald-400">
                    <Blocks className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold font-mono text-zinc-100">
                        {plg.name}
                      </h4>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                        v{plg.version}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">{plg.description}</p>
                  </div>
                </div>

                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/20">
                  {plg.status}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Tab 4: Deployment Pipeline */}
      {activeTab === 'deployments' && (
        <Card className="bg-zinc-950/80 border-zinc-800/80">
          <CardHeader className="p-4 border-b border-zinc-800/60">
            <CardTitle className="text-sm font-semibold font-mono text-zinc-100 uppercase">
              Active Build & Deploy Pipelines
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 font-mono text-xs">
            <table className="w-full text-left text-zinc-300">
              <thead className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800 text-[10px] uppercase">
                <tr>
                  <th className="p-3">System Name</th>
                  <th className="p-3">Environment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Version</th>
                  <th className="p-3">Commit</th>
                  <th className="p-3">Deployed At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {deployments.map((dep) => (
                  <tr key={dep.id} className="hover:bg-zinc-900/50">
                    <td className="p-3 font-bold text-zinc-100">{dep.systemName}</td>
                    <td className="p-3 uppercase">{dep.environment}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] uppercase ${
                          dep.status === 'deployed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {dep.status}
                      </span>
                    </td>
                    <td className="p-3 text-zinc-400">{dep.version}</td>
                    <td className="p-3 text-zinc-500">{dep.commitHash}</td>
                    <td className="p-3 text-zinc-400">{dep.deployedAt}</td>
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
