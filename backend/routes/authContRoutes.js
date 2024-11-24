import express from 'express';
import { requestPasswordReset, resetPassword } from "../controllers/authContController.js";

const router = express.Router();

router.post('/olvide_pass', requestPasswordReset); // Solicitar restablecimiento
router.post('/reset_pass', resetPassword);        // Restablecer contraseña

export default router
