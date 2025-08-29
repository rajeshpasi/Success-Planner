import React, { useState, useMemo } from 'react';
import { TaskIcon } from './icons/CustomIcons';
import { PlusIcon } from './icons/SimpleIcons';
import TaskCard from './common/TaskCard';
import TaskForm from './common/TaskForm';
import FilterSort from './common/FilterSort';
import Modal from './Modal';
import { mockStore } from '../data/plannerMockData';

const Todo = () => {
  const [tasks, setTasks] = useState(mockStore.tasks);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [viewMode, setViewMode] = useState('all'); // all, today, week, overdue

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
      
      // View mode filtering
      const today = new Date();
      const taskDate = new Date(task.dueDate);
      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      
      let matchesViewMode = true;
      switch (viewMode) {
        case 'today':
          matchesViewMode = taskDate.toDateString() === today.toDateString();
          break;
        case 'week':
          matchesViewMode = taskDate >= today && taskDate <= weekFromNow;
          break;
        case 'overdue':
          matchesViewMode = taskDate < today && task.status !== 'completed';
          break;
        default:
          matchesViewMode = true;
      }
      
      return matchesSearch && matchesCategory && matchesStatus && matchesViewMode;
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
  }, [tasks, searchTerm, filterCategory, filterStatus, sortBy, viewMode]);

  // Calculate stats
  const stats = useMemo(() => {
    const today = new Date();
    const completed = tasks.filter(task => task.status === 'completed').length;
    const pending = tasks.filter(task => task.status === 'pending').length;
    const inProgress = tasks.filter(task => task.status === 'in_progress').length;
    const overdue = tasks.filter(task => {
      return new Date(task.dueDate) < today && task.status !== 'completed';
    }).length;
    const dueToday = tasks.filter(task => {
      return new Date(task.dueDate).toDateString() === today.toDateString() && task.status !== 'completed';
    }).length;

    return {
      total: tasks.length,
      completed,
      pending,
      inProgress,
      overdue,
      dueToday,
      completionRate: tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0
    };
  }, [tasks]);

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

  const viewModeOptions = [
    { value: 'all', label: 'All Tasks', count: tasks.length },
    { value: 'today', label: 'Due Today', count: stats.dueToday },
    { value: 'week', label: 'This Week', count: tasks.filter(task => {
      const today = new Date();
      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      const taskDate = new Date(task.dueDate);
      return taskDate >= today && taskDate <= weekFromNow && task.status !== 'completed';
    }).length },
    { value: 'overdue', label: 'Overdue', count: stats.overdue }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Todo List</h1>
          <p className="text-gray-600 mt-1">Manage all your tasks in one place</p>
        </div>

        <button
          onClick={() => setIsTaskModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          Add Task
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <TaskIcon className="w-8 h-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Due Today</p>
              <p className="text-2xl font-bold text-orange-600">{stats.dueToday}</p>
            </div>
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-orange-600">!</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
            </div>
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-red-600">⚠</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* View Mode Selector */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Views</h3>
            <div className="space-y-2">
              {viewModeOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setViewMode(option.value)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                    viewMode === option.value
                      ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="font-medium">{option.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    viewMode === option.value
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {option.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Filters</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Progress Overview</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-1">{stats.completionRate}%</div>
                <div className="text-sm text-gray-600">Overall Completion</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-700"
                  style={{ width: `${stats.completionRate}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-green-600">{stats.completed}</div>
                  <div className="text-xs text-gray-600">Done</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-orange-600">{stats.pending + stats.inProgress}</div>
                  <div className="text-xs text-gray-600">Remaining</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
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
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <TaskIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No tasks found</h3>
                <p className="text-gray-500 mb-6">
                  {viewMode === 'all' 
                    ? "You don't have any tasks yet. Create your first task to get started!"
                    : `No tasks match the "${viewModeOptions.find(opt => opt.value === viewMode)?.label}" filter.`
                  }
                </p>
                <button
                  onClick={() => setIsTaskModalOpen(true)}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Create your first task
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-600">
                    Showing {filteredTasks.length} of {tasks.length} tasks
                  </p>
                  {viewMode !== 'all' && (
                    <button
                      onClick={() => setViewMode('all')}
                      className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      View all tasks
                    </button>
                  )}
                </div>
                
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleTaskEdit}
                    onDelete={handleTaskDelete}
                    onToggleComplete={handleTaskToggleComplete}
                  />
                ))}
              </>
            )}
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

export default Todo;