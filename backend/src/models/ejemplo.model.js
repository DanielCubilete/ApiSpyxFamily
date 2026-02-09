// Ejemplo de modelo para Mongoose
// Reemplazar con tu entidad específica

const mongoose = require('mongoose');

const ejemploSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
        trim: true,
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
        maxlength: [100, 'El nombre no puede exceder 100 caracteres']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es requerida'],
        trim: true
    },
    campoNumerico: {
        type: Number,
        required: [true, 'El campo numérico es requerido'],
        min: [0, 'El valor debe ser mayor o igual a 0']
    },
    campoFecha: {
        type: Date,
        default: Date.now
    },
    campoBooleano: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true, // Agrega automáticamente createdAt y updatedAt
    versionKey: false
});

// Índices para mejorar las consultas
ejemploSchema.index({ nombre: 1 });

// Métodos personalizados del modelo (opcional)
ejemploSchema.methods.toJSON = function() {
    const obj = this.toObject();
    obj.id = obj._id;
    delete obj._id;
    return obj;
};

const Ejemplo = mongoose.model('Ejemplo', ejemploSchema);

module.exports = Ejemplo;
