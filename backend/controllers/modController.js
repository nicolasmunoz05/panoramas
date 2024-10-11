import Mod from '../models/modModel.js';

export const crearMod= async (req, res) => {
    try {
        const mod = new Mod(req.body); 
        const data = await mod.save();
        res.json(data); 
    } catch (error) {
        res.json({ message: error.message }); 
    }
};

export const encontrarTodoMod = async (req, res) => {
    try {
        const data = await Mod.find(); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const encontrarMod = async (req, res) => {
    try {
        const { id } = req.params; 
        const data = await Mod.findById(id); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

export const editarMod = async (req, res) => {
    try {
        const { id } = req.params;
        const { evento_id_mod, panorama_id_mod, accion_mod, comentario_mod, fecha_mod } = req.body;
        const data = await Mod.updateOne({_id:id}, { $set: {evento_id_mod, panorama_id_mod, accion_mod, comentario_mod, fecha_mod }}); 
        res.json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};  

export const borrarMod = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Mod.findByIdAndDelete({_id:id}); 
        res.json('Registro Borrado con Exito'); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};  
