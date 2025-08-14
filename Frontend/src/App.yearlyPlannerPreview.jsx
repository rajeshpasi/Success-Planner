import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import YearlyPlanner from './components/YearlyPlanner';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<YearlyPlanner />} />
          <Route path="yearly" element={<YearlyPlanner />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;