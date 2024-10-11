import multer from 'multer';

// Configuración de Multer para guardar las imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/usuarios/'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// Configuración de multer
export const upload_usuario = multer({ storage }).single('img_usuario');

 