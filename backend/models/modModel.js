const modSchema = new mongoose.Schema({
    id_mod: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true
    },
    eventoid_mod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Evento'
    },
    panorama_id_mod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Panorama'
    },
    accion_mod: {
      type: Boolean,
      required: true
    },
    comentario_mod: {
      type: String,
      required: true
    },
    fecha_mod: {
      type: Date,
      required: true,
      default: Date.now
    }
  }, { collection: 'Mod' });
  
  const Mod = mongoose.model('Mod', modSchema);
  module.exports = Mod;