import React, { useState, useEffect } from 'react';
import './App.css';
import CurrentWeather from './components/CurrentWeather';
import TenDayForecast from './components/TenDayForecast';
import HourlyTemperatureChart from './components/HourlyTemperatureChart';

import { Container, Row, Col } from 'react-bootstrap';

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
    <Container>
      <h1 className="text-center my-4">Weather App</h1>
      <Row>
        <Col>
          {weatherData ? (
            <>
              <CurrentWeather data={weatherData.currently} />
              <TenDayForecast data={weatherData.daily} />
              <HourlyTemperatureChart data={weatherData.hourly.data} />
            </>
          ) : (
            <p>Loading weather data...</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
