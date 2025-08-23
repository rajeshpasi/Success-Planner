// Mock data for monthly detailed view
export const mockStore = {};

export const mockQuery = {};

// Generate tasks for different months
const generateTasksForMonth = (monthIndex, monthName) => {
  const baseYear = 2025;
  const tasks = [
    {
      id: `${monthIndex}-1`,
      title: "Complete Project Proposal",
      dueDate: new Date(baseYear, monthIndex - 1, 15),
      status: "completed",
      category: "work"
    },
    {
      id: `${monthIndex}-2`, 
      title: "Team Building Session",
      dueDate: new Date(baseYear, monthIndex - 1, 20),
      status: "pending",
      category: "work"
    },
    {
      id: `${monthIndex}-3`,
      title: "Health Checkup", 
      dueDate: new Date(baseYear, monthIndex - 1, 25),
      status: monthIndex % 2 === 0 ? "completed" : "pending",
      category: "health"
    },
    {
      id: `${monthIndex}-4`,
      title: "Financial Planning Meeting",
      dueDate: new Date(baseYear, monthIndex - 1, 28), 
      status: monthIndex % 3 === 0 ? "completed" : "pending",
      category: "finance"
    }
  ];
  
  return tasks;
};

// Generate month summary based on tasks
const generateMonthSummary = (tasks) => {
  const completed = tasks.filter(task => task.status === "completed").length;
  const pending = tasks.filter(task => task.status === "pending").length;
  const completionRate = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;
  
  return {
    totalTasks: tasks.length,
    completed,
    pending,
    completionRate
  };
};

// Generate category breakdown
const generateTaskCategories = (tasks) => {
  const categories = {};
  tasks.forEach(task => {
    categories[task.category] = (categories[task.category] || 0) + 1;
  });
  
  return Object.entries(categories).map(([category, count]) => ({
    category,
    count
  }));
};

// Function to get data for a specific month
export const getMonthlyData = (monthIndex, monthName) => {
  const tasks = generateTasksForMonth(monthIndex, monthName);
  const monthSummary = generateMonthSummary(tasks);
  const taskCategories = generateTaskCategories(tasks);
  
  return {
    selectedMonth: {
      month: monthName,
      year: 2025,
      monthIndex: monthIndex
    },
    tasks,
    monthSummary,
    taskCategories
  };
};

export const mockRootProps = {
  selectedMonth: {
    month: "January",
    year: 2025,
    monthIndex: 1
  },
  tasks: [
    {
      id: 1,
      title: "Complete Project Proposal",
      dueDate: new Date(2025, 0, 15),
      status: "completed",
      category: "work"
    },
    {
      id: 2, 
      title: "Team Building Session",
      dueDate: new Date(2025, 0, 20),
      status: "pending",
      category: "work"
    },
    {
      id: 3,
      title: "Health Checkup", 
      dueDate: new Date(2025, 0, 25),
      status: "completed",
      category: "health"
    },
    {
      id: 4,
      title: "Financial Planning Meeting",
      dueDate: new Date(2025, 0, 30), 
      status: "pending",
      category: "finance"
    }
  ],
  monthSummary: {
    totalTasks: 4,
    completed: 2,
    pending: 2,
    completionRate: 50
  },
  taskCategories: [
    { category: "work", count: 2 },
    { category: "health", count: 1 },
    { category: "finance", count: 1 }
  ]
};

export const formatTaskDueDate = (date) => {
  if (!(date instanceof Date)) date = new Date(date);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

export const formatTaskStatusLabel = (status) => {
  if (status === "completed") return "Completed";
  if (status === "pending") return "Pending";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const formatCompletionRate = (completed, total) => {
  if (total === 0) {
    return '0%';
  }
  return `${Math.round((completed / total) * 100)}%`;
};

export const formatCategoryLabel = (category) => {
  if (!category) {
    return '';
  }
  return category.charAt(0).toUpperCase() + category.slice(1);
};