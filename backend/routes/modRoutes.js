import express from "express";
import { borrarMod, crearMod, editarMod, encontrarMod, encontrarTodoMod } from "../controllers/modController.js";


const router = express.Router() 
router.post('/', crearMod);
router.get('/', encontrarTodoMod);
router.get('/:id', encontrarMod);
router.put('/:id', editarMod);
router.delete('/:id', borrarMod);


export default router
