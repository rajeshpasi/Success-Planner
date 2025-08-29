import React from 'react';
import { formatNotificationTime, formatPriorityBadge, NotificationPriority } from '../../data/settingsProfileMockData';

const NotificationItem = ({ notification, onMarkAsRead, onClick }) => {
  const handleClick = () => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
    if (onClick) {
      onClick(notification);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case NotificationPriority.URGENT:
        return 'bg-red-100 text-red-800 border-red-200';
      case NotificationPriority.HIGH:
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case NotificationPriority.MEDIUM:
        return 'bg-green-100 text-green-800 border-green-200';
      case NotificationPriority.LOW:
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'task_reminder':
        return '⏰';
      case 'task_completed':
        return '✅';
      case 'task_overdue':
        return '🚨';
      case 'weekly_summary':
        return '📊';
      case 'monthly_report':
        return '📈';
      case 'system_update':
        return '🔔';
      default:
        return '📢';
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
        !notification.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
          {getNotificationIcon(notification.type)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <p className={`text-sm font-medium ${
                !notification.isRead ? 'text-gray-900' : 'text-gray-700'
              }`}>
                {notification.title}
              </p>
              <p className={`text-sm mt-1 ${
                !notification.isRead ? 'text-gray-700' : 'text-gray-500'
              }`}>
                {notification.message}
              </p>
            </div>
            
            {/* Priority Badge */}
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
              getPriorityColor(notification.priority)
            }`}>
              {formatPriorityBadge(notification.priority)}
            </span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-500">
              {formatNotificationTime(notification.timestamp)}
            </p>
            
            {!notification.isRead && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-blue-600 font-medium">New</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;