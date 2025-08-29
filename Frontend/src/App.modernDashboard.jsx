import React from 'react';
import Dashboard from './components/Dashboard';

const ModernDashboardApp = () => {
  return (
    <div className="min-h-screen">
      {/* Modern Dashboard Showcase */}
      <Dashboard />
      
      {/* Footer */}
      <div className="relative z-10 text-center py-8 bg-gradient-to-r from-slate-50 to-blue-50">
        <p className="text-slate-600 font-medium">Modern Dashboard Design</p>
        <p className="text-sm text-slate-500 mt-2">
          Features: Glassmorphism effects, gradient backgrounds, smooth animations, and modern metrics
        </p>
      </div>
    </div>
  );
};

export default ModernDashboardApp;