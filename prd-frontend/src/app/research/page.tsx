import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { ResearchView } from '@/features/research/ResearchView';

export default function ResearchPage() {
  return (
    <AppShell>
      <ResearchView />
    </AppShell>
  );
}
