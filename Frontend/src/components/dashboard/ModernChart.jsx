import React from 'react';

const ModernChart = ({ data, title, type = 'bar', gradientFrom = 'from-blue-500', gradientTo = 'to-purple-600' }) => {
  const maxValue = Math.max(...data.map(item => item.value || item.tasks || item.progress || 0));

  const renderBarChart = () => {
    return (
      <div className="space-y-4">
        {data.map((item, index) => {
          const value = item.value || item.tasks || item.progress || 0;
          const label = item.day || item.category || item.week || `Item ${index + 1}`;
          const percentage = (value / maxValue) * 100;
          
          return (
            <div key={index} className="group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">{label}</span>
                <span className="text-sm font-bold text-slate-800">{value}</span>
              </div>
              <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg`}
                  style={{ width: `${percentage}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderPieChart = () => {
    const total = data.reduce((sum, item) => sum + (item.value || 0), 0);
    let cumulativePercentage = 0;

    return (
      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const strokeDasharray = `${percentage} ${100 - percentage}`;
              const strokeDashoffset = -cumulativePercentage;
              cumulativePercentage += percentage;
              
              const colors = [
                'stroke-blue-500',
                'stroke-purple-500', 
                'stroke-emerald-500',
                'stroke-amber-500',
                'stroke-rose-500'
              ];
              
              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="15.9155"
                  fill="transparent"
                  className={`${colors[index % colors.length]} transition-all duration-1000`}
                  strokeWidth="4"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">{total}</div>
              <div className="text-xs text-slate-500">Total</div>
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="ml-8 space-y-2">
          {data.map((item, index) => {
            const colors = [
              'bg-blue-500',
              'bg-purple-500',
              'bg-emerald-500', 
              'bg-amber-500',
              'bg-rose-500'
            ];
            
            return (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`}></div>
                <span className="text-sm text-slate-700">{item.category}</span>
                <span className="text-sm font-semibold text-slate-800">{item.value}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderLineChart = () => {
    const points = data.map((item, index) => {
      const value = item.progress || item.value || 0;
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (value / maxValue) * 80;
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="relative">
        <svg className="w-full h-64" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid Background */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
            </pattern>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          <rect width="100" height="100" fill="url(#grid)" />
          
          {/* Area Fill */}
          <polygon
            fill="url(#areaGradient)"
            points={`0,100 ${points} 100,100`}
            className="animate-pulse"
          />
          
          {/* Line */}
          <polyline
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            points={points}
            className="drop-shadow-sm"
          />
          
          {/* Data Points */}
          {data.map((item, index) => {
            const value = item.progress || item.value || 0;
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - (value / maxValue) * 80;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="2"
                fill="#ffffff"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                className="drop-shadow-sm hover:r-3 transition-all duration-200"
              />
            );
          })}
        </svg>
        
        {/* X-axis Labels */}
        <div className="flex justify-between mt-4 text-xs text-slate-600">
          {data.map((item, index) => (
            <span key={index}>
              {item.week || item.day || item.label || `P${index + 1}`}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          {title}
        </h3>
        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradientFrom} ${gradientTo} animate-pulse`}></div>
      </div>
      
      {type === 'pie' ? renderPieChart() : type === 'line' ? renderLineChart() : renderBarChart()}
    </div>
  );
};

export default ModernChart;