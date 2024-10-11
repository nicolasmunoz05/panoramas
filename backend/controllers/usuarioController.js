import Usuario from '../models/usuarioModel.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const crearUsuario = async (req, res) => {
    try {
        console.log('Archivo recibido:', req.file);
        const imagenURL = req.file ? req.file.filename : ''; 
        
        const usuario = new Usuario({
            ...req.body
        });
        
        if (imagenURL) {
            usuario.setImgUrl(imagenURL); 
        }

        const data = await usuario.save(); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};


export const encontrarTodoUsuario = async (req, res) => {
    try {
        const data = await Usuario.find(); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const encontrarUsuario = async (req, res) => {
    try {
        const { id } = req.params; 
        const data = await Usuario.findById(id); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};
const borrarImagen = async (id) => {
    const usuario = await Usuario.findById(id);
    if (!usuario) {
        throw new Error('Usuario no encontrado'); 
    }

    
    if (usuario.img_usuario && usuario.img_usuario.length > 0) {
        for (const img of usuario.img_usuario) {
            
            const imageName = img.split('/').pop(); 
            console.log(imageName);
            const imagePath = path.join(__dirname, '..', 'uploads', 'usuarios', imageName);

            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(`Error al borrar la imagen: ${imagePath}`, err);
                } else {
                    console.log(`Imagen borrada: ${imagePath}`);
                }
            });
        }
    }
};
//malo aun editar
export const editarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_usuario, contrasena_usuario, rol_usuario, email_usuario, fecha_creacion_usuario } = req.body;
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        let update_data = { 
            nombre_usuario, 
            contrasena_usuario, 
            rol_usuario, 
            email_usuario, 
            fecha_creacion_usuario 
        };

        if (req.file) {
            usuario.setImgUrl(req.file.filename);
            update_data.img_usuario = usuario.img_usuario;
            await borrarImagen(id);
        }
        
        const data = await Usuario.findByIdAndUpdate(id, update_data, { new: true });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const borrarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await borrarImagen(id);
        await Usuario.findByIdAndDelete(id); 
        res.json({ message: 'Registro borrado con éxito' });
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};