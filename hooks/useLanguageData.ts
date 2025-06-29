"use client";

import { useState, useEffect } from 'react';

interface LanguagePair {
  id: number;
  mainLanguage: string;
  goalLanguage: string;
  code: string;
}

interface Verb {
  id: number;
  word: string;
  example: string;
  wordTranslation: string;
  exampleTranslation: string;
}

export function useLanguageData() {
  const [selectedPair, setSelectedPair] = useState<LanguagePair | null>(null);
  const [verbsData, setVerbsData] = useState<Verb[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load selected language pair from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('selectedLanguagePair');
    if (stored) {
      try {
        const pair = JSON.parse(stored);
        setSelectedPair(pair);
      } catch (error) {
        console.error('Error parsing stored language pair:', error);
        // Default to Turkish-English if parsing fails
        setSelectedPair({
          id: 1,
          mainLanguage: "Turkish",
          goalLanguage: "English",
          code: "tr-en"
        });
      }
    } else {
      // Default to Turkish-English
      setSelectedPair({
        id: 1,
        mainLanguage: "Turkish",
        goalLanguage: "English",
        code: "tr-en"
      });
    }
  }, []);

  // Load verbs data when language pair changes
  useEffect(() => {
    if (selectedPair) {
      setIsLoading(true);
      import(`@/data/${selectedPair.code}.json`)
        .then((module) => {
          setVerbsData(module.default);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error loading verbs data:', error);
          setIsLoading(false);
        });
    }
  }, [selectedPair]);

  const handlePairChange = (pair: LanguagePair) => {
    setSelectedPair(pair);
    localStorage.setItem('selectedLanguagePair', JSON.stringify(pair));
  };

  return {
    selectedPair,
    verbsData,
    isLoading,
    handlePairChange
  };
}