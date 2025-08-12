import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import MonthlyPlanner from './components/MonthlyPlanner';
import WeeklyPlanner from './components/WeeklyPlanner';
import YearlyPlanner from './components/YearlyPlanner';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="monthly" element={<MonthlyPlanner />} />
          <Route path="weekly" element={<WeeklyPlanner />} />
          <Route path="yearly" element={<YearlyPlanner />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;