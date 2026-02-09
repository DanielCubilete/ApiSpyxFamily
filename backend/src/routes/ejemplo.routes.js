// Ejemplo de rutas
// Reemplazar con tus rutas específicas

const express = require('express');
const router = express.Router();
const ejemploController = require('../controllers/ejemplo.controller');

// Obtener todos los recursos (con paginación)
router.get('/get/all', ejemploController.getAll);

// Obtener un recurso por ID
router.get('/get/:id', ejemploController.getById);

// Crear un nuevo recurso
router.post('/post', ejemploController.create);

// Actualizar un recurso
router.put('/update/:id', ejemploController.update);
// O usar PATCH
// router.patch('/update/:id', ejemploController.update);

// Eliminar un recurso
router.delete('/delete/:id', ejemploController.deleteOne);

module.exports = router;
