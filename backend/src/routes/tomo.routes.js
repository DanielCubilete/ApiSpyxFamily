const express = require('express');
const router = express.Router();
const tomoController = require('../controllers/tomo.controller');

/**
 * @route   GET /api/v1/tomos
 * @desc    Obtener todos los tomos
 * @access  Public
 */
router.get('/', tomoController.getAllTomos);

/**
 * @route   GET /api/v1/tomos/search
 * @desc    Buscar tomos por título
 * @access  Public
 */
router.get('/search', tomoController.searchTomos);

/**
 * @route   GET /api/v1/tomos/fechas
 * @desc    Obtener tomos por rango de fechas
 * @access  Public
 */
router.get('/fechas', tomoController.getTomosByFechas);

/**
 * @route   GET /api/v1/tomos/numero/:numero
 * @desc    Obtener un tomo por número
 * @access  Public
 */
router.get('/numero/:numero', tomoController.getTomoByNumero);

/**
 * @route   GET /api/v1/tomos/isbn/:isbn
 * @desc    Obtener un tomo por ISBN
 * @access  Public
 */
router.get('/isbn/:isbn', tomoController.getTomoByISBN);

/**
 * @route   GET /api/v1/tomos/editorial/:editorial
 * @desc    Obtener tomos por editorial
 * @access  Public
 */
router.get('/editorial/:editorial', tomoController.getTomosByEditorial);

/**
 * @route   GET /api/v1/tomos/:id
 * @desc    Obtener un tomo por ID
 * @access  Public
 */
router.get('/:id', tomoController.getTomoById);

/**
 * @route   POST /api/v1/tomos
 * @desc    Crear un nuevo tomo
 * @access  Public
 */
router.post('/', tomoController.createTomo);

/**
 * @route   PUT /api/v1/tomos/:id
 * @desc    Actualizar un tomo
 * @access  Public
 */
router.put('/:id', tomoController.updateTomo);

/**
 * @route   DELETE /api/v1/tomos/:id
 * @desc    Eliminar un tomo
 * @access  Public
 */
router.delete('/:id', tomoController.deleteTomo);

module.exports = router;
