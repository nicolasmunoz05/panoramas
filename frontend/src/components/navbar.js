import React from 'react';
import { Row } from 'react-bootstrap';
import '../styles/navbar.css'

const Navbar = () => {
  return (
    <Row>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            ☰
          </a>
          <a className="navbar-brand-center" href="#">
            ChilExplora!
          </a>
          {/* Links Navbar */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Publica con Nosotros
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Iniciar Sesión
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Región
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </Row>
  );
}

export default Navbar;
