import React from 'react';
import { TrendUpIcon, TrendDownIcon } from '../icons/SimpleIcons';

const MetricCard = ({ 
  title, 
  value, 
  trend, 
  icon: IconComponent,
  iconColor = "text-blue-500" 
}) => {
  const getTrendColor = (direction) => {
    switch (direction) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getTrendIcon = (direction) => {
    switch (direction) {
      case 'up':
        return <TrendUpIcon className="w-3 h-3" />;
      case 'down':
        return <TrendDownIcon className="w-3 h-3" />;
      default:
        return <span>→</span>;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gray-50 ${iconColor}`}>
          {IconComponent && (
            <IconComponent className="w-6 h-6" />
          )}
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {trend && (
          <div className={`flex items-center text-sm ${getTrendColor(trend.direction)}`}>
            <span className="mr-1">{getTrendIcon(trend.direction)}</span>
            <span>{trend.percentage}% from {trend.timeframe}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;