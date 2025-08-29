import React, { useState } from 'react';
import { CloseIcon } from '../icons/SimpleIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRockrms } from '@fortawesome/free-brands-svg-icons';
import NotificationItem from './NotificationItem';
import { formatNotificationTime } from '../../data/settingsProfileMockData';

const NotificationPanel = ({ 
  notifications = [], 
  isOpen, 
  onClose, 
  onMarkAsRead, 
  onMarkAllAsRead,
  onNotificationClick 
}) => {
  const [filter, setFilter] = useState('all'); // all, unread, read

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'read') return notification.isRead;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 modal-backdrop flex items-start justify-end z-50 pt-16 pr-4">
      <div className="bg-white rounded-xl shadow-xl w-96 max-h-[80vh] overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon 
              icon={faRockrms} 
              className="text-indigo-600"
              style={{ fontSize: '20px' }}
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-600">{unreadCount} unread</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex border-b border-gray-200 bg-white">
          {[
            { key: 'all', label: 'All', count: notifications.length },
            { key: 'unread', label: 'Unread', count: unreadCount },
            { key: 'read', label: 'Read', count: notifications.length - unreadCount }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                filter === tab.key
                  ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
                  : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Actions */}
        {unreadCount > 0 && (
          <div className="p-3 border-b border-gray-200 bg-gray-50">
            <button
              onClick={onMarkAllAsRead}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Mark all as read
            </button>
          </div>
        )}

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-96">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <FontAwesomeIcon 
                icon={faRockrms} 
                className="text-gray-300 mb-3"
                style={{ fontSize: '48px' }}
              />
              <p className="text-gray-500 font-medium">
                {filter === 'unread' ? 'No unread notifications' : 
                 filter === 'read' ? 'No read notifications' : 
                 'No notifications'}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                You're all caught up!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map(notification => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={onMarkAsRead}
                  onClick={onNotificationClick}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <button className="w-full text-sm text-indigo-600 hover:text-indigo-700 font-medium py-2">
            Notification Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;