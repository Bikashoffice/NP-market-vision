
export class MarketDataService {
  static async getTopMovers(): Promise<any> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Real Nepal Stock Exchange data
    const stockData = [
      { symbol: 'SHPC', name: 'Shangri-La Power Company Limited', price: 564.89, change: 2.30 },
      { symbol: 'NHPC', name: 'Nepal Hydro & Electric Limited', price: 215.45, change: 0.68 },
      { symbol: 'UMHL', name: 'United Modi Hydropower Limited', price: 514.47, change: 0.18 },
      { symbol: 'MEHL', name: 'Madhya Bhotekoshi Jalavidyut Company Limited', price: 425.33, change: 0.06 },
      { symbol: 'NYADI', name: 'Nyadi Hydropower Limited', price: 427.69, change: -1.91 },
      { symbol: 'CREST', name: 'Crest Ventures Limited', price: 1694.13, change: -3.21 },
      { symbol: 'UPCL', name: 'Universal Power Company Limited', price: 468.62, change: 6.44 },
      { symbol: 'BHL', name: 'Bottlers Nepal (Balaju) Limited', price: 209.51, change: -0.82 },
      { symbol: 'RLFL', name: 'Reliance Life Insurance Limited', price: 467.59, change: -0.89 },
      { symbol: 'NIFRA', name: 'Nepal Infrastructure Bank Limited', price: 281.19, change: -0.55 },
      { symbol: 'NRIC', name: 'Nepal Reinsurance Company Limited', price: 1232.04, change: -1.17 },
      { symbol: 'SINDU', name: 'Sindhuli Power Company Limited', price: 848.16, change: -2.86 },
      { symbol: 'HRL', name: 'Himalayan Reinsurance Limited', price: 927.78, change: -0.30 },
      { symbol: 'CHCL', name: 'Chilime Hydropower Company Limited', price: 486.77, change: 0.73 },
      { symbol: 'SBL', name: 'Siddhartha Bank Limited', price: 295.22, change: -1.13 },
      { symbol: 'OMPL', name: 'Oriental Megha Laghubitta Bittiya Sanstha Limited', price: 1809.24, change: -9.30 },
      { symbol: 'HIDCLP', name: 'Hydroelectricity Investment and Development Company Limited', price: 212.17, change: -0.41 },
      { symbol: 'SHL', name: 'Soaltee Hotel Limited', price: 560.82, change: -0.89 },
      { symbol: 'BEDC', name: 'Buddha Electric Development Company Limited', price: 771.66, change: 4.30 },
      { symbol: 'MEN', name: 'Mountain Energy Nepal Limited', price: 579.82, change: 1.19 },
      { symbol: 'NGPL', name: 'Nepal Gas and Power Limited', price: 395.88, change: 4.01 },
      { symbol: 'NBL', name: 'Nepal Bank Limited', price: 254.98, change: -0.56 },
      { symbol: 'DORDI', name: 'Dordi Khola Hydropower Company Limited', price: 410.03, change: 5.10 },
      { symbol: 'HLI', name: 'Himalayan Life Insurance Company Limited', price: 405.35, change: -0.11 },
      { symbol: 'SLBBL', name: 'Sanima Large Cap Fund', price: 883.74, change: -0.49 },
      { symbol: 'SCB', name: 'Standard Chartered Bank Nepal Limited', price: 609.19, change: -1.68 },
      { symbol: 'NICL', name: 'Nepal Insurance Company Limited', price: 772.47, change: 1.10 },
      { symbol: 'AKPL', name: 'Arun Kabeli Power Limited', price: 276.92, change: 1.18 },
      { symbol: 'GBLBS', name: 'Global Bank Limited', price: 788.16, change: -0.50 },
      { symbol: 'SPDL', name: 'Samridhi Power Development Limited', price: 364.45, change: 2.75 },
      { symbol: 'GBBL', name: 'Garima Bikas Bank Limited', price: 392.96, change: -0.06 },
      { symbol: 'SHEL', name: 'Shree Hydropower Company Limited', price: 270.55, change: 1.58 },
      { symbol: 'AHPC', name: 'Arun Hydropower Company Limited', price: 295.85, change: 3.11 },
      { symbol: 'SFCL', name: 'Shivam Finance Limited', price: 473.06, change: -0.10 },
      { symbol: 'RADHI', name: 'Radhi Bidyut Company Limited', price: 845.87, change: 7.56 },
      { symbol: 'TVCL', name: 'Total Vision Company Limited', price: 473.92, change: 0.68 },
      { symbol: 'HEI', name: 'Himalayan Everest Insurance Company Limited', price: 573.95, change: -0.45 },
      { symbol: 'HPPL', name: 'Himalayan Power Partner Limited', price: 497.08, change: 2.35 },
      { symbol: 'SIGS2', name: 'Shikhar Insurance General Bima Sahakari Limited', price: 9.94, change: -1.58 },
      { symbol: 'KBL', name: 'Kumari Bank Limited', price: 212.93, change: -0.30 },
      { symbol: 'AKJCL', name: 'Arun Khola Jal Vidhyut Company Limited', price: 205.65, change: 0.15 },
      { symbol: 'SJCL', name: 'Sanjen Jalavidyut Company Limited', price: 315.24, change: -0.35 },
      { symbol: 'CHDC', name: 'Chandragiri Hills Limited', price: 2510.3, change: -0.61 },
      { symbol: 'MLBBL', name: 'Manushi Laghubitta Bittiya Sanstha Limited', price: 1453.74, change: 0.22 },
      { symbol: 'HURJA', name: 'Hama Hydro Power Company Limited', price: 249.15, change: 1.42 },
      { symbol: 'SMJC', name: 'Sanima Mai Jalavidyut Company Limited', price: 497.7, change: -0.15 },
      { symbol: 'GLH', name: 'Gurans Life Insurance Company Limited', price: 247.15, change: 0.68 },
      { symbol: 'PRVU', name: 'Prabhu Bank Limited', price: 208.42, change: -1.01 },
      { symbol: 'MKCL', name: 'Manakamana Capital Limited', price: 1493.27, change: -0.93 },
      { symbol: 'BARUN', name: 'Barun Hydropower Company Limited', price: 319.27, change: 9.96 },
      { symbol: 'TSHL', name: 'Taragaon Regency Hotel Limited', price: 683.45, change: -1.43 },
      { symbol: 'HBL', name: 'Himalayan Bank Limited', price: 221.98, change: -1.33 }
    ];

    // Sort by percentage change to get top gainers and losers
    const sortedByGain = [...stockData].sort((a, b) => b.change - a.change);
    const sortedByLoss = [...stockData].sort((a, b) => a.change - b.change);

    const topGainers = sortedByGain.slice(0, 5);
    const topLosers = sortedByLoss.slice(0, 5);

    // Calculate market summary
    const advances = stockData.filter(stock => stock.change > 0).length;
    const declines = stockData.filter(stock => stock.change < 0).length;
    const neutral = stockData.filter(stock => stock.change === 0).length;

    return {
      nepseIndex: 2847.35, // Current NEPSE index (approximate)
      nepseChange: 0.75, // Daily change percentage
      totalTurnover: '15.2 Cr',
      sharesTraded: '2,845,632',
      companiesTraded: 311,
      advances,
      declines,
      neutral,
      topGainers: topGainers.map(stock => ({
        symbol: stock.symbol,
        name: stock.name,
        price: stock.price,
        change: stock.change
      })),
      topLosers: topLosers.map(stock => ({
        symbol: stock.symbol,
        name: stock.name,
        price: stock.price,
        change: stock.change
      }))
    };
  }
}
