import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Puedes agregar más rutas aquí para otras páginas */}
      </Routes>
    </Router>
  );
}

export default App;
