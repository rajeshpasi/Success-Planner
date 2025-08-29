// Mock data for planners
export const mockStore = {
  user: {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    preferences: {
      theme: "light",
      notifications: true,
      defaultView: "list"
    }
  },
  tasks: [
    {
      id: "task-1",
      title: "Complete project proposal",
      description: "Finalize the Q1 project proposal document",
      dueDate: new Date(2025, 0, 15),
      priority: "high",
      status: "pending",
      category: "work",
      createdAt: new Date(2025, 0, 1)
    },
    {
      id: "task-2", 
      title: "Team meeting preparation",
      description: "Prepare slides for weekly team sync",
      dueDate: new Date(2025, 0, 12),
      priority: "medium",
      status: "in_progress",
      category: "work",
      createdAt: new Date(2025, 0, 8)
    },
    {
      id: "task-3",
      title: "Doctor appointment",
      description: "Annual health checkup",
      dueDate: new Date(2025, 0, 20),
      priority: "high",
      status: "pending",
      category: "health",
      createdAt: new Date(2025, 0, 5)
    },
    {
      id: "task-4",
      title: "Grocery shopping",
      description: "Buy weekly groceries",
      dueDate: new Date(2025, 0, 13),
      priority: "low",
      status: "completed",
      category: "personal",
      createdAt: new Date(2025, 0, 10)
    },
    {
      id: "task-5",
      title: "Budget review",
      description: "Review monthly expenses and budget",
      dueDate: new Date(2025, 0, 25),
      priority: "medium",
      status: "pending",
      category: "finance",
      createdAt: new Date(2025, 0, 3)
    }
  ],
  monthlyGoals: [
    {
      id: "goal-1",
      title: "Complete 5 major projects",
      progress: 60,
      target: 5,
      current: 3,
      timeframe: "monthly"
    },
    {
      id: "goal-2",
      title: "Exercise 20 days",
      progress: 75,
      target: 20,
      current: 15,
      timeframe: "monthly"
    }
  ],
  weeklyGoals: [
    {
      id: "weekly-goal-1",
      title: "Complete 3 tasks daily",
      progress: 80,
      target: 21,
      current: 17,
      timeframe: "weekly"
    }
  ]
};

export const mockQuery = {
  userStats: {
    totalTasks: 156,
    completedTasks: 142,
    pendingTasks: 14,
    overdueTask: 3,
    completionRate: 91,
    monthlyCompletionTrend: [85, 88, 91, 89, 92, 91]
  }
};

export const mockRootProps = {
  currentDate: new Date(2025, 0, 10),
  selectedMonth: {
    month: "January",
    year: 2025,
    monthIndex: 0
  },
  selectedWeek: {
    startDate: new Date(2025, 0, 6),
    endDate: new Date(2025, 0, 12)
  },
  viewType: "list",
  filterCategory: "all",
  sortBy: "dueDate"
};


export const formatTaskDueDate = (date) => {
  if (!(date instanceof Date)) date = new Date(date);
  const now = new Date();
  const diffTime = date - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Due Today";
  if (diffDays === 1) return "Due Tomorrow";
  if (diffDays < 0) return `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? 's' : ''}`;
  if (diffDays <= 7) return `Due in ${diffDays} day${diffDays > 1 ? 's' : ''}`;
  
  return date.toLocaleDateString("en-US", { 
    year: "numeric", 
    month: "short", 
    day: "numeric" 
  });
};

export const formatTaskPriority = (priority) => {
  const priorityMap = {
    low: "Low Priority",
    medium: "Medium Priority", 
    high: "High Priority"
  };
  return priorityMap[priority] || priority;
};

export const formatTaskStatus = (status) => {
  const statusMap = {
    pending: "Pending",
    in_progress: "In Progress",
    completed: "Completed",
    overdue: "Overdue"
  };
  return statusMap[status] || status;
};

export const formatCompletionPercentage = (completed, total) => {
  if (total === 0) return "0%";
  return `${Math.round((completed / total) * 100)}%`;
};

export const formatWeekRange = (date) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  
  return `${startOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
};