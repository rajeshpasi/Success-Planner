import React from 'react';

const LineChart = ({ data, title }) => {
  const maxValue = 100; // Fixed range as per reference
  const minValue = 0;
  const range = maxValue - minValue;
  
  const getY = (value) => {
    return 160 - ((value - minValue) / range) * 120; // More height for better proportions
  };

  // Create smooth curve path using quadratic bezier curves
  const createSmoothPath = (data) => {
    if (data.length === 0) return '';
    
    const points = data.map((item, index) => ({
      x: 40 + (index * (400 / (data.length - 1))), // Full width distribution
      y: getY(item.progress)
    }));

    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prevPoint = points[i - 1];
      const currentPoint = points[i];
      
      // Create smooth curve using quadratic bezier
      const controlX = (prevPoint.x + currentPoint.x) / 2;
      path += ` Q ${controlX} ${prevPoint.y} ${currentPoint.x} ${currentPoint.y}`;
    }
    
    return path;
  };

  // Create area path for gradient fill
  const createAreaPath = (data) => {
    const smoothPath = createSmoothPath(data);
    const lastPoint = data[data.length - 1];
    const lastX = 40 + ((data.length - 1) * (400 / (data.length - 1)));
    
    return `${smoothPath} L ${lastX} 160 L 40 160 Z`;
  };

  const smoothPath = createSmoothPath(data);
  const areaPath = createAreaPath(data);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      
      <div className="relative">
        <svg viewBox="0 0 480 180" className="w-[100%] h-48">
          {/* Gradient definition for area fill */}
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFA500" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FFA500" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Background */}
          <rect width="100%" height="100%" fill="white" />
          
          {/* Horizontal grid lines */}
          <line x1="40" y1="40" x2="440" y2="40" stroke="#f3f4f6" strokeWidth="1" />
          <line x1="40" y1="64" x2="440" y2="64" stroke="#f3f4f6" strokeWidth="1" />
          <line x1="40" y1="88" x2="440" y2="88" stroke="#f3f4f6" strokeWidth="1" />
          <line x1="40" y1="112" x2="440" y2="112" stroke="#f3f4f6" strokeWidth="1" />
          <line x1="40" y1="136" x2="440" y2="136" stroke="#f3f4f6" strokeWidth="1" />
          <line x1="40" y1="160" x2="440" y2="160" stroke="#f3f4f6" strokeWidth="1" />
          
          {/* Area fill with gradient */}
          <path
            d={areaPath}
            fill="url(#areaGradient)"
          />
          
          {/* Smooth line */}
          <path
            d={smoothPath}
            fill="none"
            stroke="#FFA500"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {data.map((item, index) => {
            const x = 40 + (index * (400 / (data.length - 1)));
            const y = getY(item.progress);
            
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="#FFA500"
                stroke="white"
                strokeWidth="2"
                className="hover:r-5 transition-all duration-200"
                title={`${item.week}: ${item.progress}%`}
              />
            );
          })}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-3" style={{ paddingLeft: '40px', paddingRight: '40px' }}>
          {data.map((item, index) => (
            <span key={index} className="text-sm text-gray-600">
              {item.week}
            </span>
          ))}
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-48 flex flex-col justify-between text-sm text-gray-500 pr-2">
          <span>100</span>
          <span>80</span>
          <span>60</span>
          <span>40</span>
          <span>20</span>
          <span>0</span>
        </div>
      </div>
    </div>
  );
};

export default LineChart;