const express = require('express');
const router = express.Router();

const MesasControllers = require('../controllers/mesas');

router.get('/', MesasControllers.mesas_get_all);

router.get('/:mesaId', MesasControllers.mesas_get_mesa);

router.post('/', MesasControllers.mesas_create_mesa);

router.patch('/:mesaId', MesasControllers.mesas_update_mesa);

router.delete('/:mesaId', MesasControllers.mesas_delete_mesa);

module.exports = router;