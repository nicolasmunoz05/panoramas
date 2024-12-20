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
      type: String
    },
    ubicacion_comuna_evento:{
      type: String,
      required: true
    },
    direccion_evento: {
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
      ref: Usuario
    },
    status_evento: {
      type: String,
      default: 'inactivo',
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
      type: String,
      default: 'pendiente',
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
    precio_evento: {
      type: String,
      default: 'gratis'
    },
    visitas_evento:{
      type: Number,
      default: 0
    },
    edad_requerida_evento:{
      type: Number,
      default: 0
    },
    location_evento: {
      lat: {
        type: Number
      },
      lng: {
        type: Number
      },
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