import React, { useState } from 'react';

const CreatePlanner = () => {
  const [plannerType, setPlannerType] = useState('');
  const [plannerName, setPlannerName] = useState('');
  const [description, setDescription] = useState('');

  const plannerTypes = [
    { value: 'yearly', label: 'Yearly Planner', description: 'Plan your goals and objectives for the entire year' },
    { value: 'monthly', label: 'Monthly Planner', description: 'Organize your tasks and events for a specific month' },
    { value: 'weekly', label: 'Weekly Planner', description: 'Schedule your week with detailed daily planning' },
    { value: 'todo', label: 'Todo List', description: 'Create a simple task list to track your activities' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Creating planner:', { plannerType, plannerName, description });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Planner</h1>
          <p className="text-gray-600 mb-8">Choose the type of planner you want to create and customize it to your needs.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Planner Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Select Planner Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plannerTypes.map((type) => (
                  <div
                    key={type.value}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                      plannerType === type.value
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPlannerType(type.value)}
                  >
                    <div className="flex items-center mb-2">
                      <input
                        type="radio"
                        name="plannerType"
                        value={type.value}
                        checked={plannerType === type.value}
                        onChange={(e) => setPlannerType(e.target.value)}
                        className="mr-3 text-indigo-600"
                      />
                      <h3 className="font-semibold text-gray-900">{type.label}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Planner Name */}
            <div>
              <label htmlFor="plannerName" className="block text-sm font-medium text-gray-700 mb-2">
                Planner Name
              </label>
              <input
                type="text"
                id="plannerName"
                value={plannerName}
                onChange={(e) => setPlannerName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter a name for your planner"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Describe the purpose or goals of this planner"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!plannerType || !plannerName}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Create Planner
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePlanner;