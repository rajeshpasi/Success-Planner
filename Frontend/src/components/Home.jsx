import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Modal from './Modal';
import { Outlet } from 'react-router-dom';
import { mockStore } from '../data/settingsProfileMockData';
import TaskForm from './common/TaskForm';


const Home = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [user, setUser] = useState(mockStore.user);
  const [notifications, setNotifications] = useState(mockStore.notifications);

  const handleCreatePlanner = (plannerData) => {
    console.log('Creating planner:', plannerData);
    // Handle planner creation logic here
    setIsCreateModalOpen(false);
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

  const handlePreferencesChange = (preferences) => {
    setUser(prev => ({ ...prev, preferences }));
    console.log('Preferences updated:', preferences);
  };

  const handleSecurityAction = (action) => {
    console.log('Security action:', action);
    // Handle security actions like change password, enable 2FA, etc.
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <Navbar 
        user={user}
        notifications={notifications}
        onNotificationAction={handleNotificationAction}
        onPreferencesChange={handlePreferencesChange}
        onSecurityAction={handleSecurityAction}
      />
      {/* Sidebar + Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar onCreatePlannerClick={() => setIsCreateModalOpen(true)} />

        {/* Main Content */}
        <main className="flex-1 md:ml-64">
          <Outlet />
        </main>
      </div>

      {/* Create Planner Modal - Global */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Planner"
      >
        <TaskForm
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreatePlanner}
        />
      </Modal>
    </div>
  );
};

export default Home;