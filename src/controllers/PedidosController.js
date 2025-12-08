const { pedidosModel } = require('../models/PedidosModel');

const pedidosController = {

    /**
     * Retorna todos os pedidos cadastrados
     * Rota: GET /pedidos
     * @async
     * @function selecionarTodos
     * @param {Request} req Objeto da requisição HTTP
     * @param {Response} res Objeto da resposta HTTP
     * @returns {Promise<Object>} Retorna array com todos os pedidos ou mensagem de erro
     */
    selecionarTodos: async (req, res) => {
        try {
            const resultado = await pedidosModel.selecionarTodos();
            return res.status(200).json(resultado);
        } catch (error) {
            console.error;
            return res.status(500).json({ message: "Erro ao buscar pedidos" });
        }
    },

    /**
     * Retorna um pedido pelo seu ID
     * Rota: GET /pedidos/:id
     * @async
     * @function selecionarPorId
     * @param {Request} req Objeto da requisição HTTP
     * @param {Response} res Objeto da resposta HTTP
     * @returns {Promise<Object>} Retorna o pedido encontrado ou mensagem de erro
     */
    selecionarPorId: async (req, res) => {
        try {
            const id = req.params.id;
            const resultado = await pedidosModel.selecionarPorId(id);

            if (resultado.length === 0) {
                return res.status(404).json({ message: "Pedido não encontrado" });
            }

            return res.status(200).json(resultado[0]);
        } catch (error) {
            console.error;
            return res.status(500).json({ message: "Erro ao buscar pedido" });
        }
    },

    /**
     * Insere um novo pedido no banco de dados
     * Rota: POST /pedidos
     * @async
     * @function inserirPedidos
     * @param {Request} req Objeto da requisição HTTP
     * @param {Response} res Objeto da resposta HTTP
     * @returns {Promise<Object>} Retorna objeto com id do pedido criado
     */
    inserirPedidos: async (req, res) => {
        try {
            const { idCliente, dataPedido, distancia, pesoCarga, valorBaseKm, valorBaseKg } = req.body;
            const resultado = await pedidosModel.inserirPedidos( idCliente, dataPedido, distancia, pesoCarga, valorBaseKm, valorBaseKg);

            return res.status(201).json({ message: "Pedido inserido com sucesso", resultado});

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao inserir pedido", error });
        }
    },

    /**
     * Atualiza os dados de um pedido existente pelo ID
     * Rota: PUT /pedidos/:id
     * @async
     * @function alterarPedidos
     * @param {Request} req Objeto da requisição HTTP
     * @param {Response} res Objeto da resposta HTTP
     * @returns {Promise<Object>} Retorna mensagem de sucesso ou erro
     */
    alterarPedidos: async (req, res) => {
        try {
            const id = req.params.id;
            const { idCliente, dataPedido, distancia, pesoCarga, valorBaseKm, valorBaseKg } = req.body;

            const resultado = await pedidosModel.alterarPedidos(
                id, idCliente, dataPedido, distancia, pesoCarga, valorBaseKm, valorBaseKg
            );

            if (resultado.affectedRows === 0) {
                return res.status(404).json({ message: "Pedido não encontrado para atualizar" });
            }

            return res.status(200).json({ message: "Pedido atualizado com sucesso" });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao atualizar pedido" });
        }
    },

    /**
     * Exclui um pedido pelo ID
     * Rota: DELETE /pedidos/:id
     * @async
     * @function excluirPedidos
     * @param {Request} req Objeto da requisição HTTP
     * @param {Response} res Objeto da resposta HTTP
     * @returns {Promise<Object>} Retorna mensagem de sucesso ou erro
     */
    excluirPedidos: async (req, res) => {
        try {
            const id = req.params.id;

            const resultado = await pedidosModel.excluirPedidos(id);

            if (resultado.affectedRows === 0) {
                return res.status(404).json({ message: "Pedido não encontrado para excluir" });
            }



            return res.status(200).json({ message: "Pedido excluído com sucesso" });

        } catch (error) {   
            if(error.errno === 1451) {
                return res.status(400).json({message: "Existe uma entrega relacionada ao pedido"})
            }
            console.error;
            return res.status(500).json({ message: "Erro ao excluir pedido", error });
        }
    }

};

module.exports = { pedidosController };
