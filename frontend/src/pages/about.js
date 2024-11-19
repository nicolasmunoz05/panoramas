import React from "react";
import "../styles/about.css"; // Archivo CSS para estilos específicos
import Navbar from "../components/navbar";

const About = () => {
  return (
    <>
      <Navbar />

      <div className="about-page">
        <header className="about-header">
          <h1>Sobre Nosotros</h1>
          <p>Conoce al equipo detrás del proyecto y nuestra visión.</p>
        </header>

        {/* Sección del equipo */}
        <section className="about-team">
          <h2>Nuestro Equipo</h2>
          <div className="team-members">
            <div className="team-member">
              <img
                src="https://via.placeholder.com/150"
                alt="Integrante 1"
                className="team-photo"
              />
              <h3>Juan Maldonado V</h3>
              <p>Desarrollador Front-End</p>
            </div>
            <div className="team-member">
              <img
                src="../juanm.png"
                alt="Integrante 2"
                className="team-photo"
              />
              <h3>Juan Meza V</h3>
              <p>Desarrollador Back-End</p>
            </div>
            <div className="team-member">
              <img
                src="/nicolasm.png"
                alt="Integrante 3"
                className="team-photo"
              />
              <h3>Nicolás Muñoz</h3>
              <p>Desarrollador Front-End</p>
            </div>
          </div>
          <h3>Jefe de Proyecto: Mauricio Aguilera</h3>
        </section>

        {/* Sección sobre el proyecto */}
        <section className="about-project">
          <h2>El Proyecto</h2>
          <p>
            Este proyecto es parte del ramo Taller de Ingeniería de Software
            impartido por el profesor Jerman Espindola en la universidad.
            Nuestro objetivo es desarrollar una plataforma innovadora para
            facilitar la búsqueda de panoramas y eventos turísticos en Chile.
          </p>
        </section>

        {/* Sección de visión */}
        <section className="about-vision">
          <h2>Nuestra Visión</h2>
          <p>
            Buscamos conectar a las personas con los mejores eventos y
            panoramas, ofreciendo una experiencia visualmente atractiva y
            funcional.
          </p>
        </section>

        {/* Sección de tecnologías */}
        <section className="about-technologies">
          <h2>Tecnologías Utilizadas</h2>
          <ul>
            <li>Frontend: React, Bootstrap</li>
            <li>Backend: Node.js, Express.js</li>
            <li>Base de Datos: MongoDB</li>
            <li>Lenguajes: JavaScript</li>
            <li>Librerías: Toastify, Axios</li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default About;
