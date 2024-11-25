import express from "express";
import { crearFavorito, encontrarTodoFavorito, encontrarFavorito, modificarFavorito, borrarFavorito} from "../controllers/favoritoController.js";

const router = express.Router();

router.post("/", crearFavorito);
router.get("/", encontrarTodoFavorito);

router.get("/:id", encontrarFavorito);
router.put("/:id", modificarFavorito); // Nueva ruta para modificar favoritos

router.delete("/:id", borrarFavorito); 


export default router
