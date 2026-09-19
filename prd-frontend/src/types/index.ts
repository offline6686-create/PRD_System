// ==========================================
// PRD OS - CORE TYPES & DOMAIN INTERFACES
// ==========================================

// --- COMMON & SYSTEM TYPES ---
export type HealthStatus = 'online' | 'degraded' | 'offline' | 'maintenance';
export type LogLevel = 'INFO' | 'WARN' | 'EXEC' | 'ERROR';

export interface KpiItem {
  id: string;
  title: string;
  value: string | number;
  change: number; // e.g. +12.5 or -3.2
  changeType: 'increase' | 'decrease' | 'neutral';
  timeframe: string;
  subtext?: string;
  sparkline?: number[];
  category: 'trading' | 'system' | 'research' | 'agents';
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  source: string;
  level: LogLevel;
  message: string;
  details?: Record<string, unknown>;
}

// --- TRADING TYPES ---
export type BrokerName = 'Binance' | 'Interactive Brokers' | 'Alpaca' | 'Bybit' | 'Kraken';
export type BotStatus = 'active' | 'paused' | 'stopped' | 'error';
export type OrderSide = 'BUY' | 'SELL';

export interface BrokerConnection {
  id: string;
  broker: BrokerName;
  accountName: string;
  status: HealthStatus;
  pingMs: number;
  apiKeyMasked: string;
  balanceUsd: number;
  environment: 'live' | 'paper' | 'testnet';
  lastSync: string;
}

export interface TradingBot {
  id: string;
  name: string;
  pair: string;
  strategy: string;
  status: BotStatus;
  pnlDailyUsd: number;
  pnlDailyPercent: number;
  totalTrades: number;
  winRate: number; // 0..100
  uptime: string;
  maxDrawdownPercent: number;
  broker: BrokerName;
}

export interface Position {
  id: string;
  symbol: string;
  side: OrderSide;
  size: number;
  entryPrice: number;
  markPrice: number;
  unrealizedPnlUsd: number;
  unrealizedPnlPercent: number;
  leverage: number;
  liquidationPrice: number;
  broker: BrokerName;
}

export interface Trade {
  id: string;
  timestamp: string;
  botId: string;
  botName: string;
  symbol: string;
  side: OrderSide;
  amount: number;
  price: number;
  pnlUsd?: number;
  feeUsd: number;
  status: 'filled' | 'pending' | 'cancelled';
}

export interface Account {
  id: string;
  totalEquityUsd: number;
  cashUsd: number;
  unrealizedPnlUsd: number;
  dailyPnlUsd: number;
  dailyPnlPercent: number;
  sharpeRatio: number;
  profitFactor: number;
  maxDrawdownPercent: number;
}

// --- AGENTS TYPES ---
export type AgentState = 'running' | 'idle' | 'thinking' | 'errored' | 'paused';

export interface AgentMetrics {
  cpuUsagePercent: number;
  memoryUsageMb: number;
  maxMemoryMb: number;
  tasksCompleted: number;
  tasksFailed: number;
  avgLatencyMs: number;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  model: string;
  status: AgentState;
  uptime: string;
  metrics: AgentMetrics;
  lastActive: string;
  version: string;
  tags: string[];
}

export interface AgentLog {
  id: string;
  agentId: string;
  agentName: string;
  timestamp: string;
  level: LogLevel;
  message: string;
}

// --- RESEARCH & RAG TYPES ---
export interface KnowledgeBaseDoc {
  id: string;
  title: string;
  category: string;
  fileType: 'pdf' | 'md' | 'json' | 'txt' | 'csv';
  sizeBytes: number;
  chunkCount: number;
  vectorIndexed: boolean;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface VectorStoreStatus {
  provider: 'Qdrant' | 'Pinecone' | 'PgVector' | 'Chroma';
  totalVectors: number;
  dimensions: number;
  indexSizeMb: number;
  searchLatencyMs: number;
  status: HealthStatus;
}

export interface RagQueryResult {
  query: string;
  matchedChunks: Array<{
    documentTitle: string;
    chunkId: string;
    score: number; // 0..1
    snippet: string;
  }>;
  executionTimeMs: number;
  tokensUsed: number;
}

export interface DocumentIndex {
  totalDocuments: number;
  indexedDocuments: number;
  pendingDocuments: number;
  failedDocuments: number;
  lastIndexedTime: string;
}

// --- INFRASTRUCTURE TYPES ---
export type ServiceName = 'Docker' | 'PostgreSQL' | 'Redis' | 'N8N' | 'MinIO' | 'Gitea';

export interface ServiceHealth {
  id: string;
  name: ServiceName;
  status: HealthStatus;
  uptime: string;
  latencyMs: number;
  version: string;
  port: number;
  url: string;
  metrics: Record<string, string | number>;
}

export interface DockerContainer {
  id: string;
  name: string;
  image: string;
  status: 'running' | 'exited' | 'restarting';
  cpuPercent: number;
  memoryMb: number;
  ports: string;
  created: string;
}

export interface PostgresMetrics {
  activeConnections: number;
  maxConnections: number;
  databaseSizeMb: number;
  cacheHitRatioPercent: number;
  tps: number;
}

export interface RedisMetrics {
  usedMemoryMb: number;
  maxMemoryMb: number;
  hitRatePercent: number;
  connectedClients: number;
  keysCount: number;
}

export interface N8nMetrics {
  activeWorkflows: number;
  executionsToday: number;
  failedExecutions: number;
  queuedTasks: number;
}

export interface MinioMetrics {
  totalBuckets: number;
  totalObjects: number;
  storageUsedGb: number;
  storageLimitGb: number;
}

export interface GiteaMetrics {
  activeRepositories: number;
  pullRequestsOpen: number;
  buildStatus: HealthStatus;
  diskUsedMb: number;
}

export interface InfraOverview {
  services: ServiceHealth[];
  dockerContainers: DockerContainer[];
  postgres: PostgresMetrics;
  redis: RedisMetrics;
  n8n: N8nMetrics;
  minio: MinioMetrics;
  gitea: GiteaMetrics;
}

// --- FORGE TYPES ---
export interface ForgeTemplate {
  id: string;
  name: string;
  description: string;
  category: 'Quant Strategy' | 'AI Agent' | 'Data Pipeline' | 'Risk Shield';
  language: 'TypeScript' | 'Python' | 'Rust';
  stars: number;
  author: string;
  tags: string[];
}

export interface ForgePlugin {
  id: string;
  name: string;
  version: string;
  status: 'installed' | 'available' | 'update_available';
  category: 'Exchange Interface' | 'ML Accelerator' | 'Storage Connector' | 'Alerting';
  author: string;
  description: string;
}

export interface ForgeGenerator {
  id: string;
  name: string;
  targetType: string;
  inputs: Array<{
    key: string;
    label: string;
    type: 'text' | 'select' | 'boolean' | 'number';
    options?: string[];
    defaultValue?: unknown;
  }>;
}

export interface ForgeDeployment {
  id: string;
  systemName: string;
  environment: 'production' | 'staging' | 'paper';
  status: 'deployed' | 'building' | 'failed' | 'idle';
  version: string;
  deployedAt: string;
  commitHash: string;
}

// --- PROJECTS TYPES ---
export interface PrdProject {
  id: string;
  name: string;
  code: string;
  description: string;
  phase: 'In Progress' | 'Beta' | 'Production' | 'Planning';
  completionPercent: number;
  techStack: string[];
  teamMembers: string[];
  updatedAt: string;
  status: HealthStatus;
}

// --- SETTINGS TYPES ---
export interface SystemSettings {
  systemName: string;
  environment: string;
  themeMode: 'dark' | 'synthwave' | 'obsidian';
  debugMode: boolean;
  telemetryEnabled: boolean;
  autoBackupInterval: string;
  apiKeys: Array<{
    id: string;
    service: string;
    keyMasked: string;
    status: 'active' | 'revoked';
    updatedAt: string;
  }>;
}
