import express from "express";
import {borrarEvento, crearEvento, editarEvento, encontrarEvento, encontrarTodoEvento, ordenarEvento, filtrarPorInactivoEvento, eventoTodoActivo, eventosCreadosPorUsuario} from '../controllers/eventoController.js';
import { upload_evento } from '../middlewares/storage_evento.js';

const router = express.Router() 

router.get('/inactivo', filtrarPorInactivoEvento);
router.put('/todoactivo', eventoTodoActivo);
router.get('/ordenar', ordenarEvento);
router.get('/mievento/:id', eventosCreadosPorUsuario);
router.post('/',upload_evento, crearEvento);
router.get('/', encontrarTodoEvento);
router.get('/:id', encontrarEvento);
router.put('/:id', upload_evento, editarEvento);
router.delete('/:id', borrarEvento);


export default router
