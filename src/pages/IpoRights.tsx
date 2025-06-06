
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, Building2, FileText, Clock, MapPin } from "lucide-react";

const IpoRights = () => {
  const [selectedTab, setSelectedTab] = useState("upcoming-ipos");

  const upcomingIpos = [
    {
      company: "Nepal Infrastructure Bank Limited",
      symbol: "NIBL",
      issueSize: "8,00,00,000",
      priceRange: "Rs. 100 - Rs. 120",
      openDate: "2024-01-15",
      closeDate: "2024-01-19",
      listingDate: "2024-02-01",
      status: "Upcoming",
      sector: "Banking"
    },
    {
      company: "Himalayan General Insurance",
      symbol: "HGI",
      issueSize: "5,00,00,000",
      priceRange: "Rs. 100 - Rs. 110",
      openDate: "2024-01-20",
      closeDate: "2024-01-24",
      listingDate: "2024-02-05",
      status: "Open",
      sector: "Insurance"
    },
    {
      company: "Nepal Telecom Infrastructure",
      symbol: "NTI",
      issueSize: "12,00,00,000",
      priceRange: "Rs. 100",
      openDate: "2024-02-01",
      closeDate: "2024-02-05",
      listingDate: "2024-02-15",
      status: "Upcoming",
      sector: "Telecom"
    }
  ];

  const rightsShares = [
    {
      company: "Nepal Investment Bank Limited",
      symbol: "NIBL",
      ratio: "1:1",
      price: "Rs. 100",
      openDate: "2024-01-10",
      closeDate: "2024-01-24",
      recordDate: "2024-01-05",
      status: "Open"
    },
    {
      company: "Nabil Bank Limited",
      symbol: "NABIL",
      ratio: "2:1",
      price: "Rs. 200",
      openDate: "2024-01-25",
      closeDate: "2024-02-08",
      recordDate: "2024-01-20",
      status: "Upcoming"
    },
    {
      company: "Standard Chartered Bank",
      symbol: "SCB",
      ratio: "1:2",
      price: "Rs. 500",
      openDate: "2024-02-01",
      closeDate: "2024-02-15",
      recordDate: "2024-01-27",
      status: "Upcoming"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-green-100 text-green-800";
      case "Upcoming":
        return "bg-blue-100 text-blue-800";
      case "Closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            IPOs & Rights Share
          </h1>
          <p className="text-gray-600 mt-2">Stay updated with upcoming IPOs and rights share offerings</p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming-ipos" className="flex items-center space-x-2">
              <Building2 className="w-4 h-4" />
              <span>Upcoming IPOs</span>
            </TabsTrigger>
            <TabsTrigger value="rights-share" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Rights Share</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming-ipos" className="space-y-6">
            <div className="grid gap-6">
              {upcomingIpos.map((ipo, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{ipo.company}</CardTitle>
                        <p className="text-gray-600">Symbol: {ipo.symbol} | Sector: {ipo.sector}</p>
                      </div>
                      <Badge className={getStatusColor(ipo.status)}>
                        {ipo.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Issue Size</p>
                        <p className="font-semibold">{ipo.issueSize}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Price Range</p>
                        <p className="font-semibold">{ipo.priceRange}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Open Date</p>
                        <p className="font-semibold flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {ipo.openDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Close Date</p>
                        <p className="font-semibold flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {ipo.closeDate}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-gray-600">Expected Listing Date</p>
                      <p className="font-semibold text-green-600">{ipo.listingDate}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rights-share" className="space-y-6">
            <div className="grid gap-6">
              {rightsShares.map((rights, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{rights.company}</CardTitle>
                        <p className="text-gray-600">Symbol: {rights.symbol}</p>
                      </div>
                      <Badge className={getStatusColor(rights.status)}>
                        {rights.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Rights Ratio</p>
                        <p className="font-semibold text-blue-600">{rights.ratio}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Price per Share</p>
                        <p className="font-semibold">{rights.price}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Open Date</p>
                        <p className="font-semibold flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {rights.openDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Close Date</p>
                        <p className="font-semibold flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {rights.closeDate}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-gray-600">Record Date</p>
                      <p className="font-semibold text-purple-600">{rights.recordDate}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IpoRights;
