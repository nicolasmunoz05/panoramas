import { useState, useEffect } from "react";
import { Button, Row, Col, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import Navbar from "../components/navbar";
import { getAllEvents } from "../actions/evento";
import "../styles/moderador.css";

const Moderador = () => {
  const dispatch = useDispatch();
  const { eventos } = useSelector((state) => state.eventos);

  // Estado local para las publicaciones
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  useEffect(() => {
    // Inicializar las publicaciones con un ID único y categoría
    if (eventos) {
      const eventosConCategoria = eventos.map((evento, index) => ({
        ...evento,
        id: evento.id || `evento-${index}`, // Generar ID si no existe
        categoria: "Por revisar",
      }));
      setPublicaciones(eventosConCategoria);
    }
  }, [eventos]);

  const [activeTab, setActiveTab] = useState("Por revisar");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Función para manejar la aceptación de un evento específico
  const handleAceptar = (id) => {
    setPublicaciones((prevPublicaciones) =>
      prevPublicaciones.map((pub) =>
        pub.id === id ? { ...pub, categoria: "Aprobados" } : pub
      )
    );
  };

  // Función para manejar el rechazo de un evento específico
  const handleRechazar = (id) => {
    setPublicaciones((prevPublicaciones) =>
      prevPublicaciones.map((pub) =>
        pub.id === id ? { ...pub, categoria: "Rechazados" } : pub
      )
    );
  };

  // Filtrar las publicaciones según la pestaña activa
  const filteredPublicaciones = publicaciones.filter(
    (pub) => pub.categoria === activeTab
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image); // Imagen seleccionada
    setShowModal(true); // Mostrar modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cerrar modal
  };

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body>
          <img
            src={selectedImage}
            alt="Evento completo"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          />
        </Modal.Body>
      </Modal>
      ;
      <Navbar />
      <div className="moderator-dashboard">
        {/* Pestañas para categorías */}
        <Row className="tabs">
          <Col>
            <Button
              variant={activeTab === "Por revisar" ? "primary" : "secondary"}
              onClick={() => handleTabClick("Por revisar")}
            >
              Por revisar
            </Button>
          </Col>
          <Col>
            <Button
              variant={activeTab === "Aprobados" ? "primary" : "secondary"}
              onClick={() => handleTabClick("Aprobados")}
            >
              Aprobados
            </Button>
          </Col>
          <Col>
            <Button
              variant={activeTab === "Rechazados" ? "primary" : "secondary"}
              onClick={() => handleTabClick("Rechazados")}
            >
              Rechazados
            </Button>
          </Col>
        </Row>

        {/* Listado de entradas */}
        <div className="entries">
          {filteredPublicaciones.map((evento) => (
            <div key={evento.id} className="entry">
              <div className="entry-content">
                {/* Imagen del evento */}
                <div className="entry-image">
                  {evento.img_evento.length > 0 && (
                    <img
                      src={evento.img_evento[0]} // Primera imagen del array
                      alt="Evento"
                      className="event-image"
                      onClick={() => handleImageClick(evento.img_evento[0])} // Lógica para abrir el modal
                    />
                  )}
                </div>

                {/* Información del evento */}
                <div className="entry-details">
                  <h4>{evento.titulo_evento}</h4>
                  <p>
                    Fecha:{" "}
                    {evento.fecha_evento_inicio
                      ? format(
                          new Date(evento.fecha_evento_inicio),
                          "dd-MM-yyyy "
                        )
                      : "Fecha no disponible "}
                    -{" "}
                    {evento.fecha_evento_termino
                      ? format(
                          new Date(evento.fecha_evento_termino),
                          "dd-MM-yyyy"
                        )
                      : "Fecha no disponible"}
                  </p>
                  <p>
                    {evento.hora_inicio_evento +
                      " - " +
                      evento.hora_termino_evento}
                  </p>
                  <p>{evento.categoria_evento}</p>
                  <p>{evento.ubicacion_evento_ciudad}</p>
                  <p>{evento.descripcion_evento}</p>
                  <p>{"Dirección: " + evento.direccion_evento}</p>
                  <p>{"Creador: " + evento.creador_evento}</p>

                  {/* Botones */}
                  <div className="entry-buttons">
                    <Button
                      variant="success"
                      onClick={() => handleAceptar(evento.id)}
                    >
                      Aceptar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleRechazar(evento.id)}
                    >
                      Rechazar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Moderador;
