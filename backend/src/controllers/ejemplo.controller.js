// Ejemplo de controlador
// Reemplazar con tu lógica de negocio específica

const Ejemplo = require('../models/ejemplo.model');

// Obtener todos los recursos con paginación
const getAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const total = await Ejemplo.countDocuments();
        const ejemplos = await Ejemplo.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: ejemplos,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los recursos',
            error: error.message
        });
    }
};

// Obtener un recurso por ID
const getById = async (req, res) => {
    try {
        const ejemplo = await Ejemplo.findById(req.params.id);
        
        if (!ejemplo) {
            return res.status(404).json({
                success: false,
                message: 'Recurso no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: ejemplo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el recurso',
            error: error.message
        });
    }
};

// Crear un nuevo recurso
const create = async (req, res) => {
    try {
        // Validación de reglas de negocio aquí
        const nuevoEjemplo = new Ejemplo(req.body);
        const ejemploGuardado = await nuevoEjemplo.save();

        res.status(201).json({
            success: true,
            message: 'Recurso creado exitosamente',
            data: ejemploGuardado
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Error de validación',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error al crear el recurso',
            error: error.message
        });
    }
};

// Actualizar un recurso
const update = async (req, res) => {
    try {
        const ejemploActualizado = await Ejemplo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!ejemploActualizado) {
            return res.status(404).json({
                success: false,
                message: 'Recurso no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Recurso actualizado exitosamente',
            data: ejemploActualizado
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Error de validación',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error al actualizar el recurso',
            error: error.message
        });
    }
};

// Eliminar un recurso
const deleteOne = async (req, res) => {
    try {
        const ejemploEliminado = await Ejemplo.findByIdAndDelete(req.params.id);

        if (!ejemploEliminado) {
            return res.status(404).json({
                success: false,
                message: 'Recurso no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Recurso eliminado exitosamente',
            data: ejemploEliminado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el recurso',
            error: error.message
        });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteOne
};
