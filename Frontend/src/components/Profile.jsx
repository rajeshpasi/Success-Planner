import React, { useState } from 'react';
import { SettingsIcon, ChartIcon, TaskIcon, EditIcon } from './icons/CustomIcons';
import ProgressChart from './common/ProgressChart';
import { mockStore, mockQuery } from '../data/plannerMockData';

const Profile = () => {
  const [user, setUser] = useState(mockStore.user);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    preferences: { ...user.preferences }
  });
  const [activeTab, setActiveTab] = useState('profile');

  const stats = mockQuery.userStats;

  const handleSaveProfile = () => {
    setUser(prev => ({ ...prev, ...formData }));
    setIsEditing(false);
  };

  const handlePreferenceChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: value }
    }));
  };

  const completionTrendData = stats.monthlyCompletionTrend.map((value, index) => ({
    label: `Month ${index + 1}`,
    value
  }));

  const categoryData = [
    { label: 'Work', value: 45 },
    { label: 'Personal', value: 25 },
    { label: 'Health', value: 15 },
    { label: 'Finance', value: 10 },
    { label: 'Education', value: 5 }
  ];

  const tabs = [
    { id: 'profile', label: 'Profile', icon: TaskIcon },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon },
    { id: 'statistics', label: 'Statistics', icon: ChartIcon }
  ];

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
                src={user.avatar}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors">
                <EditIcon className="w-3 h-3" />
              </button>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
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
                    <p className="text-gray-800 font-medium">{user.name}</p>
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
                    <p className="text-gray-800 font-medium">{user.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                  <p className="text-gray-800 font-medium">January 2025</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Status</label>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: user.name,
                        email: user.email,
                        preferences: { ...user.preferences }
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
                            formData.preferences.theme === theme
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
                      value={formData.preferences.defaultView}
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
                    <button
                      onClick={() => handlePreferenceChange('notifications', !formData.preferences.notifications)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        formData.preferences.notifications ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.preferences.notifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setUser(prev => ({ ...prev, preferences: formData.preferences }))}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Security Settings</h2>
                
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="text-left">
                      <p className="font-medium text-gray-800">Change Password</p>
                      <p className="text-sm text-gray-600">Update your account password</p>
                    </div>
                    <span className="text-gray-400">→</span>
                  </button>

                  <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="text-left">
                      <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-600">Add an extra layer of security</p>
                    </div>
                    <span className="text-gray-400">→</span>
                  </button>

                  <button className="w-full flex items-center justify-between p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-red-600">
                    <div className="text-left">
                      <p className="font-medium">Delete Account</p>
                      <p className="text-sm">Permanently delete your account and data</p>
                    </div>
                    <span className="text-red-400">→</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'statistics' && (
            <div className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Tasks</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.totalTasks}</p>
                    </div>
                    <TaskIcon className="w-8 h-8 text-indigo-600" />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Completed</p>
                      <p className="text-2xl font-bold text-green-600">{stats.completedTasks}</p>
                    </div>
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Completion Rate</p>
                      <p className="text-2xl font-bold text-indigo-600">{stats.completionRate}%</p>
                    </div>
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-indigo-600">%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Overdue</p>
                      <p className="text-2xl font-bold text-red-600">{stats.overdueTask}</p>
                    </div>
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-red-600">!</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProgressChart
                  data={completionTrendData}
                  title="Completion Trend (Last 6 Months)"
                  type="line"
                />
                
                <ProgressChart
                  data={categoryData}
                  title="Tasks by Category"
                  type="bar"
                />
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">🏆</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Task Master</p>
                      <p className="text-sm text-gray-600">Completed 100+ tasks</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">🎯</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Streak Champion</p>
                      <p className="text-sm text-gray-600">7-day completion streak</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">⚡</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Early Bird</p>
                      <p className="text-sm text-gray-600">Completed tasks before due date</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;