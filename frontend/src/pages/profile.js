import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/navbar.js";
import fetchWithToken from "../utils/fetch.js";
import "../styles/profile.css";

const Profile = () => {
    const { userData, login, logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        nombre_usuario: "",
        telefono_usuario: "",
        email_usuario: "",
        fecha_nacimiento_usuario: "",
        img_usuario: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const data = await fetchWithToken("/usuario/perfil", {}, "GET");
            setFormData({
                nombre_usuario: data.nombre_usuario,
                telefono_usuario: data.telefono_usuario,
                email_usuario: data.email_usuario,
                fecha_nacimiento_usuario: data.fecha_nacimiento_usuario,
                img_usuario: data.img_usuario || []
            });
            setIsLoading(false);
        } catch (error) {
            setError("Error al cargar los datos del usuario");
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                if (key !== 'img_usuario') {
                    formDataToSend.append(key, formData[key]);
                }
            });

            if (selectedImage) {
                formDataToSend.append('img_usuario', selectedImage);
            }

            const updatedUser = await fetchWithToken(
                "/usuario/actualizar",
                formDataToSend,
                "PUT",
                true // flag para indicar que es FormData
            );

            login(localStorage.getItem("token"), updatedUser);
            setIsEditing(false);
            alert("Perfil actualizado exitosamente");
            loadUserData(); // Recargar los datos actualizados
        } catch (error) {
            setError("Error al actualizar el perfil: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.")) {
            try {
                await fetchWithToken("/usuario/eliminar", {}, "DELETE");
                logout();
                alert("Cuenta eliminada exitosamente");
                navigate("/");
            } catch (error) {
                setError("Error al eliminar la cuenta: " + error.message);
            }
        }
    };

    if (isLoading) {
        return (
            <div>
                <Navbar />
                <div className="profile-container">
                    <div className="loading">Cargando...</div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="profile-container">
                <div className="profile-card">
                    <h2>Mi Perfil</h2>
                    
                    {/* Imagen de perfil */}
                    <div className="profile-image-container">
                        {formData.img_usuario && formData.img_usuario.length > 0 ? (
                            <img 
                                src={formData.img_usuario[0]} 
                                alt="Foto de perfil" 
                                className="profile-image"
                            />
                        ) : (
                            <div className="profile-image-placeholder">
                                Sin foto de perfil
                            </div>
                        )}
                        {isEditing && (
                            <input
                                type="file"
                                onChange={handleImageChange}
                                accept="image/*"
                                className="profile-image-input"
                            />
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="profile-form">
                        <div className="form-group">
                            <label>Nombre:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="nombre_usuario"
                                    value={formData.nombre_usuario}
                                    onChange={handleChange}
                                    className="profile-input"
                                    required
                                />
                            ) : (
                                <p>{formData.nombre_usuario}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Email:</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email_usuario"
                                    value={formData.email_usuario}
                                    onChange={handleChange}
                                    className="profile-input"
                                    required
                                />
                            ) : (
                                <p>{formData.email_usuario}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Teléfono:</label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    name="telefono_usuario"
                                    value={formData.telefono_usuario}
                                    onChange={handleChange}
                                    className="profile-input"
                                    required
                                />
                            ) : (
                                <p>{formData.telefono_usuario}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Fecha de nacimiento:</label>
                            {isEditing ? (
                                <input
                                    type="date"
                                    name="fecha_nacimiento_usuario"
                                    value={formData.fecha_nacimiento_usuario.split('T')[0]}
                                    onChange={handleChange}
                                    className="profile-input"
                                    required
                                />
                            ) : (
                                <p>{new Date(formData.fecha_nacimiento_usuario).toLocaleDateString()}</p>
                            )}
                        </div>

                        <div className="button-group">
                            {isEditing ? (
                                <>
                                    <button type="submit" className="save-button" disabled={isLoading}>
                                        {isLoading ? "Guardando..." : "Guardar cambios"}
                                    </button>
                                    <button
                                        type="button"
                                        className="cancel-button"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancelar
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        className="edit-button"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Editar perfil
                                    </button>
                                    <button
                                        type="button"
                                        className="delete-button"
                                        onClick={handleDeleteAccount}
                                    >
                                        Eliminar cuenta
                                    </button>
                                </>
                            )}
                        </div>
                    </form>
                    
                    {error && <div className="error-message">{error}</div>}
                </div>
            </div>
        </div>
    );
};

export default Profile;