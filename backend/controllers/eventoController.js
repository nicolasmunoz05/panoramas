import Evento from '../models/eventoModel.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export const encontrarTodoEvento = async (req, res) => {
    try {
        const data = await Evento.find(); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const encontrarEvento = async (req, res) => {
    try {
        const { id } = req.params; 
        const data = await Evento.findById(id); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};
//editar malo aun
export const editarEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo_evento, fecha_evento_inicio, fecha_evento_termino, descripcion_evento,descripcion_breve_evento, ubicacion_evento_ciudad, ubicacion_evento_region, creador_evento, status_evento, hora_inicio_evento, hora_termino_evento, aceptacion_evento, url_img_evento, categoria_evento } = req.body;
        const data = await Evento.updateOne({_id:id}, { $set: {titulo_evento, fecha_evento_inicio, fecha_evento_termino, descripcion_evento,descripcion_breve_evento, ubicacion_evento_ciudad, ubicacion_evento_region, creador_evento, status_evento, hora_inicio_evento, hora_termino_evento, aceptacion_evento, url_img_evento, categoria_evento }}); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};  

const borrarImagen = async(id)=>{
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
export const borrarEvento = async (req, res) => {
    try {
        const { id } = req.params;
        await borrarImagen(id);
        await Evento.findByIdAndDelete(id);
        res.json('Registro Borrado con Éxito');
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const ordenarEvento = async (req, res) => {
    try {
        const data = await Evento.find().sort({ fecha_evento_inicio: -1 });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
