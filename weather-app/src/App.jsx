import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import WeatherDisplay from './components/WeatherDisplay';
import Home from './components/Home';

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
