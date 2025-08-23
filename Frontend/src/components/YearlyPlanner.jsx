import React, { useState } from 'react';
import YearNavigationHeader from './yearly/YearNavigationHeader';
import MonthlyProgressCard from './yearly/MonthlyProgressCard';
import YearlyGoalItem from './yearly/YearlyGoalItem';
import ImportantDateItem from './yearly/ImportantDateItem';
import MonthlyDetailView from './monthly/MonthlyDetailView';
import { mockRootProps } from '../data/yearlyPlannerMockData';
import { getMonthlyData } from '../data/monthlyDetailMockData';

const YearlyPlanner = () => {
  const [currentYear, setCurrentYear] = useState(mockRootProps.currentYear);
  const [yearlyGoals, setYearlyGoals] = useState(mockRootProps.yearlyGoals);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [showMonthlyDetail, setShowMonthlyDetail] = useState(false);

  const handleYearChange = (newYear) => {
    setCurrentYear(newYear);
  };

  const handleGoalToggle = (goalId) => {
    setYearlyGoals(goals => 
      goals.map(goal => 
        goal.id === goalId 
          ? { ...goal, isExpanded: !goal.isExpanded }
          : goal
      )
    );
  };

  const handleMonthClick = (monthData) => {
    console.log('Month clicked:', monthData); // Debug log
    setSelectedMonth({
      month: monthData.month,
      year: currentYear,
      monthIndex: monthData.monthIndex
    });
    setShowMonthlyDetail(true);
  };

  const handleBackToYearView = () => {
    setShowMonthlyDetail(false);
    setSelectedMonth(null);
  };

  if (showMonthlyDetail && selectedMonth) {
    const monthlyData = getMonthlyData(selectedMonth.monthIndex, selectedMonth.month);
    return (
      <MonthlyDetailView
        selectedMonth={selectedMonth}
        tasks={monthlyData.tasks}
        monthSummary={monthlyData.monthSummary}
        taskCategories={monthlyData.taskCategories}
        onBackToYearView={handleBackToYearView}
      />
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Year Navigation Header */}
      <YearNavigationHeader 
        currentYear={currentYear}
        onYearChange={handleYearChange}
      />

      {/* Monthly Progress Grid */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockRootProps.monthlyData.map((monthData, index) => (
            <MonthlyProgressCard 
              key={monthData.month}
              monthData={monthData}
              onClick={() => handleMonthClick(monthData)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Sections - Yearly Goals and Important Dates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Yearly Goals Section */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Yearly Goals</h2>
            <div className="space-y-4">
              {yearlyGoals.map((goal) => (
                <YearlyGoalItem
                  key={goal.id}
                  goal={goal}
                  onToggle={handleGoalToggle}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Important Dates Section */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Important Dates</h2>
            <div className="space-y-2">
              {mockRootProps.importantDates.map((dateItem) => (
                <ImportantDateItem
                  key={dateItem.id}
                  dateItem={dateItem}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearlyPlanner;