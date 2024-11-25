import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/navbar';
import "../styles/profile.css"

const Profile = () => {
    const { isLoggedIn, userData, logout } = useAuth();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login'); // Redirige si no hay sesión activa
        } else if (userData?.email_usuario) {
            fetchUserProfile(userData.email_usuario);
        }
    }, [isLoggedIn, userData, navigate]);

    const fetchUserProfile = async (email) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8000/usuario/${email}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Incluye el token en la cabecera
                },
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al obtener los datos del usuario');
            }

            setProfile(data.usuario);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEditProfile = () => {
        navigate('/edit-profile', { state: { profile } }); // Redirige a la página de edición con el perfil actual
    };

    const handleDeleteProfile = async () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar tu perfil?')) {
            try {
                const response = await fetch(`http://localhost:8000/usuario/${profile._id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al eliminar el perfil');
                }

                logout(); // Cierra la sesión
                localStorage.clear();
                alert('Perfil eliminado con éxito');
                navigate('/register'); // Redirige al registro después de eliminar el perfil
            } catch (error) {
                console.error('Error al eliminar el perfil:', error);
                setError(error.message);
            }
        }
    };

    return (
        <div>
            <Navbar /> {/* Navbar para la navegación */}
            <div className="profile-container">
                <h2>Mi Perfil</h2>

                {error && <p className="error-message">{error}</p>} {/* Mensaje de error */}

                {loading ? (
                    <p>Cargando...</p> // Muestra mientras los datos se cargan
                ) : (
                    profile ? (
                        <div className="user-info">
                            <p><strong>Nombre:</strong> {profile.nombre_usuario}</p>
                            <p><strong>Rol:</strong> {profile.rol_usuario} (No editable)</p>
                            <p><strong>Fecha de Nacimiento:</strong> {new Date(profile.fecha_nacimiento_usuario).toLocaleDateString()}</p>
                            <p><strong>Teléfono:</strong> {profile.telefono_usuario}</p>
                            <p><strong>Email:</strong> {profile.email_usuario}</p>
                            {profile.img_usuario.length > 0 ? (
                                <img 
                                    src={profile.img_usuario[0]} 
                                    alt="Foto de perfil" 
                                    style={{ width: '150px', borderRadius: '50%' }} 
                                />
                            ) : (
                                <p>No tienes una foto de perfil.</p>
                            )}
                            <button onClick={handleEditProfile} className="edit-button">
                                Editar Perfil
                            </button>
                            <button onClick={handleDeleteProfile} className="delete-button">
                                Eliminar Perfil
                            </button>
                        </div>
                    ) : (
                        <p>No se encontraron datos del perfil.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default Profile;
