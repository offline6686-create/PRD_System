import React from 'react';

/**
 * VisualFunnel Component
 * CRM/Sales Intelligence stage drop-off and conversion rates visualization.
 */
export const VisualFunnel = ({ stages }) => {
  const defaultStages = [
    { stage_name: 'TRAFFIC', count: 5000, percentage: 100, conversion_rate: 100, drop_off_count: 0 },
    { stage_name: 'LANDING_VISIT', count: 2500, percentage: 50, conversion_rate: 50, drop_off_count: 2500 },
    { stage_name: 'FORM_SUBMITTED', count: 500, percentage: 10, conversion_rate: 20, drop_off_count: 2000 },
    { stage_name: 'LEAD_CREATED', count: 500, percentage: 10, conversion_rate: 100, drop_off_count: 0 },
    { stage_name: 'CONTACTED', count: 350, percentage: 7, conversion_rate: 70, drop_off_count: 150 },
    { stage_name: 'QUALIFIED', count: 220, percentage: 4.4, conversion_rate: 62.8, drop_off_count: 130 },
    { stage_name: 'MEETING_SCHEDULED', count: 120, percentage: 2.4, conversion_rate: 54.5, drop_off_count: 100 },
    { stage_name: 'MEETING_COMPLETED', count: 90, percentage: 1.8, conversion_rate: 75, drop_off_count: 30 },
    { stage_name: 'CONVERTED', count: 35, percentage: 0.7, conversion_rate: 38.8, drop_off_count: 55 }
  ];

  const data = stages && stages.length > 0 ? stages : defaultStages;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-black">Conversion Funnel Visualizer</h2>
          <p className="text-xs text-gray-400">Embudo de conversión desde Tráfico en Internet hasta Cliente/Recompra</p>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span className="px-3 py-1 bg-gray-800 rounded border border-gray-700 text-gray-300">Global Geo Scope</span>
        </div>
      </div>

      <div className="space-y-3">
        {data.map((item, idx) => {
          const widthPct = Math.max(item.percentage, 5);
          return (
            <div key={item.stage_name} className="relative">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-gray-300">{idx + 1}. {item.stage_name}</span>
                <div className="flex space-x-4">
                  <span className="text-gray-400">{item.count.toLocaleString()} leads</span>
                  <span className="font-mono text-emerald-400 font-bold">{item.percentage}%</span>
                </div>
              </div>
              <div className="w-full bg-gray-800 h-6 rounded-md overflow-hidden flex">
                <div
                  className="bg-gradient-to-r from-emerald-600 to-cyan-500 h-full transition-all duration-500 rounded-md"
                  style={{ width: `${widthPct}%` }}
                />
              </div>
              {item.drop_off_count > 0 && (
                <div className="text-[10px] text-red-400 text-right mt-0.5">
                  Drop-off: -{item.drop_off_count.toLocaleString()} ({100 - item.conversion_rate}%)
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
