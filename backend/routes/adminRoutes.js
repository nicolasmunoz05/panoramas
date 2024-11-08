import express from "express";
import { borrarPanorama, crearPanorama, editarPanorama, encontrarPanorama, encontrarTodoPanorama } from "../controllers/panoramaController.js";
import { upload_panorama } from "../Middlewares/storage_panorama.js"
import {borrarEvento, crearEvento, editarEvento, encontrarEvento, encontrarTodoEvento, ordenarEvento, filtrarPorFechaEvento, filtrarPorCategoriaEvento} from '../controllers/eventoController.js';
import { upload_evento } from '../middlewares/storage_evento.js';
import { borrarCategoria, crearCategoria, editarCategoria, encontrarCategoria, encontrarTodoCategoria } from "../controllers/categoriaController.js";
import { crearUsuario, encontrarTodoUsuario, encontrarUsuario, editarUsuario, borrarUsuario } from '../controllers/usuarioController.js';
import { upload_usuario } from "../middlewares/storage_usuario.js";
import { borrarMod, crearMod, editarMod, encontrarMod, encontrarTodoMod } from "../controllers/modController.js";

const router = express.Router() 
//funciones panorama
router.post('/panorama/', upload_panorama, crearPanorama);
router.get('/panorama/', encontrarTodoPanorama);
router.get('/panorama/:id', encontrarPanorama);
router.put('/panorama/:id',upload_panorama, editarPanorama);
router.delete('/panorama/:id', borrarPanorama);
//funciones evento
router.get('/evento/ordenar', ordenarEvento);
router.get('/evento/categoria', filtrarPorCategoriaEvento);
router.get('/evento/fecha', filtrarPorFechaEvento);
router.post('/evento/',upload_evento, crearEvento);
router.get('/evento/', encontrarTodoEvento);
router.get('/evento/:id', encontrarEvento);
router.put('/evento/:id', upload_evento, editarEvento);
router.delete('/evento/:id', borrarEvento);
//funciones categoria
router.post('/categoria/', crearCategoria);
router.get('/categoria/', encontrarTodoCategoria);
router.get('/categoria/:id', encontrarCategoria);
router.put('/categoria/:id', editarCategoria);
router.delete('/categoria/:id', borrarCategoria);
//funciones usuarios
router.post('/usuario/', upload_usuario, crearUsuario);
router.get('/usuario/', encontrarTodoUsuario);
router.get('/usuario/:id', encontrarUsuario);
router.put('/usuario/:id',upload_usuario, editarUsuario);
router.delete('/usuario/:id', borrarUsuario);
//funciones mod
router.post('/mod/', crearMod);
router.get('/mod/', encontrarTodoMod);
router.get('/mod/:id', encontrarMod);
router.put('/mod/:id', editarMod);
router.delete('/mod/:id', borrarMod);
export default router;