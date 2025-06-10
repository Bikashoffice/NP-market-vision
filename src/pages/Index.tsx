
import { useState } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ChartUploadAnalysis } from "@/components/ChartUploadAnalysis";
import { MarketResearch } from "@/components/MarketResearch";
import { TopGainersLosers } from "@/components/TopGainersLosers";
import { AllStocksTable } from "@/components/AllStocksTable";
import { ModernDashboard } from "@/components/ModernDashboard";
import { TechnicalAnalysis } from "@/components/TechnicalAnalysis";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { TimeDisplay } from "@/components/TimeDisplay";

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'ne'>('en');
  const [activeTab, setActiveTab] = useState('dashboard');

  const texts = {
    en: {
      title: "NEPSE Predictor",
      subtitle: "AI Market Analysis"
    },
    ne: {
      title: "नेप्से प्रिडिक्टर",
      subtitle: "एआई बजार विश्लेषण"
    }
  };

  const t = texts[language];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <ModernDashboard />;
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
        return <ModernDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar 
            activeTab={activeTab} 
            onTabChange={handleTabChange}
            language={language}
          />
          <SidebarInset className="flex-1">
            {/* Modern Header */}
            <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/95 sticky top-0 z-50">
              <div className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-4">
                  <SidebarTrigger className="text-gray-400 hover:text-white" />
                  <div>
                    <h1 className="text-xl font-semibold text-white">{t.title}</h1>
                    <p className="text-sm text-gray-400">{t.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <TimeDisplay />
                  <LanguageSwitch currentLanguage={language} onLanguageChange={setLanguage} />
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span>Live</span>
                  </div>
                </div>
              </div>
            </header>

            {/* Content Area */}
            <main className="flex-1 p-6 bg-gray-900">
              <div className="mx-auto max-w-7xl">
                {renderTabContent()}
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
