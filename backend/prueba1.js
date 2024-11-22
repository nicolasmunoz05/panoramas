import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';


// Asegúrate de construir correctamente las rutas de las imágenes
const imagePath1 = path.resolve( 'uploads/sc/461_%20Multicultural_Historico_Cuenca_Carbon.jpg.1000x1000_q85.jpg');  // Ruta de la primera imagen
//const imagePath2 = path.resolve( 'uploads/sc/400_Mapuche_Puren.jpg.1000x1000_q85.jpg');  // Ruta de la segunda imagen

// Verificar que las rutas sean correctas
console.log("Ruta imagen 1:", imagePath1);
//console.log("Ruta imagen 2:", imagePath2);

// Crear un objeto FormData
const form = new FormData();

// Agregar campos del panorama
form.append('titulo_panorama', 'Museo Multicultural e Histórico Cuenca del Carbón');
form.append('descripcion_panorama', "El Museo Histórico Carabineros de Chile se creó como Museo y Archivo Histórico de Carabineros, mediante la Orden General N° 189, del 17 de marzo de 1958, con la finalidad de conservar los documentos y objetos que tengan relación con los distintos sistemas de policías u organismos similares existentes en el país. Fue inaugurado oficialmente con motivo del cincuentenario de la Institución, el 29 de abril de 1977. Luego de funcionar en distintas dependencias, en 1992 se trasladó definitivamente a la Escuela de Carabineros del General Carlos Ibáñez del Campo, en la antigua casa decimonónica utilizada por la Dirección de la Escuela, donde funciona hasta hoy.");
form.append('dias_panorama', 'lunes a viernes, Sabado y Domingo');
form.append('horario_inicio_panorama', '10:00, 10:00');
form.append('horario_termino_panorama', '18:00, 14:00');
form.append('direccion_panorama', 'Museo Multicultural e Histórico Cuenca del Carbón');
form.append('ubicacion_ciudad_panorama', 'Coronel');
form.append('ubicacion_region_panorama', 'Región del Biobío');
form.append('ubicacion_comuna_panorama', 'Coronel');
form.append('status_panorama', 'activo');
//form.append('precio_panorama', '$1000');
form.append('web_panorama', "https://www.facebook.com/Museo-de-la-cuenca-del-carb%C3%B");
form.append('categoria_panorama', 'Museo');
form.append('creador_panorama', '6700055e24d4a65ac7852842');


// Agregar las imágenes (si tienes más de una)
form.append('img_panorama', fs.createReadStream(imagePath1));  // Primera imagen
//form.append('img_panorama', fs.createReadStream(imagePath2));  // Segunda imagen

// URL del endpoint de tu API donde se crea el panorama
const url = 'http://localhost:8000/panorama/'; // Reemplaza con la URL real

// Realizar la solicitud POST para subir los datos
axios.post(url, form, {
  headers: {
    ...form.getHeaders(),  // Necesario para enviar correctamente los headers de form-data
  }
})
.then(response => {
  console.log('Panorama creado exitosamente:', response.data);
})
.catch(error => {
  console.error('Error al crear panorama:', error.response ? error.response.data : error.message);
});
