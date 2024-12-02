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
  const [type, setType] = useState(""); // Evento o panorama
  const [showModal, setShowModal] = useState(false); // Control del modal
  const [comment, setComment] = useState({
    texto_comentario: "",
    nota_comentario: 0,
  });

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

  const handleCommentChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleSubmitComment = async () => {
    const newComment = {
      texto_comentario: comment.texto_comentario,
      nota_comentario: parseFloat(comment.nota_comentario), // Convertir a número
      usuario_comentario: localStorage.getItem("userId"),
      relacionadoCon_comentario: {
        tipo: type.charAt(0).toUpperCase() + type.slice(1), // Capitalizar el tipo
        id,
      },
      fecha_comentario: new Date(),
    };

    try {
      const response = await fetch("http://localhost:8000/comentario/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });

      if (response.ok) {
        alert("Comentario agregado");
        setShowModal(false);
        setComment({ texto_comentario: "", nota_comentario: 0 });
      } else {
        alert("Error al agregar comentario");
      }
    } catch (err) {
      console.error(err);
      alert("Error al conectar con el servidor");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="description-container">
        <main className="main-content">
          <div className="hero-section">
            <div className="hero-image">
              <img
                src={
                  (data && data.images && data.images[0]) ||
                  "https://via.placeholder.com/1200x400"
                }
                alt="Event or Panorama"
              />
              <div className="hero-overlay">
                <h2>{data?.title || "Título no disponible"}</h2>
                <div className="hero-badges">
                  {type === "evento" && data && (
                    <>
                      <span className="badge">{data.dateStart}</span>
                      <span className="badge">{data.dateEnd}</span>
                    </>
                  )}

                  <button
                    className="add-comment-button"
                    onClick={() => setShowModal(true)}
                    disabled={!data}
                  >
                    Publicar Reseña
                  </button>

                  {showModal && (
                    <div className="comment-modal">
                      <div className="modal-content">
                        <h3>Agregar un comentario</h3>
                        <label>
                          Texto del comentario:
                          <textarea
                            value={comment.texto_comentario}
                            onChange={(e) =>
                              setComment({
                                ...comment,
                                texto_comentario: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label>
                          Nota del comentario (1.0 - 5.0):
                          <input
                            type="number"
                            step="0.1"
                            min="1"
                            max="5"
                            value={comment.nota_comentario}
                            onChange={(e) =>
                              setComment({
                                ...comment,
                                nota_comentario: e.target.value,
                              })
                            }
                          />
                        </label>
                        <div className="modal-buttons">
                          <button
                            onClick={handleSubmitComment}
                            disabled={!data}
                          >
                            Enviar
                          </button>
                          <button onClick={() => setShowModal(false)}>
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={handleAddToFavorites}
                    className="favorite-button"
                    disabled={!data} // Deshabilitar si no hay datos
                  >
                    ⭐
                  </button>
                </div>
              </div>
            </div>
          </div>

          {data ? (
            <>
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
            </>
          ) : (
            <p>Cargando información...</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Description;
