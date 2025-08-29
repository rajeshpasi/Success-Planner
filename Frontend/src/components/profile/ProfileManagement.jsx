import React, { useState } from 'react';
import { SettingsIcon, ChartIcon, TaskIcon, EditIcon } from '../icons/CustomIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBity } from '@fortawesome/free-brands-svg-icons';
import ProfileCard from './ProfileCard';
import StatCard from './StatCard';
import AchievementBadge from './AchievementBadge';
import SimpleChart from './SimpleChart';
import ToggleSwitch from './ToggleSwitch';
import { formatMemberSince } from '../../data/settingsProfileMockData';

const ProfileManagement = ({ user, userStats, onUserUpdate, onPreferencesChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    preferences: { ...user?.preferences }
  });

  const handleSaveProfile = () => {
    if (onUserUpdate) {
      onUserUpdate(formData);
    }
    setIsEditing(false);
  };

  const handlePreferenceChange = (key, value) => {
    const updatedPreferences = { ...formData.preferences, [key]: value };
    setFormData(prev => ({
      ...prev,
      preferences: updatedPreferences
    }));
    if (onPreferencesChange) {
      onPreferencesChange(updatedPreferences);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: TaskIcon },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon },
    { id: 'statistics', label: 'Statistics', icon: ChartIcon }
  ];

  const completionTrendData = userStats?.monthlyCompletionTrend?.map((value, index) => ({
    label: `M${index + 1}`,
    value
  })) || [];

  const categoryData = userStats?.tasksByCategory || [];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {/* Profile Picture */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <img
                src={user?.avatar || 'https://i.pravatar.cc/150?img=1'}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors">
                <EditIcon className="w-3 h-3" />
              </button>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{user?.name || 'John Doe'}</h3>
            <p className="text-sm text-gray-600">{user?.email || 'john@example.com'}</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                <button
                  onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isEditing
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{user?.name || 'John Doe'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{user?.email || 'john@example.com'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                  <p className="text-gray-800 font-medium">
                    {user?.memberSince ? formatMemberSince(user.memberSince) : 'January 2025'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Status</label>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {user?.accountStatus || 'Active'}
                  </span>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: user?.name || '',
                        email: user?.email || '',
                        preferences: { ...user?.preferences }
                      });
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              {/* General Preferences */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">General Preferences</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
                    <div className="flex gap-4">
                      {['light', 'dark'].map(theme => (
                        <button
                          key={theme}
                          onClick={() => handlePreferenceChange('theme', theme)}
                          className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                            formData.preferences?.theme === theme
                              ? 'border-indigo-500 bg-indigo-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full ${
                            theme === 'light' ? 'bg-yellow-400' : 'bg-gray-800'
                          }`}></div>
                          <span className="font-medium capitalize">{theme}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Default View</label>
                    <select
                      value={formData.preferences?.defaultView || 'list'}
                      onChange={(e) => handlePreferenceChange('defaultView', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="list">List View</option>
                      <option value="calendar">Calendar View</option>
                      <option value="grid">Grid View</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email Notifications</label>
                      <p className="text-sm text-gray-500">Receive email notifications for important updates</p>
                    </div>
                    <ToggleSwitch
                      checked={formData.preferences?.notifications || false}
                      onChange={(checked) => handlePreferenceChange('notifications', checked)}
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => onPreferencesChange && onPreferencesChange(formData.preferences)}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'statistics' && (
            <div className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                  title="Total Tasks"
                  value={userStats?.totalTasks || 247}
                  icon="📋"
                  color="indigo"
                />
                <StatCard
                  title="Completed"
                  value={userStats?.completedTasks || 189}
                  icon="✅"
                  color="green"
                />
                <StatCard
                  title="Completion Rate"
                  value={`${userStats?.completionRate || 76}%`}
                  icon="📊"
                  color="blue"
                />
                <StatCard
                  title="Overdue"
                  value={userStats?.overdueTask || 8}
                  icon="⚠️"
                  color="red"
                />
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SimpleChart
                  data={completionTrendData}
                  title="Completion Trend (Last 6 Months)"
                  type="line"
                />
                
                <SimpleChart
                  data={categoryData}
                  title="Tasks by Category"
                  type="bar"
                />
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {userStats?.achievements?.map((achievement, index) => (
                    <AchievementBadge key={achievement.id} achievement={achievement} />
                  )) || [
                    { id: '1', title: 'Task Master', description: 'Completed 100+ tasks', icon: '🏆', earnedDate: new Date('2025-01-10') },
                    { id: '2', title: 'Streak Champion', description: '7-day completion streak', icon: '🎯', earnedDate: new Date('2025-01-12') },
                    { id: '3', title: 'Early Bird', description: 'Completed tasks before due date', icon: '⚡', earnedDate: new Date('2025-01-08') }
                  ].map((achievement, index) => (
                    <AchievementBadge key={achievement.id} achievement={achievement} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;