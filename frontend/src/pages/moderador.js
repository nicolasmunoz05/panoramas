import { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import Navbar from "../components/navbar";
import { getAllEvents } from "../actions/evento";
import "../styles/moderador.css";

const Moderador = () => {
  const dispatch = useDispatch();
  const { eventos } = useSelector((state) => state.eventos);

  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  useEffect(() => {
    if (eventos) {
      const eventosConCategoria = eventos.map((evento) => ({
        ...evento,
        categoria: "Por revisar",
      }));
      setPublicaciones(eventosConCategoria);
    }
  }, [eventos]);

  const [activeTab, setActiveTab] = useState("Por revisar");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAceptar = (id) => {
    setPublicaciones((prevPublicaciones) =>
      prevPublicaciones.map((pub) =>
        pub.id === id ? { ...pub, categoria: "Aprobados" } : pub
      )
    );
  };

  const handleRechazar = (id) => {
    setPublicaciones((prevPublicaciones) =>
      prevPublicaciones.map((pub) =>
        pub.id === id ? { ...pub, categoria: "Rechazados" } : pub
      )
    );
  };

  const filteredPublicaciones = publicaciones.filter(
    (pub) => pub.categoria === activeTab
  );

  return (
    <>
      <Navbar />
      <div className="moderator-dashboard">
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

        <div className="entries">
          {filteredPublicaciones.map((evento) => (
            <div key={evento.id} className="entry">
              <h4>{evento.titulo_evento}</h4>
              <p>
                Fecha:{" "}
                {evento.fecha_evento_inicio
                  ? format(new Date(evento.fecha_evento_inicio), "dd-MM-yyyy ")
                  : "Fecha no disponible "}
                -{" "}
                {evento.fecha_evento_termino
                  ? format(new Date(evento.fecha_evento_termino), "dd-MM-yyyy")
                  : "Fecha no disponible"}
              </p>
              <p>
                {evento.hora_inicio_evento + " - " + evento.hora_termino_evento}
              </p>
              <p>{evento.categoria_evento}</p>
              <p>{evento.ubicacion_evento_ciudad}</p>
              <p>{evento.descripcion_evento}</p>
              <p>{"Dirección: " + evento.direccion_evento}</p>
              <p>{"Creador: " + evento.creador_evento}</p>

              {evento.img_evento.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="img"
                  style={{ width: 125, height: 75 }}
                />
              ))}

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
          ))}
        </div>
      </div>
    </>
  );
};

export default Moderador;
