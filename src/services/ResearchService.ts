
export class ResearchService {
  static async conductResearch(query: string): Promise<any> {
    // Simulate research delay
    await new Promise(resolve => setTimeout(resolve, 4000));

    // Comprehensive database of Nepal companies across all sectors
    const companiesDatabase = [
      // Commercial Banking
      {
        symbol: 'NABIL',
        companyName: 'NABIL Bank Limited',
        sector: 'Commercial Banking',
        marketCap: '52.8 Billion',
        peRatio: '12.8',
        priceToBook: '1.45',
        returnOnEquity: '18.2%',
        description: 'Nepal\'s premier commercial bank with the largest market capitalization and extensive branch network across the country. Known for innovative banking solutions and strong financial performance.',
        sentiment: 'Positive',
        sentimentScore: 82,
        currentPrice: 492.37,
        weeklyChange: 2.5,
        monthlyChange: 8.7,
        yearlyChange: 15.3,
        keyFactors: [
          'Q4 FY2081 net profit increased by 18.5% YoY to NPR 8.2 billion',
          'Successful digital banking transformation with mobile banking users up 45%',
          'Credit quality improvement with NPL ratio down to 1.2%',
          'Strategic expansion in rural banking and microfinance',
          'Strong capital adequacy ratio of 14.8% (above regulatory minimum)',
          'Dividend announcement of 25% cash + 15% bonus shares'
        ],
        fundamentalAnalysis: {
          strengths: ['Market leadership position', 'Strong brand recognition', 'Diversified revenue streams', 'Robust risk management'],
          weaknesses: ['High operational costs', 'Intense competition', 'Regulatory dependency'],
          opportunities: ['Digital banking expansion', 'SME lending growth', 'Rural market penetration'],
          threats: ['Fintech disruption', 'Economic slowdown', 'Interest rate volatility']
        },
        recentNews: [
          {
            title: 'NABIL Bank Reports Record Q4 Results',
            date: '2024-06-03',
            summary: 'The bank posted an 18.5% increase in net profit for Q4 FY2081, driven by strong lending growth and improved net interest margins.',
            impact: 'Positive',
            source: 'Nepal Stock Exchange'
          },
          {
            title: 'Digital Banking Initiative Shows Strong Growth',
            date: '2024-06-01',
            summary: 'NABIL\'s mobile banking platform saw 45% user growth, with digital transactions accounting for 65% of total volume.',
            impact: 'Positive',
            source: 'Banking Journal Nepal'
          },
          {
            title: 'Expansion into Rural Markets Announced',
            date: '2024-05-28',
            summary: 'Bank announces opening of 25 new branches in rural areas, focusing on agricultural and microfinance lending.',
            impact: 'Positive',
            source: 'Financial Times Nepal'
          }
        ],
        technicalLevels: {
          support: [485, 470, 455],
          resistance: [510, 525, 540],
          movingAverages: {
            ma20: 488.5,
            ma50: 482.3,
            ma200: 475.8
          }
        }
      },
      // Development Banking
      {
        symbol: 'NICA',
        companyName: 'NIC Asia Bank Limited',
        sector: 'Commercial Banking',
        marketCap: '48.9 Billion',
        peRatio: '11.5',
        priceToBook: '1.38',
        returnOnEquity: '17.8%',
        description: 'A leading commercial bank formed through merger, known for robust financial performance and innovative banking products. Strong presence in corporate and retail banking.',
        sentiment: 'Positive',
        sentimentScore: 79,
        currentPrice: 353.75,
        weeklyChange: 1.8,
        monthlyChange: 6.4,
        yearlyChange: 12.7,
        keyFactors: [
          'Successful integration post-merger showing synergies',
          'Strong corporate banking portfolio with blue-chip clients',
          'Expanding retail banking with focus on home loans',
          'Technology upgrades improving operational efficiency',
          'Consistent dividend payments with stable payout ratio'
        ],
        fundamentalAnalysis: {
          strengths: ['Post-merger synergies', 'Strong corporate relationships', 'Efficient operations'],
          weaknesses: ['Integration challenges', 'Market competition'],
          opportunities: ['Retail banking growth', 'Digital transformation', 'Cross-selling opportunities'],
          threats: ['Economic uncertainty', 'Regulatory changes', 'Credit risks']
        },
        recentNews: [
          {
            title: 'NIC Asia Completes Digital Transformation Phase II',
            date: '2024-06-02',
            summary: 'Bank successfully implements core banking system upgrade, improving transaction processing speed by 40%.',
            impact: 'Positive',
            source: 'Tech Nepal'
          }
        ],
        technicalLevels: {
          support: [345, 335, 320],
          resistance: [365, 380, 395],
          movingAverages: {
            ma20: 351.2,
            ma50: 348.7,
            ma200: 342.5
          }
        }
      },
      // Hydropower
      {
        symbol: 'HIDCL',
        companyName: 'Hydroelectricity Investment and Development Company Limited',
        sector: 'Hydropower',
        marketCap: '45.2 Billion',
        peRatio: '22.8',
        priceToBook: '2.15',
        returnOnEquity: '14.5%',
        description: 'Leading hydropower development company with diversified portfolio of operational and under-construction projects. Government-backed entity with strong project pipeline.',
        sentiment: 'Neutral',
        sentimentScore: 68,
        currentPrice: 311.70,
        weeklyChange: -1.2,
        monthlyChange: 3.8,
        yearlyChange: 8.9,
        keyFactors: [
          'Portfolio of 15 operational hydropower projects totaling 180 MW',
          'Strong cash flows from power purchase agreements with NEA',
          'Seasonal variations affecting generation and revenues',
          'Government support for renewable energy development',
          'Challenges with grid connectivity and transmission infrastructure'
        ],
        fundamentalAnalysis: {
          strengths: ['Diversified project portfolio', 'Government backing', 'Renewable energy focus'],
          weaknesses: ['Seasonal revenue variations', 'Grid connectivity issues'],
          opportunities: ['Energy export potential', 'New project development', 'Green financing'],
          threats: ['Monsoon variability', 'Transmission bottlenecks', 'Policy changes']
        },
        recentNews: [
          {
            title: 'New 25 MW Project Commissioned',
            date: '2024-05-30',
            summary: 'HIDCL successfully commissioned its latest hydropower project, adding 25 MW to its generation capacity.',
            impact: 'Positive',
            source: 'Energy Nepal'
          }
        ],
        technicalLevels: {
          support: [305, 295, 285],
          resistance: [320, 335, 350],
          movingAverages: {
            ma20: 309.8,
            ma50: 306.2,
            ma200: 298.7
          }
        }
      },
      // Insurance
      {
        symbol: 'NICL',
        companyName: 'Nepal Insurance Company Limited',
        sector: 'Non-Life Insurance',
        marketCap: '28.6 Billion',
        peRatio: '15.2',
        priceToBook: '1.68',
        returnOnEquity: '16.3%',
        description: 'Pioneer in Nepal\'s insurance industry with comprehensive non-life insurance products. Strong market presence with extensive agent network nationwide.',
        sentiment: 'Positive',
        sentimentScore: 76,
        currentPrice: 772.47,
        weeklyChange: 2.3,
        monthlyChange: 5.1,
        yearlyChange: 18.5,
        keyFactors: [
          'Market leader in non-life insurance with 25% market share',
          'Strong claims settlement ratio and customer satisfaction',
          'Expanding into digital insurance platforms',
          'Growing motor and property insurance segments',
          'Stable underwriting performance with improving combined ratio'
        ],
        fundamentalAnalysis: {
          strengths: ['Market leadership', 'Brand recognition', 'Wide distribution network'],
          weaknesses: ['Dependence on traditional products', 'Limited product innovation'],
          opportunities: ['Digital insurance', 'Microinsurance', 'Bancassurance partnerships'],
          threats: ['New market entrants', 'Regulatory changes', 'Natural disasters']
        },
        recentNews: [
          {
            title: 'Digital Insurance Platform Launch',
            date: '2024-05-25',
            summary: 'NICL launches online insurance platform allowing customers to purchase and renew policies digitally.',
            impact: 'Positive',
            source: 'Insurance Times'
          }
        ],
        technicalLevels: {
          support: [750, 730, 710],
          resistance: [790, 810, 830],
          movingAverages: {
            ma20: 768.5,
            ma50: 761.2,
            ma200: 745.8
          }
        }
      },
      // Manufacturing
      {
        symbol: 'BPCL',
        companyName: 'Bottlers Nepal (Terai) Limited',
        sector: 'Manufacturing',
        marketCap: '24.3 Billion',
        peRatio: '18.7',
        priceToBook: '2.85',
        returnOnEquity: '19.2%',
        description: 'Leading beverage manufacturer and distributor in Nepal, franchise bottler for Coca-Cola products. Strong distribution network and brand portfolio.',
        sentiment: 'Positive',
        sentimentScore: 81,
        currentPrice: 632.10,
        weeklyChange: 8.2,
        monthlyChange: 12.5,
        yearlyChange: 22.8,
        keyFactors: [
          'Exclusive bottling rights for Coca-Cola in assigned territory',
          'Strong brand portfolio including Coke, Sprite, Fanta',
          'Expanding distribution network across rural markets',
          'Seasonal demand patterns with peak in summer months',
          'Investment in modern bottling facilities and technology'
        ],
        fundamentalAnalysis: {
          strengths: ['Strong brand portfolio', 'Exclusive franchise rights', 'Wide distribution'],
          weaknesses: ['Seasonal demand', 'Raw material cost dependency'],
          opportunities: ['Rural market expansion', 'New product launches', 'Export potential'],
          threats: ['Health consciousness trends', 'Competition', 'Sugar tax proposals']
        },
        recentNews: [
          {
            title: 'Q4 Results Show Strong Recovery',
            date: '2024-06-01',
            summary: 'BPCL reports 25% increase in Q4 revenue driven by strong summer demand and market expansion.',
            impact: 'Positive',
            source: 'Manufacturing Today'
          }
        ],
        technicalLevels: {
          support: [610, 585, 560],
          resistance: [650, 675, 700],
          movingAverages: {
            ma20: 618.3,
            ma50: 598.7,
            ma200: 572.4
          }
        }
      }
    ];

    // Find matching company or return default based on query
    let matchedCompany = companiesDatabase.find(c => 
      c.symbol.toLowerCase().includes(query.toLowerCase()) ||
      c.companyName.toLowerCase().includes(query.toLowerCase()) ||
      query.toLowerCase().includes(c.symbol.toLowerCase())
    );

    // If no exact match, return a random company from appropriate sector
    if (!matchedCompany) {
      // Try to match by sector keywords
      const sectorKeywords = {
        'bank': companiesDatabase.filter(c => c.sector.includes('Banking')),
        'insurance': companiesDatabase.filter(c => c.sector.includes('Insurance')),
        'hydro': companiesDatabase.filter(c => c.sector.includes('Hydropower')),
        'power': companiesDatabase.filter(c => c.sector.includes('Hydropower')),
        'manufacturing': companiesDatabase.filter(c => c.sector.includes('Manufacturing'))
      };

      for (const [keyword, companies] of Object.entries(sectorKeywords)) {
        if (query.toLowerCase().includes(keyword) && companies.length > 0) {
          matchedCompany = companies[Math.floor(Math.random() * companies.length)];
          break;
        }
      }

      // If still no match, return random company
      if (!matchedCompany) {
        matchedCompany = companiesDatabase[Math.floor(Math.random() * companiesDatabase.length)];
      }
    }

    return matchedCompany;
  }
}
