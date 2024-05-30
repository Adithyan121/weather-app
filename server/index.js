// index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const weatherSchema = new mongoose.Schema({
  location: String,
  temperature: Number,
  description: String,
  date: Date,
});

const Weather = mongoose.model('Weather', weatherSchema);

const schema = buildSchema(`
  type Weather {
    id: ID!
    location: String!
    temperature: Float!
    description: String!
    date: String!
  }

  type Query {
    getCurrentWeather(location: String!): Weather
    getWeatherHistory(location: String!, fromDate: String!, toDate: String!): [Weather]
    getWeatherForecast(location: String!): [Weather]
  }
`);

const root = {
  getCurrentWeather: async ({ location }) => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API_KEY}&units=metric`);
    const data = response.data;
    const weather = new Weather({
      location,
      temperature: data.main.temp,
      description: data.weather[0].description,
      date: new Date(),
    });
    await weather.save();
    return weather;
  },
  getWeatherHistory: async ({ location, fromDate, toDate }) => {
    return Weather.find({ location, date: { $gte: new Date(fromDate), $lte: new Date(toDate) } });
  },
  getWeatherForecast: async ({ location }) => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.WEATHER_API_KEY}&units=metric`);
    const forecasts = response.data.list.map(item => ({
      location,
      temperature: item.main.temp,
      description: item.weather[0].description,
      date: new Date(item.dt * 1000),
    }));
    await Weather.insertMany(forecasts);
    return forecasts;
  },
};

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
