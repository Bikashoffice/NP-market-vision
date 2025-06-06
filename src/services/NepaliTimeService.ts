
import { format, addDays, startOfWeek } from 'date-fns';

export interface NepaliDate {
  year: number;
  month: number;
  day: number;
  weekday: string;
  isHoliday: boolean;
  holidayName?: string;
}

export class NepaliTimeService {
  private static readonly NEPALI_MONTHS = [
    'बैशाख', 'जेठ', 'आषाढ', 'श्रावण', 'भाद्र', 'आश्विन',
    'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फाल्गुन', 'चैत्र'
  ];

  private static readonly NEPALI_WEEKDAYS = [
    'आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहिबार', 'शुक्रबार', 'शनिबार'
  ];

  // Major Nepali holidays (approximate dates)
  private static readonly NEPALI_HOLIDAYS = [
    { month: 1, day: 1, name: 'नयाँ वर्ष' }, // Nepali New Year
    { month: 3, day: 3, name: 'तीज' }, // Teej
    { month: 7, day: 1, name: 'दशैं' }, // Dashain
    { month: 8, day: 1, name: 'तिहार' }, // Tihar
    { month: 10, day: 29, name: 'शिवरात्री' }, // Shivaratri
  ];

  static getCurrentNepaliTime(): Date {
    const now = new Date();
    return new Date(now.getTime() + (5 * 60 + 45) * 60000); // UTC+5:45
  }

  static formatNepaliTime(date: Date = this.getCurrentNepaliTime()): string {
    return format(date, 'yyyy-MM-dd HH:mm:ss');
  }

  static getMarketStatus(): {
    isOpen: boolean;
    status: string;
    nextAction: string;
    nextActionTime: string;
    currentTime: string;
  } {
    const nepaliTime = this.getCurrentNepaliTime();
    const dayOfWeek = nepaliTime.getDay();
    const hour = nepaliTime.getHours();
    const minute = nepaliTime.getMinutes();
    const currentTime = hour * 60 + minute;
    
    const marketOpen = 11 * 60; // 11:00 AM
    const marketClose = 15 * 60; // 3:00 PM
    
    // Trading days: Sunday (0) to Thursday (4)
    const isTradingDay = dayOfWeek >= 0 && dayOfWeek <= 4;
    const isMarketHours = currentTime >= marketOpen && currentTime < marketClose;
    
    let status = '';
    let nextAction = '';
    let nextActionTime = '';
    
    if (!isTradingDay) {
      status = 'बजार बन्द छ (सप्ताहांत)'; // Market Closed (Weekend)
      nextAction = 'बजार खुल्ने समय'; // Market Opening Time
      nextActionTime = this.getNextTradingDay() + ' ११:०० बजे'; // 11:00 AM
    } else if (currentTime < marketOpen) {
      status = 'बजार खुल्न बाँकी छ'; // Market Opening Soon
      nextAction = 'बजार खुल्ने समय'; // Market Opening Time
      nextActionTime = '११:०० बजे'; // 11:00 AM
    } else if (isMarketHours) {
      status = 'बजार चालु छ'; // Market is Open
      nextAction = 'बजार बन्द हुने समय'; // Market Closing Time
      nextActionTime = '३:०० बजे'; // 3:00 PM
    } else {
      status = 'बजार बन्द छ'; // Market Closed
      nextAction = 'बजार खुल्ने समय'; // Market Opening Time
      nextActionTime = this.getNextTradingDay() + ' ११:०० बजे'; // Next day 11:00 AM
    }
    
    return {
      isOpen: isTradingDay && isMarketHours,
      status,
      nextAction,
      nextActionTime,
      currentTime: format(nepaliTime, 'HH:mm:ss')
    };
  }

  private static getNextTradingDay(): string {
    const nepaliTime = this.getCurrentNepaliTime();
    let nextDay = addDays(nepaliTime, 1);
    
    // Find next trading day (Sunday to Thursday)
    while (nextDay.getDay() > 4) {
      nextDay = addDays(nextDay, 1);
    }
    
    const dayNames = ['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहिबार'];
    return dayNames[nextDay.getDay()];
  }

  static getTradingHours(): {
    openTime: string;
    closeTime: string;
    tradingDays: string;
    timeZone: string;
  } {
    return {
      openTime: '११:०० बजे', // 11:00 AM
      closeTime: '३:०० बजे', // 3:00 PM
      tradingDays: 'आइतबार देखि बिहिबार सम्म', // Sunday to Thursday
      timeZone: 'नेपाली समय (UTC+५:४५)' // Nepali Time (UTC+5:45)
    };
  }

  static isHoliday(date: Date = this.getCurrentNepaliTime()): boolean {
    // Simplified holiday check - in real implementation, you'd use a proper Nepali calendar conversion
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    return this.NEPALI_HOLIDAYS.some(holiday => 
      holiday.month === month && Math.abs(holiday.day - day) <= 2
    );
  }

  static getUpcomingHolidays(): { name: string; date: string }[] {
    return [
      { name: 'दशैं', date: '२०८१ आश्विन १५' },
      { name: 'तिहार', date: '२०८१ कार्तिक २' },
      { name: 'छठ', date: '२०८१ कार्तिक २०' }
    ];
  }
}
