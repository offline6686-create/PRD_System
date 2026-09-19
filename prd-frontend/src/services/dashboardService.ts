import { MOCK_ACTIVITIES, MOCK_KPIS } from '@/lib/mock-data';
import { ActivityLogItem, KpiItem } from '@/types';

export class DashboardService {
  public static async getKpis(): Promise<KpiItem[]> {
    return MOCK_KPIS;
  }

  public static async getActivityFeed(): Promise<ActivityLogItem[]> {
    return MOCK_ACTIVITIES;
  }

  public static async filterActivities(level?: string): Promise<ActivityLogItem[]> {
    if (!level || level === 'ALL') {
      return MOCK_ACTIVITIES;
    }
    return MOCK_ACTIVITIES.filter((act) => act.level === level);
  }
}
