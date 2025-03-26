// src/components/Login.js
import React, { useState } from 'react';
import pb from '../pocketbase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await pb.collection('users').authWithPassword(email, password);
      // Rediriger ou mettre à jour l'état de l'application
      console.log('Connexion réussie');
    } catch (error) {
      console.error('Erreur de connexion :', error);
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
};

export default Login;
