
import { useState, useEffect } from 'react';
import { Clock } from "lucide-react";

export const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Kathmandu',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      timeZone: 'Asia/Kathmandu',
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="flex items-center space-x-2 text-sm">
      <Clock className="w-4 h-4" />
      <div className="flex flex-col">
        <span className="font-semibold">{formatTime(currentTime)}</span>
        <span className="text-xs text-gray-600">{formatDate(currentTime)} (NPT)</span>
      </div>
    </div>
  );
};
