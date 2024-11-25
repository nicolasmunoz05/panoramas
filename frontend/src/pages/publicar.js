import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/publicar.css';
import Navbar from '../components/navbar.js';

const PublicarEvent = () => {
  const [titulo_evento, setTituloEvento] = useState('');
  const [fecha_inicio_evento, setFechaInicioEvento] = useState('');
  const [fecha_termino_evento, setFechaTerminoEvento] = useState('');
  const [descripcion_evento, setDescripcionEvento] = useState('');
  const [descripcion_breve_evento, setDescripcionBrevitoEvento] = useState('');
  const [ubicacion_comuna_evento, setUbicacionComunaEvento] = useState('');
  const [direccion_evento, setDireccionEvento] = useState('');
  const [ubicacion_ciudad_evento, setUbicacionCiudadEvento] = useState('');
  const [ubicacion_region_evento, setUbicacionRegionEvento] = useState('');
  const [hora_inicio_evento, setHoraInicioEvento] = useState('');
  const [hora_termino_evento, setHoraTerminoEvento] = useState('');
  const [categoria_evento, setCategoriaEvento] = useState('');
  const [precio_evento, setPrecioEvento] = useState('');
  const [edad_requerida_evento, setEdadRequeridaEvento] = useState(0);
  const [img_evento, setImgEvento] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert('Por favor, inicia sesión para publicar un evento.');
      navigate('/login');
    }

    // Limpiar previsualizaciones al desmontar
    return () => {
      imagePreview.forEach(url => URL.revokeObjectURL(url));
    };
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    
    // Validación específica para cada tipo de input
    let processedValue = value;
    
    if (type === 'number') {
      processedValue = value === '' ? 0 : Number(value);
    } else if (name === 'precio_evento') {
      // Permitir solo números y un punto decimal
      processedValue = value.replace(/[^\d.]/g, '');
      const parts = processedValue.split('.');
      if (parts.length > 2) processedValue = parts[0] + '.' + parts.slice(1).join('');
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Validar tamaño y tipo de archivos
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB max
      
      if (!isValidType) {
        setError('Solo se permiten archivos de imagen');
        return false;
      }
      if (!isValidSize) {
        setError('Las imágenes no deben superar los 5MB');
        return false;
      }
      return true;
    });

    if (validFiles.length) {
      setImages(validFiles);
      
      // Crear previsualizaciones
      const previews = validFiles.map(file => URL.createObjectURL(file));
      setImagePreview(previews);
      setError('');
    }
  };

  const validateForm = () => {
    const requiredFields = {
      titulo_evento: 'Título del evento',
      fecha_inicio_evento: 'Fecha de inicio',
      fecha_termino_evento: 'Fecha de término',
      descripcion_evento: 'Descripción del evento',
      ubicacion_comuna_evento: 'Comuna',
      direccion_evento: 'Dirección'
    };

    // Validar campos requeridos
    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData[field]?.trim()) {
        setError(`El campo ${label} es obligatorio`);
        return false;
      }
    }

    // Validar fechas
    const fechaInicio = new Date(formData.fecha_inicio_evento);
    const fechaTermino = new Date(formData.fecha_termino_evento);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaInicio < hoy) {
      setError('La fecha de inicio no puede ser anterior a hoy');
      return false;
    }

    if (fechaTermino < fechaInicio) {
      setError('La fecha de término no puede ser anterior a la fecha de inicio');
      return false;
    }

    // Validar precio
    if (formData.precio_evento && isNaN(parseFloat(formData.precio_evento))) {
      setError('El precio debe ser un número válido');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No tienes permisos para realizar esta acción.');
      return;
    }

    try {
      const response = await fetch('/eventos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
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
          img_evento
        })
      });

      if (response.ok) {
        alert('Evento creado exitosamente.');
        navigate('/eventos');
      } else {
        alert('Error al crear el evento. Verifica los datos e inténtalo nuevamente.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear el evento. Revisa tu conexión e inténtalo nuevamente.');
    }
  };

  return (
    <div className="container">
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
      <button type="submit" className="evento-button">Crear Evento</button>
    </form>
    </fluid>
  );
};

export default PublicarEvent;
