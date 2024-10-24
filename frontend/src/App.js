import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Moderador from './pages/moderador';
import Description from './pages/description';
import Login from './pages/login';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moderador" element={<Moderador />} />
        <Route path="/description/:id" element={<Description />} />   
        <Route path="/login" element={<Login />} />     
      </Routes>
    </Router>
  );
}

export default App;
