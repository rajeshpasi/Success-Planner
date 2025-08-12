import React from 'react';
import MetricCard from './dashboard/MetricCard';
import BarChart from './dashboard/BarChart';
import PieChart from './dashboard/PieChart';
import LineChart from './dashboard/LineChart';
import { mockRootProps, formatDays, formatPercentage } from '../data/dashboardMockData';
import { TasksIcon, TrophyIcon, StreakIcon, ChartIcon } from './icons/SimpleIcons';

const Dashboard = () => {
  const data = mockRootProps;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Tasks Completed"
          value={data.tasksCompleted}
          trend={data.tasksCompletedTrend}
          icon={TasksIcon}
          iconColor="text-blue-500"
        />
        
        <MetricCard
          title="Goals Achieved"
          value={data.goalsAchieved}
          trend={data.goalsAchievedTrend}
          icon={TrophyIcon}
          iconColor="text-yellow-500"
        />
        
        <MetricCard
          title="Current Streak"
          value={formatDays(data.currentStreak)}
          trend={{ 
            percentage: Math.round((data.currentStreak / data.personalBest) * 100), 
            direction: 'neutral', 
            timeframe: `Personal best: ${formatDays(data.personalBest)}` 
          }}
          icon={StreakIcon}
          iconColor="text-green-500"
        />
        
        <MetricCard
          title="Productivity Score"
          value={formatPercentage(data.productivityScore)}
          trend={data.productivityTrend}
          icon={ChartIcon}
          iconColor="text-purple-500"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Tasks Chart */}
        <div className="lg:col-span-1">
          <BarChart 
            data={data.weeklyTaskData}
            title="Tasks Completed This Week"
          />
        </div>

        {/* Task Categories Chart */}
        <div className="lg:col-span-1">
          <PieChart 
            data={data.taskCategories}
            title="Task Categories"
          />
        </div>

        {/* Goal Progress Chart - Bottom Full Width */}
        <div className="lg:col-span-2">
          <LineChart 
            data={data.goalProgressData}
            title="Goal Progress Over Time"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;