import React, { useState, useEffect } from 'react';
import { WorkIcon, HealthIcon, FinanceIcon, PersonalIcon, LearningIcon } from '../icons/SimpleIcons';

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    category: 'work',
    status: 'pending'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        priority: task.priority || 'medium',
        category: task.category || 'work',
        status: task.status || 'pending'
      });
    }
  }, [task]);

  const categories = [
    { id: 'work', label: 'Work', icon: WorkIcon },
    { id: 'personal', label: 'Personal', icon: PersonalIcon },
    { id: 'health', label: 'Health', icon: HealthIcon },
    { id: 'education', label: 'Education', icon: LearningIcon },
    { id: 'finance', label: 'Finance', icon: FinanceIcon }
  ];

  const priorities = [
    { id: 'low', label: 'Low Priority', color: 'text-green-600' },
    { id: 'medium', label: 'Medium Priority', color: 'text-orange-600' },
    { id: 'high', label: 'High Priority', color: 'text-red-600' }
  ];

  const statuses = [
    { id: 'pending', label: 'Pending' },
    { id: 'in_progress', label: 'In Progress' },
    { id: 'completed', label: 'Completed' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const taskData = {
      ...formData,
      dueDate: new Date(formData.dueDate),
      id: task?.id || `task-${Date.now()}`,
      createdAt: task?.createdAt || new Date()
    };

    onSubmit(taskData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Task Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Enter task title"
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Enter task description (optional)"
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
        />
      </div>

      {/* Starting Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
         Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => handleInputChange('dueDate', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.dueDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
        />
        {errors.dueDate && (
          <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
        <div className="grid grid-cols-5 gap-3">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => handleInputChange('category', category.id)}
                className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                  formData.category === category.id
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <IconComponent className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Priority and Status */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
          <select
            value={formData.priority}
            onChange={(e) => handleInputChange('priority', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {priorities.map(priority => (
              <option key={priority.id} value={priority.id}>{priority.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {statuses.map(status => (
              <option key={status.id} value={status.id}>{status.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          {task ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;