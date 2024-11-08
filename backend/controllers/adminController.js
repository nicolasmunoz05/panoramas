import Panorama from '../models/panoramaModel.js';
import Evento from '../models/eventoModel.js';
import Categoria from '../models/categoriaModel.js';
import Usuario from '../models/usuarioModel.js';
import Mod from '../models/modModel.js';


import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//FUNCIONES PARA LOS PANORAMAS
// funcion para crear el panorama
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

// funcion para encontrar todos los panoramas
export const encontrarTodoPanorama = async (req, res) => {
    try {
        const data = await Panorama.find(); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// funcion para encontrar el panorama
export const encontrarPanorama = async (req, res) => {
    try {
        const { id } = req.params; 
        const data = await Panorama.findById(id); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};
// funcion para editar el panorama
export const editarPanorama = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            titulo_panorama, descripcion_panorama, descripcion_breve_panorama, dias_panorama, horario_inicio_panorama, horario_termino_panorama, direccion_panorama, ubicacion_ciudad_panorama, ubicacion_region_panorama, ubicacion_comuna_panorama, creador_panorama, status_panorama, precio_panorama, visitas_panorama, img_toBorrar 
        } = req.body;

        const panorama = await Panorama.findById(id);
        if (!panorama) {
            return res.status(404).json({ message: 'Panorama no encontrado' });
        }

        const updateData = { 
            titulo_panorama, descripcion_panorama, descripcion_breve_panorama, dias_panorama, horario_inicio_panorama, horario_termino_panorama, direccion_panorama, ubicacion_ciudad_panorama, ubicacion_region_panorama, ubicacion_comuna_panorama, creador_panorama, status_panorama, precio_panorama, visitas_panorama
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

// funcion para borrar la imagen, se usa dentro de la funcion borrar panorama
const borrarImagen_panorama = async(id)=>{
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

// funcion para borrar el panorama
export const borrarPanorama = async (req, res) => {
    try {
        const { id } = req.params;
        await borrarImagen_panorama(id);
        await Panorama.findByIdAndDelete(id);
        res.json('Registro Borrado con Éxito');
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// FUNCIONES PARA LOS EVENTOS
// funcion para crear el evento

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

// funcion para encontrar todos los eventos
export const encontrarTodoEvento = async (req, res) => {
    try {
        const data = await Evento.find(); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// funcion para encontrar el evento
export const encontrarEvento = async (req, res) => {
    try {
        const { id } = req.params; 
        const data = await Evento.findById(id); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};
//funcion editar el evento
export const editarEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            titulo_evento,descripcion_evento, descripcion_breve_evento, dias_evento, horario_inicio_evento, horario_termino_evento, direccion_evento, ubicacion_ciudad_evento, ubicacion_region_evento, ubicacion_comuna_evento, creador_evento, status_evento, precio_evento, visitas_evento, img_toBorrar 
        } = req.body;

        const evento = await Evento.findById(id);
        if (!evento) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        const updateData = { 
            titulo_evento, descripcion_evento, descripcion_breve_evento, dias_evento, horario_inicio_evento, horario_termino_evento, direccion_evento, ubicacion_ciudad_evento, ubicacion_region_evento, ubicacion_comuna_evento, creador_evento, status_evento, precio_evento, visitas_evento
        };

        if (img_toBorrar && img_toBorrar.length > 0) {
            evento.img_evento = (evento.img_evento || []).filter(img => {
                if (img) {
                    const imageName = img.split('/').pop(); 
                    if (img_toBorrar.includes(imageName)) {
                        const imagePath = path.join(__dirname, '..', 'uploads', 'eventos', imageName);
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

        let allImageFilenames = (evento.img_evento || [])
            .filter(url => url != null)
            .map(url => url.split('/').pop());

        if (req.files && req.files.length > 0) {
            const newImageFilenames = req.files.map(file => file.filename);
            allImageFilenames = [...allImageFilenames, ...newImageFilenames];
        }

        evento.setImgUrl(allImageFilenames);
        updateData.img_evento = evento.img_evento;

        const updatedEvento = await Evento.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedEvento) {
            return res.status(404).json({ message: "No se pudo actualizar el evento" });
        }
        
        res.json({ message: "Evento actualizado con éxito", data: updatedEvento });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
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

// funcion para borrar el evento
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

// funcion para ordenar el evento
export const ordenarEvento = async (req, res) => {
    try {
        const hoy = new Date();
        const fechaLimite = new Date();
        fechaLimite.setDate(hoy.getDate() + 7);

        const data = await Evento.find({
            fecha_inicio_evento: { $gte: hoy },
            fecha_termino_evento: { $lte: fechaLimite },
            aceptacion_evento: "aceptado",
            status_evento: { $ne: "terminado" }
        }).sort({ fecha_inicio_evento: -1 });

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// funcion para filtrar evento por categoria

export const filtrarPorCategoriaEvento = async (req, res) => {
    try {
        const { categoria } = req.params;

        const data = await Evento.find({
            categoria_evento: categoria,
            aceptacion_evento: "aceptado",
            status_evento: { $ne: "terminado" }
        }).sort({ fecha_inicio_evento: -1 });

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// funcion para filtrar evento por fecha

export const filtrarPorFechaEvento = async (req, res) => {
    try {
        const { fecha } = req.params;
        const fecha_formato = new Date(fecha);
        const data = await Evento.find({
            fecha_inicio_evento: { $gte: fecha_formato },
            aceptacion_evento: "aceptado",
            status_evento: { $ne: "terminado" }
        }).sort({ fecha_inicio_evento: -1 });
        res.json(data);
        
    } catch (error) { 
        res.status (500).json({ message: error.message }); 
    }
}
// funcion de eventos pendientes

export const filtrarPorPendienteEvento = async (req, res) => {
    try {
        const data = await Evento.find({
            aceptacion_evento: "pendiente",
            status_evento: { $ne: "terminado" }
        }).sort({ fecha_inicio_evento: -1 });

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//FUNCION DE CATEGORIAS
// funcion para crear el categoria
export const crearCategoria = async (req, res) => {
    try {
        const categoria = new Categoria(req.body); 
        const data = await categoria.save();
        res.json(data); 
    } catch (error) {
        res.json({ message: error.message }); 
    }
};

// funcion para encontrar todas las categoria
export const encontrarTodoCategoria = async (req, res) => {
    try {
        const data = await Categoria.find(); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// funcion para encontrar la categoria
export const encontrarCategoria = async (req, res) => {
    try {
        const { id } = req.params; 
        const data = await Categoria.findById(id); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

// funcion para editar la categoria
export const editarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_categoria, img_categoria } = req.body;
        const data = await Categoria.updateOne({_id:id}, { $set: { nombre_categoria, img_categoria }}); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};  

// funcion para borrar la categoria
export const borrarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Categoria.findByIdAndDelete({_id:id}); 
        res.json('Registro Borrado con Exito'); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};  

//FUNCIONES USUARIOS
//funcion para crear usuario
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

//funcion para encontrar los usuarios
export const encontrarTodoUsuario = async (req, res) => {
    try {
        const data = await Usuario.find(); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//funcion para encontrar usuario
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

//FUNCIONES MOD
//funcion para crear mod
export const crearMod= async (req, res) => {
    try {
        const mod = new Mod(req.body); 
        const data = await mod.save();
        res.json(data); 
    } catch (error) {
        res.json({ message: error.message }); 
    }
};

//funcion para encontrar todos los mod

export const encontrarTodoMod = async (req, res) => {
    try {
        const data = await Mod.find(); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//funcion para encontrar mod
export const encontrarMod = async (req, res) => {
    try {
        const { id } = req.params; 
        const data = await Mod.findById(id); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

//funcion para editar mod
export const editarMod = async (req, res) => {
    try {
        const { id } = req.params;
        const { evento_id_mod, panorama_id_mod, accion_mod, comentario_mod,creador_mod, fecha_mod } = req.body;
        const data = await Mod.updateOne({_id:id}, { $set: {evento_id_mod, panorama_id_mod, accion_mod, comentario_mod,creador_mod, fecha_mod }}); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};  
//funcion para borrar mod
export const borrarMod = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Mod.findByIdAndDelete({_id:id}); 
        res.json('Registro Borrado con Exito'); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};  
