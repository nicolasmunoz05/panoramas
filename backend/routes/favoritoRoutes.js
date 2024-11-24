import express from "express";
import { crearFavorito, encontrarTodoFavorito, encontrarFavorito} from "../controllers/favoritoController.js";

const router = express.Router();

router.post("/", crearFavorito);
router.get("/", encontrarTodoFavorito);

router.get("/:id", encontrarFavorito);


export default router
