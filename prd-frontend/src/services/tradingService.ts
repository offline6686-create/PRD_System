import {
  MOCK_ACCOUNT,
  MOCK_BROKERS,
  MOCK_POSITIONS,
  MOCK_TRADES,
  MOCK_TRADING_BOTS,
} from '@/lib/mock-data';
import { Account, BrokerConnection, Position, Trade, TradingBot } from '@/types';

export class TradingService {
  public static async getAccountSummary(): Promise<Account> {
    return MOCK_ACCOUNT;
  }

  public static async getBrokerConnections(): Promise<BrokerConnection[]> {
    return MOCK_BROKERS;
  }

  public static async getTradingBots(): Promise<TradingBot[]> {
    return MOCK_TRADING_BOTS;
  }

  public static async getPositions(): Promise<Position[]> {
    return MOCK_POSITIONS;
  }

  public static async getRecentTrades(): Promise<Trade[]> {
    return MOCK_TRADES;
  }

  public static async toggleBotStatus(botId: string): Promise<TradingBot[]> {
    return MOCK_TRADING_BOTS.map((bot) => {
      if (bot.id === botId) {
        const nextStatus = bot.status === 'active' ? 'paused' : 'active';
        return { ...bot, status: nextStatus };
      }
      return bot;
    });
  }
}
