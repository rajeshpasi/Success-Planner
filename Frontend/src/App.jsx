import React from 'react';
import LandingPage from "./pages/Landing"
import './styles/scrollbar.css';
import {Route, Routes, Navigate } from 'react-router-dom';
import RegisterForm from './pages/RegisterForm';
import LoginForm from './pages/LoginForm';
import UserProtectWrapper from './pages/UserProtectWrapper';
import Logout from './pages/Logout';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import YearlyPlanner from './components/YearlyPlanner';
import MonthlyPlanner from './components/MonthlyPlanner';
import WeeklyPlanner from './components/WeeklyPlanner';
import Todo from './components/Todo';

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />

      {/* Protected routes with the Home layout */}
      <Route
        element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        }
      >
        {/* Redirect old /home route to /dashboard */}
        <Route path="/home" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/yearly" element={<YearlyPlanner />} />
        <Route path="/monthly" element={<MonthlyPlanner />} />
        <Route path="/weekly" element={<WeeklyPlanner />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/logout" element={<Logout />} />
      </Route>
    </Routes>
  );
};

export default App;