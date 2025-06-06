
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartUploadAnalysis } from "@/components/ChartUploadAnalysis";
import { MarketResearch } from "@/components/MarketResearch";
import { TopGainersLosers } from "@/components/TopGainersLosers";
import { AllStocksTable } from "@/components/AllStocksTable";
import { PredictionDashboard } from "@/components/PredictionDashboard";
import { TechnicalAnalysis } from "@/components/TechnicalAnalysis";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { TimeDisplay } from "@/components/TimeDisplay";
import { TrendingUp, TrendingDown, BarChart3, Search, Upload, Database, ChartCandlestick } from "lucide-react";

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'ne'>('en');

  const texts = {
    en: {
      title: "Nepal Stock Predictor",
      subtitle: "AI-Powered Market Analysis & Predictions",
      liveData: "Live Market Data",
      dashboard: "Dashboard",
      chartAnalysis: "Chart Analysis",
      technicalAnalysis: "Technical Analysis",
      research: "Market Research",
      topMovers: "Top Movers",
      allStocks: "All Stocks"
    },
    ne: {
      title: "नेपाल स्टक प्रिडिक्टर",
      subtitle: "एआई-संचालित बजार विश्लेषण र भविष्यवाणी",
      liveData: "लाइभ बजार डाटा",
      dashboard: "ड्यासबोर्ड",
      chartAnalysis: "चार्ट विश्लेषण",
      technicalAnalysis: "प्राविधिक विश्लेषण",
      research: "बजार अनुसन्धान",
      topMovers: "शीर्ष चलनेवाला",
      allStocks: "सबै स्टकहरू"
    }
  };

  const t = texts[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t.title}
                </h1>
                <p className="text-sm text-gray-600">{t.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <TimeDisplay />
              <LanguageSwitch currentLanguage={language} onLanguageChange={setLanguage} />
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span>{t.liveData}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>{t.dashboard}</span>
            </TabsTrigger>
            <TabsTrigger value="technical-analysis" className="flex items-center space-x-2">
              <ChartCandlestick className="w-4 h-4" />
              <span>{t.technicalAnalysis}</span>
            </TabsTrigger>
            <TabsTrigger value="chart-analysis" className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>{t.chartAnalysis}</span>
            </TabsTrigger>
            <TabsTrigger value="research" className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <span>{t.research}</span>
            </TabsTrigger>
            <TabsTrigger value="top-movers" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>{t.topMovers}</span>
            </TabsTrigger>
            <TabsTrigger value="all-stocks" className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>{t.allStocks}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <PredictionDashboard />
          </TabsContent>

          <TabsContent value="technical-analysis" className="space-y-6">
            <TechnicalAnalysis />
          </TabsContent>

          <TabsContent value="chart-analysis" className="space-y-6">
            <ChartUploadAnalysis />
          </TabsContent>

          <TabsContent value="research" className="space-y-6">
            <MarketResearch language={language} />
          </TabsContent>

          <TabsContent value="top-movers" className="space-y-6">
            <TopGainersLosers language={language} />
          </TabsContent>

          <TabsContent value="all-stocks" className="space-y-6">
            <AllStocksTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
