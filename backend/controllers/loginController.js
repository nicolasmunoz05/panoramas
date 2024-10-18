import Usuario from "../models/usuarioModel.js";
import jwt from "jsonwebtoken";


export const loginUser = async (req, res) => {
  const { email_usuario, contrasena_usuario } = req.body;
  console.log(req.body); 

  try {
    const user = await Usuario.findOne({ email_usuario: email_usuario.trim() });

    if (!user) {
      return res.status(404).json({ message: "No existe el usuario" });
    }

    if (user.contrasena_usuario !== contrasena_usuario.trim()) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { username: user.email_usuario },
      process.env.SECRET_KEY
    );

    res.json({ message: "Usuario encontrado", token });
  } catch (error) {
    console.error("Error durante el login:", error);  
    res.status(500).json({ message: "Error en el servidor", error });
  }
};
