import React, { useState } from 'react';
import { Container, Row, Carousel } from 'react-bootstrap';
import Slider from "react-slick";
import './home.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Función para alternar el menú hamburguesa
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Configuración del carrusel de noticias
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Container fluid>
      <Row>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">☰</a>
            <a className="navbar-brand-center" href="#">ChilExplora!</a>


            {/* Botón hamburguesa */}
            <button className="navbar-toggler" type="button" onClick={toggleMenu}>
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Menú desplegable */}
            <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#">Publica con Nosotros</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Iniciar Sesión</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Región</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </Row>

      {/* Banner Carousel */}
      <div className="carousel-container">
        <h2>Bienvenido, Invitado</h2>
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src="https://via.placeholder.com/1200x400" alt="First slide" />
            <Carousel.Caption>
              <h3>Evento 1</h3>
              <p>Descripción del evento 1.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="https://via.placeholder.com/1200x400" alt="Second slide" />
            <Carousel.Caption>
              <h3>Evento 2</h3>
              <p>Descripción del evento 2.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <Row className="mt-2">
          <div className="search-bar">
            <input type="text" className="form-control" placeholder="Buscar eventos, panoramas..." />
          </div>
        </Row>
      </div>

      <Row className="mt-2">
        <div className="carousel-container mt-1">
          <h2>Noticias Recientes</h2>
          <Slider {...settings}>
            <div className="news-item">
              <img src="https://via.placeholder.com/300x300" alt="Noticia 1" className="news-image" />
              <p className="news-text">Noticia 1: Descripción breve de la noticia</p>
            </div>
            <div className="news-item">
              <img src="https://via.placeholder.com/300x300" alt="Noticia 2" className="news-image" />
              <p className="news-text">Noticia 2: Descripción breve de la noticia</p>
            </div>
            <div className="news-item">
              <img src="https://via.placeholder.com/300x300" alt="Noticia 3" className="news-image" />
              <p className="news-text">Noticia 3: Descripción breve de la noticia</p>
            </div>
            <div className="news-item">
              <img src="https://via.placeholder.com/300x300" alt="Noticia 4" className="news-image" />
              <p className="news-text">Noticia 4: Descripción breve de la noticia</p>
            </div>
          </Slider>
        </div>
      </Row>
    </Container>
  );
};

export default Home;
