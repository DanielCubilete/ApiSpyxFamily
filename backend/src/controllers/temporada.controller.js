const Temporada = require('../models/temporada.model');
const Episodio = require('../models/episodio.model');

// Obtener todas las temporadas
exports.getAllTemporadas = async (req, res) => {
    try {
        const temporadas = await Temporada.find().sort({ numero_temporada: 1 });
        res.status(200).json({
            success: true,
            count: temporadas.length,
            data: temporadas
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las temporadas',
            error: error.message
        });
    }
};

// Obtener una temporada por ID
exports.getTemporadaById = async (req, res) => {
    try {
        const temporada = await Temporada.findById(req.params.id);
        
        if (!temporada) {
            return res.status(404).json({
                success: false,
                message: 'Temporada no encontrada'
            });
        }

        // Obtener episodios de esta temporada
        const episodios = await Episodio.find({ temporada_id: temporada._id })
            .sort({ numero_episodio: 1 });

        res.status(200).json({
            success: true,
            data: {
                ...temporada.toObject(),
                episodios: episodios
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener la temporada',
            error: error.message
        });
    }
};

// Obtener temporada por número
exports.getTemporadaByNumero = async (req, res) => {
    try {
        const temporada = await Temporada.findOne({ numero_temporada: req.params.numero });
        
        if (!temporada) {
            return res.status(404).json({
                success: false,
                message: 'Temporada no encontrada'
            });
        }

        // Obtener episodios de esta temporada
        const episodios = await Episodio.find({ temporada_id: temporada._id })
            .sort({ numero_episodio: 1 });

        res.status(200).json({
            success: true,
            data: {
                ...temporada.toObject(),
                episodios: episodios
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener la temporada',
            error: error.message
        });
    }
};

// Crear una nueva temporada
exports.createTemporada = async (req, res) => {
    try {
        const temporada = await Temporada.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Temporada creada exitosamente',
            data: temporada
        });
    } catch (error) {
        // Manejo de errores de validación
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Error de validación',
                errors: messages
            });
        }
        
        // Error de duplicado (unique constraint)
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Ya existe una temporada con ese número'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error al crear la temporada',
            error: error.message
        });
    }
};

// Actualizar una temporada
exports.updateTemporada = async (req, res) => {
    try {
        const temporada = await Temporada.findByIdAndUpdate(
            req.params.id,
            req.body,
            { 
                new: true, 
                runValidators: true 
            }
        );

        if (!temporada) {
            return res.status(404).json({
                success: false,
                message: 'Temporada no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Temporada actualizada exitosamente',
            data: temporada
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
            message: 'Error al actualizar la temporada',
            error: error.message
        });
    }
};

// Eliminar una temporada
exports.deleteTemporada = async (req, res) => {
    try {
        const temporada = await Temporada.findById(req.params.id);

        if (!temporada) {
            return res.status(404).json({
                success: false,
                message: 'Temporada no encontrada'
            });
        }

        // Verificar si hay episodios asociados
        const episodiosCount = await Episodio.countDocuments({ temporada_id: temporada._id });
        
        if (episodiosCount > 0) {
            return res.status(400).json({
                success: false,
                message: `No se puede eliminar la temporada porque tiene ${episodiosCount} episodios asociados`
            });
        }

        await temporada.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Temporada eliminada exitosamente',
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la temporada',
            error: error.message
        });
    }
};
