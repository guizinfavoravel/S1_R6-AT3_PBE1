const express = require('express')
const clienteRoutes = express.Router()
const { clienteController } = require('../controllers/ClienteController');

clienteRoutes.get('/clientes', clienteController.selecionarTodosClientes);
clienteRoutes.get('/clientes/:idCliente', clienteController.selecionarPorIdCliente);
clienteRoutes.post('/clientes', clienteController.adicionarCliente);
clienteRoutes.put('/clientes/:id', clienteController.atualizarCliente);
clienteRoutes.delete('/clientes/:id', clienteController.excluirCliente);

module.exports = { clienteRoutes };
