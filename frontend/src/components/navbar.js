//import React, { useState, useEffect } from "react";
//import { Link, useLocation, useNavigate } from "react-router-dom";
//import "../styles/navbar.css";
//
//const Navbar = () => {
//  const [showFilters, setShowFilters] = useState(false); // Para los filtros
//  const [showCategories, setShowCategories] = useState(false); // Desplegable de categorías
//  const [showRegions, setShowRegions] = useState(false); // Desplegable de regiones
//  const [showTypes, setShowTypes] = useState(false); // Desplegable de tipos de publicación
//  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de sesión
//  const [userData, setUserData] = useState(null); // Datos del usuario
//
//  const navigate = useNavigate();
//  const location = useLocation();
//
//  const categories = [
//    "Deporte", "Cultura", "Entretenimiento", "Política", "Economía",
//    "Tecnología", "Ciencia", "Salud", "Medio ambiente", "Educación",
//    "Música", "Arte", "Cine", "Teatro", "Danza", "Relajación",
//  ];
//
//  const regions = [
//    "Arica y Parinacota", "Tarapacá", "Antofagasta", "Atacama", "Coquimbo",
//    "Valparaíso", "Región Metropolitana", "O'Higgins", "Maule", "Ñuble",
//    "Biobío", "Araucanía", "Los Ríos", "Los Lagos", "Aysén", "Magallanes",
//  ];
//
//  // Efecto para verificar estado de sesión al cargar el componente
//  useEffect(() => {
//    checkAuthStatus();
//
//    const onAuthChange = () => checkAuthStatus();
//    window.addEventListener("authChange", onAuthChange);
//
//    return () => window.removeEventListener("authChange", onAuthChange);
//  }, []);
//
//  // Efecto para cerrar los menús al cambiar de ruta
//  useEffect(() => {
//    setShowFilters(false);
//  }, [location.pathname]);
//
//  // Función para verificar estado de autenticación
//  const checkAuthStatus = () => {
//    const token = localStorage.getItem("token");
//    const userStr = localStorage.getItem("user");
//
//    if (token && userStr) {
//      try {
//        const user = JSON.parse(userStr);
//        setIsLoggedIn(true);
//        setUserData(user);
//      } catch (error) {
//        console.error("Error al parsear los datos del usuario:", error);
//        setIsLoggedIn(false);
//        setUserData(null);
//      }
//    } else {
//      setIsLoggedIn(false);
//      setUserData(null);
//    }
//  };
//
//  const handlePublishClick = () => {
//    if (isLoggedIn) {
//      navigate("/publicar");
//    } else {
//      alert("Debes iniciar sesión para publicar un evento.");
//      navigate("/login");
//    }
//  };
//
//  const handleProfileClick = () => {
//    if (isLoggedIn) {
//      navigate("/profile");
//    } else {
//      navigate("/login");
//    }
//  };
//
//  const handleLogout = () => {
//    localStorage.removeItem("token");
//    localStorage.removeItem("user");
//    setIsLoggedIn(false);
//    setUserData(null);
//    navigate("/");
//
//    // Notificar a otros componentes que el estado de sesión cambió
//    const event = new Event("authChange");
//    window.dispatchEvent(event);
//  };
//
//  return (
//    <>
//      <nav className="main-navbar">
//        <div className="navbar-content">
//          <div className="navbar-left">
//            <div
//              className="menu-icon"
//              onClick={() => setShowFilters(!showFilters)}
//              aria-label="Toggle filters"
//            >
//              <span></span>
//              <span></span>
//              <span></span>
//            </div>
//          </div>
//
//          <Link to="/" className="navbar-brand-center">
//            ChilExplora!
//          </Link>
//
//          <div className="nav-buttons">
//            <Link to="/about" className="nav-button">
//              Sobre nosotros
//            </Link>
//
//            <button
//              className="nav-button"
//              onClick={handlePublishClick}
//              aria-label={isLoggedIn ? "Publicar" : "Publica con nosotros"}
//            >
//              {isLoggedIn ? "Publicar" : "Publica con nosotros"}
//            </button>
//
//            {isLoggedIn ? (
//              <>
//                <button
//                  className="nav-button"
//                  onClick={handleProfileClick}
//                  aria-label="Mi perfil"
//                >
//                  {userData?.name || "Mi perfil"}
//                </button>
//                <button
//                  className="nav-button"
//                  onClick={handleLogout}
//                  aria-label="Cerrar sesión"
//                >
//                  Cerrar sesión
//                </button>
//              </>
//            ) : (
//              <>
//                <Link to="/login" className="nav-button">
//                  Iniciar sesión
//                </Link>
//                <Link to="/register" className="nav-button">
//                  Registrarse
//                </Link>
//              </>
//            )}
//          </div>
//        </div>
//      </nav>
//
//      {showFilters && (
//        <div className="sidebar">
//          <h3>Filtros</h3>
//          <div className="filter-section">
//            <strong
//              className="clickable-header"
//              onClick={() => setShowCategories(!showCategories)}
//            >
//              Categorías:
//            </strong>
//            {showCategories && (
//              <ul>
//                {categories.map((category, index) => (
//                  <li key={index}>{category}</li>
//                ))}
//              </ul>
//            )}
//          </div>
//
//          <div className="filter-section">
//            <strong
//              className="clickable-header"
//              onClick={() => setShowRegions(!showRegions)}
//            >
//              Regiones:
//            </strong>
//            {showRegions && (
//              <ul>
//                {regions.map((region, index) => (
//                  <li key={index}>{region}</li>
//                ))}
//              </ul>
//            )}
//          </div>
//
//          <div className="filter-section">
//            <strong
//              className="clickable-header"
//              onClick={() => setShowTypes(!showTypes)}
//            >
//              Tipo de publicación:
//            </strong>
//            {showTypes && (
//              <ul>
//                <li>Panoramas</li>
//                <li>Eventos</li>
//                <li>Favoritos</li>
//              </ul>
//            )}
//          </div>
//        </div>
//      )}
//
//      <div style={{ height: "64px" }}></div>
//    </>
//  );
//};
//
//export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

const Navbar = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showRegions, setShowRegions] = useState(false);
  const [showTypes, setShowTypes] = useState(false);

  const { isLoggedIn, userData, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
    "Deporte",
    "Cultura",
    "Entretenimiento",
    "Política",
    "Economía",
    "Tecnología",
    "Ciencia",
    "Salud",
    "Medio ambiente",
    "Educación",
    "Música",
    "Arte",
    "Cine",
    "Teatro",
    "Danza",
    "Relajación",
  ];

  const regions = [
    "Arica y Parinacota",
    "Tarapacá",
    "Antofagasta",
    "Atacama",
    "Coquimbo",
    "Valparaíso",
    "Región Metropolitana",
    "O'Higgins",
    "Maule",
    "Ñuble",
    "Biobío",
    "Araucanía",
    "Los Ríos",
    "Los Lagos",
    "Aysén",
    "Magallanes",
  ];

  useEffect(() => {
    setShowFilters(false);
  }, [location.pathname]);

  const handlePublishClick = () => {
    if (isLoggedIn) {
      navigate("/publicar");
    } else {
      alert("Debes iniciar sesión para publicar un evento.");
      navigate("/login");
    }
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="main-navbar">
        <div className="navbar-content">
          <div className="navbar-left">
            <div
              className="menu-icon"
              onClick={() => setShowFilters(!showFilters)}
              aria-label="Toggle filters"
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <Link to="/" className="navbar-brand-center">
            ChilExplora!
          </Link>

          <div className="nav-buttons">
            <Link to="/about" className="nav-button">
              Sobre nosotros
            </Link>
            <Link to="/moderador" className="nav-button">
              Vista Moderador 🔒
            </Link>

            <button
              className="nav-button"
              onClick={handlePublishClick}
              aria-label={isLoggedIn ? "Publicar" : "Publica con nosotros"}
            >
              {isLoggedIn ? "Publicar" : "Publica con nosotros"}
            </button>

            {isLoggedIn ? (
              <>
                <button
                  className="nav-button"
                  onClick={handleProfileClick}
                  aria-label="Mi perfil"
                >
                  {userData?.name || "Mi perfil"}
                </button>
                <button
                  className="nav-button"
                  onClick={handleLogout}
                  aria-label="Cerrar sesión"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-button">
                  Iniciar sesión
                </Link>
                <Link to="/register" className="nav-button">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {showFilters && (
        <div className="sidebar">
          <h3>Filtros</h3>
          <div className="filter-section">
            <strong
              className="clickable-header"
              onClick={() => setShowCategories(!showCategories)}
            >
              Categorías:
            </strong>
            {showCategories && (
              <ul>
                {categories.map((category, index) => (
                  <li key={index}>{category}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="filter-section">
            <strong
              className="clickable-header"
              onClick={() => setShowRegions(!showRegions)}
            >
              Regiones:
            </strong>
            {showRegions && (
              <ul>
                {regions.map((region, index) => (
                  <li key={index}>{region}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="filter-section">
            <strong
              className="clickable-header"
              onClick={() => setShowTypes(!showTypes)}
            >
              Tipo de publicación:
            </strong>
            {showTypes && (
              <ul>
                <li>Panoramas</li>
                <li>Eventos</li>
                <li>Favoritos</li>
              </ul>
            )}
          </div>
        </div>
      )}

      <div style={{ height: "64px" }}></div>
    </>
  );
};

export default Navbar;
