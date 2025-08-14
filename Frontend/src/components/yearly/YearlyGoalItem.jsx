import React from 'react';
import { WorkIcon, PersonalIcon, HealthIcon, LearningIcon, ChevronDownIcon, ChevronRightIcon } from '../icons/SimpleIcons';
import { formatProgressPercentage } from '../../data/yearlyPlannerMockData';

const YearlyGoalItem = ({ goal, onToggle }) => {
  const { id, title, category, progress, isExpanded } = goal;

  const getGoalIcon = (category) => {
    switch (category) {
      case 'professional':
        return WorkIcon;
      case 'health':
        return HealthIcon;
      case 'learning':
        return LearningIcon;
      case 'personal':
        return PersonalIcon;
      default:
        return WorkIcon;
    }
  };

  const getGoalIconColor = (category) => {
    switch (category) {
      case 'professional':
        return '#3B82F6';
      case 'health':
        return '#EF4444';
      case 'learning':
        return '#8B5CF6';
      case 'personal':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const IconComponent = getGoalIcon(category);

  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
      <button
        onClick={() => onToggle(id)}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gray-50">
            <IconComponent className="w-5 h-5" color={getGoalIconColor(category)} />
          </div>
          <span className="font-medium text-gray-800">{title}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-600">{formatProgressPercentage(progress)}</span>
          {isExpanded ? (
            <ChevronDownIcon className="w-4 h-4 text-gray-400 transition-transform duration-200" color="currentColor" />
          ) : (
            <ChevronRightIcon className="w-4 h-4 text-gray-400 transition-transform duration-200" color="currentColor" />
          )}
        </div>
      </button>
      
      {/* Progress Bar */}
      <div className="px-4 pb-3">
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{ 
              width: `${progress}%`,
              backgroundColor: getGoalIconColor(category)
            }}
          ></div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50 animate-fade-in">
          <div className="pt-3 text-sm text-gray-600">
            <p>Goal details and sub-tasks would appear here...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default YearlyGoalItem;