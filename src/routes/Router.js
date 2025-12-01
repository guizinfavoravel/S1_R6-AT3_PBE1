const express = require('express')
const router = express.Router()


const { entregaRoutes } = require('./EntregaRoutes');
const { clienteRoutes } = require('./ClienteRoutes');
const { pedidosRoutes } = require('./PedidosRoutes');


router.use('/', clienteRoutes);
router.use('/', pedidosRoutes);
router.use('/', entregaRoutes)

module.exports = { router }