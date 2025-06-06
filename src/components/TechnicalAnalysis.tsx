import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChartCandlestick, TrendingUp, TrendingDown, Activity, BarChart3, Settings, Play, Pause } from "lucide-react";
import { ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, Line, ReferenceLine } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ExpandedStockDataService } from "@/services/ExpandedStockData";

interface TechnicalAnalysisProps {
  symbol?: string;
}

export const TechnicalAnalysis = ({ symbol = "NABIL" }: TechnicalAnalysisProps) => {
  const [selectedSymbol, setSelectedSymbol] = useState(symbol);
  const [timeframe, setTimeframe] = useState("1D");
  const [chartType, setChartType] = useState("candlestick");
  const [indicators, setIndicators] = useState<string[]>(["SMA", "Volume"]);
  const [isAutoRefresh, setIsAutoRefresh] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);
  const [stockInfo, setStockInfo] = useState<any>(null);

  const timeframes = ["1m", "5m", "15m", "1h", "4h", "1D", "1W", "1M"];
  const availableIndicators = [
    "SMA", "EMA", "RSI", "MACD", "Bollinger Bands", "Volume", "VWAP", "Stochastic"
  ];

  const stocks = ExpandedStockDataService.getExtendedStockList();

  useEffect(() => {
    generateChartData();
    loadStockInfo();
  }, [selectedSymbol, timeframe]);

  const generateChartData = () => {
    const basePrice = Math.random() * 1000 + 200;
    const days = timeframe === "1W" ? 7 : timeframe === "1M" ? 30 : 30;
    
    const data = Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - i));
      
      const open = basePrice + (Math.random() - 0.5) * 100;
      const volatility = Math.random() * 20;
      const close = open + (Math.random() - 0.5) * volatility;
      const high = Math.max(open, close) + Math.random() * 10;
      const low = Math.min(open, close) - Math.random() * 10;
      const volume = Math.floor(Math.random() * 1000000) + 50000;
      
      return {
        date: date.toISOString().split('T')[0],
        time: date.getTime(),
        open: Number(open.toFixed(2)),
        high: Number(high.toFixed(2)),
        low: Number(low.toFixed(2)),
        close: Number(close.toFixed(2)),
        volume,
        sma: Number((open + close) / 2).toFixed(2),
        ema: Number(close * 0.1 + open * 0.9).toFixed(2),
        rsi: Math.floor(Math.random() * 100),
        macd: (Math.random() - 0.5) * 10
      };
    });
    
    setChartData(data);
  };

  const loadStockInfo = () => {
    const stock = stocks.find(s => s.symbol === selectedSymbol);
    if (stock) {
      setStockInfo(stock);
    }
  };

  const toggleIndicator = (indicator: string) => {
    setIndicators(prev => 
      prev.includes(indicator) 
        ? prev.filter(i => i !== indicator)
        : [...prev, indicator]
    );
  };

  const CustomCandlestick = ({ payload, x, width }: any) => {
    if (!payload || !payload.payload) return null;
    
    const data = payload.payload;
    const { open, high, low, close } = data;
    const isPositive = close >= open;
    const bodyHeight = Math.abs(close - open);
    const bodyY = Math.min(open, close);
    const candleWidth = width * 0.6;
    const candleX = x + (width - candleWidth) / 2;
    
    return (
      <g>
        {/* High-Low line (wick) */}
        <line
          x1={x + width / 2}
          y1={high}
          x2={x + width / 2}
          y2={low}
          stroke={isPositive ? "#22c55e" : "#ef4444"}
          strokeWidth={1}
        />
        {/* Body */}
        <rect
          x={candleX}
          y={bodyY}
          width={candleWidth}
          height={bodyHeight || 1}
          fill={isPositive ? "#22c55e" : "#ef4444"}
          stroke={isPositive ? "#22c55e" : "#ef4444"}
          strokeWidth={1}
        />
      </g>
    );
  };

  const chartConfig = {
    price: {
      label: "Price",
      color: "hsl(var(--chart-1))",
    },
    volume: {
      label: "Volume",
      color: "hsl(var(--chart-2))",
    },
    sma: {
      label: "SMA",
      color: "hsl(var(--chart-3))",
    },
    ema: {
      label: "EMA",
      color: "hsl(var(--chart-4))",
    },
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <ChartCandlestick className="w-5 h-5" />
              <span>Technical Analysis</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant={isAutoRefresh ? "default" : "outline"}
                size="sm"
                onClick={() => setIsAutoRefresh(!isAutoRefresh)}
              >
                {isAutoRefresh ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isAutoRefresh ? "Pause" : "Auto"}
              </Button>
              <Settings className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Symbol</label>
              <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {stocks.slice(0, 20).map((stock) => (
                    <SelectItem key={stock.symbol} value={stock.symbol}>
                      {stock.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Timeframe</label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeframes.map((tf) => (
                    <SelectItem key={tf} value={tf}>
                      {tf}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Chart Type</label>
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="candlestick">Candlestick</SelectItem>
                  <SelectItem value="line">Line</SelectItem>
                  <SelectItem value="area">Area</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {stockInfo && (
              <>
                <div className="text-center">
                  <div className="text-2xl font-bold">{stockInfo.ltp}</div>
                  <div className="text-sm text-gray-600">LTP</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-semibold ${stockInfo.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stockInfo.change >= 0 ? '+' : ''}{stockInfo.change}%
                  </div>
                  <div className="text-sm text-gray-600">Change</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">{stockInfo.volume?.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Volume</div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Technical Indicators Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Technical Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {availableIndicators.map((indicator) => (
              <Badge
                key={indicator}
                variant={indicators.includes(indicator) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/80"
                onClick={() => toggleIndicator(indicator)}
              >
                {indicator}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Chart */}
      <Card className="h-[600px]">
        <CardContent className="p-4 h-full">
          <ChartContainer config={chartConfig} className="h-[550px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="price"
                  domain={['dataMin - 10', 'dataMax + 10']}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="volume"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 border rounded shadow-lg">
                          <p className="font-semibold">{`Date: ${label}`}</p>
                          {chartType === "candlestick" && (
                            <>
                              <p className="text-blue-600">{`Open: ${data.open}`}</p>
                              <p className="text-green-600">{`High: ${data.high}`}</p>
                              <p className="text-red-600">{`Low: ${data.low}`}</p>
                              <p className="text-purple-600">{`Close: ${data.close}`}</p>
                            </>
                          )}
                          <p className="text-gray-600">{`Volume: ${data.volume?.toLocaleString()}`}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                {/* Volume bars */}
                {indicators.includes("Volume") && (
                  <Bar
                    yAxisId="volume"
                    dataKey="volume"
                    fill="#8884d8"
                    opacity={0.3}
                  />
                )}

                {/* Candlesticks */}
                {chartType === "candlestick" && (
                  chartData.map((entry, index) => (
                    <CustomCandlestick
                      key={index}
                      payload={{ payload: entry }}
                      x={index * (100 / chartData.length)}
                      width={100 / chartData.length}
                    />
                  ))
                )}

                {/* Price line */}
                {chartType === "line" && (
                  <Line
                    yAxisId="price"
                    type="monotone"
                    dataKey="close"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={false}
                  />
                )}

                {/* Moving Averages */}
                {indicators.includes("SMA") && (
                  <Line
                    yAxisId="price"
                    type="monotone"
                    dataKey="sma"
                    stroke="#f59e0b"
                    strokeWidth={1}
                    dot={false}
                  />
                )}

                {indicators.includes("EMA") && (
                  <Line
                    yAxisId="price"
                    type="monotone"
                    dataKey="ema"
                    stroke="#10b981"
                    strokeWidth={1}
                    dot={false}
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Technical Analysis Tabs */}
      <Tabs defaultValue="indicators" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="indicators">Indicators</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="levels">Support/Resistance</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="indicators" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">RSI (14)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">65.4</span>
                  <Badge variant="outline">Neutral</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65.4%' }}></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">MACD</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">2.34</span>
                  <Badge className="bg-green-500">Bullish</Badge>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Signal: 1.89 | Histogram: 0.45
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Bollinger Bands</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm">
                  <div>Upper: 525.40</div>
                  <div>Middle: 492.37</div>
                  <div>Lower: 459.34</div>
                </div>
                <Badge variant="outline" className="mt-2">Normal</Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Detected Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Ascending Triangle</span>
                    <Badge className="bg-green-500">Bullish</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Higher Lows</span>
                    <Badge className="bg-green-500">Bullish</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Volume Confirmation</span>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Pattern Reliability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Success Rate</span>
                    <span className="font-semibold">78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Time Frame</span>
                    <span className="font-semibold">2-3 weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Target</span>
                    <span className="font-semibold text-green-600">+8-12%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="levels" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Support Levels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Strong Support</span>
                    <span className="font-semibold text-green-600">480.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Support</span>
                    <span className="font-semibold">475.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Weak Support</span>
                    <span className="font-semibold">465.00</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Resistance Levels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Weak Resistance</span>
                    <span className="font-semibold">505.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Resistance</span>
                    <span className="font-semibold">515.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Strong Resistance</span>
                    <span className="font-semibold text-red-600">525.00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Price Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input placeholder="Alert Price" />
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="above">Above</SelectItem>
                      <SelectItem value="below">Below</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm">Add Alert</Button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Price Above 500.00</span>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
