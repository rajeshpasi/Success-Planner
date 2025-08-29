import React, { useState } from 'react';
import MonthlyPlanner from './components/MonthlyPlanner';
import WeeklyPlanner from './components/WeeklyPlanner';
import Todo from './components/Todo';
import Profile from './components/Profile';
import './index.css';

const App = () => {
  const [activeComponent, setActiveComponent] = useState('monthly');

  const components = {
    monthly: { component: MonthlyPlanner, title: 'Monthly Planner' },
    weekly: { component: WeeklyPlanner, title: 'Weekly Planner' },
    todo: { component: Todo, title: 'Todo List' },
    profile: { component: Profile, title: 'Profile' }
  };

  const ActiveComponent = components[activeComponent].component;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <img src="/favicon.png" alt="Logo" className="w-8 h-8 rounded-full" />
              <span className="font-bold text-lg text-indigo-700">Success Planner</span>
            </div>
            
            <div className="flex space-x-1">
              {Object.entries(components).map(([key, { title }]) => (
                <button
                  key={key}
                  onClick={() => setActiveComponent(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeComponent === key
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <ActiveComponent />
      </main>
    </div>
  );
};

export default App;