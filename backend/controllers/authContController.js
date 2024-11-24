import crypto from 'crypto';
import Usuario from '../models/usuarioModel.js';
import {sendPasswordResetEmail} from '../utils/emailSender.js';

// Solicitud de restablecimiento de contraseña
export const requestPasswordReset = async (req, res) => {
  const { email_usuario } = req.body;
  try {
    const user = await Usuario.findOne({ email_usuario });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado.' });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken_usuario = token;
    user.resetPasswordExpires_usuario = Date.now() + 3600000; // 1 hora
    await user.save();

    await sendPasswordResetEmail(email_usuario, token);
    console.log(email_usuario,token);
    res.json({ message: 'Correo de recuperación enviado.' });
  } catch (error) {
    console.error(error); // Esto mostrará el error en la consola
    res.status(500).json({ error: 'Error en el servidor.' });
  }
};

// Restablecimiento de contraseña
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const user = await Usuario.findOne({
      resetPasswordToken_usuario: token,
      resetPasswordExpires_usuario: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ error: 'Token inválido o expirado.' });

    user.contrasena_usuario = newPassword; // Hashear la contraseña antes de guardarla
    user.resetPasswordToken_usuario = undefined;
    user.resetPasswordExpires_usuario = undefined;
    await user.save();

    res.json({ message: 'Contraseña actualizada con éxito.' });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor.' });
  }
};
