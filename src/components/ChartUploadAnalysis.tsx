
import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Upload, Image, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ChartAnalysisService } from "@/services/ChartAnalysisService";

export const ChartUploadAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setAnalysis(null);
    }
  };

  const analyzeChart = async () => {
    if (!selectedImage) {
      toast({
        title: "No Image Selected",
        description: "Please upload a chart image first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      const result = await ChartAnalysisService.analyzeChart(selectedImage);
      
      clearInterval(progressInterval);
      setProgress(100);
      setAnalysis(result);

      toast({
        title: "Analysis Complete",
        description: "Chart has been successfully analyzed",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze the chart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
      setTimeout(() => setProgress(0), 2000);
    }
  };

  const getPredictionIcon = (prediction: string) => {
    if (prediction.toLowerCase().includes('bullish') || prediction.toLowerCase().includes('up')) {
      return <TrendingUp className="w-5 h-5 text-green-500" />;
    } else if (prediction.toLowerCase().includes('bearish') || prediction.toLowerCase().includes('down')) {
      return <TrendingDown className="w-5 h-5 text-red-500" />;
    }
    return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Upload Section */}
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Upload Chart Image</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="chart-upload">Select Chart Image</Label>
            <Input
              id="chart-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="cursor-pointer"
            />
          </div>

          {imagePreview && (
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                <img
                  src={imagePreview}
                  alt="Chart preview"
                  className="w-full h-64 object-contain bg-gray-50"
                />
              </div>
              
              <Button 
                onClick={analyzeChart} 
                disabled={isAnalyzing}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isAnalyzing ? "Analyzing Chart..." : "Analyze Chart"}
              </Button>

              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Analyzing patterns...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              )}
            </div>
          )}

          {!imagePreview && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Upload a stock chart image to get AI-powered analysis</p>
              <p className="text-sm text-gray-400 mt-2">Supports JPG, PNG, and other image formats</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Analysis Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {analysis ? (
            <div className="space-y-6">
              {/* Prediction Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  {getPredictionIcon(analysis.prediction)}
                  <span className="font-semibold text-lg">
                    {analysis.prediction}
                  </span>
                </div>
                <p className="text-gray-700">{analysis.summary}</p>
              </div>

              {/* Technical Indicators */}
              <div className="space-y-3">
                <h4 className="font-semibold">Technical Indicators</h4>
                {analysis.technicalIndicators?.map((indicator: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{indicator.name}</span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      indicator.signal === 'BUY' ? 'bg-green-100 text-green-800' :
                      indicator.signal === 'SELL' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {indicator.signal}
                    </span>
                  </div>
                ))}
              </div>

              {/* Support and Resistance */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <h5 className="font-semibold text-green-800">Support Level</h5>
                  <p className="text-green-700 text-lg font-bold">Rs. {analysis.supportLevel}</p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <h5 className="font-semibold text-red-800">Resistance Level</h5>
                  <p className="text-red-700 text-lg font-bold">Rs. {analysis.resistanceLevel}</p>
                </div>
              </div>

              {/* Confidence Score */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Confidence Score</span>
                  <span className="font-bold">{analysis.confidence}%</span>
                </div>
                <Progress value={analysis.confidence} className="w-full" />
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Upload and analyze a chart to see predictions</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
