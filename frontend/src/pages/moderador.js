import { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import Navbar from "../components/navbar";
import { getAllEvents } from "../actions/evento";
import "../styles/moderador.css"; // Estilos específicos

// Datos placeholder para publicaciones
const publicaciones = [
  { id: 1, titulo: "Evento 1", fecha: "01/10/2024", categoria: "Por revisar" },
  { id: 2, titulo: "Evento 2", fecha: "05/10/2024", categoria: "Aprobados" },
  { id: 3, titulo: "Evento 3", fecha: "10/10/2024", categoria: "Rechazados" },
];

const Moderador = () => {
  const dispatch = useDispatch();

  const { eventos } = useSelector((state) => state.eventos);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const [activeTab, setActiveTab] = useState("Por revisar");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Filtrar las publicaciones según la pestaña activa
  const filteredPublicaciones = publicaciones.filter(
    (pub) => pub.categoria === activeTab
  );

  return (
    <>
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
          {eventos.map((evento) => (
            <div key={evento.id} className="entry">
              <h4>{evento.titulo_evento}</h4>
              <p>
                Fecha:{" "}
                {evento.fecha_evento_inicio
                  ? format(new Date(evento.fecha_evento_inicio), "dd-MM-yyyy")
                  : "Fecha no disponible"}
              </p>
              {evento.img_evento.map((image) => (
                <img src={image} alt="img" style={{ width: 125, height: 75 }} />
              ))}

              <div className="entry-buttons">
                <Button variant="info">Ver Detalle</Button>
                <Button
                  variant="success"
                  onClick={() => {
                    /* Aceptar lógica */
                  }}
                >
                  Aceptar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    /* Rechazar lógica */
                  }}
                >
                  Rechazar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Moderador;
