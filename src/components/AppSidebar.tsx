
import { Calendar, Home, TrendingUp, Database, Upload, Search, ChartCandlestick } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  language: 'en' | 'ne';
}

export function AppSidebar({ activeTab, onTabChange, language }: AppSidebarProps) {
  const texts = {
    en: {
      navigation: "Navigation",
      dashboard: "Dashboard",
      technicalAnalysis: "Technical Analysis",
      chartAnalysis: "Chart Analysis", 
      research: "Market Research",
      topMovers: "Top Movers",
      allStocks: "All Stocks"
    },
    ne: {
      navigation: "नेभिगेसन",
      dashboard: "ड्यासबोर्ड",
      technicalAnalysis: "प्राविधिक विश्लेषण",
      chartAnalysis: "चार्ट विश्लेषण",
      research: "बजार अनुसन्धान", 
      topMovers: "शीर्ष चलनेवाला",
      allStocks: "सबै स्टकहरू"
    }
  };

  const t = texts[language];

  const menuItems = [
    { id: "dashboard", title: t.dashboard, icon: Home },
    { id: "technical-analysis", title: t.technicalAnalysis, icon: ChartCandlestick },
    { id: "chart-analysis", title: t.chartAnalysis, icon: Upload },
    { id: "research", title: t.research, icon: Search },
    { id: "top-movers", title: t.topMovers, icon: TrendingUp },
    { id: "all-stocks", title: t.allStocks, icon: Database },
  ];

  return (
    <Sidebar className="bg-gray-900 border-gray-800">
      <SidebarContent className="bg-gray-900">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 font-medium">{t.navigation}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    isActive={activeTab === item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`
                      hover:bg-gray-800 text-gray-300 hover:text-white transition-colors
                      ${activeTab === item.id 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : ''
                      }
                    `}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
