const express = require('express')
const router = express.Router()


const { produtoRoutes } = require('./produtoRouter');
const { clienteRoutes } = require('./ClienteRoutes');


router.use('/', clienteRoutes);
router.use('/', produtoRoutes);

module.exports = { router }