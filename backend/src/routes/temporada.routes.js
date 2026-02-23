const express = require('express');
const router = express.Router();
const temporadaController = require('../controllers/temporada.controller');

/**
 * @route   GET /api/v1/temporadas
 * @desc    Obtener todas las temporadas
 * @access  Public
 */
router.get('/', temporadaController.getAllTemporadas);

/**
 * @route   GET /api/v1/temporadas/:id
 * @desc    Obtener una temporada por ID
 * @access  Public
 */
router.get('/:id', temporadaController.getTemporadaById);

/**
 * @route   GET /api/v1/temporadas/numero/:numero
 * @desc    Obtener una temporada por número
 * @access  Public
 */
router.get('/numero/:numero', temporadaController.getTemporadaByNumero);

/**
 * @route   POST /api/v1/temporadas
 * @desc    Crear una nueva temporada
 * @access  Public
 */
router.post('/', temporadaController.createTemporada);

/**
 * @route   PUT /api/v1/temporadas/:id
 * @desc    Actualizar una temporada
 * @access  Public
 */
router.put('/:id', temporadaController.updateTemporada);

/**
 * @route   DELETE /api/v1/temporadas/:id
 * @desc    Eliminar una temporada
 * @access  Public
 */
router.delete('/:id', temporadaController.deleteTemporada);

module.exports = router;
