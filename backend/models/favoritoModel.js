import mongoose from 'mongoose';
import Usuario from './usuarioModel.js';
import Panorama from './panoramaModel.js';
import Evento from './eventoModel.js';

const favoritoSchema = new mongoose.Schema({
  usuario_favorito: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Usuario,
    required: true
  },
  panorama_favorito: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Panorama
  },
  evento_favorito: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Evento
  },
  fecha_agregado_favorito: {
    type: Date,
    default: Date.now
  }
},{ versionKey: false });


export default mongoose.model('Favorito', favoritoSchema);