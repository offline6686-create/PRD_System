'use client';

import { useEffect, useState } from 'react';
import { InfrastructureService } from '@/services/infrastructureService';
import { InfraOverview } from '@/types';

export function useInfrastructure() {
  const [infra, setInfra] = useState<InfraOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await InfrastructureService.getInfraOverview();
        setInfra(data);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return { infra, loading };
}
