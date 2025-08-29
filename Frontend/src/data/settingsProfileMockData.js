// Mock data for Settings, Profile, and Notifications components

// Enums for type safety
export const NotificationType = {
  TASK_REMINDER: 'task_reminder',
  TASK_COMPLETED: 'task_completed',
  TASK_OVERDUE: 'task_overdue',
  WEEKLY_SUMMARY: 'weekly_summary',
  MONTHLY_REPORT: 'monthly_report',
  SYSTEM_UPDATE: 'system_update'
};

export const NotificationPriority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent'
};

export const ThemeMode = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

export const DefaultView = {
  LIST: 'list',
  CALENDAR: 'calendar',
  GRID: 'grid'
};

// String formatters
export const formatNotificationTime = (date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
};

export const formatNotificationType = (type) => {
  switch (type) {
    case NotificationType.TASK_REMINDER:
      return 'Task Reminder';
    case NotificationType.TASK_COMPLETED:
      return 'Task Completed';
    case NotificationType.TASK_OVERDUE:
      return 'Task Overdue';
    case NotificationType.WEEKLY_SUMMARY:
      return 'Weekly Summary';
    case NotificationType.MONTHLY_REPORT:
      return 'Monthly Report';
    case NotificationType.SYSTEM_UPDATE:
      return 'System Update';
    default:
      return 'Notification';
  }
};

export const formatPriorityBadge = (priority) => {
  switch (priority) {
    case NotificationPriority.LOW:
      return 'Low';
    case NotificationPriority.MEDIUM:
      return 'Medium';
    case NotificationPriority.HIGH:
      return 'High';
    case NotificationPriority.URGENT:
      return 'Urgent';
    default:
      return 'Normal';
  }
};

export const formatMemberSince = (date) => {
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  });
};

// Data for global state store
export const mockStore = {
  user: {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    memberSince: new Date('2025-01-01'),
    accountStatus: 'active',
    preferences: {
      theme: ThemeMode.LIGHT,
      defaultView: DefaultView.LIST,
      notifications: true,
      pushNotifications: true,
      emailReminders: true,
      taskReminders: true,
      weeklyReports: false,
      monthlyReports: true
    }
  },
  notifications: [
    {
      id: 'notif-1',
      type: NotificationType.TASK_REMINDER,
      priority: NotificationPriority.HIGH,
      title: 'Task Due Soon',
      message: 'Complete quarterly review by 5 PM today',
      timestamp: new Date('2025-01-15T14:30:00'),
      isRead: false,
      actionUrl: '/tasks/quarterly-review'
    },
    {
      id: 'notif-2', 
      type: NotificationType.TASK_COMPLETED,
      priority: NotificationPriority.MEDIUM,
      title: 'Task Completed',
      message: 'Great job! You completed "Update project documentation"',
      timestamp: new Date('2025-01-15T12:15:00'),
      isRead: false,
      actionUrl: '/tasks/project-docs'
    },
    {
      id: 'notif-3',
      type: NotificationType.WEEKLY_SUMMARY,
      priority: NotificationPriority.LOW,
      title: 'Weekly Summary Ready',
      message: 'Your weekly progress report is now available',
      timestamp: new Date('2025-01-14T09:00:00'),
      isRead: true,
      actionUrl: '/reports/weekly'
    },
    {
      id: 'notif-4',
      type: NotificationType.TASK_OVERDUE,
      priority: NotificationPriority.URGENT,
      title: 'Overdue Task',
      message: 'Budget planning task is 2 days overdue',
      timestamp: new Date('2025-01-13T16:45:00'),
      isRead: false,
      actionUrl: '/tasks/budget-planning'
    }
  ]
};

// Data returned by API queries
export const mockQuery = {
  userStats: {
    totalTasks: 247,
    completedTasks: 189,
    completionRate: 76,
    overdueTask: 8,
    monthlyCompletionTrend: [65, 72, 68, 78, 82, 76],
    tasksByCategory: [
      { category: 'Work', count: 112 },
      { category: 'Personal', count: 68 },
      { category: 'Health', count: 34 },
      { category: 'Finance', count: 22 },
      { category: 'Education', count: 11 }
    ],
    achievements: [
      {
        id: 'achievement-1',
        title: 'Task Master',
        description: 'Completed 100+ tasks',
        icon: '🏆',
        earnedDate: new Date('2025-01-10')
      },
      {
        id: 'achievement-2', 
        title: 'Streak Champion',
        description: '7-day completion streak',
        icon: '🎯',
        earnedDate: new Date('2025-01-12')
      },
      {
        id: 'achievement-3',
        title: 'Early Bird',
        description: 'Completed tasks before due date',
        icon: '⚡',
        earnedDate: new Date('2025-01-08')
      }
    ]
  }
};

// Data passed as props to the root component
export const mockRootProps = {
  currentUser: mockStore.user,
  unreadNotificationCount: 3,
  showNotifications: false,
  showSettings: false,
  activeSettingsTab: 'profile'
};