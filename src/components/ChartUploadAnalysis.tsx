
import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, Image, TrendingUp, TrendingDown, AlertTriangle, Target, Shield, Lightbulb } from "lucide-react";
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
      // Simulate progress with more realistic steps
      const progressSteps = [
        { step: 15, message: "Processing image..." },
        { step: 35, message: "Identifying chart patterns..." },
        { step: 55, message: "Analyzing technical indicators..." },
        { step: 75, message: "Calculating support/resistance..." },
        { step: 90, message: "Generating recommendations..." }
      ];

      let currentStep = 0;
      const progressInterval = setInterval(() => {
        if (currentStep < progressSteps.length) {
          setProgress(progressSteps[currentStep].step);
          currentStep++;
        } else {
          clearInterval(progressInterval);
        }
      }, 600);

      const result = await ChartAnalysisService.analyzeChart(selectedImage);
      
      clearInterval(progressInterval);
      setProgress(100);
      setAnalysis(result);

      toast({
        title: "Analysis Complete",
        description: "Professional chart analysis completed successfully",
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
    if (prediction.toLowerCase().includes('bullish') || prediction.toLowerCase().includes('breakout')) {
      return <TrendingUp className="w-6 h-6 text-green-500" />;
    } else if (prediction.toLowerCase().includes('bearish') || prediction.toLowerCase().includes('head')) {
      return <TrendingDown className="w-6 h-6 text-red-500" />;
    }
    return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Professional Chart Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="chart-upload">Upload Chart Image for AI Analysis</Label>
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
                {isAnalyzing ? "Analyzing Chart..." : "Start Professional Analysis"}
              </Button>

              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>AI is analyzing patterns and indicators...</span>
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
              <p className="text-gray-500 font-medium">Upload a stock chart for comprehensive AI analysis</p>
              <p className="text-sm text-gray-400 mt-2">
                Get technical indicators, pattern recognition, support/resistance levels, and trading recommendations
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Main Prediction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getPredictionIcon(analysis.prediction)}
                <span>Chart Analysis Result</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  {getPredictionIcon(analysis.prediction)}
                  <h3 className="font-bold text-xl">{analysis.prediction}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">Rs. {analysis.targetPrice}</div>
                    <div className="text-sm text-gray-600">Target Price</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{analysis.confidence}%</div>
                    <div className="text-sm text-gray-600">Confidence</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{analysis.timeframe}</div>
                    <div className="text-sm text-gray-600">Time Frame</div>
                  </div>
                  <div className="text-center">
                    <Progress value={analysis.confidence} className="w-full mt-2" />
                    <div className="text-sm text-gray-600 mt-1">Reliability</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Indicators Grid */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Technical Indicators Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analysis.technicalIndicators?.map((indicator: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-sm">{indicator.name}</span>
                      <Badge 
                        variant="outline"
                        className={
                          indicator.signal === 'BUY' ? 'border-green-500 text-green-700 bg-green-50' :
                          indicator.signal === 'SELL' ? 'border-red-500 text-red-700 bg-red-50' :
                          'border-yellow-500 text-yellow-700 bg-yellow-50'
                        }
                      >
                        {indicator.signal}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">{indicator.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Support/Resistance and Key Levels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Key Price Levels</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h5 className="font-semibold text-green-800 mb-2">Support Level</h5>
                      <p className="text-green-700 text-2xl font-bold">Rs. {analysis.supportLevel}</p>
                      <p className="text-xs text-green-600 mt-1">Strong buying interest expected</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <h5 className="font-semibold text-red-800 mb-2">Resistance Level</h5>
                      <p className="text-red-700 text-2xl font-bold">Rs. {analysis.resistanceLevel}</p>
                      <p className="text-xs text-red-600 mt-1">Potential selling pressure</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5" />
                  <span>Trading Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis.recommendations?.map((rec: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{rec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Analysis */}
          {analysis.riskFactors && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Risk Assessment</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h5 className="font-semibold text-yellow-800 mb-3">Key Risk Factors to Monitor:</h5>
                  <div className="space-y-2">
                    {analysis.riskFactors.map((risk: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-yellow-700">{risk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {!analysis && !isAnalyzing && (
        <Card className="text-center py-12">
          <CardContent>
            <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Professional Chart Analysis</h3>
            <p className="text-gray-500 mb-4">
              Upload a chart to get comprehensive technical analysis with AI-powered insights
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400 max-w-md mx-auto">
              <div>✓ Pattern Recognition</div>
              <div>✓ Technical Indicators</div>
              <div>✓ Support/Resistance</div>
              <div>✓ Trading Signals</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
