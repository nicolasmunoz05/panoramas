import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';


// Asegúrate de construir correctamente las rutas de las imágenes
const imagePath1 = path.resolve( 'uploads/sc/359_Tradiciones_Chonchinas.jpg.1000x1000_q85.jpg');  // Ruta de la primera imagen
const imagePath2 = path.resolve( 'uploads/sc/400_Mapuche_Puren.jpg.1000x1000_q85.jpg');  // Ruta de la segunda imagen

// Verificar que las rutas sean correctas
console.log("Ruta imagen 1:", imagePath1);
console.log("Ruta imagen 2:", imagePath2);

// Crear un objeto FormData
const form = new FormData();

// Agregar campos del panorama
form.append('titulo_panorama', 'Título del Panorama');
form.append('descripcion_panorama', 'Descripción detallada del panorama');
form.append('descripcion_breve_panorama', 'Breve descripción del panorama');
form.append('dias_panorama', 'Lunes, Miércoles, Viernes');
form.append('horario_inicio_panorama', '09:00');
form.append('horario_termino_panorama', '11:00');
form.append('direccion_panorama', 'Calle Ficticia 123');
form.append('ubicacion_ciudad_panorama', 'Ciudad Ficticia');
form.append('ubicacion_region_panorama', 'Región Ficticia');
form.append('ubicacion_comuna_panorama', 'Comuna Ficticia');
form.append('status_panorama', 'activo');
form.append('precio_panorama', 'gratis');
form.append('web_panorama', 'http://www.ejemplo.com');
form.append('creador_panorama', '6700055e24d4a65ac7852842');


form.append('img_panorama', fs.createReadStream(imagePath1));  
form.append('img_panorama', fs.createReadStream(imagePath2));  

const url = 'http://localhost:8000/panorama/'; 

// Realizar la solicitud POST para subir los datos
axios.post(url, form, {
  headers: {
    ...form.getHeaders(),  
  }
})
.then(response => {
  console.log('Panorama creado exitosamente:', response.data);
})
.catch(error => {
  console.error('Error al crear panorama:', error.response ? error.response.data : error.message);
});
