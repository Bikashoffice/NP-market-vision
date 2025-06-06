
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Search, Globe, TrendingUp, TrendingDown, Calendar, ExternalLink, BarChart3, Target, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ResearchService } from "@/services/ResearchService";
import { ExpandedStockDataService } from "@/services/ExpandedStockData";

interface MarketResearchProps {
  language: 'en' | 'ne';
}

export const MarketResearch = ({ language = 'en' }: MarketResearchProps) => {
  const [query, setQuery] = useState('');
  const [isResearching, setIsResearching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [researchResults, setResearchResults] = useState<any>(null);
  const [upcomingIPOs] = useState(ExpandedStockDataService.getUpcomingIPOs());
  const [rightShares] = useState(ExpandedStockDataService.getRightShares());
  const { toast } = useToast();

  const texts = {
    en: {
      title: "Advanced Market Research",
      searchPlaceholder: "Enter stock symbol, company name, or sector (e.g., NABIL, banking, hydropower)",
      research: "Research",
      analyzing: "Analyzing...",
      gatheringData: "Gathering comprehensive market data and analysis...",
      researchComplete: "Research Complete",
      researchSuccess: "Comprehensive market research has been completed successfully",
      researchFailed: "Research Failed",
      researchError: "Failed to conduct market research. Please try again.",
      enterQuery: "Enter Search Query",
      enterQueryDesc: "Please enter a stock symbol or company name to research",
      companyOverview: "Company Overview",
      pricePerformance: "Price Performance",
      currentPrice: "Current Price",
      weeklyChange: "Weekly Change",
      monthlyChange: "Monthly Change",
      yearlyChange: "Yearly Change",
      technicalLevels: "Technical Levels",
      support: "Support:",
      resistance: "Resistance:",
      marketSentiment: "Market Sentiment & Analysis",
      overallSentiment: "Overall Sentiment",
      sentimentScore: "Sentiment Score",
      keyFactors: "Key Factors:",
      swotAnalysis: "SWOT Analysis",
      strengths: "Strengths",
      weaknesses: "Weaknesses",
      opportunities: "Opportunities",
      threats: "Threats",
      recentNews: "Recent News & Market Updates",
      source: "Source:",
      upcomingIPOs: "Upcoming IPOs",
      rightShares: "Right Shares",
      company: "Company",
      issueManager: "Issue Manager",
      openDate: "Open Date",
      closeDate: "Close Date",
      units: "Units",
      price: "Price",
      status: "Status",
      ratio: "Ratio",
      bookCloseDate: "Book Close Date",
      searchTitle: "Advanced Market Research",
      searchDesc: "Get comprehensive analysis including fundamentals, technicals, SWOT analysis, and recent news",
      searchSuggestion: "Try: NABIL, NICA, HIDCL, banking, hydropower, insurance"
    },
    ne: {
      title: "उन्नत बजार अनुसन्धान",
      searchPlaceholder: "स्टक सिम्बल, कम्पनीको नाम, वा क्षेत्र प्रविष्ट गर्नुहोस् (जस्तै, NABIL, banking, hydropower)",
      research: "अनुसन्धान",
      analyzing: "विश्लेषण गर्दै...",
      gatheringData: "व्यापक बजार डेटा र विश्लेषण सङ्कलन गर्दै...",
      researchComplete: "अनुसन्धान पूरा",
      researchSuccess: "व्यापक बजार अनुसन्धान सफलतापूर्वक पूरा भएको छ",
      researchFailed: "अनुसन्धान असफल",
      researchError: "बजार अनुसन्धान गर्न असफल। कृपया फेरि प्रयास गर्नुहोस्।",
      enterQuery: "खोज प्रश्न प्रविष्ट गर्नुहोस्",
      enterQueryDesc: "कृपया अनुसन्धानको लागि स्टक सिम्बल वा कम्पनीको नाम प्रविष्ट गर्नुहोस्",
      companyOverview: "कम्पनी सिंहावलोकन",
      pricePerformance: "मूल्य प्रदर्शन",
      currentPrice: "वर्तमान मूल्य",
      weeklyChange: "साप्ताहिक परिवर्तन",
      monthlyChange: "मासिक परिवर्तन",
      yearlyChange: "वार्षिक परिवर्तन",
      technicalLevels: "प्राविधिक स्तरहरू",
      support: "समर्थन:",
      resistance: "प्रतिरोध:",
      marketSentiment: "बजार भावना र विश्लेषण",
      overallSentiment: "समग्र भावना",
      sentimentScore: "भावना स्कोर",
      keyFactors: "मुख्य कारकहरू:",
      swotAnalysis: "SWOT विश्लेषण",
      strengths: "शक्तिहरू",
      weaknesses: "कमजोरीहरू",
      opportunities: "अवसरहरू",
      threats: "खतराहरू",
      recentNews: "हालका समाचार र बजार अपडेटहरू",
      source: "स्रोत:",
      upcomingIPOs: "आगामी आईपीओहरू",
      rightShares: "अधिकार शेयरहरू",
      company: "कम्पनी",
      issueManager: "इश्यू प्रबन्धक",
      openDate: "खुला मिति",
      closeDate: "बन्द मिति",
      units: "एकाइहरू",
      price: "मूल्य",
      status: "स्थिति",
      ratio: "अनुपात",
      bookCloseDate: "पुस्तक बन्द मिति",
      searchTitle: "उन्नत बजार अनुसन्धान",
      searchDesc: "आधारभूत, प्राविधिक, SWOT विश्लेषण, र हालका समाचारहरू सहित व्यापक विश्लेषण प्राप्त गर्नुहोस्",
      searchSuggestion: "प्रयास गर्नुहोस्: NABIL, NICA, HIDCL, banking, hydropower, insurance"
    }
  };

  const t = texts[language];

  const handleResearch = async () => {
    if (!query.trim()) {
      toast({
        title: t.enterQuery,
        description: t.enterQueryDesc,
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
        title: t.researchComplete,
        description: t.researchSuccess,
      });
    } catch (error) {
      toast({
        title: t.researchFailed,
        description: t.researchError,
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
            <span>{t.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder={t.searchPlaceholder}
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
              {isResearching ? t.analyzing : t.research}
            </Button>
          </div>

          {isResearching && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{t.gatheringData}</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* IPOs and Right Shares */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming IPOs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>{t.upcomingIPOs}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingIPOs.map((ipo, index) => (
                <div key={index} className="border rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-sm">{ipo.company}</h4>
                    <Badge className={
                      ipo.status === 'open' ? 'bg-green-100 text-green-800' :
                      ipo.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }>
                      {ipo.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div><span className="text-gray-600">{t.issueManager}:</span> {ipo.issueManager}</div>
                    <div><span className="text-gray-600">{t.price}:</span> Rs. {ipo.price}</div>
                    <div><span className="text-gray-600">{t.openDate}:</span> {ipo.openDate}</div>
                    <div><span className="text-gray-600">{t.units}:</span> {ipo.units}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Shares */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>{t.rightShares}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rightShares.map((rights, index) => (
                <div key={index} className="border rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-sm">{rights.company}</h4>
                    <Badge className={
                      rights.status === 'open' ? 'bg-green-100 text-green-800' :
                      rights.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }>
                      {rights.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div><span className="text-gray-600">{t.ratio}:</span> {rights.ratio}</div>
                    <div><span className="text-gray-600">{t.price}:</span> Rs. {rights.price}</div>
                    <div><span className="text-gray-600">{t.bookCloseDate}:</span> {rights.bookCloseDate}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Research Results */}
      {researchResults && (
        <div className="space-y-6">
          {/* Company Overview & Price Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>{t.companyOverview}</span>
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
                  <span>{t.pricePerformance}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">Rs. {researchResults.currentPrice?.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">{t.currentPrice}</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t.weeklyChange}</span>
                    <div className={`flex items-center space-x-1 ${getChangeColor(researchResults.weeklyChange)}`}>
                      {getChangeIcon(researchResults.weeklyChange)}
                      <span className="font-semibold">{researchResults.weeklyChange?.toFixed(2)}%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t.monthlyChange}</span>
                    <div className={`flex items-center space-x-1 ${getChangeColor(researchResults.monthlyChange)}`}>
                      {getChangeIcon(researchResults.monthlyChange)}
                      <span className="font-semibold">{researchResults.monthlyChange?.toFixed(2)}%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t.yearlyChange}</span>
                    <div className={`flex items-center space-x-1 ${getChangeColor(researchResults.yearlyChange)}`}>
                      {getChangeIcon(researchResults.yearlyChange)}
                      <span className="font-semibold">{researchResults.yearlyChange?.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>

                {/* Technical Levels */}
                {researchResults.technicalLevels && (
                  <div className="space-y-2">
                    <h5 className="font-semibold text-sm">{t.technicalLevels}</h5>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-600">{t.support}</span>
                        <div className="space-y-1">
                          {researchResults.technicalLevels.support?.map((level: number, idx: number) => (
                            <div key={idx} className="text-red-600">Rs. {level}</div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">{t.resistance}</span>
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
                  <span>{t.marketSentiment}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>{t.overallSentiment}</span>
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
                    <span className="text-sm font-semibold">{t.sentimentScore}</span>
                    <span className="font-bold">{researchResults.sentimentScore}/100</span>
                  </div>
                  <Progress value={researchResults.sentimentScore} className="w-full" />
                </div>

                {/* Key Factors */}
                <div className="space-y-2">
                  <h5 className="font-semibold">{t.keyFactors}</h5>
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
                    <span>{t.swotAnalysis}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h6 className="font-semibold text-green-700 text-sm">{t.strengths}</h6>
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
                      <h6 className="font-semibold text-red-700 text-sm">{t.weaknesses}</h6>
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
                      <h6 className="font-semibold text-blue-700 text-sm">{t.opportunities}</h6>
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
                      <h6 className="font-semibold text-orange-700 text-sm">{t.threats}</h6>
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
                <span>{t.recentNews}</span>
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
                      <span className="text-xs text-gray-500">{t.source} {news.source}</span>
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
            <h3 className="text-lg font-semibold mb-2">{t.searchTitle}</h3>
            <p className="text-gray-500 mb-4">
              {t.searchDesc}
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-400">
              <span>{t.searchSuggestion}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
