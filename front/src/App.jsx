// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import Dashboard from './DashBoard';
import PassagesList from './PassagesList';
import LicenceCheck from './LicenceCheck';
import ProtectedRoute from './ProtectedRoute';
import MainContent from './MainContent';

function App() {
  return (
    <Router>
      <MainContent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path="/passages"
            element={<ProtectedRoute element={<PassagesList />} />}
          />
          <Route
            path="/licence-check"
            element={<ProtectedRoute element={<LicenceCheck />} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </MainContent>
    </Router>
  );
}

export default App;
