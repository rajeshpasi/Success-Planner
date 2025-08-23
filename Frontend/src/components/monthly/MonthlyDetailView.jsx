import React, { useState } from 'react';
import MonthlyDetailHeader from './MonthlyDetailHeader';
import TaskListItem from './TaskListItem';
import MonthSummaryCard from './MonthSummaryCard';
import CategoryBreakdownItem from './CategoryBreakdownItem';

const MonthlyDetailView = ({ 
  selectedMonth, 
  tasks, 
  monthSummary, 
  taskCategories, 
  onBackToYearView 
}) => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <MonthlyDetailHeader 
        selectedMonth={selectedMonth}
        onBackToYearView={onBackToYearView}
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task List Section - Takes 2/3 of the width */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedMonth.month} {selectedMonth.year} Tasks
            </h2>
            <p className="text-gray-600">All Tasks</p>
          </div>
          
          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskListItem 
                key={task.id}
                task={task}
              />
            ))}
          </div>
        </div>

        {/* Sidebar - Takes 1/3 of the width */}
        <div className="space-y-6">
          {/* Month Summary */}
          <MonthSummaryCard monthSummary={monthSummary} />
          
          {/* Task Categories */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Task Categories</h2>
            <div className="space-y-2">
              {taskCategories.map((categoryData) => (
                <CategoryBreakdownItem
                  key={categoryData.category}
                  categoryData={categoryData}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyDetailView;