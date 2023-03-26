import React from 'react';

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const TenDayForecast = ({ data }) => {
  return (
    <div>
      <h2>7-Day Forecast</h2>
      <ul>
        {data.data.slice(0, 10).map((day, index) => (
          <li key={index}>
            {formatDate(day.time)} - {day.summary} - Min: {day.temperatureMin} °F, Max: {day.temperatureMax} °F
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TenDayForecast;
