
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Search, Globe, TrendingUp, TrendingDown, Calendar, ExternalLink, BarChart3, Target, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ResearchService } from "@/services/ResearchService";

export const MarketResearch = () => {
  const [query, setQuery] = useState('');
  const [isResearching, setIsResearching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [researchResults, setResearchResults] = useState<any>(null);
  const { toast } = useToast();

  const handleResearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Enter Search Query",
        description: "Please enter a stock symbol or company name to research",
        variant: "destructive",
      });
      return;
    }

    setIsResearching(true);
    setProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 12;
        });
      }, 600);

      const results = await ResearchService.conductResearch(query);
      
      clearInterval(progressInterval);
      setProgress(100);
      setResearchResults(results);

      toast({
        title: "Research Complete",
        description: "Comprehensive market research has been completed successfully",
      });
    } catch (error) {
      toast({
        title: "Research Failed",
        description: "Failed to conduct market research. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResearching(false);
      setTimeout(() => setProgress(0), 2000);
    }
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4" />;
    if (change < 0) return <TrendingDown className="w-4 h-4" />;
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Research Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Advanced Market Research</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter stock symbol, company name, or sector (e.g., NABIL, banking, hydropower)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleResearch()}
              className="flex-1"
            />
            <Button 
              onClick={handleResearch} 
              disabled={isResearching}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isResearching ? "Analyzing..." : "Research"}
            </Button>
          </div>

          {isResearching && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Gathering comprehensive market data and analysis...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Research Results */}
      {researchResults && (
        <div className="space-y-6">
          {/* Company Overview & Price Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Company Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-lg">{researchResults.companyName}</h4>
                    <p className="text-gray-600">{researchResults.sector}</p>
                    <Badge variant="outline" className="mt-1">{researchResults.symbol}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600">Market Cap</p>
                      <p className="font-bold text-sm">Rs. {researchResults.marketCap}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600">P/E Ratio</p>
                      <p className="font-bold text-sm">{researchResults.peRatio}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600">Price to Book</p>
                      <p className="font-bold text-sm">{researchResults.priceToBook}</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600">ROE</p>
                      <p className="font-bold text-sm">{researchResults.returnOnEquity}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700">{researchResults.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Price Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Price Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">Rs. {researchResults.currentPrice?.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Current Price</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Weekly Change</span>
                    <div className={`flex items-center space-x-1 ${getChangeColor(researchResults.weeklyChange)}`}>
                      {getChangeIcon(researchResults.weeklyChange)}
                      <span className="font-semibold">{researchResults.weeklyChange?.toFixed(2)}%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Monthly Change</span>
                    <div className={`flex items-center space-x-1 ${getChangeColor(researchResults.monthlyChange)}`}>
                      {getChangeIcon(researchResults.monthlyChange)}
                      <span className="font-semibold">{researchResults.monthlyChange?.toFixed(2)}%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Yearly Change</span>
                    <div className={`flex items-center space-x-1 ${getChangeColor(researchResults.yearlyChange)}`}>
                      {getChangeIcon(researchResults.yearlyChange)}
                      <span className="font-semibold">{researchResults.yearlyChange?.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>

                {/* Technical Levels */}
                {researchResults.technicalLevels && (
                  <div className="space-y-2">
                    <h5 className="font-semibold text-sm">Technical Levels</h5>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-600">Support:</span>
                        <div className="space-y-1">
                          {researchResults.technicalLevels.support?.map((level: number, idx: number) => (
                            <div key={idx} className="text-red-600">Rs. {level}</div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Resistance:</span>
                        <div className="space-y-1">
                          {researchResults.technicalLevels.resistance?.map((level: number, idx: number) => (
                            <div key={idx} className="text-green-600">Rs. {level}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Market Sentiment & Fundamental Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Market Sentiment & Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Overall Sentiment</span>
                  <Badge className={
                    researchResults.sentiment === 'Positive' ? 'bg-green-100 text-green-800' :
                    researchResults.sentiment === 'Negative' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }>
                    {researchResults.sentiment}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold">Sentiment Score</span>
                    <span className="font-bold">{researchResults.sentimentScore}/100</span>
                  </div>
                  <Progress value={researchResults.sentimentScore} className="w-full" />
                </div>

                {/* Key Factors */}
                <div className="space-y-2">
                  <h5 className="font-semibold">Key Factors:</h5>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {researchResults.keyFactors?.map((factor: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SWOT Analysis */}
            {researchResults.fundamentalAnalysis && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>SWOT Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h6 className="font-semibold text-green-700 text-sm">Strengths</h6>
                      <ul className="text-xs space-y-1">
                        {researchResults.fundamentalAnalysis.strengths?.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start space-x-1">
                            <span className="text-green-500">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h6 className="font-semibold text-red-700 text-sm">Weaknesses</h6>
                      <ul className="text-xs space-y-1">
                        {researchResults.fundamentalAnalysis.weaknesses?.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start space-x-1">
                            <span className="text-red-500">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h6 className="font-semibold text-blue-700 text-sm">Opportunities</h6>
                      <ul className="text-xs space-y-1">
                        {researchResults.fundamentalAnalysis.opportunities?.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start space-x-1">
                            <span className="text-blue-500">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h6 className="font-semibold text-orange-700 text-sm">Threats</h6>
                      <ul className="text-xs space-y-1">
                        {researchResults.fundamentalAnalysis.threats?.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start space-x-1">
                            <span className="text-orange-500">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Recent News & Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Recent News & Market Updates</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {researchResults.recentNews?.map((news: any, index: number) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-3 bg-gray-50 rounded-r-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-semibold text-sm">{news.title}</h5>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{news.date}</span>
                        <Badge 
                          variant="outline"
                          className={
                            news.impact === 'Positive' ? 'border-green-500 text-green-700' :
                            news.impact === 'Negative' ? 'border-red-500 text-red-700' :
                            'border-gray-500 text-gray-700'
                          }
                        >
                          {news.impact}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{news.summary}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Source: {news.source}</span>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {!researchResults && !isResearching && (
        <Card className="text-center py-12">
          <CardContent>
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Advanced Market Research</h3>
            <p className="text-gray-500 mb-4">
              Get comprehensive analysis including fundamentals, technicals, SWOT analysis, and recent news
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-400">
              <span>Try: NABIL, NICA, HIDCL, banking, hydropower, insurance</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
