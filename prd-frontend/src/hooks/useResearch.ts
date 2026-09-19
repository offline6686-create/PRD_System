'use client';

import { useEffect, useState } from 'react';
import { ResearchService } from '@/services/researchService';
import { DocumentIndex, KnowledgeBaseDoc, RagQueryResult, VectorStoreStatus } from '@/types';

export function useResearch() {
  const [vectorStore, setVectorStore] = useState<VectorStoreStatus | null>(null);
  const [docIndex, setDocIndex] = useState<DocumentIndex | null>(null);
  const [documents, setDocuments] = useState<KnowledgeBaseDoc[]>([]);
  const [queryResult, setQueryResult] = useState<RagQueryResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [vsRes, idxRes, docRes] = await Promise.all([
          ResearchService.getVectorStoreStatus(),
          ResearchService.getDocumentIndex(),
          ResearchService.getDocuments(),
        ]);
        setVectorStore(vsRes);
        setDocIndex(idxRes);
        setDocuments(docRes);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const searchRag = async (query: string) => {
    if (!query.trim()) return;
    const res = await ResearchService.queryRag(query);
    setQueryResult(res);
  };

  return { vectorStore, docIndex, documents, queryResult, loading, searchRag };
}
