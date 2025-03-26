// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import pb from './pocketbase';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = pb.authStore.isValid;

  return isAuthenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
