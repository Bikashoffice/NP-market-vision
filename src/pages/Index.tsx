
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
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
  const [activeTab, setActiveTab] = useState('dashboard');

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

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <PredictionDashboard />;
      case 'technical-analysis':
        return <TechnicalAnalysis />;
      case 'chart-analysis':
        return <ChartUploadAnalysis />;
      case 'research':
        return <MarketResearch language={language} />;
      case 'top-movers':
        return <TopGainersLosers language={language} />;
      case 'all-stocks':
        return <AllStocksTable />;
      default:
        return <PredictionDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar 
            activeTab={activeTab} 
            onTabChange={handleTabChange}
            language={language}
          />
          <SidebarInset>
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
              <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <SidebarTrigger />
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

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
              {renderTabContent()}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
