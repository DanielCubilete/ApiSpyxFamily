const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de documentación
app.get('/api/v1/Documentacion', (req, res) => {
    res.json({
        message: 'API REST - Proyecto Final Integrador MEAN',
        version: '1.0.0',
        endpoints: {
            documentacion: 'GET /api/v1/Documentacion',
            // Aquí se agregarán más endpoints según el recurso elegido
        }
    });
});

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.json({
        message: '¡Bienvenido a la API!',
        documentation: '/api/v1/Documentacion'
    });
});

module.exports = app;
