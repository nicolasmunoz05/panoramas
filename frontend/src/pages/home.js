import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import Navbar from "../components/navbar";
import { format } from "date-fns";
import { getAllEvents } from "../actions/evento";
import { getAllPanoramas } from "../actions/panorama";
import "../styles/home.css";
import Carousel from "../components/carousel.js"; // Asegúrate de que la ruta sea correcta
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const { eventos } = useSelector((state) => state.eventos);
  const { panoramas } = useSelector((state) => state.panoramas);
  const [eventPage, setEventPage] = useState(0);
  const [panoramaPage, setPanoramaPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState(null);
  const [token, setToken] = useState(null);

  const itemsPerPage = 4;

  useEffect(() => {
    // Función para verificar el token en localStorage
    const checkToken = () => {
      const storedToken = localStorage.getItem("token"); // Asegúrate de usar la clave correcta
      setToken(storedToken);
    };

    checkToken(); // Verificar el token al montar el componente

    // Listener para cambios en localStorage
    const handleStorageChange = () => {
      checkToken();
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup al desmontar el componente
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Componente estrella dentro de Home.js
  const Star = ({ onToggle }) => {
    const [isActive, setIsActive] = useState(false);

    const toggleStar = () => {
      const newState = !isActive;
      setIsActive(newState);
      if (onToggle) onToggle(newState);
    };

    return (
      <span onClick={toggleStar} className={`star ${isActive ? "active" : ""}`}>
        ★
      </span>
    );
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:8000/usuario/id/${userId}`
          );
          setNombreUsuario(response.data.nombre_usuario);
        } catch (error) {
          console.error("Error al obtener los datos del usuario:", error);
          setNombreUsuario(null); // Asegura que no muestre datos obsoletos
        }
      } else {
        setNombreUsuario(null); // No hay usuario activo
      }
    };

    fetchUserData();

    // Listener para cambios en localStorage
    const handleStorageChange = () => {
      if (!localStorage.getItem("userId")) {
        setNombreUsuario(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup al desmontar el componente
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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

  const filteredEventos = eventos
    .filter((evento) => evento.aceptacion_evento.toLowerCase() === "aceptado") // Ignorar mayúsculas en aceptación
    .filter(
      (evento) =>
        evento.titulo_evento.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evento.descripcion_breve_evento
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

  const filteredPanoramas = panoramas
    .filter((panorama) => panorama.status_panorama.toLowerCase() === "activo") // Ignorar mayúsculas en estado
    .filter(
      (panorama) =>
        panorama.titulo_panorama
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        panorama.descripcion_panorama
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  // Nuevo useEffect para resetear páginas
  useEffect(() => {
    setEventPage(0); // Resetea a la primera página de eventos
    setPanoramaPage(0); // Resetea a la primera página de panoramas
  }, [searchTerm]); // Cada vez que cambie el término de búsqueda

  return (
    <Container fluid>
      <Navbar />
      <div className="header-container">
        <h2>
          {token
            ? `Hola ${nombreUsuario}! Revise los eventos más vistos`
            : "Bienvenido, inicie sesión para una mejor experiencia"}
        </h2>

        <button type="button" className="btn-map">
          Mapa 📍
        </button>
        <div className="search-bar">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar eventos, panoramas..."
            value={searchTerm} // Valor del estado
            onChange={(e) => setSearchTerm(e.target.value)} // Actualizar estado
          />
        </div>
      </div>
      {/* Carrusel de eventos destacados */}
      {eventos.length > 0 && (
        <Carousel eventos={filteredEventos.slice(0, 5)} /> // Pasar solo los eventos aceptados
      )}

      {/* Eventos */}
      <>
        {filteredEventos.length > 0 && (
          <div className="paginated-container">
            <br />
            <h2>Eventos</h2>
            <div className="content-wrapper">
              <button
                className="nav-arrow left"
                onClick={() => handlePageChange("eventos", "prev")}
              >
                &lt;
              </button>
              <div className="items-container">
                {getPaginatedItems(filteredEventos, eventPage).map((evento) => (
                  <div key={evento._id} className="news-item">
                    <Link
                      to={`/description/${evento._id}`}
                      className="item-link"
                    >
                      <div className="date-overlay">
                        {evento.fecha_inicio_evento
                          ? format(
                              new Date(evento.fecha_inicio_evento),
                              "dd-MM-yyyy "
                            )
                          : "Fecha no disponible "}
                      </div>
                      <div className="price-overlay">
                        {evento.precio_evento > 0
                          ? `$${evento.precio_evento}`
                          : evento.precio_evento}
                      </div>

                      <img
                        src={evento.img_evento[0]}
                        alt={evento.titulo_evento}
                        className="news-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "../No-Image-Placeholder.svg.png";
                        }}
                      />
                      <p className="news-text">{evento.titulo_evento}</p>
                      <p className="clamped-text">
                        {evento.descripcion_breve_evento}
                      </p>

                      <div className="item-views">
                        <i className="fa fa-eye"></i>{" "}
                        {evento.visualizaciones || "👁 " + 0}
                      </div>
                    </Link>
                    <div className="star-container">
                      <Star
                        onToggle={(isActive) =>
                          console.log(
                            `${evento.titulo_evento} favorito:`,
                            isActive
                          )
                        }
                      />
                    </div>
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
        )}
      </>

      {/* Panoramas */}
      <>
        {/* Panoramas */}
        {filteredPanoramas.length > 0 && (
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
                {getPaginatedItems(filteredPanoramas, panoramaPage).map(
                  (panorama) => (
                    <div key={panorama._id} className="news-item">
                      <Link
                        to={`/description/${panorama._id}`}
                        className="item-link"
                      >
                        <div className="date-overlay">
                          {panorama.dias_panorama}
                        </div>
                        <img
                          src={panorama.img_panorama[0]}
                          alt={panorama.titulo_panorama}
                          className="news-image"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "../No-Image-Placeholder.svg.png";
                          }}
                        />
                        <p className="news-text">{panorama.titulo_panorama}</p>
                        <p className="clamped-text">
                          {panorama.descripcion_panorama}
                        </p>
                        <div className="item-views">
                          <i className="fa fa-eye"></i>{" "}
                          {panorama.visualizaciones || "👁 " + 0}
                        </div>
                      </Link>
                      <div className="star-container">
                        <Star
                          onToggle={(isActive) =>
                            console.log(
                              `${panorama.titulo_panorama} favorito:`,
                              isActive
                            )
                          }
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
              <button
                className="nav-arrow right"
                onClick={() => handlePageChange("panoramas", "next")}
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </>
    </Container>
  );
};

export default Home;
