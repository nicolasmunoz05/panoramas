import axios from 'axios';
import fs from 'fs';

// Función parseHorario para transformar los datos
const parseHorario = (horarioString) => {
  if (!horarioString) return { dias_panorama: null, horario_inicio_panorama: null, horario_termino_panorama: null };

  // Regex para capturar los días
  const diasRegex = /([a-zA-Záéíóúñ]+(?:\s+a\s+[a-zA-Záéíóúñ]+)?)(?=,)/g;
  const diasMatch = horarioString.match(diasRegex);
  const dias = diasMatch ? [...new Set(diasMatch)] : []; // Eliminar duplicados y manejar el caso nulo

  // Regex para capturar los horarios de inicio y término
  const horarioRegex = /(\d{2}:\d{2})\s+a\s+(\d{2}:\d{2})/g;
  const horarios = [...horarioString.matchAll(horarioRegex)];

  // Obtenemos los horarios únicos de inicio y término
  const horarioInicio = [...new Set(horarios.map(h => h[1]))];
  const horarioTermino = [...new Set(horarios.map(h => h[2]))];

  // Seleccionamos los valores solicitados
  const diasPanorama = dias[0] || null; // Solo el primer rango de días
  const horarioInicioPanorama = horarioInicio[0] || null; // Solo el primer horario de inicio
  const horarioTerminoPanorama = horarioTermino.sort()[0] || null; // El más temprano

  return {
    dias_panorama: diasPanorama,
    horario_inicio_panorama: horarioInicioPanorama,
    horario_termino_panorama: horarioTerminoPanorama,
  };
};

// Ruta del archivo JSON
const jsonFilePath = './resultados.json';

// Leer los datos del archivo JSON
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }

  // Parsear el contenido del archivo JSON
  let jsonData;
  try {
    jsonData = JSON.parse(data);
  } catch (parseError) {
    console.error('Error al parsear el archivo JSON:', parseError);
    return;
  }

  // Verificar si jsonData es un objeto y no un array
  if (typeof jsonData !== 'object' || jsonData === null) {
    console.error('El archivo JSON no contiene un objeto válido');
    return;
  }

  // Iterar sobre las claves del objeto y procesarlas
  Object.entries(jsonData).forEach(([key, item]) => {
    if (item.horario_panorama) {
      const parsedHorario = parseHorario(item.horario_panorama);
      item.dias_panorama = parsedHorario.dias_panorama;
      item.horario_inicio_panorama = parsedHorario.horario_inicio_panorama;
      item.horario_termino_panorama = parsedHorario.horario_termino_panorama;
    }
  });

  // URL del endpoint al que deseas subir los datos
  const url = 'http://localhost:8000/panorama/'; 

  // Hacer una solicitud POST con los datos procesados
  axios.post(url, jsonData)
    .then(response => {
      console.log('Datos subidos con éxito:', response.data);
    })
    .catch(error => {
      console.error('Error al subir los datos:', error);
    });
});
