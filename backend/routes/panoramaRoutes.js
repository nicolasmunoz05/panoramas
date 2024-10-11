import express from "express";
import { borrarPanorama, crearPanorama, editarPanorama, encontrarPanorama, encontrarTodoPanorama } from "../controllers/panoramaController.js";
import { upload_panorama } from "../Middlewares/storage_panorama.js"

const router = express.Router() 
router.post('/', upload_panorama, crearPanorama);
router.get('/', encontrarTodoPanorama);
router.get('/:id', encontrarPanorama);
router.put('/:id',upload_panorama, editarPanorama);
router.delete('/:id', borrarPanorama);


export default router
