const baseUrl = process.env.REACT_APP_API_URL;

const fetchWithToken = async (
  endpoint,
  data = null,
  method = "GET",
  useAuth = true
) => {
  const url = `${baseUrl}${
    endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  }`;

  const headers = {};
  const options = { method, headers };

  // Agregar token si `useAuth` está habilitado y hay token disponible
  if (useAuth) {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.warn(
        "Intentando usar autenticación, pero no hay token disponible."
      );
    }
  }

  // Configurar el cuerpo de la solicitud si no es GET
  if (method !== "GET" && data) {
    if (data instanceof FormData) {
      options.body = data; // FormData ya maneja sus propias cabeceras
    } else {
      headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(data);
    }
  }

  console.log("Enviando solicitud a:", url, options);

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorDetails = await response.json().catch(() => null);
      throw new Error(errorDetails?.message || "Error desconocido");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al realizar la solicitud:", error.message);
    throw error;
  }
};

export default fetchWithToken;
