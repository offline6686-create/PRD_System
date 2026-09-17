import React from 'react';

/**
 * DashboardOverview Component
 * High-density SaaS admin overview with real-time KPI widgets.
 */
export const DashboardOverview = ({ kpis }) => {
  const data = kpis || {
    total_leads: 1000,
    new_leads: 180,
    qualified_leads: 450,
    meetings_scheduled: 210,
    meetings_completed: 165,
    conversions: 85,
    qualification_rate: 45.0,
    meeting_rate: 46.6,
    show_rate: 78.5,
    conversion_rate: 8.5,
    cpl: 2.50,
    cac: 18.50
  };

  return (
    <div className="space-y-6 text-white font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight">WELLNESS LEAD ENGINE</h1>
          <p className="text-sm text-gray-400">Sistema centralizado de captación digital, CRM y agendamiento por Zoom</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-lg">
            Sistema Activo • Olavarría Central
          </span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl">
          <div className="text-xs text-gray-400 font-medium">Leads Totales</div>
          <div className="text-2xl font-black text-white mt-1">{data.total_leads.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-400 mt-1">↑ Global Geo</div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl">
          <div className="text-xs text-gray-400 font-medium">Leads Nuevos</div>
          <div className="text-2xl font-black text-cyan-400 mt-1">{data.new_leads.toLocaleString()}</div>
          <div className="text-[11px] text-gray-400 mt-1">Pendientes contacto</div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl">
          <div className="text-xs text-gray-400 font-medium">Cualificados</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">{data.qualified_leads.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-400 mt-1">{data.qualification_rate}% Tasa Cualificación</div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl">
          <div className="text-xs text-gray-400 font-medium">Zoom Agendados</div>
          <div className="text-2xl font-black text-purple-400 mt-1">{data.meetings_scheduled.toLocaleString()}</div>
          <div className="text-[11px] text-purple-300 mt-1">{data.meeting_rate}% Agendamiento</div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl">
          <div className="text-xs text-gray-400 font-medium">Zoom Realizados</div>
          <div className="text-2xl font-black text-yellow-400 mt-1">{data.meetings_completed.toLocaleString()}</div>
          <div className="text-[11px] text-yellow-300 mt-1">{data.show_rate}% Show Rate</div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl">
          <div className="text-xs text-gray-400 font-medium">Conversiones</div>
          <div className="text-2xl font-black text-emerald-500 mt-1">{data.conversions.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-400 mt-1">{data.conversion_rate}% Conversión Final</div>
        </div>
      </div>
    </div>
  );
};
