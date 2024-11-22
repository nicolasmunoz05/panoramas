import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import path from 'path';

// Función parseHorario para transformar los datos
const parseHorario = (horarioString) => {
  if (!horarioString) return { dias_panorama: null, horario_inicio_panorama: null, horario_termino_panorama: null };

  // Regex para capturar los días
  const diasRegex = /([a-zA-Záéíóúñ]+(?:\s+a\s+[a-zA-Záéíóúñ]+)?)(?=,)/g;
  const diasMatch = horarioString.match(diasRegex);
  const dias = [...new Set(diasMatch)]; // Eliminar duplicados

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
  const jsonData = JSON.parse(data);

  // Verificar que jsonData sea un objeto
  console.log(jsonData);

  // Procesar los datos (ahora con la propiedad "horario_panorama")
  Object.values(jsonData).forEach((item) => {  // Usamos Object.values para convertir el objeto en un array
    if (item.horario_panorama) {
      const parsedHorario = parseHorario(item.horario_panorama);
      item.dias_panorama = parsedHorario.dias_panorama;
      item.horario_inicio_panorama = parsedHorario.horario_inicio_panorama;
      item.horario_termino_panorama = parsedHorario.horario_termino_panorama;
    }
  });

  // Crear una instancia de FormData
  const form = new FormData();
  
  // Agregar los datos JSON al FormData
  form.append('data', JSON.stringify(jsonData), {
    contentType: 'application/json',
    filename: 'data.json'
  });

  // Subir las imágenes (si existen en la ruta del JSON)
  Object.values(jsonData).forEach((item) => {  // Usamos Object.values también aquí
    if (item.imagen_ruta_panorama) {
      // Reemplazar las barras invertidas por barras normales
      const imagePath = path.resolve(item.imagen_ruta_panorama.replace(/\\/g, '/')); // Reemplazar '\\' por '/'
      
      if (fs.existsSync(imagePath)) {
        form.append('image', fs.createReadStream(imagePath), path.basename(imagePath)); // Adjuntar la imagen al FormData
      } else {
        console.error(`La imagen en la ruta ${imagePath} no existe.`);
      }
    }
  });

  // URL del endpoint al que deseas subir los datos
  const url = 'http://localhost:8000/panorama/';

  // Hacer una solicitud POST con los datos y las imágenes
  axios.post(url, form, {
    headers: {
      ...form.getHeaders()
    }
  })
  .then(response => {
    console.log('Datos e imágenes subidos con éxito:', response.data);
  })
  .catch(error => {
    console.error('Error al subir los datos e imágenes:', error);
  });
});
