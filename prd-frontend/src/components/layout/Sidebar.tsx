'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Bot,
  Brain,
  ChevronRight,
  FolderGit2,
  Hammer,
  LayoutDashboard,
  LogOut,
  Server,
  Settings,
  Shield,
  TrendingUp,
  Zap,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Trading', href: '/trading', icon: TrendingUp, badge: 'LIVE' },
    { name: 'Forge', href: '/forge', icon: Hammer },
    { name: 'Agents', href: '/agents', icon: Bot, badge: '8' },
    { name: 'Research', href: '/research', icon: Brain },
    { name: 'Infrastructure', href: '/infrastructure', icon: Server },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Projects', href: '/projects', icon: FolderGit2 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-black border-r border-zinc-800/90 flex flex-col h-screen shrink-0 font-sans select-none z-40">
      {/* High-Contrast Monochromatic Logo Header (Stitch Visual Style) */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-zinc-800/90 bg-black">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="bg-white text-black font-black font-mono text-base px-2.5 py-1 rounded-md tracking-tighter shadow-md transition-transform group-hover:scale-105">
            PRD
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-sm text-white tracking-tight">
                PRD OS
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
                v3.0 CORE
              </span>
            </div>
            <div className="text-[10px] font-mono text-zinc-400 truncate">
              Plataforma Integral CORE
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
          Control Navigation
        </div>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all duration-200 ${
                isActive
                  ? 'bg-zinc-900 text-white font-semibold border border-zinc-700 shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60 hover:border-zinc-800 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                <span>{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                      item.badge === 'LIVE'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* System Status Footer */}
      <div className="p-4 border-t border-zinc-800/90 bg-black">
        <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <div className="text-xs font-mono font-bold text-white">SYSTEM OPERATIONAL</div>
              <div className="text-[10px] font-mono text-zinc-400">CORE • 99.98% UPTIME</div>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        <div className="mt-3 pt-3 border-t border-zinc-900 flex items-center justify-between text-xs text-zinc-400 font-mono">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center font-bold text-[10px]">
              PR
            </div>
            <span className="truncate max-w-[100px] text-zinc-300 font-bold">Ruso Admin</span>
          </div>
          <Link href="/login" className="hover:text-white p-1" title="Cerrar Sesión">
            <LogOut className="w-3.5 h-3.5 text-zinc-400 hover:text-rose-400 transition-colors" />
          </Link>
        </div>
      </div>
    </aside>
  );
};
