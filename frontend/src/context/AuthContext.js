import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Este useEffect se ejecuta solo una vez al montar el componente
  useEffect(() => {
    checkAuthStatus(); // Verificamos el estado de autenticación cuando el componente se monta
  }, []);

  // Función para verificar si el usuario está autenticado
  const checkAuthStatus = () => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setIsLoggedIn(true);
        setUserData(user);
      } catch (error) {
        console.error("Error al parsear los datos del usuario:", error);
        clearAuthData();
      }
    } else {
      clearAuthData();
    }
  };

  // Función para guardar el token y los datos del usuario
  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoggedIn(true);
    setUserData(user);
  };

  // Función para cerrar sesión y eliminar los datos almacenados
  const logout = () => {
    clearAuthData();
  };

  // Función para eliminar los datos del usuario del almacenamiento local y resetear el estado
  const clearAuthData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, login, logout, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder al contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};


export default AuthContext;