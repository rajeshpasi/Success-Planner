import React from 'react';

const MonthSummaryCard = ({ monthSummary }) => {
  const { totalTasks, completed, pending, completionRate } = monthSummary;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Month Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Tasks</span>
          <span className="font-semibold text-gray-800">{totalTasks}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Completed</span>
          <span className="font-semibold text-green-600">{completed}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Pending</span>
          <span className="font-semibold text-orange-600">{pending}</span>
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
          <span className="text-gray-600 font-medium">Completion Rate</span>
          <span className="font-bold text-indigo-600 text-lg">{`${completionRate}%`}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MonthSummaryCard;