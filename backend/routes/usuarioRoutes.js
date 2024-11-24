import express from "express";
import { crearUsuario, encontrarUsuarioCorreo, encontrarTodoUsuario, encontrarUsuario, editarUsuario, borrarUsuario } from '../controllers/usuarioController.js';
import { upload_usuario } from "../middlewares/storage_usuario.js";

const router = express.Router();


router.post('/', crearUsuario);
router.get('/', encontrarTodoUsuario);
//router.get('/:id', encontrarUsuario);
router.get('/:email_usuario', encontrarUsuarioCorreo);

router.put('/:id',upload_usuario, editarUsuario);
router.delete('/:id', borrarUsuario);

export default router;
