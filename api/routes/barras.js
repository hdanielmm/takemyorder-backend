const express = require('express');
const router = express.Router();

const BarrasController = require('../controllers/barras');

router.get('/', BarrasController.barras_get_all);

router.get('/:barraId', BarrasController.barras_get_barra);

router.post('/', BarrasController.barras_create_barra);

router.patch('/:barraId', BarrasController.barras_update_barra);

router.delete('/:barraId', BarrasController.barras_delete_barra);

module.exports = router;