const express = require('express');
const pedidosRoutes = express.Router();
const { pedidosController } = require('../controllers/PedidosController');

pedidosRoutes.get('/pedidos', pedidosController.selecionarTodos);
pedidosRoutes.get('/pedidos/:id', pedidosController.selecionarPorId);
pedidosRoutes.post('/pedidos', pedidosController.inserirPedidos);
pedidosRoutes.put('/pedidos/:id', pedidosController.alterarPedidos);
pedidosRoutes.delete('/pedidos/:id', pedidosController.excluirPedidos);

module.exports = { pedidosRoutes };
