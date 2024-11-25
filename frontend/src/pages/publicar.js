import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/publicar.css';
import Navbar from '../components/navbar.js';
import fetchWithToken from '../utils/fetch';
import { useDispatch } from 'react-redux';
import { eventoNew } from '../actions/evento.js';

const PublicarEvent = () => {
  const initialFormState = {
    titulo_evento: '',
    fecha_inicio_evento: '',
    fecha_termino_evento: '',
    descripcion_evento: '',
    descripcion_breve_evento: '',
    ubicacion_comuna_evento: '',
    direccion_evento: '',
    ubicacion_ciudad_evento: '',
    ubicacion_region_evento: '',
    hora_inicio_evento: '',
    hora_termino_evento: '',
    categoria_evento: '',
    precio_evento: '',
    edad_requerida_evento: 0,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Por favor, inicia sesión para publicar un evento.');
      navigate('/login');
      return;
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
    setError('');
    setIsLoading(true);
  
    try {
      if (!validateForm()) {
        setIsLoading(false);
        return;
      }
  
      const eventFormData = new FormData();
  
      // Agregar campos del formulario
      Object.keys(formData).forEach(key => {
        if (formData[key] !== '') {
          eventFormData.append(key, formData[key]);
        }
      });
  
      // Agregar imágenes
      images.forEach((image) => {
        eventFormData.append('img_evento', image);
      });
  
      // Obtener el _id del creador desde el token
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload del token
        const creatorId = payload._id;
        eventFormData.append('creador_evento', creatorId);
      } else {
        setError('No se pudo obtener la información del usuario. Por favor, inicia sesión nuevamente.');
        setIsLoading(false);
        return;
      }
  
      const response = await fetchWithToken('/evento', eventFormData, 'POST');
      console.log('Respuesta del servidor:', response);
  
      if (response) {
        alert('Evento creado exitosamente.');
        // Limpiar el formulario
        setFormData(initialFormState);
        setImages([]);
        setImagePreview([]);
        navigate('/');
      }
    } catch (error) {
      console.error('Error al crear evento:', error);
      setError('Error al crear el evento. Por favor, verifica tu conexión e inténtalo nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };
  

  const renderImagePreviews = () => {
    if (imagePreview.length === 0) return null;

    return (
      <div className="image-preview-container">
        {imagePreview.map((url, index) => (
          <div key={index} className="image-preview">
            <img src={url} alt={`Preview ${index + 1}`} />
            <button
              type="button"
              onClick={() => {
                URL.revokeObjectURL(url);
                setImagePreview(prev => prev.filter((_, i) => i !== index));
                setImages(prev => prev.filter((_, i) => i !== index));
              }}
              className="remove-image-btn"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <Navbar />
      <form onSubmit={handleSubmit} className="evento-form">
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label className="evento-label">
            Título del evento:
            <input
              type="text"
              name="titulo_evento"
              value={formData.titulo_evento}
              onChange={handleInputChange}
              className="evento-input"
              required
              maxLength={100}
              placeholder="Ingresa el título del evento"
            />
          </label>
        </div>

        <div className="form-group dates">
          <label className="evento-label">
            Fecha de inicio:
            <input
              type="date"
              name="fecha_inicio_evento"
              value={formData.fecha_inicio_evento}
              onChange={handleInputChange}
              className="evento-input"
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </label>

          <label className="evento-label">
            Fecha de término:
            <input
              type="date"
              name="fecha_termino_evento"
              value={formData.fecha_termino_evento}
              onChange={handleInputChange}
              className="evento-input"
              required
              min={formData.fecha_inicio_evento || new Date().toISOString().split('T')[0]}
            />
          </label>
        </div>

        <div className="form-group times">
          <label className="evento-label">
            Hora de inicio:
            <input
              type="time"
              name="hora_inicio_evento"
              value={formData.hora_inicio_evento}
              onChange={handleInputChange}
              className="evento-input"
            />
          </label>

          <label className="evento-label">
            Hora de término:
            <input
              type="time"
              name="hora_termino_evento"
              value={formData.hora_termino_evento}
              onChange={handleInputChange}
              className="evento-input"
            />
          </label>
        </div>

        <div className="form-group">
          <label className="evento-label">
            Descripción del evento:
            <textarea
              name="descripcion_evento"
              value={formData.descripcion_evento}
              onChange={handleInputChange}
              className="evento-input evento-textarea"
              required
              maxLength={2000}
              placeholder="Describe tu evento detalladamente"
              rows={5}
            />
          </label>
        </div>

        <div className="form-group">
          <label className="evento-label">
            Descripción breve:
            <input
              type="text"
              name="descripcion_breve_evento"
              value={formData.descripcion_breve_evento}
              onChange={handleInputChange}
              className="evento-input"
              maxLength={200}
              placeholder="Breve descripción para mostrar en listados"
            />
          </label>
        </div>

        <div className="form-group location">
          <label className="evento-label">
            Comuna:
            <input
              type="text"
              name="ubicacion_comuna_evento"
              value={formData.ubicacion_comuna_evento}
              onChange={handleInputChange}
              className="evento-input"
              required
              placeholder="Comuna del evento"
            />
          </label>

          <label className="evento-label">
            Ciudad:
            <input
              type="text"
              name="ubicacion_ciudad_evento"
              value={formData.ubicacion_ciudad_evento}
              onChange={handleInputChange}
              className="evento-input"
              placeholder="Ciudad del evento"
            />
          </label>

          <label className="evento-label">
            Región:
            <input
              type="text"
              name="ubicacion_region_evento"
              value={formData.ubicacion_region_evento}
              onChange={handleInputChange}
              className="evento-input"
              placeholder="Región del evento"
            />
          </label>
        </div>

        <div className="form-group">
          <label className="evento-label">
            Dirección:
            <input
              type="text"
              name="direccion_evento"
              value={formData.direccion_evento}
              onChange={handleInputChange}
              className="evento-input"
              required
              placeholder="Dirección específica del evento"
            />
          </label>
        </div>


        <div className="form-group">
          <label className="evento-label">
            Categoria:
            <select
              name="categoria_evento"
              value={formData.categoria_evento}
              onChange={handleInputChange}
              className="evento-input"
              required
            >
              <option value="">Selecciona una categoría</option>
              <option value="deporte">Deporte</option>
              <option value="cultura">Cultura</option>
              <option value="entretenimiento">Entretenimiento</option>
              <option value="politica">Politica</option>
              <option value="economía">Economía</option>
              <option value="tecnología">Tecnología</option>
              <option value="ciencia">Ciencia</option>
              <option value="salud">Salud</option>
              <option value="medio ambiente">Medio ambiente</option>
              <option value="educación">Educación</option>
              <option value="música">Música</option>
              <option value="arte">Arte</option>
              <option value="cine">Cine</option>
              <option value="teatro">Teatro</option>
              <option value="danza">Danza</option>
              <option value="relajación">Relajación</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label className="evento-label">
            Precio:
            <input
              type="text"
              name="precio_evento"
              value={formData.precio_evento}
              onChange={handleInputChange}
              className="evento-input"
              placeholder="Precio del evento (opcional)"
            />
          </label>
        </div>

        <div className="form-group">
          <label className="evento-label">
            Edad mínima requerida:
            <input
              type="number"
              name="edad_requerida_evento"
              value={formData.edad_requerida_evento}
              onChange={handleInputChange}
              className="evento-input"
              min="0"
              max="100"
              placeholder="Edad mínima requerida"
            />
          </label>
        </div>

        <div className="form-group">
          <label className="evento-label">
            Imágenes del evento:
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="evento-input"
              accept="image/*"
            />
            <small className="input-help">
              Máximo 5MB por imagen. Formatos permitidos: JPG, PNG, GIF
            </small>
          </label>
          {renderImagePreviews()}
        </div>

        <button 
          type="submit" 
          className="evento-button"
          disabled={isLoading}
        >
          {isLoading ? 'Creando evento...' : 'Crear Evento'}
        </button>
      </form>
    </div>
  );
};

export default PublicarEvent;