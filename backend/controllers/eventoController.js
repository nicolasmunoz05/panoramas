import Evento from '../models/eventoModel.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// funcion para crear el evento, post

export const crearEvento = async (req, res) => {
    try {
        console.log('Archivo recibido:', req.files); 
        const imagenesURLs = req.files ? req.files.map(file => file.filename) : [];
        if (imagenesURLs.length < 1 || imagenesURLs.length > 3) {
            return res.status(400).json({ message: 'Debes subir entre 1 y 3 imágenes.' });
        }

        const evento = new Evento({
            ...req.body
        });
        
        evento.setImgUrl(imagenesURLs);

        const data = await evento.save();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// funcion para encontrar todos los eventos, get
export const encontrarTodoEvento = async (req, res) => {
    try {
        const data = await Evento.find(); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// funcion para encontrar el evento, get
export const encontrarEvento = async (req, res) => {
    try {
        const { id } = req.params; 
        const data = await Evento.findById(id); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};
//editar malo aun, permite editar todo menos las imagenes
export const editarEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo_evento, fecha_inicio_evento, fecha_termino_evento, descripcion_evento,descripcion_breve_evento,direccion_evento, ubicacion_ciudad_evento, ubicacion_region_evento, ubicacion_comuna_evento, creador_evento, status_evento, hora_inicio_evento, hora_termino_evento, aceptacion_evento, url_img_evento, categoria_evento, precio_evento } = req.body;
        const data = await Evento.updateOne({_id:id}, { $set: {titulo_evento, fecha_inicio_evento, fecha_termino_evento, descripcion_evento, descripcion_breve_evento, direccion_evento, ubicacion_ciudad_evento, ubicacion_region_evento, ubicacion_comuna_evento, creador_evento, status_evento, hora_inicio_evento, hora_termino_evento, aceptacion_evento, url_img_evento, categoria_evento, precio_evento }}); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};  

// funcion para borrar la imagen, se usa dentro de la funcion borrar evento
const borrarImagen_evento = async(id)=>{
    const evento = await Evento.findById(id);
    if (!evento) {
        return res.status(404).json({ message: 'Evento no encontrado' });
    }

    if (evento.img_evento && evento.img_evento.length > 0) {
        for (const img of evento.img_evento) {
            const imageName = img.split('/').pop(); 
            console.log(imageName);
            const imagePath = path.join(__dirname, '..', 'uploads', 'eventos', imageName);

            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(`Error al borrar la imagen: ${imagePath}`, err);
                } else {
                    console.log(`Imagen borrada: ${imagePath}`);
                }
            });
        };
    };
}

// funcion para borrar el evento, del
export const borrarEvento = async (req, res) => {
    try {
        const { id } = req.params;
        await borrarImagen_evento(id);
        await Evento.findByIdAndDelete(id);
        res.json('Registro Borrado con Éxito');
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// funcion para ordenar el evento, get 
export const ordenarEvento = async (req, res) => {
    try {
        const hoy = new Date();
        const fechaLimite = new Date();
        fechaLimite.setDate(hoy.getDate() + 7);

        const data = await Evento.find({
            fecha_inicio_evento: { $gte: hoy },
            fecha_termino_evento: { $lte: fechaLimite },
            aceptacion_evento: true,
            status_evento: { $ne: "terminado" }
        }).sort({ fecha_inicio_evento: -1 });

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// funcion para filtrar evento por categoria, get

export const filtrarPorCategoria = async (req, res) => {
    try {
        const { categoria } = req.params;

        const data = await Evento.find({
            categoria_evento: categoria,
            aceptacion_evento: true,
            status_evento: { $ne: "terminado" }
        }).sort({ fecha_inicio_evento: -1 });

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// funcion para filtrar evento por fecha, get

export const filtrarPorFecha = async (req, res) => {
    try {
        const { fecha } = req.params;
        const fecha_formato = new Date(fecha);
        const data = await Evento.find({
            fecha_inicio_evento: { $gte: fecha_formato },
            aceptacion_evento: true,
            status_evento: { $ne: "terminado" }
        }).sort({ fecha_inicio_evento: -1 });
        res.json(data);
        
    } catch (error) { 
        res.status (500).json({ message: error.message }); 
    }
}
