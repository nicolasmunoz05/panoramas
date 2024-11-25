//const baseUrl = process.env.REACT_APP_API_URL;
//
//const fetchWithToken = async (endpoint, data = null, method = "GET") => {
//  const url = `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
//
//  const token = localStorage.getItem("token");
//
//  const headers = {};
//  if (token) {
//    headers["Authorization"] = `Bearer ${token}`;
//  }
//
//  const options = { method, headers };
//
//  if (method !== "GET" && data) {
//    if (data instanceof FormData) {
//      options.body = data; // FormData ya incluye las cabeceras correctas
//    } else {
//      headers["Content-Type"] = "application/json";
//      options.body = JSON.stringify(data);
//    }
//  }
//
//  console.log("Enviando solicitud a:", url, options);
//
//  try {
//    const response = await fetch(url, options);
//    if (!response.ok) {
//      const errorDetails = await response.json().catch(() => null);
//      throw new Error(errorDetails?.message || "Error desconocido");
//    }
//    return await response.json();
//  } catch (error) {
//    console.error("Error al realizar la solicitud:", error.message);
//    throw error;
//  }
//};
//
//export default fetchWithToken;


//onst baseUrl = process.env.REACT_APP_API_URL
//
//onst fetchWithToken = (endpoint, data, method = "GET") => {
//   const url = `${baseUrl}/${endpoint}`;
// 
//   if (method === "GET") {
//     return fetch(url, {
//       method,
//     });
//   } else {
//     return fetch(url, {
//       method,
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//   }
// };
//
// export default fetchWithToken




const baseUrl = process.env.REACT_APP_API_URL;

if (!baseUrl) {
  console.error('REACT_APP_API_URL no está definida en las variables de entorno');
}

const fetchWithToken = async (endpoint, data = null, method = "GET") => {
  // Verificar y construir URL
  const url = `${baseUrl || ''}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn('No se encontró token en localStorage');
  }

  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = { method, headers };

  if (method !== "GET" && data) {
    if (data instanceof FormData) {
      // Log del contenido de FormData para debugging
      console.log('FormData contenido:', Object.fromEntries(data.entries()));
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
    bodyType: data instanceof FormData ? 'FormData' : typeof data,
    token: token ? 'Present' : 'Missing'
  });

  try {
    console.log(`Iniciando fetch a ${url}...`);
    const response = await fetch(url, options);
    console.log('Respuesta recibida:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    const contentType = response.headers.get("content-type");
    
    if (!response.ok) {
      let errorMessage;
      try {
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || 'Error en la solicitud';
        } else {
          const errorText = await response.text();
          errorMessage = errorText || `Error ${response.status}: ${response.statusText}`;
        }
      } catch (e) {
        errorMessage = `Error ${response.status}: ${response.statusText}`;
      }
      
      console.error('Error en la respuesta:', {
        status: response.status,
        message: errorMessage,
        contentType
      });
      
      throw new Error(errorMessage);
    }

    // Procesar respuesta exitosa
    console.log('Procesando respuesta exitosa...');
    if (contentType && contentType.includes("application/json")) {
      const jsonResponse = await response.json();
      console.log('Respuesta JSON:', jsonResponse);
      return jsonResponse;
    } else {
      const textResponse = await response.text();
      console.log('Respuesta texto:', textResponse);
      return textResponse;
    }
  } catch (error) {
    console.error("Error completo:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
      url,
      method,
      headers: options.headers
    });
    throw error;
  }
};

export default fetchWithToken;