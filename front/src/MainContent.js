// src/MainContent.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const MainContent = ({ children }) => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <Navbar />}
      {children}
    </>
  );
};

export default MainContent;
