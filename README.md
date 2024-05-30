**Weather Application**
**Overview**
This Weather Application is a full-stack project that allows users to view current and historical weather data for various locations. The front-end is built with React and Material-UI, and the back-end uses Node.js, Express, and GraphQL to serve weather data from MongoDB and an external weather API.
Features
•	View Current Weather: Users can search for and view the current weather conditions for any location.
•	Historical Weather Data: Users can view historical weather data for selected locations within specified date ranges.
•	Dynamic Theme: The application's theme dynamically changes based on the current temperature of the searched location.
•	GraphQL API: Provides endpoints to fetch current weather, historical weather data, and weather forecasts.
**Technologies Used**
**Front-End**
•	React
•	Material-UI
•	React Router
•	Axios
**Back-End**
•	Node.js
•	Express
•	GraphQL
•	Mongoose (MongoDB)
•	Axios
•	dotenv
**Installation**
1.	Clone the repository:
sh
Copy code
git clone https://github.com/Adithyan121/weather-app.git
cd weather-app
2.	Install front-end dependencies:
sh
Copy code
cd client
npm install
3.	Install back-end dependencies:
sh
Copy code
cd server
npm install
4.	Set up environment variables: Create a .env file in the server directory and add the following:
env
Copy code
MONGO_URI=your_mongodb_connection_string
WEATHER_API_KEY=your_openweathermap_api_key
PORT=5000
5.	Start the server:
sh
Copy code
npm start
6.	Start the client:
sh
Copy code
cd client
npm start
Usage
Viewing Current Weather
•	On the home page, enter the desired location in the input field and click the "Search" button to view the current weather.
Viewing Historical Weather Data
•	Select a location from the dropdown menu.
•	Choose the date range using the date pickers.
•	Click the "Search" button to fetch and display historical weather data for the selected location and date range.

