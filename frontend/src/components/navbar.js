import React from 'react';
import { Container } from 'react-bootstrap';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <Container fluid>
        <a className="navbar-brand" href="#">
          ☰
        </a>

        <a className="navbar-brand-center" href="#">
          ChilExplora!
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
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
      </Container>
    </nav>
  );
};

export default Navbar;
