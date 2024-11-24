import mongoose from 'mongoose';
import Usuario from './usuarioModel.js';
import Panorama from './panoramaModel.js';
import Evento from './eventoModel.js';

const comentarioSchema = new mongoose.Schema({
    usuario_comentario: { type: mongoose.Schema.Types.ObjectId, ref: Usuario },
    texto_comentario: String,
    fecha_comentario: { type: Date, default: Date.now },
    nota_comentario: { type: Number, required: true},
    relacionadoCon_comentario: {
      tipo: { type: String, enum: ['Panorama', 'Evento'], required: true },
      id: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'relacionadoCon.tipo' }
    }
  });

  export default mongoose.model('Comentario', comentarioSchema);

