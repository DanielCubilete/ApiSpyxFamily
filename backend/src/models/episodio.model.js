const mongoose = require('mongoose');

const episodioSchema = new mongoose.Schema({
    numero_episodio: {
        type: Number,
        required: [true, 'El número de episodio es requerido'],
        min: [1, 'El número de episodio debe ser mayor a 0']
    },
    titulo: {
        type: String,
        required: [true, 'El título es requerido'],
        trim: true,
        minlength: [3, 'El título debe tener al menos 3 caracteres'],
        maxlength: [150, 'El título no puede exceder 150 caracteres']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es requerida'],
        trim: true,
        minlength: [10, 'La descripción debe tener al menos 10 caracteres']
    },
    sinopsis: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    director: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    guionista: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    valoracion: {
        type: Number,
        required: false,
        min: [0, 'La valoración debe ser mayor o igual a 0'],
        max: [10, 'La valoración no puede exceder 10'],
        default: null
    },
    duracion_minutos: {
        type: Number,
        required: [true, 'La duración es requerida'],
        min: [1, 'La duración debe ser mayor a 0'],
        max: [180, 'La duración no puede exceder 180 minutos']
    },
    fecha_emision: {
        type: Date,
        required: [true, 'La fecha de emisión es requerida']
    },
    imagen_url: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    temporada_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Temporada',
        required: [true, 'La temporada es requerida']
    }
}, {
    timestamps: true,
    versionKey: false
});

// Índices para mejorar el rendimiento
episodioSchema.index({ temporada_id: 1, numero_episodio: 1 }, { unique: true });
episodioSchema.index({ fecha_emision: 1 });

module.exports = mongoose.model('Episodio', episodioSchema);
