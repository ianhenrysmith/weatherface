import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format, addHours } from 'date-fns';

Chart.register(...registerables);

const HourlyTemperatureChart = ({ data }) => {
  const currentTime = new Date();

  const chartData = {
    labels: data.map((hour, index) => {
      const labelTime = addHours(currentTime, index);
      return format(labelTime, 'h aaa');
    }),
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
