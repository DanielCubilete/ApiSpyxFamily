const mongoose = require('mongoose');

const temporadaSchema = new mongoose.Schema({
    numero_temporada: {
        type: Number,
        required: [true, 'El número de temporada es requerido'],
        min: [1, 'El número de temporada debe ser mayor a 0'],
        unique: true
    },
    titulo: {
        type: String,
        required: [true, 'El título es requerido'],
        trim: true,
        minlength: [3, 'El título debe tener al menos 3 caracteres'],
        maxlength: [100, 'El título no puede exceder 100 caracteres']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es requerida'],
        trim: true,
        minlength: [10, 'La descripción debe tener al menos 10 caracteres']
    },
    fecha_estreno: {
        type: Date,
        required: [true, 'La fecha de estreno es requerida']
    },
    fecha_finalizacion: {
        type: Date,
        default: null
    },
    numero_episodios: {
        type: Number,
        required: [true, 'El número de episodios es requerido'],
        min: [1, 'Debe tener al menos 1 episodio']
    },
    estudio_animacion: {
        type: String,
        required: [true, 'El estudio de animación es requerido'],
        trim: true,
        minlength: [3, 'El nombre del estudio debe tener al menos 3 caracteres']
    },
    estado: {
        type: String,
        required: [true, 'El estado es requerido'],
        enum: {
            values: ['emitida', 'en emisión', 'anunciada'],
            message: 'El estado debe ser: emitida, en emisión o anunciada'
        }
    },
    imagen_url: {
        type: String,
        required: false,
        trim: true,
        default: ''
    }
}, {
    timestamps: true,
    versionKey: false
});

// Índices para mejorar el rendimiento
// El índice de numero_temporada ya está definido por unique: true
temporadaSchema.index({ estado: 1 });

module.exports = mongoose.model('Temporada', temporadaSchema);
