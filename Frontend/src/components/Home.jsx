import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <Navbar />

      {/* Sidebar + Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-white hidden md:block">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="hero min-h-screen bg-base-200">
            <div className="hero-content">
              <h1 className="text-5xl font-bold">Welcome to Success Planner</h1>
              <p className="py-6">Your one-stop solution for planning and achieving your goals.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
