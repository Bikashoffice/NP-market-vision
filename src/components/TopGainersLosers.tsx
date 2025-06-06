
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, RefreshCw, BarChart3, Activity, Clock, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MarketDataService } from "@/services/MarketDataService";

interface TopGainersLosersProps {
  language: 'en' | 'ne';
}

export const TopGainersLosers = ({ language = 'en' }: TopGainersLosersProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [marketData, setMarketData] = useState<any>(null);
  const { toast } = useToast();

  const texts = {
    en: {
      title: "NEPSE Live Market Data",
      lastUpdated: "Last Updated",
      refresh: "Refresh",
      marketStatus: "Market Status",
      currentTime: "Current Time",
      marketCondition: "Market Condition",
      tradingHours: "Trading Hours",
      openTime: "Open Time",
      closeTime: "Close Time",
      tradingDays: "Trading Days",
      marketSummary: "NEPSE Market Summary",
      nepseIndex: "NEPSE Index",
      totalTurnover: "Total Turnover",
      sharesTraded: "Shares Traded",
      today: "Today",
      volume: "Volume",
      companiesCount: "Companies Count",
      active: "Active",
      marketBreadth: "Market Breadth",
      gainersLosers: "Up/Down/Unchanged",
      topGainers: "Top 5 Gainers",
      topLosers: "Top 5 Losers",
      loadMessage: "Click refresh to load live market data"
    },
    ne: {
      title: "नेप्से लाइभ बजार डाटा",
      lastUpdated: "अन्तिम अपडेट",
      refresh: "रिफ्रेस",
      marketStatus: "बजारको स्थिति",
      currentTime: "वर्तमान समय",
      marketCondition: "बजारको अवस्था",
      tradingHours: "कारोबार समय",
      openTime: "खुल्ने समय",
      closeTime: "बन्द हुने समय",
      tradingDays: "कारोबार दिन",
      marketSummary: "नेप्से बजार सारांश",
      nepseIndex: "नेप्से सूचकांक",
      totalTurnover: "कुल कारोबार",
      sharesTraded: "कारोबार शेयर",
      today: "आज",
      volume: "मात्रा",
      companiesCount: "कम्पनी संख्या",
      active: "सक्रिय",
      marketBreadth: "बजार चौडाई",
      gainersLosers: "बढ्यो/घट्यो/समान",
      topGainers: "शीर्ष बढेका ५",
      topLosers: "शीर्ष घटेका ५",
      loadMessage: "रिफ्रेस दबाएर लाइभ बजार डाटा लोड गर्नुहोस्"
    }
  };

  const t = texts[language];

  useEffect(() => {
    fetchMarketData();
    
    // Auto-refresh every 30 seconds during market hours
    const interval = setInterval(() => {
      if (marketData?.marketStatus?.isOpen) {
        fetchMarketData();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchMarketData = async () => {
    setIsLoading(true);
    try {
      const data = await MarketDataService.getTopMovers();
      setMarketData(data);
      setLastUpdated(new Date());
      
      if (data.marketStatus?.isOpen) {
        toast({
          title: language === 'ne' ? "लाइभ डाटा अपडेट भयो" : "Live Data Updated",
          description: language === 'ne' ? "बजारको तत्काल डाटा सफलतापूर्वक अपडेट गरिएको छ" : "Market data updated successfully",
        });
      }
    } catch (error) {
      toast({
        title: language === 'ne' ? "डाटा अपडेट असफल" : "Data Update Failed",
        description: language === 'ne' ? "बजारको डाटा प्राप्त गर्न असफल भयो। कृपया फेरि प्रयास गर्नुहोस्।" : "Failed to get market data. Please try again.",
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
      {/* Header with Market Status */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{t.title}</h2>
          <p className="text-gray-600">
            {lastUpdated && `${t.lastUpdated}: ${lastUpdated.toLocaleTimeString(language === 'ne' ? 'ne-NP' : 'en-US')}`}
          </p>
        </div>
        <Button 
          onClick={fetchMarketData} 
          disabled={isLoading}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{t.refresh}</span>
        </Button>
      </div>

      {/* Market Status and Timing */}
      {marketData?.marketStatus && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{t.marketStatus}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>{t.currentTime}:</span>
                  <Badge variant="outline">{marketData.currentTime}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t.marketCondition}:</span>
                  <Badge className={marketData.marketStatus.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {marketData.marketStatus.isOpen ? (language === 'ne' ? 'खुला' : 'Open') : (language === 'ne' ? 'बन्द' : 'Closed')}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>{marketData.marketStatus.isOpen ? (language === 'ne' ? 'बन्द हुने समय' : 'Closing Time') : (language === 'ne' ? 'खुल्ने समय' : 'Opening Time')}:</span>
                  <span className="font-semibold">{marketData.marketStatus.nextActionTime}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{t.tradingHours}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>{t.openTime}:</span>
                  <span className="font-semibold">{marketData.tradingHours?.openTime || '11:00 AM'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t.closeTime}:</span>
                  <span className="font-semibold">{marketData.tradingHours?.closeTime || '3:00 PM'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t.tradingDays}:</span>
                  <span className="font-semibold">{marketData.tradingHours?.tradingDays || 'Sun-Thu'}</span>
                </div>
                <div className="text-xs text-gray-500 text-center">
                  {marketData.tradingHours?.timeZone || 'Nepal Standard Time (NPT)'}
                </div>
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
              <span>{t.marketSummary}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">{t.nepseIndex}</p>
                <p className="text-2xl font-bold text-blue-800">{marketData.nepseIndex}</p>
                <p className={`text-sm font-semibold ${marketData.nepseChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatChange(marketData.nepseChange)}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">{t.totalTurnover}</p>
                <p className="text-xl font-bold text-green-800">Rs. {marketData.totalTurnover}</p>
                <p className="text-sm text-gray-500">{t.today}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">{t.sharesTraded}</p>
                <p className="text-xl font-bold text-purple-800">{marketData.sharesTraded}</p>
                <p className="text-sm text-gray-500">{t.volume}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">{t.companiesCount}</p>
                <p className="text-xl font-bold text-orange-800">{marketData.companiesTraded}</p>
                <p className="text-sm text-gray-500">{t.active}</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">{t.marketBreadth}</p>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-green-600">↗ {marketData.advances}</span>
                  <span className="text-red-600">↘ {marketData.declines}</span>
                  <span className="text-gray-600">→ {marketData.unchanged}</span>
                </div>
                <p className="text-sm text-gray-500">{t.gainersLosers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top Gainers and Losers */}
      {marketData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Gainers */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center space-x-2 text-green-800">
                <TrendingUp className="w-5 h-5" />
                <span>{t.topGainers}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {marketData.topGainers?.slice(0, 5).map((stock: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-800 font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-semibold">{stock.symbol}</p>
                        <p className="text-sm text-gray-600 truncate max-w-48">{stock.name}</p>
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
                <span>{t.topLosers}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {marketData.topLosers?.slice(0, 5).map((stock: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-800 font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-semibold">{stock.symbol}</p>
                        <p className="text-sm text-gray-600 truncate max-w-48">{stock.name}</p>
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

      {!marketData && !isLoading && (
        <Card className="text-center py-12">
          <CardContent>
            <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">{t.loadMessage}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
