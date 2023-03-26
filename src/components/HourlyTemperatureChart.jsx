import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
Chart.register(...registerables);

const HourlyTemperatureChart = ({ data }) => {
  const chartData = {
    labels: data.map((hour, index) => index),
    datasets: [
      {
        label: 'Next 48 Hours (°F)',
        data: data.map((hour) => hour.temperature),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Hourly Temperature</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default HourlyTemperatureChart;
