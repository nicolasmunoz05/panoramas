const baseUrl = process.env.REACT_APP_API_URL;

if (!baseUrl) {
  console.error(
    "REACT_APP_API_URL no está definida en las variables de entorno"
  );
}

/**
 * Función para realizar solicitudes HTTP con o sin token, admitiendo FormData.
 * @param {string} endpoint - Endpoint de la API.
 * @param {object|null} data - Datos a enviar en el cuerpo de la solicitud.
 * @param {string} method - Método HTTP (GET, POST, PUT, DELETE).
 * @param {boolean} useAuth - Indica si se debe incluir el token de autenticación. Default: true.
 * @returns {Promise<object|string>} Respuesta de la API.
 */
const fetchWithToken = async (
  endpoint,
  data = null,
  method = "GET",
  useAuth = true
) => {
  // Construcción de la URL
  const url = `${baseUrl || ""}${
    endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  }`;
  const token = localStorage.getItem("token");

  if (!token && useAuth) {
    console.warn(
      "No se encontró token en localStorage para una solicitud autenticada"
    );
  }

  const headers = {};
  if (useAuth && token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = { method, headers };

  if (method !== "GET" && data) {
    if (data instanceof FormData) {
      // Log del contenido de FormData para depuración
      console.log("FormData contenido:", Object.fromEntries(data.entries()));
      options.body = data;
    } else {
      headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(data);
    }
  }

  // Log detallado de la solicitud
  console.log("Detalles de la solicitud:", {
    url,
    method,
    headers: { ...options.headers },
    bodyType: data instanceof FormData ? "FormData" : typeof data,
    token: useAuth ? (token ? "Present" : "Missing") : "Not required",
  });

  try {
    console.log(`Iniciando fetch a ${url}...`);
    const response = await fetch(url, options);
    console.log("Respuesta recibida:", {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    });

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      let errorMessage;
      try {
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage =
            errorData.message || errorData.error || "Error en la solicitud";
        } else {
          const errorText = await response.text();
          errorMessage =
            errorText || `Error ${response.status}: ${response.statusText}`;
        }
      } catch (e) {
        errorMessage = `Error ${response.status}: ${response.statusText}`;
      }

      console.error("Error en la respuesta:", {
        status: response.status,
        message: errorMessage,
        contentType,
      });

      throw new Error(errorMessage);
    }

    // Procesar respuesta exitosa
    console.log("Procesando respuesta exitosa...");
    if (contentType && contentType.includes("application/json")) {
      const jsonResponse = await response.json();
      console.log("Respuesta JSON:", jsonResponse);
      return jsonResponse;
    } else {
      const textResponse = await response.text();
      console.log("Respuesta texto:", textResponse);
      return textResponse;
    }
  } catch (error) {
    console.error("Error completo:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
      url,
      method,
      headers: options.headers,
    });
    throw error;
  }
};

export default fetchWithToken;
