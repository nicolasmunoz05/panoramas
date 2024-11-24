import React, { useState, useEffect } from "react";
import "../styles/carousel.css"; // Archivo para los estilos del carrusel

const Carousel = ({ eventos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === eventos.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [eventos]);

  const handlePrevious = () => {
    setCurrentIndex(currentIndex === 0 ? eventos.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex === eventos.length - 1 ? 0 : currentIndex + 1);
  };

  if (!eventos || eventos.length === 0) return null;

  const currentEvent = eventos[currentIndex];

  return (
    <div className="carousel-container">
      <div className="carousel-item">
        <img
          src={currentEvent.img_evento[0]}
          alt={currentEvent.titulo_evento}
          className="carousel-image"
        />
        <div className="carousel-details">
          <h3>{currentEvent.titulo_evento}</h3>
          <p>
            <strong>Fecha:</strong> {currentEvent.fecha_evento_inicio}
          </p>
          <p>
            <strong>Hora:</strong> {currentEvent.hora_inicio_evento}
          </p>
          <p>
            <strong>Descripción:</strong> {currentEvent.descripcion_evento}
          </p>
          <p>
            <strong>Ciudad:</strong> {currentEvent.ubicacion_evento_ciudad}
          </p>
          <p>
            <strong>Dirección:</strong> {currentEvent.direccion_evento}
          </p>
          <p>
            <strong>Categoría:</strong> {currentEvent.categoria_evento}
          </p>
          <p>
            <strong>Precio:</strong>{" "}
            {currentEvent.precio_evento > 0
              ? `$${currentEvent.precio_evento}`
              : "Gratuito"}
          </p>
        </div>
      </div>
      <button className="carousel-btn prev" onClick={handlePrevious}>
        &#8592;
      </button>
      <button className="carousel-btn next" onClick={handleNext}>
        &#8594;
      </button>
      <div className="carousel-indicators">
        {eventos.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
