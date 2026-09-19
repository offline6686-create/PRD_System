import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { InfrastructureView } from '@/features/infrastructure/InfrastructureView';

export default function InfrastructurePage() {
  return (
    <AppShell>
      <InfrastructureView />
    </AppShell>
  );
}
