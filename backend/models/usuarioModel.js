const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  Id_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  Contraseña_usuario: {
    type: String,
    required: true
  },
  Nombre_usuario: {
    type: String,
    required: true
  },
  Rol_usuario: {
    type: String,
    required: true
  },
  email_usuario: {
    type: String,
    required: true
  }
}, { collection: 'Usuario' });

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;