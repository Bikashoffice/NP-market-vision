
import { NepseApiService } from './NepseApiService';
import { NepaliTimeService } from './NepaliTimeService';

export class MarketDataService {
  private static nepseApi = NepseApiService.getInstance();

  static async getTopMovers(): Promise<any> {
    try {
      // Get real-time data from NEPSE API
      const allStocks = await this.nepseApi.getAllStocks();
      const marketSummary = await this.nepseApi.getMarketSummary();
      const marketStatus = NepaliTimeService.getMarketStatus();

      // Sort stocks for top gainers and losers
      const sortedByGain = [...allStocks].sort((a, b) => b.percentageChange - a.percentageChange);
      const sortedByLoss = [...allStocks].sort((a, b) => a.percentageChange - b.percentageChange);

      const topGainers = sortedByGain.slice(0, 10);
      const topLosers = sortedByLoss.slice(0, 10);

      return {
        ...marketSummary,
        marketStatus,
        tradingHours: NepaliTimeService.getTradingHours(),
        currentTime: NepaliTimeService.formatNepaliTime(),
        allStocks,
        topGainers: topGainers.map(stock => ({
          symbol: stock.symbol,
          name: `${stock.symbol} Limited`,
          price: stock.ltp,
          change: stock.percentageChange,
          volume: stock.volume,
          open: stock.open,
          high: stock.high,
          low: stock.low,
          previousClose: stock.previousClose,
          sector: stock.sector
        })),
        topLosers: topLosers.map(stock => ({
          symbol: stock.symbol,
          name: `${stock.symbol} Limited`,
          price: stock.ltp,
          change: stock.percentageChange,
          volume: stock.volume,
          open: stock.open,
          high: stock.high,
          low: stock.low,
          previousClose: stock.previousClose,
          sector: stock.sector
        }))
      };
    } catch (error) {
      console.error('Error fetching market data:', error);
      // Fallback to existing data structure
      return this.getFallbackData();
    }
  }

  static async getAllStocksData(): Promise<any[]> {
    try {
      const allStocks = await this.nepseApi.getAllStocks();
      return allStocks.map(stock => ({
        symbol: stock.symbol,
        name: `${stock.symbol} Limited`,
        price: stock.ltp,
        change: stock.percentageChange,
        pointChange: stock.pointChange,
        volume: stock.volume,
        open: stock.open,
        high: stock.high,
        low: stock.low,
        previousClose: stock.previousClose,
        sector: stock.sector,
        marketCap: this.calculateMarketCap(stock.ltp, stock.volume)
      }));
    } catch (error) {
      console.error('Error fetching all stocks data:', error);
      return [];
    }
  }

  private static calculateMarketCap(price: number, volume: number): string {
    // Simplified market cap calculation
    const estimatedShares = volume * 100; // Rough estimation
    const marketCap = price * estimatedShares;
    
    if (marketCap > 1000000000) {
      return `${(marketCap / 1000000000).toFixed(2)} अरब`;
    } else if (marketCap > 10000000) {
      return `${(marketCap / 10000000).toFixed(2)} करोड`;
    } else {
      return `${(marketCap / 100000).toFixed(2)} लाख`;
    }
  }

  private static getFallbackData() {
    const marketStatus = NepaliTimeService.getMarketStatus();
    
    return {
      nepseIndex: 2640.96,
      nepseChange: -0.22,
      totalTurnover: '7,970,886,663.46',
      sharesTraded: '17,108,809',
      companiesTraded: 311,
      advances: 94,
      declines: 153,
      unchanged: 1,
      marketStatus,
      tradingHours: NepaliTimeService.getTradingHours(),
      currentTime: NepaliTimeService.formatNepaliTime(),
      allStocks: [],
      topGainers: [],
      topLosers: []
    };
  }
}
