// Task category constants for the dashboard
export const TaskCategory = {
  WORK: 'Work',
  PERSONAL: 'Personal', 
  HEALTH: 'Health',
  LEARNING: 'Learning',
  OTHER: 'Other'
};

// Metric trend direction constants
export const TrendDirection = {
  UP: 'up',
  DOWN: 'down',
  NEUTRAL: 'neutral'
};

export const formatPercentage = (value) => {
  return `${value}%`;
};

export const formatDays = (days) => {
  return `${days} day${days !== 1 ? 's' : ''}`;
};

export const formatTaskCount = (count) => {
  return count.toString();
};

export const formatTrendText = (percentage, direction, timeframe) => {
  const symbol = direction === 'up' ? '↑' : direction === 'down' ? '↓' : '';
  return `${symbol} ${percentage}% from ${timeframe}`;
};

// Mock data for dashboard metrics and charts
export const mockRootProps = {
  tasksCompleted: 248,
  tasksCompletedTrend: { percentage: 12, direction: 'up', timeframe: 'last month' },
  goalsAchieved: 15,
  goalsAchievedTrend: { percentage: 8, direction: 'up', timeframe: 'last month' },
  currentStreak: 7,
  personalBest: 14,
  productivityScore: 85,
  productivityTrend: { percentage: 3, direction: 'down', timeframe: 'last week' },
  weeklyTaskData: [
    { day: 'Mon', tasks: 12 },
    { day: 'Tue', tasks: 8 },
    { day: 'Wed', tasks: 15 },
    { day: 'Thu', tasks: 9 },
    { day: 'Fri', tasks: 7 },
    { day: 'Sat', tasks: 11 },
    { day: 'Sun', tasks: 13 }
  ],
  taskCategories: [
    { category: 'Work', value: 45, color: '#3B82F6' },
    { category: 'Personal', value: 25, color: '#F59E0B' },
    { category: 'Health', value: 15, color: '#10B981' },
    { category: 'Learning', value: 10, color: '#8B5CF6' },
    { category: 'Other', value: 5, color: '#6B7280' }
  ],
  goalProgressData: [
    { week: 'Week 1', progress: 40 },
    { week: 'Week 2', progress: 55 },
    { week: 'Week 3', progress: 70 },
    { week: 'Week 4', progress: 85 }
  ]
};