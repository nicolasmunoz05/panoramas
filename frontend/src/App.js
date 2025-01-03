//import React from "react";
//import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import Home from "./pages/home";
//import Moderador from "./pages/moderador";
//import Description from "./pages/description";
//import Login from "./pages/login";
//import About from "./pages/about";
//import Register from "./pages/register";
//import PublicarEvent from "./pages/publicar";
//import ForgotPassword from "./pages/forgotPassword";
//
//function App() {
//  return (
//    <Router>
//      <Routes>
//        <Route path="/" element={<Home />} />
//        <Route path="/moderador" element={<Moderador />} />
//        <Route path="/description/:id" element={<Description />} />
//        <Route path="/login" element={<Login />} />
//        <Route path="/about" element={<About />} />
//        <Route path="/register" element={<Register />} />
//        <Route path="/publicar" element={<PublicarEvent/>} />
//        <Route path="/forgotPassword" element={<ForgotPassword />} />
//      </Routes>
//    </Router>
//  );
//}
//
//export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Home from "./pages/home";
import Moderador from "./pages/moderador";
import Description from "./pages/description";
import Login from "./pages/login";
import About from "./pages/about";
import Register from "./pages/register";
import PublicarEvent from "./pages/publicar";
import ForgotPassword from "./pages/forgotPassword";
import Profile from "./pages/profile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/moderador" element={<Moderador />} />
          <Route path="/description/:id" element={<Description />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/publicar" element={<PublicarEvent/>} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;