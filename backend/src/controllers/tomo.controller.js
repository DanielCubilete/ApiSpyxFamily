const Tomo = require('../models/tomo.model');

// Obtener todos los tomos
exports.getAllTomos = async (req, res) => {
    try {
        const tomos = await Tomo.find().sort({ numero_tomo: 1 });
        res.status(200).json({
            success: true,
            count: tomos.length,
            data: tomos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los tomos',
            error: error.message
        });
    }
};

// Obtener un tomo por ID
exports.getTomoById = async (req, res) => {
    try {
        const tomo = await Tomo.findById(req.params.id);
        
        if (!tomo) {
            return res.status(404).json({
                success: false,
                message: 'Tomo no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: tomo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el tomo',
            error: error.message
        });
    }
};

// Obtener tomo por número
exports.getTomoByNumero = async (req, res) => {
    try {
        const tomo = await Tomo.findOne({ numero_tomo: req.params.numero });
        
        if (!tomo) {
            return res.status(404).json({
                success: false,
                message: 'Tomo no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: tomo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el tomo',
            error: error.message
        });
    }
};

// Obtener tomo por ISBN
exports.getTomoByISBN = async (req, res) => {
    try {
        const tomo = await Tomo.findOne({ isbn: req.params.isbn });
        
        if (!tomo) {
            return res.status(404).json({
                success: false,
                message: 'Tomo no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: tomo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el tomo',
            error: error.message
        });
    }
};

// Buscar tomos por título
exports.searchTomos = async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query) {
            return res.status(400).json({
                success: false,
                message: 'Debe proporcionar un término de búsqueda'
            });
        }

        const tomos = await Tomo.find({
            titulo: { $regex: query, $options: 'i' }
        }).sort({ numero_tomo: 1 });

        res.status(200).json({
            success: true,
            count: tomos.length,
            data: tomos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar tomos',
            error: error.message
        });
    }
};

// Obtener tomos por rango de fechas
exports.getTomosByFechas = async (req, res) => {
    try {
        const { desde, hasta } = req.query;
        
        let query = {};
        
        if (desde) {
            query.fecha_publicacion = { $gte: new Date(desde) };
        }
        
        if (hasta) {
            query.fecha_publicacion = { 
                ...query.fecha_publicacion, 
                $lte: new Date(hasta) 
            };
        }

        const tomos = await Tomo.find(query).sort({ fecha_publicacion: 1 });

        res.status(200).json({
            success: true,
            count: tomos.length,
            data: tomos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los tomos',
            error: error.message
        });
    }
};

// Obtener tomos por editorial
exports.getTomosByEditorial = async (req, res) => {
    try {
        const { editorial } = req.params;
        
        const tomos = await Tomo.find({
            editorial: { $regex: editorial, $options: 'i' }
        }).sort({ numero_tomo: 1 });
        
        res.status(200).json({
            success: true,
            count: tomos.length,
            data: tomos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los tomos',
            error: error.message
        });
    }
};

// Crear un nuevo tomo
exports.createTomo = async (req, res) => {
    try {
        const tomo = await Tomo.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Tomo creado exitosamente',
            data: tomo
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
        
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Ya existe un tomo con ese ISBN'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error al crear el tomo',
            error: error.message
        });
    }
};

// Actualizar un tomo
exports.updateTomo = async (req, res) => {
    try {
        const tomo = await Tomo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { 
                new: true, 
                runValidators: true 
            }
        );

        if (!tomo) {
            return res.status(404).json({
                success: false,
                message: 'Tomo no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Tomo actualizado exitosamente',
            data: tomo
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
            message: 'Error al actualizar el tomo',
            error: error.message
        });
    }
};

// Eliminar un tomo
exports.deleteTomo = async (req, res) => {
    try {
        const tomo = await Tomo.findById(req.params.id);

        if (!tomo) {
            return res.status(404).json({
                success: false,
                message: 'Tomo no encontrado'
            });
        }

        await tomo.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Tomo eliminado exitosamente',
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el tomo',
            error: error.message
        });
    }
};
