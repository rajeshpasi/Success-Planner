import React from 'react';
import { SearchIcon, FilterIcon } from '../icons/CustomIcons';

const FilterSort = ({ 
  searchTerm, 
  onSearchChange, 
  filterCategory, 
  onFilterChange, 
  sortBy, 
  onSortChange,
  categories = ['all', 'work', 'personal', 'health', 'finance', 'education'],
  showSearch = true 
}) => {
  const sortOptions = [
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'createdAt', label: 'Created Date' },
    { value: 'title', label: 'Title' }
  ];

  const categoryLabels = {
    all: 'All Categories',
    work: 'Work',
    personal: 'Personal',
    health: 'Health',
    finance: 'Finance',
    education: 'Education',
    family: 'Family',
    other: 'Other'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Search */}
        {showSearch && (
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        )}

        {/* Filter by Category */}
        <div className="flex items-center gap-2">
          <FilterIcon className="w-4 h-4 text-gray-500" />
          <select
            value={filterCategory}
            onChange={(e) => onFilterChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white min-w-[140px]"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {categoryLabels[category] || category}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 whitespace-nowrap">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white min-w-[120px]"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSort;