import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showRegions, setShowRegions] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  // Reinicializa el estado al cambiar de ruta
  useEffect(() => {
    setShowMenu(false);
    setShowRegions(false);
    setIsMenuOpen(false);
  }, [location]);

  const regions = [
    "Arica y Parinacota",
    "Tarapacá",
    "Antofagasta",
    "Atacama",
    "Coquimbo",
    "Valparaíso",
    "Metropolitana",
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="main-navbar">
        <div className="navbar-content">
          <div className="navbar-left">
            <div className="menu-icon" onClick={toggleMenu}>
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

            <Link to="/publicar" className="nav-button">
              Publica con nosotros
            </Link>

            <div className="nav-button-container">
              <button
                className="nav-button"
                onClick={() => setShowRegions(!showRegions)}
                aria-expanded={showRegions}
              >
                Región
                <svg
                  className="chevron-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {showRegions && (
                <div className="dropdown-content">
                  {regions.map((region, index) => (
                    <div key={index} className="dropdown-item">
                      {region}
                    </div>
                  ))}
                </div>
              )}
            </div>

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
      <div style={{ height: "64px" }}></div>
    </>
  );
};

export default Navbar;
