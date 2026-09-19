'use client';

import React from 'react';

interface NavigationTab {
  id: string;
  label: string;
  count?: number;
}

interface NavigationMenuProps {
  tabs: NavigationTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex items-center border-b border-zinc-800/80 mb-6 space-x-1 font-mono text-xs overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2.5 border-b-2 font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
              isActive
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
