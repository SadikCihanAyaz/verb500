"use client";

import { useState, useEffect } from 'react';

type VerbStatus = 'learned' | 'not-learned' | 'pending';

interface VerbProgress {
  [key: string]: { // Changed to string to support language pair codes
    [key: number]: VerbStatus;
  };
}

export function useLocalStorage(languageCode?: string) {
  const [verbProgress, setVerbProgress] = useState<VerbProgress>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('verbProgress');
    if (stored) {
      try {
        setVerbProgress(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing stored verb progress:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  const updateVerbStatus = (verbId: number, status: VerbStatus) => {
    if (!languageCode) return;
    
    const updated = {
      ...verbProgress,
      [languageCode]: {
        ...verbProgress[languageCode],
        [verbId]: status
      }
    };
    setVerbProgress(updated);
    localStorage.setItem('verbProgress', JSON.stringify(updated));
  };

  const getVerbStatus = (verbId: number): VerbStatus => {
    if (!languageCode || !verbProgress[languageCode]) return 'pending';
    return verbProgress[languageCode][verbId] || 'pending';
  };

  const getStats = (totalVerbs: number) => {
    if (!languageCode || !verbProgress[languageCode]) {
      return { learned: 0, notLearned: 0, pending: totalVerbs };
    }

    const currentProgress = verbProgress[languageCode];
    const learned = Object.values(currentProgress).filter(status => status === 'learned').length;
    const notLearned = Object.values(currentProgress).filter(status => status === 'not-learned').length;
    const pending = totalVerbs - learned - notLearned;

    return { learned, notLearned, pending };
  };

  return {
    updateVerbStatus,
    getVerbStatus,
    getStats,
    isLoaded
  };
}