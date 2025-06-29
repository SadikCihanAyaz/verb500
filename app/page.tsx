"use client";

import { useState } from 'react';
import VerbCard from '@/components/VerbCard';
import ProgressBar from '@/components/ProgressBar';
import LanguageSelector from '@/components/LanguageSelector';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useLanguageData } from '@/hooks/useLanguageData';
import { BookOpen, Filter } from 'lucide-react';

type FilterType = 'all' | 'learned' | 'not-learned' | 'pending';

export default function Home() {
  const { selectedPair, verbsData, isLoading, handlePairChange } = useLanguageData();
  const { updateVerbStatus, getVerbStatus, getStats, isLoaded } = useLocalStorage(selectedPair?.code);
  const [filter, setFilter] = useState<FilterType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const verbsPerPage = 6;

  const stats = getStats(verbsData.length);

  const filteredVerbs = verbsData.filter(verb => {
    if (filter === 'all') return true;
    return getVerbStatus(verb.id) === filter;
  });

  const totalPages = Math.ceil(filteredVerbs.length / verbsPerPage);
  const currentVerbs = filteredVerbs.slice(
    (currentPage - 1) * verbsPerPage,
    currentPage * verbsPerPage
  );

  const handleStatusChange = (verbId: number, status: 'learned' | 'not-learned') => {
    updateVerbStatus(verbId, status);
  };

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your vocabulary progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <BookOpen className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              500 Essential Verbs
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Master the most important verbs with interactive learning cards and progress tracking.
          </p>
        </div>

        {/* Language Selector */}
        <div >
          <LanguageSelector 
            selectedPair={selectedPair}
            onPairChange={handlePairChange}
          />
        </div>

        {/* Progress Bar */}
        {verbsData.length > 0 && (
          <ProgressBar 
            learned={stats.learned}
            notLearned={stats.notLearned}
            pending={stats.pending}
            total={verbsData.length}
          />
        )}

        {/* Filter Buttons */}
        {verbsData.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <div className="flex items-center space-x-2 text-gray-600 mr-4">
              <Filter className="w-5 h-5" />
              <span className="font-medium hidden sm:inline">Filter:</span>
            </div>
            
            {[
              { key: 'all', label: 'All Verbs', count: verbsData.length },
              { key: 'pending', label: 'Not Reviewed', count: stats.pending },
              { key: 'learned', label: 'Learned', count: stats.learned },
              { key: 'not-learned', label: 'Need Practice', count: stats.notLearned },
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => handleFilterChange(key as FilterType)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filter === key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">
                  {key === 'all' ? 'All' : key === 'pending' ? 'New' : key === 'learned' ? 'Done' : 'Practice'}
                </span>
                <span className="ml-2 text-sm opacity-75">({count})</span>
              </button>
            ))}
          </div>
        )}

        {/* Verb Cards */}
        {currentVerbs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {currentVerbs.map(verb => (
              <VerbCard
                key={verb.id}
                verb={verb}
                status={getVerbStatus(verb.id)}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg font-medium ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        {/* No Results */}
        {verbsData.length > 0 && filteredVerbs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BookOpen className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No verbs found</h3>
            <p className="text-gray-500">Try changing your filter to see more verbs.</p>
          </div>
        )}

        {/* No Language Data */}
        {verbsData.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BookOpen className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No verbs available</h3>
            <p className="text-gray-500">Please select a different language pair.</p>
          </div>
        )}
      </div>
    </div>
  );
}