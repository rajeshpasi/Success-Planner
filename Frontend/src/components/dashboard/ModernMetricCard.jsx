import React from 'react';
import { TrendUpIcon, TrendDownIcon } from '../icons/SimpleIcons';

const ModernMetricCard = ({ 
  title, 
  value, 
  trend, 
  icon: IconComponent,
  iconColor = "text-blue-500",
  gradientFrom = "from-blue-500",
  gradientTo = "to-purple-600"
}) => {
  const getTrendColor = (direction) => {
    switch (direction) {
      case 'up':
        return 'text-emerald-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-slate-500';
    }
  };

  const getTrendIcon = (direction) => {
    switch (direction) {
      case 'up':
        return <TrendUpIcon className="w-3 h-3" />;
      case 'down':
        return <TrendDownIcon className="w-3 h-3" />;
      default:
        return <span className="text-xs">→</span>;
    }
  };

  const getTrendBgColor = (direction) => {
    switch (direction) {
      case 'up':
        return 'bg-emerald-50 border-emerald-200';
      case 'down':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="group relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
      {/* Gradient Background Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      {/* Floating Orb Effect */}
      <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-full opacity-10 blur-xl group-hover:opacity-20 transition-opacity duration-300`}></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
            {IconComponent && (
              <IconComponent className="w-6 h-6 text-white" />
            )}
          </div>
          
          {/* Animated Pulse Indicator */}
          <div className="relative">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${gradientFrom} ${gradientTo} animate-pulse`}></div>
            <div className={`absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r ${gradientFrom} ${gradientTo} animate-ping opacity-75`}></div>
          </div>
        </div>
        
        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            {value}
          </p>
          
          {trend && (
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${getTrendBgColor(trend.direction)} ${getTrendColor(trend.direction)}`}>
              <span className="flex items-center justify-center w-4 h-4">
                {getTrendIcon(trend.direction)}
              </span>
              <span className="font-semibold">{trend.percentage}%</span>
              <span className="text-xs opacity-75">from {trend.timeframe}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernMetricCard;