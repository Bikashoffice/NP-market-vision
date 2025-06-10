
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RealTimeMarketDataService } from "@/services/RealTimeMarketData";
import { TrendingUp, TrendingDown, Eye } from "lucide-react";

export const ModernDashboard = () => {
  const [marketData, setMarketData] = useState<any>(null);
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
        trending: [...topGainers.slice(0, 2), ...topLosers.slice(0, 2)]
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

  return (
    <div className="space-y-8">
      {/* Navigation Tabs */}
      <div className="flex gap-6 border-b border-gray-800">
        <button className="pb-3 px-1 text-white border-b-2 border-blue-500 font-medium">Stocks</button>
        <button className="pb-3 px-1 text-gray-400 hover:text-white">News</button>
        <button className="pb-3 px-1 text-gray-400 hover:text-white">Stocks</button>
        <button className="pb-3 px-1 text-gray-400 hover:text-white">Nepse Chart</button>
        <button className="pb-3 px-1 text-gray-400 hover:text-white font-medium bg-gray-800 px-3 py-1 rounded-lg">Market Zone</button>
      </div>

      {/* News Section */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketData.topGainers.map((stock: any, index: number) => (
            <Card key={index} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {stock.symbol.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{stock.symbol}</p>
                    <p className="text-green-400 text-sm font-medium">
                      {stock.percentageChange >= 0 ? '+' : ''}{stock.percentageChange.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Trending Section */}
      <div>
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
                    Watch Market
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
          <h2 className="text-xl font-semibold text-white">Stocks</h2>
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="🔍 Search"
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 text-white placeholder-gray-400 text-sm"
            />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-700 text-gray-400 text-sm font-medium">
            <div>Stocks</div>
            <div>Value</div>
            <div>Growth</div>
            <div>Stocks</div>
            <div>Sector</div>
          </div>
          
          {[...marketData.topGainers, ...marketData.topLosers].slice(0, 8).map((stock: any, index: number) => (
            <div key={index} className="grid grid-cols-5 gap-4 p-4 border-b border-gray-700 last:border-b-0 hover:bg-gray-750 transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  {stock.symbol.charAt(0)}
                </div>
                <span className="text-white font-medium">{stock.symbol}</span>
              </div>
              <div className="text-white">{stock.ltp}</div>
              <div className={`font-medium ${stock.percentageChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {stock.percentageChange >= 0 ? '+' : ''}{stock.percentageChange.toFixed(1)}%
              </div>
              <div className="text-white">{stock.symbol}</div>
              <div className="text-gray-400 uppercase text-xs">{stock.sector}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
