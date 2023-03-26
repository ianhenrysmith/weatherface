import React from 'react';
import { Card } from 'react-bootstrap';
import { format } from 'date-fns';

const getWeatherEmoji = (summary) => {
  const summaryLowerCase = summary.toLowerCase();
  if (summaryLowerCase.includes('rain') || summaryLowerCase.includes('drizzle')) {
    return '🌧️';
  } else if (summaryLowerCase.includes('snow') || summaryLowerCase.includes('sleet')) {
    return '❄️';
  } else if (summaryLowerCase.includes('fog') || summaryLowerCase.includes('haze')) {
    return '🌫️';
  } else if (summaryLowerCase.includes('cloud') || summaryLowerCase.includes('overcast')) {
    return '☁️';
  } else if (summaryLowerCase.includes('sun') || summaryLowerCase.includes('clear')) {
    return '☀️';
  } else if (summaryLowerCase.includes('partly cloudy')) {
    return '🌤️';
  } else {
    return '🌦️';
  }
};


const TenDayForecast = ({ data }) => {
  return (
    <div>
      <h2 className="mb-4">Weekly Forecast</h2>
      <div className="card-group">
        {data.data.map((day, index) => (
          <Card key={index} className="mb-4">
            <Card.Body>
              <Card.Title>{format(new Date(day.time * 1000), 'EEE, MMM d')}</Card.Title>
              <Card.Text>
                <strong>{getWeatherEmoji(day.summary)}</strong> {day.summary}
              </Card.Text>
              <Card.Text>
                <strong>High:</strong> {day.temperatureHigh} °F
              </Card.Text>
              <Card.Text>
                <strong>Low:</strong> {day.temperatureLow} °F
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TenDayForecast;
