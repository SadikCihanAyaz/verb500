"use client";

import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface ProgressBarProps {
  learned: number;
  notLearned: number;
  pending: number;
  total: number;
}

export default function ProgressBar({ learned, notLearned, pending, total }: ProgressBarProps) {
  const learnedPercentage = (learned / total) * 100;
  const notLearnedPercentage = (notLearned / total) * 100;

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Progress</h2>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 mb-6 overflow-hidden">
        <div className="h-full flex">
          <div 
            className="bg-green-500 transition-all duration-500 ease-out"
            style={{ width: `${learnedPercentage}%` }}
          />
          <div 
            className="bg-red-500 transition-all duration-500 ease-out"
            style={{ width: `${notLearnedPercentage}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center justify-center md:justify-start space-x-3 p-4 bg-green-50 rounded-lg">
          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold text-green-700">{learned}</div>
            <div className="text-sm text-green-600">Learned</div>
          </div>
        </div>

        <div className="flex items-center justify-center md:justify-start space-x-3 p-4 bg-red-50 rounded-lg">
          <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold text-red-700">{notLearned}</div>
            <div className="text-sm text-red-600">Need Practice</div>
          </div>
        </div>

        <div className="flex items-center justify-center md:justify-start space-x-3 p-4 bg-gray-50 rounded-lg">
          <Clock className="w-6 h-6 text-gray-600 flex-shrink-0" />
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold text-gray-700">{pending}</div>
            <div className="text-sm text-gray-600">Not Reviewed</div>
          </div>
        </div>
      </div>
    </div>
  );
}