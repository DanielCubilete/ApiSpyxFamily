const express = require('express');
const router = express.Router();
const personajeController = require('../controllers/personaje.controller');

/**
 * @route   GET /api/v1/personajes
 * @desc    Obtener todos los personajes
 * @access  Public
 */
router.get('/', personajeController.getAllPersonajes);

/**
 * @route   GET /api/v1/personajes/search
 * @desc    Buscar personajes por nombre, alias o descripción
 * @access  Public
 */
router.get('/search', personajeController.searchPersonajes);

/**
 * @route   GET /api/v1/personajes/rol/:rol
 * @desc    Obtener personajes por rol
 * @access  Public
 */
router.get('/rol/:rol', personajeController.getPersonajesByRol);

/**
 * @route   GET /api/v1/personajes/organizacion/:organizacion
 * @desc    Obtener personajes por organización
 * @access  Public
 */
router.get('/organizacion/:organizacion', personajeController.getPersonajesByOrganizacion);

/**
 * @route   GET /api/v1/personajes/habilidad/:habilidad
 * @desc    Obtener personajes por habilidad
 * @access  Public
 */
router.get('/habilidad/:habilidad', personajeController.getPersonajesByHabilidad);

/**
 * @route   GET /api/v1/personajes/:id
 * @desc    Obtener un personaje por ID
 * @access  Public
 */
router.get('/:id', personajeController.getPersonajeById);

/**
 * @route   POST /api/v1/personajes
 * @desc    Crear un nuevo personaje
 * @access  Public
 */
router.post('/', personajeController.createPersonaje);

/**
 * @route   PUT /api/v1/personajes/:id
 * @desc    Actualizar un personaje
 * @access  Public
 */
router.put('/:id', personajeController.updatePersonaje);

/**
 * @route   DELETE /api/v1/personajes/:id
 * @desc    Eliminar un personaje
 * @access  Public
 */
router.delete('/:id', personajeController.deletePersonaje);

module.exports = router;
