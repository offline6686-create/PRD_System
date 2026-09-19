import {
  MOCK_FORGE_DEPLOYMENTS,
  MOCK_FORGE_PLUGINS,
  MOCK_FORGE_TEMPLATES,
} from '@/lib/mock-data';
import { ForgeDeployment, ForgePlugin, ForgeTemplate } from '@/types';

export class ForgeService {
  public static async getTemplates(): Promise<ForgeTemplate[]> {
    return MOCK_FORGE_TEMPLATES;
  }

  public static async getPlugins(): Promise<ForgePlugin[]> {
    return MOCK_FORGE_PLUGINS;
  }

  public static async getDeployments(): Promise<ForgeDeployment[]> {
    return MOCK_FORGE_DEPLOYMENTS;
  }
}
