
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { RealTimeMarketDataService } from "@/services/RealTimeMarketData";

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
      title: "Market Overview",
      refresh: "Refresh",
      nepseIndex: "NEPSE Index",
      totalTurnover: "Turnover",
      sharesTraded: "Shares",
      topGainers: "Top Gainers",
      topLosers: "Top Losers",
      change: "Change",
      volume: "Volume",
      price: "Price"
    },
    ne: {
      title: "बजार अवलोकन",
      refresh: "रिफ्रेस",
      nepseIndex: "नेप्से सूचकांक",
      totalTurnover: "कारोबार",
      sharesTraded: "शेयर",
      topGainers: "शीर्ष बढेका",
      topLosers: "शीर्ष घटेका",
      change: "परिवर्तन",
      volume: "मात्रा",
      price: "मूल्य"
    }
  };

  const t = texts[language];

  useEffect(() => {
    loadMarketData();
  }, []);

  const loadMarketData = async () => {
    setIsLoading(true);
    try {
      const [summary, topGainers, topLosers] = await Promise.all([
        RealTimeMarketDataService.getMarketSummary(),
        RealTimeMarketDataService.getTopGainers(),
        RealTimeMarketDataService.getTopLosers()
      ]);

      setMarketData({
        summary,
        topGainers,
        topLosers
      });
      setLastUpdated(new Date());
    } catch (error) {
      toast({
        title: language === 'ne' ? "डाटा लोड असफल" : "Data Load Failed",
        description: language === 'ne' ? "बजारको डाटा प्राप्त गर्न असफल भयो" : "Failed to load market data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatChange = (change: number) => {
    if (typeof change !== 'number' || isNaN(change)) return '0.00%';
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  const formatPrice = (price: number) => {
    if (typeof price !== 'number' || isNaN(price)) return 'Rs. 0';
    return `Rs. ${price.toLocaleString()}`;
  };

  const formatVolume = (volume: number | undefined) => {
    if (typeof volume !== 'number' || isNaN(volume) || volume === undefined || volume === null) {
      return '0';
    }
    if (volume > 1000000) return `${(volume / 1000000).toFixed(1)}M`;
    if (volume > 1000) return `${(volume / 1000).toFixed(1)}K`;
    return volume.toLocaleString();
  };

  if (!marketData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading market data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">{t.title}</h2>
          {lastUpdated && (
            <p className="text-sm text-muted-foreground mt-1">
              Updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        <Button 
          onClick={loadMarketData} 
          disabled={isLoading}
          variant="outline"
          size="sm"
        >
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
          ) : null}
          {t.refresh}
        </Button>
      </div>

      {/* Market Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">{t.nepseIndex}</p>
              <p className="text-2xl font-bold text-foreground">{marketData.summary.nepseIndex}</p>
              <p className={`text-sm font-medium ${marketData.summary.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatChange(marketData.summary.percentChange)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">{t.totalTurnover}</p>
              <p className="text-lg font-semibold text-foreground">Rs. {marketData.summary.totalTurnover}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">{t.sharesTraded}</p>
              <p className="text-lg font-semibold text-foreground">{marketData.summary.totalTradedShares}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Gainers and Losers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Gainers */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-foreground">{t.topGainers}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {marketData.topGainers.map((stock: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <p className="font-medium text-foreground">{stock.symbol}</p>
                  <p className="text-sm text-muted-foreground">{formatVolume(stock.qty)}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">{formatPrice(stock.ltp)}</p>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {formatChange(stock.percentChange)}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Losers */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-foreground">{t.topLosers}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {marketData.topLosers.map((stock: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <p className="font-medium text-foreground">{stock.symbol}</p>
                  <p className="text-sm text-muted-foreground">{formatVolume(stock.qty)}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">{formatPrice(stock.ltp)}</p>
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    {formatChange(stock.percentChange)}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
