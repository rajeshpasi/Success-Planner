import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNutritionix, faElementor } from '@fortawesome/free-brands-svg-icons';
import { PlusIcon, ChevronLeftIcon, ChevronRightIcon } from './icons/SimpleIcons';
import TaskCard from './common/TaskCard';
import TaskForm from './common/TaskForm';
import FilterSort from './common/FilterSort';
import ProgressChart from './common/ProgressChart';
import Modal from './Modal';
import { mockStore, mockQuery, formatCompletionPercentage } from '../data/plannerMockData';

const MonthlyPlanner = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1));
  const [viewType, setViewType] = useState('list');
  const [tasks, setTasks] = useState(mockStore.tasks);
  const [goals, setGoals] = useState(mockStore.monthlyGoals);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');

  const currentMonth = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Filter and sort tasks for current month
  const filteredTasks = useMemo(() => {
    let filtered = tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      const isCurrentMonth = taskDate.getMonth() === currentDate.getMonth() && 
                            taskDate.getFullYear() === currentDate.getFullYear();
      
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
      
      return isCurrentMonth && matchesSearch && matchesCategory;
    });

    // Sort tasks
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'createdAt':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [tasks, currentDate, searchTerm, filterCategory, sortBy]);

  // Calculate monthly stats
  const monthlyStats = useMemo(() => {
    const monthTasks = tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate.getMonth() === currentDate.getMonth() && 
             taskDate.getFullYear() === currentDate.getFullYear();
    });

    const completed = monthTasks.filter(task => task.status === 'completed').length;
    const pending = monthTasks.filter(task => task.status === 'pending').length;
    const inProgress = monthTasks.filter(task => task.status === 'in_progress').length;
    const overdue = monthTasks.filter(task => {
      return new Date(task.dueDate) < new Date() && task.status !== 'completed';
    }).length;

    return {
      total: monthTasks.length,
      completed,
      pending,
      inProgress,
      overdue,
      completionRate: monthTasks.length > 0 ? Math.round((completed / monthTasks.length) * 100) : 0
    };
  }, [tasks, currentDate]);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayTasks = tasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        return taskDate.toDateString() === date.toDateString();
      });
      
      days.push({
        date: day,
        fullDate: date,
        tasks: dayTasks,
        isToday: date.toDateString() === new Date().toDateString()
      });
    }
    
    return days;
  }, [currentDate, tasks]);

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const handleTaskSubmit = (taskData) => {
    if (editingTask) {
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id ? { ...taskData, id: editingTask.id } : task
      ));
    } else {
      setTasks(prev => [...prev, taskData]);
    }
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  const handleTaskEdit = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleTaskDelete = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const handleTaskToggleComplete = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ));
  };

  const progressData = [
    { label: 'Completed', value: monthlyStats.completed },
    { label: 'In Progress', value: monthlyStats.inProgress },
    { label: 'Pending', value: monthlyStats.pending },
    { label: 'Overdue', value: monthlyStats.overdue }
  ];

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header - Mobile Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-600 touch-manipulation"
          >
            <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <h1 className="text-xl sm:text-3xl font-bold text-gray-800">{currentMonth}</h1>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-600 touch-manipulation"
          >
            <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* View Toggle - Mobile Responsive */}
          <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setViewType('list')}
              className={`px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors touch-manipulation ${
                viewType === 'list'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewType('calendar')}
              className={`px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors touch-manipulation ${
                viewType === 'calendar'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <FontAwesomeIcon icon={faNutritionix} className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Calendar</span>
              <span className="sm:hidden">Cal</span>
            </button>
          </div>

          {/* Add Task Button - Mobile Responsive */}
          <button
            onClick={() => setIsTaskModalOpen(true)}
            className="flex items-center gap-1 sm:gap-2 bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors touch-manipulation"
          >
            <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">Add Task</span>
          </button>
        </div>
      </div>

      {/* Stats Cards - Mobile Responsive */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-2 sm:mb-0">
              <p className="text-xs sm:text-sm text-gray-600">Total Tasks</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-800">{monthlyStats.total}</p>
            </div>
            <FontAwesomeIcon icon={faElementor} className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 self-end sm:self-auto" />
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-2 sm:mb-0">
              <p className="text-xs sm:text-sm text-gray-600">Completed</p>
              <p className="text-lg sm:text-2xl font-bold text-green-600">{monthlyStats.completed}</p>
            </div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center self-end sm:self-auto">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-600 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-2 sm:mb-0">
              <p className="text-xs sm:text-sm text-gray-600">Pending</p>
              <p className="text-lg sm:text-2xl font-bold text-orange-600">{monthlyStats.pending}</p>
            </div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 rounded-full flex items-center justify-center self-end sm:self-auto">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-600 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-2 sm:mb-0">
              <p className="text-xs sm:text-sm text-gray-600">Completion Rate</p>
              <p className="text-lg sm:text-2xl font-bold text-indigo-600">{monthlyStats.completionRate}%</p>
            </div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-100 rounded-full flex items-center justify-center self-end sm:self-auto">
              <span className="text-xs font-bold text-indigo-600">%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          {viewType === 'list' ? (
            <>
              <FilterSort
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                filterCategory={filterCategory}
                onFilterChange={setFilterCategory}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />

              <div className="space-y-4">
                {filteredTasks.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                    <FontAwesomeIcon icon={faElementor} className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No tasks found for this month</p>
                    <button
                      onClick={() => setIsTaskModalOpen(true)}
                      className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      Create your first task
                    </button>
                  </div>
                ) : (
                  filteredTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={handleTaskEdit}
                      onDelete={handleTaskDelete}
                      onToggleComplete={handleTaskToggleComplete}
                    />
                  ))
                )}
              </div>
            </>
          ) : (
            /* Calendar View - Mobile Responsive */
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-3 sm:p-6">
              <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-3 sm:mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-1 sm:p-2 text-center text-xs sm:text-sm font-medium text-gray-600">
                    <span className="hidden sm:inline">{day}</span>
                    <span className="sm:hidden">{day.charAt(0)}</span>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`min-h-[60px] sm:min-h-[100px] p-1 sm:p-2 border rounded text-center ${
                      day ? 'bg-white hover:bg-gray-50 cursor-pointer' : 'bg-gray-50'
                    } ${day?.isToday ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}
                  >
                    {day && (
                      <>
                        <div className={`text-xs sm:text-sm font-medium mb-1 sm:mb-2 ${
                          day.isToday ? 'text-indigo-600' : 'text-gray-800'
                        }`}>
                          {day.date}
                        </div>
                        <div className="space-y-1">
                          {day.tasks.slice(0, 1).map(task => (
                            <div
                              key={task.id}
                              className={`text-xs p-1 rounded truncate ${
                                task.status === 'completed'
                                  ? 'bg-green-100 text-green-800'
                                  : task.priority === 'high'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              <span className="hidden sm:inline">{task.title}</span>
                              <span className="sm:hidden">•</span>
                            </div>
                          ))}
                          {day.tasks.length > 1 && (
                            <div className="text-xs text-gray-500">
                              <span className="hidden sm:inline">+{day.tasks.length - 1} more</span>
                              <span className="sm:hidden">+{day.tasks.length - 1}</span>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Mobile First */}
        <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
          {/* Progress Chart */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <ProgressChart
              data={progressData}
              title="Monthly Progress"
              type="bar"
            />
          </div>

          {/* Monthly Goals - Mobile Responsive */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Monthly Goals</h3>
            <div className="space-y-3 sm:space-y-4">
              {goals.map(goal => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 truncate pr-2">{goal.title}</span>
                    <span className="text-xs sm:text-sm text-gray-600 flex-shrink-0">{goal.current}/{goal.target}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">{goal.progress}% complete</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Task Modal */}
      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
      >
        <TaskForm
          task={editingTask}
          onSubmit={handleTaskSubmit}
          onCancel={() => {
            setIsTaskModalOpen(false);
            setEditingTask(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default MonthlyPlanner;