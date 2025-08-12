import React from 'react';

const BarChart = ({ data, title }) => {
  const maxValue = Math.max(...data.map(item => item.tasks));
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      
      <div className="flex items-end justify-between h-64 space-x-2">
        {data.map((item, index) => {
          const height = (item.tasks / maxValue) * 100;
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="w-full flex items-end justify-center mb-2" style={{ height: '200px' }}>
                <div
                  className="bg-blue-500 rounded-t-sm w-full max-w-12 transition-all duration-300 hover:bg-blue-600"
                  style={{ height: `${height}%` }}
                  title={`${item.day}: ${item.tasks} tasks`}
                />
              </div>
              <span className="text-xs text-gray-600 font-medium">{item.day}</span>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 mt-4">
        <span>0</span>
        <span>{Math.ceil(maxValue / 2)}</span>
        <span>{maxValue}</span>
      </div>
    </div>
  );
};

export default BarChart;