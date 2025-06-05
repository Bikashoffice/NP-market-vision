
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, RefreshCw, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MarketDataService } from "@/services/MarketDataService";

export const TopGainersLosers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [marketData, setMarketData] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchMarketData();
  }, []);

  const fetchMarketData = async () => {
    setIsLoading(true);
    try {
      const data = await MarketDataService.getTopMovers();
      setMarketData(data);
      setLastUpdated(new Date());
      toast({
        title: "Data Updated",
        description: "Market data has been refreshed successfully",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to fetch market data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Market Movers</h2>
          <p className="text-gray-600">
            {lastUpdated && `Last updated: ${lastUpdated.toLocaleTimeString()}`}
          </p>
        </div>
        <Button 
          onClick={fetchMarketData} 
          disabled={isLoading}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </Button>
      </div>

      {marketData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Gainers */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center space-x-2 text-green-800">
                <TrendingUp className="w-5 h-5" />
                <span>Top 5 Gainers</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {marketData.topGainers?.map((stock: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-800 font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-semibold">{stock.symbol}</p>
                        <p className="text-sm text-gray-600">{stock.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatPrice(stock.price)}</p>
                      <p className="text-green-600 font-semibold flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {formatChange(stock.change)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Losers */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50">
              <CardTitle className="flex items-center space-x-2 text-red-800">
                <TrendingDown className="w-5 h-5" />
                <span>Top 5 Losers</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {marketData.topLosers?.map((stock: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-800 font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-semibold">{stock.symbol}</p>
                        <p className="text-sm text-gray-600">{stock.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatPrice(stock.price)}</p>
                      <p className="text-red-600 font-semibold flex items-center">
                        <TrendingDown className="w-4 h-4 mr-1" />
                        {formatChange(stock.change)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Market Summary */}
      {marketData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Market Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">NEPSE Index</p>
                <p className="text-2xl font-bold text-blue-800">{marketData.nepseIndex}</p>
                <p className={`text-sm font-semibold ${marketData.nepseChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatChange(marketData.nepseChange)}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Total Turnover</p>
                <p className="text-xl font-bold text-green-800">Rs. {marketData.totalTurnover}</p>
                <p className="text-sm text-gray-500">Today</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Shares Traded</p>
                <p className="text-xl font-bold text-purple-800">{marketData.sharesTraded}</p>
                <p className="text-sm text-gray-500">Volume</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Companies Traded</p>
                <p className="text-xl font-bold text-orange-800">{marketData.companiesTraded}</p>
                <p className="text-sm text-gray-500">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!marketData && !isLoading && (
        <Card className="text-center py-12">
          <CardContent>
            <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Click refresh to load market data</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
