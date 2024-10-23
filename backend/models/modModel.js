import mongoose from "mongoose";
import Evento from "./eventoModel.js";
import Panorama from "./panoramaModel.js";
const modSchema = new mongoose.Schema({
    
    evento_id_mod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Evento
    },
    panorama_id_mod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Panorama
    },
    accion_mod: {
      type: String,
      required: true
    },
    comentario_mod: {
      type: String,
      required: true
    },
    creador_mod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Usuario,
      required: true
    },
    fecha_mod: {
      type: Date,
      required: true,
      default: Date.now
    }
  },{ versionKey: false });
  
  const Mod = mongoose.model('Mod', modSchema);
  export default Mod;
  