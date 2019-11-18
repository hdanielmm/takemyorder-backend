const express = require('express');
const router = express.Router();

const PedidosControllers = require('../controllers/pedidos')

// Handle incoming GET requests to /pedidos
router.get('/', PedidosControllers.pedidos_get_all);

router.post('/', PedidosControllers.pedidos_create_pedido);

router.get('/:pedidoId', PedidosControllers.pedidos_get_pedido);

router.delete('/:pedidoId', PedidosControllers.pedidos_delete_pedido);

module.exports = router;