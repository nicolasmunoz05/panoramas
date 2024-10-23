import mongoose from "mongoose";
import Usuario from './usuarioModel.js'
import dotenv from "dotenv";
dotenv.config();

const eventoSchema = new mongoose.Schema({
    titulo_evento: {
      type: String,
      required: true
    },
    fecha_inicio_evento: {
      type: Date,
      required: true
    },
    fecha_termino_evento: {
      type: Date,
      required: true
    },
    descripcion_evento: {
      type: String,
      required: true
    },
    descripcion_breve_evento:{
      type: String,
      required: true
    },
    ubicacion_comuna_evento:{
      type: String,
      required: true
    },
    ubicacion_ciudad_evento: {
      type: String,
      required: true
    },
    ubicacion_region_evento: {
      type: String,
      required: true
    },
    creador_evento: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Usuario,
      required: true
    },
    status_evento: {
      type: String,
      required: true
    },
    hora_inicio_evento: {
      type: String,
      required: true
    },
    hora_termino_evento: {
      type: String,
      required: true
    },
    aceptacion_evento: {
      type: Boolean,
      default: null
    },
    categoria_evento: {
      type: String,
      required: true
    },
    fecha_creacion_evento: {
      type: Date,
      required: true,
      default: Date.now
    },
    img_evento: [
      {
          type: String, 
          required: true
      }
  ]
  },{ versionKey: false });

  eventoSchema.methods.setImgUrl = function setImgUrl(filenames) {
    const port = process.env.APP_PORT; 
    const host = process.env.APP_HOST;
    this.img_evento = filenames.map(filename => `${host}:${port}/public/eventos/${filename}`);
};

  
  const Evento = mongoose.model('Evento', eventoSchema);

  export default Evento;