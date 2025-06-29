"use client";

import { useState, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import languagePairs from '@/data/language-pairs.json';

interface LanguagePair {
  id: number;
  mainLanguage: string;
  goalLanguage: string;
  code: string;
}

interface LanguageSelectorProps {
  selectedPair: LanguagePair | null;
  onPairChange: (pair: LanguagePair) => void;
}

export default function LanguageSelector({ selectedPair, onPairChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between space-x-3 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-all duration-200 shadow-sm"
      >
        <div className="flex items-center space-x-3">
          <Globe className="w-5 h-5 text-blue-600" />
          <div className="text-left">
            {selectedPair ? (
              <>
                <div className="font-semibold text-gray-800">
                  {selectedPair.mainLanguage} → {selectedPair.goalLanguage}
                </div>
                <div className="text-sm text-gray-500">Language Pair</div>
              </>
            ) : (
              <div className="font-semibold text-gray-800">Select Language Pair</div>
            )}
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
          {languagePairs.map((pair) => (
            <button
              key={pair.id}
              onClick={() => {
                onPairChange(pair);
                setIsOpen(false);
              }}
              className={`w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0 ${selectedPair?.id === pair.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
            >
              <div className="font-medium">
                {pair.mainLanguage} → {pair.goalLanguage}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Learn {pair.goalLanguage} from {pair.mainLanguage}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}