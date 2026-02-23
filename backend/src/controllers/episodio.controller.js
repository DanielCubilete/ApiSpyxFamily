const Episodio = require('../models/episodio.model');
const Temporada = require('../models/temporada.model');

// Obtener todos los episodios
exports.getAllEpisodios = async (req, res) => {
    try {
        const episodios = await Episodio.find()
            .populate('temporada_id', 'numero_temporada titulo')
            .sort({ temporada_id: 1, numero_episodio: 1 });
        
        res.status(200).json({
            success: true,
            count: episodios.length,
            data: episodios
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los episodios',
            error: error.message
        });
    }
};

// Obtener un episodio por ID
exports.getEpisodioById = async (req, res) => {
    try {
        const episodio = await Episodio.findById(req.params.id)
            .populate('temporada_id', 'numero_temporada titulo estado estudio_animacion');
        
        if (!episodio) {
            return res.status(404).json({
                success: false,
                message: 'Episodio no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: episodio
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el episodio',
            error: error.message
        });
    }
};

// Obtener episodios por temporada
exports.getEpisodiosByTemporada = async (req, res) => {
    try {
        const episodios = await Episodio.find({ temporada_id: req.params.temporadaId })
            .sort({ numero_episodio: 1 });
        
        if (episodios.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se encontraron episodios para esta temporada'
            });
        }

        res.status(200).json({
            success: true,
            count: episodios.length,
            data: episodios
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los episodios',
            error: error.message
        });
    }
};

// Buscar episodios por título
exports.searchEpisodios = async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query) {
            return res.status(400).json({
                success: false,
                message: 'Debe proporcionar un término de búsqueda'
            });
        }

        const episodios = await Episodio.find({
            $or: [
                { titulo: { $regex: query, $options: 'i' } },
                { descripcion: { $regex: query, $options: 'i' } }
            ]
        }).populate('temporada_id', 'numero_temporada titulo');

        res.status(200).json({
            success: true,
            count: episodios.length,
            data: episodios
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar episodios',
            error: error.message
        });
    }
};

// Crear un nuevo episodio
exports.createEpisodio = async (req, res) => {
    try {
        // Verificar que la temporada existe
        const temporada = await Temporada.findById(req.body.temporada_id);
        
        if (!temporada) {
            return res.status(404).json({
                success: false,
                message: 'La temporada especificada no existe'
            });
        }

        const episodio = await Episodio.create(req.body);
        
        // Populate para devolver información de la temporada
        await episodio.populate('temporada_id', 'numero_temporada titulo');

        res.status(201).json({
            success: true,
            message: 'Episodio creado exitosamente',
            data: episodio
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
                message: 'Ya existe un episodio con ese número en esta temporada'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error al crear el episodio',
            error: error.message
        });
    }
};

// Actualizar un episodio
exports.updateEpisodio = async (req, res) => {
    try {
        // Si se actualiza la temporada, verificar que existe
        if (req.body.temporada_id) {
            const temporada = await Temporada.findById(req.body.temporada_id);
            if (!temporada) {
                return res.status(404).json({
                    success: false,
                    message: 'La temporada especificada no existe'
                });
            }
        }

        const episodio = await Episodio.findByIdAndUpdate(
            req.params.id,
            req.body,
            { 
                new: true, 
                runValidators: true 
            }
        ).populate('temporada_id', 'numero_temporada titulo');

        if (!episodio) {
            return res.status(404).json({
                success: false,
                message: 'Episodio no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Episodio actualizado exitosamente',
            data: episodio
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
            message: 'Error al actualizar el episodio',
            error: error.message
        });
    }
};

// Eliminar un episodio
exports.deleteEpisodio = async (req, res) => {
    try {
        const episodio = await Episodio.findById(req.params.id);

        if (!episodio) {
            return res.status(404).json({
                success: false,
                message: 'Episodio no encontrado'
            });
        }

        await episodio.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Episodio eliminado exitosamente',
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el episodio',
            error: error.message
        });
    }
};
