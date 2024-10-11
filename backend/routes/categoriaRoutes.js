import express from "express";
import { borrarCategoria, crearCategoria, editarCategoria, encontrarCategoria, encontrarTodoCategoria } from "../controllers/categoriaController.js";


const router = express.Router() 
router.post('/', crearCategoria);
router.get('/', encontrarTodoCategoria);
router.get('/:id', encontrarCategoria);
router.put('/:id', editarCategoria);
router.delete('/:id', borrarCategoria);


export default router
