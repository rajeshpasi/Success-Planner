import React from 'react';

const Dashboard = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome to your Dashboard</h1>
          <p className="py-6">
            This is your success planner dashboard. Here you can see an overview of your yearly, monthly, and weekly plans, as well as your to-do list.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;