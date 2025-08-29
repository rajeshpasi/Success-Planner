import React from 'react';

const ProgressChart = ({ data, title, type = 'bar' }) => {
  const maxValue = Math.max(...data.map(item => item.value));

  if (type === 'line') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
        <div className="h-48 flex items-end justify-between gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full h-32 relative">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polyline
                    points={data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - (d.value / maxValue) * 100}`).join(' ')}
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="2"
                    className="drop-shadow-sm"
                  />
                  {data.map((d, i) => (
                    <circle
                      key={i}
                      cx={(i / (data.length - 1)) * 100}
                      cy={100 - (d.value / maxValue) * 100}
                      r="3"
                      fill="#4f46e5"
                      className="drop-shadow-sm"
                    />
                  ))}
                </svg>
              </div>
              <span className="text-xs text-gray-600 mt-2">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-20 text-sm text-gray-600 font-medium">
              {item.label}
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              ></div>
            </div>
            <div className="w-12 text-sm font-semibold text-gray-800 text-right">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressChart;