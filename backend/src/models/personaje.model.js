const mongoose = require('mongoose');

const personajeSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
        trim: true,
        minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
        maxlength: [100, 'El nombre no puede exceder 100 caracteres']
    },
    alias: {
        type: String,
        trim: true,
        maxlength: [100, 'El alias no puede exceder 100 caracteres'],
        default: null
    },
    edad: {
        type: Number,
        min: [0, 'La edad no puede ser negativa'],
        max: [120, 'La edad no puede exceder 120 años'],
        default: null
    },
    rol: {
        type: String,
        required: [true, 'El rol es requerido'],
        enum: {
            values: ['principal', 'secundario', 'recurrente'],
            message: 'El rol debe ser: principal, secundario o recurrente'
        }
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es requerida'],
        trim: true,
        minlength: [10, 'La descripción debe tener al menos 10 caracteres']
    },
    habilidades: {
        type: [String],
        default: []
    },
    organizacion: {
        type: String,
        trim: true,
        maxlength: [100, 'El nombre de la organización no puede exceder 100 caracteres'],
        default: null
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
personajeSchema.index({ nombre: 1 });
personajeSchema.index({ rol: 1 });
personajeSchema.index({ organizacion: 1 });

module.exports = mongoose.model('Personaje', personajeSchema);
