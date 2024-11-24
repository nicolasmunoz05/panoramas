import Comentario from '../models/comentarioModel.js';

//crear comentario
export const crearComentario = async (req, res) => {
    try {
      const comentario = new Comentario(req.body);
      await comentario.save();
      res.status(201).json(comentario);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  // obtener todos los comentarios
export const obtenerTodosComentarios = async (req, res) => {
    try {
      const comentarios = await Comentario.find().populate('usuario_comentario', 'nombre_usuario img_usuario'); // Puedes agregar más campos a populate si lo necesitas
      res.status(200).json(comentarios);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  // obtener comentarios
export const obtenerComentariosPorRelacion = async (req, res) => {
    const { id } = req.params;  //ID evento o panorama
    try {
      const comentarios = await Comentario.find({ 
        'relacionadoCon_comentario.id': id 
      }).populate('usuario_comentario', 'nombre_usuario img_usuario'); 
      res.status(200).json(comentarios);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };



  //editar comentarios
export const editarComentario = async (req, res) => {
    const { id } = req.params; // La ID del comentario a editar
    const { texto_comentario } = req.body; 
  
    try {
      const comentarioActualizado = await Comentario.findByIdAndUpdate(
        id, 
        { texto_comentario },
        { new: true } 
      );
  
      if (!comentarioActualizado) {
        return res.status(404).json({ error: "Comentario no encontrado" });
      }
  
      res.status(200).json({ message: "Comentario actualizado exitosamente", comentario: comentarioActualizado });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  //borrar comentarios
export const eliminarComentario = async (req, res) => {
    const { id } = req.params; // La ID del comentario a eliminar
    try {
      const comentarioEliminado = await Comentario.findByIdAndDelete(id);
      if (!comentarioEliminado) {
        return res.status(404).json({ error: "Comentario no encontrado" });
      }
      res.status(200).json({ message: "Comentario eliminado exitosamente", comentario: comentarioEliminado });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  