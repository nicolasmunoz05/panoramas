import Panorama from '../models/panoramaModel.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const crearPanorama = async (req, res) => {
    try {
        console.log('Archivo recibido:', req.files); 
        const imagenesURLs = req.files ? req.files.map(file => file.filename) : [];
        if (imagenesURLs.length < 1 || imagenesURLs.length > 3) {
            return res.status(400).json({ message: 'Debes subir entre 1 y 3 imágenes.' });
        }

        const panorama = new Panorama({
            ...req.body
        });
        
        panorama.setImgUrl(imagenesURLs);

        const data = await panorama.save();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const encontrarTodoPanorama = async (req, res) => {
    try {
        const data = await Panorama.find(); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const encontrarPanorama = async (req, res) => {
    try {
        const { id } = req.params; 
        const data = await Panorama.findById(id); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

export const editarPanorama = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            titulo_panorama, 
            descripcion_panorama,
            descripcion_breve_panorama, 
            dias_panorama, 
            horario_inicio_panorama, 
            horario_termino_panorama, 
            ubicacion_ciudad_panorama, 
            ubicacion_region_panorama,
            ubicacion_comuna_panorama,
            creador_panorama,
            status_panorama, 
            img_toBorrar 
        } = req.body;

        const panorama = await Panorama.findById(id);
        if (!panorama) {
            return res.status(404).json({ message: 'Panorama no encontrado' });
        }

        const updateData = { 
            titulo_panorama, 
            descripcion_panorama,
            descripcion_breve_panorama, 
            dias_panorama, 
            horario_inicio_panorama, 
            horario_termino_panorama, 
            ubicacion_ciudad_panorama, 
            ubicacion_region_panorama,
            ubicacion_comuna_panorama,
            creador_panorama,
            status_panorama 
        };

        if (img_toBorrar && img_toBorrar.length > 0) {
            panorama.img_panorama = (panorama.img_panorama || []).filter(img => {
                if (img) {
                    const imageName = img.split('/').pop(); 
                    if (img_toBorrar.includes(imageName)) {
                        const imagePath = path.join(__dirname, '..', 'uploads', 'panoramas', imageName);
                        fs.unlink(imagePath, (err) => {
                            if (err) {
                                console.error(`Error al borrar la imagen: ${imagePath}`, err);
                            } else {
                                console.log(`Imagen borrada: ${imagePath}`);
                            }
                        });
                        return false; 
                    }
                }
                return true; 
            });
        }

        let allImageFilenames = (panorama.img_panorama || [])
            .filter(url => url != null)
            .map(url => url.split('/').pop());

        if (req.files && req.files.length > 0) {
            const newImageFilenames = req.files.map(file => file.filename);
            allImageFilenames = [...allImageFilenames, ...newImageFilenames];
        }

        panorama.setImgUrl(allImageFilenames);
        updateData.img_panorama = panorama.img_panorama;

        const updatedPanorama = await Panorama.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedPanorama) {
            return res.status(404).json({ message: "No se pudo actualizar el panorama" });
        }
        
        res.json({ message: "Panorama actualizado con éxito", data: updatedPanorama });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

const borrarImagen = async(id)=>{
    const panorama = await Panorama.findById(id);
    if (!panorama) {
        return res.status(404).json({ message: 'Panorama no encontrado' });
    }
    if (panorama.img_panorama && panorama.img_panorama.length > 0) {
        for (const img of panorama.img_panorama) {
            const imageName = img.split('/').pop();
            console.log(imageName);
            const imagePath = path.join(__dirname, '..', 'uploads', 'panoramas', imageName);

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
export const borrarPanorama = async (req, res) => {
    try {
        const { id } = req.params;
        await borrarImagen(id);
        await Panorama.findByIdAndDelete(id);
        res.json('Registro Borrado con Éxito');
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}