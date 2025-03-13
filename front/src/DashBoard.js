// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import pb from './pocketbase';

const Dashboard = () => {
  const [chartData7Days, setChartData7Days] = useState({});
  const [chartData30Days, setChartData30Days] = useState({});

  useEffect(() => {
    const fetchData = async (days) => {
      try {
        const today = new Date();
        const pastDate = new Date(today);
        pastDate.setDate(today.getDate() - days);

        const records = await pb.collection('suiviTir').getFullList({
          filter: `date >= '${pastDate.toISOString()}'`,
        });

        const sums = records.reduce(
          (acc, record) => {
            if (record.pastir === '10M') acc.tenM += 1;
            if (record.pastir === '25M') acc.twentyFiveM += 1;
            if (record.pastir === '50M') acc.fiftyM += 1;
            return acc;
          },
          { tenM: 0, twentyFiveM: 0, fiftyM: 0 }
        );

        return {
          labels: ['10M', '25M', '50M'],
          datasets: [
            {
              label: `Nombre de passages (${days} jours)`,
              data: [sums.tenM, sums.twentyFiveM, sums.fiftyM],
              backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
            },
          ],
        };
      } catch (err) {
        console.error(`Erreur lors de la récupération des données pour ${days} jours :`, err);
        return {};
      }
    };

    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const data7Days = await fetchData(7);
      setChartData7Days(data7Days);
      
      await new Promise((resolve) => setTimeout(resolve, 300));

      const data30Days = await fetchData(30);
      setChartData30Days(data30Days);
    };

    loadData();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Bienvenue sur Suivi TIR</h1>
      <div className="row">
        <div className="col-md-6">
          <h3>Passages sur les pas de tir (7 derniers jours)</h3>
          {Object.keys(chartData7Days).length > 0 ? (
            <Bar data={chartData7Days} />
          ) : (
            <p>Chargement des données...</p>
          )}
        </div>
        <div className="col-md-6">
          <h3>Passages sur les pas de tir (30 derniers jours)</h3>
          {Object.keys(chartData30Days).length > 0 ? (
            <Bar data={chartData30Days} />
          ) : (
            <p>Chargement des données...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
