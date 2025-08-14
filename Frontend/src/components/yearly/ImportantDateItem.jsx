import React from 'react';
import { formatEventDate } from '../../data/yearlyPlannerMockData';

const ImportantDateItem = ({ dateItem }) => {
  const { date, title, category } = dateItem;

  const getCategoryColor = (category) => {
    switch (category) {
      case 'work':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'learning':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'event':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'work':
        return 'work';
      case 'learning':
        return 'learning';
      case 'review':
        return 'review';
      case 'event':
        return 'event';
      default:
        return category;
    }
  };

  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
      <div className="flex items-center gap-3">
        <div className="text-center min-w-[3rem]">
          <div className="text-sm font-semibold text-gray-800">
            {formatEventDate(date)}
          </div>
        </div>
        <div>
          <h4 className="font-medium text-gray-800 text-sm">{title}</h4>
        </div>
      </div>
      
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(category)}`}>
        {getCategoryLabel(category)}
      </span>
    </div>
  );
};

export default ImportantDateItem;