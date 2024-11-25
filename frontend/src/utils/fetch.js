const baseUrl = process.env.REACT_APP_API_URL;

const fetchWithToken = async (endpoint, data = null, method = "GET") => {
  const url = `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const token = localStorage.getItem("token");

  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = { method, headers };

  if (method !== "GET" && data) {
    if (data instanceof FormData) {
      options.body = data; // FormData ya incluye las cabeceras correctas
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



//const baseUrl = process.env.REACT_APP_API_URL
//
//const fetchWithToken = (endpoint, data, method = "GET") => {
//    const url = `${baseUrl}/${endpoint}`;
//  
//    if (method === "GET") {
//      return fetch(url, {
//        method,
//      });
//    } else {
//      return fetch(url, {
//        method,
//        headers: {
//          "Content-type": "application/json",
//        },
//        body: JSON.stringify(data),
//      });
//    }
//  };
//
//  export default fetchWithToken