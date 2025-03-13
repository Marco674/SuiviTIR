// src/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from './pocketbase';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="btn navbar-brand" onClick={() => navigate('/dashboard')}>Suivi TIR</span>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <span className="btn nav-link" onClick={() => navigate('/dashboard')}>Tableau de bord</span>
            </li>
            <li className="nav-item">
              <span className="btn nav-link" onClick={() => navigate('/passages')}>Historique des Passages</span>
            </li>
            <li className="nav-item">
              <span className="btn nav-link" onClick={() => navigate('/licence-check')}>Générateur d'Attestation</span>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="btn btn-secondary" onClick={handleLogout}>Se déconnecter</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
