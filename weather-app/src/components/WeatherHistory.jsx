import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const WeatherHistory = () => {
  const [history, setHistory] = useState([]);
  const [location, setLocation] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/graphql', {
        params: {
          query: `
            query {
              getWeatherHistory(location: "${location}", fromDate: "${fromDate}", toDate: "${toDate}") {
                date
                temperature
                description
              }
            }
          `,
        },
      });
      setHistory(response.data.data.getWeatherHistory);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <div style={{ marginBottom: '1rem' }}>
        <TextField
          label="Location"
          variant="outlined"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ marginRight: '1rem', width: '200px' }}
        />
        <TextField
          type="date"
          label="From Date"
          variant="outlined"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          style={{ marginRight: '1rem', width: '200px' }}
        />
        <TextField
          type="date"
          label="To Date"
          variant="outlined"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          style={{ marginRight: '1rem', width: '200px' }}
        />
        <Button variant="contained" onClick={fetchHistory} color="primary">
          Fetch History
        </Button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Temperature (°C)</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((record, index) => (
            <TableRow key={index}>
              <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
              <TableCell>{record.temperature}</TableCell>
              <TableCell>{record.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default WeatherHistory;
