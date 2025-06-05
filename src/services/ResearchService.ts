
export class ResearchService {
  static async conductResearch(query: string): Promise<any> {
    // Simulate research delay
    await new Promise(resolve => setTimeout(resolve, 4000));

    // Mock research data for Nepal stock market
    const companies = [
      {
        symbol: 'NABIL',
        companyName: 'Nabil Bank Limited',
        sector: 'Commercial Banking',
        marketCap: '50.2 Billion',
        peRatio: '12.4',
        description: 'One of the leading commercial banks in Nepal with strong financial performance and extensive branch network.',
        sentiment: 'Positive',
        sentimentScore: 75,
        keyFactors: [
          'Strong Q4 financial results with 15% profit growth',
          'Expansion of digital banking services',
          'Stable credit quality and low NPL ratio',
          'Positive outlook for banking sector in Nepal'
        ],
        recentNews: [
          {
            title: 'Nabil Bank Reports Strong Q4 Results',
            date: '2024-01-15',
            summary: 'The bank posted a 15% increase in net profit driven by higher interest income and fee-based services.',
            impact: 'Positive'
          },
          {
            title: 'Digital Banking Initiative Launch',
            date: '2024-01-10',
            summary: 'Nabil Bank launched new mobile banking features to enhance customer experience.',
            impact: 'Positive'
          }
        ]
      },
      {
        symbol: 'NICA',
        companyName: 'NIC Asia Bank Limited',
        sector: 'Commercial Banking',
        marketCap: '48.7 Billion',
        peRatio: '11.8',
        description: 'A major commercial bank in Nepal known for its innovative banking solutions and strong market presence.',
        sentiment: 'Positive',
        sentimentScore: 72,
        keyFactors: [
          'Consistent dividend payments to shareholders',
          'Strong capital adequacy ratio',
          'Growing remittance business',
          'Strategic partnerships with fintech companies'
        ],
        recentNews: [
          {
            title: 'NIC Asia Partners with Fintech Startup',
            date: '2024-01-12',
            summary: 'The bank announced a strategic partnership to enhance digital payment solutions.',
            impact: 'Positive'
          }
        ]
      },
      {
        symbol: 'HIDCL',
        companyName: 'Hydroelectricity Investment and Development Company Limited',
        sector: 'Hydropower',
        marketCap: '35.8 Billion',
        peRatio: '18.5',
        description: 'Leading hydropower development company contributing to Nepal\'s energy sector growth.',
        sentiment: 'Neutral',
        sentimentScore: 60,
        keyFactors: [
          'Government support for renewable energy',
          'Seasonal variations in power generation',
          'Grid connectivity challenges',
          'Long-term growth potential in energy sector'
        ],
        recentNews: [
          {
            title: 'New Hydropower Project Approval',
            date: '2024-01-08',
            summary: 'HIDCL received approval for a new 50MW hydropower project in western Nepal.',
            impact: 'Positive'
          }
        ]
      }
    ];

    // Find matching company or return default
    const company = companies.find(c => 
      c.symbol.toLowerCase().includes(query.toLowerCase()) ||
      c.companyName.toLowerCase().includes(query.toLowerCase())
    ) || companies[0];

    return company;
  }
}
