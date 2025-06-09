
import { useState, useEffect } from 'react';
import { ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer } from "@/components/ui/chart";

interface CandleData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface CandlestickChartProps {
  data: CandleData[];
  height?: number;
}

export const CandlestickChart = ({ data, height = 400 }: CandlestickChartProps) => {
  const chartConfig = {
    price: {
      label: "Price",
      color: "hsl(var(--chart-1))",
    },
  };

  const CustomCandlestick = ({ payload, x, width }: any) => {
    if (!payload || !payload.payload) return null;
    
    const candleData = payload.payload;
    const { open, high, low, close } = candleData;
    const isPositive = close >= open;
    const bodyHeight = Math.abs(close - open);
    const bodyY = Math.min(open, close);
    const candleWidth = Math.max(width * 0.6, 3);
    const candleX = x + (width - candleWidth) / 2;
    
    return (
      <g>
        {/* High-Low line (wick) */}
        <line
          x1={x + width / 2}
          y1={high}
          x2={x + width / 2}
          y2={low}
          stroke={isPositive ? "#22c55e" : "#ef4444"}
          strokeWidth={1}
        />
        {/* Body */}
        <rect
          x={candleX}
          y={bodyY}
          width={candleWidth}
          height={bodyHeight || 1}
          fill={isPositive ? "#22c55e" : "#ef4444"}
          stroke={isPositive ? "#22c55e" : "#ef4444"}
          strokeWidth={1}
        />
      </g>
    );
  };

  return (
    <ChartContainer config={chartConfig} className={`w-full h-[${height}px]`}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            domain={['dataMin - 10', 'dataMax + 10']}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const candleData = payload[0].payload;
                return (
                  <div className="bg-white p-3 border rounded shadow-lg">
                    <p className="font-semibold">{`Date: ${label}`}</p>
                    <p className="text-blue-600">{`Open: ${candleData.open.toFixed(2)}`}</p>
                    <p className="text-green-600">{`High: ${candleData.high.toFixed(2)}`}</p>
                    <p className="text-red-600">{`Low: ${candleData.low.toFixed(2)}`}</p>
                    <p className="text-purple-600">{`Close: ${candleData.close.toFixed(2)}`}</p>
                    <p className="text-gray-600">{`Volume: ${candleData.volume?.toLocaleString()}`}</p>
                  </div>
                );
              }
              return null;
            }}
          />

          {/* Render candlesticks */}
          {data.map((entry, index) => (
            <CustomCandlestick
              key={index}
              payload={{ payload: entry }}
              x={index * (100 / data.length)}
              width={100 / data.length}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
