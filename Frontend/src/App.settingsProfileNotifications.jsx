import React, { useState } from 'react';
import EnhancedNavbar from './components/profile/EnhancedNavbar';
import ProfileManagement from './components/profile/ProfileManagement';
import ProfileCard from './components/profile/ProfileCard';
import NotificationPanel from './components/profile/NotificationPanel';
import SettingsPanel from './components/profile/SettingsPanel';
import { mockStore, mockQuery, mockRootProps } from './data/settingsProfileMockData';

const SettingsProfileNotificationsApp = () => {
  const [user, setUser] = useState(mockStore.user);
  const [notifications, setNotifications] = useState(mockStore.notifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleUserUpdate = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
    console.log('User updated:', updatedData);
  };

  const handlePreferencesChange = (preferences) => {
    setUser(prev => ({ ...prev, preferences }));
    console.log('Preferences updated:', preferences);
  };

  const handleNotificationAction = (action, notificationId) => {
    if (action === 'markAsRead' && notificationId) {
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
      );
    } else if (action === 'markAllAsRead') {
      setNotifications(prev => 
        prev.map(n => ({ ...n, isRead: true }))
      );
    }
  };

  const handleSecurityAction = (action) => {
    console.log('Security action:', action);
    // Handle security actions like change password, enable 2FA, etc.
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Navbar with notifications and settings */}
      <EnhancedNavbar
        user={user}
        notifications={notifications}
        onNotificationAction={handleNotificationAction}
        onPreferencesChange={handlePreferencesChange}
        onSecurityAction={handleSecurityAction}
        showNotifications={showNotifications}
        showSettings={showSettings}
        onToggleNotifications={() => setShowNotifications(!showNotifications)}
        onToggleSettings={() => setShowSettings(!showSettings)}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Demo Controls */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Settings, Profile & Notifications Demo</h2>
          <p className="text-gray-600 mb-4">
            ✨ <strong>Click the notification bell or settings gear icons in the navbar above to open the panels!</strong>
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {showProfile ? 'Hide' : 'Show'} Profile Management
            </button>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {showNotifications ? 'Hide' : 'Show'} Notifications Panel
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {showSettings ? 'Hide' : 'Show'} Settings Panel
            </button>
          </div>
        </div>

        {/* Profile Cards Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <ProfileCard
            user={user}
            onEditClick={() => setShowProfile(true)}
          />
          
          {/* Duplicate profile card to show the design */}
          <ProfileCard
            user={user}
            onEditClick={() => setShowProfile(true)}
          />

          {/* Stats Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Tasks</span>
                <span className="font-semibold">{mockQuery.userStats.totalTasks}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Completed</span>
                <span className="font-semibold text-green-600">{mockQuery.userStats.completedTasks}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Completion Rate</span>
                <span className="font-semibold text-indigo-600">{mockQuery.userStats.completionRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Unread Notifications</span>
                <span className="font-semibold text-red-600">
                  {notifications.filter(n => !n.isRead).length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Full Profile Management */}
        {showProfile && (
          <div className="mb-8">
            <ProfileManagement
              user={user}
              userStats={mockQuery.userStats}
              onUserUpdate={handleUserUpdate}
              onPreferencesChange={handlePreferencesChange}
            />
          </div>
        )}

        {/* Notification Panel */}
        <NotificationPanel
          notifications={notifications}
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
          onMarkAsRead={(id) => handleNotificationAction('markAsRead', id)}
          onMarkAllAsRead={() => handleNotificationAction('markAllAsRead')}
          onNotificationClick={(notification) => console.log('Clicked notification:', notification)}
        />

        {/* Settings Panel */}
        <SettingsPanel
          preferences={user.preferences}
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          onPreferencesChange={handlePreferencesChange}
          onSecurityAction={handleSecurityAction}
        />

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500">
          <p>Settings, Profile & Notifications System Demo</p>
          <p className="text-sm mt-2">
            Features: Profile management, notification system, settings panel, theme switching, and statistics dashboard
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsProfileNotificationsApp;