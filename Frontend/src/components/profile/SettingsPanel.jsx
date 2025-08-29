import React, { useState } from 'react';
import { CloseIcon } from '../icons/SimpleIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faErlang, faSquareViadeo, faSquareFontAwesome, faExpeditedssl } from '@fortawesome/free-brands-svg-icons';
import ToggleSwitch from './ToggleSwitch';
import { ThemeMode, DefaultView } from '../../data/settingsProfileMockData';

const SettingsPanel = ({ 
  preferences, 
  isOpen, 
  onClose, 
  onPreferencesChange,
  onSecurityAction 
}) => {
  const [activeTab, setActiveTab] = useState('preferences');
  const [localPreferences, setLocalPreferences] = useState(preferences || {});

  const handlePreferenceChange = (key, value) => {
    const updated = { ...localPreferences, [key]: value };
    setLocalPreferences(updated);
    if (onPreferencesChange) {
      onPreferencesChange(updated);
    }
  };

  const tabs = [
    { id: 'preferences', label: 'Preferences', icon: faErlang },
    { id: 'notifications', label: 'Notifications', icon: faSquareViadeo },
    { id: 'security', label: 'Security', icon: faExpeditedssl }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 modal-backdrop flex items-start justify-end z-50 pt-16 pr-4">
      <div className="bg-white rounded-xl shadow-xl w-96 max-h-[80vh] overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon 
              icon={faErlang} 
              className="text-indigo-600"
              style={{ fontSize: '20px' }}
            />
            <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-white">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-3 py-3 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
                  : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <FontAwesomeIcon icon={tab.icon} style={{ fontSize: '14px' }} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-96">
          {activeTab === 'preferences' && (
            <div className="p-4 space-y-6">
              {/* Theme Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
                <div className="space-y-2">
                  {[
                    { key: ThemeMode.LIGHT, label: 'Light', icon: faSquareViadeo },
                    { key: ThemeMode.DARK, label: 'Dark', icon: faSquareFontAwesome }
                  ].map(theme => (
                    <button
                      key={theme.key}
                      onClick={() => handlePreferenceChange('theme', theme.key)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                        localPreferences.theme === theme.key
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <FontAwesomeIcon 
                        icon={theme.icon} 
                        style={{ fontSize: '16px' }}
                      />
                      <span className="font-medium">{theme.label}</span>
                      {localPreferences.theme === theme.key && (
                        <div className="ml-auto w-2 h-2 bg-indigo-500 rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Default View */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Default View</label>
                <select
                  value={localPreferences.defaultView || DefaultView.LIST}
                  onChange={(e) => handlePreferenceChange('defaultView', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value={DefaultView.LIST}>List View</option>
                  <option value={DefaultView.CALENDAR}>Calendar View</option>
                  <option value={DefaultView.GRID}>Grid View</option>
                </select>
              </div>

              {/* Auto-save */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Auto-save</label>
                  <p className="text-sm text-gray-500">Automatically save changes</p>
                </div>
                <ToggleSwitch
                  checked={localPreferences.autoSave || false}
                  onChange={(checked) => handlePreferenceChange('autoSave', checked)}
                />
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="p-4 space-y-4">
              {/* Email Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Email Notifications</label>
                  <p className="text-sm text-gray-500">Receive email notifications</p>
                </div>
                <ToggleSwitch
                  checked={localPreferences.notifications || false}
                  onChange={(checked) => handlePreferenceChange('notifications', checked)}
                />
              </div>

              {/* Push Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Push Notifications</label>
                  <p className="text-sm text-gray-500">Browser push notifications</p>
                </div>
                <ToggleSwitch
                  checked={localPreferences.pushNotifications || false}
                  onChange={(checked) => handlePreferenceChange('pushNotifications', checked)}
                />
              </div>

              {/* Task Reminders */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Task Reminders</label>
                  <p className="text-sm text-gray-500">Reminders for upcoming tasks</p>
                </div>
                <ToggleSwitch
                  checked={localPreferences.taskReminders || false}
                  onChange={(checked) => handlePreferenceChange('taskReminders', checked)}
                />
              </div>

              {/* Weekly Reports */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Weekly Reports</label>
                  <p className="text-sm text-gray-500">Weekly progress summaries</p>
                </div>
                <ToggleSwitch
                  checked={localPreferences.weeklyReports || false}
                  onChange={(checked) => handlePreferenceChange('weeklyReports', checked)}
                />
              </div>

              {/* Monthly Reports */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Monthly Reports</label>
                  <p className="text-sm text-gray-500">Monthly analytics reports</p>
                </div>
                <ToggleSwitch
                  checked={localPreferences.monthlyReports || false}
                  onChange={(checked) => handlePreferenceChange('monthlyReports', checked)}
                />
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="p-4 space-y-3">
              {/* Change Password */}
              <button 
                onClick={() => onSecurityAction && onSecurityAction('changePassword')}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="text-left">
                  <p className="font-medium text-gray-800">Change Password</p>
                  <p className="text-sm text-gray-600">Update your account password</p>
                </div>
                <span className="text-gray-400">→</span>
              </button>

              {/* Two-Factor Authentication */}
              <button 
                onClick={() => onSecurityAction && onSecurityAction('enable2FA')}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="text-left">
                  <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600">Add an extra layer of security</p>
                </div>
                <span className="text-gray-400">→</span>
              </button>

              {/* Delete Account */}
              <button 
                onClick={() => onSecurityAction && onSecurityAction('deleteAccount')}
                className="w-full flex items-center justify-between p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-red-600"
              >
                <div className="text-left">
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm">Permanently delete your account</p>
                </div>
                <span className="text-red-400">→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;