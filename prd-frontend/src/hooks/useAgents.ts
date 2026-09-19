'use client';

import { useEffect, useState } from 'react';
import { AgentService } from '@/services/agentService';
import { Agent, AgentLog } from '@/types';

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [agtRes, logRes] = await Promise.all([
          AgentService.getAgents(),
          AgentService.getLogs(selectedAgentId),
        ]);
        setAgents(agtRes);
        setLogs(logRes);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [selectedAgentId]);

  const restartAgent = async (agentId: string) => {
    await AgentService.restartAgent(agentId);
    const updated = await AgentService.getAgents();
    setAgents(updated);
  };

  return { agents, logs, loading, selectedAgentId, setSelectedAgentId, restartAgent };
}
