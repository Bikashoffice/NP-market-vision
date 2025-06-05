
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, AlertTriangle, BarChart3, Clock, Target } from "lucide-react";

export const PredictionDashboard = () => {
  const [predictions, setPredictions] = useState<any[]>([]);

  useEffect(() => {
    // Updated prediction data with current stock prices from the market data
    setPredictions([
      {
        symbol: 'NABIL',
        currentPrice: 492.37, // Updated current price
        predictedPrice: 520.00,
        change: 5.6,
        confidence: 78,
        timeframe: '2-4 weeks',
        trend: 'bullish',
        factors: ['Strong Q4 results', 'Digital banking expansion', 'Stable credit quality']
      },
      {
        symbol: 'NICA',
        currentPrice: 353.75, // Updated current price
        predictedPrice: 385.00,
        change: 8.9,
        confidence: 72,
        timeframe: '3-5 weeks',
        trend: 'bullish',
        factors: ['Fintech partnerships', 'Growing remittance business', 'Good dividend yield']
      },
      {
        symbol: 'EBL',
        currentPrice: 653.07, // Updated current price
        predictedPrice: 680.00,
        change: 4.1,
        confidence: 75,
        timeframe: '2-3 weeks',
        trend: 'bullish',
        factors: ['Strong digital banking growth', 'Expanding branch network', 'Improved loan portfolio']
      },
      {
        symbol: 'RFPL',
        currentPrice: 524.60, // Current top gainer
        predictedPrice: 490.00,
        change: -6.6,
        confidence: 65,
        timeframe: '1-3 weeks',
        trend: 'bearish',
        factors: ['Profit booking after rally', 'Seasonal power generation', 'Market correction expected']
      },
      {
        symbol: 'BPCL',
        currentPrice: 632.10, // Current top gainer
        predictedPrice: 600.00,
        change: -5.1,
        confidence: 68,
        timeframe: '2-4 weeks',
        trend: 'bearish',
        factors: ['High valuation concerns', 'Competition pressure', 'Margin compression']
      }
    ]);
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'bullish':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'bearish':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'bullish':
        return 'text-green-600';
      case 'bearish':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };

  const bullishCount = predictions.filter(p => p.trend === 'bullish').length;
  const bearishCount = predictions.filter(p => p.trend === 'bearish').length;
  const avgConfidence = Math.round(predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Bullish Predictions</p>
                <p className="text-2xl font-bold text-green-800">{bullishCount}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">Bearish Predictions</p>
                <p className="text-2xl font-bold text-red-800">{bearishCount}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Avg. Confidence</p>
                <p className="text-2xl font-bold text-blue-800">{avgConfidence}%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Predictions List */}
      <Card>
        <CardHeader>
          <CardTitle>AI Predictions Dashboard - Updated with Current Prices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictions.map((prediction, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getTrendIcon(prediction.trend)}
                    <div>
                      <h3 className="font-bold text-lg">{prediction.symbol}</h3>
                      <p className="text-sm text-gray-600 capitalize">{prediction.trend} Trend</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">Rs. {prediction.currentPrice.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Current</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Target className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium">Target Price</span>
                    </div>
                    <p className="font-bold">Rs. {prediction.predictedPrice.toLocaleString()}</p>
                    <p className={`text-sm font-semibold ${getTrendColor(prediction.trend)}`}>
                      {prediction.change >= 0 ? '+' : ''}{prediction.change.toFixed(1)}%
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium">Timeframe</span>
                    </div>
                    <p className="font-bold">{prediction.timeframe}</p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Confidence</span>
                      <span className="font-bold">{prediction.confidence}%</span>
                    </div>
                    <Progress value={prediction.confidence} className="w-full" />
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-sm mb-2">Key Factors:</h5>
                  <div className="flex flex-wrap gap-2">
                    {prediction.factors.map((factor: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
