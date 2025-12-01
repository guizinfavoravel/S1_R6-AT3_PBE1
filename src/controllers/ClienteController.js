const { clienteModel } = require('../models/ClienteModel');

const clienteController = {

    /**
     * Retorna todos os clientes cadastrados
     * Rota: GET /clientes
     * @async
     * @function selecionarTodosClientes
     * @param {Request} req Objeto da requisição HTTP
     * @param {Response} res Objeto da resposta HTTP
     * @returns {Promise<Object>} Retorna array com todos os clientes ou mensagem de erro
     */
    selecionarTodosClientes: async (req, res) => {
        try {
            const resultado = await clienteModel.selecionarTodos();

            if (!resultado || resultado.length === 0) {
                return res.status(404).json({ message: 'Nenhum cliente encontrado.' });
            }

            return res.status(200).json(resultado);

        } catch (error) {
            return res.status(500).json({ message: 'Erro no servidor' });
        }
    },

    /**
     * Retorna um cliente pelo ID
     * Rota: GET /clientes/:idCliente
     * @async
     * @function selecionarPorIdCliente
     * @param {Request} req Objeto da requisição HTTP
     * @param {Response} res Objeto da resposta HTTP
     * @returns {Promise<Object>} Retorna o cliente encontrado ou mensagem de erro
     */
    selecionarPorIdCliente: async (req, res) => {
        try {
            const id = req.params.idCliente;
            const resultado = await clienteModel.selecionarPorId(id);

            if (!resultado || resultado.length === 0) {
                return res.status(404).json({ message: 'Cliente não encontrado.' });
            }

            return res.status(200).json(resultado[0]);

        } catch (error) {
            return res.status(500).json({ message: 'Erro no servidor' });
        }
    },

    /**
     * Adiciona um novo cliente
     * Rota: POST /clientes
     * @async
     * @function adicionarCliente
     * @param {Request} req Objeto da requisição HTTP
     * @param {Response} res Objeto da resposta HTTP
     * @returns {Promise<Object>} Retorna mensagem de sucesso e ID do cliente criado
     */
    adicionarCliente: async (req, res) => {
        try {
            const { idCliente, nomeCliente, cpfCliente, telefoneCliente, emailCliente } = req.body;

            const resultado = await clienteModel.adicionar(idCliente, nomeCliente, cpfCliente, telefoneCliente, emailCliente);

            return res.status(201).json({ message: 'Cliente cadastrado com sucesso!', id: resultado.insertId });

        } catch (error) {
            return res.status(500).json({ message: 'Erro ao cadastrar cliente' });
        }
    },

    /**
     * Exclui um cliente pelo ID
     * Rota: DELETE /clientes/:id
     * @async
     * @function excluirCliente
     * @param {Request} req Objeto da requisição HTTP
     * @param {Response} res Objeto da resposta HTTP
     * @returns {Promise<Object>} Retorna mensagem de sucesso ou erro
     */
    excluirCliente: async (req, res) => {
        try {
            const id = Number(req.params.id);

            if (!id) return res.status(400).json({ message: "Forneça um ID válido!" });

            const consulta = await clienteModel.selecionarPorId(id);
            if (consulta.length === 0) return res.status(404).json({ message: "Cliente não encontrado!" });

            const resultado = await clienteModel.deleteCliente(id);

            if (resultado.affectedRows === 1) {
                res.status(200).json({ message: "Cliente excluído com sucesso" });
            } else {
                throw new Error("Não foi possível excluir o cliente");
            }

        } catch (error) {
            res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
        }
    },

    /**
     * Atualiza os dados de um cliente
     * Rota: PUT /clientes/:id
     * @async
     * @function atualizarCliente
     * @param {Request} req Objeto da requisição HTTP
     * @param {Response} res Objeto da resposta HTTP
     * @returns {Promise<Object>} Retorna mensagem de sucesso ou erro
     */
    atualizarCliente: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const { nomeCliente, cpfCliente, telefoneCliente, emailCliente, enderecoCompleto } = req.body;

            if (!id || !nomeCliente || !cpfCliente || !telefoneCliente || !emailCliente || !enderecoCompleto) {
                return res.status(400).json({ message: "Dados inválidos" });
            }

            const clienteAtual = await clienteModel.selecionarPorId(id);
            if (clienteAtual.length === 0) return res.status(404).json({ message: "Cliente não encontrado" });

            const resultado = await clienteModel.alterarCliente(id, nomeCliente, cpfCliente, telefoneCliente, emailCliente, enderecoCompleto);

            if (resultado.changedRows === 0) return res.status(400).json({ message: "Nenhuma alteração realizada" });

            res.status(200).json({ message: "Cliente atualizado com sucesso" });

        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar cliente' });
        }
    }

};

module.exports = { clienteController };
