import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/description.css';

const Description = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate('/');
    }

    const fetchData = async () => {
      try {
        // Simular datos por ahora
        setData({
          title: "Evento de Ejemplo",
          date: "15 de Octubre",
          distance: "12 mins from hotel",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          instructions: "Indicaciones variadas del evento: si es gratuito o de paga, si tiene alguna restricción, como se puede llegar, si hay restaurantes cerca, etc."
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  if (loading) return <div>Cargando...</div>;
  if (!data) return <div>No se encontró el elemento</div>;

  return (
    <div className="description-container">
      <main className="main-content">
        <div className="hero-section">
          <div className="hero-image">
            <img src="https://via.placeholder.com/1200x400" alt="Event" />
            <div className="hero-overlay">
              <h2>{data.title}</h2>
              <div className="hero-badges">
                <span className="badge">{data.date}</span>
                <span className="badge">{data.distance}</span>
              </div>
            </div>
          </div>
        </div>

        <section className="content-section">
          <h3>Descripción</h3>
          <p>{data.description}</p>
        </section>

        <section className="map-section">
          <div className="map-container">
            <div className="map-placeholder">
              <span className="map-icon">📍</span>
            </div>
            <p className="map-instructions">{data.instructions}</p>
          </div>
        </section>

        <section className="similar-section">
          <h3>Similares</h3>
          <div className="similar-grid">
            {Array(6).fill(null).map((_, index) => (
              <div key={index} className="similar-card">
                <div className="similar-image">
                  <img src="https://via.placeholder.com/200x200" alt={`Similar event ${index + 1}`} />
                </div>
                <div className="similar-info">
                  <h4>Evento Similar {index + 1}</h4>
                  <p>Breve descripción</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Description;