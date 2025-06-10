
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RealTimeMarketDataService } from "@/services/RealTimeMarketData";

export const PredictionDashboard = () => {
  const [predictions, setPredictions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    generatePredictions();
  }, []);

  const generatePredictions = async () => {
    setIsLoading(true);
    try {
      const allStocks = await RealTimeMarketDataService.getAllStocks();
      const marketSummary = await RealTimeMarketDataService.getMarketSummary();

      const predictionsData = allStocks.slice(0, 6).map(stock => {
        const currentTrend = stock.percentageChange > 0 ? 'bullish' : 'bearish';
        const volatility = Math.abs(stock.percentageChange);
        
        let predictedChange = 0;
        let confidence = 50;
        let timeframe = '1-2 weeks';

        if (currentTrend === 'bullish' && volatility > 5) {
          predictedChange = Math.random() > 0.6 ? (Math.random() * 8 + 2) : -(Math.random() * 4 + 1);
          confidence = 65 + Math.random() * 20;
        } else if (currentTrend === 'bearish' && volatility > 3) {
          predictedChange = Math.random() > 0.4 ? (Math.random() * 6 + 3) : -(Math.random() * 5 + 2);
          confidence = 60 + Math.random() * 25;
        } else {
          predictedChange = (Math.random() - 0.5) * 8;
          confidence = 70 + Math.random() * 15;
        }

        const predictedPrice = stock.ltp * (1 + predictedChange / 100);

        return {
          symbol: stock.symbol,
          currentPrice: stock.ltp,
          predictedPrice: predictedPrice,
          change: predictedChange,
          confidence: Math.round(confidence),
          timeframe,
          trend: predictedChange > 0 ? 'bullish' : 'bearish',
          volume: stock.volume
        };
      });

      setPredictions(predictionsData);
    } catch (error) {
      console.error('Failed to generate predictions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const bullishCount = predictions.filter(p => p.trend === 'bullish').length;
  const bearishCount = predictions.filter(p => p.trend === 'bearish').length;
  const avgConfidence = predictions.length > 0 ? Math.round(predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length) : 0;

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Bullish Signals</p>
            <p className="text-2xl font-bold text-green-600">{bullishCount}</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Bearish Signals</p>
            <p className="text-2xl font-bold text-red-600">{bearishCount}</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Avg. Confidence</p>
            <p className="text-2xl font-bold text-foreground">{avgConfidence}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Predictions */}
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold text-foreground">AI Predictions</CardTitle>
          <Button 
            onClick={generatePredictions} 
            disabled={isLoading}
            variant="outline" 
            size="sm"
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
            ) : null}
            Refresh
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {predictions.map((prediction, index) => (
            <div key={index} className="p-4 rounded-lg bg-muted/30 border border-border">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground text-lg">{prediction.symbol}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{prediction.trend} trend</p>
                </div>
                <Badge 
                  variant={prediction.trend === 'bullish' ? 'default' : 'secondary'}
                  className={prediction.trend === 'bullish' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                >
                  {prediction.confidence}% confidence
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-background rounded border">
                  <p className="text-sm text-muted-foreground">Current</p>
                  <p className="font-bold text-foreground">Rs. {prediction.currentPrice.toLocaleString()}</p>
                </div>

                <div className="text-center p-3 bg-background rounded border">
                  <p className="text-sm text-muted-foreground">Target</p>
                  <p className="font-bold text-foreground">Rs. {prediction.predictedPrice.toLocaleString()}</p>
                  <p className={`text-sm font-medium ${prediction.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {prediction.change >= 0 ? '+' : ''}{prediction.change.toFixed(1)}%
                  </p>
                </div>

                <div className="text-center p-3 bg-background rounded border">
                  <p className="text-sm text-muted-foreground">Timeframe</p>
                  <p className="font-bold text-foreground">{prediction.timeframe}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
