// Mock data for yearly planner
export const mockStore = {};

export const mockQuery = {};

export const mockRootProps = {
  currentYear: 2025,
  monthlyData: [
    {
      month: "January",
      monthIndex: 1,
      totalTasks: 12,
      completedTasks: 8,
      totalGoals: 3,
      progressPercentage: 67
    },
    {
      month: "February",
      monthIndex: 2,
      totalTasks: 12,
      completedTasks: 8,
      totalGoals: 3,
      progressPercentage: 67
    },
    {
      month: "March",
      monthIndex: 3,
      totalTasks: 12,
      completedTasks: 8,
      totalGoals: 3,
      progressPercentage: 67
    },
    {
      month: "April",
      monthIndex: 4,
      totalTasks: 12,
      completedTasks: 8,
      totalGoals: 3,
      progressPercentage: 67
    },
    {
      month: "May",
      monthIndex: 5,
      totalTasks: 12,
      completedTasks: 8,
      totalGoals: 3,
      progressPercentage: 50
    },
    {
      month: "June",
      monthIndex: 6,
      totalTasks: 12,
      completedTasks: 8,
      totalGoals: 3,
      progressPercentage: 50
    },
    {
      month: "July",
      monthIndex: 7,
      totalTasks: 12,
      completedTasks: 8,
      totalGoals: 3,
      progressPercentage: 58
    },
    {
      month: "August",
      monthIndex: 8,
      totalTasks: 12,
      completedTasks: 8,
      totalGoals: 3,
      progressPercentage: 67
    },
    {
      month: "September",
      monthIndex: 9,
      totalTasks: 12,
      completedTasks: 8,
      totalGoals: 3,
      progressPercentage: 75
    },
    {
      month: "October",
      monthIndex: 10,
      totalTasks: 12,
      completedTasks: 8,
      totalGoals: 3,
      progressPercentage: 83
    },
    {
      month: "November",
      monthIndex: 11,
      totalTasks: 12,
      completedTasks: 8,
      totalGoals: 3,
      progressPercentage: 75
    },
    {
      month: "December",
      monthIndex: 12,
      totalTasks: 12,
      completedTasks: 8,
      totalGoals: 3,
      progressPercentage: 100
    }
  ],
  yearlyGoals: [
    {
      id: 1,
      title: "Professional Growth",
      category: "professional",
      progress: 75,
      isExpanded: false
    },
    {
      id: 2,
      title: "Health & Fitness",
      category: "health",
      progress: 75,
      isExpanded: false
    },
    {
      id: 3,
      title: "Learning & Development",
      category: "learning",
      progress: 75,
      isExpanded: false
    },
    {
      id: 4,
      title: "Personal Projects",
      category: "personal",
      progress: 75,
      isExpanded: false
    }
  ],
  importantDates: [
    {
      id: 1,
      date: new Date(2025, 0, 15),
      title: "Project Deadline",
      category: "work"
    },
    {
      id: 2,
      date: new Date(2025, 2, 21),
      title: "Team Workshop",
      category: "learning"
    },
    {
      id: 3,
      date: new Date(2025, 5, 30),
      title: "Mid-year Review",
      category: "review"
    },
    {
      id: 4,
      date: new Date(2025, 8, 15),
      title: "Conference",
      category: "event"
    }
  ]
};

export const formatProgressPercentage = (progress) => {
  return `${Math.round(progress)}%`;
};

export const formatTaskCount = (count) => {
  return `${count} Tasks`;
};

export const formatCompletedCount = (count) => {
  return `${count} Completed`;
};

export const formatGoalCount = (count) => {
  return `${count} Goals`;
};

export const formatMonthProgress = (current, total) => {
  return `${current}/${total}`;
};

export const formatEventDate = (date) => {
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.getDate();
  return `${month} ${day}`;
};