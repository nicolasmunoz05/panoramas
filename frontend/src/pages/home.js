import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row } from "react-bootstrap";
import Navbar from "../components/navbar";
import { format } from "date-fns";
import { getAllEvents } from "../actions/evento";
import { getAllPanoramas } from "../actions/panorama";
import "../styles/home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { eventos } = useSelector((state) => state.eventos);
  const { panoramas } = useSelector((state) => state.panoramas);

  const [eventPage, setEventPage] = useState(0);
  const [panoramaPage, setPanoramaPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(getAllEvents());
    dispatch(getAllPanoramas());
  }, [dispatch]);

  const handlePageChange = (type, direction) => {
    if (type === "eventos") {
      const maxPages = Math.ceil(eventos.length / itemsPerPage);
      setEventPage((prev) =>
        direction === "next"
          ? (prev + 1) % maxPages
          : (prev - 1 + maxPages) % maxPages
      );
    } else if (type === "panoramas") {
      const maxPages = Math.ceil(panoramas.length / itemsPerPage);
      setPanoramaPage((prev) =>
        direction === "next"
          ? (prev + 1) % maxPages
          : (prev - 1 + maxPages) % maxPages
      );
    }
  };

  const getPaginatedItems = (items, page) =>
    items.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage);

  return (
    <Container fluid>
      <Navbar />
      <div className="header-container">
        <h2> Bienvenido, Invitado</h2>
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

      {/* Eventos */}
      <Row>
        <div className="paginated-container">
          <br></br>
          <h2>Eventos</h2>
          <div className="content-wrapper">
            <button
              className="nav-arrow left"
              onClick={() => handlePageChange("eventos", "prev")}
            >
              &lt;
            </button>
            <div className="items-container">
              {getPaginatedItems(eventos, eventPage).map((evento) => (
                <div key={evento._id} className="news-item">
                  <Link to={`/description/${evento._id}`} className="item-link">
                    <div className="date-overlay">
                      {evento.fecha_evento_inicio
                        ? format(
                            new Date(evento.fecha_evento_inicio),
                            "dd-MM-yyyy "
                          )
                        : "Fecha no disponible "}
                    </div>
                    <img
                      src={evento.img_evento[0]}
                      alt={evento.titulo_evento}
                      className="news-image"
                    />
                    <p className="news-text">{evento.titulo_evento}</p>
                    <p>{evento.descripcion_breve_evento}</p>
                    <div className="item-views">
                      <i className="fa fa-eye"></i>{" "}
                      {evento.visualizaciones || "👁 " + 0}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <button
              className="nav-arrow right"
              onClick={() => handlePageChange("eventos", "next")}
            >
              &gt;
            </button>
          </div>
        </div>
      </Row>

      {/* Panoramas */}
      <Row>
        <div className="paginated-container">
          <h2>Panoramas</h2>
          <div className="content-wrapper">
            <button
              className="nav-arrow left"
              onClick={() => handlePageChange("panoramas", "prev")}
            >
              &lt;
            </button>
            <div className="items-container">
              {getPaginatedItems(panoramas, panoramaPage).map((panorama) => (
                <div key={panorama._id} className="news-item">
                  <Link
                    to={`/description/${panorama._id}`}
                    className="item-link"
                  >
                    <div className="date-overlay">{panorama.dias_panorama}</div>
                    <img
                      src={panorama.img_panorama[0]}
                      alt={panorama.titulo_panorama}
                      className="news-image"
                    />
                    <p className="news-text">{panorama.titulo_panorama}</p>
                    <p>{panorama.descripcion_panorama}</p>
                    <div className="item-views">
                      <i className="fa fa-eye"></i>{" "}
                      {panorama.visualizaciones || "👁 " + 0}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <button
              className="nav-arrow right"
              onClick={() => handlePageChange("panoramas", "next")}
            >
              &gt;
            </button>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Home;
