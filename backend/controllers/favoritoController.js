import Favorito from '../models/favoritoModel.js';

// funcion para crear un nuevo favorito
export const crearFavorito = async (req, res) => {
    try {
        const favorito = new Favorito(req.body); 
        const data = await favorito.save();
        res.json(data); 
    } catch (error) {
        res.json({ message: error.message }); 
    }
};

// funcion para encontrar todos los favoritos
export const encontrarTodoFavorito = async (req, res) => {
    try {
        const data = await Favorito.find(); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//encontrar favoritos por id de usuario

export const encontrarFavorito = async (req, res) => {
    try {
      const { id } = req.params; 
      const favoritos = await Favorito.find({ usuario_favorito: id })
        .populate('panorama_favorito')
        .populate('evento_favorito');
  
      if (favoritos.length === 0) {
        return res.status(404).json({ message: 'No se encontraron favoritos para este usuario.' });
      }
  
      const respuesta = favoritos.map((favorito) => ({
        id: favorito._id,
        tipo: favorito.panorama_favorito ? 'Panorama' : 'Evento',
        detalle: favorito.panorama_favorito || favorito.evento_favorito,
        fechaAgregado: favorito.fecha_agregado_favorito,
      }));
  
      res.status(200).json(respuesta);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los favoritos.', error: error.message });
    }
  };

// función para modificar un favorito
export const modificarFavorito = async (req, res) => {
  try {
      const { id } = req.params; 
      const actualizaciones = req.body; 

      const favoritoModificado = await Favorito.findByIdAndUpdate(id, actualizaciones, { 
          new: true, 
          runValidators: true 
      });

      if (!favoritoModificado) {
          return res.status(404).json({ message: 'Favorito no encontrado.' });
      }

      res.status(200).json({ 
          message: 'Favorito modificado exitosamente.',
          favorito: favoritoModificado
      });
  } catch (error) {
      res.status(500).json({ message: 'Error al modificar el favorito.', error: error.message });
  }
};


  // función para borrar un favorito
export const borrarFavorito = async (req, res) => {
  try {
      const { id } = req.params; 
      const favoritoEliminado = await Favorito.findByIdAndDelete(id);

      if (!favoritoEliminado) {
          return res.status(404).json({ message: 'Favorito no encontrado.' });
      }

      res.status(200).json({ 
          message: 'Favorito eliminado exitosamente.',
          favorito: favoritoEliminado
      });
  } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el favorito.', error: error.message });
  }
};

