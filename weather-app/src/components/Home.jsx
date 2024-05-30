// Home.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Grid, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import WeatherDisplay from './WeatherDisplay';
import Slideshow from './Slideshow';

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: theme.spacing(4),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6">
            WeatherApp
          </Typography>
        </Toolbar>
      </AppBar>
      <Box className={classes.content}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <WeatherDisplay />
          </Grid>
          <Grid item xs={12} md={6}>
            <Slideshow />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
