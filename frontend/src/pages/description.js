import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../actions/evento";
import { getAllPanoramas } from "../actions/panorama";
import { addToFavorites } from "../actions/favorites";
import Navbar from "../components/navbar";
import "../styles/description.css";

const Description = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState(""); // Para saber si es evento o panorama

  const eventos = useSelector((state) => state.eventos.eventos);
  const panoramas = useSelector((state) => state.panoramas.panoramas);

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    if (eventos.length === 0) {
      dispatch(getAllEvents());
    }
    if (panoramas.length === 0) {
      dispatch(getAllPanoramas());
    }

    setLoading(true);
  }, [id, navigate, dispatch, eventos.length, panoramas.length]);

  useEffect(() => {
    const evento = eventos.find((e) => e._id === id);
    const panorama = panoramas.find((p) => p._id === id);

    if (evento) {
      setType("evento");
      setData({
        title: evento.titulo_evento,
        description: evento.descripcion_evento,
        hours: `${evento.hora_inicio_evento} - ${evento.hora_termino_evento}`,
        category: evento.categoria_evento,
        images: evento.img_evento || [],
        address: evento.direccion_evento,
        price:
          evento.precio_evento > 0 ? `$${evento.precio_evento}` : "Gratuito",
        city: evento.ubicacion_ciudad_evento,
        ageRequirement: evento.edad_requerida_evento,
        dateStart: evento.fecha_inicio_evento,
        dateEnd: evento.fecha_termino_evento,
      });
    } else if (panorama) {
      setType("panorama");
      setData({
        title: panorama.titulo_panorama,
        description: panorama.descripcion_panorama,
        hours: `${panorama.horario_inicio_panorama} - ${panorama.horario_termino_panorama}`,
        days: panorama.dias_panorama,
        city: panorama.ubicacion_ciudad_panorama,
        images: panorama.img_panorama || [],
        address: panorama.direccion_panorama,
        price:
          panorama.precio_panorama > 0
            ? `$${panorama.precio_panorama}`
            : "Gratuito",
      });
    } else {
      setData(null);
    }

    setLoading(false);
  }, [eventos, panoramas, id]);

  const handleAddToFavorites = () => {
    if (data) {
      dispatch(addToFavorites({ id, type }));
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
                alt="Event or Panorama"
              />
              <div className="hero-overlay">
                <h2>{data.title}</h2>
                <div className="hero-badges">
                  {type === "evento" && (
                    <>
                      <span className="badge">{data.dateStart}</span>
                      <span className="badge">{data.dateEnd}</span>
                    </>
                  )}
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
            <h3>Detalles</h3>
            <p>
              <strong>Descripción:</strong> {data.description}
            </p>
            <p>
              <strong>Ubicación:</strong> {data.city}
            </p>
            <p>
              <strong>Dirección:</strong> {data.address}
            </p>
            <p>
              <strong>Horario:</strong> {data.hours}
            </p>
            {type === "evento" && (
              <>
                <p>
                  <strong>Categoría:</strong> {data.category}
                </p>
                <p>
                  <strong>Edad Requerida:</strong>{" "}
                  {data.ageRequirement || "Todas las edades"}
                </p>
              </>
            )}
            {type === "panorama" && (
              <p>
                <strong>Días Disponibles:</strong> {data.days}
              </p>
            )}
            <p>
              <strong>Precio:</strong> {data.price}
            </p>
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
                        alt={`Similar ${type} ${index + 1}`}
                      />
                    </div>
                    <div className="similar-info">
                      <h4>
                        Similar {type === "evento" ? "Evento" : "Panorama"}{" "}
                        {index + 1}
                      </h4>
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
