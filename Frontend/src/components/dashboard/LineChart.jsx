import React from 'react';

const LineChart = ({ data, title }) => {
  const maxValue = Math.max(...data.map(item => item.progress));
  const minValue = Math.min(...data.map(item => item.progress));
  const range = maxValue - minValue;
  
  const getY = (value) => {
    return 80 - ((value - minValue) / range) * 60;
  };

  const pathData = data.map((item, index) => {
    const x = 20 + (index * 60);
    const y = getY(item.progress);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      
      <div className="relative">
        <svg viewBox="0 0 260 100" className="w-full h-32">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Line */}
          <path
            d={pathData}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {data.map((item, index) => {
            const x = 20 + (index * 60);
            const y = getY(item.progress);
            
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="#f59e0b"
                className="hover:r-6 transition-all duration-200"
                title={`${item.week}: ${item.progress}%`}
              />
            );
          })}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-2 px-5">
          {data.map((item, index) => (
            <span key={index} className="text-xs text-gray-600">
              {item.week}
            </span>
          ))}
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-32 flex flex-col justify-between text-xs text-gray-500">
          <span>{maxValue}</span>
          <span>{Math.round((maxValue + minValue) / 2)}</span>
          <span>{minValue}</span>
        </div>
      </div>
    </div>
  );
};

export default LineChart;