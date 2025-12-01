const express = require('express');
const entregaRoutes = express.Router();
const { entregaController } = require('../controllers/EntregaController');

entregaRoutes.get('/entregas', entregaController.listarEntregas);
entregaRoutes.get('/entregas/:id', entregaController.buscarEntrega);
entregaRoutes.post('/entregas', entregaController.criarEntrega);
entregaRoutes.put('/entregas/:id', entregaController.atualizarEntrega);
entregaRoutes.delete('/entregas/:id', entregaController.deletarEntrega);

module.exports = { entregaRoutes };