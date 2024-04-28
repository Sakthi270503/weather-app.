import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Make a GET request to fetch weather data from an API
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=London&appid=d6708a6a0476c5e3c452ba3616ee5ec0');
        
        // Set the weather data in state
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        // If an error occurs, set the error state
        setError(error);
        setLoading(false);
      }
    };

    // Call the fetchWeatherData function when the component mounts
    fetchWeatherData();
  }, []); // Empty dependency array ensures the effect runs only once

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Loading...</p>
        </header>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Error: {error.message}</p>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Weather Data</h1>
        {weatherData && (
          <div>
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <p>Temperature: {weatherData.main.temp} °C</p>
            <p>Weather: {weatherData.weather[0].main}</p>
            <p>Description: {weatherData.weather[0].description}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

