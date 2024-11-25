import React, { useState, useEffect } from "react";
import "../styles/carousel.css";

const Carousel = ({ eventos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === eventos.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [eventos]);

  const handlePrevious = () => {
    setCurrentIndex(currentIndex === 0 ? eventos.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex === eventos.length - 1 ? 0 : currentIndex + 1);
  };

  if (!eventos || eventos.length === 0) return null;

  return (
    <div className="carousel-container">
      {eventos.map((evento, index) => (
        <div
          key={index}
          className={`carousel-item ${index === currentIndex ? "active" : ""}`}
        >
          <img
            src={evento.img_evento[0]}
            alt={evento.titulo_evento}
            className="carousel-image"
          />
          <div className="carousel-details">
            <h3>{evento.titulo_evento}</h3>
            <p>
              <strong>Fecha:</strong> {evento.fecha_evento_inicio}
            </p>
            <p>
              <strong>Hora:</strong> {evento.hora_inicio_evento}
            </p>
            <p>
              <strong>Descripción:</strong> {evento.descripcion_evento}
            </p>
            <p>
              <strong>Ciudad:</strong> {evento.ubicacion_ciudad_evento}
            </p>
            <p>
              <strong>Dirección:</strong> {evento.direccion_evento}
            </p>
            <p>
              <strong>Categoría:</strong> {evento.categoria_evento}
            </p>
            <p>
              <strong>Precio:</strong>{" "}
              {evento.precio_evento > 0
                ? `$${evento.precio_evento}`
                : "Gratuito"}
            </p>
          </div>
        </div>
      ))}
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
