import { MOCK_AGENT_LOGS, MOCK_AGENTS } from '@/lib/mock-data';
import { Agent, AgentLog } from '@/types';

export class AgentService {
  public static async getAgents(): Promise<Agent[]> {
    return MOCK_AGENTS;
  }

  public static async getLogs(agentId?: string): Promise<AgentLog[]> {
    if (!agentId) return MOCK_AGENT_LOGS;
    return MOCK_AGENT_LOGS.filter((log) => log.agentId === agentId);
  }

  public static async restartAgent(agentId: string): Promise<Agent | null> {
    const found = MOCK_AGENTS.find((a) => a.id === agentId);
    if (!found) return null;
    return { ...found, status: 'running', uptime: '0m' };
  }
}
