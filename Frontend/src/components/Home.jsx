import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Modal from './Modal';
import CreatePlannerModal from './CreatePlannerModal';
import { Outlet } from 'react-router-dom';

const Home = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreatePlanner = (plannerData) => {
    console.log('Creating planner:', plannerData);
    // Handle planner creation logic here
    setIsCreateModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <Navbar />
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
        <CreatePlannerModal
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreatePlanner}
        />
      </Modal>
    </div>
  );
};

export default Home;