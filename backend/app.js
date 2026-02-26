const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Importar rutas
const temporadaRoutes = require('./src/routes/temporada.routes');
const episodioRoutes = require('./src/routes/episodio.routes');
const personajeRoutes = require('./src/routes/personaje.routes');
const tomoRoutes = require('./src/routes/tomo.routes');

// Configuración CORS mejorada
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:4200',
    'https://api-spyx-family-odt6wb5zp-daniels-projects-83665ae7.vercel.app',
    'https://api-spyx-family-app.vercel.app',
    'https://api-spyx-family-a0ve7puiq-daniels-projects-83665ae7.vercel.app', // Dominio backend actual
    'https://api-spyx-family-lsawxnk8q-daniels-projects-83665ae7.vercel.app', // Dominio frontend actual
    /^https:\/\/.*\.vercel\.app$/ // Todos los subdominios de Vercel
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        const isAllowed = allowedOrigins.some(allowed => {
            if (allowed instanceof RegExp) return allowed.test(origin);
            return allowed === origin;
        });
        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
};

// CORS: permitir solo orígenes definidos y Vercel
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de bienvenida - Sirve la documentación HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'templates', 'API_DOCUMENTATION.html'));
});

// Ruta de documentación JSON
app.get('/api/v1/Documentacion', (req, res) => {
    res.json({
        message: 'API REST - Spy x Family Database',
        version: '1.0.0',
        description: 'API para gestionar información de Spy x Family: temporadas, episodios, personajes y tomos del manga',
        baseURL: `http://localhost:${process.env.PORT || 3000}/api/v1`,
        endpoints: {
            temporadas: {
                getAll: 'GET /api/v1/temporadas',
                getById: 'GET /api/v1/temporadas/:id',
                getByNumero: 'GET /api/v1/temporadas/numero/:numero',
                getEstadisticas: 'GET /api/v1/temporadas/estadisticas',
                create: 'POST /api/v1/temporadas',
                update: 'PUT /api/v1/temporadas/:id',
                delete: 'DELETE /api/v1/temporadas/:id'
            },
            episodios: {
                getAll: 'GET /api/v1/episodios',
                getById: 'GET /api/v1/episodios/:id',
                getByTemporada: 'GET /api/v1/episodios/temporada/:temporadaId',
                search: 'GET /api/v1/episodios/search?query=texto',
                getEstadisticas: 'GET /api/v1/episodios/estadisticas',
                create: 'POST /api/v1/episodios',
                update: 'PUT /api/v1/episodios/:id',
                delete: 'DELETE /api/v1/episodios/:id'
            },
            personajes: {
                getAll: 'GET /api/v1/personajes',
                getById: 'GET /api/v1/personajes/:id',
                getByRol: 'GET /api/v1/personajes/rol/:rol',
                getByOrganizacion: 'GET /api/v1/personajes/organizacion/:organizacion',
                getByHabilidad: 'GET /api/v1/personajes/habilidad/:habilidad',
                search: 'GET /api/v1/personajes/search?query=texto',
                getEstadisticas: 'GET /api/v1/personajes/estadisticas',
                create: 'POST /api/v1/personajes',
                update: 'PUT /api/v1/personajes/:id',
                delete: 'DELETE /api/v1/personajes/:id'
            },
            tomos: {
                getAll: 'GET /api/v1/tomos',
                getById: 'GET /api/v1/tomos/:id',
                getByNumero: 'GET /api/v1/tomos/numero/:numero',
                getByISBN: 'GET /api/v1/tomos/isbn/:isbn',
                getByEditorial: 'GET /api/v1/tomos/editorial/:editorial',
                getByFechas: 'GET /api/v1/tomos/fechas?desde=YYYY-MM-DD&hasta=YYYY-MM-DD',
                search: 'GET /api/v1/tomos/search?query=texto',
                getEstadisticas: 'GET /api/v1/tomos/estadisticas',
                create: 'POST /api/v1/tomos',
                update: 'PUT /api/v1/tomos/:id',
                delete: 'DELETE /api/v1/tomos/:id'
            }
        },
        documentation: {
            html: 'http://localhost:' + (process.env.PORT || 3000),
            json: 'http://localhost:' + (process.env.PORT || 3000) + '/api/v1/Documentacion'
        }
    });
});

// Registrar rutas
app.use('/api/v1/temporadas', temporadaRoutes);
app.use('/api/v1/episodios', episodioRoutes);
app.use('/api/v1/personajes', personajeRoutes);
app.use('/api/v1/tomos', tomoRoutes);

// Ruta para manejar 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint no encontrado',
        hint: 'Visita /api/v1/Documentacion para ver todos los endpoints disponibles'
    });
});

module.exports = app;
