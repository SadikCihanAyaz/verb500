"use client";

import { useState } from 'react';
import { CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface Verb {
  id: number;
  word: string;
  example: string;
  wordTranslation: string;
  exampleTranslation: string;
  tips?: string;
}

interface VerbCardProps {
  verb: Verb;
  status: 'learned' | 'not-learned' | 'pending';
  onStatusChange: (verbId: number, status: 'learned' | 'not-learned') => void;
}

export default function VerbCard({ verb, status, onStatusChange }: VerbCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = () => {
    switch (status) {
      case 'learned':
        return 'border-green-200 bg-green-50';
      case 'not-learned':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  const getStatusIndicator = () => {
    switch (status) {
      case 'learned':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'not-learned':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className={`rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${getStatusColor()}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">{verb.word}</h3>
            <p className="text-lg text-gray-600 leading-relaxed">{verb.example}</p>
          </div>
          <div className="ml-4 flex-shrink-0">
            {getStatusIndicator()}
          </div>
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 mb-4"
        >
          <span className="text-gray-700 font-medium">
            {isExpanded ? 'Hide Translation' : 'Show Translation'}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {/* Translation (Expandable) */}
        {isExpanded && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="mb-3">
              <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Translation</span>
              <p className="text-lg text-blue-800 font-medium">{verb.wordTranslation}</p>
            </div>
            <div>
              <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Example Translation</span>
              <p className="text-base text-blue-700 leading-relaxed">{verb.exampleTranslation}</p>
            </div>
            {
              verb?.tips && verb?.tips.trim() && 
              <div className="mt-4 border-t border-blue-200 pt-4">
                <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Tips</span>
                <p className="text-base text-blue-700 leading-relaxed">{verb.tips}</p>
              </div>
            }
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={() => onStatusChange(verb.id, 'learned')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              status === 'learned'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            <span className="hidden sm:inline">I Learned This</span>
            <span className="sm:hidden">Learned</span>
          </button>

          <button
            onClick={() => onStatusChange(verb.id, 'not-learned')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              status === 'not-learned'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
          >
            <XCircle className="w-5 h-5" />
            <span className="hidden sm:inline">Need Practice</span>
            <span className="sm:hidden">Practice</span>
          </button>
        </div>
      </div>
    </div>
  );
}