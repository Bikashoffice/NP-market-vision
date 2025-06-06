
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface LanguageSwitchProps {
  onLanguageChange: (language: 'en' | 'ne') => void;
  currentLanguage: 'en' | 'ne';
}

export const LanguageSwitch = ({ onLanguageChange, currentLanguage }: LanguageSwitchProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onLanguageChange(currentLanguage === 'en' ? 'ne' : 'en')}
      className="flex items-center space-x-2"
    >
      <Globe className="w-4 h-4" />
      <span>{currentLanguage === 'en' ? 'नेपाली' : 'English'}</span>
    </Button>
  );
};
