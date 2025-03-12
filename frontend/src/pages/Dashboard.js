import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';
import io from 'socket.io-client';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Initial data fetch
    fetchCryptoData();

    // Set up WebSocket connection
    const socket = io(process.env.REACT_APP_SOCKET_URL);
    socket.on('cryptoUpdate', handleCryptoUpdate);

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchCryptoData = async () => {
    try {
      const response = await axios.get('/api/crypto/prices');
      setCryptoData(response.data);
      updateChartData(response.data);
    } catch (error) {
      console.error('Error fetching crypto data:', error);
    }
  };

  const handleCryptoUpdate = (data) => {
    setCryptoData((prev) => {
      const updated = [...prev];
      const index = updated.findIndex((item) => item.symbol === data.symbol);
      if (index !== -1) {
        updated[index] = data;
      }
      return updated;
    });
  };

  const updateChartData = (data) => {
    const crypto = data.find((item) => item.symbol === selectedCrypto);
    if (!crypto) return;

    setChartData({
      labels: crypto.history.map((item) => new Date(item.timestamp).toLocaleTimeString()),
      datasets: [
        {
          label: `${selectedCrypto} Price`,
          data: crypto.history.map((item) => item.price),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Market Overview */}
        <div className="col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Market Overview
          </h2>
          <div className="h-96">
            <Line data={chartData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Price History',
                },
              },
            }} />
          </div>
        </div>

        {/* Crypto List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Cryptocurrencies
          </h2>
          <div className="space-y-4">
            {cryptoData.map((crypto) => (
              <div
                key={crypto.symbol}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => setSelectedCrypto(crypto.symbol)}
              >
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {crypto.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {crypto.symbol}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 dark:text-white">
                    ${crypto.price.toFixed(2)}
                  </p>
                  <p
                    className={`text-sm ${
                      crypto.change24h >= 0
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {crypto.change24h >= 0 ? '+' : ''}
                    {crypto.change24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 