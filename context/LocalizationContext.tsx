import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Language, getStrings } from '../i18n/strings';

interface LocalizationContextType {
  currentLanguage: Language;
  strings: ReturnType<typeof getStrings>;
  setLanguage: (lang: Language) => void;
}

export const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

interface LocalizationProviderProps {
  children: ReactNode;
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language');
    // Ensure the saved language is one of the valid options, otherwise default to 'es'
    return (savedLang === 'es' || savedLang === 'en') ? savedLang : 'es';
  });

  const strings = getStrings(currentLanguage);

  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
    // Update the lang attribute of the HTML document
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  return (
    <LocalizationContext.Provider value={{ currentLanguage, strings, setLanguage }}>
      {children}
    </LocalizationContext.Provider>
  );
};