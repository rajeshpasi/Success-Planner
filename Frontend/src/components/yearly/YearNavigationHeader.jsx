import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons/SimpleIcons';

const YearNavigationHeader = ({ currentYear, onYearChange }) => {
  const handlePreviousYear = () => {
    onYearChange(currentYear - 1);
  };

  const handleNextYear = () => {
    onYearChange(currentYear + 1);
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <button 
        onClick={handlePreviousYear}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-600 hover:text-indigo-600"
        aria-label="Previous year"
      >
        <ChevronLeftIcon className="w-5 h-5" color="currentColor" />
      </button>
      
      <h1 className="text-3xl font-bold text-gray-800 animate-fade-in">
        {currentYear} Year Overview
      </h1>
      
      <button 
        onClick={handleNextYear}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-600 hover:text-indigo-600"
        aria-label="Next year"
      >
        <ChevronRightIcon className="w-5 h-5" color="currentColor" />
      </button>
    </div>
  );
};

export default YearNavigationHeader;