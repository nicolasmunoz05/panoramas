const baseUrl = process.env.REACT_APP_API_URL;

const fetchWithToken = async (endpoint, data, method = "GET") => {
  // Construir la URL final
  const url = `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  // Obtener el token del localStorage
  const token = localStorage.getItem("token");

  // Configurar los headers
  const headers = {
    "Content-Type": "application/json",
  };

  // Incluir el token si existe
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    // Configurar opciones de la solicitud
    const options = {
      method,
      headers,
    };

    if (method !== "GET") {
      options.body = JSON.stringify(data);
    }

    console.log("Enviando solicitud a:", url, options);

    // Realizar la solicitud al backend
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Error del servidor:", errorDetails);
      throw new Error(errorDetails.message || "Error desconocido");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al realizar la solicitud:", error.message);
    alert(`Error: ${error.message}`);
    throw error;
  }
};

export default fetchWithToken;
