import React from 'react';
import { Card } from 'react-bootstrap';

const CurrentWeather = ({ data }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Current Weather</Card.Title>
        <Card.Text>
          <strong>Summary:</strong> {data.summary}
        </Card.Text>
        <Card.Text>
          <strong>Temperature:</strong> {data.temperature} °F
        </Card.Text>
        {/* Add more properties as needed */}
      </Card.Body>
    </Card>
  );
};

export default CurrentWeather;
