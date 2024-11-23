import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import Navbar from "../components/navbar.js";
import fetchWithToken from "../utils/fetch.js";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre_usuario: "",
    contrasena_usuario: "",
    telefono_usuario: "",
    email_usuario: "",
    fecha_nacimiento_usuario: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Estado del botón
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Llamar al API para registrar el usuario
      const data = await fetchWithToken("/usuario", formData, "POST");
      alert("Registro exitoso. Revisa tu correo.");
      console.log("Respuesta del servidor:", data);

      // Redirigir al login tras el registro
      navigate("/login");
    } catch (error) {
      alert(`Error al registrar: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <Navbar />
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="register-title">Crea tu cuenta</h2>
        <label className="register-label">
          Nombre de usuario:
          <input
            type="text"
            name="nombre_usuario"
            value={formData.nombre_usuario}
            onChange={handleChange}
            className="register-input"
            placeholder="Ingresa tu nombre"
            required
          />
        </label>
        <label className="register-label">
          Contraseña:
          <input
            type="password"
            name="contrasena_usuario"
            value={formData.contrasena_usuario}
            onChange={handleChange}
            className="register-input"
            placeholder="Ingresa tu contraseña"
            required
          />
        </label>
        <label className="register-label">
          Teléfono:
          <input
            type="tel"
            name="telefono_usuario"
            value={formData.telefono_usuario}
            onChange={handleChange}
            className="register-input"
            placeholder="Ingresa tu número de teléfono"
            required
          />
        </label>
        <label className="register-label">
          Email:
          <input
            type="email"
            name="email_usuario"
            value={formData.email_usuario}
            onChange={handleChange}
            className="register-input"
            placeholder="Ingresa tu email"
            required
          />
        </label>
        <label className="register-label">
          Fecha de nacimiento:
          <input
            type="date"
            name="fecha_nacimiento_usuario"
            value={formData.fecha_nacimiento_usuario}
            onChange={handleChange}
            className="register-input"
            required
          />
        </label>
        <button type="submit" className="register-button" disabled={isSubmitting}>
          {isSubmitting ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
};

export default Register;
