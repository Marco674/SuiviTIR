// src/LicenceCheck.js
import React, { useState } from 'react';
import pb from './pocketbase';
import { jsPDF } from 'jspdf';
import config from './config.json';

const LicenceCheck = () => {
  const [licence, setLicence] = useState('');
  const [nom, setNom] = useState('');
  const [pnom, setPnom] = useState('');
  const [message, setMessage] = useState('');
  const [messageClass, setMessageClass] = useState('');
  const [renewalMessage, setRenewalMessage] = useState('');
  const [renewalMessageClass, setRenewalMessageClass] = useState('');

  const resetMessages = () => {
    setMessage('');
    setMessageClass('');
    setRenewalMessage('');
    setRenewalMessageClass('');
  };

  const handleCheck = async () => {
    resetMessages();
    try {
      const today = new Date();
      const lastYear = new Date(today);
      lastYear.setFullYear(today.getFullYear() - 1);

      const records = await pb.collection('suiviTir').getFullList({
        filter: `licence = '${licence}' && date >= '${lastYear.toISOString()}'`,
      });

      const passageCount = records.length;

      if (passageCount < 3) {
        setMessage(`Les conditions pour une acquisition ne sont pas réunies. Le licencié a effectué ${passageCount} passages sur les 12 derniers mois.`);
        setMessageClass('alert alert-danger');
      } else {
        setMessage(`Le licencié a effectué ${passageCount} passages sur les 12 derniers mois. Les conditions pour une acquisition sont réunies.`);
        setMessageClass('alert alert-success');
      }
    } catch (err) {
      console.error('Erreur lors de la vérification des passages :', err);
      setMessage('Une erreur est survenue lors de la vérification des passages.');
      setMessageClass('alert alert-warning');
    }
  };

  const handleRenewalCheck = async () => {
    resetMessages();
    try {
      const today = new Date();
      const results = {};

      for (let i = 0; i < 5; i++) {
        const year = today.getFullYear() - i;
        const startDate = new Date(`${year}-01-01T00:00:00Z`);
        const endDate = new Date(`${year}-12-31T23:59:59Z`);

        const records = await pb.collection('suiviTir').getFullList({
          filter: `licence = '${licence}' && date >= '${startDate.toISOString()}' && date <= '${endDate.toISOString()}'`,
        });

        results[year] = records.length;
      }

      const minPassagesRequired = 5; // Exemple de nombre minimum de passages requis par année

      if (Object.values(results).every(count => count >= minPassagesRequired)) {
        setRenewalMessage(
          <div>
            {Object.entries(results).map(([year, count]) => (
              <p key={year} className="mb-1">{year}: {count} passages</p>
            ))}
            <p>Les conditions de renouvellement sont réunies.</p>
          </div>
        );
        setRenewalMessageClass('alert alert-success');
      } else {
        setRenewalMessage(
          <div>
            {Object.entries(results).map(([year, count]) => (
              <p key={year} className="mb-1">{year}: {count} passages</p>
            ))}
            <p>Les conditions de renouvellement ne sont pas réunies.</p>
          </div>
        );
        setRenewalMessageClass('alert alert-danger');
      }
    } catch (err) {
      console.error('Erreur lors de la vérification des passages pour le renouvellement :', err);
      setRenewalMessage('Une erreur est survenue lors de la vérification des passages pour le renouvellement.');
      setRenewalMessageClass('alert alert-warning');
    }
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    // En-tête avec différentes tailles de police
    console.log(doc.getFontList())
    doc.addImage(config.suivitir.logo, config.suivitir.logo_type, config.suivitir.logo_heigth, config.suivitir.logo_width, config.suivitir.logo_pos_x, config.suivitir.logo_pos_y);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(config.suivitir.header_title, config.suivitir.header_title_pos_x, config.suivitir.header_title_pos_y);

    doc.setFontSize(6);
    const headerText = config.suivitir.header_subtitle;
    doc.text(headerText, 202, 15, { align: 'right' });

    // Contenu principal
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    const title = config.suivitir.header_city + `, le ${new Date().toLocaleDateString()}   `;
    doc.text(title, 10, 60);
    const mainText = `

Je soussigné ${config.suivitir.responsible_name}, Président des ${config.suivitir.association}, atteste sur 
l'honneur que l'adhérent.e : ${nom} ${pnom}


Numéro de licence : ${licence}


A pratiqué le tir avec assiduité conformément au décret en vigueur.


Notre registre informatisé en atteste, une extraction est disponible sur demande.


Pour valoir ce que de droit

    `;
    doc.text(mainText, 10, 80);
    const footerText = `
${config.suivitir.responsible_name}
Président
    `;
    doc.text(footerText, 160, 180);

    // Enregistrer le PDF
    doc.save(`Attestation_Tir_${new Date().toLocaleDateString()}_${new Date().toLocaleTimeString().replace(/:/g, '-')}.pdf`);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Générateur d'Attestation</h1>
      <div className="mb-3">
      <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="form-control"
          placeholder="Nom"
        />
        <input
          type="text"
          value={pnom}
          onChange={(e) => setPnom(e.target.value)}
          className="form-control"
          placeholder="Prénom"
        />
        <input
          type="text"
          value={licence}
          onChange={(e) => setLicence(e.target.value)}
          className="form-control"
          placeholder="Entrez le numéro de licence"
        />
        <button className="btn btn-primary mt-2" onClick={handleCheck}>Acquisition (12 mois)</button>
        <button className="btn btn-secondary mt-2 ms-2" onClick={handleRenewalCheck}>Renouvellement (5 ans)</button>
        <button className="btn btn-success mt-2 ms-2" onClick={handleGeneratePDF}>Générer Attestation PDF</button>
      </div>
      {message && <p className={`mt-3 ${messageClass}`}>{message}</p>}
      {renewalMessage && <div className={`mt-3 ${renewalMessageClass}`}>{renewalMessage}</div>}
    </div>
  );
};

export default LicenceCheck;
