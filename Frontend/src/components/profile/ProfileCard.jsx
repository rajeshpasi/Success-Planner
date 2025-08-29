import React from 'react';
import { EditIcon } from '../icons/CustomIcons';
import { formatMemberSince } from '../../data/settingsProfileMockData';

const ProfileCard = ({ user, onEditClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Profile Picture */}
      <div className="text-center mb-6">
        <div className="relative inline-block">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
          />
          <button 
            onClick={onEditClick}
            className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors"
          >
            <EditIcon className="w-3 h-3" />
          </button>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>

      {/* User Details */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
          <p className="text-gray-800 font-medium">{formatMemberSince(user.memberSince)}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${
            getStatusColor(user.accountStatus)
          }`}>
            {user.accountStatus}
          </span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Theme Preference</label>
          <p className="text-gray-800 font-medium capitalize">{user.preferences?.theme || 'Light'}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <button 
          onClick={onEditClick}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;