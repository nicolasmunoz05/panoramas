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
  const [previewImages, setPreviewImages] = useState([]);
  const [horaInicioValida, setHoraInicioValida] = useState(false);
  const [horaTerminoValida, setHoraTerminoValida] = useState(false);
  const navigate = useNavigate();

  // Se verifica que el token exista antes de cargar la página
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Por favor, inicia sesión para publicar un evento.");
      navigate("/login");
    }
  }, [navigate]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImgEvento(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // Manejo del submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        titulo_evento,
        fecha_inicio_evento,
        fecha_termino_evento,
        descripcion_evento,
        ubicacion_comuna_evento,
        direccion_evento,
        ubicacion_ciudad_evento,
        ubicacion_region_evento,
        hora_inicio_evento,
        hora_termino_evento,
        categoria_evento,
        precio_evento,
        edad_requerida_evento,
        img_evento: [...img_evento],
      };

      // Crear FormData para enviar las imágenes junto con los datos del formulario
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "img_evento") {
          Array.from(value).forEach((file) => formData.append(key, file));
        } else {
          formData.append(key, value);
        }
      });

      // Enviar la solicitud de creación de evento
      const response = await fetchWithToken("/evento", formData, "POST");

      if (response) {
        alert("Evento creado exitosamente.");
        navigate("/");
      } else {
        alert("Error al crear el evento. Verifica los datos e inténtalo nuevamente.");
      }
    } catch (error) {
      console.error("Error al crear el evento:", error);
      alert("Error al crear el evento. Revisa tu conexión e inténtalo nuevamente.");
    }
  };

  const handleHoraInicioChange = (e) => {
    setHoraInicioEvento(e.target.value);
    setHoraInicioValida(true);
  };

  const handleHoraTerminoChange = (e) => {
    setHoraTerminoEvento(e.target.value);
    setHoraTerminoValida(true);
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit} className="evento-form">
        <label className="evento-label">
          Título del evento:
          <input
            type="text"
            value={titulo_evento}
            onChange={(e) => setTituloEvento(e.target.value)}
            className="evento-input"
            placeholder="Ingresa el título del evento"
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
            placeholder="Ingresa una descripción detallada del evento"
          />
        </label>

        <label className="evento-label">
          Comuna:
          <input
            type="text"
            value={ubicacion_comuna_evento}
            onChange={(e) => setUbicacionComunaEvento(e.target.value)}
            className="evento-input"
            placeholder="Ingresa la comuna del evento"
          />
        </label>

        <label className="evento-label">
          Dirección:
          <input
            type="text"
            value={direccion_evento}
            onChange={(e) => setDireccionEvento(e.target.value)}
            className="evento-input"
            placeholder="Ingresa la dirección del evento"
          />
        </label>

        <label className="evento-label">
          Ciudad:
          <input
            type="text"
            value={ubicacion_ciudad_evento}
            onChange={(e) => setUbicacionCiudadEvento(e.target.value)}
            className="evento-input"
            placeholder="Ingresa la ciudad del evento"
          />
        </label>

        <label className="evento-label">
          Región:
          <select
            value={ubicacion_region_evento}
            onChange={(e) => setUbicacionRegionEvento(e.target.value)}
            className="evento-input"
          >
            <option value="">Selecciona una región</option>
            <option value="Metropolitana">Metropolitana</option>
            <option value="Valparaíso">Valparaíso</option>
            <option value="Biobío">Biobío</option>
            <option value="La Araucanía">La Araucanía</option>
            {/* Puedes agregar más opciones para todas las regiones de Chile */}
          </select>
        </label>

        <label className="evento-label">
          Categoría:
          <select
            value={categoria_evento}
            onChange={(e) => setCategoriaEvento(e.target.value)}
            className="evento-input"
          >
            <option value="">Selecciona una categoría</option>
            <option value="Cultura">Cultura</option>
            <option value="Deporte">Deporte</option>
            <option value="Música">Música</option>
            <option value="Educación">Educación</option>
            <option value="Tecnología">Tecnología</option>
            {/* Agrega más categorías según lo necesites */}
          </select>
        </label>

        <label className="evento-label">
          Hora de inicio:
          <div className="hora-container">
            <input
              type="time"
              value={hora_inicio_evento}
              onChange={handleHoraInicioChange}
              className="evento-input"
            />
            {horaInicioValida && (
              <button
                type="button"
                className="hora-aceptar-btn"
                onClick={() => alert("Hora de inicio seleccionada")}
              >
                Aceptar
              </button>
            )}
          </div>
        </label>

        <label className="evento-label">
          Hora de término:
          <div className="hora-container">
            <input
              type="time"
              value={hora_termino_evento}
              onChange={handleHoraTerminoChange}
              className="evento-input"
            />
            {horaTerminoValida && (
              <button
                type="button"
                className="hora-aceptar-btn"
                onClick={() => alert("Hora de término seleccionada")}
              >
                Aceptar
              </button>
            )}
          </div>
        </label>

        <label className="evento-label">
          Precio:
          <input
            type="text"
            value={precio_evento}
            onChange={(e) => setPrecioEvento(e.target.value)}
            className="evento-input"
            placeholder="Ingresa el precio del evento"
          />
        </label>

        <label className="evento-label">
          Edad requerida:
          <input
            type="number"
            value={edad_requerida_evento}
            onChange={(e) => setEdadRequeridaEvento(e.target.value)}
            className="evento-input"
            placeholder="Ingresa la edad mínima requerida"
          />
        </label>

        <label className="evento-label">
          Imagen del evento:
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="evento-input"
          />
        </label>

        <div className="image-previews">
          {previewImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Preview ${index}`}
              className="preview"
            />
          ))}
        </div>

        <button type="submit" className="evento-button">
          Crear Evento
        </button>
      </form>
    </div>
  );
};

export default PublicarEvent;
