import React from 'react';
import { formatMemberSince } from '../../data/settingsProfileMockData';

const AchievementBadge = ({ achievement }) => {
  const getBadgeColor = (index) => {
    const colors = [
      'bg-yellow-50 border-yellow-200 text-yellow-800',
      'bg-green-50 border-green-200 text-green-800',
      'bg-blue-50 border-blue-200 text-blue-800',
      'bg-purple-50 border-purple-200 text-purple-800',
      'bg-pink-50 border-pink-200 text-pink-800'
    ];
    return colors[index % colors.length];
  };

  const getIconBgColor = (index) => {
    const colors = [
      'bg-yellow-500',
      'bg-green-500',
      'bg-blue-500',
      'bg-purple-500',
      'bg-pink-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg border ${getBadgeColor(0)}`}>
      <div className={`w-10 h-10 ${getIconBgColor(0)} rounded-full flex items-center justify-center`}>
        <span className="text-white font-bold text-lg">{achievement.icon}</span>
      </div>
      <div>
        <p className="font-medium text-gray-800">{achievement.title}</p>
        <p className="text-sm text-gray-600">{achievement.description}</p>
        {achievement.earnedDate && (
          <p className="text-xs text-gray-500 mt-1">
            Earned {formatMemberSince(achievement.earnedDate)}
          </p>
        )}
      </div>
    </div>
  );
};

export default AchievementBadge;