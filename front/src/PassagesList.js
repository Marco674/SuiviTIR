// src/PassagesList.js
import React, { useEffect, useState } from 'react';
import pb from './pocketbase';

const PassagesList = () => {
  const [passages, setPassages] = useState([]);
  const [filters, setFilters] = useState({ date: '', licence: '', pastir: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const records = await pb.collection('suiviTir').getFullList();
        setPassages(records);
      } catch (err) {
        console.error('Erreur lors de la récupération des passages :', err);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredPassages = passages.filter((passage) => {
    const passageLicence = String(passage.licence || '');
    return (
      (filters.date === '' || new Date(passage.date).toISOString().startsWith(filters.date)) &&
      (filters.licence === '' || passageLicence.includes(filters.licence)) &&
      (filters.pastir === '' || passage.pastir === filters.pastir)
    );
  });
  
  

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Liste des Passages</h1>
      <div className="mb-3 d-flex">
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="form-control me-2"
          placeholder="Date"
        />
        <input
          type="text"
          name="licence"
          value={filters.licence}
          onChange={handleFilterChange}
          className="form-control me-2"
          placeholder="Licence"
        />
        <select
          name="pastir"
          value={filters.pastir}
          onChange={handleFilterChange}
          className="form-select"
        >
          <option value="">Tous</option>
          <option value="10M">10M</option>
          <option value="25M">25M</option>
          <option value="50M">50M</option>
        </select>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Licence</th>
            <th>Pas de Tir</th>
          </tr>
        </thead>
        <tbody>
          {filteredPassages.map((passage) => (
            <tr key={passage.id}>
              <td>{new Date(passage.date).toLocaleDateString()}</td>
              <td>{passage.licence}</td>
              <td>{passage.pastir}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PassagesList;
