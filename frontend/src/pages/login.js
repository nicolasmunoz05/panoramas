//import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
//import "../styles/login.css";
//import Navbar from "../components/navbar.js";
//
//const Login = () => {
//    const [credentials, setCredentials] = useState({
//        email_usuario: "",
//        contrasena_usuario: "",
//    });
//    const [error, setError] = useState("");
//    const [isSubmitting, setIsSubmitting] = useState(false);
//    const navigate = useNavigate();
//
//    const handleChange = (e) => {
//        const { name, value } = e.target;
//        setCredentials((prev) => ({
//            ...prev,
//            [name]: value,
//        }));
//    };
//
//    const handleSubmit = async (e) => {
//        e.preventDefault();
//        setError("");
//        setIsSubmitting(true);
//        console.log("iniciando proceso de login");
//    
//        try {
//            const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
//                method: "POST",
//                headers: {
//                    "Content-Type": "application/json",
//                },
//                body: JSON.stringify(credentials),
//            });
//    
//            const data = await response.json();
//            console.log("respuesta del servidor");
//    
//            if (!response.ok) {
//                throw new Error(data.message || "Error al iniciar sesión");
//            }
//    
//            // Guardar el token y los datos del usuario en localStorage
//            localStorage.setItem("token", data.token);
//            localStorage.setItem("user", JSON.stringify(data.user));
//            console.log("datos guardados")
//    
//            alert("Inicio de sesión exitoso");
//            navigate("/"); // Redirigir a la página principal o a la página de perfil
//        } catch (error) {
//            console.error("Error de inicio de sesión:", error);
//            setError(error.message || "Error desconocido al iniciar sesión");
//        } finally {
//            setIsSubmitting(false);
//        }
//    };
//
//    return (
//        <div>
//            <Navbar />
//            <div className="login-container">
//                <div className="login-card">
//                    <h2>Iniciar Sesión</h2>
//                    <p className="welcome-text">Bienvenido a ChilExplora!</p>
//
//                    <form onSubmit={handleSubmit} className="login-form">
//                        <div className="form-group">
//                            <label htmlFor="email_usuario">Correo Electrónico</label>
//                            <input
//                                id="email_usuario"
//                                type="email"
//                                name="email_usuario"
//                                value={credentials.email_usuario}
//                                onChange={handleChange}
//                                required
//                                placeholder="correo@ejemplo.com"
//                                className="form-input"
//                            />
//                        </div>
//
//                        <div className="form-group">
//                            <label htmlFor="contrasena_usuario">Contraseña</label>
//                            <input
//                                id="contrasena_usuario"
//                                type="password"
//                                name="contrasena_usuario"
//                                value={credentials.contrasena_usuario}
//                                onChange={handleChange}
//                                required
//                                placeholder="*********"
//                                className="form-input"
//                            />
//                        </div>
//
//                        {error && <div className="error-message">{error}</div>}
//
//                        <button type="submit" className="login-button" disabled={isSubmitting}>
//                            {isSubmitting ? "Iniciando..." : "Iniciar Sesión"}
//                        </button>
//                    </form>
//
//                    <div className="extra-options">
//                        <p>
//                            ¿No tienes cuenta?{" "}
//                            <button
//                                className="link-button"
//                                onClick={() => navigate("/register")}
//                            >
//                                Regístrate
//                            </button>
//                        </p>
//                        <p>
//                            <button
//                                className="link-button"
//                                onClick={() => navigate("/forgotpassword")}
//                            >
//                                Olvidé mi contraseña
//                            </button>
//                        </p>
//                    </div>
//                </div>
//            </div>
//        </div>
//    );
//};
//
//export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css";
import Navbar from "../components/navbar.js";

const Login = () => {
    const [credentials, setCredentials] = useState({
        email_usuario: "",
        contrasena_usuario: "",
    });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

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
            const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || "Error al iniciar sesión");
            }
    
            login(data.token, data.user);
    
            alert("Inicio de sesión exitoso");
            navigate("/");
        } catch (error) {
            console.error("Error de inicio de sesión:", error);
            setError(error.message || "Error desconocido al iniciar sesión");
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
                            <label htmlFor="email_usuario">Correo Electrónico</label>
                            <input
                                id="email_usuario"
                                type="email"
                                name="email_usuario"
                                value={credentials.email_usuario}
                                onChange={handleChange}
                                required
                                placeholder="correo@ejemplo.com"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contrasena_usuario">Contraseña</label>
                            <input
                                id="contrasena_usuario"
                                type="password"
                                name="contrasena_usuario"
                                value={credentials.contrasena_usuario}
                                onChange={handleChange}
                                required
                                placeholder="*"
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