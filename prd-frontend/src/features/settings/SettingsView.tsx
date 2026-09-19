'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Key, Lock, Palette, Save, Shield, Sliders } from 'lucide-react';
import { NavigationMenu } from '@/components/layout/NavigationMenu';
import { MOCK_SETTINGS } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [apiKeys, setApiKeys] = useState(MOCK_SETTINGS.apiKeys);
  const [visibleKeyId, setVisibleKeyId] = useState<string | null>(null);

  const tabs = [
    { id: 'general', label: 'General Configuration' },
    { id: 'apikeys', label: 'API Keys Vault', count: apiKeys.length },
    { id: 'theme', label: 'Futuristic UI Theme' },
    { id: 'security', label: 'Security & Access' },
  ];

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeyId(visibleKeyId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <NavigationMenu tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'general' && (
        <Card className="bg-zinc-950/80 border-zinc-800/80 font-mono text-xs">
          <CardHeader className="p-4 border-b border-zinc-800/60">
            <CardTitle className="text-sm font-semibold text-zinc-100 uppercase">
              PRD OS System Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <label className="block text-zinc-400 mb-1">System Instance Name</label>
              <input
                type="text"
                defaultValue={MOCK_SETTINGS.systemName}
                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-zinc-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1">Environment Stage</label>
              <input
                type="text"
                disabled
                defaultValue={MOCK_SETTINGS.environment}
                className="w-full bg-zinc-900/50 border border-zinc-800/60 rounded p-2.5 text-zinc-400 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1">Automated DB Backup Schedule</label>
              <select
                defaultValue={MOCK_SETTINGS.autoBackupInterval}
                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-zinc-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="Every 1 hour">Every 1 hour</option>
                <option value="Every 6 hours">Every 6 hours</option>
                <option value="Every 24 hours">Every 24 hours</option>
              </select>
            </div>
            <div className="pt-2">
              <button className="px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded font-semibold hover:bg-emerald-500/30 transition-all flex items-center gap-2">
                <Save className="w-4 h-4" /> Save Configuration
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'apikeys' && (
        <Card className="bg-zinc-950/80 border-zinc-800/80 font-mono text-xs">
          <CardHeader className="p-4 border-b border-zinc-800/60 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold text-zinc-100 uppercase flex items-center gap-2">
              <Key className="w-4 h-4 text-emerald-400" />
              API Key & Secret Vault
            </CardTitle>
            <button className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 rounded text-xs">
              + Add API Key
            </button>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-left text-zinc-300">
              <thead className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800 text-[10px] uppercase">
                <tr>
                  <th className="p-3">Service</th>
                  <th className="p-3">Key / Token</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Last Updated</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {apiKeys.map((key) => (
                  <tr key={key.id} className="hover:bg-zinc-900/50">
                    <td className="p-3 font-bold text-zinc-100">{key.service}</td>
                    <td className="p-3 text-zinc-400 font-mono">
                      {visibleKeyId === key.id
                        ? `${key.keyMasked}-FULL-SECRET-TOKEN-EXPOSED`
                        : key.keyMasked}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                        {key.status}
                      </span>
                    </td>
                    <td className="p-3 text-zinc-500">{key.updatedAt}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => toggleKeyVisibility(key.id)}
                        className="p-1 text-zinc-400 hover:text-zinc-100"
                        title="Toggle Visibility"
                      >
                        {visibleKeyId === key.id ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {activeTab === 'theme' && (
        <Card className="bg-zinc-950/80 border-zinc-800/80 font-mono text-xs">
          <CardHeader className="p-4 border-b border-zinc-800/60">
            <CardTitle className="text-sm font-semibold text-zinc-100 uppercase flex items-center gap-2">
              <Palette className="w-4 h-4 text-emerald-400" />
              Theme Customization
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-lg bg-zinc-900 border-2 border-emerald-500 cursor-pointer">
                <div className="font-bold text-zinc-100">Emerald Dark (Default)</div>
                <div className="text-[10px] text-zinc-400 mt-1">
                  High-contrast cyber emerald accents
                </div>
              </div>
              <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 cursor-pointer opacity-60">
                <div className="font-bold text-zinc-100">Obsidian Terminal</div>
                <div className="text-[10px] text-zinc-400 mt-1">Monochrome deep charcoal</div>
              </div>
              <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 cursor-pointer opacity-60">
                <div className="font-bold text-zinc-100">Synthwave Cyan</div>
                <div className="text-[10px] text-zinc-400 mt-1">Neon cyan & purple highlights</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'security' && (
        <Card className="bg-zinc-950/80 border-zinc-800/80 font-mono text-xs">
          <CardHeader className="p-4 border-b border-zinc-800/60">
            <CardTitle className="text-sm font-semibold text-zinc-100 uppercase flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              Security & Access Control
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center justify-between p-3 bg-zinc-900/60 rounded border border-zinc-800">
              <div>
                <div className="font-bold text-zinc-200">Enforce Multi-Factor Auth (MFA)</div>
                <div className="text-[10px] text-zinc-400">
                  Require TOTP token for sensitive trading commands
                </div>
              </div>
              <input type="checkbox" defaultChecked className="accent-emerald-500 h-4 w-4" />
            </div>
            <div className="flex items-center justify-between p-3 bg-zinc-900/60 rounded border border-zinc-800">
              <div>
                <div className="font-bold text-zinc-200">Pre-Trade Risk Circuit Breaker</div>
                <div className="text-[10px] text-zinc-400">
                  Auto-freeze order execution if daily drawdown exceeds 5%
                </div>
              </div>
              <input type="checkbox" defaultChecked className="accent-emerald-500 h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
