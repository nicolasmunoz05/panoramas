import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

export const sendPasswordResetEmail = async (email_usuario, token) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    logger: true,  // Registra información detallada
    debug: true    // Activa modo de depuración
  
  });

  const resetURL = `${process.env.FRONTEND_URL}/reset_pass/${token}`;

  const mailOptions = {
    from: 'yuano.andres@gmail.com',
    to: email_usuario,
    subject: 'Restablece tu contraseña',
    text: `Haz clic en el enlace para restablecer tu contraseña: ${resetURL}`,
  };
  await transporter.sendMail(mailOptions);
};
