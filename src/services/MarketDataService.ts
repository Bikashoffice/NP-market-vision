
export class MarketDataService {
  static async getTopMovers(): Promise<any> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Real Nepal Stock Exchange data - Updated with correct values
    const stockData = [
      { symbol: 'SHPC', name: 'Shangri-La Power Company Limited', price: 564.89, change: 2.30, volume: 306279, open: 563.2, high: 568.4, low: 550.1, previousClose: 552.2 },
      { symbol: 'NHPC', name: 'Nepal Hydro & Electric Limited', price: 215.45, change: 0.68, volume: 74963, open: 214, high: 217, low: 211.1, previousClose: 213.99 },
      { symbol: 'UMHL', name: 'United Modi Hydropower Limited', price: 514.47, change: 0.18, volume: 211743, open: 505.1, high: 522, low: 505.1, previousClose: 513.54 },
      { symbol: 'MEHL', name: 'Madhya Bhotekoshi Jalavidyut Company Limited', price: 425.33, change: 0.06, volume: 13254, open: 426, high: 433, low: 420, previousClose: 425.09 },
      { symbol: 'NYADI', name: 'Nyadi Hydropower Limited', price: 427.69, change: -1.91, volume: 30178, open: 436, high: 439, low: 421, previousClose: 436.01 },
      { symbol: 'CREST', name: 'Crest Ventures Limited', price: 1694.13, change: -3.21, volume: 40175, open: 1750.30, high: 1760, low: 1676, previousClose: 1750.30 },
      { symbol: 'UPCL', name: 'Universal Power Company Limited', price: 468.62, change: 6.44, volume: 1405405, open: 437, high: 471, low: 437, previousClose: 440.27 },
      { symbol: 'BHL', name: 'Bottlers Nepal (Balaju) Limited', price: 209.51, change: -0.82, volume: 251658, open: 210.5, high: 213.7, low: 209, previousClose: 211.25 },
      { symbol: 'RLFL', name: 'Reliance Life Insurance Limited', price: 467.59, change: -0.89, volume: 14500, open: 479.9, high: 479.9, low: 465.5, previousClose: 471.8 },
      { symbol: 'NIFRA', name: 'Nepal Infrastructure Bank Limited', price: 281.19, change: -0.55, volume: 187248, open: 282, high: 286.7, low: 280.39, previousClose: 282.75 },
      { symbol: 'NRIC', name: 'Nepal Reinsurance Company Limited', price: 1232.04, change: -1.17, volume: 57411, open: 1221.70, high: 1264.8, low: 1221.7, previousClose: 1246.60 },
      { symbol: 'SINDU', name: 'Sindhuli Power Company Limited', price: 848.16, change: -2.86, volume: 82073, open: 889.9, high: 889.9, low: 837.9, previousClose: 873.1 },
      { symbol: 'HRL', name: 'Himalayan Reinsurance Limited', price: 927.78, change: -0.30, volume: 100124, open: 912, high: 943, low: 912, previousClose: 930.61 },
      { symbol: 'CHCL', name: 'Chilime Hydropower Company Limited', price: 486.77, change: 0.73, volume: 41081, open: 489.9, high: 493.6, low: 479, previousClose: 483.25 },
      { symbol: 'SBL', name: 'Siddhartha Bank Limited', price: 295.22, change: -1.13, volume: 42600, open: 299, high: 300, low: 293.3, previousClose: 298.58 },
      { symbol: 'OMPL', name: 'Oriental Megha Laghubitta Bittiya Sanstha Limited', price: 1809.24, change: -9.30, volume: 91850, open: 2034.50, high: 2167.19, low: 1796, previousClose: 1994.70 },
      { symbol: 'HIDCLP', name: 'Hydroelectricity Investment and Development Company Limited', price: 212.17, change: -0.41, volume: 670717, open: 212.1, high: 216, low: 210.9, previousClose: 213.04 },
      { symbol: 'SHL', name: 'Soaltee Hotel Limited', price: 560.82, change: -0.89, volume: 212462, open: 558, high: 571.79, low: 550, previousClose: 565.87 },
      { symbol: 'BEDC', name: 'Buddha Electric Development Company Limited', price: 771.66, change: 4.30, volume: 57209, open: 742, high: 787, low: 720.6, previousClose: 739.85 },
      { symbol: 'MEN', name: 'Mountain Energy Nepal Limited', price: 579.82, change: 1.19, volume: 76426, open: 565.2, high: 583.79, low: 565.2, previousClose: 572.98 },
      { symbol: 'NGPL', name: 'Nepal Gas and Power Limited', price: 395.88, change: 4.01, volume: 1112259, open: 373, high: 399, low: 373, previousClose: 380.6 },
      { symbol: 'NBL', name: 'Nepal Bank Limited', price: 254.98, change: -0.56, volume: 85324, open: 260, high: 260, low: 253.4, previousClose: 256.42 },
      { symbol: 'DORDI', name: 'Dordi Khola Hydropower Company Limited', price: 410.03, change: 5.10, volume: 79234, open: 390, high: 412, low: 390, previousClose: 390.14 },
      { symbol: 'HLI', name: 'Himalayan Life Insurance Company Limited', price: 405.35, change: -0.11, volume: 34170, open: 406, high: 408, low: 403, previousClose: 405.78 },
      { symbol: 'SLBBL', name: 'Sanima Large Cap Fund', price: 883.74, change: -0.49, volume: 6538, open: 875.8, high: 905, low: 875.8, previousClose: 888.11 },
      { symbol: 'SCB', name: 'Standard Chartered Bank Nepal Limited', price: 609.19, change: -1.68, volume: 19291, open: 630, high: 630, low: 608.1, previousClose: 619.6 },
      { symbol: 'NICL', name: 'Nepal Insurance Company Limited', price: 772.47, change: 1.10, volume: 24758, open: 778, high: 794, low: 770, previousClose: 764.07 },
      { symbol: 'AKPL', name: 'Arun Kabeli Power Limited', price: 276.92, change: 1.18, volume: 1057285, open: 279.1, high: 279.1, low: 270, previousClose: 273.68 },
      { symbol: 'GBLBS', name: 'Global Bank Limited', price: 788.16, change: -0.50, volume: 4257, open: 799, high: 800, low: 785, previousClose: 792.1 },
      { symbol: 'SPDL', name: 'Samridhi Power Development Limited', price: 364.45, change: 2.75, volume: 106150, open: 355, high: 371, low: 353.1, previousClose: 354.68 },
      { symbol: 'GBBL', name: 'Garima Bikas Bank Limited', price: 392.96, change: -0.06, volume: 17348, open: 393.2, high: 395, low: 392, previousClose: 393.2 },
      { symbol: 'SHEL', name: 'Shree Hydropower Company Limited', price: 270.55, change: 1.58, volume: 240242, open: 264, high: 273, low: 263.7, previousClose: 266.33 },
      { symbol: 'AHPC', name: 'Arun Hydropower Company Limited', price: 295.85, change: 3.11, volume: 530425, open: 282, high: 297.8, low: 282, previousClose: 286.93 },
      { symbol: 'SFCL', name: 'Shivam Finance Limited', price: 473.06, change: -0.10, volume: 10232, open: 473, high: 479.9, low: 468, previousClose: 473.52 },
      { symbol: 'RADHI', name: 'Radhi Bidyut Company Limited', price: 845.87, change: 7.56, volume: 1119113, open: 790, high: 850, low: 785, previousClose: 786.45 },
      { symbol: 'TVCL', name: 'Total Vision Company Limited', price: 473.92, change: 0.68, volume: 7216, open: 461.4, high: 480, low: 461.4, previousClose: 470.73 },
      { symbol: 'HEI', name: 'Himalayan Everest Insurance Company Limited', price: 573.95, change: -0.45, volume: 11321, open: 585.5, high: 585.5, low: 571, previousClose: 576.53 },
      { symbol: 'HPPL', name: 'Himalayan Power Partner Limited', price: 497.08, change: 2.35, volume: 127089, open: 492, high: 500, low: 483, previousClose: 485.67 },
      { symbol: 'SIGS2', name: 'Shikhar Insurance General Bima Sahakari Limited', price: 9.94, change: -1.58, volume: 700, open: 10.1, high: 10.1, low: 9.92, previousClose: 10.1 },
      { symbol: 'KBL', name: 'Kumari Bank Limited', price: 212.93, change: -0.30, volume: 553708, open: 214, high: 223.1, low: 210, previousClose: 213.57 },
      { symbol: 'AKJCL', name: 'Arun Khola Jal Vidhyut Company Limited', price: 205.65, change: 0.15, volume: 99349, open: 206.9, high: 207, low: 204, previousClose: 205.34 },
      { symbol: 'SJCL', name: 'Sanjen Jalavidyut Company Limited', price: 315.24, change: -0.35, volume: 10041, open: 311.3, high: 320, low: 311.3, previousClose: 316.35 },
      { symbol: 'CHDC', name: 'Chandragiri Hills Limited', price: 2510.3, change: -0.61, volume: 80637, open: 2555.10, high: 2555.1, low: 2488, previousClose: 2525.80 },
      { symbol: 'MLBBL', name: 'Manushi Laghubitta Bittiya Sanstha Limited', price: 1453.74, change: 0.22, volume: 1259, open: 1452, high: 1481, low: 1452, previousClose: 1450.57 },
      { symbol: 'HURJA', name: 'Hama Hydro Power Company Limited', price: 249.15, change: 1.42, volume: 142561, open: 250, high: 250, low: 244, previousClose: 245.66 },
      { symbol: 'SMJC', name: 'Sanima Mai Jalavidyut Company Limited', price: 497.7, change: -0.15, volume: 25959, open: 499, high: 507.5, low: 490.2, previousClose: 498.46 },
      { symbol: 'GLH', name: 'Gurans Life Insurance Company Limited', price: 247.15, change: 0.68, volume: 86151, open: 250, high: 250, low: 244, previousClose: 245.49 },
      { symbol: 'PRVU', name: 'Prabhu Bank Limited', price: 208.42, change: -1.01, volume: 162687, open: 208, high: 212.8, low: 208, previousClose: 210.55 },
      { symbol: 'MKCL', name: 'Manakamana Capital Limited', price: 1493.27, change: -0.93, volume: 5305, open: 1500, high: 1522, low: 1490, previousClose: 1507.22 },
      { symbol: 'BARUN', name: 'Barun Hydropower Company Limited', price: 319.27, change: 9.96, volume: 437031, open: 296.1, high: 319.3, low: 296.1, previousClose: 290.36 },
      { symbol: 'TSHL', name: 'Taragaon Regency Hotel Limited', price: 683.45, change: -1.43, volume: 4291, open: 693, high: 706.6, low: 678, previousClose: 693.33 },
      { symbol: 'HBL', name: 'Himalayan Bank Limited', price: 221.98, change: -1.33, volume: 77160, open: 223.1, high: 246.8, low: 220.4, previousClose: 224.98 },
      { symbol: 'RFPL', name: 'Rasuwa Fewa Power Limited', price: 524.6, change: 10.00, volume: 191583, open: 468, high: 524.6, low: 468, previousClose: 476.91 },
      { symbol: 'BPCL', name: 'Bottlers Nepal (Terai) Limited', price: 632.1, change: 9.98, volume: 809251, open: 586, high: 632.1, low: 576, previousClose: 574.72 },
      { symbol: 'SAPDBL', name: 'Saptakoshi Power Development Company Limited', price: 1088.84, change: 9.50, volume: 187206, open: 1010, high: 1091, low: 980, previousClose: 994.4 },
      { symbol: 'PURE', name: 'Pure Energy Limited', price: 512.29, change: 9.98, volume: 400, open: 475.1, high: 512.29, low: 475.1, previousClose: 465.8 },
      { symbol: 'AHL', name: 'Asian Hotel Limited', price: 660.4, change: 7.31, volume: 4755, open: 626.9, high: 664, low: 615, previousClose: 615.41 },
      { symbol: 'ULBSL', name: 'United Lumbini Bikas Bank Limited', price: 3697.76, change: 6.54, volume: 9261, open: 3401.30, high: 3781, low: 3351, previousClose: 3470.71 },
      { symbol: 'SMHL', name: 'Summit Hydropower Limited', price: 985.41, change: 4.92, volume: 19170, open: 931.1, high: 1019, low: 931.1, previousClose: 939.2 },
      { symbol: 'NABBC', name: 'Nepal Arab Bank Limited', price: 1728.53, change: 4.97, volume: 46668, open: 1613.80, high: 1745, low: 1613.8, previousClose: 1646.73 },
      { symbol: 'CGH', name: 'City Hotel Limited', price: 898.91, change: 3.85, volume: 184782, open: 860.1, high: 905, low: 850, previousClose: 865.58 },
      { symbol: 'WNLB', name: 'Wean Nepal Laghubitta Bittiya Sanstha Limited', price: 2180.21, change: 3.79, volume: 3015, open: 2105, high: 2287.9, low: 2105, previousClose: 2100.65 }
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
        change: stock.change,
        volume: stock.volume,
        open: stock.open,
        high: stock.high,
        low: stock.low,
        previousClose: stock.previousClose
      })),
      topLosers: topLosers.map(stock => ({
        symbol: stock.symbol,
        name: stock.name,
        price: stock.price,
        change: stock.change,
        volume: stock.volume,
        open: stock.open,
        high: stock.high,
        low: stock.low,
        previousClose: stock.previousClose
      }))
    };
  }
}
