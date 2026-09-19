import { MOCK_INFRA_OVERVIEW } from '@/lib/mock-data';
import { InfraOverview } from '@/types';

export class InfrastructureService {
  public static async getInfraOverview(): Promise<InfraOverview> {
    return MOCK_INFRA_OVERVIEW;
  }
}
