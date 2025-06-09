
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, RefreshCw, BarChart3, Activity, Clock, Calendar, ArrowUp, ArrowDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TopGainersLosersProps {
  language: 'en' | 'ne';
}

export const TopGainersLosers = ({ language = 'en' }: TopGainersLosersProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { toast } = useToast();

  // Updated market data from your input
  const marketData = {
    nepseIndex: 2845.32,
    nepseChange: 1.25,
    totalTurnover: '12,450,886,663.46',
    sharesTraded: '22,108,809',
    companiesTraded: 324,
    advances: 227,
    declines: 86,
    unchanged: 11,
    marketStatus: {
      isOpen: true,
      status: 'Market is Open',
      nextActionTime: '3:00 PM'
    },
    currentTime: new Date().toLocaleTimeString(),
    tradingHours: {
      openTime: '11:00 AM',
      closeTime: '3:00 PM',
      tradingDays: 'Sun-Thu',
      timeZone: 'Nepal Standard Time (NPT)'
    },
    topGainers: [
      { symbol: 'MKHC', name: 'MKHC Limited', price: 449.68, change: 9.74, volume: 68334 },
      { symbol: 'RAWA', name: 'RAWA Limited', price: 876.34, change: 9.18, volume: 6981 },
      { symbol: 'GHL', name: 'GHL Limited', price: 267.69, change: 9.01, volume: 782887 },
      { symbol: 'MAKAR', name: 'MAKAR Limited', price: 632.2, change: 9.99, volume: 17303 },
      { symbol: 'BHDC', name: 'BHDC Limited', price: 478.8, change: 9.99, volume: 53298 }
    ],
    topLosers: [
      { symbol: 'BEDC', name: 'BEDC Limited', price: 725.59, change: -7.47, volume: 60310 },
      { symbol: 'MLBBL', name: 'MLBBL Limited', price: 1465.84, change: -5.23, volume: 1738 },
      { symbol: 'SAPDBL', name: 'SAPDBL Limited', price: 1082.93, change: -5.11, volume: 117295 },
      { symbol: 'MLBS', name: 'MLBS Limited', price: 1582.09, change: -3.05, volume: 1331 },
      { symbol: 'GRDBL', name: 'GRDBL Limited', price: 1274.59, change: -2.44, volume: 27838 }
    ]
  };

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
      loadMessage: "Click refresh to load live market data",
      symbol: "Symbol",
      ltp: "LTP",
      change: "Change",
      price: "Price"
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
      loadMessage: "रिफ्रेस दबाएर लाइभ बजार डाटा लोड गर्नुहोस्",
      symbol: "चिन्ह",
      ltp: "अन्तिम मूल्य",
      change: "परिवर्तन",
      price: "मूल्य"
    }
  };

  const t = texts[language];

  useEffect(() => {
    setLastUpdated(new Date());
  }, []);

  const fetchMarketData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastUpdated(new Date());
      
      toast({
        title: language === 'ne' ? "लाइभ डाटा अपडेट भयो" : "Live Data Updated",
        description: language === 'ne' ? "बजारको तत्काल डाटा सफलतापूर्वक अपडेट गरिएको छ" : "Market data updated successfully",
      });
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

  const formatVolume = (volume: number) => {
    if (volume > 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    } else if (volume > 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    }
    return volume.toLocaleString();
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-gray-600 mt-1">
            {lastUpdated && `${t.lastUpdated}: ${lastUpdated.toLocaleTimeString()}`}
          </p>
        </div>
        <Button 
          onClick={fetchMarketData} 
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          {t.refresh}
        </Button>
      </div>

      {/* Market Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg font-semibold text-blue-800">
              <Clock className="w-5 h-5 mr-2" />
              {t.marketStatus}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{t.currentTime}:</span>
              <Badge variant="outline" className="font-semibold">{marketData.currentTime}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{t.marketCondition}:</span>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Open
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{t.closeTime}:</span>
              <span className="font-semibold text-blue-800">{marketData.marketStatus.nextActionTime}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg font-semibold text-purple-800">
              <Calendar className="w-5 h-5 mr-2" />
              {t.tradingHours}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{t.openTime}:</span>
              <span className="font-semibold text-purple-800">{marketData.tradingHours.openTime}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{t.closeTime}:</span>
              <span className="font-semibold text-purple-800">{marketData.tradingHours.closeTime}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{t.tradingDays}:</span>
              <span className="font-semibold text-purple-800">{marketData.tradingHours.tradingDays}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Summary */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-50 to-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-bold text-gray-800">
            <BarChart3 className="w-6 h-6 mr-2" />
            {t.marketSummary}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="text-center bg-white p-4 rounded-xl shadow-sm">
              <p className="text-sm font-medium text-gray-600 mb-1">{t.nepseIndex}</p>
              <p className="text-2xl font-bold text-blue-600">{marketData.nepseIndex}</p>
              <p className="text-sm font-semibold text-green-600 flex items-center justify-center">
                <ArrowUp className="w-3 h-3 mr-1" />
                {formatChange(marketData.nepseChange)}
              </p>
            </div>
            
            <div className="text-center bg-white p-4 rounded-xl shadow-sm">
              <p className="text-sm font-medium text-gray-600 mb-1">{t.totalTurnover}</p>
              <p className="text-lg font-bold text-green-600">Rs. {marketData.totalTurnover}</p>
              <p className="text-xs text-gray-500">{t.today}</p>
            </div>
            
            <div className="text-center bg-white p-4 rounded-xl shadow-sm">
              <p className="text-sm font-medium text-gray-600 mb-1">{t.sharesTraded}</p>
              <p className="text-lg font-bold text-purple-600">{marketData.sharesTraded}</p>
              <p className="text-xs text-gray-500">{t.volume}</p>
            </div>
            
            <div className="text-center bg-white p-4 rounded-xl shadow-sm">
              <p className="text-sm font-medium text-gray-600 mb-1">{t.companiesCount}</p>
              <p className="text-lg font-bold text-orange-600">{marketData.companiesTraded}</p>
              <p className="text-xs text-gray-500">{t.active}</p>
            </div>
            
            <div className="text-center bg-white p-4 rounded-xl shadow-sm">
              <p className="text-sm font-medium text-gray-600 mb-1">{t.marketBreadth}</p>
              <div className="flex justify-center space-x-2 text-xs font-semibold">
                <span className="text-green-600 flex items-center">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  {marketData.advances}
                </span>
                <span className="text-red-600 flex items-center">
                  <ArrowDown className="w-3 h-3 mr-1" />
                  {marketData.declines}
                </span>
                <span className="text-gray-600">→{marketData.unchanged}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{t.gainersLosers}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Gainers and Losers */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Top Gainers */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CardTitle className="flex items-center text-xl font-bold">
              <TrendingUp className="w-6 h-6 mr-2" />
              {t.topGainers}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {marketData.topGainers.map((stock, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-green-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-700 font-bold text-sm">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{stock.symbol}</p>
                      <p className="text-sm text-gray-500">{formatVolume(stock.volume)} volume</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">{formatPrice(stock.price)}</p>
                    <p className="text-green-600 font-bold flex items-center">
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
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-red-500 to-rose-500 text-white">
            <CardTitle className="flex items-center text-xl font-bold">
              <TrendingDown className="w-6 h-6 mr-2" />
              {t.topLosers}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {marketData.topLosers.map((stock, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-red-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-700 font-bold text-sm">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{stock.symbol}</p>
                      <p className="text-sm text-gray-500">{formatVolume(stock.volume)} volume</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">{formatPrice(stock.price)}</p>
                    <p className="text-red-600 font-bold flex items-center">
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
    </div>
  );
};
