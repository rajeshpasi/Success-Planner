import React from 'react';
import LandingPage from "./pages/Landing"
import './styles/scrollbar.css';
import {Route, Routes } from 'react-router-dom';
import RegisterForm from './pages/RegisterForm';
import LoginForm from './pages/LoginForm';
import Dashboard from './pages/Dashboard';
import UserProtectWrapper from './pages/UserProtectWrapper';
import Logout from './pages/Logout';
import Home from './components/Home';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/home" element={<UserProtectWrapper><Home /></UserProtectWrapper>} />
      <Route path="/dashboard" element={<UserProtectWrapper><Dashboard /></UserProtectWrapper>} />
      <Route path="/logout" element={<UserProtectWrapper><Logout /></UserProtectWrapper>} />
      {/* Add more routes as needed */}
      {/* <Route path="/profile" element={<UserProfile />} /> */}
      {/* <Route path="/settings" element={<Settings />} /> */}
      {/* <Route path="/about" element={<About />} /> */}
      {/* <Route path="/contact" element={<Contact />} /> */}

    </Routes>
  );
};

export default App;