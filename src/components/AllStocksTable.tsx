
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw, Search, TrendingUp, TrendingDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { NepseApiService } from "@/services/NepseApiService";

export const AllStocksTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [allStocks, setAllStocks] = useState<any[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchMarketData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = allStocks.filter(stock => 
        stock.symbol?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (stock.symbol + ' Limited')?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStocks(filtered);
    } else {
      setFilteredStocks(allStocks);
    }
  }, [searchTerm, allStocks]);

  const fetchMarketData = async () => {
    setIsLoading(true);
    try {
      const nepseApi = NepseApiService.getInstance();
      const stocks = await nepseApi.getAllStocks();
      console.log('Fetched stocks data:', stocks);
      setAllStocks(stocks || []);
      setFilteredStocks(stocks || []);
      setLastUpdated(new Date());
      toast({
        title: "Data Updated",
        description: "All market data has been refreshed successfully",
      });
    } catch (error) {
      console.error('Error fetching market data:', error);
      toast({
        title: "Update Failed",
        description: "Failed to fetch market data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number | undefined | null) => {
    if (price === undefined || price === null || isNaN(price)) {
      return 'N/A';
    }
    return `Rs. ${price.toLocaleString()}`;
  };

  const formatChange = (change: number | undefined | null) => {
    if (change === undefined || change === null || isNaN(change)) {
      return 'N/A';
    }
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  const getChangeColor = (change: number | undefined | null) => {
    if (change === undefined || change === null || isNaN(change)) {
      return 'text-gray-600';
    }
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getChangeIcon = (change: number | undefined | null) => {
    if (change === undefined || change === null || isNaN(change)) {
      return null;
    }
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">All Market Data</h2>
          <p className="text-gray-600">
            {lastUpdated && `Last updated: ${lastUpdated.toLocaleTimeString()}`}
          </p>
        </div>
        <Button 
          onClick={fetchMarketData} 
          disabled={isLoading}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Search Stocks</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search by symbol or company name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Stocks Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            All Stocks ({filteredStocks.length} companies)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Company Name</TableHead>
                  <TableHead className="text-right">LTP</TableHead>
                  <TableHead className="text-right">Change %</TableHead>
                  <TableHead className="text-right">Open</TableHead>
                  <TableHead className="text-right">High</TableHead>
                  <TableHead className="text-right">Low</TableHead>
                  <TableHead className="text-right">Volume</TableHead>
                  <TableHead className="text-right">Prev Close</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStocks.map((stock, index) => (
                  <TableRow key={stock.symbol || index} className="hover:bg-gray-50">
                    <TableCell className="font-semibold">{stock.symbol || 'N/A'}</TableCell>
                    <TableCell className="max-w-xs truncate" title={`${stock.symbol} Limited`}>
                      {stock.symbol} Limited
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatPrice(stock.ltp)}
                    </TableCell>
                    <TableCell className={`text-right font-semibold ${getChangeColor(stock.percentageChange)}`}>
                      <div className="flex items-center justify-end space-x-1">
                        {getChangeIcon(stock.percentageChange)}
                        <span>{formatChange(stock.percentageChange)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{formatPrice(stock.open)}</TableCell>
                    <TableCell className="text-right">{formatPrice(stock.high)}</TableCell>
                    <TableCell className="text-right">{formatPrice(stock.low)}</TableCell>
                    <TableCell className="text-right">{stock.volume?.toLocaleString() || 'N/A'}</TableCell>
                    <TableCell className="text-right">{formatPrice(stock.previousClose)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredStocks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'No stocks found matching your search.' : 'No data available.'}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
