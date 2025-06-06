
export interface IPOData {
  company: string;
  issueManager: string;
  openDate: string;
  closeDate: string;
  units: string;
  price: number;
  status: 'upcoming' | 'open' | 'closed';
}

export interface RightShareData {
  company: string;
  ratio: string;
  price: number;
  bookCloseDate: string;
  status: 'upcoming' | 'open' | 'closed';
}

export class ExpandedStockDataService {
  static getExtendedStockList() {
    return [
      // Commercial Banks
      { symbol: 'NABIL', name: 'NABIL Bank Limited', sector: 'Commercial Banking', ltp: 492.37, change: 0.26 },
      { symbol: 'NICA', name: 'NIC Asia Bank Limited', sector: 'Commercial Banking', ltp: 353.75, change: -0.06 },
      { symbol: 'SANIMA', name: 'Sanima Bank Limited', sector: 'Commercial Banking', ltp: 312.50, change: 1.2 },
      { symbol: 'PRVU', name: 'Prabhu Bank Limited', sector: 'Commercial Banking', ltp: 298.80, change: -0.8 },
      { symbol: 'CZBIL', name: 'Citizen Bank International Limited', sector: 'Commercial Banking', ltp: 256.90, change: 0.5 },
      { symbol: 'KBL', name: 'Kumari Bank Limited', sector: 'Commercial Banking', ltp: 245.30, change: -1.1 },
      { symbol: 'PCBL', name: 'Prime Commercial Bank Limited', sector: 'Commercial Banking', ltp: 287.60, change: 0.9 },
      { symbol: 'GBIME', name: 'Global IME Bank Limited', sector: 'Commercial Banking', ltp: 312.10, change: 1.5 },
      
      // Development Banks
      { symbol: 'SHINE', name: 'Shine Resunga Development Bank Limited', sector: 'Development Banking', ltp: 445.20, change: 2.1 },
      { symbol: 'MNBBL', name: 'Muktinath Bikas Bank Limited', sector: 'Development Banking', ltp: 498.70, change: 1.8 },
      
      // Finance Companies
      { symbol: 'GFCL', name: 'Goodwill Finance Company Limited', sector: 'Finance', ltp: 298.50, change: -0.7 },
      { symbol: 'ICFC', name: 'ICFC Finance Limited', sector: 'Finance', ltp: 412.30, change: 1.3 },
      
      // Insurance Companies
      { symbol: 'NICL', name: 'Nepal Insurance Company Limited', sector: 'Non-Life Insurance', ltp: 772.47, change: 1.1 },
      { symbol: 'NLG', name: 'Nepal Life Insurance Company Limited', sector: 'Life Insurance', ltp: 890.25, change: 0.8 },
      { symbol: 'SLICL', name: 'Sagarmatha Insurance Company Limited', sector: 'Non-Life Insurance', ltp: 1245.60, change: 2.3 },
      
      // Hydropower
      { symbol: 'HIDCL', name: 'Hydroelectricity Investment and Development Company Limited', sector: 'Hydropower', ltp: 311.70, change: 1.01 },
      { symbol: 'CHCL', name: 'Chilime Hydropower Company Limited', sector: 'Hydropower', ltp: 435.80, change: 0.9 },
      { symbol: 'NHPC', name: 'National Hydropower Company Limited', sector: 'Hydropower', ltp: 298.40, change: -0.5 },
      { symbol: 'RHPL', name: 'Ridi Hydropower Development Company Limited', sector: 'Hydropower', ltp: 356.20, change: 1.7 },
      
      // Manufacturing
      { symbol: 'BPCL', name: 'Bottlers Nepal (Terai) Limited', sector: 'Manufacturing', ltp: 632.10, change: 9.98 },
      { symbol: 'UNL', name: 'Unilever Nepal Limited', sector: 'Manufacturing', ltp: 18500.00, change: 0.2 },
      { symbol: 'CCBL', name: 'Chaudhary CG Cement Limited', sector: 'Manufacturing', ltp: 567.30, change: -1.2 },
      
      // Hotels
      { symbol: 'OHL', name: 'Oriental Hotels Limited', sector: 'Hotel & Tourism', ltp: 498.70, change: 0.6 },
      { symbol: 'TGHL', name: 'Taragaon Regency Hotels Limited', sector: 'Hotel & Tourism', ltp: 312.80, change: -0.9 },
      
      // Microfinance
      { symbol: 'MMFDB', name: 'Mirmire Microfinance Development Bank Limited', sector: 'Microfinance', ltp: 1456.00, change: 1.8 },
      { symbol: 'SWBBL', name: 'Swabalamban Laghubitta Bittiya Sanstha Limited', sector: 'Microfinance', ltp: 1234.50, change: -0.4 },
      
      // Investment Companies
      { symbol: 'NICLBSL', name: 'NIC Asia Laghubitta Bittiya Sanstha Limited', sector: 'Investment', ltp: 1198.90, change: 0.7 },
      { symbol: 'MFIL', name: 'Mega Mutual Fund -1', sector: 'Mutual Fund', ltp: 8.97, change: 0.1 },
      
      // Trading
      { symbol: 'BBC', name: 'Butwal Kalika Broadcasting Company Limited', sector: 'Trading', ltp: 1876.40, change: 2.4 },
      
      // Airlines
      { symbol: 'NIFRA', name: 'Nepal Infrastructure Bank Limited', sector: 'Infrastructure', ltp: 298.70, change: 0.3 },
    ];
  }

  static getUpcomingIPOs(): IPOData[] {
    return [
      {
        company: 'Himalayan General Insurance Company Limited',
        issueManager: 'Prabhu Capital Limited',
        openDate: '2024-06-15',
        closeDate: '2024-06-19',
        units: '500,000',
        price: 100,
        status: 'upcoming'
      },
      {
        company: 'Nepal SBI Merchant Banking Limited',
        issueManager: 'NMB Capital Limited',
        openDate: '2024-06-20',
        closeDate: '2024-06-24',
        units: '300,000',
        price: 100,
        status: 'upcoming'
      },
      {
        company: 'Samriddhi Finance Company Limited',
        issueManager: 'NIBL Ace Capital Limited',
        openDate: '2024-06-10',
        closeDate: '2024-06-14',
        units: '400,000',
        price: 100,
        status: 'open'
      }
    ];
  }

  static getRightShares(): RightShareData[] {
    return [
      {
        company: 'Nabil Bank Limited',
        ratio: '1:5',
        price: 100,
        bookCloseDate: '2024-06-25',
        status: 'upcoming'
      },
      {
        company: 'NIC Asia Bank Limited',
        ratio: '1:4',
        price: 100,
        bookCloseDate: '2024-06-30',
        status: 'upcoming'
      },
      {
        company: 'Sanima Bank Limited',
        ratio: '1:6',
        price: 100,
        bookCloseDate: '2024-06-12',
        status: 'open'
      }
    ];
  }

  static searchStocks(query: string) {
    const stocks = this.getExtendedStockList();
    return stocks.filter(stock => 
      stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
      stock.name.toLowerCase().includes(query.toLowerCase()) ||
      stock.sector.toLowerCase().includes(query.toLowerCase())
    );
  }
}
