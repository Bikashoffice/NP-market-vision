
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Search, Globe, TrendingUp, Calendar, ExternalLink } from "lucide-react";
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
          return prev + 15;
        });
      }, 800);

      const results = await ResearchService.conductResearch(query);
      
      clearInterval(progressInterval);
      setProgress(100);
      setResearchResults(results);

      toast({
        title: "Research Complete",
        description: "Market research has been completed successfully",
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

  return (
    <div className="space-y-6">
      {/* Research Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Market Research</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter stock symbol or company name (e.g., NABIL, Nepal Bank)"
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
              {isResearching ? "Researching..." : "Research"}
            </Button>
          </div>

          {isResearching && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Gathering market intelligence...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Research Results */}
      {researchResults && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Company Overview */}
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
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Market Cap</p>
                    <p className="font-bold">Rs. {researchResults.marketCap}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">P/E Ratio</p>
                    <p className="font-bold">{researchResults.peRatio}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{researchResults.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Market Sentiment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Market Sentiment</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Overall Sentiment</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    researchResults.sentiment === 'Positive' ? 'bg-green-100 text-green-800' :
                    researchResults.sentiment === 'Negative' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {researchResults.sentiment}
                  </span>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-semibold">Sentiment Score</span>
                  <Progress value={researchResults.sentimentScore} className="w-full" />
                </div>
                <div className="space-y-2">
                  <h5 className="font-semibold">Key Factors:</h5>
                  <ul className="text-sm space-y-1">
                    {researchResults.keyFactors?.map((factor: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent News */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Recent News & Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {researchResults.recentNews?.map((news: any, index: number) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-semibold text-sm">{news.title}</h5>
                      <span className="text-xs text-gray-500">{news.date}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{news.summary}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        news.impact === 'Positive' ? 'bg-green-100 text-green-800' :
                        news.impact === 'Negative' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {news.impact} Impact
                      </span>
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
            <p className="text-gray-500">Enter a stock symbol or company name to start researching</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
