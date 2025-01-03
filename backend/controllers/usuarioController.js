import Usuario from '../models/usuarioModel.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//FUNCIONES USUARIOS
//funcion para crear usuario, post

export const crearUsuario = async (req, res) => {
    try {
        const usuario = new Usuario(req.body); 
        const data = await usuario.save();
        res.json(data); 
    } catch (error) {
        res.json({ message: error.message }); 
    }
};

/*export const crearUsuario = async (req, res) => {
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
*/
//funcion para encontrar datos del usuario por correo
export const encontrarUsuarioCorreo = async (req, res) => {
    const { email_usuario } = req.params; // Toma el email desde los parámetros de la URL
    console.log("Correo recibido:", email_usuario); // Depuración
  
    try {
      // Intenta buscar el usuario en la base de datos
      const user = await Usuario.findOne({ email_usuario: email_usuario });
      console.log("Usuario encontrado:", user); // Depuración
  
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado." });
      }
  
      // Responde con el usuario encontrado
      res.json({ message: "Usuario encontrado.", usuario: user });
    } catch (error) {
      console.error("Error en la búsqueda:", error); // Depuración
      res.status(500).json({ error: "Error en el servidor." });
    }
  };
  

//funcion para encontrar los usuarios, get
export const encontrarTodoUsuario = async (req, res) => {
    try {
        const data = await Usuario.find(); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//funcion para encontrar usuario, get
export const encontrarUsuario = async (req, res) => {
    try {
        const { id } = req.params; 
        const data = await Usuario.findById(id); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

//funcion para borrar imagen del usuario, se usa en borrar usuario
const borrarImagen_usuario = async (id) => {
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

//funcion para editar usuario

export const editarUsuario = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre_usuario, contrasena_usuario, rol_usuario, fecha_nacimiento_usuario, telefono_usuario, email_usuario, fecha_creacion_usuario } = req.body;
      const usuario = await Usuario.findOne({ _id: id });
  
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      let update_data = {
        nombre_usuario, contrasena_usuario, rol_usuario,fecha_nacimiento_usuario, telefono_usuario, email_usuario, fecha_creacion_usuario
      };
  
      if (req.file) {
        usuario.setImgUrl(req.file.filename);
        update_data.img_usuario = usuario.img_usuario;
        await borrarImagen_usuario(usuario._id);
      }
  
      const updatedData = await Usuario.findByIdAndUpdate(id, update_data, { new: true });
      res.json(updatedData);
    } catch (error) {
      console.error('Error in editarUsuario:', error);
      res.status(500).json({ message: 'Error actualizando el usuario', error: error.message });
    }
  };

//funcion para borrar usuario
export const borrarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await borrarImagen_usuario(id);
        await Usuario.findByIdAndDelete(id); 
        res.json({ message: 'Registro borrado con éxito' });
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};
