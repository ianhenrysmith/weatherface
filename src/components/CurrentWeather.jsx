import React from 'react';

const CurrentWeather = ({ data }) => {
  return (
    <div>
      <h2>Current Weather</h2>
      <p>Temperature: {data.temperature} °F</p>
      <p>Summary: {data.summary}</p>
    </div>
  );
};

export default CurrentWeather;
