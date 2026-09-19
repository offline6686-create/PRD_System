'use client';

import React, { useState } from 'react';
import {
  Brain,
  Database,
  FileText,
  Search,
  Sparkles,
  UploadCloud,
} from 'lucide-react';
import { useResearch } from '@/hooks/useResearch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ResearchView: React.FC = () => {
  const { vectorStore, docIndex, documents, queryResult, loading, searchRag } =
    useResearch();
  const [queryInput, setQueryInput] = useState('');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full font-mono text-xs text-zinc-400">
        Connecting to Vector Store & Knowledge Base...
      </div>
    );
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchRag(queryInput);
  };

  return (
    <div className="space-y-6">
      {/* Top Vector DB & Index Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono">
        <Card className="bg-zinc-950/80 border-zinc-800/80">
          <CardContent className="p-4">
            <div className="text-[10px] text-zinc-400 uppercase">Vector Provider</div>
            <div className="text-xl font-bold text-emerald-400 flex items-center gap-2 mt-1">
              <Database className="w-5 h-5" /> {vectorStore?.provider}
            </div>
            <div className="text-[10px] text-zinc-500 mt-1">
              {vectorStore?.dimensions}-dim • {vectorStore?.searchLatencyMs}ms latency
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-950/80 border-zinc-800/80">
          <CardContent className="p-4">
            <div className="text-[10px] text-zinc-400 uppercase">Total Vectors</div>
            <div className="text-xl font-bold text-zinc-100 mt-1">
              {vectorStore?.totalVectors.toLocaleString()}
            </div>
            <div className="text-[10px] text-zinc-500 mt-1">
              Index Size: {(vectorStore?.indexSizeMb || 0) / 1024} GB
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-950/80 border-zinc-800/80">
          <CardContent className="p-4">
            <div className="text-[10px] text-zinc-400 uppercase">Indexed Documents</div>
            <div className="text-xl font-bold text-zinc-100 mt-1">
              {docIndex?.indexedDocuments} / {docIndex?.totalDocuments}
            </div>
            <div className="text-[10px] text-zinc-500 mt-1">
              {docIndex?.pendingDocuments} pending embedding
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-950/80 border-zinc-800/80">
          <CardContent className="p-4">
            <div className="text-[10px] text-zinc-400 uppercase">Vector DB Health</div>
            <div className="text-xl font-bold text-emerald-400 uppercase mt-1">
              {vectorStore?.status}
            </div>
            <div className="text-[10px] text-zinc-500 mt-1">
              Synced {docIndex?.lastIndexedTime}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RAG Query Tester Interface */}
      <Card className="bg-zinc-950/80 border-zinc-800/80">
        <CardHeader className="p-4 border-b border-zinc-800/60">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-emerald-400" />
            <CardTitle className="text-sm font-semibold font-mono text-zinc-100 uppercase">
              RAG Semantic Search & Knowledge Retrieval
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-5 space-y-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
              <input
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="Ask or query vector knowledge store..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg font-mono text-xs font-semibold hover:bg-emerald-500/30 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Run Vector Search
            </button>
          </form>

          {queryResult && (
            <div className="mt-4 p-4 bg-zinc-900/90 rounded-lg border border-zinc-800 font-mono text-xs space-y-3">
              <div className="flex items-center justify-between text-[11px] text-zinc-400 border-b border-zinc-800/80 pb-2">
                <span>
                  Query: <span className="text-zinc-200">{queryResult.query}</span>
                </span>
                <span>
                  Execution: {queryResult.executionTimeMs}ms • Tokens: {queryResult.tokensUsed}
                </span>
              </div>

              <div className="space-y-2">
                {queryResult.matchedChunks.map((chunk, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-zinc-950 rounded border border-zinc-800/80 space-y-1"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-emerald-400">
                        {chunk.documentTitle}
                      </span>
                      <span className="text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                        Relevance: {(chunk.score * 100).toFixed(1)}%
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 font-sans">{chunk.snippet}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document Library Table */}
      <Card className="bg-zinc-950/80 border-zinc-800/80 font-mono text-xs">
        <CardHeader className="p-4 border-b border-zinc-800/60 flex flex-row items-center justify-between">
          <CardTitle className="text-xs font-semibold text-zinc-100 uppercase">
            Knowledge Base Documents
          </CardTitle>
          <button className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 rounded flex items-center gap-1.5">
            <UploadCloud className="w-3.5 h-3.5" /> Upload Document
          </button>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left text-zinc-300">
            <thead className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800 text-[10px] uppercase">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Format</th>
                <th className="p-3">Chunks</th>
                <th className="p-3">Vector Status</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-zinc-900/50">
                  <td className="p-3 font-bold text-zinc-100 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span>{doc.title}</span>
                  </td>
                  <td className="p-3 text-zinc-400">{doc.category}</td>
                  <td className="p-3 uppercase text-zinc-400">{doc.fileType}</td>
                  <td className="p-3">{doc.chunkCount}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] ${
                        doc.vectorIndexed
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {doc.vectorIndexed ? 'INDEXED' : 'PENDING'}
                    </span>
                  </td>
                  <td className="p-3 text-zinc-500">{doc.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};
