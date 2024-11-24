import express from "express";
import { crearComentario, obtenerTodosComentarios, obtenerComentariosPorRelacion, editarComentario, eliminarComentario } from "../controllers/comentarioController.js";

const router = express.Router();

router.post("/", crearComentario);
router.get("/", obtenerTodosComentarios);
router.get("/:id", obtenerComentariosPorRelacion);
router.put("/:id", editarComentario);

router.delete("/:id", eliminarComentario);


export default router
