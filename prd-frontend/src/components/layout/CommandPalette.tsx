'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  BarChart3,
  Bot,
  Brain,
  Command,
  FolderGit2,
  Hammer,
  LayoutDashboard,
  Search,
  Server,
  Settings,
  TrendingUp,
  X,
} from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or state trigger
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const commands = [
    { label: 'Go to Dashboard', path: '/dashboard', icon: LayoutDashboard, category: 'Navigation' },
    { label: 'Go to Trading Terminal', path: '/trading', icon: TrendingUp, category: 'Navigation' },
    { label: 'Go to System Forge', path: '/forge', icon: Hammer, category: 'Navigation' },
    { label: 'Go to Agent Fleet', path: '/agents', icon: Bot, category: 'Navigation' },
    { label: 'Go to Research & RAG', path: '/research', icon: Brain, category: 'Navigation' },
    { label: 'Go to Infrastructure', path: '/infrastructure', icon: Server, category: 'Navigation' },
    { label: 'Go to System Analytics', path: '/analytics', icon: BarChart3, category: 'Navigation' },
    { label: 'Go to PRD Projects', path: '/projects', icon: FolderGit2, category: 'Navigation' },
    { label: 'Go to Settings', path: '/settings', icon: Settings, category: 'Navigation' },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    router.push(path);
    onClose();
    setQuery('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-zinc-950/95 border-zinc-800 text-zinc-100 p-0 shadow-2xl backdrop-blur-xl rounded-xl overflow-hidden font-mono">
        <div className="flex items-center px-4 border-b border-zinc-800/80 h-14">
          <Search className="w-4 h-4 text-emerald-400 mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Type a command or search PRD OS..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none font-mono"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-zinc-400 hover:text-zinc-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-zinc-900">
          <div className="px-3 py-1.5 text-[10px] uppercase text-zinc-400 tracking-wider">
            Quick Actions & Navigation
          </div>

          {filteredCommands.length === 0 ? (
            <div className="p-6 text-center text-xs text-zinc-500">
              No matching commands found.
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(cmd.path)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-zinc-900 text-left transition-colors text-xs group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                    <span className="text-zinc-200 font-medium">{cmd.label}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 group-hover:border-zinc-700">
                    Jump to
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="px-4 py-2 bg-zinc-900/60 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-500">
          <div className="flex items-center gap-2">
            <span>Use ↑ ↓ to navigate</span>
            <span>•</span>
            <span>↵ to select</span>
          </div>
          <div className="flex items-center gap-1">
            <Command className="w-3 h-3 text-zinc-400" />
            <span>PRD OS Command Palette</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
