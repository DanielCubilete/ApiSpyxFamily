const Personaje = require('../models/personaje.model');

// Obtener todos los personajes
exports.getAllPersonajes = async (req, res) => {
    try {
        const personajes = await Personaje.find().sort({ nombre: 1 });
        res.status(200).json({
            success: true,
            count: personajes.length,
            data: personajes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los personajes',
            error: error.message
        });
    }
};

// Obtener un personaje por ID
exports.getPersonajeById = async (req, res) => {
    try {
        const personaje = await Personaje.findById(req.params.id);
        
        if (!personaje) {
            return res.status(404).json({
                success: false,
                message: 'Personaje no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: personaje
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el personaje',
            error: error.message
        });
    }
};

// Obtener personajes por rol
exports.getPersonajesByRol = async (req, res) => {
    try {
        const { rol } = req.params;
        
        if (!['principal', 'secundario', 'recurrente'].includes(rol)) {
            return res.status(400).json({
                success: false,
                message: 'Rol inválido. Debe ser: principal, secundario o recurrente'
            });
        }

        const personajes = await Personaje.find({ rol }).sort({ nombre: 1 });
        
        res.status(200).json({
            success: true,
            count: personajes.length,
            data: personajes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los personajes',
            error: error.message
        });
    }
};

// Obtener personajes por organización
exports.getPersonajesByOrganizacion = async (req, res) => {
    try {
        const { organizacion } = req.params;
        
        const personajes = await Personaje.find({ 
            organizacion: { $regex: organizacion, $options: 'i' }
        }).sort({ nombre: 1 });
        
        res.status(200).json({
            success: true,
            count: personajes.length,
            data: personajes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los personajes',
            error: error.message
        });
    }
};

// Buscar personajes por nombre o alias
exports.searchPersonajes = async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query) {
            return res.status(400).json({
                success: false,
                message: 'Debe proporcionar un término de búsqueda'
            });
        }

        const personajes = await Personaje.find({
            $or: [
                { nombre: { $regex: query, $options: 'i' } },
                { alias: { $regex: query, $options: 'i' } },
                { descripcion: { $regex: query, $options: 'i' } }
            ]
        }).sort({ nombre: 1 });

        res.status(200).json({
            success: true,
            count: personajes.length,
            data: personajes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar personajes',
            error: error.message
        });
    }
};

// Buscar personajes por habilidad
exports.getPersonajesByHabilidad = async (req, res) => {
    try {
        const { habilidad } = req.params;
        
        const personajes = await Personaje.find({
            habilidades: { $regex: habilidad, $options: 'i' }
        }).sort({ nombre: 1 });
        
        res.status(200).json({
            success: true,
            count: personajes.length,
            data: personajes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los personajes',
            error: error.message
        });
    }
};

// Crear un nuevo personaje
exports.createPersonaje = async (req, res) => {
    try {
        const personaje = await Personaje.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Personaje creado exitosamente',
            data: personaje
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Error de validación',
                errors: messages
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error al crear el personaje',
            error: error.message
        });
    }
};

// Actualizar un personaje
exports.updatePersonaje = async (req, res) => {
    try {
        const personaje = await Personaje.findByIdAndUpdate(
            req.params.id,
            req.body,
            { 
                new: true, 
                runValidators: true 
            }
        );

        if (!personaje) {
            return res.status(404).json({
                success: false,
                message: 'Personaje no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Personaje actualizado exitosamente',
            data: personaje
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Error de validación',
                errors: messages
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error al actualizar el personaje',
            error: error.message
        });
    }
};

// Eliminar un personaje
exports.deletePersonaje = async (req, res) => {
    try {
        const personaje = await Personaje.findById(req.params.id);

        if (!personaje) {
            return res.status(404).json({
                success: false,
                message: 'Personaje no encontrado'
            });
        }

        await personaje.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Personaje eliminado exitosamente',
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el personaje',
            error: error.message
        });
    }
};
