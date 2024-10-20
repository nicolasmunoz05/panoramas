import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const usuarioSchema = new mongoose.Schema({
  nombre_usuario: {
    type: String,
    required: true
  },
  contrasena_usuario: {
    type: String,
    required: true
  },
  rol_usuario: {
    type: String,
    default: 'user'
  },
  email_usuario: {
    type: String,
    required: true
  },
  fecha_creacion_usuario: {
    type: Date,
    default: Date.now
  },
  img_usuario: [
    {
      type: String,
      required: true
    }
  ]
}, { versionKey: false });

// Método para generar la URL de la imagen
usuarioSchema.methods.setImgUrl = function setImgUrl(filename) {
  const port = process.env.APP_PORT; 
  const host = process.env.APP_HOST;
  
  // Generar la URL completa para la imagen
  this.img_usuario = `${host}:${port}/public/usuarios/${filename}`;
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
