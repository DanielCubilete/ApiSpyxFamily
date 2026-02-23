const express = require('express');
const router = express.Router();
const episodioController = require('../controllers/episodio.controller');

/**
 * @route   GET /api/v1/episodios
 * @desc    Obtener todos los episodios
 * @access  Public
 */
router.get('/', episodioController.getAllEpisodios);

/**
 * @route   GET /api/v1/episodios/search
 * @desc    Buscar episodios por título o descripción
 * @access  Public
 */
router.get('/search', episodioController.searchEpisodios);

/**
 * @route   GET /api/v1/episodios/temporada/:temporadaId
 * @desc    Obtener episodios por temporada
 * @access  Public
 */
router.get('/temporada/:temporadaId', episodioController.getEpisodiosByTemporada);

/**
 * @route   GET /api/v1/episodios/:id
 * @desc    Obtener un episodio por ID
 * @access  Public
 */
router.get('/:id', episodioController.getEpisodioById);

/**
 * @route   POST /api/v1/episodios
 * @desc    Crear un nuevo episodio
 * @access  Public
 */
router.post('/', episodioController.createEpisodio);

/**
 * @route   PUT /api/v1/episodios/:id
 * @desc    Actualizar un episodio
 * @access  Public
 */
router.put('/:id', episodioController.updateEpisodio);

/**
 * @route   DELETE /api/v1/episodios/:id
 * @desc    Eliminar un episodio
 * @access  Public
 */
router.delete('/:id', episodioController.deleteEpisodio);

module.exports = router;
