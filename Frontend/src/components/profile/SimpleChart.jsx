import React from 'react';

const SimpleChart = ({ data, title, type = 'bar' }) => {
  const maxValue = Math.max(...data.map(item => item.value || item.count || item));

  const renderBarChart = () => {
    return (
      <div className="space-y-3">
        {data.map((item, index) => {
          const value = item.value || item.count || item;
          const label = item.label || item.category || `Item ${index + 1}`;
          const percentage = (value / maxValue) * 100;
          
          return (
            <div key={index} className="flex items-center gap-3">
              <div className="w-16 text-sm text-gray-600 text-right">
                {label}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                <div 
                  className="bg-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="w-12 text-sm font-medium text-gray-800">
                {value}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderLineChart = () => {
    const points = data.map((item, index) => {
      const value = item.value || item.count || item;
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (value / maxValue) * 80; // 80% of height for padding
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="relative">
        <svg className="w-full h-32" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
          
          {/* Line */}
          <polyline
            fill="none"
            stroke="#4f46e5"
            strokeWidth="2"
            points={points}
            className="transition-all duration-500"
          />
          
          {/* Points */}
          {data.map((item, index) => {
            const value = item.value || item.count || item;
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - (value / maxValue) * 80;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="2"
                fill="#4f46e5"
                className="transition-all duration-500"
              />
            );
          })}
        </svg>
        
        {/* Labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          {data.map((item, index) => (
            <span key={index}>
              {item.label || item.category || `M${index + 1}`}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      {type === 'line' ? renderLineChart() : renderBarChart()}
    </div>
  );
};

export default SimpleChart;