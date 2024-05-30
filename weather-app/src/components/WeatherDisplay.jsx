import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, TextField, Button, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

const WeatherDisplay = () => {
  // State variables for current weather
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("Kerala");
  const [inputLocation, setInputLocation] = useState("");

  // State variables for historical weather data
  const [historicalWeather, setHistoricalWeather] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Delhi");

  // Function to get weather emoji based on description
  const getWeatherEmoji = (description) => {
    if (description.includes('rain')) {
      return '🌧️';
    } else if (description.includes('sunny')) {
      return '☀️';
    } else if (description.includes('cloud')) {
      return '☁️';
    } else if (description.includes('snow')) {
      return '❄️';
    } else {
      return '🌈';
    }
  };

  // Function to fetch current weather data
  const fetchWeather = async () => {
    try {
      const response = await axios.get('http://localhost:5000/graphql', {
        params: {
          query: `
            query {
              getCurrentWeather(location: "${location}") {
                temperature
                description
              }
            }
          `,
        },
      });
      setWeather(response.data.data.getCurrentWeather);
    } catch (error) {
      console.error('Error fetching current weather data:', error);
    }
  };

  // Function to fetch historical weather data
  const fetchHistoricalWeather = async () => {
    try {
      const response = await axios.get('http://localhost:5000/graphql', {
        params: {
          query: `
            query {
              getHistoricalWeather(location: "${selectedLocation}", fromDate: "${fromDate}", toDate: "${toDate}") {
                date
                temperature
                description
              }
            }
          `,
        },
      });
      setHistoricalWeather(response.data.data.getHistoricalWeather);
    } catch (error) {
      console.error('Error fetching historical weather data:', error);
    }
  };

  // Function to handle location change
  const handleLocationChange = (e) => {
    setInputLocation(e.target.value);
  };

  // Function to handle search for current weather data
  const handleSearch = () => {
    setLocation(inputLocation);
  };

  // Function to handle search for historical weather data
  const handleSearchHistoricalData = () => {
    fetchHistoricalWeather();
  };

  // useEffect hook to fetch current weather data on location change
  useEffect(() => {
    fetchWeather();
  }, [location]);

  // useEffect hook to fetch historical weather data when fromDate, toDate, or selectedLocation changes
  useEffect(() => {
    if (fromDate && toDate && selectedLocation) {
      handleSearchHistoricalData();
    }
  }, [fromDate, toDate, selectedLocation]);

  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  // Dynamic theme based on temperature
  const theme = createTheme({
    palette: {
      primary: {
        main: weather && weather.temperature > 30 ? '#ff9800' : '#2196f3',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Card>
          <CardContent>
            <Typography variant="h4" color="primary" gutterBottom>
              Current Weather in {location}
            </Typography>
            <TextField
              label="Enter Location"
              variant="outlined"
              value={inputLocation}
              onChange={handleLocationChange}
              style={{ marginBottom: '1rem', width: '100%' }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              color="primary"
              style={{ width: '100%', marginTop: '1rem' }}
            >
              Search
            </Button>

            <Typography variant="subtitle1" gutterBottom>
              {currentDate} {currentTime}
            </Typography>
            {weather ? (
              <>
                <Typography variant="h4">{weather.temperature}°C {getWeatherEmoji(weather.description)}</Typography>
                <Typography>{weather.description}</Typography>
              </>
            ) : (
              <Typography>Loading...</Typography>
            )}

            <Typography variant="h4" color="primary" gutterBottom style={{ marginTop: '2rem' }}>
              Historical Weather Data
            </Typography>
            <TextField
              select
              label="Select Location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              style={{ marginBottom: '1rem', width: '100%' }}
            >
              {['Delhi', 'Moscow', 'Paris', 'New York', 'Sydney', 'Riyadh'].map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="From Date"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginBottom: '1rem', width: '100%' }}
            />
            <TextField
              label="To Date"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginBottom: '1rem', width: '100%' }}
            />
            <Button
              variant="contained"
              onClick={handleSearchHistoricalData}
              color="primary"
              style={{ width: '100%', marginTop: '1rem' }}
            >
              Search
            </Button>

            {historicalWeather ? (
              <div>
                {historicalWeather.map((data, index) => (
                  <div key={index} style={{ marginTop: '1rem' }}>
                    <Typography variant="subtitle1">{data.date}</Typography>
                    <Typography variant="h4">{data.temperature}°C</Typography>
                    <Typography>{data.description}</Typography>
                  </div>
                ))}
              </div>
            ) : (
              <Typography>No historical data available</Typography>
            )}
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default WeatherDisplay;
