import axios from 'axios';

const geocodeAddress = async (direccion, ciudad, region) => {
  const url = `https://nominatim.openstreetmap.org/search`;
  try {
    const fullAddress = `${direccion}, ${ciudad}, ${region}`;
    const response = await axios.get(url, {
      params: {
        q: fullAddress,
        format: 'json',
        addressdetails: 1,
        limit: 1,
      },
      headers: {    
        'User-Agent': 'TuAplicacion/1.0 (tu-email@ejemplo.com)',
      },
    });

    const data = response.data;
    if (data.length > 0) {
      const { lat, lon } = data[0];
      return { lat: parseFloat(lat), lng: parseFloat(lon) };
    } else {
      throw new Error('No se encontraron coordenadas para la dirección proporcionada.');
    }
  } catch (error) {
    console.error('Error al geocodificar la dirección:', error.message);
    throw error;
  }
};

export default geocodeAddress;
