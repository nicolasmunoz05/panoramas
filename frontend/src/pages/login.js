import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import Navbar from "../components/navbar.js";
import fetchWithToken from "../utils/fetch.js";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Para deshabilitar el botón durante la carga
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Llamada al backend
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, credentials, "POST");
      // Guardar el token si el inicio de sesión es exitoso
      localStorage.setItem("token", response.token);
      alert("Inicio de sesión exitoso");
      navigate("/"); // Redirigir a la página principal
    } catch (err) {
      console.error("Error de inicio de sesión:", err);
      setError(err.message || "Error desconocido al iniciar sesión");
    } finally {
      setIsSubmitting(false);
    }
  }; 

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <div className="login-card">
          <h2>Iniciar Sesión</h2>
          <p className="welcome-text">Bienvenido a ChilExplora!</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                id="email"
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
                placeholder="correo@ejemplo.com"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                placeholder="*********"
                className="form-input"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-button" disabled={isSubmitting}>
              {isSubmitting ? "Iniciando..." : "Iniciar Sesión"}
            </button>
          </form>

          <div className="extra-options">
            <p>
              ¿No tienes cuenta?{" "}
              <button
                className="link-button"
                onClick={() => navigate("/register")}
              >
                Regístrate
              </button>
            </p>
            <p>
              <button
                className="link-button"
                onClick={() => navigate("/forgotpassword")}
              >
                Olvidé mi contraseña
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
