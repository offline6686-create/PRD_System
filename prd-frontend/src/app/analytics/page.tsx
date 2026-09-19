import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { AnalyticsView } from '@/features/analytics/AnalyticsView';

export default function AnalyticsPage() {
  return (
    <AppShell>
      <AnalyticsView />
    </AppShell>
  );
}
