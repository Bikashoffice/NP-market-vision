
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartUploadAnalysis } from "@/components/ChartUploadAnalysis";
import { MarketResearch } from "@/components/MarketResearch";
import { TopGainersLosers } from "@/components/TopGainersLosers";
import { AllStocksTable } from "@/components/AllStocksTable";
import { PredictionDashboard } from "@/components/PredictionDashboard";
import { TrendingUp, TrendingDown, BarChart3, Search, Upload, Database } from "lucide-react";

const Index = () => {
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
                  Nepal Stock Predictor
                </h1>
                <p className="text-sm text-gray-600">AI-Powered Market Analysis & Predictions</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Market Data</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="chart-analysis" className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Chart Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="research" className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <span>Market Research</span>
            </TabsTrigger>
            <TabsTrigger value="top-movers" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Top Movers</span>
            </TabsTrigger>
            <TabsTrigger value="all-stocks" className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>All Stocks</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <PredictionDashboard />
          </TabsContent>

          <TabsContent value="chart-analysis" className="space-y-6">
            <ChartUploadAnalysis />
          </TabsContent>

          <TabsContent value="research" className="space-y-6">
            <MarketResearch />
          </TabsContent>

          <TabsContent value="top-movers" className="space-y-6">
            <TopGainersLosers />
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
