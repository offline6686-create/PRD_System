import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { AgentsView } from '@/features/agents/AgentsView';

export default function AgentsPage() {
  return (
    <AppShell>
      <AgentsView />
    </AppShell>
  );
}
