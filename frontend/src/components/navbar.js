import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showCategories, setShowCategories] = useState(false); // Estado para desplegar categorías
  const [showRegions, setShowRegions] = useState(false); // Estado para desplegar regiones
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simula el estado de sesión
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
    setShowMenu(false);
    setShowFilters(false);
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlePublishClick = () => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirige al login si no hay sesión activa
    } else {
      navigate("/publicar");
    }
  };

  return (
    <>
      <nav className="main-navbar">
        <div className="navbar-content">
          <div className="navbar-left">
            <div className="menu-icon" onClick={() => setShowFilters(!showFilters)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <Link to="/" className="navbar-brand-center">
            ChilExplora!
          </Link>

          <div className={`nav-buttons ${isMenuOpen ? "active" : ""}`}>
            <Link to="/about" className="nav-button">
              Sobre nosotros
            </Link>

            <button className="nav-button" onClick={handlePublishClick}>
              Publica con nosotros
            </button>

            <div className="nav-button-container">
              <button
                className="nav-button profile-button"
                onClick={() => setShowMenu(!showMenu)}
                aria-expanded={showMenu}
              >
                <svg viewBox="0 0 24 24" className="profile-icon">
                  <path
                    fill="currentColor"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                  />
                </svg>
              </button>
              {showMenu && (
                <div className="dropdown-content">
                  <Link to="/login" className="dropdown-item">
                    Iniciar sesión
                  </Link>
                  <Link to="/register" className="dropdown-item">
                    Registrarse
                  </Link>
                  <Link to="/settings" className="dropdown-item">
                    Ajustes
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showFilters && (
        <div className="sidebar">
          <h3>Filtros</h3>

          {/* Categorías */}
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

          {/* Regiones */}
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

          {/* Tipo de publicación */}
          <div className="filter-section">
            <strong>Tipo de publicación:</strong>
            <ul>
              <li>Panoramas</li>
              <li>Eventos</li>
              <li>Favoritos</li>
            </ul>
          </div>
        </div>
      )}
      <div style={{ height: "64px" }}></div>
    </>
  );
};

export default Navbar;