import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { TradingView } from '@/features/trading/TradingView';

export default function TradingPage() {
  return (
    <AppShell>
      <TradingView />
    </AppShell>
  );
}
