'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Bell, Clock, Command, Globe, Search, Sparkles } from 'lucide-react';

interface TopbarProps {
  onOpenCommandPalette?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenCommandPalette }) => {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().replace('GMT', 'UTC').split(' ').slice(4, 5)[0]);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const getPageTitle = (path: string) => {
    const segment = path.split('/')[1] || 'dashboard';
    switch (segment) {
      case 'dashboard':
        return { title: 'Dashboard Maestro', subtitle: 'Plataforma Integral CORE • Telemetría General' };
      case 'trading':
        return { title: 'Trading Command', subtitle: 'Bots activos, curva de equity & monitor de riesgo' };
      case 'forge':
        return { title: 'System Forge', subtitle: 'Templates de estrategia, plugins & pipeline' };
      case 'agents':
        return { title: 'Agent Fleet Monitor', subtitle: 'Flota de agentes IA, estado & consolas' };
      case 'research':
        return { title: 'Biblioteca & RAG', subtitle: 'Vector Store Qdrant & documentos semánticos' };
      case 'infrastructure':
        return { title: 'Infraestructura CORE', subtitle: 'Docker, PostgreSQL, Redis, N8N & Gitea' };
      case 'analytics':
        return { title: 'Analítica de Sistema', subtitle: 'Rendimiento, latencia TPS & costos' };
      case 'projects':
        return { title: 'Proyectos PRD', subtitle: 'Sub-proyectos activos & control de releases' };
      case 'settings':
        return { title: 'Configuración OS', subtitle: 'Parámetros del sistema & API Vault' };
      default:
        return { title: 'PRD OS', subtitle: 'Plataforma Integral CORE' };
    }
  };

  const pageInfo = getPageTitle(pathname);

  return (
    <header className="h-16 bg-black/90 border-b border-zinc-800/90 px-6 flex items-center justify-between sticky top-0 z-30 backdrop-blur-xl">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-base font-extrabold font-mono text-white tracking-tight flex items-center gap-2">
          {pageInfo.title}
        </h1>
        <p className="text-xs text-zinc-400 font-sans">{pageInfo.subtitle}</p>
      </div>

      {/* Center Command Palette Search Bar Trigger */}
      <button
        onClick={onOpenCommandPalette}
        className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all font-mono text-xs shadow-inner"
      >
        <Search className="w-3.5 h-3.5 text-zinc-400" />
        <span>Buscar comandos o funciones (Ctrl+K)...</span>
        <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-[10px] text-zinc-300">
          <Command className="w-3 h-3" />
          <span>K</span>
        </div>
      </button>

      {/* Right Telemetry Controls */}
      <div className="flex items-center gap-3">
        {/* UTC Clock */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-300 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800">
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          <span>{currentTime || '10:45:00 UTC'}</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-white animate-pulse" />
        </button>

        {/* AI Copilot Badge */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-black font-bold font-mono text-xs hover:bg-zinc-200 transition-all shadow-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">AI Copilot</span>
        </button>
      </div>
    </header>
  );
};
