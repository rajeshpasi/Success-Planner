import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRockrms, faErlang, faBity } from '@fortawesome/free-brands-svg-icons';
import NotificationPanel from './NotificationPanel';
import SettingsPanel from './SettingsPanel';
import Tooltip from '../common/Tooltip';

const EnhancedNavbar = ({ 
  user, 
  notifications = [], 
  onNotificationAction,
  onPreferencesChange,
  onSecurityAction,
  showNotifications,
  showSettings,
  onToggleNotifications,
  onToggleSettings
}) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Get the current route name from the location object and capitalize it.
  const path = location.pathname.substring(1);
  const routeName = path.charAt(0).toUpperCase() + path.slice(1) || "Dashboard";

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleNotificationClick = (notification) => {
    if (notification.actionUrl) {
      // Navigate to the action URL
      window.location.href = notification.actionUrl;
    }
    setShowNotifications(false);
  };

  const handleMarkAsRead = (notificationId) => {
    if (onNotificationAction) {
      onNotificationAction('markAsRead', notificationId);
    }
  };

  const handleMarkAllAsRead = () => {
    if (onNotificationAction) {
      onNotificationAction('markAllAsRead');
    }
  };

  return (
    <>
      <nav>
        <div className="flex items-center justify-between bg-white p-4 shadow-md">
          <div className="flex items-center gap-2">
            <img src="/favicon.png" alt="Logo" className="w-8 h-8 rounded-full" />
            <span className='hidden md:block ml-52 text-gray-600 text-md font-bold'>
              {routeName}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {/* Profile Info */}
            <div className="flex items-center gap-2">
              <img 
                src={user?.avatar || 'https://i.pravatar.cc/150?img=1'} 
                alt="Profile" 
                className="w-8 h-8 rounded-full border-2 border-gray-200"
              />
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">{user?.name || 'John Doe'}</p>
                <p className="text-xs text-gray-500">{user?.email || 'john@example.com'}</p>
              </div>
            </div>

            {/* Notifications */}
            <Tooltip message="Notifications" position="bottom">
              <button
                onClick={() => onToggleNotifications && onToggleNotifications()}
                className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <FontAwesomeIcon 
                  icon={faRockrms} 
                  style={{ fontSize: '18px' }}
                />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
            </Tooltip>

            {/* Settings */}
            <Tooltip message="Settings" position="bottom">
              <button
                onClick={() => onToggleSettings && onToggleSettings()}
                className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <FontAwesomeIcon 
                  icon={faErlang} 
                  style={{ fontSize: '18px' }}
                />
              </button>
            </Tooltip>
          </div>

          <button
            className="md:hidden text-indigo-700"
            onClick={() => setOpen(!open)}
            aria-label="Toggle Sidebar"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </nav>

    </>
  );
};

export default EnhancedNavbar;