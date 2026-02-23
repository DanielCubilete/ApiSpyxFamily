const mongoose = require('mongoose');

const tomoSchema = new mongoose.Schema({
    numero_tomo: {
        type: Number,
        required: [true, 'El número de tomo es requerido'],
        min: [1, 'El número de tomo debe ser mayor a 0']
    },
    titulo: {
        type: String,
        required: [true, 'El título es requerido'],
        trim: true,
        minlength: [3, 'El título debe tener al menos 3 caracteres'],
        maxlength: [150, 'El título no puede exceder 150 caracteres']
    },
    isbn: {
        type: String,
        required: [true, 'El ISBN es requerido'],
        unique: true,
        trim: true,
        validate: {
            validator: function(v) {
                // Eliminar guiones y espacios para validación
                const cleanISBN = v.replace(/[-\s]/g, '');
                
                // Validación de ISBN-13 (978/979 seguido de 10 dígitos)
                const isbn13 = /^(978|979)\d{10}$/;
                // Validación de ISBN-10 (10 caracteres, último puede ser X)
                const isbn10 = /^\d{9}[\dXx]$/;
                
                return isbn13.test(cleanISBN) || isbn10.test(cleanISBN);
            },
            message: 'El ISBN no tiene un formato válido'
        }
    },
    fecha_publicacion: {
        type: Date,
        required: [true, 'La fecha de publicación es requerida'],
        validate: {
            validator: function(v) {
                // No puede ser anterior a 2019 (año de inicio del manga)
                return v >= new Date('2019-01-01');
            },
            message: 'La fecha de publicación no puede ser anterior a 2019'
        }
    },
    numero_capitulos: {
        type: Number,
        required: [true, 'El número de capítulos es requerido'],
        min: [1, 'Debe tener al menos 1 capítulo']
    },
    paginas: {
        type: Number,
        required: [true, 'El número de páginas es requerido'],
        min: [1, 'Debe tener al menos 1 página']
    },
    precio: {
        type: Number,
        min: [0, 'El precio no puede ser negativo'],
        default: 0
    },
    editorial: {
        type: String,
        required: [true, 'La editorial es requerida'],
        trim: true,
        minlength: [2, 'El nombre de la editorial debe tener al menos 2 caracteres']
    },
    sinopsis: {
        type: String,
        trim: true
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
tomoSchema.index({ numero_tomo: 1 });
tomoSchema.index({ isbn: 1 });
tomoSchema.index({ fecha_publicacion: 1 });

module.exports = mongoose.model('Tomo', tomoSchema);
