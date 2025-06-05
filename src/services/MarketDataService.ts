
export class MarketDataService {
  static async getTopMovers(): Promise<any> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock Nepal stock market data
    return {
      nepseIndex: 1847.35,
      nepseChange: 1.24,
      totalTurnover: '2.45 Cr',
      sharesTraded: '845,632',
      companiesTraded: 156,
      topGainers: [
        {
          symbol: 'PRVU',
          name: 'Prabhu Bank Limited',
          price: 285.50,
          change: 8.45
        },
        {
          symbol: 'SANIMA',
          name: 'Sanima Bank Limited',
          price: 345.20,
          change: 7.82
        },
        {
          symbol: 'MEGA',
          name: 'Mega Bank Nepal Limited',
          price: 275.80,
          change: 6.95
        },
        {
          symbol: 'ADBL',
          name: 'Agricultural Development Bank Limited',
          price: 425.60,
          change: 6.15
        },
        {
          symbol: 'GBIME',
          name: 'Global IME Bank Limited',
          price: 315.40,
          change: 5.78
        }
      ],
      topLosers: [
        {
          symbol: 'UNL',
          name: 'Unilever Nepal Limited',
          price: 18450.00,
          change: -4.85
        },
        {
          symbol: 'NRIC',
          name: 'Nepal Reinsurance Company Limited',
          price: 985.20,
          change: -4.25
        },
        {
          symbol: 'SHIVM',
          name: 'Shivam Cement Limited',
          price: 695.80,
          change: -3.95
        },
        {
          symbol: 'UPPER',
          name: 'Upper Tamakoshi Hydropower Limited',
          price: 485.60,
          change: -3.45
        },
        {
          symbol: 'BFC',
          name: 'Best Finance Company Limited',
          price: 365.20,
          change: -3.15
        }
      ]
    };
  }
}
