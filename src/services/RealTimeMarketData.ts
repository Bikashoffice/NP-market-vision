
import { NepseApiService, StockData, MarketSummary } from './NepseApiService';

export interface RealTimeStockData extends StockData {}

export interface RealTimeMarketSummary extends MarketSummary {
  lastUpdated: string;
}

export class RealTimeMarketDataService {
  private static nepseApi = NepseApiService.getInstance();

  static async getMarketSummary(): Promise<RealTimeMarketSummary> {
    try {
      const summary = await this.nepseApi.getMarketSummary();
      return {
        ...summary,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to fetch market summary:', error);
      return this.getFallbackMarketSummary();
    }
  }

  static async getTopGainers(): Promise<RealTimeStockData[]> {
    try {
      return await this.nepseApi.getTopGainers();
    } catch (error) {
      console.error('Failed to fetch top gainers:', error);
      return this.getFallbackTopGainers();
    }
  }

  static async getTopLosers(): Promise<RealTimeStockData[]> {
    try {
      return await this.nepseApi.getTopLosers();
    } catch (error) {
      console.error('Failed to fetch top losers:', error);
      return this.getFallbackTopLosers();
    }
  }

  static async getAllStocks(): Promise<RealTimeStockData[]> {
    try {
      return await this.nepseApi.getAllStocks();
    } catch (error) {
      console.error('Failed to fetch all stocks:', error);
      return this.getFallbackAllStocks();
    }
  }

  static async refreshData(): Promise<void> {
    try {
      console.log('Refreshing market data from NEPSE API...');
      await this.nepseApi.getMarketSummary();
      console.log('Market data refreshed successfully');
    } catch (error) {
      console.error('Failed to refresh market data:', error);
    }
  }

  private static getFallbackMarketSummary(): RealTimeMarketSummary {
    return {
      nepseIndex: 2653.09,
      nepseChange: 23.19,
      nepsePercentChange: 0.88,
      totalTurnover: "8,689,350,319.62",
      totalTradedShares: "17,501,802",
      totalTransactions: 78848,
      totalScriptsTraded: 324,
      advances: 191,
      declines: 56,
      unchanged: 1,
      marketStatus: "CLOSED",
      lastUpdated: new Date().toISOString()
    };
  }

  private static getFallbackTopGainers(): RealTimeStockData[] {
    return [
      { symbol: "MAKAR", ltp: 632.20, pointChange: 57.44, percentageChange: 9.99, open: 575, high: 632.2, low: 570, volume: 17303, previousClose: 574.76, turnover: 622803558.90, sector: "Manufacturing" },
      { symbol: "PURE", ltp: 619.80, pointChange: 56.30, percentageChange: 9.99, open: 574.7, high: 619.79, low: 574.7, volume: 610, previousClose: 563.5, turnover: 549512526.70, sector: "Manufacturing" },
      { symbol: "DOLTI", ltp: 592.30, pointChange: 53.81, percentageChange: 9.99, open: 535.1, high: 592.29, low: 535.1, volume: 21530, previousClose: 538.49, turnover: 513504513.70, sector: "Hydropower" },
      { symbol: "BHDC", ltp: 478.80, pointChange: 43.47, percentageChange: 9.99, open: 435, high: 478.8, low: 435, volume: 53298, previousClose: 435.33, turnover: 398937514.10, sector: "Hydropower" },
      { symbol: "BPCL", ltp: 701.49, pointChange: 62.82, percentageChange: 9.84, open: 651, high: 702.5, low: 626.1, volume: 768909, previousClose: 638.67, turnover: 377916030.70, sector: "Trading" }
    ];
  }

  private static getFallbackTopLosers(): RealTimeStockData[] {
    return [
      { symbol: "BEDC", ltp: 725.59, pointChange: -58.55, percentageChange: -7.47, open: 768.5, high: 768.5, low: 705.8, volume: 60310, previousClose: 784.14, turnover: 622803558.90, sector: "Hydropower" },
      { symbol: "MLBBL", ltp: 1465.84, pointChange: -80.91, percentageChange: -5.23, open: 1516, high: 1516, low: 1450, volume: 1738, previousClose: 1546.75, turnover: 549512526.70, sector: "Commercial Banks" },
      { symbol: "SAPDBL", ltp: 1082.93, pointChange: -58.33, percentageChange: -5.11, open: 1118.5, high: 1118.5, low: 1027.2, volume: 117295, previousClose: 1141.26, turnover: 513504513.70, sector: "Development Banks" },
      { symbol: "MLBS", ltp: 1582.09, pointChange: -49.76, percentageChange: -3.05, open: 1599.3, high: 1599.3, low: 1509, volume: 1331, previousClose: 1631.85, turnover: 398937514.10, sector: "Commercial Banks" },
      { symbol: "GRDBL", ltp: 1274.59, pointChange: -31.84, percentageChange: -2.44, open: 1332, high: 1332, low: 1266.2, volume: 27838, previousClose: 1306.43, turnover: 377916030.70, sector: "Development Banks" }
    ];
  }

  private static getFallbackAllStocks(): RealTimeStockData[] {
    return [
      ...this.getFallbackTopGainers(),
      ...this.getFallbackTopLosers(),
      { symbol: "NABIL", ltp: 490.93, pointChange: 1.28, percentageChange: 0.26, open: 489.9, high: 494.9, low: 489, volume: 29647, previousClose: 489.65, turnover: 14560000, sector: "Commercial Banks" },
      { symbol: "NICA", ltp: 349.81, pointChange: 1.14, percentageChange: 0.33, open: 348, high: 351.9, low: 345, volume: 109064, previousClose: 348.67, turnover: 38150000, sector: "Commercial Banks" }
    ];
  }
}
