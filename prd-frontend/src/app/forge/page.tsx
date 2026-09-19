import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { ForgeView } from '@/features/forge/ForgeView';

export default function ForgePage() {
  return (
    <AppShell>
      <ForgeView />
    </AppShell>
  );
}
