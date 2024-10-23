import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const panoramaSchema = new mongoose.Schema({
    titulo_panorama: {
        type: String,
        required: true
    },
    descripcion_panorama: {
        type: String,
        required: true
    },
    descripcion_breve_panorama: {
        type: String,
        required: true
    },
    dias_panorama: {
        type: String,
        required: true
    },
    horario_inicio_panorama: {
        type: String,
        required: true
    },
    horario_termino_panorama: {
        type: String,
        required: true
    },
    ubicacion_ciudad_panorama: {
        type: String,
        required: true
    },
    ubicacion_region_panorama: {
        type: String,
        required: true
    },
    ubicacion_comuna_panorama: {
        type: String,
        required: true
    },
    creador_panorama: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Usuario,
        required: true
    },
    status_panorama: {
        type: String,
        required: true
      },
    img_panorama: [
        {
            type: String, 
            required: true
        }
    ]
  }, { versionKey: false });
  
  panoramaSchema.methods.setImgUrl = function setImgUrl(filenames) {
    const port = process.env.APP_PORT; 
    const host = process.env.APP_HOST;
    // Generar las URLs para cada imagen
    this.img_panorama = filenames.map(filename => `${host}:${port}/public/panoramas/${filename}`);
};

  const Panorama = mongoose.model('Panorama', panoramaSchema);
  export default Panorama;