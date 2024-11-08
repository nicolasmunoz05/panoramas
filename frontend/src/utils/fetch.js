const baseUrl = process.env.REACT_APP_API_URL

const fetchWithToken = (endpoint, data, method = "GET") => {
    const url = `${baseUrl}/${endpoint}`;
  
    if (method === "GET") {
      return fetch(url, {
        method,
      });
    } else {
      return fetch(url, {
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
  };

  export default fetchWithToken