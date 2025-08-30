import React from 'react';
import ModernMetricCard from './dashboard/ModernMetricCard';
import ModernChart from './dashboard/ModernChart';
import { mockRootProps, formatDays, formatPercentage } from '../data/dashboardMockData';
import { TasksIcon, TrophyIcon, StreakIcon, ChartIcon } from './icons/SimpleIcons';

const Dashboard = () => {
  const data = mockRootProps;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 p-3 sm:p-6">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Dashboard
          </h1>
          <p className="text-slate-600 text-lg">
            Track your progress and achieve your goals
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Metrics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <ModernMetricCard
            title="Tasks Completed"
            value={data.tasksCompleted}
            trend={data.tasksCompletedTrend}
            icon={TasksIcon}
            gradientFrom="from-blue-500"
            gradientTo="to-cyan-600"
          />
          
          <ModernMetricCard
            title="Goals Achieved"
            value={data.goalsAchieved}
            trend={data.goalsAchievedTrend}
            icon={TrophyIcon}
            gradientFrom="from-amber-500"
            gradientTo="to-orange-600"
          />
          
          <ModernMetricCard
            title="Current Streak"
            value={formatDays(data.currentStreak)}
            trend={{ 
              percentage: Math.round((data.currentStreak / data.personalBest) * 100), 
              direction: 'neutral', 
              timeframe: `Personal best: ${formatDays(data.personalBest)}` 
            }}
            icon={StreakIcon}
            gradientFrom="from-emerald-500"
            gradientTo="to-teal-600"
          />
          
          <ModernMetricCard
            title="Productivity Score"
            value={formatPercentage(data.productivityScore)}
            trend={data.productivityTrend}
            icon={ChartIcon}
            gradientFrom="from-purple-500"
            gradientTo="to-pink-600"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Weekly Tasks Chart */}
          <div className="lg:col-span-1">
            <ModernChart 
              data={data.weeklyTaskData}
              title="Tasks Completed This Week"
              type="bar"
              gradientFrom="from-blue-500"
              gradientTo="to-purple-600"
            />
          </div>

          {/* Task Categories Chart */}
          <div className="lg:col-span-1 ">
            <ModernChart 
              data={data.taskCategories}
              title="Task Categories"
              type="pie"
            />
          </div>

          {/* Goal Progress Chart - Bottom Full Width */}
          <div className="lg:col-span-2">
            <ModernChart 
              data={data.goalProgressData}
              title="Goal Progress Over Time"
              type="line"
              gradientFrom="from-emerald-500"
              gradientTo="to-blue-600"
            />
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                <TasksIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Add New Task</h3>
                <p className="text-sm text-slate-600">Create a new task</p>
              </div>
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                <TrophyIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Set New Goal</h3>
                <p className="text-sm text-slate-600">Define your objectives</p>
              </div>
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                <ChartIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">View Analytics</h3>
                <p className="text-sm text-slate-600">Detailed insights</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;