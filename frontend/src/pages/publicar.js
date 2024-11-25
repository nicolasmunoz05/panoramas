import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/publicar.css";
import Navbar from "../components/navbar.js";
import fetchWithToken from "../utils/fetch.js"; // Asegúrate de que la ruta sea correcta

const PublicarEvent = () => {
  const [titulo_evento, setTituloEvento] = useState("");
  const [fecha_inicio_evento, setFechaInicioEvento] = useState("");
  const [fecha_termino_evento, setFechaTerminoEvento] = useState("");
  const [descripcion_evento, setDescripcionEvento] = useState("");
  const [descripcion_breve_evento, setDescripcionBrevitoEvento] = useState("");
  const [ubicacion_comuna_evento, setUbicacionComunaEvento] = useState("");
  const [direccion_evento, setDireccionEvento] = useState("");
  const [ubicacion_ciudad_evento, setUbicacionCiudadEvento] = useState("");
  const [ubicacion_region_evento, setUbicacionRegionEvento] = useState("");
  const [hora_inicio_evento, setHoraInicioEvento] = useState("");
  const [hora_termino_evento, setHoraTerminoEvento] = useState("");
  const [categoria_evento, setCategoriaEvento] = useState("");
  const [precio_evento, setPrecioEvento] = useState("");
  const [edad_requerida_evento, setEdadRequeridaEvento] = useState(0);
  const [img_evento, setImgEvento] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Por favor, inicia sesión para publicar un evento.");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        titulo_evento,
        fecha_inicio_evento,
        fecha_termino_evento,
        descripcion_evento,
        descripcion_breve_evento,
        ubicacion_comuna_evento,
        direccion_evento,
        ubicacion_ciudad_evento,
        ubicacion_region_evento,
        hora_inicio_evento,
        hora_termino_evento,
        categoria_evento,
        precio_evento,
        edad_requerida_evento,
        img_evento: [...img_evento], // Convertir FileList a un array
      };

      // Crear FormData para incluir las imágenes
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "img_evento") {
          Array.from(value).forEach((file) => formData.append(key, file));
        } else {
          formData.append(key, value);
        }
      });

      // Realizar la solicitud con fetchWithToken
      const response = await fetchWithToken("/evento", formData, "POST");

      if (response) {
        alert("Evento creado exitosamente.");
        navigate("/");
      } else {
        alert(
          "Error al crear el evento. Verifica los datos e inténtalo nuevamente."
        );
      }
    } catch (error) {
      console.error("Error al crear el evento:", error);
      alert(
        "Error al crear el evento. Revisa tu conexión e inténtalo nuevamente."
      );
    }
  };

  return (
    <fluid>
      <Navbar />
      <form onSubmit={handleSubmit} className="evento-form">
        <label className="evento-label">
          Título del evento:
          <input
            type="text"
            value={titulo_evento}
            onChange={(e) => setTituloEvento(e.target.value)}
            className="evento-input"
          />
        </label>
        <label className="evento-label">
          Fecha de inicio:
          <input
            type="date"
            value={fecha_inicio_evento}
            onChange={(e) => setFechaInicioEvento(e.target.value)}
            className="evento-input"
          />
        </label>
        <label className="evento-label">
          Fecha de término:
          <input
            type="date"
            value={fecha_termino_evento}
            onChange={(e) => setFechaTerminoEvento(e.target.value)}
            className="evento-input"
          />
        </label>
        <label className="evento-label">
          Descripción del evento:
          <textarea
            value={descripcion_evento}
            onChange={(e) => setDescripcionEvento(e.target.value)}
            className="evento-input evento-textarea"
          />
        </label>
        <label className="evento-label">
          Descripción breve:
          <input
            type="text"
            value={descripcion_breve_evento}
            onChange={(e) => setDescripcionBrevitoEvento(e.target.value)}
            className="evento-input"
          />
        </label>
        <label className="evento-label">
          Ubicación (comuna):
          <input
            type="text"
            value={ubicacion_comuna_evento}
            onChange={(e) => setUbicacionComunaEvento(e.target.value)}
            className="evento-input"
          />
        </label>
        <label className="evento-label">
          Dirección:
          <input
            type="text"
            value={direccion_evento}
            onChange={(e) => setDireccionEvento(e.target.value)}
            className="evento-input"
          />
        </label>
        <label className="evento-label">
          Ubicación (ciudad):
          <input
            type="text"
            value={ubicacion_ciudad_evento}
            onChange={(e) => setUbicacionCiudadEvento(e.target.value)}
            className="evento-input"
          />
        </label>
        <label className="evento-label">
          Ubicación (región):
          <input
            type="text"
            value={ubicacion_region_evento}
            onChange={(e) => setUbicacionRegionEvento(e.target.value)}
            className="evento-input"
          />
        </label>
        <label className="evento-label">
          Hora de inicio:
          <input
            type="time"
            value={hora_inicio_evento}
            onChange={(e) => setHoraInicioEvento(e.target.value)}
            className="evento-input"
          />
        </label>
        <label className="evento-label">
          Hora de término:
          <input
            type="time"
            value={hora_termino_evento}
            onChange={(e) => setHoraTerminoEvento(e.target.value)}
            className="evento-input"
          />
        </label>
        <label className="evento-label">
          Categoría:
          <input
            type="text"
            value={categoria_evento}
            onChange={(e) => setCategoriaEvento(e.target.value)}
            className="evento-input"
          />
        </label>
        <label className="evento-label">
          Precio:
          <input
            type="text"
            value={precio_evento}
            onChange={(e) => setPrecioEvento(e.target.value)}
            className="evento-input"
          />
        </label>
        <label className="evento-label">
          Edad requerida:
          <input
            type="number"
            value={edad_requerida_evento}
            onChange={(e) => setEdadRequeridaEvento(e.target.value)}
            className="evento-input"
          />
        </label>
        <label className="evento-label">
          Imagen del evento:
          <input
            type="file"
            multiple
            onChange={(e) => setImgEvento(e.target.files)}
            className="evento-input"
          />
        </label>
        <button type="submit" className="evento-button">
          Crear Evento
        </button>
      </form>
    </fluid>
  );
};

export default PublicarEvent;
