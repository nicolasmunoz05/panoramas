import { useState, useEffect } from "react";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import Navbar from "../components/navbar";
import { getAllEvents, eventoEdited } from "../actions/evento";
import { getAllPanoramas, panoramaEdited } from "../actions/panorama";
import "../styles/moderador.css";

const Moderador = () => {
  const dispatch = useDispatch();
  const { eventos } = useSelector((state) => state.eventos);
  const { panoramas } = useSelector((state) => state.panoramas);

  // Estado local para controlar la pestaña activa
  const [activeTab, setActiveTab] = useState("Por revisar");

  // Cargar datos al inicializar
  useEffect(() => {
    dispatch(getAllEvents());
    dispatch(getAllPanoramas());
  }, [dispatch]);

  // Manejo de pestañas
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Función para manejar la actualización de estado en la base de datos
  const updateEventoEstado = (id, estado) => {
    const evento = eventos.find((e) => e._id === id);
    if (evento) {
      dispatch(
        eventoEdited({
          ...evento,
          aceptacion_evento: estado,
        })
      );
    }
  };

  const handleAceptar = (id) => updateEventoEstado(id, "aceptado");
  const handleRechazar = (id) => updateEventoEstado(id, "rechazado");
  const handleRestaurar = (id) => updateEventoEstado(id, "pendiente");

  // Filtrar publicaciones según la pestaña activa y el estado en la base de datos
  const filteredPublicaciones = eventos?.filter((evento) => {
    if (activeTab === "Por revisar")
      return evento.aceptacion_evento === "pendiente";
    if (activeTab === "Aprobados")
      return evento.aceptacion_evento === "aceptado";
    if (activeTab === "Rechazados")
      return evento.aceptacion_evento === "rechazado";
    return false;
  });

  // Función para manejar el cambio de estado del panorama
  const handlePanoramaStatusChange = (id, status) => {
    const panorama = panoramas.find((p) => p._id === id);
    if (panorama) {
      dispatch(
        panoramaEdited({
          ...panorama,
          status_panorama: status,
        })
      );
    }
  };

  // Modal para visualizar imágenes
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

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
          <Col>
            <Button
              variant={activeTab === "Panoramas" ? "primary" : "secondary"}
              onClick={() => handleTabClick("Panoramas")}
            >
              Panoramas
            </Button>
          </Col>
        </Row>

        {/* Listado de Eventos */}
        {(activeTab === "Por revisar" ||
          activeTab === "Aprobados" ||
          activeTab === "Rechazados") && (
          <div className="entries">
            {filteredPublicaciones?.map((evento) => (
              <div key={evento._id} className="entry">
                <div className="entry-content">
                  <div className="entry-image">
                    {evento.img_evento?.length > 0 ? (
                      <img
                        src={evento.img_evento[0]}
                        alt="Evento"
                        className="event-image"
                        onClick={() => handleImageClick(evento.img_evento[0])}
                      />
                    ) : (
                      <div className="placeholder-image">Sin imagen</div>
                    )}
                  </div>

                  <div className="entry-details">
                    <h4>{evento.titulo_evento}</h4>
                    <p>
                      Fecha:{" "}
                      {evento.fecha_evento_inicio
                        ? format(
                            new Date(evento.fecha_evento_inicio),
                            "dd-MM-yyyy "
                          )
                        : "Fecha no disponible"}{" "}
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

                    <div className="entry-buttons">
                      <Button
                        variant="success"
                        onClick={() => handleAceptar(evento._id)}
                        style={{ marginRight: "8px" }}
                      >
                        Aceptar
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() => handleRechazar(evento._id)}
                        style={{ marginRight: "8px" }}
                      >
                        Rechazar
                      </Button>

                      <Button
                        variant="warning"
                        onClick={() => handleRestaurar(evento._id)}
                      >
                        Restaurar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Listado de Panoramas */}
        {activeTab === "Panoramas" && (
          <div className="entries">
            {panoramas.map((panorama) => (
              <div key={panorama._id} className="entry">
                <div className="entry-content">
                  <div className="entry-image">
                    {panorama.img_panorama?.length > 0 ? (
                      <img
                        src={panorama.img_panorama[0]}
                        alt="Panorama"
                        className="event-image"
                        onClick={() =>
                          handleImageClick(panorama.img_panorama[0])
                        }
                      />
                    ) : (
                      <div className="placeholder-image">Sin imagen</div>
                    )}
                  </div>

                  <div className="entry-details">
                    <h4>{panorama.titulo_panorama}</h4>
                    <p>
                      {panorama.horario_inicio_panorama +
                        " - " +
                        panorama.horario_termino_panorama}
                    </p>
                    <p>{panorama.ubicacion_ciudad_panorama}</p>
                    <p>{panorama.descripcion_panorama}</p>
                    <p>{"Dirección: " + panorama.direccion_panorama}</p>
                    <p>{"Creador: " + panorama.creador_panorama}</p>

                    <div className="entry-slider">
                      <Form.Check
                        type="switch"
                        id={`panorama-status-${panorama._id}`}
                        label={
                          panorama.status_panorama === "activo"
                            ? "Activo"
                            : "Inactivo"
                        }
                        checked={panorama.status_panorama === "activo"}
                        onChange={(e) =>
                          handlePanoramaStatusChange(
                            panorama._id,
                            e.target.checked ? "activo" : "inactivo"
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Moderador;
