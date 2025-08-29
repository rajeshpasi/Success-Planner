import React, { useState } from 'react';
import { CheckIcon, EditIcon, DeleteIcon, MenuIcon } from '../icons/CustomIcons';
import { WorkIcon, HealthIcon, FinanceIcon, PersonalIcon, LearningIcon } from '../icons/SimpleIcons';
import { formatTaskDueDate, formatTaskPriority } from '../../data/plannerMockData';

const TaskCard = ({ task, onEdit, onDelete, onToggleComplete, compact = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'work': return WorkIcon;
      case 'health': return HealthIcon;
      case 'finance': return FinanceIcon;
      case 'personal': return PersonalIcon;
      case 'education': return LearningIcon;
      default: return WorkIcon;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'work': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'health': return 'bg-green-100 text-green-800 border-green-200';
      case 'finance': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'personal': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'education': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const IconComponent = getCategoryIcon(task.category);
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-300 ${compact ? 'p-3' : 'p-6'} ${task.status === 'completed' ? 'opacity-75' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          <div className="p-2 rounded-lg bg-gray-50 relative">
            <IconComponent className="w-5 h-5" color="#6B7280" />
            {task.status === 'completed' && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
            )}
          </div>
          <div className="flex-1">
            <h3 className={`font-semibold text-gray-800 ${compact ? 'text-sm' : 'text-lg'} ${task.status === 'completed' ? 'line-through' : ''}`}>
              {task.title}
            </h3>
            {task.description && !compact && (
              <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            )}
            <p className={`text-xs text-gray-500 mt-1 font-medium ${isOverdue ? 'text-red-600' : ''}`}>
              {formatTaskDueDate(task.dueDate)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`p-1 rounded-full transition-colors ${
              task.status === 'completed' 
                ? 'bg-green-100 text-green-600' 
                : 'bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-600'
            }`}
          >
            <CheckIcon className="w-4 h-4" />
          </button>
          
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
            >
              <MenuIcon className="w-4 h-4" />
            </button>
            
            {isMenuOpen && (
              <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-[120px]">
                <button
                  onClick={() => {
                    onEdit(task);
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <EditIcon className="w-3 h-3" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDelete(task.id);
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <DeleteIcon className="w-3 h-3" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(task.category)}`}>
            {task.category}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
            {formatTaskPriority(task.priority)}
          </span>
        </div>
        
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
          {task.status.replace('_', ' ')}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;