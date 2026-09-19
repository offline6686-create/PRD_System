'use client';

import { useEffect, useState } from 'react';
import { ForgeService } from '@/services/forgeService';
import { ForgeDeployment, ForgePlugin, ForgeTemplate } from '@/types';

export function useForge() {
  const [templates, setTemplates] = useState<ForgeTemplate[]>([]);
  const [plugins, setPlugins] = useState<ForgePlugin[]>([]);
  const [deployments, setDeployments] = useState<ForgeDeployment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [tmplRes, plgRes, depRes] = await Promise.all([
          ForgeService.getTemplates(),
          ForgeService.getPlugins(),
          ForgeService.getDeployments(),
        ]);
        setTemplates(tmplRes);
        setPlugins(plgRes);
        setDeployments(depRes);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return { templates, plugins, deployments, loading };
}
