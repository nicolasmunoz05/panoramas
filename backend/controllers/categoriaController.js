import Categoria from '../models/categoriaModel.js';

export const crearCategoria = async (req, res) => {
    try {
        const categoria = new Categoria(req.body); 
        const data = await categoria.save();
        res.json(data); 
    } catch (error) {
        res.json({ message: error.message }); 
    }
};

export const encontrarTodoCategoria = async (req, res) => {
    try {
        const data = await Categoria.find(); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const encontrarCategoria = async (req, res) => {
    try {
        const { id } = req.params; 
        const data = await Categoria.findById(id); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

export const editarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_categoria, img_categoria } = req.body;
        const data = await Categoria.updateOne({_id:id}, { $set: { nombre_categoria, img_categoria }}); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};  

export const borrarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Categoria.findByIdAndDelete({_id:id}); 
        res.json('Registro Borrado con Exito'); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};  
