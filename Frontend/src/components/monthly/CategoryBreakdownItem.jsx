import React from 'react';
import { WorkIcon, HealthIcon, FinanceIcon } from '../icons/SimpleIcons';
import { formatCategoryLabel } from '../../data/monthlyDetailMockData';

const CategoryBreakdownItem = ({ categoryData }) => {
  const { category, count } = categoryData;

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'work':
        return WorkIcon;
      case 'health':
        return HealthIcon;
      case 'finance':
        return FinanceIcon;
      default:
        return WorkIcon;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'work':
        return '#3B82F6';
      case 'health':
        return '#10B981';
      case 'finance':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const IconComponent = getCategoryIcon(category);

  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gray-50">
          <IconComponent className="w-4 h-4" color={getCategoryColor(category)} />
        </div>
        <span className="font-medium text-gray-700">{formatCategoryLabel(category)}</span>
      </div>
      
      <span className="font-semibold text-gray-800">{count}</span>
    </div>
  );
};

export default CategoryBreakdownItem;