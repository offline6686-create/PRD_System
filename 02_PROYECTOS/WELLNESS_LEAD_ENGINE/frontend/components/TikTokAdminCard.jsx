import React from 'react';

/**
 * TikTokAdminCard Component
 * RESTRICTION NOTICE: Restricted to ADMINISTRATOR role only.
 */
export const TikTokAdminCard = ({ userRole, metrics }) => {
  if (userRole !== 'ADMINISTRATOR') {
    return (
      <div className="p-6 bg-red-950/40 border border-red-800/50 rounded-xl text-red-200">
        <div className="flex items-center space-x-3 mb-2">
          <span className="px-2 py-1 bg-red-600 text-xs font-bold text-white rounded">BLOQUEADO</span>
          <h3 className="font-semibold text-lg text-white">TikTok Ads Integration</h3>
        </div>
        <p className="text-sm text-red-300">
          Acceso denegado. La configuración y métricas de campañas de TikTok Ads están restringidas exclusivamente al rol <strong>ADMINISTRADOR</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 border border-emerald-500/30 rounded-xl text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/40">ADMIN ACCESS</span>
          <h3 className="font-bold text-xl">TikTok Ads Manager</h3>
        </div>
        <span className="text-xs text-gray-400">Mock Provider Active</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-xs text-gray-400">Impresiones</div>
          <div className="text-2xl font-black text-white">{metrics?.impressions || 28400}</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-xs text-gray-400">Clics</div>
          <div className="text-2xl font-black text-emerald-400">{metrics?.clicks || 1120}</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-xs text-gray-400">Leads Generados</div>
          <div className="text-2xl font-black text-cyan-400">{metrics?.leads || 64}</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-xs text-gray-400">CPL Promedio</div>
          <div className="text-2xl font-black text-yellow-400">${metrics?.cpl || 1.72}</div>
        </div>
      </div>
    </div>
  );
};
