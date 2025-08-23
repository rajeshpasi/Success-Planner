import React from 'react';
import { WorkIcon, HealthIcon, FinanceIcon } from '../icons/SimpleIcons';
import { formatTaskDueDate } from '../../data/monthlyDetailMockData.js';
import { formatTaskStatusLabel } from '../../data/monthlyDetailMockData.js';

const TaskListItem = ({ task }) => {
  const { title, dueDate, status, category } = task;

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
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'health':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'finance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIndicator = (status) => {
    if (status === 'completed') {
      return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
    }
    return <div className="w-2 h-2 bg-orange-500 rounded-full"></div>;
  };

  const IconComponent = getCategoryIcon(category);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 hover:scale-[1.02] animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gray-50">
            <IconComponent className="w-5 h-5" color="#6B7280" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
            <p className="text-sm text-gray-600 mt-1 font-medium">{formatTaskDueDate(dueDate)}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {getStatusIndicator(status)}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(category)}`}>
          {category}
        </span>
        
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
          {formatTaskStatusLabel(status)}
        </span>
      </div>
    </div>
  );
};

export default TaskListItem;