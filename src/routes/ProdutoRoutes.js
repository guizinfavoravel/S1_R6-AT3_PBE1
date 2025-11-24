const express = require('express')
const produtoRoutes = express.Router()

const { produtoController } = require('../controllers/ProdutoController');

produtoRoutes.get('/produtos', produtoController.buscarTodosProdutos);
produtoRoutes.get('/produtos/:idProduto', produtoController.buscarProdutoId);
produtoRoutes.post('/produtos', produtoController.inserirProduto);
produtoRoutes.put('/produtos/:idProduto', produtoController.atualizarProduto);
produtoRoutes.delete('/produtos/:idProduto', produtoController.excluirProduto)





module.exports = { produtoRoutes };