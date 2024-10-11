import multer from 'multer';

// Configuración de Multer para guardar las imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/eventos/'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// Configuración de multer
export const upload_evento = multer({ storage }).array('img_evento', 3);

 