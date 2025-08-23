import React from 'react';
import { TasksIcon, TrophyIcon } from '../icons/SimpleIcons';
import { formatTaskCount, formatCompletedCount, formatGoalCount, formatMonthProgress } from '../../data/yearlyPlannerMockData';

const MonthlyProgressCard = ({ monthData, onClick }) => {
  const { month, monthIndex, totalTasks, completedTasks, totalGoals, progressPercentage } = monthData;

  const handleClick = (e) => {
    e.preventDefault();
    console.log('Card clicked for month:', month); // Debug log
    if (onClick) {
      onClick(monthData);
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
      onClick={handleClick}
    >
      {/* Month Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{month}</h3>
        <span className="text-sm text-gray-500 font-medium">{formatMonthProgress(monthIndex, 12)}</span>
      </div>

      {/* Tasks Section */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <TasksIcon className="w-4 h-4" color="#6B7280" />
          <span>{formatTaskCount(totalTasks)}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>{formatCompletedCount(completedTasks)}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-orange-600">
          <TrophyIcon className="w-4 h-4" color="#F59E0B" />
          <span>{formatGoalCount(totalGoals)}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Progress</span>
          <span className="text-xs font-semibold text-gray-700">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyProgressCard;