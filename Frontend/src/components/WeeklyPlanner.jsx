import React, { useState, useMemo } from 'react';
import { TaskIcon } from './icons/CustomIcons';
import { PlusIcon, ChevronLeftIcon, ChevronRightIcon } from './icons/SimpleIcons';
import TaskCard from './common/TaskCard';
import TaskForm from './common/TaskForm';
import Modal from './Modal';
import { mockStore, formatWeekRange } from '../data/plannerMockData';

const WeeklyPlanner = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);
    return startOfWeek;
  });

  const [tasks, setTasks] = useState(mockStore.tasks);
  const [goals, setGoals] = useState(mockStore.weeklyGoals);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const weekDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + i);
      
      const dayTasks = tasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        return taskDate.toDateString() === date.toDateString();
      });

      days.push({
        date,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
        tasks: dayTasks,
        isToday: date.toDateString() === new Date().toDateString()
      });
    }
    return days;
  }, [currentWeekStart, tasks]);

  const weeklyStats = useMemo(() => {
    const weekTasks = tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      const weekEnd = new Date(currentWeekStart);
      weekEnd.setDate(currentWeekStart.getDate() + 6);
      return taskDate >= currentWeekStart && taskDate <= weekEnd;
    });

    const completed = weekTasks.filter(task => task.status === 'completed').length;
    const pending = weekTasks.filter(task => task.status === 'pending').length;
    const inProgress = weekTasks.filter(task => task.status === 'in_progress').length;

    return {
      total: weekTasks.length,
      completed,
      pending,
      inProgress,
      completionRate: weekTasks.length > 0 ? Math.round((completed / weekTasks.length) * 100) : 0
    };
  }, [tasks, currentWeekStart]);

  const navigateWeek = (direction) => {
    setCurrentWeekStart(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + (direction * 7));
      return newDate;
    });
  };

  const handleTaskSubmit = (taskData) => {
    if (selectedDay) {
      taskData.dueDate = selectedDay;
    }

    if (editingTask) {
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id ? { ...taskData, id: editingTask.id } : task
      ));
    } else {
      setTasks(prev => [...prev, taskData]);
    }
    setIsTaskModalOpen(false);
    setEditingTask(null);
    setSelectedDay(null);
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

  const handleAddTaskForDay = (date) => {
    setSelectedDay(date);
    setIsTaskModalOpen(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateWeek(-1)}
            className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-600"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Weekly Planner</h1>
            <p className="text-gray-600">{formatWeekRange(currentWeekStart)}</p>
          </div>
          <button
            onClick={() => navigateWeek(1)}
            className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-600"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-gray-800">{weeklyStats.total}</p>
            </div>
            <TaskIcon className="w-8 h-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{weeklyStats.completed}</p>
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
              <p className="text-2xl font-bold text-blue-600">{weeklyStats.inProgress}</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completion</p>
              <p className="text-2xl font-bold text-indigo-600">{weeklyStats.completionRate}%</p>
            </div>
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-indigo-600">%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Weekly Calendar */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-sm border p-4 min-h-[400px] ${
                  day.isToday ? 'border-indigo-500 bg-indigo-50' : 'border-gray-100'
                }`}
              >
                {/* Day Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className={`font-semibold ${day.isToday ? 'text-indigo-600' : 'text-gray-800'}`}>
                      {day.dayName}
                    </h3>
                    <p className={`text-2xl font-bold ${day.isToday ? 'text-indigo-600' : 'text-gray-600'}`}>
                      {day.dayNumber}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddTaskForDay(day.date)}
                    className="p-1 rounded-full bg-gray-100 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* Tasks for the day */}
                <div className="space-y-3">
                  {day.tasks.length === 0 ? (
                    <div className="text-center py-8">
                      <TaskIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No tasks</p>
                    </div>
                  ) : (
                    day.tasks.map(task => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={handleTaskEdit}
                        onDelete={handleTaskDelete}
                        onToggleComplete={handleTaskToggleComplete}
                        compact={true}
                      />
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Weekly Goals */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Goals</h3>
            <div className="space-y-4">
              {goals.map(goal => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{goal.title}</span>
                    <span className="text-sm text-gray-600">{goal.current}/{goal.target}</span>
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

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average per day</span>
                <span className="font-semibold text-gray-800">
                  {(weeklyStats.total / 7).toFixed(1)} tasks
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Most productive day</span>
                <span className="font-semibold text-gray-800">
                  {weekDays.reduce((max, day) => 
                    day.tasks.length > max.tasks.length ? day : max
                  ).dayName}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tasks remaining</span>
                <span className="font-semibold text-orange-600">
                  {weeklyStats.pending + weeklyStats.inProgress}
                </span>
              </div>
            </div>
          </div>

          {/* Today's Focus */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Focus</h3>
            <div className="space-y-3">
              {weekDays.find(day => day.isToday)?.tasks.slice(0, 3).map(task => (
                <div key={task.id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                  <div className={`w-2 h-2 rounded-full ${
                    task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                  }`}></div>
                  <span className="text-sm text-gray-700 flex-1">{task.title}</span>
                </div>
              )) || (
                <p className="text-sm text-gray-500 text-center py-4">
                  No tasks for today
                </p>
              )}
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
          setSelectedDay(null);
        }}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
      >
        <TaskForm
          task={editingTask}
          onSubmit={handleTaskSubmit}
          onCancel={() => {
            setIsTaskModalOpen(false);
            setEditingTask(null);
            setSelectedDay(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default WeeklyPlanner;