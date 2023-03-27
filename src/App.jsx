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
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [weatherData, setWeatherData] = useState(null);

  const getUserLocation = () => {
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      localStorage.setItem('latitude', latitude);
      localStorage.setItem('longitude', longitude);
    };
  
    const error = () => {
      console.error('Unable to retrieve your location');
    };
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  };

  const fetchWeatherData = () => {
     fetch(`https://api.pirateweather.net/forecast/${apiKey}/${location.latitude},${location.longitude}?units=${units}&extend=daily`)
        .then((response) => response.json())
        .then((data) => setWeatherData(data))
        .catch((error) => console.error('Error fetching weather data:', error));
  }

  const clearSavedLocation = () => {
    // Clear location from localStorage
    localStorage.removeItem('latitude');
    localStorage.removeItem('longitude');
  
    // Clear location from state
    setLocation({ latitude: null, longitude: null });
  
    // Fetch the user's current location again
    getUserLocation();
  };

  useEffect(() => {
    const savedLatitude = localStorage.getItem('latitude');
    const savedLongitude = localStorage.getItem('longitude');
  
    if (savedLatitude && savedLongitude) {
      setLocation({ latitude: parseFloat(savedLatitude), longitude: parseFloat(savedLongitude) });
    } else {
      getUserLocation();
    }
  }, []);
  
  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetchWeatherData(location.latitude, location.longitude);
    }
  }, [location]);

  return (
    <Container>
      <h1 className="text-center my-4">Weatherface, the stupid simple weather app</h1>
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
      <Row>
        <Col>
          <div className="clear-location-button">
            <button onClick={clearSavedLocation}>Clear Saved Location</button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
