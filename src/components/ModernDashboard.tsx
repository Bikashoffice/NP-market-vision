
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RealTimeMarketDataService } from "@/services/RealTimeMarketData";
import { TrendingUp, TrendingDown, Eye, Calendar, Building, Newspaper } from "lucide-react";

export const ModernDashboard = () => {
  const [marketData, setMarketData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('stocks');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [summary, topGainers, topLosers] = await Promise.all([
        RealTimeMarketDataService.getMarketSummary(),
        RealTimeMarketDataService.getTopGainers(),
        RealTimeMarketDataService.getTopLosers()
      ]);

      setMarketData({
        summary,
        topGainers: topGainers.slice(0, 4),
        topLosers: topLosers.slice(0, 4),
        trending: [...topGainers.slice(0, 2), ...topLosers.slice(0, 2)],
        news: [
          {
            title: "NEPSE Index Reaches New Heights",
            summary: "The Nepal Stock Exchange index surged to new record levels today...",
            time: "2 hours ago",
            type: "market"
          },
          {
            title: "Upcoming IPO: Global IME Bank",
            summary: "Global IME Bank announces IPO opening from January 15-19, 2025",
            time: "4 hours ago",
            type: "ipo"
          },
          {
            title: "Rights Issue: Nepal Telecom",
            summary: "Nepal Telecom rights shares trading begins next week",
            time: "6 hours ago",
            type: "rights"
          },
          {
            title: "Banking Sector Shows Strong Performance",
            summary: "Commercial banks report increased quarterly profits...",
            time: "1 day ago",
            type: "market"
          }
        ]
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!marketData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent mx-auto mb-4" />
          <p className="text-gray-400">Loading market data...</p>
        </div>
      </div>
    );
  }

  const getNewsIcon = (type: string) => {
    switch (type) {
      case 'ipo':
        return <Building className="w-4 h-4 text-green-400" />;
      case 'rights':
        return <Calendar className="w-4 h-4 text-blue-400" />;
      default:
        return <Newspaper className="w-4 h-4 text-orange-400" />;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'news':
        return (
          <div className="space-y-4">
            {marketData.news.map((article: any, index: number) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {getNewsIcon(article.type)}
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-1">{article.title}</h3>
                      <p className="text-gray-400 text-sm mb-2">{article.summary}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {article.type.toUpperCase()}
                        </Badge>
                        <span className="text-gray-500 text-xs">{article.time}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      case 'stocks':
        return (
          <div>
            {/* Trending Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Trending</h2>
                <button className="text-gray-400 hover:text-white text-sm">Currently Trending ▼</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {marketData.trending.map((stock: any, index: number) => (
                  <Card key={index} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {stock.symbol.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{stock.symbol}</p>
                          <p className={`text-sm font-medium ${stock.percentageChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {stock.percentageChange >= 0 ? '+' : ''}{stock.percentageChange.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Rs. {stock.ltp.toLocaleString()}</span>
                        <Button size="sm" className="bg-gray-700 hover:bg-gray-600 text-white text-xs px-3 py-1">
                          <Eye className="w-3 h-3 mr-1" />
                          Watch
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Stocks Table */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">All Stocks</h2>
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    placeholder="🔍 Search stocks..."
                    className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 text-white placeholder-gray-400 text-sm"
                  />
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg border border-gray-700">
                <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-700 text-gray-400 text-sm font-medium">
                  <div>Symbol</div>
                  <div>Price</div>
                  <div>Change</div>
                  <div>Volume</div>
                  <div>Sector</div>
                </div>
                
                {[...marketData.topGainers, ...marketData.topLosers].slice(0, 10).map((stock: any, index: number) => (
                  <div key={index} className="grid grid-cols-5 gap-4 p-4 border-b border-gray-700 last:border-b-0 hover:bg-gray-750 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        {stock.symbol.charAt(0)}
                      </div>
                      <span className="text-white font-medium">{stock.symbol}</span>
                    </div>
                    <div className="text-white">Rs. {stock.ltp.toLocaleString()}</div>
                    <div className={`font-medium ${stock.percentageChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {stock.percentageChange >= 0 ? '+' : ''}{stock.percentageChange.toFixed(1)}%
                    </div>
                    <div className="text-gray-400">{stock.volume?.toLocaleString() || 'N/A'}</div>
                    <div className="text-gray-400 text-xs">{stock.sector || 'N/A'}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'nepse-chart':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-white mb-4">NEPSE Chart</h2>
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <p className="text-gray-400 mb-4">Interactive NEPSE index chart will be displayed here</p>
              <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Chart visualization coming soon</span>
              </div>
            </div>
          </div>
        );
      case 'market-zone':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-white mb-4">Market Zone</h2>
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <p className="text-gray-400 mb-4">Advanced market analysis and tools</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Market Indicators</h3>
                  <p className="text-gray-400 text-sm">Technical indicators and signals</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Sector Analysis</h3>
                  <p className="text-gray-400 text-sm">Sectoral performance overview</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Trading Tools</h3>
                  <p className="text-gray-400 text-sm">Advanced trading utilities</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Navigation Tabs */}
      <div className="flex gap-6 border-b border-gray-800">
        <button 
          onClick={() => setActiveTab('stocks')}
          className={`pb-3 px-1 font-medium transition-colors ${activeTab === 'stocks' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
        >
          Stocks
        </button>
        <button 
          onClick={() => setActiveTab('news')}
          className={`pb-3 px-1 font-medium transition-colors ${activeTab === 'news' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
        >
          News
        </button>
        <button 
          onClick={() => setActiveTab('nepse-chart')}
          className={`pb-3 px-1 font-medium transition-colors ${activeTab === 'nepse-chart' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
        >
          Nepse Chart
        </button>
        <button 
          onClick={() => setActiveTab('market-zone')}
          className={`pb-3 px-1 font-medium transition-colors ${activeTab === 'market-zone' ? 'text-white border-b-2 border-blue-500 bg-gray-800 px-3 py-1 rounded-lg' : 'text-gray-400 hover:text-white bg-gray-800 px-3 py-1 rounded-lg'}`}
        >
          Market Zone
        </button>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};
