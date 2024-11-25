import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../actions/evento";
import { getAllPanoramas } from "../actions/panorama";
import { addToFavorites } from "../actions/favorites"; // Asegúrate de tener esta acción
import Navbar from "../components/navbar";
import "../styles/description.css";

const Description = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Acceder a eventos y panoramas desde el estado de Redux
  const eventos = useSelector((state) => state.eventos.eventos);
  const panoramas = useSelector((state) => state.panoramas.panoramas);

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    // Cargar eventos y panoramas si no están en el estado
    if (eventos.length === 0) {
      dispatch(getAllEvents());
    }
    if (panoramas.length === 0) {
      dispatch(getAllPanoramas());
    }

    setLoading(true);
  }, [id, navigate, dispatch, eventos.length, panoramas.length]);

  useEffect(() => {
    // Buscar el evento o panorama con el ID específico
    const evento = eventos.find((e) => e._id === id);
    const panorama = panoramas.find((p) => p._id === id);

    // Priorizar mostrar un evento, si no, mostrar panorama
    const item = evento || panorama;

    if (item) {
      setData({
        title:
          item.titulo_evento || item.titulo_panorama || "Título no disponible",
        dateStart: item.fecha_inicio_evento || "Fecha de inicio no disponible",
        dateEnd: item.fecha_termino_evento || "Fecha de término no disponible",
        location: item.ubicacion_ciudad_panorama || "Ubicación no disponible",
        address: item.direccion_panorama || "Dirección no disponible",
        hours: `${
          item.horario_inicio_panorama || "Hora de inicio no disponible"
        } - ${
          item.horario_termino_panorama || "Hora de término no disponible"
        }`,
        category:
          item.categoria_panorama ||
          item.categoria_evento ||
          "Categoría no disponible",
        price: item.precio_panorama || "Precio no disponible",
        ageRequirement:
          item.edad_requerida_evento || "Edad requerida no disponible",
        images: item.img_evento || item.img_panorama || [],
      });
    } else {
      setData(null);
    }

    setLoading(false);
  }, [eventos, panoramas, id]);

  const handleAddToFavorites = () => {
    if (data) {
      dispatch(addToFavorites(data)); // Asegúrate de que esta acción esté implementada
      alert("Agregado a favoritos!");
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (!data) return <div>No se encontró el elemento</div>;

  return (
    <div>
      <Navbar />
      <div className="description-container">
        <main className="main-content">
          <div className="hero-section">
            <div className="hero-image">
              <img
                src={data.images[0] || "https://via.placeholder.com/1200x400"}
                alt="Event"
              />
              <div className="hero-overlay">
                <h2>{data.title}</h2>
                <div className="hero-badges">
                  <span className="badge">{data.dateStart}</span>
                  <span className="badge">{data.dateEnd}</span>
                  <button
                    onClick={handleAddToFavorites}
                    className="favorite-button"
                  >
                    ⭐
                  </button>
                </div>
              </div>
            </div>
          </div>
          <section className="content-section">
            <h3>Instrucciones</h3>
            <p>
              <strong>Ubicación:</strong> {data.location}
            </p>
            <p>
              <strong>Dirección:</strong> {data.address}
            </p>
            <p>
              <strong>Horas:</strong> {data.hours}
            </p>
            <p>
              <strong>Categoría:</strong> {data.category}
            </p>
            <p>
              <strong>Precio:</strong> {data.price}
            </p>
            <p>
              <strong>Edad Requerida:</strong> {data.ageRequirement}
            </p>
          </section>
          <section className="map-section">
            <div className="map-container">
              <div className="map-placeholder">
                <span className="map-icon">📍</span>
              </div>
              <p className="map-instructions">{data.instructions}</p>
            </div>
          </section>
          <section className="similar-section">
            <h3>Similares</h3>
            <div className="similar-grid">
              {Array(6)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className="similar-card">
                    <div className="similar-image">
                      <img
                        src="https://via.placeholder.com/200x200"
                        alt={`Similar event ${index + 1}`}
                      />
                    </div>
                    <div className="similar-info">
                      <h4>Evento Similar {index + 1}</h4>
                      <p>Breve descripción</p>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Description;
