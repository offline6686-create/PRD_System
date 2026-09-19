'use client';

import { useEffect, useState } from 'react';
import { DashboardService } from '@/services/dashboardService';
import { ActivityLogItem, KpiItem } from '@/types';

export function useDashboard() {
  const [kpis, setKpis] = useState<KpiItem[]>([]);
  const [activities, setActivities] = useState<ActivityLogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [kpiRes, actRes] = await Promise.all([
          DashboardService.getKpis(),
          DashboardService.getActivityFeed(),
        ]);
        setKpis(kpiRes);
        setActivities(actRes);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filterLogs = async (level: string) => {
    const filtered = await DashboardService.filterActivities(level);
    setActivities(filtered);
  };

  return { kpis, activities, loading, filterLogs };
}
