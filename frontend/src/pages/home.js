import React, { useState } from 'react';
import { Container, Row, Carousel } from 'react-bootstrap';
import Slider from "react-slick";
import '../styles/home.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from '../components/navbar'; // Asegúrate de que la ruta sea correcta


const Home = () => {
  // Configuración del carrusel de noticias
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 10,
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
            <Navbar />
      {/* Header */}
      <div className="header-container">
        <h2>Bienvenido, Invitado</h2>

        <button type="button" className="btn-map">
          Mapa 📍
        </button>

        <div className="search-bar">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar eventos, panoramas..."
          />
        </div>
      </div>

      {/* Banner Carousel */}
      <div className="main-event-container">
        <div className="banner-carousel">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/lagunamaule.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <p>Fotto 1</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/lagunamaule2.jpg"
                alt="Second slide"
              />
              <Carousel.Caption>
                <p>Foto 2</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        <h3>
  Laguna del Maule
  <h4>Complejo volcánico laguna del maule</h4>
  <p>
    La Laguna del Maule fue inicialmente una laguna natural ubicada sobre una zona cubierta por la lava del volcán Laguna del Maule que posteriormente fue represada para regular y asegurar el abastecimiento de riego en la cuenca del río Maule. <br /><br />
    Provincia: Mendoza/Neuquén. Latitud: 36° 03′ 32″ S. Longitud: 70° 30′ 04″ O. <a href="#">Ver en mapa</a>
    <br /><br />
    <img src="/señales/Picnic.png" alt="Warning Icon" style={{ width: '40px', height: '40px' }} />  &nbsp;
    <img src="/señales/AcuaSki.png" alt="Warning Icon" style={{ width: '40px', height: '40px' }} />  &nbsp;
    <img src="/señales/Canoa.png" alt="Warning Icon" style={{ width: '40px', height: '40px' }} />  &nbsp;
    <img src="/señales/Camping.png" alt="Warning Icon" style={{ width: '40px', height: '40px' }} />  &nbsp;
    <img src="/señales/Alojamiento.png" alt="Warning Icon" style={{ width: '40px', height: '40px' }} />  &nbsp;
    <img src="/señales/Equitacion.png" alt="Warning Icon" style={{ width: '40px', height: '40px' }} />  &nbsp;
    <img src="/señales/Natacion.png" alt="Warning Icon" style={{ width: '40px', height: '40px' }} />  &nbsp;
    <img src="/señales/Nautica.png" alt="Warning Icon" style={{ width: '40px', height: '40px' }} />  &nbsp;
    <img src="/señales/Pesca.png" alt="Warning Icon" style={{ width: '40px', height: '40px' }} />  &nbsp;
  </p>
</h3>
      </div>

      {/* Body - Eventos */}
      <Row>
        <div className="carousel-container">
          <h2>Eventos de esta semana</h2>
          <Slider {...settings}>
            <div className="news-item">
              <img
                src="https://via.placeholder.com/300x300"
                alt="Noticia 1"
                className="news-image"
              />
              <p className="news-text">
                Evento 1: Descripción breve del Evento
              </p>
            </div>
            <div className="news-item">
              <img
                src="https://via.placeholder.com/300x300"
                alt="Evento 2"
                className="news-image"
              />
              <p className="news-text">
                Evento 2: Descripción breve del Evento
              </p>
            </div>
            <div className="news-item">
              <img
                src="https://via.placeholder.com/300x300"
                alt="Evento 3"
                className="news-image"
              />
              <p className="news-text">
                Evento 3: Descripción breve del Evento
              </p>
            </div>
            <div className="news-item">
              <img
                src="https://via.placeholder.com/300x300"
                alt="Evento 4"
                className="news-image"
              />
              <p className="news-text">
                Evento 4: Descripción breve del Evento
              </p>
            </div>
          </Slider>
        </div>
      </Row>

      {/* Body - Noticias */}
      <Row className="">
        <div className="carousel-container">
          <h2>Noticias Recientes</h2>
          <Slider {...settings}>
            <div className="news-item">
              <img
                src="https://via.placeholder.com/300x300"
                alt="Noticia 1"
                className="news-image"
              />
              <p className="news-text">
                Noticia 1: Descripción breve de la noticia
              </p>
            </div>
            <div className="news-item">
              <img
                src="https://via.placeholder.com/300x300"
                alt="Noticia 2"
                className="news-image"
              />
              <p className="news-text">
                Noticia 2: Descripción breve de la noticia
              </p>
            </div>
            <div className="news-item">
              <img
                src="https://via.placeholder.com/300x300"
                alt="Noticia 3"
                className="news-image"
              />
              <p className="news-text">
                Noticia 3: Descripción breve de la noticia
              </p>
            </div>
            <div className="news-item">
              <img
                src="https://via.placeholder.com/300x300"
                alt="Noticia 4"
                className="news-image"
              />
              <p className="news-text">
                Noticia 4: Descripción breve de la noticia
              </p>
            </div>
          </Slider>
        </div>
      </Row>

      {/* Body - Noticias */}
      <Row>
        <div className="carousel-container">
          <h2>Cultura</h2>
          <Slider {...settings}>
            <div className="news-item">
              <img
                src="https://via.placeholder.com/300x300"
                alt="Noticia 1"
                className="news-image"
              />
              <p className="news-text">Evento Cultural 1: Descripción breve</p>
            </div>
            <div className="news-item">
              <img
                src="https://via.placeholder.com/300x300"
                alt="Noticia 2"
                className="news-image"
              />
              <p className="news-text">Evento Cultural 2: Descripción breve</p>
            </div>
            <div className="news-item">
              <img
                src="https://via.placeholder.com/300x300"
                alt="Noticia 3"
                className="news-image"
              />
              <p className="news-text">Evento Cultural 3: Descripción breve</p>
            </div>
            <div className="news-item">
              <img
                src="https://via.placeholder.com/300x300"
                alt="Noticia 4"
                className="news-image"
              />
              <p className="news-text">Evento Cultural 4: Descripción breve</p>
            </div>
          </Slider>
        </div>
      </Row>
    </Container>
  );
};

export default Home;
