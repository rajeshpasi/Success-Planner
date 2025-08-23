import React from 'react';
import { ChevronLeftIcon, TrendUpIcon, CloseIcon } from '../icons/SimpleIcons';

const MonthlyDetailHeader = ({ selectedMonth, onBackToYearView }) => {
  const { month, year } = selectedMonth;

  return (
    <div className="flex items-center justify-between mb-8 animate-fade-in">
      <div className="flex items-center gap-4">
        <button 
          onClick={onBackToYearView}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-600 hover:text-indigo-600 flex items-center gap-2"
          aria-label="Back to year view"
        >
          <ChevronLeftIcon className="w-5 h-5" color="currentColor" />
          <span className="text-sm font-medium">Back to Year View</span>
        </button>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-800">
        {month} {year} - Detailed View
      </h1>
      
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-600 hover:text-indigo-600">
          <TrendUpIcon className="w-5 h-5" color="currentColor" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-600 hover:text-indigo-600">
          <CloseIcon className="w-5 h-5" color="currentColor" />
        </button>
      </div>
    </div>
  );
};

export default MonthlyDetailHeader;