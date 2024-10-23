import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
    nombre_categoria: {
        type: String,
        required: true
    }, img_categoria: [
        {
            type: String, 
            required: true
        }
    ]
    },{ versionKey: false });
  
  const Categoria = mongoose.model('Categoria', categoriaSchema);
  export default Categoria;