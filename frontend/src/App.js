import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Moderador from './pages/moderador';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moderador" element={<Moderador />} />
      </Routes>
    </Router>
  );
}

export default App;
