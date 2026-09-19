'use client';

import { useEffect, useState } from 'react';
import { TradingService } from '@/services/tradingService';
import { Account, BrokerConnection, Position, Trade, TradingBot } from '@/types';

export function useTrading() {
  const [account, setAccount] = useState<Account | null>(null);
  const [brokers, setBrokers] = useState<BrokerConnection[]>([]);
  const [bots, setBots] = useState<TradingBot[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [accRes, brkRes, botRes, posRes, trdRes] = await Promise.all([
          TradingService.getAccountSummary(),
          TradingService.getBrokerConnections(),
          TradingService.getTradingBots(),
          TradingService.getPositions(),
          TradingService.getRecentTrades(),
        ]);
        setAccount(accRes);
        setBrokers(brkRes);
        setBots(botRes);
        setPositions(posRes);
        setTrades(trdRes);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const toggleBot = async (botId: string) => {
    const updated = await TradingService.toggleBotStatus(botId);
    setBots(updated);
  };

  return { account, brokers, bots, positions, trades, loading, toggleBot };
}
