import {
  MOCK_DOCUMENT_INDEX,
  MOCK_RAG_RESULT,
  MOCK_RESEARCH_DOCS,
  MOCK_VECTOR_STORE,
} from '@/lib/mock-data';
import { DocumentIndex, KnowledgeBaseDoc, RagQueryResult, VectorStoreStatus } from '@/types';

export class ResearchService {
  public static async getVectorStoreStatus(): Promise<VectorStoreStatus> {
    return MOCK_VECTOR_STORE;
  }

  public static async getDocumentIndex(): Promise<DocumentIndex> {
    return MOCK_DOCUMENT_INDEX;
  }

  public static async getDocuments(): Promise<KnowledgeBaseDoc[]> {
    return MOCK_RESEARCH_DOCS;
  }

  public static async queryRag(query: string): Promise<RagQueryResult> {
    return {
      ...MOCK_RAG_RESULT,
      query,
    };
  }
}
