import React from 'react';

const StatCard = ({ title, value, icon, color = 'indigo', trend }) => {
  const getColorClasses = (color) => {
    const colors = {
      indigo: 'text-indigo-600 bg-indigo-100',
      green: 'text-green-600 bg-green-100',
      red: 'text-red-600 bg-red-100',
      yellow: 'text-yellow-600 bg-yellow-100',
      blue: 'text-blue-600 bg-blue-100',
      purple: 'text-purple-600 bg-purple-100'
    };
    return colors[color] || colors.indigo;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-xs font-medium ${
                trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend.direction === 'up' ? '↗' : '↘'} {trend.value}
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getColorClasses(color)}`}>
            {typeof icon === 'string' ? (
              <span className="text-xl">{icon}</span>
            ) : (
              React.cloneElement(icon, { className: 'w-6 h-6' })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;