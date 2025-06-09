
// Candlestick pattern detection service based on cm45t3r/candlestick patterns
export interface CandleData {
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface PatternResult {
  pattern: string;
  type: 'bullish' | 'bearish' | 'neutral';
  reliability: number;
  description: string;
}

export class CandlestickPatterns {
  // Helper functions
  private static isWhiteCandle(candle: CandleData): boolean {
    return candle.close > candle.open;
  }

  private static isBlackCandle(candle: CandleData): boolean {
    return candle.close < candle.open;
  }

  private static getRealBody(candle: CandleData): number {
    return Math.abs(candle.close - candle.open);
  }

  private static getUpperShadow(candle: CandleData): number {
    return candle.high - Math.max(candle.open, candle.close);
  }

  private static getLowerShadow(candle: CandleData): number {
    return Math.min(candle.open, candle.close) - candle.low;
  }

  private static getRange(candle: CandleData): number {
    return candle.high - candle.low;
  }

  // Single candlestick patterns
  static doji(candle: CandleData): PatternResult | null {
    const realBody = this.getRealBody(candle);
    const range = this.getRange(candle);
    
    if (realBody <= range * 0.1) {
      return {
        pattern: 'Doji',
        type: 'neutral',
        reliability: 75,
        description: 'Indecision in the market, potential reversal signal'
      };
    }
    return null;
  }

  static hammer(candle: CandleData): PatternResult | null {
    const realBody = this.getRealBody(candle);
    const lowerShadow = this.getLowerShadow(candle);
    const upperShadow = this.getUpperShadow(candle);
    
    if (lowerShadow >= realBody * 2 && upperShadow <= realBody * 0.1) {
      return {
        pattern: 'Hammer',
        type: 'bullish',
        reliability: 80,
        description: 'Potential bullish reversal at support levels'
      };
    }
    return null;
  }

  static shootingStar(candle: CandleData): PatternResult | null {
    const realBody = this.getRealBody(candle);
    const upperShadow = this.getUpperShadow(candle);
    const lowerShadow = this.getLowerShadow(candle);
    
    if (upperShadow >= realBody * 2 && lowerShadow <= realBody * 0.1) {
      return {
        pattern: 'Shooting Star',
        type: 'bearish',
        reliability: 80,
        description: 'Potential bearish reversal at resistance levels'
      };
    }
    return null;
  }

  static marubozu(candle: CandleData): PatternResult | null {
    const realBody = this.getRealBody(candle);
    const range = this.getRange(candle);
    
    if (realBody >= range * 0.95) {
      return {
        pattern: 'Marubozu',
        type: this.isWhiteCandle(candle) ? 'bullish' : 'bearish',
        reliability: 85,
        description: 'Strong momentum continuation pattern'
      };
    }
    return null;
  }

  // Two candlestick patterns
  static engulfing(prev: CandleData, current: CandleData): PatternResult | null {
    const prevIsWhite = this.isWhiteCandle(prev);
    const currentIsWhite = this.isWhiteCandle(current);
    
    if (!prevIsWhite && currentIsWhite && 
        current.open < prev.close && current.close > prev.open) {
      return {
        pattern: 'Bullish Engulfing',
        type: 'bullish',
        reliability: 85,
        description: 'Strong bullish reversal pattern'
      };
    }
    
    if (prevIsWhite && !currentIsWhite && 
        current.open > prev.close && current.close < prev.open) {
      return {
        pattern: 'Bearish Engulfing',
        type: 'bearish',
        reliability: 85,
        description: 'Strong bearish reversal pattern'
      };
    }
    
    return null;
  }

  static harami(prev: CandleData, current: CandleData): PatternResult | null {
    const prevBody = this.getRealBody(prev);
    const currentBody = this.getRealBody(current);
    
    if (prevBody > currentBody * 1.5 &&
        Math.max(prev.open, prev.close) > Math.max(current.open, current.close) &&
        Math.min(prev.open, prev.close) < Math.min(current.open, current.close)) {
      
      const prevIsWhite = this.isWhiteCandle(prev);
      return {
        pattern: 'Harami',
        type: prevIsWhite ? 'bearish' : 'bullish',
        reliability: 70,
        description: 'Potential trend reversal or consolidation'
      };
    }
    return null;
  }

  // Three candlestick patterns
  static morningStar(first: CandleData, second: CandleData, third: CandleData): PatternResult | null {
    if (!this.isBlackCandle(first) || this.isWhiteCandle(third)) return null;
    
    const firstBody = this.getRealBody(first);
    const secondBody = this.getRealBody(second);
    const thirdBody = this.getRealBody(third);
    
    if (secondBody < firstBody * 0.3 && secondBody < thirdBody * 0.3 &&
        second.high < first.low && third.close > (first.open + first.close) / 2) {
      return {
        pattern: 'Morning Star',
        type: 'bullish',
        reliability: 90,
        description: 'Strong bullish reversal pattern'
      };
    }
    return null;
  }

  static eveningStar(first: CandleData, second: CandleData, third: CandleData): PatternResult | null {
    if (!this.isWhiteCandle(first) || this.isBlackCandle(third)) return null;
    
    const firstBody = this.getRealBody(first);
    const secondBody = this.getRealBody(second);
    const thirdBody = this.getRealBody(third);
    
    if (secondBody < firstBody * 0.3 && secondBody < thirdBody * 0.3 &&
        second.low > first.high && third.close < (first.open + first.close) / 2) {
      return {
        pattern: 'Evening Star',
        type: 'bearish',
        reliability: 90,
        description: 'Strong bearish reversal pattern'
      };
    }
    return null;
  }

  // Main analysis function
  static analyzePatterns(candles: CandleData[]): PatternResult[] {
    const patterns: PatternResult[] = [];
    const length = candles.length;
    
    if (length === 0) return patterns;
    
    // Single candle patterns (last candle)
    const lastCandle = candles[length - 1];
    
    const singlePatterns = [
      this.doji(lastCandle),
      this.hammer(lastCandle),
      this.shootingStar(lastCandle),
      this.marubozu(lastCandle)
    ].filter(Boolean) as PatternResult[];
    
    patterns.push(...singlePatterns);
    
    // Two candle patterns
    if (length >= 2) {
      const prevCandle = candles[length - 2];
      const twoPatterns = [
        this.engulfing(prevCandle, lastCandle),
        this.harami(prevCandle, lastCandle)
      ].filter(Boolean) as PatternResult[];
      
      patterns.push(...twoPatterns);
    }
    
    // Three candle patterns
    if (length >= 3) {
      const firstCandle = candles[length - 3];
      const secondCandle = candles[length - 2];
      const threePatterns = [
        this.morningStar(firstCandle, secondCandle, lastCandle),
        this.eveningStar(firstCandle, secondCandle, lastCandle)
      ].filter(Boolean) as PatternResult[];
      
      patterns.push(...threePatterns);
    }
    
    return patterns;
  }
}
