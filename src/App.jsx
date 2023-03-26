import React, { useState, useEffect } from 'react';
import './App.css';
import CurrentWeather from './components/CurrentWeather';
import TenDayForecast from './components/TenDayForecast';

const apiKey = 'NaTgkdwBe37Y1r0JAHXlr1IoOskyKQkB7Brwngt0';
const latitude = '39.754667';
const longitude = '-105.027268';
const units = 'us';

function App() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetch(`https://api.pirateweather.net/forecast/${apiKey}/${latitude},${longitude}?units=${units}&extend=daily`)
      .then((response) => response.json())
      .then((data) => setWeatherData(data))
      .catch((error) => console.error('Error fetching weather data:', error));
  }, []);

  return (
    <div className="App">
      <h1>Weather App</h1>
      {weatherData ? (
        <>
          <CurrentWeather data={weatherData.currently} />
          <TenDayForecast data={weatherData.daily} />
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default App;
