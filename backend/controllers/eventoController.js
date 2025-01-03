import Evento from "../models/eventoModel.js";
import geocodeAddress from '../utils/geocode.js';
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// funcion para crear el evento, post
/*
export const crearEvento = async (req, res) => {
  try {
    console.log("Archivo recibido:", req.files);
    const imagenesURLs = req.files
      ? req.files.map((file) => file.filename)
      : [];
    if (imagenesURLs.length < 1 || imagenesURLs.length > 3) {
      return res
        .status(400)
        .json({ message: "Debes subir entre 1 y 3 imágenes." });
    }

    const evento = new Evento({
      ...req.body,
    });

    evento.setImgUrl(imagenesURLs);

    const data = await evento.save();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
*/
export const crearEvento = async (req, res) => {
  try {
    console.log("Archivo recibido:", req.files);

    const imagenesURLs = req.files
      ? req.files.map((file) => file.filename)
      : [];
    if (imagenesURLs.length < 1 || imagenesURLs.length > 3) {
      return res
        .status(400)
        .json({ message: "Debes subir entre 1 y 3 imágenes." });
    }

    const { direccion_evento, ubicacion_ciudad_evento, ubicacion_region_evento } = req.body;

    // Obtener coordenadas de la dirección
    const ubicacionGeografica = await geocodeAddress(
      direccion_evento,
      ubicacion_ciudad_evento,
      ubicacion_region_evento
    );

    // Crear el evento con datos y coordenadas
    const evento = new Evento({
      ...req.body,
      location_evento: ubicacionGeografica,
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

export const editarEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      titulo_evento,
      descripcion_evento,
      descripcion_breve_evento,
      dias_evento,
      horario_inicio_evento,
      horario_termino_evento,
      direccion_evento,
      ubicacion_ciudad_evento,
      ubicacion_region_evento,
      ubicacion_comuna_evento,
      creador_evento,
      status_evento,
      precio_evento,
      visitas_evento,
      edad_requerida_evento,
      img_toBorrar,
      aceptacion_evento,
      location_evento,
    } = req.body;

    const evento = await Evento.findById(id);
    if (!evento) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    const updateData = {
      titulo_evento,
      descripcion_evento,
      descripcion_breve_evento,
      dias_evento,
      horario_inicio_evento,
      horario_termino_evento,
      direccion_evento,
      ubicacion_ciudad_evento,
      ubicacion_region_evento,
      ubicacion_comuna_evento,
      creador_evento,
      status_evento,
      precio_evento,
      edad_requerida_evento,
      visitas_evento,
      aceptacion_evento,
      location_evento
    };

    if (img_toBorrar && img_toBorrar.length > 0) {
      evento.img_evento = (evento.img_evento || []).filter((img) => {
        if (img) {
          const imageName = img.split("/").pop();
          if (img_toBorrar.includes(imageName)) {
            const imagePath = path.join(
              __dirname,
              "..",
              "uploads",
              "eventos",
              imageName
            );
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
      .filter((url) => url != null)
      .map((url) => url.split("/").pop());

    if (req.files && req.files.length > 0) {
      const newImageFilenames = req.files.map((file) => file.filename);
      allImageFilenames = [...allImageFilenames, ...newImageFilenames];
    }

    evento.setImgUrl(allImageFilenames);
    updateData.img_evento = evento.img_evento;

    const updatedEvento = await Evento.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedEvento) {
      return res
        .status(404)
        .json({ message: "No se pudo actualizar el evento" });
    }

    res.json({ message: "Evento actualizado con éxito", data: updatedEvento });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// funcion para borrar la imagen, se usa dentro de la funcion borrar evento
const borrarImagen_evento = async (id) => {
  const evento = await Evento.findById(id);
  if (!evento) {
    return res.status(404).json({ message: "Evento no encontrado" });
  }

  if (evento.img_evento && evento.img_evento.length > 0) {
    for (const img of evento.img_evento) {
      const imageName = img.split("/").pop();
      console.log(imageName);
      const imagePath = path.join(
        __dirname,
        "..",
        "uploads",
        "eventos",
        imageName
      );

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

// funcion para borrar el evento, del
export const borrarEvento = async (req, res) => {
  try {
    const { id } = req.params;
    await borrarImagen_evento(id);
    await Evento.findByIdAndDelete(id);
    res.json("Registro Borrado con Éxito");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// funcion para ordenar el evento, get
export const ordenarEvento = async (req, res) => {
  try {
    const hoy = new Date();
    const fechaLimite = new Date();
    fechaLimite.setDate(hoy.getDate() + 7);

    const data = await Evento.find({
      fecha_inicio_evento: { $gte: hoy },
      fecha_termino_evento: { $lte: fechaLimite },
      aceptacion_evento: "aceptado",
      status_evento: { $ne: "terminado" },
    }).sort({ fecha_inicio_evento: -1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// funcion para filtrar evento por categoria, get

export const filtrarPorCategoriaEvento = async (req, res) => {
  try {
    const { categoria } = req.params;

    const data = await Evento.find({
      categoria_evento: categoria,
      aceptacion_evento: "aceptado",
      status_evento: { $ne: "terminado" },
    }).sort({ fecha_inicio_evento: -1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// funcion para filtrar evento por fecha, get

export const filtrarPorFechaEvento = async (req, res) => {
  try {
    const { fecha } = req.params;
    const fecha_formato = new Date(fecha);
    const data = await Evento.find({
      fecha_inicio_evento: { $gte: fecha_formato },
      aceptacion_evento: "aceptado",
      status_evento: { $ne: "terminado" },
    }).sort({ fecha_inicio_evento: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// funcion de eventos pendientes

export const filtrarPorPendienteEvento = async (req, res) => {
  try {
    const data = await Evento.find({
      aceptacion_evento: "pendiente",
      status_evento: { $ne: "terminado" },
    }).sort({ fecha_inicio_evento: -1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// funcion de eventos rechazados

export const filtrarPorRechazadoEvento = async (req, res) => {
  try {
    const data = await Evento.find({
      aceptacion_evento: "rechazado",
      status_evento: { $ne: "terminado" },
    }).sort({ fecha_inicio_evento: -1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const filtrarPorInactivoEvento = async (req, res) => {
  try {
    const data = await Evento.find({
      status_evento:  "inactivo",
    }).sort({ fecha_inicio_evento: -1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const eventoTodoActivo = async (req, res) => {
  try {
    const resultado = await Evento.updateMany(
      { status_evento: 'inactivo' }, // Filtro
      { $set: { status_evento: 'activo' } } // Actualización
    );
    
    console.log(`${resultado.modifiedCount+1} eventos fueron actualizados a "activo"`);
  } catch (error) {
    console.error('Error al actualizar eventos:', error);
  }
}  

//funcion para encontrar los eventos creados por el usuario

export const eventosCreadosPorUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const eventos = await Evento.find({ creador_evento: id });
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};